function initializeCourseSubMenu() {
  const supportsHover = window.matchMedia("(hover: hover)").matches;
  const list = document.querySelector(".sub-menu");
  const submenu_btn = document.querySelector(".submenu-trigger");

  if (!list || !submenu_btn) {
    return;
  }

  function toggleSubMenu(e) {
    const isOpen = submenu_btn.getAttribute("data-cousemenu-state") === "open";

    if (isOpen) {
      // Close the menu
      submenu_btn.setAttribute("data-cousemenu-state", "close");

      submenu_btn.classList.remove("text-font-color-sec");
      submenu_btn.classList.remove("underline");

      list.classList.add("hidden");
      list.classList.remove("flex");
    } else {
      // Open the menu
      submenu_btn.setAttribute("data-cousemenu-state", "open");

      submenu_btn.classList.add("text-font-color-sec");
      submenu_btn.classList.add("underline");

      list.classList.remove("hidden");
      list.classList.add("flex");
    }
  }

  if (!supportsHover) {
    submenu_btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleSubMenu(e.target);
    });

    submenu_btn.classList.remove("hover:text-font-color-sec");
    submenu_btn.classList.remove("hover:underline");
  } else {
    submenu_btn.removeEventListener("click", (e) => {
      e.preventDefault();
      toggleSubMenu(e.target);
    });

    list.classList.add("sm:group-hover:flex");

    submenu_btn.classList.add("hover:text-font-color-sec");
    submenu_btn.classList.add("hover:underline");
  }
}

initializeCourseSubMenu();
