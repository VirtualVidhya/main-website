// POST /api/submit-contact-form

// import { Resend } from "resend";

// export async function onRequestPost(context) {
// try {
//   console.log("trying");
//   const contentType = context.request.headers.get("content-type") || "";
//   let input = {};

//   if (contentType.includes("application/json")) {
//     input = await context.request.json();
//   } else if (contentType.includes("application/x-www-form-urlencoded")) {
//     const text = await context.request.text();
//     input = Object.fromEntries(new URLSearchParams(text));
//   } else if (contentType.includes("multipart/form-data")) {
//     const formData = await context.request.formData();
//     for (let [key, value] of formData) {
//       input[key] = value;
//     }
//   } else {
//     return new Response("Unsupported content type", { status: 415 });
//   }

//   // console.log('Request Method:', context.request.method);
//   // console.log('Request Headers:', context.request.headers);

//   // let input = await context.request.formData();

//   // // Convert FormData to JSON
//   // // NOTE: Allows multiple values per key
//   // let output = {};
//   // for (let [key, value] of input) {
//   //   let tmp = output[key];
//   //   if (tmp === undefined) {
//   //     output[key] = value;
//   //   } else {
//   //     output[key] = [].concat(tmp, value);
//   //   }
//   // }

//   console.log("Form Data:", output);

//   // Using text instead of email so that I don't need to sanitize it
//   const resend = new Resend(context.env.RESEND_API_KEY);
//   const { data, error } = await resend.emails.send({
//     from: context.env.SENDER_EMAIL,
//     reply_to: output.email,
//     to: context.env.RECIPIENT_EMAIL,
//     subject: `[VVIDHYA.COM] Contact form request from ${output.name}: ${output.subject}`,
//     text: output.message,
//   });
//   console.log({ data, error });

//   if (error) {
//     return Response.redirect("https://vvidhya.com/index.html", 303);
//   } else {
//     return Response.redirect("https://vvidhya.com/contact.html", 303);
//   }
// } catch (err) {
//   console.log("SHIT");
//   console.error("Error:", err);
//   return new Response("Error parsing JSON content", { status: 400 });
// }
// }

import { Resend } from "resend";

export async function onRequestPost(context) {
  console.log("Worker is handling the POST request");

  try {
    console.log("Request Method:", context.request.method);
    console.log("Request Headers:", context.request.headers);

    const input = await context.request.formData();

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

    console.log("Parsed Form Data:", output);

    // Send email with parsed form data
    const env = context.env || context.data.vars;
    
    const resend = new Resend(env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: env.SENDER_EMAIL,
      reply_to: output.email,
      to: env.RECIPIENT_EMAIL,
      subject: `[VVIDHYA.COM] Contact form request from ${output.name}: ${output.course}`,
      text: `Message: ${output.message}\nPhone: ${output["phone-no."]}`,
    });

    console.log({ data, error });

    if (error) {
      return new Response("Error sending email", { status: 500 });
    }

    return new Response("Parsed request", { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return new Response("Error parsing request", { status: 400 });
  }
}

// addEventListener('fetch', event => {
//   console.log('Incoming request:', event.request);
//   event.respondWith(new Response('Hello, world!', { status: 200 }));
// });
