

if (document.readyState === 'complete') {
    initializePaperJS();
} else {
    document.addEventListener('DOMContentLoaded', initializePaperJS);
}
function initializePaperJS() {

    paper.setup('myCanvas');
    let canvas = document.querySelector('#myCanvas');
    var words = paper.project.importSVG(document.getElementById('intersect'), {
        expandShapes: true,
    });

    words.visible = true;

    var yesGroup = words.children.yes;
    var noGroup = words.children.no;

    yesGroup.children.forEach(function (child) {
        child.fillColor = null;
        child.strokeColor = 'black';
    });
    noGroup.children.forEach(function (child) {
        child.fillColor = null;
        child.strokeColor = 'black';
    });

    words.scale(0.9);

    var desiredYesY = 400;
    yesGroup.position = new paper.Point(paper.view.center.x, desiredYesY);

    var initialRelativeX = 0.5;
    var fixedNoY = 275;
    var initialX = paper.view.bounds.width * initialRelativeX;
    noGroup.position = new paper.Point(initialX, fixedNoY);



    var tool = new paper.Tool();
    var lastKnownMousePosition = { x: 0, y: 0 };


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

            moveSVGToMousePosition(relativeX, relativeY);
        }
    });


    function removeAllIntersectionsCreatedDuringMove() {
        paper.project.activeLayer.children.forEach(function (item) {
            if (item.data.createdDuringMove) {
                item.remove();
            }
        });
    }

    function moveSVGToMousePosition(x, y) {
        var noGroup = paper.project.getItem({ name: 'no' });
        if (noGroup) {
            var minY = paper.view.size.height * 0.30;
            var maxY = paper.view.size.height * 0.75;

            if (y < minY) y = minY;
            else if (y > maxY) y = maxY;

            noGroup.position = new paper.Point(x, y);
        }
    }



    tool.onMouseMove = function (event) {
        if (event.point.y < paper.view.size.height * 0.75 && event.point.y > paper.view.size.height * 0.30) {
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


    function showIntersections(path1, path2) {
        if ((path1 instanceof paper.Path || path1 instanceof paper.CompoundPath) && (path2 instanceof paper.Path || path2 instanceof paper.CompoundPath)) {
            var intersections = path1.getIntersections(path2);
            for (var i = 0; i < intersections.length; i++) {
                new paper.Path.Circle({
                    center: intersections[i].point,
                    radius: 5,
                    fillColor: '#009dec'
                }).removeOnMove();
            }
        }
    }
}

