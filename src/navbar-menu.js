function Menu(e) {
    let list = document.querySelector(".topbar-menu");
    let body = document.body;

    if (e.name === "menu") {
      e.name = "close";

      e.classList.remove("fa-bars");
      e.classList.add("fa-xmark");

      list.classList.add("translate-x-[640px]");
      list.classList.add("opacity-100");

      body.style.overflow = "hidden";
    } 
    else {
      e.name = "menu";

      e.classList.add("fa-bars");
      e.classList.remove("fa-xmark");

      list.classList.remove("translate-x-[640px]");
      list.classList.remove("opacity-100");

      body.style.overflow = "";
    }
}