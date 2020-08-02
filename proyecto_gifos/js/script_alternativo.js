//FUNCIONALIDAD DEL INPUT DE BÚSQUEDA

let input = document.getElementById("input-busqueda");
let lista = document.querySelector(".sugerencias");
let inactivo = document.querySelector(".inactivo");
let li = document.getElementsByClassName("li-sugerencias");
let img = document.getElementsByClassName("list-img");
let imgSearch = document.querySelector(".search-icon");
let search = document.querySelector(".search");
let containerBuscar = document.querySelector(".container-buscar");
let body = document.getElementById("body");

function inputSearch() {

    let p = document.getElementsByClassName("list-p"); //después que los crea crearSugerencia()

    if(input.value === "") {

        input.classList.remove("input-activo");
        inactivo.classList.remove("inactivo-activo");
        lista.classList.remove("sugerencias-activo");
        for(i = 0; i < li.length; i++) {
            li[i].classList.remove("li-sugerencias-activo"); 
        }
        for(i = 0; i < li.length; i++) {
            img[i].classList.remove("list-img-activo"); 
        }
        for(i = 0; i < li.length; i++) {
            p[i].classList.remove("list-p-activo"); 
        }
        search.classList.remove("search-activo");
        if(body.style.backgroundColor == "rgb(55, 56, 60)") { //modo nocturno

            imgSearch.setAttribute("src", "images/icon-search-mod-noc.svg");

        }else {

            imgSearch.setAttribute("src", "images/icon-search.svg");

        }
        imgSearch.classList.remove("img-close");
        imgSearch.classList.add("search-icon");
    
    }else if(lista.firstElementChild !== null) { //si hay sugerencias en el input

        input.classList.add("input-activo");
        inactivo.classList.add("inactivo-activo");
        lista.classList.add("sugerencias-activo");
        for(i = 0; i < li.length; i++) {
            li[i].classList.add("li-sugerencias-activo"); 
        }
        for(i = 0; i < li.length; i++) {
            img[i].classList.add("list-img-activo"); 
        }
        for(i = 0; i < li.length; i++) {
            p[i].classList.add("list-p-activo"); 
        }
        search.classList.add("search-activo");
        if(body.style.backgroundColor == "rgb(55, 56, 60)") { //modo nocturno

            imgSearch.setAttribute("src", "images/close-noc.svg");

        }else {

            imgSearch.setAttribute("src", "images/close.svg"); //cambio el icono de búsqueda

        }
        imgSearch.classList.remove("search-icon");
        imgSearch.classList.add("img-close");

    }
}

function closeInputSearch () {

    let p = document.getElementsByClassName("list-p"); //después que los crea crearSugerencia()
    
    input.classList.remove("input-activo");
    inactivo.classList.remove("inactivo-activo");
    lista.classList.remove("sugerencias-activo");
    for(i = 0; i < li.length; i++) {
        li[i].classList.remove("li-sugerencias-activo"); 
    }
    for(i = 0; i < li.length; i++) {
        img[i].classList.remove("list-img-activo"); 
    }
    for(i = 0; i < li.length; i++) {
        p[i].classList.remove("list-p-activo"); 
    }
    search.classList.remove("search-activo");
    if(body.style.backgroundColor == "rgb(55, 56, 60)") { //modo nocturno

        imgSearch.setAttribute("src", "images/icon-search-mod-noc.svg");

    }else {

        imgSearch.setAttribute("src", "images/icon-search.svg");

    }
    imgSearch.classList.remove("img-close");
    imgSearch.classList.add("search-icon");

}

input.addEventListener("click", () => {

    if( input.value === "") {
        closeInputSearch();
        return;
    }
    
    inputSearch();
});

