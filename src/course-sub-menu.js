// function SubMenu(e) {
//     let list = document.querySelector(".sub-menu");

//     if (e.name === "menu") {
//       e.name = "close";

//       list.classList.add('hidden');
//       list.classList.remove('flex');
//     } 
//     else {
//       e.name = "menu";
      
//       list.classList.remove('hidden');
//       list.classList.add('flex');
//     }
// }

const supportsHover = window.matchMedia('(hover: hover)').matches;

function SubMenu(e) {
    console.log("submenu");

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
        } else {
            e.name = "menu";
            list.classList.remove('hidden');
            list.classList.add('flex');
        }
    }
}

if (!supportsHover) {
    document.querySelector(".submenu-trigger").addEventListener('click', (e) => {
        e.preventDefault();
        SubMenu(e.target);
    });
}
else {
    document.querySelector(".submenu-trigger").removeEventListener('click', (e) => {
        e.preventDefault();
        SubMenu(e.target);
    });
}
