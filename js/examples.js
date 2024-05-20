







var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var mc = new Hammer(canvas);

var viewOffsetX = 0;
var viewOffsetY = 0;
var scale = 0.1;
var lastScale = 0.1;

var initialCenterX = 0;
var initialCenterY = 0;


var images = [
    { x: 100, y: 100, img: new Image() },
    { x: 300, y: 300, img: new Image() },
];
for (let i = 0; i < 100; i++) {
    images.push(createImage());
}
// Ajustar el tamaño inicial del canvas y reajustar el offset del centro
function resizeCanvas() {
    var ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0); // Ajustar transformación para escalar correctamente en alta resolución

    // Recalcular offsets en base a la nueva dimensión del canvas
    viewOffsetX = initialCenterX - canvas.width / 2 / scale;
    viewOffsetY = initialCenterY - canvas.height / 2 / scale;
    drawImages();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();


function createImage() {
    var img = new Image();
    img.onload = drawImages;  // Asegurarse de redibujar cuando las imágenes se carguen
    let r = Math.floor(Math.random() * 2);
    if (r == 1) {
        img.src = "https://img.freepik.com/foto-gratis/colores-arremolinados-interactuan-danza-fluida-sobre-lienzo-que-muestra-tonos-vibrantes-patrones-dinamicos-que-capturan-caos-belleza-arte-abstracto_157027-2892.jpg";
    } else {
        img.src = "https://www.nosotros-los-diseñadores.com/wp-content/uploads/2020/05/8-sitios-para-descagar-fotos-gratis.jpg";
    }
    return { x: Math.floor(Math.random() * 7000), y: Math.floor(Math.random() * 7000), img: img }
}


// Configuración de Hammer.js para pinch y pan
mc.get('pinch').set({ enable: true });
mc.on("pinchstart", function (ev) {
    lastScale = scale;
});

var lastPosX = 0;
var lastPosY = 0;
var isPanning = false;
var velocityX = 0;
var velocityY = 0;
var friction = 0.96;


mc.on("panstart", function (ev) {
    isPanning = true;
    lastPosX = ev.center.x;
    lastPosY = ev.center.y;
});
mc.on("panmove", function (ev) {
    if (isPanning) {
        var deltaX = ev.center.x - lastPosX;
        var deltaY = ev.center.y - lastPosY;
        lastPosX = ev.center.x;
        lastPosY = ev.center.y;
        var adjustedDeltaX = deltaX / scale;
        var adjustedDeltaY = deltaY / scale;
        viewOffsetX -= adjustedDeltaX;
        viewOffsetY -= adjustedDeltaY;
        drawImages();
    }
});
mc.on("panend", function (ev) {
    isPanning = false;
    velocityX = 20 * ev.velocityX;
    velocityY = 20 * ev.velocityY;
    requestAnimationFrame(animate);
});
canvas.addEventListener('wheel', function (ev) {
    ev.preventDefault();
    var delta = ev.deltaY * -0.01;
    var zoom = Math.exp(delta);
    scale *= zoom;
    drawImages();
});

function drawImages() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    images.forEach(function (image) {
        ctx.drawImage(image.img, image.x - viewOffsetX, image.y - viewOffsetY);
    });
    ctx.restore();
}

function animate() {
    if (Math.abs(velocityX) > 0.01 || Math.abs(velocityY) > 0.01) {
        viewOffsetX -= velocityX;
        viewOffsetY -= velocityY;
        velocityX *= friction;
        velocityY *= friction;
        drawImages();
        requestAnimationFrame(animate);
    } else {
        velocityX = 0;
        velocityY = 0;
    }
}