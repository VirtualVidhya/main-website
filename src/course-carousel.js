class CustomCarousel {
  constructor(selector, options) {
    const isClass = selector.startsWith(".");
    const isID = selector.startsWith("#");

    if (isClass) {
      // Apply functionality to all carousels with the given class
      this.carousels = Array.from(document.querySelectorAll(selector));
      // console.log(this.carousels);
      this.carousels.forEach((carousel) =>
        new CarouselInstance(carousel, options)
      );
    } else if (isID) {
      // Apply functionality to a single carousel with the given ID
      const carousel = document.querySelector(selector);
      if (carousel) {
        new CarouselInstance(carousel, options);
      }
    }
  }
}

class CarouselInstance {
  constructor(carousel, options) {
    this.carousel = carousel;
    this.cards = Array.from(this.carousel.children);
    const container = this.carousel.closest("section");
    console.log(container);
    this.prevButton = container.querySelector(options.arrows?.prev);
    this.nextButton = container.querySelector(options.arrows?.next);
    // this.dotsContainer = this.carousel.querySelector(options.dots);
    this.progressBar = container.querySelector(options.progressBar);
    // console.log(this.progressBar);
    this.currentIndex = 0;
    this.settings = options.settings || {};
    this.responsive = options.responsive || [];
    this.isDragging = false;
    this.startX = 0;
    this.scrollStart = 0;

    this.applyResponsiveSettings();

    // Debounce the resize event
    this.debouncedResize = this.debounce(() => {
      this.applyResponsiveSettings();
      this.initialize();
    }, 200);

    window.addEventListener("resize", this.debouncedResize);

    this.initialize();
  }

  debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  applyResponsiveSettings() {
    const width = window.innerWidth;

    // Sort breakpoints in descending order of min-width
    this.responsive.sort((a, b) => b.breakpoint - a.breakpoint);

    const responsiveSetting = this.responsive.find(
      (r) => width >= r.breakpoint
    );

    if (responsiveSetting) {
      this.settings = { ...this.settings, ...responsiveSetting.settings };
    }

    // console.log(this.settings);

    // window.addEventListener("resize", () => {
    //   this.applyResponsiveSettings();
    //   this.initialize(); // Re-initialize on resize
    // });
  }

  initialize() {
    // console.log("initialize");
    // this.updateDots();
    this.updateProgressBar();
    this.addEventListeners();
  }

  addEventListeners() {
    this.nextButton?.addEventListener("click", () => this.scrollToNext());
    this.prevButton?.addEventListener("click", () => this.scrollToPrev());
    this.carousel.addEventListener("scroll", () => this.handleScroll());
    // this.dotsContainer?.addEventListener("click", (event) =>
    //   this.handleDotClick(event)
    // );

    if (this.settings.draggable) {
      this.carousel.style.cursor = "grab";
      this.carousel.addEventListener("mousedown", (e) => this.startDrag(e));
      this.carousel.addEventListener("mousemove", (e) => this.drag(e));
      this.carousel.addEventListener("mouseup", () => this.endDrag());
      this.carousel.addEventListener("mouseleave", () => this.endDrag());
      this.carousel.addEventListener("touchstart", (e) => this.startDrag(e));
      this.carousel.addEventListener("touchmove", (e) => this.drag(e));
      this.carousel.addEventListener("touchend", () => this.endDrag());
    }
  }

  scrollToNext() {
    const { slidesToScroll = 1, gapBwItems = 10 } = this.settings;
    const cardWidth = this.cards[0].offsetWidth + gapBwItems;
    this.carousel.scrollBy({
      left: cardWidth * slidesToScroll,
      behavior: "smooth",
    });
  }

  scrollToPrev() {
    const { slidesToScroll = 1, gapBwItems = 0 } = this.settings;
    const cardWidth = this.cards[0].offsetWidth + gapBwItems;
    this.carousel.scrollBy({
      left: -cardWidth * slidesToScroll,
      behavior: "smooth",
    });
  }

  handleScroll() {
    const scrollPosition = this.carousel.scrollLeft;
    const totalScroll = this.carousel.scrollWidth - this.carousel.clientWidth;
    this.currentIndex = Math.round(
      (scrollPosition / totalScroll) * (this.cards.length - 1)
    );
    this.updateProgressBar();
    // this.updateDots();
  }

  // handleDotClick(event) {
  //   if (event.target.tagName !== "BUTTON") return;
  //   const { gapBwItems = 0 } = this.settings;
  //   const index = Array.from(this.dotsContainer.children).indexOf(event.target);
  //   const cardWidth = this.cards[0].offsetWidth + gapBwItems;
  //   this.carousel.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  // }

  // updateDots() {
  //   if (!this.dotsContainer) return;
  //   this.dotsContainer.innerHTML = "";
  //   this.cards.forEach((_, index) => {
  //     const dot = document.createElement("button");
  //     if (index === this.currentIndex) {
  //       dot.classList.add("active");
  //     }
  //     this.dotsContainer.appendChild(dot);
  //   });
  // }

  updateProgressBar() {
    if (!this.progressBar) return;
    const scrollPosition = this.carousel.scrollLeft;
    const totalScroll = this.carousel.scrollWidth - this.carousel.clientWidth;
    const progressPercentage = (scrollPosition / totalScroll) * 100;
    this.progressBar.style.width = `${progressPercentage}%`;
    // console.log("progressBar", this.carousel.scrollWidth, this.carousel.clientWidth, totalScroll, scrollPosition);
  }

  startDrag(event) {
    event.preventDefault();
    this.isDragging = true;
    this.carousel.style.cursor = "grabbing";
    this.startX =
      event.type === "mousedown" ? event.pageX : event.touches[0].pageX;
    this.scrollStart = this.carousel.scrollLeft;
  }

  drag(event) {
    if (!this.isDragging) return;
    const x = event.type === "mousemove" ? event.pageX : event.touches[0].pageX;
    const moveX = x - this.startX;

    const scrollSpeed = 1.15;
    this.carousel.scrollLeft = this.scrollStart - moveX * scrollSpeed;
  }

  endDrag() {
    this.isDragging = false;
    this.carousel.style.cursor = "grab";
  }
}

// Usage
new CustomCarousel(".course-carousel", {
  arrows: {
    prev: "#prev-btn",
    next: "#next-btn",
  },
  // dots: ".course-carousel-dots",
  progressBar: "#progress-bar",
  settings: {
    slidesToShow: 1,
    slidesToScroll: 1,
    itemWidth: 300,
    gapBwItems: 20,
    draggable: true,
  },
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        itemWidth: 320,
        gapBwItems: 40,
        draggable: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        itemWidth: 345,
        gapBwItems: 40,
        draggable: true,
      },
    },
  ],
});
