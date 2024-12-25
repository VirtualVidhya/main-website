import Swiper from "swiper";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";

import "swiper/css"; // Core CSS
import "swiper/css/navigation"; // Navigation CSS
import "swiper/css/scrollbar"; // Scrollbar CSS

// Initialize Swiper
const swiper = new Swiper(".swiper-container", {
  modules: [Navigation, Scrollbar, Autoplay],

  // Parameters
  direction: "horizontal",
  // loop: true,

  autoplay: {
    delay: 1500, // Slide every 3 seconds
    disableOnInteraction: false, // Don't stop autoplay on user interaction
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: false, // Allow dragging the scrollbar
  },

  slidesPerView: 1,
  spaceBetween: 20, // Gap between slides

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  },
});
