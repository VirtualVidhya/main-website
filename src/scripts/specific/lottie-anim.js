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

(async () => {
  // Preload DotLottie module immediately
  const { DotLottie } = await import(
    "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm"
  );

  // Define the function globally
  window.loadLottieAnimation = function (elementId, animationSrc) {
    const dotLottie = new DotLottie({
      autoplay: true,
      loop: true,
      canvas: document.querySelector(`#${elementId}`),
      src: animationSrc,
    });
  };

  // Start loading animations right away
  document.querySelectorAll("[data-lottie]").forEach((canvas) => {
    window.loadLottieAnimation(canvas.id, canvas.dataset.lottie);
  });
})();
