// POST /api/submit-contact-form

import { Resend } from "resend";

const spamNamePatterns = new Map();

function isSpamName(name) {
  // Check if name ends with "noita" (or slight variations)
  const spamRegex = /(no[i1í]ta|n0ita|nσita|n𝑜ita)$/i;

  if (spamRegex.test(name)) {
    spamNamePatterns.set(name, (spamNamePatterns.get(name) || 0) + 1);
    return true;
  }

  return false;
}

export async function onRequestPost(context) {
  try {
    // console.log("Request Method:", context.request.method);
    // console.log("Request Headers:", context.request.headers);

    let input = await context.request.formData();

    // Convert FormData to JSON
    // NOTE: Allows multiple values per key
    let output = {};
    for (let [key, value] of input) {
      let tmp = output[key];
      if (tmp === undefined) {
        output[key] = value;
      } else {
        output[key] = [].concat(tmp, value);
      }
    }

    // console.log("Form Data:", output);

    const honeypot = output.address;

    // Return early with pretend confirmation if bot hit honeypot
    if (honeypot !== "") {
      return Response.redirect("https://vvidhya.com/contact.html", 303);
    }

    // If the name contains a known spam, Return early with pretend confirmation
    if (isSpamName(output.name.toLowerCase())) {
      return Response.redirect("https://vvidhya.com/contact.html", 303);
    }

    let englishChars = (
      output.message.match(/[a-zA-Z0-9.,&%()\[\]{}?!'"\s]/g) || []
    ).length;
    let totalChars = output.message.length;

    // If more than 30% of characters are non-English, Return early with pretend confirmation
    if (englishChars / totalChars < 0.7) {
      return Response.redirect("https://vvidhya.com/contact.html", 303);
    }

    // Using text instead of email so that it doesn't need to be sanitized
    const resend = new Resend(context.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: `Inquiry at V.Vidhya <${context.env.SENDER_EMAIL}>`,
      to: `Contact at V.Vidhya <${context.env.RECIPIENT_EMAIL}>`,
      replyTo: output.email,
      subject: `[vvidhya.com] Inquiry request from ${output.name}`,
      text: `Name: ${output.name}\nEmail: ${output.email}\nPhone: ${output.phone}\nCourse: ${output.course}\n\nMessage: ${output.message}`,
    });
    console.log({ data, error });

    if (error) {
      return Response.redirect("https://vvidhya.com/index.html", 303);
    } else {
      return Response.redirect("https://vvidhya.com/contact.html", 303);
    }
  } catch (err) {
    console.error("Error:", err);
    return new Response("Error parsing JSON content", { status: 400 });
  }
}
