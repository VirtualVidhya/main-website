// lottie.js
// import { DotLottie } from "@lottiefiles/dotlottie-web";
import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

window.loadLottieAnimation = function (elementId, animationSrc) {
  const dotLottie = new DotLottie({
    autoplay: true,
    loop: true,
    canvas: document.querySelector(`#${elementId}`),
    src: animationSrc,
  });
};
