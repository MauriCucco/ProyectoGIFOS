"use strict";

import { arrayMisGifos, botonCrear } from "./crear_gifos.js";
import { galeriaImagenesFavoritos, verMasFavoritos } from "./favoritos.js";
import { galeriaMisGifos, verMasGifos } from "./mis_gifos.js";
import { modoNocturno } from "./modo_nocturno.js";

export const apiKey = "8uL8ygBG5KwNy4ij60wPxjjW8nuykVIR";
export const urlServer = "https://api.giphy.com/v1/gifs";
export const seccionBusquedas = document.getElementById("busquedas");
export const seccionPresentacion = document.getElementById("presentacion");
export const seccionFavoritos = document.getElementById("favoritos");
export const seccionTrending = document.getElementById("trending-slide");
export const seccionCrearGifos = document.getElementById("crear-gifos");
export const seccionMisGifos = document.getElementById("mis-gifos");
export const galeria = document.querySelector(".galeria-imagenes");
export const galeriaTrend = document.querySelector(".galeria-trending");
export const tituloBusqueda = document.getElementById("titulo-busqueda");
export let arrayResultadosTrending = []; //creo un array para los resultados de ésta sección
export let arrayResultados = []; //para guardar la información de cada gif buscado
export let arrayFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const seccionGifMax = document.getElementById("gif-maximizado");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const imgClose = document.querySelector(".close");
const galeriaMax = document.getElementById("galeria-max");
const left = document.querySelector(".primer-boton");
const right = document.querySelector(".segundo-boton");
let imagenMax = ""; //la imagen a maximizar
let indexImagenMax; //para saber el index de la imagen en el array
let seccion = ""; //para saber de qué sección es la imagen maximizada

//FUNCIÓN QUE BUSCA GIFS POR VALUE

export const getGifs = async (endpoint, number, value = "") => {
  try {
    let endPoint = `${urlServer}/${endpoint}?q=${value}&api_key=${apiKey}&limit=${number}&lang=es`;
    const resp = await fetch(endPoint);
    const { data } = await resp.json();
    return data.map((elemento) => {
      return {
        id: elemento.id,
        images: elemento.images,
        title: elemento.title,
        username: elemento.username,
        name: elemento.name,
      };
    });
  } catch (error) {
    throw error;
  }
};

//FUNCIÓN QUE BUSCA UN GIF POR EL ID

export async function getGifById(id) {
  try {
    const gif = await fetch(`${urlServer}/${id}?api_key=${apiKey}`);
    const { data } = await gif.json();

    return {
      id: data.id,
      images: data.images,
      title: data.title,
      username: data.username,
      url: data.url,
    };
  } catch (error) {
    throw error;
  }
}

//FUNCIÓN PARA SCROLLEAR A UN DETERMINADO ELEMENTO

export const scrollingTo = (elemento) => {
  const { y } = elemento.getBoundingClientRect();
  window.scrollTo({
    top: y + window.scrollY,
    left: 0,
    behavior: "smooth",
  });
};

//Función que que crea un blob de la url de GIPHy para poder descargarlo después

