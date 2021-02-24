"use strict";

export let modoNocturno = false;

const modo = document.getElementById("primero");
const theme = document.querySelector("#theme-link");
const gifos = document.querySelector("text#texto-gifos");
const searchIcon = document.querySelector(".search-icon");
const camaraImage = document.querySelector(".camara");
const peliculaImage = document.getElementById("pelicula");

// MODO NOCTURNO

modo.addEventListener("click", function () {
  if (!modoNocturno) {
    modoNocturno = true;
    theme.href = "css/style_nocturno.css";
    gifos.style.fill = "#FFFFFF";
    modo.textContent = "Modo Diurno";
    searchIcon.setAttribute("src", "images/icon-search-mod-noc.svg");
    camaraImage.setAttribute("src", "images/camara-modo-noc.svg");
    peliculaImage.setAttribute("src", "images/pelicula-modo-noc.svg");
  } else if (modoNocturno) {
    modoNocturno = false;
    theme.href = "./css/style_diurno.css";
    modo.textContent = "Modo Nocturno";
    gifos.style.fill = "#572EE5";
    searchIcon.setAttribute("src", "images/icon-search.svg");
    camaraImage.setAttribute("src", "images/camara.svg");
    peliculaImage.setAttribute("src", "images/pelicula.svg");
  }
});
