"use strict";

import { modoNocturno } from ".//modo_nocturno.js";
import {
  apiKey,
  arrayResultados,
  arrayResultadosTrending,
  borrarFavorito,
  cerrarMax,
  galeria,
  galeriaTrend,
  getGifs,
  guardarFavorito,
  maximizarGif,
  mostrarTarjetas,
  scrollingTo,
  seccionBusquedas,
  tituloBusqueda,
} from "./module.js";

const input = document.getElementById("input-busqueda");
const lista = document.querySelector(".sugerencias");
const inactivo = document.querySelector(".inactivo");
const liSugerencias = document.getElementsByClassName("li-sugerencias");
const imgList = document.getElementsByClassName("list-img");
const imgSearch = document.querySelector(".search-icon");
const search = document.querySelector(".search");
const botonMas = document.getElementById("ver-mas");
const sinResultados = document.querySelector(".sin-resultados");
const contenidoTrending = document.getElementsByClassName("contenido-trending");
const primerBoton = document.querySelector(".primer-boton-trend");
const segundoBoton = document.querySelector(".segundo-boton-trend");
let cont = 0; //contador para el parámetro offset del endpoint
let arrayNuevosResultados = []; //donde guardo los nuevos resultados
let timer = 0; // para el setInterval del slide de trending

//FUNCIONALIDAD DEL INPUT DE BÚSQUEDA

function openInputSearch() {
  if (input.value === "") {
    closeInputSearch();
  } else if (lista.firstElementChild) {
    //si hay al menos una sugerencia en el input

    changeActivo("-activo");

    if (modoNocturno) {
      //modo nocturno
      imgSearch.setAttribute("src", "images/close-noc.svg");
      inactivo.setAttribute("src", "images/icon-search-mod-noc.svg");
    } else {
      imgSearch.setAttribute("src", "images/close.svg"); //cambio el icono de búsqueda
      inactivo.setAttribute("src", "images/icon-search.svg");
    }
    imgSearch.className = "img-close";
  }
}

function closeInputSearch() {
  changeActivo();

  if (modoNocturno) {
    //modo nocturno
    imgSearch.setAttribute("src", "images/icon-search-mod-noc.svg");
  } else {
    imgSearch.setAttribute("src", "images/icon-search.svg");
  }
  imgSearch.className = "search-icon";
}

function changeActivo(string = "") {
  let pList = document.getElementsByClassName("list-p"); //después que los crea crearSugerencia()

  inactivo.className = `inactivo${string}`;
  lista.className = `sugerencias${string}`;
  for (let li of liSugerencias) {
    li.className = `li-sugerencias${string}`;
  }
  for (let img of imgList) {
    img.className = `list-img${string}`;
  }
  for (let p of pList) {
    p.className = `list-p${string}`;
  }
  search.classname = `search${string}`;
}

input.addEventListener("click", () => {
  input.value === "" ? closeInputSearch() : openInputSearch();
});

//EVENTOS GLOBALES

document.addEventListener("click", (event) => {
  if (
    inactivo.className === "inactivo-activo" &&
    (event.target.localName === "section" || event.target.localName == "div")
  ) {
    closeInputSearch(); //cierra el input al clickear fuera de él
  } else if (event.target.getAttribute("src") === "images/icon-max.svg") {
    maximizarGif(event.target);
  } else if (event.target.className === "close") {
    cerrarMax(event.target);
  } else if (
    event.target.className === "list-p-activo" ||
    event.target.className === "contenido-trending"
  ) {
    input.value = event.target.textContent;
    galeria.innerHTML = ""; //limpio la sección
    busqueda(event.target.textContent);
    cont = 0; //reseteo el contador del parámetro offset
    arrayResultados.splice(0, arrayResultados.length); //reseteo el array que guarda la info de los resultados
  } else if (
    event.target.getAttribute("src") === "images/icon-fav-hover.svg" ||
    event.target.getAttribute("src") === "images/icon-fav-hover-noc.svg"
  ) {
    guardarFavorito(event.target.id, event.target);
  } else if (
    event.target.getAttribute("src") === "images/icon-fav-active.svg" ||
    event.target.getAttribute("src") === "images/icon-fav-active-noc.svg"
  ) {
    borrarFavorito(event.target.id, event.target);
  }
});

input.addEventListener("keyup", (e) => {
  if (
    e.key === "Enter" && //Al presionar enter
    input.value
  ) {
    galeria.innerHTML = ""; //limpio la sección
    busqueda(input.value); //busco la palabra del input
    return closeInputSearch();
  } else if (e.key === " " && input.value == "") {
    //Al presionar backspace y el input está vacío
    return closeInputSearch(); // cierra las sugerencias
  }

  sugerencias();
  openInputSearch();
});

//LLAMADA A LA API DE GIPHY PARA SUGERENCIAS

function sugerencias() {
  getGifs("search/tags", "4", input.value)
    .then((response) => {
      if (response.length === 0) {
        return closeInputSearch();
      }

      if (liSugerencias.length <= 4) {
        lista.innerHTML = ""; //para que no se acumulen las sugerencias
      }

      response.forEach((sugerencia) => {
        crearSugerencia(sugerencia.name);
      });
    })
    .catch((e) => console.log("ERROR: ", e));
}

