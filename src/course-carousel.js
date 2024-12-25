function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

class CustomCarousel {
  constructor(selector, options) {
    const isClass = selector.startsWith(".");
    const isID = selector.startsWith("#");

    if (isClass) {
      // Apply functionality to all carousels with the given class
      this.carousels = Array.from(document.querySelectorAll(selector));
      // console.log(this.carousels);
      this.carousels.forEach(
        (carousel) => new CarouselInstance(carousel, options)
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
    this.prevButton = container.querySelector(options.arrows?.prev);
    this.nextButton = container.querySelector(options.arrows?.next);
    // this.dotsContainer = this.carousel.querySelector(options.dots);
    this.progressBar = container.querySelector(options.progressBar);
    this.currentIndex = 0;
    this.settings = options.settings || {};
    this.responsive = options.responsive || [];
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.scrollStart = 0;
    this.autoScrollInterval = null;
    this.autoScrollDirection = 1;

    this.applyResponsiveSettings();

    // Debounce the resize event
    this.debouncedResize = this.debounce(() => {
      this.applyResponsiveSettings();
      this.updateProgressBar();
      // this.initialize();
    }, 200);

    window.addEventListener("resize", this.debouncedResize);

    this.initialize();
    this.startAutoScroll();
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
      if (!isTouchDevice()) {
        this.carousel.style.cursor = "grab";
        // console.log("not touch device");
      }
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
    this.stopAutoScroll();
    const { slidesToScroll = 1, gapBwItems = 10 } = this.settings;
    const cardWidth = this.cards[0].offsetWidth + gapBwItems;
    this.carousel.scrollBy({
      left: cardWidth * slidesToScroll,
      behavior: "smooth",
    });
    this.restartAutoScroll();
  }

  scrollToPrev() {
    this.stopAutoScroll();
    const { slidesToScroll = 1, gapBwItems = 0 } = this.settings;
    const cardWidth = this.cards[0].offsetWidth + gapBwItems;
    this.carousel.scrollBy({
      left: -cardWidth * slidesToScroll,
      behavior: "smooth",
    });
    this.restartAutoScroll();
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
    console.log("Start drag");
    event.preventDefault();
    this.isDragging = true;
    if (!isTouchDevice()) {
      this.carousel.style.cursor = "grabbing";
    }
    this.startX =
      event.type === "mousedown" ? event.pageX : event.touches[0].pageX;
    this.startY =
      event.type === "mousedown" ? event.pageY : event.touches[0].pageY;
    this.scrollStart = this.carousel.scrollLeft;
  }

  drag(event) {
    if (!this.isDragging) return;

    const currentX =
      event.type === "mousemove" ? event.pageX : event.touches[0].pageX;
    const currentY =
      event.type === "mousemove" ? event.pageY : event.touches[0].pageY;

    const deltaX = currentX - this.startX;
    const deltaY = Math.abs(currentY - this.startY);

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      // If vertical movement is greater, treat it as a vertical scroll
      this.isDragging = false; // End drag for the carousel
      console.log("vertical");
      return;
    }

    // Horizontal drag logic for carousel
    const scrollSpeed = 3.5;
    this.carousel.scrollLeft = this.scrollStart - deltaX * scrollSpeed;

    // Prevent default to avoid interfering with horizontal scrolling
    event.preventDefault();

    // if (deltaY > this.verticalScrollThreshold) {
    //   this.isVerticalScroll = true;
    //   return;
    // }

    // if (!this.isVerticalScroll) {
    //   const scrollSpeed = 3.5;
    //   this.carousel.scrollLeft = this.scrollStart - deltaX * scrollSpeed;
    // }

    // const x = event.type === "mousemove" ? event.pageX : event.touches[0].pageX;
    // const moveX = x - this.startX;

    // const scrollSpeed = 3.5;
    // this.carousel.scrollLeft = this.scrollStart - moveX * scrollSpeed;
  }

  endDrag() {
    this.isDragging = false;
    if (!isTouchDevice()) {
      this.carousel.style.cursor = "grab";
    }
    this.restartAutoScroll();
  }

  startAutoScroll() {
    const interval = 1250; // Time between auto-scrolls
    const { slidesToScroll = 1, gapBwItems = 10 } = this.settings;
    const cardWidth = this.cards[0].offsetWidth + gapBwItems;

    this.autoScrollInterval = setInterval(() => {
      if (
        this.autoScrollDirection === 1 &&
        this.carousel.scrollLeft + this.carousel.clientWidth >=
          this.carousel.scrollWidth
      ) {
        this.autoScrollDirection = -1;
      } else if (
        this.autoScrollDirection === -1 &&
        this.carousel.scrollLeft <= 0
      ) {
        this.autoScrollDirection = 1;
      }

      this.carousel.scrollBy({
        left: cardWidth * slidesToScroll * this.autoScrollDirection,
        behavior: "smooth",
      });
    }, interval);
  }

  stopAutoScroll() {
    clearInterval(this.autoScrollInterval);
  }

  restartAutoScroll() {
    this.stopAutoScroll();
    this.startAutoScroll();
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
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        itemWidth: 365,
        gapBwItems: 40,
        draggable: true,
      },
    },
    {
      breakpoint: 1536,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        itemWidth: 380,
        gapBwItems: 40,
        draggable: true,
      },
    },
  ],
});
