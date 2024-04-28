function Menu(e) {
    let list = document.querySelector(".topbar-menu");
  
    e.name === "menu"
      ? ((e.name = "close"),
        list.classList.add("top-[45px]"),
        list.classList.add("opacity-100"),
        list.classList.add("py-4"))
      : ((e.name = "menu"),
        list.classList.remove("top-[45px]"),
        list.classList.remove("opacity-100"),
        list.classList.remove("py-4"));
  }
  