export async function createBlob(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

// FUNCIÓN PARA CREAR CADA TARJETA CON EL GIF

export async function crearTarjeta(
  url,
  idImagen,
  titulo,
  usuario,
  tipoGaleria,
  tipoMaximizar,
  seccionName
) {
  try {
    let galeriaImagenes = document.querySelector(tipoGaleria);
    let divImagen = document.createElement("div");
    let imgGif = document.createElement("img");
    let divIconos = document.createElement("div");
    let divIcon1 = document.createElement("div");
    let divIcon2 = document.createElement("div");
    let divIcon3 = document.createElement("div");
    let imgIcon1 = document.createElement("img");
    let imgIcon2 = document.createElement("img");
    let imgIcon3 = document.createElement("img");
    let divInfo = document.createElement("div");
    let usuarioP = document.createElement("p");
    let tituloP = document.createElement("p");
    let linkDescarga = document.createElement("a");
    let linkMaximizar = document.createElement("a");

    divImagen.className = "imagen";
    imgGif.className = "gifs";
    divIconos.className = "iconos";
    divIcon1.className = "icon";
    divIcon2.className = "icon";
    divIcon3.className = "icon";
    imgIcon1.id = idImagen;
    imgIcon1.className = seccionName;
    imgIcon2.className = "img-descarga";
    linkMaximizar.className = "link-maximizar";
    imgIcon3.className = tipoMaximizar;
    divInfo.className = "info";
    usuarioP.id = "usuario";
    tituloP.className = "titulo-gifo";

    galeriaImagenes.appendChild(divImagen);
    divImagen.appendChild(imgGif);
    imgGif.setAttribute("src", url);
    divImagen.appendChild(divIconos);
    divIconos.appendChild(divIcon1);
    divIconos.appendChild(divIcon2);
    divIconos.appendChild(divIcon3);
    divIcon1.appendChild(imgIcon1);
    divIcon2.appendChild(linkDescarga);
    linkDescarga.setAttribute("download", "download");
    linkDescarga.setAttribute("target", "_blank");
    linkDescarga.appendChild(imgIcon2);
    imgIcon2.setAttribute("src", "images/icon-download.svg");
    divIcon3.appendChild(linkMaximizar);
    linkMaximizar.setAttribute("href", "#gif-maximizado");
    linkMaximizar.appendChild(imgIcon3);
    imgIcon3.setAttribute("src", "images/icon-max.svg");
    divImagen.appendChild(divInfo);
    divInfo.appendChild(usuarioP);
    usuarioP.textContent = usuario || "No user";
    divInfo.appendChild(tituloP);
    tituloP.textContent = titulo || "No title";

    esFavorito(idImagen, imgIcon1); //veo si está en el array de favoritos

    const href = await createBlob(url);
    linkDescarga.setAttribute("href", href);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

// FUNCIÓN PARA CREAR TARJETAS MAXIMIZADAS

export async function crearTarjetaMaximizada(
  url,
  titulo,
  usuario,
  hrefDescarga,
  seccion,
  idGif
) {
  try {
    let galeriaImagenesMax = document.querySelector(".galeria");

    let divImagenMax = document.createElement("div");
    let imgGifMax = document.createElement("img");
    let divGridMax = document.createElement("div");
    let usuarioMax = document.createElement("p");
    let tituloMax = document.createElement("h3");
    let linkDescargaMax = document.createElement("a");
    let imgFavorito = document.createElement("img");
    let imgDescarga = document.createElement("img");

    divImagenMax.className = "imagen-max";
    imgGifMax.className = "gifs-max";
    divGridMax.className = "grid-max";
    usuarioMax.id = "item1";
    tituloMax.id = "item2";
    linkDescargaMax.id = "favorito-max";
    imgFavorito.id = idGif;
    imgFavorito.className = "itemFavorito";
    imgFavorito.classList.add(seccion);
    imgDescarga.id = "item4";

    galeriaImagenesMax.appendChild(divImagenMax);
    divImagenMax.appendChild(imgGifMax);
    imgGifMax.setAttribute("src", url);
    divImagenMax.appendChild(divGridMax);
    divGridMax.appendChild(usuarioMax);
    divGridMax.appendChild(tituloMax);
    divGridMax.appendChild(linkDescargaMax);
    divGridMax.appendChild(imgFavorito);
    linkDescargaMax.appendChild(imgDescarga);
    linkDescargaMax.setAttribute("download", "download");
    linkDescargaMax.setAttribute("target", "_blank");
    usuarioMax.textContent = usuario || "No user";
    tituloMax.textContent = titulo || "No title";

    if (modoNocturno) {
      imgClose.src = "images/close-noc.svg";
      tituloMax.style.color = "white";
      imgDescarga.setAttribute("src", "images/icon-download-noc.svg");
    } else {
      imgDescarga.setAttribute("src", "images/icon-download.svg");
    }

    esFavorito(idGif, imgFavorito); //veo si está en el array de favoritos

    const href = await createBlob(hrefDescarga);
    linkDescargaMax.setAttribute("href", href);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

//FUNCIÓN PARA ABRIR GIF MAXIMIZADO

export const maximizarGif = (target) => {
  const imagenId =
    target.parentElement.parentElement.previousSibling.previousSibling
      .firstElementChild.id;

  seccionBusquedas.style.display = "none";
  seccionTrending.style.display = "none";
  seccionPresentacion.style.display = "none";
  seccionFavoritos.style.display = "none";
  seccionMisGifos.style.display = "none";
  header.style.display = "none";
  footer.style.display = "none";
  seccionGifMax.style.display = "unset";

  switch (target.className) {
    case "maximizar-trending":
      seccion = "trending";
      elegirImagenMax(arrayResultadosTrending, imagenId);
      break;
    case "maximizar-busquedas":
      seccion = "busquedas";
      elegirImagenMax(arrayResultados, imagenId);
      break;
    case "maximizar-favoritos":
      seccion = "favoritos";
      elegirImagenMax(arrayFavoritos, imagenId);
      break;
    case "maximizar-mis-gifos":
      seccion = "mis-gifos";
      elegirImagenMax(arrayMisGifos, imagenId);
      break;
  }

  crearTarjetaMaximizada(
    imagenMax.images.fixed_height.url,
    imagenMax.title,
    imagenMax.username,
    imagenMax.images.downsized.url,
    seccion,
    imagenId
  );
};

function elegirImagenMax(array, id) {
  imagenMax = array.find((elemento, index) => {
    indexImagenMax = index;
    return elemento.id === id;
  });
}

//FUNCIÓN PARA CERRAR EL GIF MAXIMIZADO

export const cerrarMax = () => {
  seccionTrending.style.display = "";
  header.style.display = "";
  footer.style.display = "";
  seccionGifMax.style.display = "none";
  galeriaMax.innerHTML = "";

  if (seccion === "trending") {
    if (tituloBusqueda.textContent !== "") {
      seccionBusquedas.style.display = "unset";
    } else if (
      document.getElementById("segundo").className === "lista activo"
    ) {
      seccionFavoritos.style.display = "unset";
      scrollingTo(document.getElementById("trending-slide"));
      return;
    } else if (
      document.getElementById("tercero").className === "lista activo"
    ) {
      seccionMisGifos.style.display = "unset";
      scrollingTo(document.getElementById("trending-slide"));
      return;
    }
    seccionPresentacion.style.display = "";
    scrollingTo(document.getElementById("trending-slide"));
  } else if (seccion === "busquedas") {
    seccionBusquedas.style.display = "unset";
    seccionPresentacion.style.display = "";
    scrollingTo(document.getElementById("busquedas"));
  } else if (seccion === "favoritos") {
    seccionFavoritos.style.display = "unset";
    scrollingTo(document.getElementById("favoritos"));
  } else if (seccion === "mis-gifos") {
    seccionMisGifos.style.display = "unset";
    scrollingTo(document.getElementById("mis-gifos"));
  }
};

//FUNCIONES PARA PASAR DE A UNO LOS GIFS MAXIMIZADOS

right.addEventListener("click", () => {
  switch (seccion) {
    case "trending":
      pasarDerecha(arrayResultadosTrending);
      break;
    case "busquedas":
      pasarDerecha(arrayResultados);
      break;
    case "favoritos":
      pasarDerecha(arrayFavoritos);
      break;
    case "mis-gifos":
      pasarDerecha(arrayMisGifos);
      break;
  }
});

function pasarDerecha(array) {
  if (indexImagenMax === array.length - 1) {
    return;
  }

  galeriaMax.innerHTML = "";

  let proximaImagen = array[indexImagenMax + 1];
  indexImagenMax += 1;

  crearTarjetaMaximizada(
    proximaImagen.images.fixed_height.url,
    proximaImagen.title,
    proximaImagen.username,
    proximaImagen.images.downsized.url,
    seccion,
    proximaImagen.id
  );
}

left.addEventListener("click", () => {
  switch (seccion) {
    case "trending":
      pasarIzquierda(arrayResultadosTrending);
      break;
    case "busquedas":
      pasarIzquierda(arrayResultados);
      break;
    case "favoritos":
      pasarIzquierda(arrayFavoritos);
      break;
    case "mis-gifos":
      pasarIzquierda(arrayMisGifos);
      break;
  }
});

function pasarIzquierda(array) {
  if (indexImagenMax === 0) {
    return;
  }

  galeriaMax.innerHTML = "";

  let imagenPrevia = array[indexImagenMax - 1];
  indexImagenMax -= 1;

  crearTarjetaMaximizada(
    imagenPrevia.images.fixed_height.url,
    imagenPrevia.title,
    imagenPrevia.username,
    imagenPrevia.images.downsized.url,
    seccion,
    imagenPrevia.id
  );
}

//FUNCIÓN PARA GUARDAR FAVORITO

export const guardarFavorito = async (id, target) => {
  try {
    cambiarIconoFavorito(target);

    const index = arrayFavoritos.findIndex((obj) => obj.id === id);

    if (index === -1) {
      const gif = await getGifById(id);
      arrayFavoritos.unshift(gif);
      localStorage.setItem("favoritos", JSON.stringify(arrayFavoritos));
    }

    cargarSeccion(
      "favoritos",
      arrayFavoritos,
      galeriaImagenesFavoritos,
      verMasFavoritos
    );

    if (seccionGifMax.style.display === "unset") elegirRefresh(target);
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

//FUNCIÓN QUE CAMBIA EL ICONO DE FAVORITO

function cambiarIconoFavorito(target, activo = true) {
  //activo en true significa que es favorito
  if (activo) {
    modoNocturno && seccionGifMax.style.display === "unset"
      ? (target.src = "images/icon-fav-active-noc.svg") //sólo para gifs maximizados
      : (target.src = "images/icon-fav-active.svg");
  } else {
    modoNocturno && seccionGifMax.style.display === "unset"
      ? (target.src = "images/icon-fav-hover-noc.svg") //sólo para gifs maximizados
      : (target.src = "images/icon-fav-hover.svg");
  }
}

//FUNCIÓN QUE BORRA EL FAVORITO

export const borrarFavorito = (id, target) => {
  cambiarIconoFavorito(target, false);

  arrayFavoritos.splice(
    arrayFavoritos.findIndex((obj) => obj.id === id),
    1
  );

  localStorage.setItem("favoritos", JSON.stringify(arrayFavoritos));

  cargarSeccion(
    "favoritos",
    arrayFavoritos,
    galeriaImagenesFavoritos,
    verMasFavoritos
  );

  if (seccionGifMax.style.display === "unset") elegirRefresh(target);
};

//FUNCIÓN QUE CHEQUEA SI ES FAVORITO O NO AL CREAR LA TARJETA

function esFavorito(id, icon) {
  //lo uso al crear las tarjetas para saber si es favorito o no
  let index = arrayFavoritos.findIndex((obj) => obj.id === id);

  index === -1 ? cambiarIconoFavorito(icon, false) : cambiarIconoFavorito(icon);
}

//FUNCIÓN QUE CARGA TODOS LOS GIFS DE CADA SECCIÓN

export function mostrarTarjetas(array, galeria, tipoMaximizar, seccionName) {
  array.forEach((resultado) => {
    crearTarjeta(
      resultado.images.fixed_height_downsampled.url,
      resultado.id,
      resultado.title,
      resultado.username,
      galeria,
      tipoMaximizar,
      seccionName
    );
  });
}

//FUNCIÓN QUE HACE UN REFRESH DE LOS GIFS DE UNA DETERMINADA SECCIÓN

export function refreshGifs(seccion) {
  switch (seccion) {
    case "busquedas":
      galeria.innerHTML = "";
      mostrarTarjetas(
        arrayResultados,
        ".galeria-imagenes",
        "maximizar-busquedas"
      );
      break;
    case "trending":
      reloadTrending();
      break;
    case "favoritos":
      cargarSeccion(
        "favoritos",
        arrayFavoritos,
        galeriaImagenesFavoritos,
        verMasFavoritos
      );
      reloadTrending();
      break;
    case "mis-gifos":
      cargarSeccion("mis-gifos", arrayMisGifos, galeriaMisGifos, verMasGifos);
      break;
  }
}

// FUNCIÓN QUE RECARGA TRENDING-GIFOS

function reloadTrending() {
  galeriaTrend.innerHTML = "";
  mostrarTarjetas(
    arrayResultadosTrending,
    ".galeria-trending",
    "maximizar-trending"
  );
}

//FUNCIÓN QUE LLAMA A refreshGifs SEGÚN LA SECCIÓN

function elegirRefresh(target) {
  if (target.className.includes("trending")) {
    refreshGifs("trending");
  } else if (target.className.includes("busquedas")) {
    refreshGifs("busquedas");
  } else if (target.className.includes("favoritos")) {
    refreshGifs("favoritos");
  } else if (target.className.includes("mis-gifos")) {
    refreshGifs("mis-gifos");
  }
}

//FUNCIÓN PARA CUANDO HAGO CLICK EN FAVORITOS O MIS GIFOS

export const clickSeccion = (target, array, cont, noContent) => {
  target.classList.add("activo");
  seccionPresentacion.style.display = "none";
  seccionBusquedas.style.display = "none";
  tituloBusqueda.textContent = ""; //para que al cerrar un gif maximizado no entre en la sección de Búsquedas
  seccionCrearGifos.style.display = "none";

  botonCrear.classList.remove("crear-activo");

  if (target.id === "segundo") {
    seccionMisGifos.style.display = "none";
    document.getElementById("tercero").classList.remove("activo");
    seccionFavoritos.style.display = "unset";
  } else {
    seccionFavoritos.style.display = "none";
    document.getElementById("segundo").classList.remove("activo");
    seccionMisGifos.style.display = "unset";
  }

  if (seccionTrending.style.display === "none")
    seccionTrending.style.display = "unset";

  if (array.length === 0) {
    noContent.style.display = "unset";
    cont.cantidad = 0;
  } else {
    if (array.length > 12) {
      cont.cantidad += 12;
    }
    noContent.style.display = "none";
    target.id === "segundo"
      ? cargarSeccion(
          "favoritos",
          arrayFavoritos,
          galeriaImagenesFavoritos,
          verMasFavoritos
        )
      : cargarSeccion("mis-gifos", arrayMisGifos, galeriaMisGifos, verMasGifos);
  }
};

//FUNCIÓN PARA CARGAR LOS GIFS DE FAVORITOS O LOS DE MIS GIFOS

function cargarSeccion(seccion, array, galeria, botonVerMas) {
  let nuevoArray = [];

  galeria.innerHTML = "";

  if (array.length > 12) {
    nuevoArray = array.slice(0, 12); //cargo los primeros 12
    botonVerMas.style.display = "block"; //habilito el botón ver más
    mostrarTarjetas(
      nuevoArray,
      `.${galeria.className}`,
      `maximizar-${seccion}`,
      seccion
    );
  } else if (array.length <= 12) {
    botonVerMas.style.display = "none";
    mostrarTarjetas(
      array,
      `.${galeria.className}`,
      `maximizar-${seccion}`,
      seccion
    );
  }
}

//FUNCIÓN PARA LOS BOTONES DE VER MÁS DE FAVORITOS Y MIS GIFOS

export const verMas = (
  seccion,
  array,
  contador,
  botonVerMas,
  nombreGaleria
) => {
  const nuevoArrayFavoritos = array.slice(contador);

  mostrarTarjetas(
    nuevoArrayFavoritos,
    `.${nombreGaleria}`,
    `maximizar-${seccion}`,
    seccion
  );

  if (nuevoArrayFavoritos.length <= 12) {
    botonVerMas.style.display = "none";
  } else {
    contador += 12;
  }
};
