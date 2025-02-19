import Swiper from "swiper";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";

import "swiper/css"; // Core CSS
import "swiper/css/navigation"; // Navigation CSS
import "swiper/css/scrollbar"; // Scrollbar CSS

const AUTOPLAY_PAUSE_DURATION = 4500;

// Select all containers with the class "swiper-container"
const swiperContainers = document.querySelectorAll(".swiper-container");

// Initialize a Swiper instance for each container
swiperContainers.forEach((container, index) => {
  const nextButton = container
    .closest("section")
    .querySelector(".swiper-button-next");
  const prevButton = container
    .closest("section")
    .querySelector(".swiper-button-prev");
  const scrollbar = container
    .closest("section")
    .querySelector(".swiper-scrollbar");

  const breakpoints = {
    768: 2,
    1024: 2,
    1280: 3,
  };

  const getSlidesPerViewForWidth = () => {
    const screenWidth = window.innerWidth;
    let slidesPerView = 1; // Default slidesPerView for smallest screens

    for (const [breakpoint, value] of Object.entries(breakpoints)) {
      if (screenWidth >= breakpoint) {
        slidesPerView = value;
      }
    }
    return slidesPerView;
  };

  const maxSlidesPerView = getSlidesPerViewForWidth();
  // const slidesCount = slides.length;
  const slidesCount = container.querySelectorAll(".swiper-slide").length;

  const swiperWrapper = container.querySelector(".swiper-wrapper");
  const slides = container.querySelectorAll(".swiper-slide");

  if (slidesCount < maxSlidesPerView) {
    // Add conditional styles for insufficient slides
    swiperWrapper.classList.add("insufficient-slides");
    slides.forEach((slide) => {
      slide.classList.add("insufficient-slide");
    });
  } else {
    // Remove styles if they exist
    swiperWrapper.classList.remove("insufficient-slides");
    slides.forEach((slide) => {
      slide.classList.remove("insufficient-slide");
    });
  }

  const swiper = new Swiper(container, {
    modules: [Navigation, Scrollbar, Autoplay],
    direction: "horizontal",
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    scrollbar: {
      el: scrollbar,
      draggable: false,
    },
    // slidesPerView: 1,
    // spaceBetween: 20,
    // breakpoints: {
    //   768: {
    //     slidesPerView: 2,
    //     spaceBetween: 40,
    //   },
    //   1024: {
    //     slidesPerView: 3,
    //     spaceBetween: 40,
    //   },
    // },
    slidesPerView: 1,
    spaceBetween: 20,
    // centerInsufficientSlides: true,
    // centeredSlides: true,
    // centeredSlidesBounds: true,
    breakpoints: {
      768: {
        slidesPerView: Math.min(slidesCount, 2),
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: Math.min(slidesCount, 2),
        spaceBetween: 40,
      },
      1280: {
        slidesPerView: Math.min(slidesCount, 3),
        spaceBetween: 40,
      },
    },
  });

  let autoplayTimeout;

  const pauseAutoplay = () => {
    if (autoplayTimeout) clearTimeout(autoplayTimeout);

    swiper.autoplay.stop();

    autoplayTimeout = setTimeout(() => {
      swiper.autoplay.start();
    }, AUTOPLAY_PAUSE_DURATION);
  };

  if (nextButton) nextButton.addEventListener("click", pauseAutoplay);

  if (prevButton) prevButton.addEventListener("click", pauseAutoplay);

  if (container) {
    swiper.on("touchEnd", pauseAutoplay); // Trigger pause on touch end
  }
});