document.addEventListener("click", event => {

    if(inactivo.className == "inactivo inactivo-activo"
       && (event.target.localName == "section" 
       || event.target.localName == "div")) { 

            closeInputSearch(); //cierra el input al clickear fuera de él

    }else if (inactivo.className == "inactivo inactivo-activo"
              && event.target.localName == "p") {

            input.value = event.target.textContent;
            arrayResultados = []; //reseteo el array que guarda la info de los resultados
            galeria.innerHTML = ""; //limpio la sección
            borrarMaximizar(); //borro la clase activado de maximizar
            busqueda(input.value);

    }else if(event.target.getAttribute("src") == "images/icon-fav-active.svg"
             || event.target.getAttribute("src") == "images/icon-fav-active-noc.svg") {
            
            if(event.target.getAttribute("src") == "images/icon-fav-active.svg") {

                event.target.setAttribute("src", "images/icon-fav-hover.svg");
    
            }else if(event.target.getAttribute("src") == "images/icon-fav-active-noc.svg") {
    
                event.target.setAttribute("src", "images/icon-fav-hover-noc.svg");
            }

            event.target.classList.remove("guardado");
            event.target.classList.add("borrado");
            borrarFavorito();
            localStorage.setItem("favoritos", JSON.stringify(arrayFavoritos));
                
    }else if(event.target.getAttribute("src") == "images/icon-fav-hover.svg"
             || event.target.getAttribute("src") == "images/icon-fav-hover-noc.svg") {
            
            if(event.target.getAttribute("src") == "images/icon-fav-hover.svg") {

                event.target.setAttribute("src", "images/icon-fav-active.svg");

            }else if(event.target.getAttribute("src") == "images/icon-fav-hover-noc.svg") {

                event.target.setAttribute("src", "images/icon-fav-active-noc.svg");
            }
            
            event.target.classList.add("guardado");
            guardarInfo(); //guarda la info del gif en el arrayFavoritos
            localStorage.setItem("favoritos", JSON.stringify(arrayFavoritos));

    }else if(event.target.getAttribute("src") == "images/icon-max.svg") {

            if(event.target.className === "maximizar-favorito") {

                event.target.classList.add("activado");
                maximizarFavorito();

            }else {
                
                event.target.classList.add("activado");
                maximizarGif();
            }
            

    }else if(event.target.className == "img-descarga") {

        let url = event.target.parentNode.getAttribute("href");

        var x=new XMLHttpRequest(); //PARA DESCARGAR EL GIF con la función download()
        x.open("GET", url, true);
        x.responseType = 'blob';
        x.onload=function(e){download(x.response, "descarga.gif", "image/gif" ); }
        x.send();

    }else if(event.target.className == "gifs"
             || event.target.className == "gifs trending") {

        if (window.matchMedia("(max-width: 1200px)").matches) {

            event.target.classList.add("activado");
            maximizarGif();
        } 
    }
})

input.addEventListener("keyup", event => {

    if ((event.which === 13 //Al presionar enter
        || event.keyCode == 13)
        && input.value !== "") { 

            galeria.innerHTML = ""; //limpio la sección
            busqueda(input.value); //busco la palabra del input
            closeInputSearch();
            borrarMaximizar(); //borro la clase activado de maximizar
            cont = 0; //reseteo el contador del parámetro offset 
            arrayResultados = []; //reseteo el array que guarda la info de los resultados
            return;

    }else if((event.which === 8 
             || event.keyCode == 8)
             && input.value == "") { //Al presionar backspace y el input está vacío
            
            closeInputSearch(); // cierra las sugerencias
            return;
    }

    inputSearch()
    sugerencias();

});



//LLAMADA A LA API DE GIPHY PARA SUGERENCIAS

let tituloBusqueda = document.getElementById("titulo-busqueda");
let apiKey = "8uL8ygBG5KwNy4ij60wPxjjW8nuykVIR"

async function getGif(url, value, api_key, number) {
    let endPoint =`http://${url}?q=${value}&api_key=${api_key}&limit=${number}&lang=es`;
    const resp = await fetch(endPoint);
    const data = await resp.json();
    return data;
};

function sugerencias() {

    getGif("api.giphy.com/v1/gifs/search/tags", input.value, apiKey, "4")
    .then( response => {

        if(li.length <= 4) {
            lista.innerHTML = "";
        }

        if(response.data.length == 0) {
            closeInputSearch();
            return;
        }

        let arraySugerencias = Object.values(response.data);

        for(j = 0; j < arraySugerencias.length; j++) {

            crearSugerencia(response.data[j].name);
        }
    })
}

