"use strict";

import {
  apiKey,
  createBlob,
  getGifById,
  seccionBusquedas,
  seccionCrearGifos,
  seccionFavoritos,
  seccionMisGifos,
  seccionPresentacion,
  seccionTrending,
} from "./module.js";

export const botonCrear = document.getElementById("crear");
export let arrayMisGifos = JSON.parse(localStorage.getItem("gifos")) || []; //array con los gifos creados

const botonComenzar = document.getElementById("comenzar");
const tituloCrear = document.querySelector(".titulo-crear");
const parrafoCrear = document.querySelector(".parrafo-crear");
const divVideo = document.getElementById("div-video");
const cronometro = document.querySelector(".timer");
const paso1 = document.getElementById("paso1");
const paso2 = document.getElementById("paso2");
const paso3 = document.getElementById("paso3");
const parametrosVideo = {
  audio: false,
  video: {
    height: { max: 480 },
  },
};
let recorderObj = {}; //para luego usar el objeto recorder de RecordRTC
let trackActual = {}; //objeto MediaStreamTrack
let video = {}; //va a ser un elemento <video></video>
let subiendo = {}; //<p></p> que aparece una vez que se está subiendo el gifo
let subiendoImg = {}; //<img> que aparece una vez q se está subiendo el gifo

//EVENTOS DE CLICK DE LOS BOTONES CREAR Y COMENZAR

botonCrear.addEventListener("click", () => {
  const seccionActiva = document.querySelector(".activo");

  seccionPresentacion.style.display = "none";
  seccionTrending.style.display = "none";
  seccionBusquedas.style.display = "none";
  seccionFavoritos.style.display = "none";
  seccionMisGifos.style.display = "none";
  seccionCrearGifos.style.display = "unset";
  botonCrear.className = "crear-activo";
  if (seccionActiva) seccionActiva.classList.remove("activo");
});

botonComenzar.addEventListener("click", () => {
  const estadoBtnComenzar = botonComenzar.textContent;

  if (estadoBtnComenzar === "GRABAR") {
    return segundoPasoTardio();
  } else if (estadoBtnComenzar === "FINALIZAR") {
    return tercerPasoTemprano();
  } else if (estadoBtnComenzar === "SUBIR GIFO") {
    return tercerPasoTardio();
  }

  primerPaso();
});

// PASOS PARA GRABAR EL GIFO

function primerPaso() {
  botonComenzar.className = "invisible";
  paso1.className = "paso-activo";
  tituloCrear.innerHTML = `¿Nos das acceso <br/> a tu cámara?`;
  tituloCrear.className = "titulo-crear-modificado";
  parrafoCrear.innerHTML = `El acceso a tu cámara será válido sólo <br/> por el tiempo en el que estés creando el GIFO.`;
  prepararCamara(); //pide permiso y abre la cámara
}

function segundoPasoTemprano(stream) {
  video = document.createElement("video");
  video.className = "video-player";
  video.srcObject = stream;

  trackActual = stream.getTracks()[0]; // para parar la cámara cuando todo haya finalizado

  recorderObj = RecordRTC(stream, {
    type: "gif",
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
    onGifRecordingStarted: function () {
      console.log("started"); //avisa que arranco la grabación
    },
  });

  divVideo.innerHTML = "";
  divVideo.appendChild(video);
  divVideo.className = "div-video-encendido";

  paso1.classList.remove("paso-activo");
  paso2.className = "paso-activo";

  botonComenzar.classList.remove("invisible");
  botonComenzar.textContent = "GRABAR";

  video.play();
}

function segundoPasoTardio() {
  recorderObj.startRecording(); //comienzo a grabar
  timer();
  botonComenzar.textContent = "FINALIZAR";
}

function tercerPasoTemprano() {
  video.pause();

  cronometro.innerHTML = "";
  cronometro.classList.add("timer-off");
  cronometro.textContent = "REPETIR CAPTURA";

  recorderObj.stopRecording(); //paro la grabación

  trackActual.stop(); //apago la cámara

  botonComenzar.textContent = "SUBIR GIFO";
}

function tercerPasoTardio() {
  subiendo = document.createElement("p");
  subiendoImg = document.createElement("img");

  botonComenzar.className = "invisible";
  paso3.className = "paso-activo";
  paso2.classList.remove("paso-activo");
  cronometro.innerHTML = "";
  cronometro.classList.remove("timer-off");
  divVideo.classList.add("div-video-subiendo");
  video.classList.add("video-player-subiendo");
  subiendo.className = "subiendo";
  subiendo.textContent = "Estamos subiendo tu GIFO";
  subiendoImg.className = "subiendo-imagen";
  subiendoImg.setAttribute("src", "./images/loader.svg");

  divVideo.appendChild(subiendo);
  divVideo.appendChild(subiendoImg);

  subirGifo();
}

//FUNCIÓN QUE SUBE EL GIFO A GIPHY

