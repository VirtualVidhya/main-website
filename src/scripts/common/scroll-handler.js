function setupScrollButton() {
  const btn = document.getElementById("scroll-up-btn");

  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100 || window.scrollY > 100) {
      // btn.style.display = "block";
      btn.style.display = "flex";
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
}

function setupAnnouncementBar() {
  const dynamic_bar = document.getElementById("dynamic-announcement-bar");
  const fixed_bar = document.getElementById("fixed-announcement-bar");

  const styles = getComputedStyle(document.documentElement);
  let dynamic_bar_height = parseFloat(styles.getPropertyValue('--dynamic-announcement-bar-height'));
  let fixed_bar_height = parseFloat(styles.getPropertyValue('--fixed-announcement-bar-height'));
  // let bar_height = fixed_bar_height + dynamic_bar_height;

  // console.log(fixed_bar_height, dynamic_bar_height, bar_height);

  if (!dynamic_bar) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 200 || window.scrollY > 200) {
      // btn.style.display = "block";
      dynamic_bar.style.display = "none";
      document.documentElement.style.setProperty('--dynamic-announcement-bar-height', '0px');
    } else {
      dynamic_bar.style.display = "flex";
      document.documentElement.style.setProperty('--dynamic-announcement-bar-height', `${dynamic_bar_height}px`);
    }

    if (window.pageYOffset > 800 || window.scrollY > 800) {
      // btn.style.display = "block";
      fixed_bar.style.display = "none";
      document.documentElement.style.setProperty('--fixed-announcement-bar-height', '0px');
    } else {
      fixed_bar.style.display = "flex";
      document.documentElement.style.setProperty('--fixed-announcement-bar-height', `${fixed_bar_height}px`);
    }
  });

  if (!fixed_bar) return;
}

setupScrollButton();
setupAnnouncementBar();
