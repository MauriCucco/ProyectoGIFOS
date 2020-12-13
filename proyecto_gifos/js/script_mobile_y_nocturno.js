// MENÚ HAMBURGUESA DE MOBILE

let menuHamburguesa = document.querySelector(".menu");

document.addEventListener("click", (event) => {
  if (window.matchMedia("(max-width: 1199px)").matches) {
    let checkbox = document.getElementById("hamburguesa_checkbox");

    if (event.target.id === "hamburguesa_checkbox") {
      if (checkbox.checked) {
        menuHamburguesa.style.display = "unset";
      } else {
        menuHamburguesa.style.display = "none";
      }
    } else if (event.target.id === "segundo" || event.target.id === "tercero") {
      if (checkbox.checked) {
        menuHamburguesa.style.display = "none";
        checkbox.checked = false;
      }
    }
  }
});

// MODO NOCTURNO

modo.addEventListener("click", (event) => {
  if (event.target.textContent === "Modo Nocturno") {
    toNightMode();
  } else if (event.target.textContent === "Modo Diurno") {
    let modoDiurno = "css/style_diurno.css";

    body.style.backgroundColor = "white";

    estilo.setAttribute("href", modoDiurno); //estilo es el link del index.html

    event.target.textContent = "Modo Nocturno";

    gifos.style.fill = "#572EE5";

    searchIcon.setAttribute("src", "images/icon-search.svg");

    inactivo.setAttribute("src", "images/icon-search.svg");

    close.setAttribute("src", "images/close.svg");

    camara.setAttribute("src", "images/camara.svg");
    pelicula.setAttribute("src", "images/pelicula.svg");

    localStorage.setItem("estilo", modoDiurno);
  }
});
