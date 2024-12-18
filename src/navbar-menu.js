function Menu(e) {
    let list = document.querySelector(".topbar-menu");

    if (e.name === "menu") {
      e.name = "close";

      e.classList.remove("fa-bars");
      e.classList.add("fa-xmark");

      list.classList.add("translate-x-[400px]");
      list.classList.add("opacity-100");
      list.classList.add("p-2");
      list.classList.add("pt-8");
    } 
    else {
      e.name = "menu";

      e.classList.add("fa-bars");
      e.classList.remove("fa-xmark");

      list.classList.remove("translate-x-[400px]");
      list.classList.remove("opacity-100");
      list.classList.remove("p-2");
      list.classList.remove("pt-8");
    }
}