function crearSugerencia(string) {

    let nuevoLi = document.createElement("li");
    let nuevoImg = document.createElement("img");
    if(body.style.backgroundColor == "rgb(55, 56, 60)") {

        nuevoImg.setAttribute("src", "images/icon-search-mod-noc.svg");

    }else {

        nuevoImg.setAttribute("src", "images/icon-search.svg");

    }
    
    nuevoImg.setAttribute("alt", "Ícono de búsqueda")
    let nuevoP = document.createElement('p');
    nuevoP.textContent = string; //recibe la sugerencia
    lista.appendChild(nuevoLi);
    nuevoLi.className = "li-sugerencias";
    nuevoLi.appendChild(nuevoImg);
    nuevoImg.className = "list-img";
    nuevoLi.appendChild(nuevoP);
    nuevoP.className = "list-p";

    inputSearch(); //para que se sumen las clases "activos"
}


//FUNCIÓN PARA LIMPIAR LAS BÚSQUEDAS

imgSearch.addEventListener("click", event => {

    if(imgSearch.getAttribute("src") == "images/close.svg"
       || imgSearch.getAttribute("src") == "images/close-noc.svg"
       || input.value == "") {

        lista.innerHTML = "";
        input.value = "";
        event.preventDefault();
        closeInputSearch();
        return;
    }

    if(input.value != "") {

        galeria.innerHTML = ""; //limpio la sección
        cont = 0; //reseteo el contador del parámetro offset 
        arrayResultados = []; //reseteo el array que guarda la info de los resultados
        borrarMaximizar(); //borro la clase activado de maximizar
        busqueda(input.value);
    }
});


//FUNCIÓN DE BÚSQUEDA

let seccionBusquedas = document.getElementById("busquedas");
let galeria = document.querySelector(".galeria-imagenes");
let botonMas = document.getElementById("ver-mas");
let sinResultados = document.querySelector(".sin-resultados");
let cont = 0; //contador para el parámetro offset del endpoint
let arrayResultados = []; //para guardar la información de cada gif buscado
let arrayFavoritos = []; //para guardar la info de cada gid elegido como favorito

function busqueda(string) {

    getGif("api.giphy.com/v1/gifs/search", string, apiKey, 12)
    .then( resp => {

        let linkDescarga = document.getElementsByClassName("descarga");

        if(resp.data.length == 0
            && input.value != "") {

            seccionBusquedas.style.display = "unset";
            tituloBusqueda.innerHTML = input.value;
            sinResultados.style.display = "flex";
            galeria.style.display = "none";
            botonMas.style.display = "none";
            cont = 0; //reseteo el contador del parámetro offset 
            return;

        }else if(resp.data.length >= 1) {

            seccionBusquedas.style.display = "unset";
            tituloBusqueda.innerHTML = input.value;
            sinResultados.style.display = "none";
            galeria.style.display = "flex";
            closeInputSearch();

            for(r = 0; r < resp.data.length; r++) {

                crearTarjeta(resp.data[r].images.fixed_height_downsampled.url, resp.data[r].title, resp.data[r].username, ".galeria-imagenes", "maximizar");

                arrayResultados.push(resp.data[r]);

                linkDescarga[r + cont].setAttribute("href", arrayResultados[r + cont].images.original.url);
                linkDescarga[r + cont].download = "descarga.gif"; // uso + cont para que sume los nuevos gifs
        
            }

            if (resp.data.length == 12) { //display del botón ``ver más´´

                botonMas.style.display = "block";

            }else if (resp.data.length < 12) {

                botonMas.style.display = "none";
                cont = 0; //reseteo el contador del parámetro offset 
                return;
            }

            cont+=12; //sumo el contador que va a ir en el addEventListener del botón ``ver más´´
            
        }
    })  
}

// FUNCIÓN PARA LAS CATEGORÍAS MÁS BUSCADAS

async function trendingPopulares() {

    let trendingP = document.getElementById("contenido");

    const resp2 = await fetch(`http://api.giphy.com/v1/trending/searches?api_key=${apiKey}`);
    const trendings = await resp2.json();

    trendingP.textContent = `${trendings.data[0]}, ${trendings.data[1]}, ${trendings.data[2]}, ${trendings.data[3]}, ${trendings.data[4]}`;

};

trendingPopulares();


// FUNCIÓN PARA CREAR CADA TARJETA DE ``BÚSQUEDAS´´

