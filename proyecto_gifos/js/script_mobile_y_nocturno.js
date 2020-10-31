// MENÚ HAMBURGUESA DE MOBILE

let menuHamburguesa = document.querySelector(".menu");

document.addEventListener("click", event => {

    if (window.matchMedia("(max-width: 1199px)").matches) {

        let checkbox = document.getElementById("hamburguesa_checkbox");

        if(event.target.id == "hamburguesa_checkbox") {

            if(checkbox.checked) {

                menuHamburguesa.style.display = "unset";

            }else {

                menuHamburguesa.style.display = "none";
            }

        }else if (event.target.id == "segundo"
                  || event.target.id == "tercero") {

            if(checkbox.checked) {

                menuHamburguesa.style.display = "none";
                checkbox.checked = false;
        
            }

        }
    } 
})

/*$(document).ready(function() {

    $("#hamburguesa_checkbox").click(function() {
       
        $(".menu").slideToggle(500);
    })
})*/


// MODO NOCTURNO

modo.addEventListener("click", () => {

    if(event.target.textContent == "Modo Nocturno") {

        toModeNocturno();

    }else if(event.target.textContent == "Modo Diurno") {

        let modoDiurno = "css/style_diurno.css";

        estilo.setAttribute("href", modoDiurno);

        event.target.textContent = "Modo Nocturno";

        gifos.style.fill = "#572EE5";

        searchIcon.setAttribute("src", "images/icon-search.svg");

        inactivo.setAttribute("src", "images/icon-search.svg");

        close.setAttribute("src", "images/close.svg");

        camara.setAttribute("src", "images/camara.svg");
        pelicula.setAttribute("src", "images/pelicula.svg");

        localStorage.setItem("estilo", modoDiurno);
    }
})