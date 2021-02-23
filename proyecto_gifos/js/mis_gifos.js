"use strict";

import { arrayMisGifos } from "./crear_gifos.js";
import { clickSeccion, verMas } from "./module.js";

export const galeriaMisGifos = document.querySelector(".galeria-gifos");
export const verMasGifos = document.getElementById("ver-mas-gifos");

const seccion = document.getElementById("tercero");
const sinContenidoGifos = document.querySelector(".sin-gifos");
let contMisGifos = {
  cantidad: 0,
};

seccion.addEventListener("click", (event) => {
  clickSeccion(event.target, arrayMisGifos, contMisGifos, sinContenidoGifos);
});

//BOTÓN VER MÁS DE MIS GIFOS

verMasGifos.addEventListener("click", () => {
  verMas(
    "mis-gifos",
    arrayMisGifos,
    contMisGifos.cantidad,
    verMasGifos,
    "ver-mas-gifos"
  );
});
