"use strict";

import { arrayFavoritos, clickSeccion, verMas } from "./module.js";

export const galeriaImagenesFavoritos = document.querySelector(
  ".galeria-imagenes-favoritos"
);
export const verMasFavoritos = document.getElementById("ver-mas-favoritos");

const seccion = document.getElementById("segundo");
const sinContenido = document.querySelector(".sin-contenido");
let contFavoritos = {
  cantidad: 0,
};

seccion.addEventListener("click", (event) => {
  clickSeccion(event.target, arrayFavoritos, contFavoritos, sinContenido);
});

//BOTÓN VER MÁS FAVORITOS

verMasFavoritos.addEventListener("click", () => {
  verMas(
    "favoritos",
    arrayFavoritos,
    contFavoritos.cantidad,
    verMasFavoritos,
    "galeria-imagenes-favoritos"
  );
});
