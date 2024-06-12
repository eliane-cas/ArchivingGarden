function iniciarRotacion(imagen) {
    imagen.style.animation = 'none';
    imagen.offsetHeight; // Fuerza reflow
    imagen.style.animation = '';
    imagen.style.animation = 'rotar 2s ease-in-out forwards';
    setTimeout(() => iniciarRotacion(imagen), 3000);
}

function tonteria(imagen) {
    imagen.style.animation = 'none';
    imagen.offsetHeight; // Fuerza reflow
    imagen.style.animation = '';
    imagen.style.animation = 'rotar 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
    setTimeout(() => tonteria(imagen), 3000);
}

function timeline() {
    const yearSpans = document.querySelectorAll('.year');
    const allCards = document.querySelectorAll('.timeCard');

    // Initially hide all cards except the first and set the first year as active
    allCards.forEach(card => card.classList.add('hidden'));
    allCards[0].classList.remove('hidden');
    allCards[0].style.display = 'block';

    yearSpans[0].classList.add('active');

    yearSpans.forEach(span => {
        span.onclick = function () {
            allCards.forEach(card => {
                card.classList.add('hidden');
                card.style.display = 'none'; // Hide card
            });

            const selectedCard = document.querySelector(`.timeCard[data-year="${this.dataset.year.trim()}"]`);
            if (selectedCard) {
                selectedCard.classList.remove('hidden');
                selectedCard.style.display = 'block'; // Show card and ensure it’s visible
                // Force restart of animation
                selectedCard.style.animation = 'none';
                requestAnimationFrame(() => {
                    selectedCard.style.animation = '';
                });
            }

            yearSpans.forEach(s => {
                s.classList.remove('active');
            });

            this.classList.add('active');
        };
    });
}
function main() {


    timeline();

    var imagen1 = document.getElementById('home0');
    var imagen2 = document.getElementById('section3img');

    iniciarRotacion(imagen1);
    tonteria(imagen2);
    // script.js
    var flipper = document.querySelector('.flipper');
    setInterval(function () {
        flipper.classList.toggle('flipped');
    }, 3000);
    let indice = 0;
    const estilos = [
        { color: "#000000", texto: "And why is this back and forth another word for which is sharing; another phrase for which is mutual aid the gardener's disposition or maybe more to the point, practice? Because a garden a healthy, thriving garden-tells us to. I suspect, whether we know it or not, we're just emulating the garden, which is a repository of sharing.", autor: "Ross Gay,", reference: "Repository of sharing", colorTexto: "white" },
        { color: "#747D03", texto: "All stories are also the stories of hands — picking up, balancing, pointing, joining, kneading, threading, caressing abandoned in sleep, cutting, eating, wiping, playing music scratching, grasping, peeling, clenching, pulling a trigger, folding.", autor: "John Berger,", reference: "A to X: A Story in Letters", colorTexto: "white" },
        { color: "#D4FD7D", texto: "Gathering is the tender and thoughtful collection of goods for your kin, and a moment for reunion, for celebration, and for introspection around those goods.", autor: "Mindy Seu,", reference: "Cyberfeminism Index", colorTexto: "black" },
        { color: "#BAECB7", texto: "Afropresentism is you channeling your ancestry through every technology at your disposal - meditation, conversation, love, the Web - and turning absolutely everything into a portal that takes you precisely where you need to be, in this moment, towards the next. Until finally, the space between the dream and the memory collapses into being your reality - now.", autor: "John Berger,", reference: "A to X: A Story in Letters", colorTexto: "black" },
        { color: "#7B4B29", texto: "I want to model a collective practice between us: remembering as making sense, and remembering as becoming.", autor: "Sara Hendren,", reference: "Everything you learn you’re only remembering", colorTexto: "white" },
        { color: "#15D076", texto: "If you have a garden and a library, you have everything you need.", autor: "Marcus Tullius Cicero", reference: "", colorTexto: "black" },
        { color: "#E6E6E6", texto: "And why is this back and forth another word for which is sharing; another phrase for which is mutual aid the gardener's disposition or maybe more to the point, practice? Because a garden a healthy, thriving garden-tells us to. I suspect, whether we know it or not, we're just emulating the garden, which is a repository of sharing.", autor: "Ross Gay,", reference: "Repository of sharing", colorTexto: "black" },
        { color: "#000000", texto: "I want to model a collective practice between us: remembering as making sense, and remembering as becoming.", autor: "Sara Hendren,", reference: "Everything you learn you’re only remembering", colorTexto: "white" },
    ];

    const contenedor = document.getElementById("quotes");
    const texto = document.getElementById("quote-p");
    const autor = document.getElementById("quote-author");
    const reference = document.getElementById("quote-reference");
    const title = document.querySelector("#quotes .card-title");
    const subtitle = document.querySelector("#quotes #quoteContainer .sub-card-subtitle");

    function actualizarEstilos() {
        if (estilos[indice].colorTexto == "white") {
            subtitle.style.color = '#FFFFFF80';
        } else {
            subtitle.style.color = '#00000080';
        }

        contenedor.style.backgroundColor = estilos[indice].color;
        texto.textContent = estilos[indice].texto;
        texto.style.color = estilos[indice].colorTexto;
        autor.textContent = estilos[indice].autor;
        autor.style.color = estilos[indice].colorTexto;
        reference.textContent = estilos[indice].reference;
        reference.style.color = estilos[indice].colorTexto;
        title.style.color = estilos[indice].colorTexto;
    }

    actualizarEstilos();  // Inicializar los estilos y contenidos al cargar

    contenedor.addEventListener('click', function () {
        indice = (indice + 1) % estilos.length; // Incrementa el índice y vuelve a 0 si alcanza el final
        actualizarEstilos();  // Actualizar los estilos y contenidos en cada clic
    });
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
