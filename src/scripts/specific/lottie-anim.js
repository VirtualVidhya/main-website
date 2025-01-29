// lottie.js
import { DotLottie } from "@lottiefiles/dotlottie-web";

window.loadLottieAnimation = function (elementId, animationSrc) {
  const dotLottie = new DotLottie({
    autoplay: true,
    loop: true,
    canvas: document.querySelector(`#${elementId}`),
    src: animationSrc,
  });
};