function crearTarjeta(url, titulo, usuario, tipoGaleria, tipoMaximizar) {

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
    imgIcon1.className = "favorito";
    linkDescarga.className = "descarga";
    imgIcon2.className = "img-descarga";
    linkMaximizar.className = "link-maximizar";
    imgIcon3.className = tipoMaximizar;
    divInfo.className = "info";
    usuarioP.id = "usuario";
    tituloP.id = "titulo-gifo";

    galeriaImagenes.appendChild(divImagen);
    divImagen.appendChild(imgGif);
    imgGif.setAttribute("src", url);
    divImagen.appendChild(divIconos);
    divIconos.appendChild(divIcon1);
    divIconos.appendChild(divIcon2);
    divIconos.appendChild(divIcon3);
    divIcon1.appendChild(imgIcon1);
    imgIcon1.setAttribute("src", "images/icon-fav-hover.svg");
    divIcon2.appendChild(linkDescarga);
    linkDescarga.setAttribute("target", "_blank")
    linkDescarga.appendChild(imgIcon2);
    imgIcon2.setAttribute("src", "images/icon-download.svg");
    divIcon3.appendChild(linkMaximizar);
    linkMaximizar.setAttribute("href", "#gif-maximizado");
    linkMaximizar.appendChild(imgIcon3);
    imgIcon3.setAttribute("src", "images/icon-max.svg");
    divImagen.appendChild(divInfo);
    divInfo.appendChild(usuarioP);

    usuarioP.textContent = usuario;
    divInfo.appendChild(tituloP);
    tituloP.textContent = titulo;
    
}


// BOTÓN ``VER MÁS´´

botonMas.addEventListener("click", () => {

    busqueda(`${tituloBusqueda.textContent}&offset=${cont}`);
})


// FUNCIÓN PARA GUARDAR LA INFO DEL GIF FAVORITO


function guardarInfo() {

    // SECCIÓN ``BÚSQUEDAS´´

    let iconFavorito = document.getElementsByClassName("favorito");

    for(i = 0; i < iconFavorito.length; i++) {

        if(iconFavorito[i].className == "favorito guardado") {

            Object.defineProperty(arrayResultados[i], "favorito", {value: true, writable: true});
            arrayFavoritos.push(arrayResultados[i]);
            return;
        }
    }
     
    // SECCIÓN ``TRENDING GIFOS´´

    let iconFavoritoTrending = document.getElementsByClassName("favorito trending");

    for(k = 0; k < iconFavoritoTrending.length; k++) {

        if(iconFavoritoTrending[k].className == "favorito trending guardado") {

            Object.defineProperty(arrayResultadosTrending[k], "favorito", {value: true, writable: true});
            arrayFavoritos.push(arrayResultadosTrending[k]);
            return;
        }
    }

    // SECCIÓN ``FAVORITOS´´

    let iconFavoritoSeccion = document.getElementsByClassName("favorito seccion");

    for(j = 0; j < iconFavoritoSeccion.length; j++) {

        if(iconFavoritoSeccion[j].className == "favorito seccion guardado") {

            Object.defineProperty(arraySeccionFavoritos[j], "favorito", {value: true, writable: true});
            arrayFavoritos.push(arraySeccionFavoritos[j]);
            return;
        }
    }
}


// FUNCIÓN PARA BORRAR LA INFO DEL GIF FAVORITO DE ``BÚSQUEDAS´´ Y ``TRENDING GIFOS´´

function borrarInfo() {

    //SECCIÓN ``BÚSQUEDAS´´: 

    
    let iconFavorito = document.getElementsByClassName("favorito");

    for(i = 0; i < iconFavorito.length; i++) {

        if(iconFavorito[i].className == "favorito borrado") {

            iconFavorito[i].classList.remove("borrado");
            Object.defineProperty(arrayResultados[i], "favorito", {value: false, writable: true});
            borrarItemFavoritos(arrayResultados, i);

            return;
        }
    }

    //SECCIÓN ``TRENDING GIFOS´´

    let iconFavoritoTrending = document.getElementsByClassName("favorito trending");

    for(k = 0; k < iconFavoritoTrending.length; k++) {

        if(iconFavoritoTrending[k].className == "favorito trending borrado") {

            iconFavoritoTrending[k].classList.remove("borrado");
            Object.defineProperty(arrayResultadosTrending[k], "favorito", {value: false, writable: true});          
            borrarItemFavoritos(arrayResultadosTrending, k);

            return;
        }
    }

    //SECCIÓN ``FAVORITOS´´

    let iconFavoritoSeccion = document.getElementsByClassName("favorito seccion");

    for(j = 0; j < iconFavoritoSeccion.length; j++) {

        if(iconFavoritoSeccion[j].className == "favorito seccion borrado") {

            iconFavoritoSeccion[j].classList.remove("borrado");
            Object.defineProperty(arraySeccionFavoritos[j], "favorito", {value: false, writable: true});          
            borrarItemFavoritos(arraySeccionFavoritos, j);

            return;
        }
    }
}

