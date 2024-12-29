// export default {
//   async fetch(request) {
//     const url = new URL(request.url);

//     // Rewrite hostname to the Vercel backend
//     url.hostname = "vvidhya.vercel.app"; // Replace with your actual Umami Vercel deployment URL
//     url.pathname = url.pathname.replace("/umami", ""); // Strip the `/umami` prefix

//     console.log(`Proxying request to: ${url.toString()}`);

//     // Forward the proxied request
//     const proxiedRequest = new Request(url.toString(), request);

//     // Fetch response
//     const response = await fetch(proxiedRequest);

//     // Handle JavaScript files
//     if (url.pathname.endsWith(".js")) {
//       const jsResponse = new Response(response.body, response);
//       jsResponse.headers.set("Content-Type", "application/javascript");
//       jsResponse.headers.delete("X-Content-Type-Options"); // Remove to prevent MIME mismatch errors
//       return jsResponse;
//     }

//     // Handle CSS files
//     if (url.pathname.endsWith(".css")) {
//       const cssResponse = new Response(response.body, response);
//       cssResponse.headers.set("Content-Type", "text/css");
//       jsResponse.headers.delete("X-Content-Type-Options"); // Remove to prevent MIME mismatch errors
//       return cssResponse;
//     }

//     // Return the response for all other files
//     return response;
//   },
// };

// export default {
//   async fetch(request) {
//     const url = new URL(request.url);

//     // Rewrite hostname to the Vercel backend
//     url.hostname = "vvidhya.vercel.app"; // Your Umami Vercel URL
//     url.pathname = url.pathname.replace("/umami", ""); // Strip `/umami` prefix

//     console.log(`Proxying request to: ${url.toString()}`);

//     // Forward the proxied request
//     const proxiedRequest = new Request(url.toString(), {
//       method: request.method,
//       headers: request.headers,
//       body: request.body,
//     });

//     // Fetch the proxied response
//     const response = await fetch(proxiedRequest);

//     // Clone the response to modify headers
//     const modifiedResponse = new Response(response.body, response);

//     // Adjust headers to prevent MIME type mismatches
//     const path = url.pathname;
//     if (path.endsWith(".js")) {
//       modifiedResponse.headers.set(
//         "Content-Type",
//         "application/javascript; charset=utf-8"
//       );
//       modifiedResponse.headers.delete("X-Content-Type-Options"); // Remove nosniff to avoid MIME errors
//     } else if (path.endsWith(".css")) {
//       modifiedResponse.headers.set("Content-Type", "text/css; charset=utf-8");
//       modifiedResponse.headers.delete("X-Content-Type-Options");
//     }

//     // Add CORS headers for better compatibility
//     modifiedResponse.headers.set("Access-Control-Allow-Origin", "*");
//     modifiedResponse.headers.set(
//       "Access-Control-Allow-Methods",
//       "GET, HEAD, OPTIONS"
//     );

//     return modifiedResponse;
//   },
// };
