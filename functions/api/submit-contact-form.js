// POST /api/submit-contact-form

import { Resend } from "resend";

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
