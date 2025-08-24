(async () => {
  let dotLottieModule;

  async function loadLottie() {
    // try {
    //   return import("@lottiefiles/dotlottie-web");
    // } catch (error) {
    //   console.warn("Local dotLottie failed, falling back to CDN.");
    //   return import("https://esm.sh/@lottiefiles/dotlottie-web");
    // }
    try {
      return await import("https://esm.sh/@lottiefiles/dotlottie-web");
    } catch (error) {
      console.warn("CDN failed, falling back to local dotLottie.");
      return await import("@lottiefiles/dotlottie-web");
    }
  }

  // Preload dotLottie library **after** the page loads
  window.addEventListener("DOMContentLoaded", async () => {
    dotLottieModule = await loadLottie();
  });

  // Map to keep track of DotLottieWorker instances keyed by canvas element
  const animations = new Map();

  async function loadAnimation(canvas) {
    // If the library isn’t loaded yet, load it now
    if (!dotLottieModule) dotLottieModule = await loadLottie();
    const { DotLottieWorker } = dotLottieModule;

    if (canvas.dataset.loaded === "true") return; // Prevent duplicate loading

    canvas.dataset.loaded = "true";

    const relativePath = canvas.dataset.lottie;
    const absoluteUrl = new URL(relativePath, window.location.origin).href;
    const placeholder = canvas
      .closest(".lottie-container")
      ?.querySelector(".lottie-placeholder");

    canvas.style.opacity = "0"; // Ensure it's hidden initially

    // autoplay: false so we can control play/pause
    const animation = new DotLottieWorker({
      canvas: canvas,
      src: absoluteUrl,
      autoplay: false,
      loop: true,
      workerId: `worker-${canvas.id}`,
    });

    // store instance for later control (play/pause)
    animations.set(canvas, animation);

    animation.addEventListener("frame", () => {
      if (canvas.style.opacity === "0") {
        requestAnimationFrame(() => {
          if (canvas.dataset.enabled == "true") return;

          canvas.style.transition = "opacity 0.2s ease-in-out";
          canvas.style.opacity = "1";
          canvas.dataset.enabled = "true";
          // console.log("Enabled", canvas);

          if (placeholder) placeholder.style.opacity = "0";

          setTimeout(
            () => requestAnimationFrame(() => placeholder?.remove()),
            200
          );
        });
      }
    });
  }

  // **Smart Preloading Strategy**: Load animations **before** they are seen
  const preloadObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          // console.log("Entry", entry);
          // Start loading **before** it fully enters
          await loadAnimation(entry.target);
          observer.unobserve(entry.target); // Stop observing after first load
        }
      });
    },
    { rootMargin: "750px" } // Preload when the user is **750px away** from the animation
  );

  // Play when visible in viewport, pause when not.
  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(async (entry) => {
        const canvas = entry.target;
        let animation = animations.get(canvas);

        if (entry.isIntersecting) {
          // Ensure animation is loaded, then play
          if (!animation) {
            animation = await loadAnimation(canvas);
          }

          if (animation) {
            try {
              // console.log("starting to play", animation);
              animation.play?.();
            } catch (err) {
              // if the specific instance uses another API, console for debugging
              // console.warn("Failed to play animation", err);
            }
          }
        } else {
          // Pause if loaded
          if (animation) {
            try {
              // console.log("pausing", animation);
              animation.pause?.();
            } catch (err) {
              // console.warn("Failed to pause animation", err);
            }
          }
        }
      });
    },
    { rootMargin: "25px", threshold: 0 } // play only when actually in viewport
  );

  // document
  //   .querySelectorAll("[data-lottie]")
  //   .forEach((el) => observer.observe(el));
  document.querySelectorAll("[data-lottie]").forEach((el) => {
    preloadObserver.observe(el);
    visibilityObserver.observe(el);
  });
})();