function borrarItemFavoritos(array, posicion) {

    let index;

    for (i = 0; i < arrayFavoritos.length; i++) {
                        
        if(arrayFavoritos[i].id == array[posicion].id) {
                    
            index = i;
        }
    } 
            
    arrayFavoritos.splice(index, 1); //borro el gif especifico del arrayFavoritos
}



// FUNCIÓN PARA CREAR TARJETAS MAXIMIZADAS

function crearTarjetaMaximizada(url, titulo, usuario, tipoImagen, tipoFavorito, idFavorito) {

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
    imgGifMax.className = tipoImagen;
    divGridMax.className = "grid-max";
    usuarioMax.id = "item1";
    tituloMax.id = "item2";
    linkDescargaMax.id = "favorito-max";
    imgFavorito.id = idFavorito;
    imgFavorito.className = tipoFavorito;
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
    
    usuarioMax.textContent = usuario;
    tituloMax.textContent = titulo;

    if(body.style.backgroundColor == "rgb(55, 56, 60)") { //modo nocturno

        tituloMax.style.color = "white";
        imgFavorito.setAttribute("src", "images/icon-fav-hover-noc.svg");
        imgDescarga.setAttribute("src", "images/icon-download-noc.svg");

    }else {

        imgFavorito.setAttribute("src", "images/icon-fav-hover.svg");
        imgDescarga.setAttribute("src", "images/icon-download.svg");
    }
    
}


// FUNCIÓN PARA ABRIR GIF MAXIMIZADO

let posicion; //para saber la posicion del gif
let posicionTrending; //para saber la posicion de los gifs de la sección ``Trending Gifos´´
let posicionFavoritos; //para saber la posicion de los gifs de la sección ``Favoritos´´
let seccionTrending = document.getElementById("trending-slide");
let seccionPresentacion = document.getElementById("presentacion");
let header = document.getElementById("header")
let footer = document.getElementById("footer");

function maximizarGif() {

    let gifMax = document.getElementById("gif-maximizado");
    let iconMaximizar = document.getElementsByClassName("maximizar");
    let iconMaximizarTrending = document.getElementsByClassName("maximizar trending");
    let imagenMax = document.getElementsByClassName("gifs");
    let imagenMaxTrending = document.getElementsByClassName("gifs trending");
    
    
    seccionBusquedas.style.display = "none";
    seccionTrending.style.display = "none";
    seccionPresentacion.style.display = "none";
    seccionFavoritos.style.display = "none";
    header.style.display = "none";
    footer.style.display = "none";
    gifMax.style.display = "unset";

    for(l = 0; l < arrayResultados.length; l++) {

        if(iconMaximizar[l].className == "maximizar activado"
           || imagenMax[l].className == "gifs activado") {

            crearTarjetaMaximizada(arrayResultados[l].images.fixed_height.url, arrayResultados[l].title, arrayResultados[l].username, "gifs-max", "favorito", "itemBusqueda");

            posicion = l;

            buscarFavorito(); //funcion que mantiene activado el favorito en el gif maximizado de ``Búsquedas´´
            return;

        }  
    }
    
    for(u = 0; u < arrayResultadosTrending.length; u++) {

        if(iconMaximizarTrending[u].className == "maximizar trending activado"
           || imagenMaxTrending[u].className == "gifs trending activado") {

            crearTarjetaMaximizada(arrayResultadosTrending[u].images.fixed_height.url, arrayResultadosTrending[u].title, arrayResultadosTrending[u].username, "gifs-max-trending", "favorito trending", "itemTrending");

            posicionTrending = u;

            buscarFavorito(); //función que mantiene el favorito activado en el gif maximizado
            return;
        }         
    }
}

function cerrarMax() {

    let gifMax = document.getElementById("gif-maximizado");
    let galeriaImagenesMax = document.getElementById("galeria-max");

    gifMax.style.display = "none";
    galeriaImagenesMax.innerHTML = "";
    
}

// FUNCIÓN PARA CERRAR CON LA IMAGEN DE CLOSE Y SACAR LA CLASE "MAXIMIZAR ACTIVADO" o "GIFS ACTIVADO"



