
let seccion = document.getElementById("segundo");
let seccionFavoritos = document.getElementById("favoritos");
let verMasFavoritos = document.getElementById("ver-mas-favoritos");
let galeriaImagenesFavoritos = document.querySelector(".galeria-imagenes-favoritos");
let sinContenido = document.querySelector(".sin-contenido");
let arraySeccionFavoritos;
let contFav; //contador que funciona como un offset

seccion.addEventListener("click", event => {

    event.target.style.color = "#9CAFC3";
    event.target.style.borderBottom = "unset"

    seccionPresentacion.style.display = "none";
    seccionBusquedas.style.display = "none";
    seccionFavoritos.style.display = "unset";

    let guardado = localStorage.getItem("favoritos");
    arraySeccionFavoritos = JSON.parse(guardado);

    galeriaImagenesFavoritos.innerHTML = "";
    sinContenido.style.display = "none";

    favoritos(arraySeccionFavoritos);
})

function favoritos(array) {

    if(array == null
       || array.length == 0) {
        
        verMasFavoritos.style.display = "none";
        sinContenido.style.display = "unset";

    }else if(array.length <= 12) {

        let linkDescarga = document.getElementsByClassName("descarga");
        let iconSeccionFavoritos = document.getElementsByClassName("favorito");

        for(r = 0; r < array.length; r++) {

            crearTarjeta(array[r].images.fixed_height_downsampled.url, array[r].title, array[r].username, ".galeria-imagenes-favoritos", "maximizar seccion");

            linkDescarga[r + cont].setAttribute("href", array[r].images.original.url);
            linkDescarga[r +cont].download = "descarga.gif"; 
            
            iconSeccionFavoritos[r + cont].classList.add("seccion");
            iconSeccionFavoritos[r + cont].classList.add("tildado"); //para que ya queden tildados
            iconSeccionFavoritos[r + cont].classList.add("guardado");
            iconSeccionFavoritos[r + cont].setAttribute("src", "images/icon-fav-seccion.svg"); //harcodeo imagen estable

            verMasFavoritos.style.display = "none";
    
        }

    }else if(array.length > 12) {

        contFav = 0;

        let linkDescarga = document.getElementsByClassName("descarga");
        let iconSeccionFavoritos = document.getElementsByClassName("favorito");

        for(r = 0; r < 12; r++) {

            crearTarjeta(array[r].images.fixed_height_downsampled.url, array[r].title, array[r].username, ".galeria-imagenes-favoritos", "maximizar seccion");

            linkDescarga[r + cont].setAttribute("href", array[r].images.original.url);
            linkDescarga[r +cont].download = "descarga.gif"; 
            
            iconSeccionFavoritos[r + cont].classList.add("seccion");
            iconSeccionFavoritos[r + cont].classList.add("tildado"); //para que ya queden tildados
            iconSeccionFavoritos[r + cont].classList.add("guardado");
            iconSeccionFavoritos[r + cont].setAttribute("src", "images/icon-fav-seccion.svg"); //harcodeo imagen estable

            verMasFavoritos.style.display = "block"; 
        }

        contFav += 12;
    }
}


// FUNCIONAMIENTO DEL BOTÓN VER MÁS DE ``FAVORITOS´´

verMasFavoritos.addEventListener("click", () => {

    if (arraySeccionFavoritos.length > 12) {

        let linkDescarga = document.getElementsByClassName("descarga");
        let iconSeccionFavoritos = document.getElementsByClassName("favorito");
        let vueltas;

        for(r = contFav; r < arraySeccionFavoritos.length; r++) {

            crearTarjeta(arraySeccionFavoritos[r].images.fixed_height_downsampled.url, arraySeccionFavoritos[r].title, arraySeccionFavoritos[r].username, ".galeria-imagenes-favoritos", "maximizar seccion");

            linkDescarga[r + cont].setAttribute("href", arraySeccionFavoritos[r].images.original.url);
            linkDescarga[r +cont].download = "descarga.gif"; 
            
            iconSeccionFavoritos[r + cont].classList.add("seccion");
            iconSeccionFavoritos[r + cont].classList.add("tildado"); //para que ya queden tildados
            iconSeccionFavoritos[r + cont].classList.add("guardado");
            iconSeccionFavoritos[r + cont].setAttribute("src", "images/icon-fav-seccion.svg"); //harcodeo imagen estable

            vueltas = r;
    
        }

        contFav += 12;

        if(contFav > arraySeccionFavoritos.length) {

            verMasFavoritos.style.display = "none"; 
        }
    }
})


