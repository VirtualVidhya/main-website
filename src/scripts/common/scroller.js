const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
// if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//   addAnimation();
// }

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");

    // remove previously added clones
    scrollerInner
      .querySelectorAll('[aria-hidden="true"]')
      .forEach((el) => el.remove());

    const scrollerContent = Array.from(scrollerInner.children);

    let cloneTimes = 1;

    if (window.innerWidth > 1920) {
      cloneTimes = 4;
    } else if (window.innerWidth > 1536) {
      cloneTimes = 3;
    } else if (window.innerWidth > 1024) {
      cloneTimes = 2;
    }

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    for (let i = 0; i < cloneTimes; i++) {
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  });
}

addAnimation();
