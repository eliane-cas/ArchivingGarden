document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Dimensiones del contenido virtual
    const contentWidth = 14000;
    const contentHeight = 684;

    // Asegura que el canvas cubre toda la pantalla
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Coordenadas iniciales de las imágenes
    const imagePositions = [
        { x: 100, y: 100 },
        { x: 800, y: 300 },
        { x: 1500, y: 900 },
        { x: 100, y: 400 },
        { x: 200, y: 300 }
    ];

    // Carga de imágenes
    let imagesLoaded = 0;
    const images = [
        "https://img.freepik.com/free-photo/colors-swirl-together-in-a-fluid-dance-on-canvas_157027-2892.jpg",
        "https://img.freepik.com/free-photo/colors-swirl-together-in-a-fluid-dance-on-canvas_157027-2892.jpg",
        "https://img.freepik.com/free-photo/colors-swirl-together-in-a-fluid-dance-on-canvas_157027-2892.jpg",
        "https://img.freepik.com/free-photo/colors-swirl-together-in-a-fluid-dance-on-canvas_157027-2892.jpg",
        "https://img.freepik.com/free-photo/colors-swirl-together-in-a-fluid-dance-on-canvas_157027-2892.jpg"
    ].map((src, index) => {
        const img = new Image();
        img.onload = () => {
            imagesLoaded++;
            if (imagesLoaded === images.length) {
                drawImages();  // Sólo dibuja cuando todas las imágenes estén cargadas
            }
        };
        img.onerror = () => {
            console.error("Error loading image:", src);
        };
        img.src = src;
        return { img, pos: imagePositions[index] };
    });

    var lastPosX = 0;
    var lastPosY = 0;
    var viewOffsetX = 0;
    var viewOffsetY = 0;
    var velocityX = 0;
    var velocityY = 0;
    var friction = 0.86;
    var isPanning = false;
    var scale = 0.3; // Preparado para futura implementación de zoom
    var initialScale = scale;  // Almacenará la escala al inicio del pinch
    const mc = new Hammer(canvas);
    mc.get('pinch').set({ enable: true });
    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 0 });
    mc.get('pinch').recognizeWith(mc.get('pan'));


    canvas.addEventListener("touchmove", function (e) {
        e.preventDefault();  // Esto evitará el scroll y zoom nativos al usar gestos táctiles
    }, { passive: false });


    mc.on("panstart", function (ev) {
        isPanning = true;
        // Ajusta estas líneas para asegurar que se guarden las coordenadas actuales del evento.
        lastPosX = ev.center.x;
        lastPosY = ev.center.y;
    });
    const sensitivityFactor = 3;  // Aumenta este valor para disminuir la sensibilidad

    mc.on("panmove", function (ev) {
        if (isPanning) {
            const deltaX = (ev.center.x - lastPosX) / scale / sensitivityFactor;
            const deltaY = (ev.center.y - lastPosY) / scale / sensitivityFactor;
            lastPosX = ev.center.x;
            lastPosY = ev.center.y;

            viewOffsetX += deltaX;
            viewOffsetY += deltaY;

            adjustViewOffsets();  // Asegúrate de que los límites son respetados
            drawImages();
        }
    });

    mc.on("panend", function (ev) {
        isPanning = false;
        velocityX = 10 * ev.velocityX;
        velocityY = 10 * ev.velocityY;
        requestAnimationFrame(animate);
    });



    function adjustViewOffsets() {
        const maxOffsetX = Math.min(0, canvas.width - contentWidth * scale);
        const maxOffsetY = Math.min(0, canvas.height - contentHeight * scale);
        viewOffsetX = Math.max(maxOffsetX, Math.min(0, viewOffsetX));
        viewOffsetY = Math.max(maxOffsetY, Math.min(0, viewOffsetY));
    }

    function animate() {
        if (!isPanning) {
            viewOffsetX += velocityX;
            viewOffsetY += velocityY;

            adjustViewOffsets();  // Asegúrate de que esto se llama aquí también
            velocityX *= friction;
            velocityY *= friction;
            if (Math.abs(velocityX) < 0.01 && Math.abs(velocityY) < 0.01) {
                console.log("Stopping animation due to low velocity");
                return;  // Detiene la animación cuando la velocidad es muy baja
            }

            drawImages();
            requestAnimationFrame(animate);
        }
    }


    function drawImages() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        images.forEach(({ img, pos }) => {
            const adjustedX = pos.x * scale + viewOffsetX;
            const adjustedY = pos.y * scale + viewOffsetY;
            const adjustedWidth = img.width * scale;
            const adjustedHeight = img.height * scale;
            ctx.drawImage(img, adjustedX, adjustedY, adjustedWidth, adjustedHeight);
        });
    }
});
