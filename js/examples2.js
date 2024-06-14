function enableVerticalDragScroll() {
    const container = document.querySelector('.draggable-container');
    let isDown = false;
    let startY;
    let scrollTop;

    if (!container) return; // Si no existe el contenedor, salimos de la función

    container.addEventListener('mousedown', (e) => {
        // Asegura que el evento solo se active para el botón principal del ratón (usualmente el izquierdo)
        if (e.button !== 0) return;

        isDown = true;
        startY = e.pageY - container.offsetTop;
        scrollTop = container.scrollTop;
        container.classList.add('active'); // Cambia el cursor
        e.preventDefault(); // Evita que el evento del mouse afecte otros tipos de desplazamiento
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const y = e.pageY - container.offsetTop;
        const deltaY = y - startY;
        const walk = deltaY * 2; // Ajusta este factor para cambiar la sensibilidad
        container.scrollTop = scrollTop - walk;
    });
}


if (document.readyState === 'complete') {
    enableVerticalDragScroll();
} else {
    document.addEventListener('DOMContentLoaded', enableVerticalDragScroll);
}
