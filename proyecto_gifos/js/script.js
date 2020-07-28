
//FUNCIONALIDAD DEL INPUT DE BÚSQUEDA

let input = document.getElementById("input-busqueda");
let lista = document.querySelector(".sugerencias");
let inactivo = document.querySelector(".inactivo");
let li = document.getElementsByClassName("li-sugerencias");
let img = document.getElementsByClassName("list-img");
let imgSearch = document.querySelector(".search-icon");
let search = document.querySelector(".search");
let containerBuscar = document.querySelector(".container-buscar");

function inputSearch() {

    let p = document.getElementsByClassName("list-p"); //después que los crea crearSugerencia()

    if(inactivo.className == "inactivo inactivo-activo"
       && input.value == "") {

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
        imgSearch.setAttribute("src", "images/icon-search.svg");
        imgSearch.classList.remove("img-close");
        imgSearch.classList.add("search-icon");
        return;
    }

    

    if(lista.firstElementChild !== null) { //si no hay sugerencias en el input

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
        imgSearch.setAttribute("src", "images/close.svg"); //cambio el icono de búsqueda
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
    imgSearch.setAttribute("src", "images/icon-search.svg");
    imgSearch.classList.remove("img-close");
    imgSearch.classList.add("search-icon");
}

input.addEventListener("click", inputSearch);

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
            cerrarMax(); //cierro el gif maximizado
            busqueda(input.value);

    }else if(event.target.getAttribute("src") == "images/icon-fav-active.svg") {

            event.target.setAttribute("src", "images/icon-fav-hover.svg");
            borrarInfo(); //borra el gif de arrayFavoritos
            event.target.classList.remove("tildado");
            guardarInfo() //guardo los que estén tildados
            localStorage.setItem("favoritos", arrayFavoritos);
                
    }else if(event.target.getAttribute("src") == "images/icon-fav-hover.svg") {

            event.target.setAttribute("src", "images/icon-fav-active.svg");
            event.target.classList.add("tildado");
            guardarInfo(); //guarda la info del gif en el arrayFavoritos
            localStorage.setItem("favoritos", arrayFavoritos);

    }else if(event.target.className == "maximizar"
             || event.target.className == "link-maximizar") {

            event.target.classList.add("activado");
            maximizarGif();

    }
})

