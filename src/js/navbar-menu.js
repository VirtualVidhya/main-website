let btn = document.getElementById("topbar-menu-btn");
btn.addEventListener("click", Menu);

function Menu() {
  let list = document.querySelector(".topbar-menu");
  let body = document.body;

  if (btn.name === "menu") {
    btn.name = "close";

    btn.classList.remove("fa-bars");
    btn.classList.add("fa-xmark");

    list.classList.add("translate-x-[640px]");
    list.classList.add("opacity-100");

    body.style.overflow = "hidden";
  } else {
    btn.name = "menu";

    btn.classList.add("fa-bars");
    btn.classList.remove("fa-xmark");

    list.classList.remove("translate-x-[640px]");
    list.classList.remove("opacity-100");

    body.style.overflow = "";
  }
}