async function subirGifo() {
  try {
    let form = new FormData();

    form.append("file", recorderObj.getBlob(), "myGif.gif");
    console.log(form.get("file")); //para chequear que el objeto FormData se creó correctamente*/

    const response = await fetch(
      `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`,
      {
        method: "POST",
        body: form,
      }
    );

    const jsonResponse = await response.json();

    subiendo.classList.add("subido");
    subiendo.textContent = "GIFO subido con éxito";
    subiendoImg.setAttribute("src", "images/check.svg");

    const idGifo = jsonResponse.data.id; //guardo el id

    cargarDataGifo(idGifo);
  } catch (error) {
    console.log("Algo salió mal: ", error);
  }
}

//FUNCIÓN QUE CARGA LA INFORMACIÓN DEL GIFO SUBIDO

async function cargarDataGifo(id) {
  try {
    const gifo = await getGifById(id); //busco el gifo

    await mostrarOpcionesGifo(gifo.url, gifo.images.original.url);

    arrayMisGifos.unshift(gifo);
    localStorage.setItem("gifos", JSON.stringify(arrayMisGifos)); //guardo la info del gifo
  } catch (error) {
    console.log("Algo salió mal: ", error);
  }
}

// FUNCIÓN PARA USAR LA CÁMARA Y PREPARAR EL PASO 2

function prepararCamara() {
  navigator.mediaDevices //pido permiso para usar la cámara
    .getUserMedia(parametrosVideo)
    .then((stream) => {
      segundoPasoTemprano(stream);
    })
    .catch((error) => {
      console.error("Algo salió mal: ", error);
    });
}

// FUNCIÓN CRONÓMETRO

function timer() {
  let contMinutos1 = 0;
  let contMinutos2 = 0;
  let contSegundos1 = 0;
  let contSegundos2 = 0;

  let horas1 = document.createElement("span");
  let horas2 = document.createElement("span");
  let separacion1 = document.createElement("span");
  let minutos1 = document.createElement("span");
  let minutos2 = document.createElement("span");
  let separacion2 = document.createElement("span");
  let segundos1 = document.createElement("span");
  let segundos2 = document.createElement("span");

  cronometro.appendChild(horas1);
  cronometro.appendChild(horas2);
  cronometro.appendChild(separacion1);
  cronometro.appendChild(minutos1);
  cronometro.appendChild(minutos2);
  cronometro.appendChild(separacion2);
  cronometro.appendChild(segundos1);
  cronometro.appendChild(segundos2);

  horas1.textContent = "0";
  horas2.textContent = "0";
  separacion1.textContent = ":";
  minutos1.textContent = "0";
  minutos2.textContent = "0";
  separacion2.textContent = ":";
  segundos1.textContent = "0";
  segundos2.textContent = "0";

  cronometro.style.display = "unset";

  window.setInterval(function () {
    contSegundos2++;
    segundos2.innerHTML = contSegundos2;

    if (contSegundos2 == 10) {
      contSegundos2 = 0;
      segundos2.innerHTML = contSegundos2;
      contSegundos1++;
      segundos1.innerHTML = contSegundos1;

      if (contSegundos1 == 6) {
        contSegundos1 = 0;
        segundos1.innerHTML = contSegundos1;
        contMinutos2++;
        minutos2.innerHTML = contMinutos2;

        if (contMinutos2 == 10) {
          contMinutos2 = 0;
          minutos2.innerHTML = contMinutos2;
          contMinutos1++;
          minutos1.innerHTML = contMinutos1;
        }
      }
    }
  }, 1000);
}

//FUNCION QUE CREA LAS OPCIONES PARA DESCARGAR Y VER EL GIFO CREADO

async function mostrarOpcionesGifo(urlLink, urlDescarga) {
  try {
    let contenedor = document.createElement("div");
    let divDescarga = document.createElement("div");
    let divLink = document.createElement("div");
    let linkDescarga = document.createElement("a");
    let linkGifo = document.createElement("a");
    let iconDescarga = document.createElement("img");
    let iconLink = document.createElement("img");

    contenedor.className = "contenedor-gifo";
    divDescarga.className = "icon"; //los mismos que uso en los cards
    divLink.className = "icon";
    linkDescarga.className = "descarga-gifo";
    linkGifo.className = "link-gifo";
    iconDescarga.className = "img-descarga";
    iconLink.className = "img-link";
    linkDescarga.setAttribute("target", "_blank");
    linkGifo.setAttribute("target", "_blank");
    iconDescarga.setAttribute("src", "images/icon-download.svg");
    iconLink.setAttribute("src", "images/icon-link.svg");

    contenedor.appendChild(divDescarga);
    contenedor.appendChild(divLink);
    divDescarga.appendChild(linkDescarga);
    divLink.appendChild(linkGifo);
    linkDescarga.appendChild(iconDescarga);
    linkGifo.appendChild(iconLink);
    divVideo.appendChild(contenedor);

    const href = await createBlob(urlDescarga);
    linkDescarga.setAttribute("download", "mygifo.gif");
    linkDescarga.setAttribute("href", href);
    linkGifo.setAttribute("href", urlLink);
  } catch (error) {
    throw new Error(error);
  }
}

// REPETIR CAPTURA

document.addEventListener("click", (event) => {
  if (event.target.className === "timer timer-off") {
    botonComenzar.className = "invisible";
    cronometro.innerHTML = "";
    cronometro.classList.remove("timer-off");
    prepararCamara();
  }
});
