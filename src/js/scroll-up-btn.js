const btn = document.getElementById("scroll-up-btn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100 || window.scrollY > 100) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
});

btn.addEventListener("click", () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