function borrarMaximizar() {

    let iconMaximizar = document.getElementsByClassName("maximizar");
    let iconMaximizarTrending = document.getElementsByClassName("maximizar trending");
    let imagenMax = document.getElementsByClassName("gifs");
    let imagenMaxTrending = document.getElementsByClassName("gifs trending");

    for(l = 0; l < arrayResultados.length; l++) {

        if(iconMaximizar[l].className == "maximizar activado"
           || imagenMax[l].className == "gifs activado") {

            iconMaximizar[l].classList.remove("activado");
            imagenMax[l].classList.remove("activado");
        }         
    } 

    for(s = 0; s < arrayResultadosTrending.length; s++) {

        if(iconMaximizarTrending[s].className == "maximizar trending activado"
           || imagenMaxTrending[s].className == "gifs trending activado") {

            iconMaximizarTrending[s].classList.remove("activado");
            imagenMaxTrending[s].classList.remove("activado");
        }         
    }
}

let imgClose = document.querySelector(".close-max img");

imgClose.addEventListener("click", event => {

    event.preventDefault();
    cerrarMax();
    borrarMaximizar();

    if(arrayResultados.length == 0 
        && arraySeccionFavoritos == undefined) {
 
         seccionPresentacion.style.display = "unset";
         header.style.display = "";
         footer.style.display = "";
         seccionTrending.style.display = "";
         return;
     }

    if (arrayResultados == 0) {

        seccionTrending.style.display = "";

        if(arraySeccionFavoritos == undefined) {

            seccionPresentacion.style.display = "unset";

        }else if(arraySeccionFavoritos.length > 0) {

            seccionFavoritos.style.display = "unset";
        }
        header.style.display = "";
        footer.style.display = "";
        return;
    }

    if (arrayResultados.length > 0
        && arraySeccionFavoritos == undefined) {

            seccionBusquedas.style.display = "unset";
            header.style.display = "";
            footer.style.display = "";
            seccionTrending.style.display = "";
            seccionPresentacion.style.display = "unset";
            return;
    }

    if (arrayResultados.length > 0
        && arraySeccionFavoritos.length > 0) {
            
            seccionFavoritos.style.display = "unset";
            header.style.display = "";
            footer.style.display = "";
            seccionTrending.style.display = "";
            return;
    }

})


//FUNCIÓN PARA PASAR DE A UNO LOS GIFS MAXIMIZADOS

let left = document.querySelector(".primer-boton");
let right = document.querySelector(".segundo-boton");
let contador = 1; //las veces que me muevo

right.addEventListener("click", event => {

    let galeriaImagenesMax = document.getElementById("galeria-max");
    let imagenMaxBúsquedas = document.getElementsByClassName("gifs-max");
    let imagenMaxTrending = document.getElementsByClassName("gifs-max-trending");
    
    if((posicion + contador) < cont
        && imagenMaxBúsquedas.length != 0) {

        galeriaImagenesMax.innerHTML = ""; //vacio primero el contenido

        crearTarjetaMaximizada(arrayResultados[(posicion + contador)].images.fixed_height.url, arrayResultados[(posicion + contador)].title, arrayResultados[(posicion + contador)].username, "gifs-max", "favorito", "itemBusqueda");

        posicion = posicion + contador; //nueva posicion

        buscarFavorito(); //funcion que mantiene activado el favorito en el gif maximizado de ``Búsquedas´´

    }else if((posicionTrending + contador) < 12
              && imagenMaxTrending.length != 0) {

        galeriaImagenesMax.innerHTML = ""; //vacio primero el contenido

        crearTarjetaMaximizada(arrayResultadosTrending[(posicionTrending + contador)].images.fixed_height.url, arrayResultadosTrending[(posicionTrending + contador)].title, arrayResultadosTrending[(posicionTrending + contador)].username, "gifs-max-trending", "favorito trending", "itemTrending");

        posicionTrending = posicionTrending + contador; //nueva posicion

        mantenerActivadoTrend(); //funcion que mantiene activado el favorito en el gif maximizado de ``Trending GIFOS´´
    }
    
})