input.addEventListener("keyup", event => {

    if ((event.which === 13 //Al presionar enter
        || event.keyCode == 13)
        && input.value !== "") { 

            galeria.innerHTML = ""; //limpio la sección
            busqueda(input.value); //busco la palabra del input
            closeInputSearch();
            cerrarMax(); //cierro el gif maximizado
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
    console.log(data);
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
    nuevoImg.setAttribute("src", "images/icon-search.svg");
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

    if(imgSearch.getAttribute("src") == "images/close.svg") {
        lista.innerHTML = "";
        event.preventDefault();
        closeInputSearch();
        return;
    }

    galeria.innerHTML = ""; //limpio la sección
    cont = 0; //reseteo el contador del parámetro offset 
    arrayResultados = []; //reseteo el array que guarda la info de los resultados
    cerrarMax(); //cierro el gif maximizado
    busqueda(input.value);
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

                crearTarjeta(resp.data[r].images.fixed_height_downsampled.url, resp.data[r].title, resp.data[r].username, ".galeria-imagenes");

                arrayResultados.push(resp.data[r]);

                linkDescarga[r + cont].setAttribute("href", arrayResultados[r + cont].images.original.url);
                linkDescarga[r + cont].download = "descarga.gif";
        
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

function crearTarjeta(url, titulo, usuario, tipoGaleria) {

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
    imgIcon3.className = "maximizar";
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

    let iconFavorito = document.getElementsByClassName("favorito");

    for(q = 0; q < iconFavorito.length; q++) {

        if(iconFavorito[q].className == "favorito tildado") {

                arrayFavoritos.push(arrayResultados[q]);
                iconFavorito[q].classList.add("guardado");

        }     
    }
    
    let iconFavoritoTrending = document.getElementsByClassName("favorito trending");

    for(t = 0; t < iconFavoritoTrending.length; t++) {

        if(iconFavoritoTrending[t].className == "favorito trending tildado") {

                arrayFavoritos.push(arrayResultadosTrending[t]);
                iconFavoritoTrending[t].classList.add("guardado");
        }         
    }
}


// FUNCIÓN PARA BOORAR LA INFO DEL GIF FAVORITO

function borrarInfo() {

    let iconFavorito = document.getElementsByClassName("favorito");
    let iconFavoritoTrending = document.getElementsByClassName("favorito trending");

    for(g = 0; g < iconFavorito.length; ++g) {

        if(iconFavorito[g].className == "favorito tildado guardado") {

            iconFavorito[g].classList.remove("guardado")
        }         
    }

    for(e = 0; e < iconFavoritoTrending.length; ++e) {

        if(iconFavoritoTrending[e].className == "favorito trending tildado guardado") {

            iconFavoritoTrending[e].classList.remove("guardado")
        }         
    }

    arrayFavoritos = []
}


// FUNCIÓN PARA CREAR TARJETAS MAXIMIZADAS

function crearTarjetaMaximizada(url, titulo, usuario) {

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
    imgFavorito.id = "item3";
    imgFavorito.className = "favorito";
    imgDescarga.id = "item4";

    galeriaImagenesMax.appendChild(divImagenMax);
    divImagenMax.appendChild(imgGifMax);
    imgGifMax.setAttribute("src", url);
    divImagenMax.appendChild(divGridMax);
    divGridMax.appendChild(usuarioMax);
    divGridMax.appendChild(tituloMax);
    divGridMax.appendChild(linkDescargaMax);
    divGridMax.appendChild(imgFavorito);
    imgFavorito.setAttribute("src", "images/icon-fav-hover.svg");
    linkDescargaMax.appendChild(imgDescarga);
    imgDescarga.setAttribute("src", "images/icon-download.svg");
    
    usuarioMax.textContent = usuario;
    tituloMax.textContent = titulo;
    
}


// FUNCIÓN PARA ABRIR GIF MAXIMIZADO

let posicion; //para saber la posicion del gif

function maximizarGif() {

    let gifMax = document.getElementById("gif-maximizado");
    let iconMaximizar = document.getElementsByClassName("maximizar");
    
    seccionBusquedas.style.display = "none";
    gifMax.style.display = "unset";

    for(l = 0; l < arrayResultados.length; l++) {

        if(iconMaximizar[l].className == "maximizar activado") {

            crearTarjetaMaximizada(arrayResultados[l].images.fixed_height.url, arrayResultados[l].title, arrayResultados[l].username);

            posicion = l;
            console.log(posicion);
        }         
    } 
}

function cerrarMax() {

    let gifMax = document.getElementById("gif-maximizado");
    let galeriaImagenesMax = document.getElementById("galeria-max");

    gifMax.style.display = "none";
    galeriaImagenesMax.innerHTML = "";
    contadorDerecha = 0; //reseteo el contador de posicion
    contadorIzquierda = 0; //reseteo el contador de posicion
}

// FUNCIÓN PARA CERRAR CON LA IMAGEN DE CLOSE Y SACAR LA CLASE "MAXIMIZAR ACTIVADO"

function borrarMaximizar() {

    let iconMaximizar = document.getElementsByClassName("maximizar");

    for(l = 0; l < arrayResultados.length; l++) {

        if(iconMaximizar[l].className == "maximizar activado") {

            iconMaximizar[l].classList.remove("activado");
        }         
    } 
}

let imgClose = document.querySelector(".close-max img");

imgClose.addEventListener("click", event => {

    event.preventDefault();
    cerrarMax();
    borrarMaximizar();
    seccionBusquedas.style.display = "unset";

})


//FUNCIÓN PARA PASAR DE A UNO LOS GIFS MAXIMIZADOS

let left = document.querySelector(".primer-boton");
let right = document.querySelector(".segundo-boton");
let contador = 1; //las veces que me muevo

right.addEventListener("click", () => {

    let galeriaImagenesMax = document.getElementById("galeria-max");
    
    if((posicion + contador) < cont) {

        galeriaImagenesMax.innerHTML = ""; //vacio primero el contenido

        crearTarjetaMaximizada(arrayResultados[(posicion + contador)].images.fixed_height.url, arrayResultados[(posicion + contador)].title, arrayResultados[(posicion + contador)].username);

        posicion = posicion + contador; //nueva posicion
        console.log(posicion);
        console.log(posicion + contador)

    }
    
})

left.addEventListener("click", () => {

    let galeriaImagenesMax = document.getElementById("galeria-max");

    if((posicion - contador) >= 0) {

        galeriaImagenesMax.innerHTML = ""; //vacio primero el contenido

        crearTarjetaMaximizada(arrayResultados[(posicion - contador)].images.fixed_height.url, arrayResultados[(posicion - contador)].title, arrayResultados[(posicion - contador)].username);

        posicion = posicion - contador; //nueva posicion
        console.log(posicion);
        console.log(posicion - contador)

    }
    
})


// SECCIÓN TRENDING GIFOS

let arrayResultadosTrending = [] //creo un array para los resultados de ésta sección

async function trendingGifos() {

    const resp3 = await fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=12`);
    const trendGifos = await resp3.json();

    let favoritosTrending = document.getElementsByClassName("favorito");
    let linkDescarga = document.getElementsByClassName("descarga");

    for(v = 0; v < trendGifos.data.length; v++){

        crearTarjeta(trendGifos.data[v].images.fixed_height_downsampled.url, trendGifos.data[v].title, trendGifos.data[v].username, ".galeria-trending");

        arrayResultadosTrending.push(trendGifos.data[v]);
        favoritosTrending[v].classList.add("trending"); //le agrego una clase para distinguirlos
        linkDescarga[v].setAttribute("href", arrayResultadosTrending[v].images.original.url);
        linkDescarga[v].download = "descarga.gif";
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