//FUNCIÓN QUE CREA CADA SUGERENCIA

function crearSugerencia(string) {
  let nuevoLi = document.createElement("li");
  let nuevoImg = document.createElement("img");
  let nuevoP = document.createElement("p");

  if (modoNocturno) {
    nuevoImg.setAttribute("src", "images/icon-search-mod-noc.svg");
  } else {
    nuevoImg.setAttribute("src", "images/icon-search.svg");
  }

  nuevoImg.setAttribute("alt", "Ícono de búsqueda");
  nuevoP.textContent = string; //recibe la sugerencia
  lista.appendChild(nuevoLi);
  nuevoLi.className = "li-sugerencias";
  nuevoLi.appendChild(nuevoImg);
  nuevoImg.className = "list-img";
  nuevoLi.appendChild(nuevoP);
  nuevoP.className = "list-p";

  openInputSearch(); //para que se sumen las clases "activos"
}

//LIMPIAR LAS BÚSQUEDAS

imgSearch.addEventListener("click", (event) => {
  if (
    imgSearch.getAttribute("src") === "images/close.svg" ||
    "images/close-noc.svg" ||
    input.value === ""
  ) {
    lista.textContent = "";
    input.value = "";
    event.preventDefault();
    return closeInputSearch();
  }

  galeria.innerHTML = ""; //limpio la sección
  busqueda(input.value);
});

//FUNCIÓN DE BÚSQUEDA

async function busqueda(string, esBotonMas = false) {
  try {
    const jsonData = await getGifs("search", 12, string);

    input.blur(); //para sacar el teclado del celu
    seccionBusquedas.focus();

    seccionBusquedas.style.display = "unset";
    tituloBusqueda.textContent = input.value;

    if (jsonData.length === 0 && input.value) {
      sinResultados.style.display = "flex";
      galeria.style.display = "none";
      botonMas.style.display = "none";
      cont = 0; //reseteo el contador del parámetro offset
    } else if (jsonData.length >= 1) {
      sinResultados.style.display = "none";
      galeria.style.display = "flex";
      closeInputSearch();

      arrayNuevosResultados = jsonData;

      mostrarTarjetas(
        arrayNuevosResultados,
        ".galeria-imagenes",
        "maximizar-busquedas",
        "busquedas"
      );

      arrayResultados.push(...arrayNuevosResultados);

      if (jsonData.length >= 12) {
        //display del botón ``ver más´´

        botonMas.style.display = "block";
        cont += 12; //sumo el contador que va a ir en el addEventListener del botón ``ver más´´
      } else if (jsonData.length < 12) {
        botonMas.style.display = "none";
        cont = 0; //reseteo el contador del parámetro offset
      }
    }

    if (esBotonMas === false) {
      //si no hago click en el botón de ver más
      scrollingTo(tituloBusqueda);
    }
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

// FUNCIÓN PARA LAS CATEGORÍAS MÁS BUSCADAS

const busquedasPopulares = (async function () {
  try {
    const resp2 = await fetch(
      `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`
    );
    const { data } = await resp2.json();

    data.splice(0, 5).forEach((busqueda, index) => {
      contenidoTrending[index].textContent = busqueda;
      if (index < 4) contenidoTrending[index].after(", ");
    });
  } catch (error) {
    console.log("ERROR: ", error);
  }
})();

// BOTÓN ``VER MÁS´´

botonMas.addEventListener("click", () => {
  busqueda(`${tituloBusqueda.textContent}&offset=${cont}`, true);
});

// SECCIÓN TRENDING GIFOS

const trendingGifos = (async function () {
  try {
    const data = await getGifs("trending", "12");

    arrayResultadosTrending.push(...data);

    mostrarTarjetas(
      arrayResultadosTrending,
      ".galeria-trending",
      "maximizar-trending",
      "trending"
    );
  } catch (error) {
    console.log("ERROR: ", error);
  }
})();

// SLIDE DE LA SECCIÓN ``TRENDING GIFOS´´

segundoBoton.addEventListener("click", () => {
  galeriaTrend.scrollLeft += 350;
});

primerBoton.addEventListener("click", () => {
  galeriaTrend.scrollLeft -= 350;
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    //Al presionar la flecha derecha
    galeriaTrend.scrollLeft += 350;
  } else if (e.key === "ArrowLeft") {
    //Al presionar la flecha izquierda
    galeriaTrend.scrollLeft -= 350;
  }
});

document.addEventListener("mousedown", (e) => {
  if (
    e.target.className === "segundo-boton-trend" ||
    e.target.id === "right-trend"
  ) {
    timer = setInterval(() => {
      galeriaTrend.scrollLeft += 300;
    }, 150);
  } else if (
    e.target.className === "primer-boton-trend" ||
    e.target.id === "left-trend"
  ) {
    timer = setInterval(() => {
      galeriaTrend.scrollLeft -= 300;
    }, 150);
  }
});

document.addEventListener("mouseup", (e) => {
  if (
    e.target.className === "segundo-boton-trend" ||
    "primer-boton-trend" ||
    e.target.id === "right-trend" ||
    "left-trend"
  ) {
    clearInterval(timer);
  }
});
