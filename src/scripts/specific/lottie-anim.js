// lottie.js
// import { DotLottie } from "@lottiefiles/dotlottie-web";
// import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

// window.loadLottieAnimation = function (elementId, animationSrc) {
//   const dotLottie = new DotLottie({
//     autoplay: true,
//     loop: true,
//     canvas: document.querySelector(`#${elementId}`),
//     src: animationSrc,
//   });
// };

// document.addEventListener("DOMContentLoaded", async () => {
//   const { DotLottie } = await import(
//     "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm"
//   );

//   window.loadLottieAnimation = function (elementId, animationSrc) {
//     const dotLottie = new DotLottie({
//       autoplay: true,
//       loop: true,
//       canvas: document.querySelector(`#${elementId}`),
//       src: animationSrc,
//     });
//   };

//   document.querySelectorAll("[data-lottie]").forEach((canvas) => {
//     window.loadLottieAnimation(canvas.id, canvas.dataset.lottie);
//   });
// });

// (async () => {
//   // Preload DotLottie module immediately
//   const { DotLottie } = await import(
//     "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm"
//   );

//   // Define the function globally
//   window.loadLottieAnimation = function (elementId, animationSrc) {
//     const dotLottie = new DotLottie({
//       autoplay: true,
//       loop: true,
//       canvas: document.querySelector(`#${elementId}`),
//       src: animationSrc,
//     });
//   };

//   // Start loading animations right away
//   document.querySelectorAll("[data-lottie]").forEach((canvas) => {
//     window.loadLottieAnimation(canvas.id, canvas.dataset.lottie);
//   });
// })();

// (async () => {
//   function loadLottie() {
//     // return import("https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm");
//     return import("https://esm.sh/@lottiefiles/dotlottie-web");
//   }

//   async function loadAnimation(elementId, animationSrc) {
//     const { DotLottie } = await loadLottie();
//     new DotLottie({
//       autoplay: true,
//       loop: true,
//       canvas: document.querySelector(`#${elementId}`),
//       src: animationSrc,
//     });
//   }

//   const observer = new IntersectionObserver(
//     (entries, observer) => {
//       entries.forEach(async (entry) => {
//         if (entry.isIntersecting) {
//           await loadAnimation(entry.target.id, entry.target.dataset.lottie);
//           observer.unobserve(entry.target); // Load only once
//         }
//       });
//     },
//     { rootMargin: "100px" }
//   );

//   document.querySelectorAll("[data-lottie]").forEach((el) => observer.observe(el));
// })();

import lottie from "lottie-web";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-lottie]").forEach((canvas) => {
    const animationPath = canvas.dataset.lottie;

    lottie.loadAnimation({
      container: canvas,
      renderer: "canvas",
      loop: true,
      autoplay: true,
      path: animationPath,
    });
  });
});
