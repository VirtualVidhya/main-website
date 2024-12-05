// POST /api/submit-contact-form

import { Resend } from "resend";

export async function onRequestPost(context) {
  try {
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

    // let pretty = JSON.stringify(output, null, 2);
    // return new Response(pretty, {
    //   headers: {
    //     "Content-Type": "application/json;charset=utf-8",
    //   },
    // });

    // Using text instead of email so that I don't need to sanitize it
    const resend = new Resend(context.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: context.env.SENDER_EMAIL,
      reply_to: output.email,
      to: context.env.RECIPIENT_EMAIL,
      subject: `[VVIDHYA.COM] Contact form request from ${output.name}: ${output.subject}`,
      text: output.message,
    });
    console.log({ data, error });

    if (error) {
      return Response.redirect("https://vvidhya.com/index.html", 303);
    } else {
      return Response.redirect("https://vvidhya.com/contact.html", 303);
    }

    // const key = context.env.RESEND_API_KEY;
    // console.log(context.env.RESEND_API_KEY);

    // return Response.redirect(`Error: ${key}`, { status: 500 });
  } 
  catch (err) {
    return new Response("Error parsing JSON content", { status: 400 });
  }
}

// import { Resend } from "resend";

// export default {
//   async fetch(request, env, ctx) {
//     const resend = new Resend("rre_FkKEAwa1_AsroqhKRxMyQdzTgrXsFdgw3");

//     const { data, error } = await resend.emails.send({
//       from: "contact@vvidhya.com",  // Replace with your sender email
//       to: "parvahdesai10@gmail.com", // Replace with recipient email
//       subject: "Hello World",
//       html: "<p>Hello from Workers</p>",
//     });

//     return Response.json({ data, error });
//   },
// };