left.addEventListener("click", () => {

    let galeriaImagenesMax = document.getElementById("galeria-max");
    let imagenMaxBúsquedas = document.getElementsByClassName("gifs-max");
    let imagenMaxTrending = document.getElementsByClassName("gifs-max-trending");

    if((posicion - contador) >= 0
        && imagenMaxBúsquedas.length != 0) {

        galeriaImagenesMax.innerHTML = ""; //vacio primero el contenido

        crearTarjetaMaximizada(arrayResultados[(posicion - contador)].images.fixed_height.url, arrayResultados[(posicion - contador)].title, arrayResultados[(posicion - contador)].username, "gifs-max", "favorito", "itemBusqueda");

        posicion = posicion - contador; //nueva posicion

        buscarFavorito(); //funcion que mantiene activado el favorito en el gif maximizado de ``Búsquedas´´

    }else if((posicionTrending - contador) >= 0
              && imagenMaxTrending.length != 0) {

        galeriaImagenesMax.innerHTML = ""; //vacio primero el contenido

        crearTarjetaMaximizada(arrayResultadosTrending[(posicionTrending - contador)].images.fixed_height.url, arrayResultadosTrending[(posicionTrending - contador)].title, arrayResultadosTrending[(posicionTrending - contador)].username, "gifs-max-trending", "favorito trending", "itemTrending");

        posicionTrending = posicionTrending - contador; //nueva posicion

        buscarFavorito(); //funcion que mantiene activado el favorito en el gif maximizado de ``Trending GIFOS´´
    }
    
})


// SECCIÓN TRENDING GIFOS

let arrayResultadosTrending = [] //creo un array para los resultados de ésta sección