// FUNCIÓN PARA BORRAR GIF DE FAVORITOS (Y DE OTRAS SECCIONES) ------> ANULADA POR CUESTIÓN DE TIEMPO

/*let indexFavoritoTrending;
let indexFavorito;
let idSeccionFavorito; //para saber la posicion del gif favorito borrado

function borrarFavorito() {

    let iconSeccionFavoritos = document.getElementsByClassName("favorito seccion");

    for(d = 0; d < iconSeccionFavoritos.length; d++) {

        if(iconSeccionFavoritos[d].className == "favorito seccion guardado") {
 
                iconSeccionFavoritos[d].classList.remove("guardado");
                posicionFavorito = d;
        }
    }

    idSeccionFavorito = arraySeccionFavoritos[posicionFavorito].id;

    let indexBorrar;

    for (l = 0; l < arrayFavoritos.length; l++) {
                        
        if(arrayFavoritos[l].id == idSeccionFavorito) {
                    
            indexBorrar = l;
        }
    }

    arrayFavoritos.splice([indexBorrar], 1); //borro el gif especifico del arrayFavoritos


    //encuentro la posicion del gif borrado en la determianda sección

    let iconFavoritoTrending = document.getElementsByClassName("favorito trending"); //TRENDING GIFOS

    for (h = 0; h < arrayResultadosTrending.length; h++) {
                        
        if(arrayResultadosTrending[h].id == idSeccionFavorito) {
                    
            indexFavoritoTrending = h;
        }
    }
    
    for (k = 0; k < arrayResultados.length; k++) {
                        
        if(arrayResultados[k].id == idSeccionFavorito) {
                    
            indexFavorito = k;
        }
    }

    //cambio posicion y/o posicionTrending y borro en su respectiva sección


    if(indexFavoritoTrending != null) {

        iconFavoritoTrending[indexFavoritoTrending].setAttribute("src", "images/icon-fav-hover.svg");
        iconFavoritoTrending[indexFavoritoTrending].classList.remove("tildado");
        iconFavoritoTrending[indexFavoritoTrending].classList.remove("guardado");
        posicionFavTrendMax.splice(posicionFavTrendMax.indexOf(indexFavoritoTrending), 1); //borro la posicion de FavTrendMax
        posicionFavTrend.splice(posicionFavTrend.indexOf(indexFavoritoTrending), 1); //borro la posicion de de FavTrend
    }

    let iconFavorito = document.getElementsByClassName("favorito"); //BUSQUEDAS

    if(indexFavorito != null) {

        posicion = indexFavorito;

        iconFavorito[posicion].setAttribute("src", "images/icon-fav-hover.svg");
        iconFavorito[posicion].classList.remove("tildado");
        iconFavorito[posicion].classList.remove("guardado");
        posicionFav.splice((posicionFav.indexOf(posicion)), 1); //borro la posicion de posicionFav
        posicionFavMax.splice((posicionFavMax.indexOf(posicion)), 1); //borro la posicion de posicionFavMax
    }
}*/


//FUNCIÓN PARA MAXIMIZAR LOS GIFS DE FAVORITOS

let posicionFavorito;

function maximizarFavorito() {

    let gifMax = document.getElementById("gif-maximizado");
    let imgMaximizar = document.getElementsByClassName("maximizar seccion");

    seccionTrending.style.display = "none";
    seccionFavoritos.style.display = "none";
    header.style.display = "none";
    footer.style.display = "none";
    gifMax.style.display = "unset";

    for(l = 0; l < arraySeccionFavoritos.length; l++) {

        if(imgMaximizar[l].className == "maximizar seccion activado") {

            crearTarjetaMaximizada(arraySeccionFavoritos[l].images.fixed_height.url, arraySeccionFavoritos[l].title, arraySeccionFavoritos[l].username, arraySeccionFavoritos[l].images.original.url, "gifs-max-seccion", "favorito seccion", "itemBusqueda");

            posicionFavorito = l;

            let favoritoSeccion = document.querySelector("img#itemBusqueda.favorito.seccion"); //harcodeo imagen estable

            if(body.style.backgroundColor == "rgb(55, 56, 60)") { //modo nocturno

                favoritoSeccion.setAttribute("src", "images/icon-fav-seccion-noc.svg");
        
            }else {
        
                favoritoSeccion.setAttribute("src", "images/icon-fav-seccion.svg");
        
            }
            
            return;

        }  
    }
}