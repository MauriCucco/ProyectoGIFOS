"use strict";

import { maximizarGif } from "./module.js";

const menuHamburguesa = document.querySelector(".menu");

// MENÚ HAMBURGUESA DE MOBILE

document.addEventListener("click", (event) => {
  if (window.matchMedia("(max-width: 1199px)").matches) {
    const checkbox = document.getElementById("hamburguesa_checkbox");

    if (event.target.id === "hamburguesa_checkbox") {
      if (checkbox.checked) {
        menuHamburguesa.style.display = "unset";
      } else {
        menuHamburguesa.style.display = "none";
      }
    } else if (event.target.id === "segundo" || event.target.id === "tercero") {
      if (checkbox.checked) {
        menuHamburguesa.style.display = "none";
        checkbox.checked = false;
      }
    } else if (event.target.className === "gifs") {
      const iconMaximizar =
        event.target.nextSibling.lastElementChild.firstElementChild
          .firstElementChild;
      maximizarGif(iconMaximizar);
    }
  }
});