async function trendingGifos() {

    const resp3 = await fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=12`);
    const trendGifos = await resp3.json();

    for(v = 0; v < trendGifos.data.length; v++){

        crearTarjeta(trendGifos.data[v].images.fixed_height_downsampled.url, trendGifos.data[v].title, trendGifos.data[v].username, ".galeria-trending", "maximizar");

        arrayResultadosTrending.push(trendGifos.data[v]);

        Object.defineProperty(arrayResultadosTrending[v], "favorito", {value: false, writable: true})
    }

    let favoritosTrending = document.getElementsByClassName("favorito");
    let maximizarTrending = document.getElementsByClassName("maximizar");
    let linkDescarga = document.getElementsByClassName("descarga");
    let imagenTrending = document.getElementsByClassName("gifs");

    for(w = 0; w < arrayResultadosTrending.length; w++) {

        favoritosTrending[w].classList.add("trending"); //le agrego una clase para distinguirlos
        maximizarTrending[w].classList.add("trending"); //le agrego una clase para distinguirlos
        imagenTrending[w].classList.add("trending"); //le agrego una clase para distinguirlos
        linkDescarga[w].setAttribute("href", arrayResultadosTrending[w].images.original.url);
        linkDescarga[w].download = "descarga.gif"
    }
}

trendingGifos();


// SLIDE DE LA SECCIÓN ``TRENDING GIFOS´´

let primerBoton = document.querySelector(".primer-boton-trend");
let segundoBoton = document.querySelector(".segundo-boton-trend")
let galeriaTrend = document.querySelector(".galeria-trending");

segundoBoton.addEventListener("click", () => {

    galeriaTrend.scrollLeft += 350;
})


primerBoton.addEventListener("click", () => {

    galeriaTrend.scrollLeft -= 350;

})

document.addEventListener("keydown", () => {

    if(event.which === 39 
       || event.keyCode == 39) { //Al presionar la flecha derecha 
       
            galeriaTrend.scrollLeft += 350;
        
    }else if(event.which === 37 
        || event.keyCode == 37) { //Al presionar la flecha izquierda
        
            galeriaTrend.scrollLeft -= 350;

    }
})


// FUNCIONES PARA MANTENER EL FAVORITO ACTIVADO EN TODAS LAS SECCIONES Y AL REINICIAR LA PÁGINA

function buscarFavorito() {

    // SECCIÓN ``BÚSQUEDAS´´

    let iconFavorito = document.getElementsByClassName("favorito");

    for(i = 0; i < iconFavorito.length; i++) {

        if(arrayResultados.length > 0) {

            if(arrayResultados[i].favorito == "true"
               || arrayResultados[posicion].favorito == "true") {

                    iconFavorito[i].classList.add("guardado");
                    iconFavorito[i].setAttribute("src", "images/icon-fav-active.svg");
                    return;
            }
        } 
    }
     
    // SECCIÓN ``TRENDING GIFOS´´

    let iconFavoritoTrending = document.getElementsByClassName("favorito trending");

    for(k = 0; k < iconFavoritoTrending.length; k++) {

        if(arrayResultadosTrending[k].favorito == "true"
           || arrayResultadosTrending[posicionTrending].favorito == "true") {

            iconFavoritoTrending[k].classList.add("guardado");
            iconFavoritoTrending[k].setAttribute("src", "images/icon-fav-active.svg");
            return;
        }
    }

    // SECCIÓN ``FAVORITOS´´

    let iconFavoritoSeccion = document.getElementsByClassName("favorito seccion");

    for(j = 0; j < iconFavoritoSeccion.length; j++) {

        if(arraySeccionFavoritos =! undefined) {

            if(arraySeccionFavoritos[j].favorito == "true"
               || arraySeccionFavoritos[posicionFavorito].favorito == "true") {

                iconFavoritoSeccion[j].classList.add("guardado");
                iconFavoritoSeccion[j].setAttribute("src", "images/icon-fav-active.svg");
                return;
            }
        }  
    }
}




// FUNCIÓN DOWNLOAD PARA BAJAR LOS GIFS

function download(data, strFileName, strMimeType) {
    var self = window, // this script is only for browsers anyway...
        defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
        mimeType = strMimeType || defaultMime,
        payload = data,
        url = !strFileName && !strMimeType && payload,
        anchor = document.createElement("a"),
        toString = function(a){return String(a);},
        myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
        fileName = strFileName || "download",
        blob,
        reader;
        myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
    if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
        payload=[payload, mimeType];
        mimeType=payload[0];
        payload=payload[1];
    }
    if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
        fileName = url.split("/").pop().split("?")[0];
        anchor.href = url; // assign href prop to temp anchor
          if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
            var ajax=new XMLHttpRequest();
            ajax.open( "GET", url, true);
            ajax.responseType = 'blob';
            ajax.onload= function(e){ 
              download(e.target.response, fileName, defaultMime);
            };
            setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
            return ajax;
        } // end if valid url?
    } // end if url?
    //go ahead and download dataURLs right away
    if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){
        if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
            payload=dataUrlToBlob(payload);
            mimeType=payload.type || defaultMime;
        }else{			
            return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
                navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
                saver(payload) ; // everyone else can save dataURLs un-processed
        }
    }//end if dataURL passed?
    blob = payload instanceof myBlob ?
        payload :
        new myBlob([payload], {type: mimeType}) ;
    function dataUrlToBlob(strUrl) {
        var parts= strUrl.split(/[:;,]/),
        type= parts[1],
        decoder= parts[2] == "base64" ? atob : decodeURIComponent,
        binData= decoder( parts.pop() ),
        mx= binData.length,
        i= 0,
        uiArr= new Uint8Array(mx);
        for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);
        return new myBlob([uiArr], {type: type});
     }
    function saver(url, winMode){
        if ('download' in anchor) { //html5 A[download]
            anchor.href = url;
            anchor.setAttribute("download", fileName);
            anchor.className = "download-js-link";
            anchor.innerHTML = "downloading...";
            anchor.style.display = "none";
            document.body.appendChild(anchor);
            setTimeout(function() {
                anchor.click();
                document.body.removeChild(anchor);
                if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
            }, 66);
            return true;
        }
        // handle non-a[download] safari as best we can:
        if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
            url=url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
            if(!window.open(url)){ // popup blocked, offer direct download:
                if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
            }
            return true;
        }
        //do iframe dataURL download (old ch+FF):
        var f = document.createElement("iframe");
        document.body.appendChild(f);
        if(!winMode){ // force a mime that will download:
            url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
        }
        f.src=url;
        setTimeout(function(){ document.body.removeChild(f); }, 333);
    }//end saver
    if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
        return navigator.msSaveBlob(blob, fileName);
    }
    if(self.URL){ // simple fast and modern way using Blob and URL:
        saver(self.URL.createObjectURL(blob), true);
    }else{
        // handle non-Blob()+non-URL browsers:
        if(typeof blob === "string" || blob.constructor===toString ){
            try{
                return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
            }catch(y){
                return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
            }
        }
        // Blob but not URL support:
        reader=new FileReader();
        reader.onload=function(e){
            saver(this.result);
        };
        reader.readAsDataURL(blob);
    }
    return true;
}; /* end download() */