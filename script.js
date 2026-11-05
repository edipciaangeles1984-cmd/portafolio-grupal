document.querySelectorAll("nav a").forEach(function(enlace) {
    enlace.addEventListener("click", function() {
        console.log("Página seleccionada: " + enlace.textContent);
    });
});


// CARRUSEL DE DESARROLLADORES
const slides = document.querySelectorAll(".slide");
const botonAnterior = document.getElementById("anterior");
const botonSiguiente = document.getElementById("siguiente");
const botonPausar = document.getElementById("pausar");
const contador = document.getElementById("contador");

let indiceActual = 0;
let carruselPausado = false;
let temporizador = null;

function mostrarIntegrante(indice) {
    if (slides.length === 0) return;

    slides.forEach(function(slide) {
        slide.classList.remove("activo");
    });

    slides[indice].classList.add("activo");

    if (contador) {
        contador.textContent =
            "Desarrollador Web " + (indice + 1) + " de " + slides.length;
    }
}

function siguienteIntegrante() {
    if (slides.length === 0) return;

    indiceActual = (indiceActual + 1) % slides.length;
    mostrarIntegrante(indiceActual);
}

function anteriorIntegrante() {
    if (slides.length === 0) return;

    indiceActual = (indiceActual - 1 + slides.length) % slides.length;
    mostrarIntegrante(indiceActual);
}

function iniciarTemporizador() {
    clearInterval(temporizador);

    if (slides.length > 0 && !carruselPausado) {
        temporizador = setInterval(function() {
            siguienteIntegrante();
        }, 40000);
    }
}

if (slides.length > 0) {
    mostrarIntegrante(indiceActual);
    iniciarTemporizador();

    if (botonSiguiente) {
        botonSiguiente.addEventListener("click", function() {
            siguienteIntegrante();
            iniciarTemporizador();
        });
    }

    if (botonAnterior) {
        botonAnterior.addEventListener("click", function() {
            anteriorIntegrante();
            iniciarTemporizador();
        });
    }

    if (botonPausar) {
        botonPausar.addEventListener("click", function() {
            carruselPausado = !carruselPausado;

            botonPausar.textContent = carruselPausado
                ? "Reanudar presentación"
                : "Pausar presentación";

            iniciarTemporizador();
        });
    }
}


// AMPLIACIÓN DE LAS IMÁGENES DE PROYECTOS
const modal = document.getElementById("modal-imagen");
const imagenAmpliada = document.getElementById("imagen-ampliada");
const botonCerrar = document.getElementById("cerrar-modal");

let imagenAnterior = null;

function abrirImagen(imagen) {
    if (!modal || !imagenAmpliada) return;

    imagenAnterior = imagen;
    imagenAmpliada.src = imagen.src;
    imagenAmpliada.alt = imagen.alt;

    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (botonCerrar) botonCerrar.focus();
}

function cerrarImagen() {
    if (!modal || !imagenAmpliada) return;

    modal.classList.remove("visible");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    imagenAmpliada.src = "";
    imagenAmpliada.alt = "";

    if (imagenAnterior) imagenAnterior.focus();
}

document.querySelectorAll(".imagen-proyecto").forEach(function(imagen) {
    imagen.addEventListener("click", function() {
        abrirImagen(imagen);
    });

    imagen.addEventListener("keydown", function(evento) {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            abrirImagen(imagen);
        }
    });
});

if (botonCerrar) {
    botonCerrar.addEventListener("click", cerrarImagen);
}

if (modal) {
    modal.addEventListener("click", function(evento) {
        if (evento.target === modal) {
            cerrarImagen();
        }
    });
}

document.addEventListener("keydown", function(evento) {
    if (
        evento.key === "Escape" &&
        modal &&
        modal.classList.contains("visible")
    ) {
        cerrarImagen();
    }
});


// FORMULARIO DE CONTACTO
const formulario = document.getElementById("formulario-contacto");

if (formulario) {
    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const asunto = document.getElementById("asunto").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        const destinatario = "lopezgarciaberthapatricia@gmail.com";

        const cuerpo =
            "Nombre: " + nombre + "\n" +
            "Correo: " + correo + "\n\n" +
            "Mensaje:\n" + mensaje;

        const enlaceCorreo =
            "mailto:" + destinatario +
            "?subject=" + encodeURIComponent(asunto) +
            "&body=" + encodeURIComponent(cuerpo);

        window.location.href = enlaceCorreo;
    });
}


// BOTÓN ÚNICO DE WHATSAPP PARA TODO EL EQUIPO
// Reemplazá el número de ejemplo por el número real del equipo.
const NUMERO_WHATSAPP_EQUIPO = "50589033981";

document.querySelectorAll(".whatsapp").forEach(function(boton) {
    boton.href =
        "https://wa.me/" + NUMERO_WHATSAPP_EQUIPO +
        "?text=" +
        encodeURIComponent("Hola, me gustaría conocer más sobre su equipo y sus proyectos.");

    boton.target = "_blank";
    boton.rel = "noopener noreferrer";
} );