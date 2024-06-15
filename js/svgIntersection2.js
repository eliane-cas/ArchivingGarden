

if (document.readyState === 'complete') {
    initializePaperJS();
} else {
    document.addEventListener('DOMContentLoaded', initializePaperJS);
}
function initializePaperJS() {
    var canvas = document.getElementById('myCanvas');
    paper.setup(canvas);

    // Asegúrate de que la vista de Paper.js use las dimensiones fijas del canvas, independientemente del zoom
    paper.view.setViewSize(canvas.offsetWidth, canvas.offsetHeight);
    // Continúa con la importación del SVG y demás configuraciones
    var words = paper.project.importSVG(document.getElementById('intersect2'), { expandShapes: true });


    words.visible = true;

    var yesGroup = words.children.yes;
    var noGroup = words.children.no;

    // Remove fill colors and set stroke color
    yesGroup.children.forEach(function (child) {
        child.fillColor = null;
        child.strokeColor = 'black';
    });
    noGroup.children.forEach(function (child) {
        child.fillColor = null;
        child.strokeColor = 'black';
    });

    // Resize the words to fit snugly inside the view:
    words.scale(0.9);

    // Center horizontally and set vertical position for the static group
    var desiredYesY = paper.view.center.y; // Moverá el grupo 10% hacia abajo desde el centro
    yesGroup.position = new paper.Point(paper.view.center.x, desiredYesY);

    // Set initial position for the moving group
    var initialRelativeX = 0.5; // 25% from the left of the canvas width
    var fixedNoY = 150; // Set your desired fixed vertical position here for noGroup
    var initialX = paper.view.bounds.width * initialRelativeX;
    noGroup.position = new paper.Point(initialX, fixedNoY);



    // Define the tool
    var tool = new paper.Tool();
    // Handle scroll within the canvas
    // Handle mousemove and scroll together
    var lastKnownMousePosition = { x: 0, y: 0 }; // Almacena las coordenadas absolutas del mouse


    document.addEventListener('mousemove', function (event) {
        lastKnownMousePosition.x = event.clientX;
        lastKnownMousePosition.y = event.clientY;
    });

    window.addEventListener('scroll', function () {
        var elementUnderMouse = document.elementFromPoint(lastKnownMousePosition.x, lastKnownMousePosition.y);
        if (elementUnderMouse && elementUnderMouse.id === 'myCanvas') {
            removeAllIntersectionsCreatedDuringMove();
            var canvasBounds = document.getElementById('myCanvas').getBoundingClientRect();
            var relativeX = lastKnownMousePosition.x - canvasBounds.left;
            var relativeY = lastKnownMousePosition.y - canvasBounds.top;

            // Mover con restricciones aplicadas
            moveSVGToMousePosition(relativeX, relativeY);
        }
    });


    function removeAllIntersectionsCreatedDuringMove() {
        paper.project.activeLayer.children.forEach(function (item) {
            if (item.data.createdDuringMove) {
                item.remove();  // Elimina las intersecciones creadas durante onMouseMove
            }
        });
    }

    function moveSVGToMousePosition(x, y) {
        var noGroup = paper.project.getItem({ name: 'no' });  // Asume que noGroup es el grupo que quieres mover
        if (noGroup) {
            // Restringe el movimiento dentro de un área específica del canvas
            var minY = paper.view.size.height * 0.25;
            var maxY = paper.view.size.height * 0.75;

            // Ajustar y si está fuera de los límites
            if (y < minY) y = minY;
            else if (y > maxY) y = maxY;

            noGroup.position = new paper.Point(x, y);
        }
    }



    tool.onMouseMove = function (event) {
        if (event.point.y < paper.view.size.height * 0.75 && event.point.y > paper.view.size.height * 0.25) {
            noGroup.position = event.point;
            for (var i = 0; i < yesGroup.children.length; i++) {
                for (var j = 0; j < noGroup.children.length; j++) {
                    var intersections = noGroup.children[j].getIntersections(yesGroup.children[i]);
                    intersections.forEach(function (intersection) {
                        var intersectionPoint = new paper.Path.Circle({
                            center: intersection.point,
                            radius: 5,
                            fillColor: '#009dec',
                            data: { createdDuringMove: true }  // Marcar la intersección
                        }).removeOnMove();
                    });
                }
            }
        }
    };
    window.addEventListener('resize', function () {
        var canvas = document.getElementById('myCanvas');
        canvas.width = window.innerWidth;
        // Mantiene la altura fija como antes
        paper.view.setViewSize(canvas.width, 750); // Usa siempre la altura fija
        adjustContentPosition(); // Reajusta el contenido inmediatamente
        updateMousePosition(); // Función hipotética para actualizar posiciones basadas en el último punto del mouse conocido
    });

    function adjustContentPosition() {
        var words = paper.project.activeLayer;
        var maxSVGWidth = 1400;
        var viewportScale = paper.view.bounds.width / words.bounds.width;
        var maxScale = maxSVGWidth / words.bounds.width;
        var scale = Math.min(viewportScale, maxScale) * 0.9;
        words.scale(scale / words.scaling.x);
        words.position.x = paper.view.center.x;

        // Ajusta la posición y como antes
        var desiredYesY = 375;
        yesGroup.position.y = desiredYesY;

        // Asegúrate de que cualquier ajuste de posición que dependa del mouse también se actualice
        triggerMouseBasedAdjustments();
    }

    function triggerMouseBasedAdjustments() {
        // Asume que tienes alguna lógica que necesitas ejecutar que normalmente se dispara con eventos del mouse
        // Esta función debería simular o invocar esas actualizaciones como si se hubiera movido el mouse
        if (lastKnownMousePosition.x !== undefined && lastKnownMousePosition.y !== undefined) {
            // Simula un evento mousemove si es necesario
            var fakeEvent = {
                clientX: lastKnownMousePosition.x,
                clientY: lastKnownMousePosition.y
            };
            handleMouseMove(fakeEvent); // Esta debería ser tu función que maneja los movimientos del mouse
        }
    }


}
