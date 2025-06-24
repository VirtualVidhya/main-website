function initializeNavbarMenu() {
  const btn = document.getElementById("topbar-menu-btn");

  if (!btn) {
    return;
  }

  btn.addEventListener("click", toggleMenu);

  const closeBtnIcon = btn.querySelector("svg[data-state='close']");
  const openBtnIcon = btn.querySelector("svg[data-state='open']");

  function toggleMenu() {
    const list = document.querySelector(".topbar-menu");
    const nav = document.querySelector(".topbar-nav");
    const body = document.body;

    const isOpen = btn.getAttribute("data-topbarmenu-state") === "open";

    if (!isOpen) {
      // Open the menu
      btn.setAttribute("data-topbarmenu-state", "open");

      if (closeBtnIcon) closeBtnIcon.style.display = "block";
      if (openBtnIcon) openBtnIcon.style.display = "none";

      list.classList.add("translate-x-[640px]", "opacity-100");
      // document.documentElement.style.overflow = "hidden";
      body.style.overflow = "hidden";
      nav.style.overflowY = "auto";
    } else {
      // Close the menu
      btn.setAttribute("data-topbarmenu-state", "close");

      if (closeBtnIcon) closeBtnIcon.style.display = "none";
      if (openBtnIcon) openBtnIcon.style.display = "block";

      list.classList.remove("translate-x-[640px]", "opacity-100");
      // document.documentElement.style.overflow = "";
      body.style.overflow = "";
      nav.style.overflowY = "";
    }
  }
}

initializeNavbarMenu();
