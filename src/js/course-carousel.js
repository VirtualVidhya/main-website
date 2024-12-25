import Swiper from "swiper";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";

import "swiper/css"; // Core CSS
import "swiper/css/navigation"; // Navigation CSS
import "swiper/css/scrollbar"; // Scrollbar CSS"

// Select all containers with the class "swiper-container"
const swiperContainers = document.querySelectorAll(".swiper-container");

// Initialize a Swiper instance for each container
swiperContainers.forEach((container, index) => {
  const nextButton = container.closest("section").querySelector(".swiper-button-next");
  const prevButton = container.closest("section").querySelector(".swiper-button-prev");
  const scrollbar = container.closest("section").querySelector(".swiper-scrollbar");

  new Swiper(container, {
    modules: [Navigation, Scrollbar, Autoplay],
    direction: "horizontal",
    autoplay: {
      delay: 1500, // Slide every 1.5 seconds
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    scrollbar: {
      el: scrollbar,
      draggable: true, // Allow dragging the scrollbar
    },
    slidesPerView: 1,
    spaceBetween: 20,
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
});
