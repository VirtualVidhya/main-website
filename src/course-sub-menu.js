const supportsHover = window.matchMedia('(hover: hover)').matches;

function SubMenu(e) {
    let list = document.querySelector(".sub-menu");

    if (supportsHover) {
        list.classList.add('sm:group-hover:flex');
        list.classList.remove('hidden');
    } 
    else {
        if (e.name === "menu") {
            e.name = "close";

            list.classList.add('hidden');
            list.classList.remove('flex');

            submenu_btn.classList.remove("text-font-color-sec");
            submenu_btn.classList.remove("underline");
        } 
        else {
            e.name = "menu";

            submenu_btn.classList.add("text-font-color-sec");
            submenu_btn.classList.add("underline");

            list.classList.remove('hidden');
            list.classList.add('flex');
        }
    }
}

let submenu_btn = document.querySelector(".submenu-trigger");

if (!supportsHover) {
    submenu_btn.addEventListener('click', (e) => {
        e.preventDefault();
        SubMenu(e.target);
    });

    submenu_btn.classList.remove("hover:text-font-color-sec");
    submenu_btn.classList.remove("hover:underline");
}
else {
    submenu_btn.removeEventListener('click', (e) => {
        e.preventDefault();
        SubMenu(e.target);
    });

    submenu_btn.classList.add("hover:text-font-color-sec");
    submenu_btn.classList.add("hover:underline");
}
