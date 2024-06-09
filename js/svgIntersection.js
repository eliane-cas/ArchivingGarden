
paper.project.importSVG('/js/inter1.svg', function (svg) {
    setupSvg(svg, 'yes', 'no');
});

paper.project.importSVG('/js/inter2.svg', function (svg) {
    setupSvg(svg, 'yes', 'no');
});

function setupSvg(svg, yesId, noId) {
    svg.visible = true;
    svg.fillColor = null;
    svg.strokeColor = 'black';

    var yesGroup = svg.children[yesId];
    var noGroup = svg.children[noId];

    // Ajustar y posicionar el SVG
    svg.fitBounds(view.bounds);
    svg.scale(0.8);

    yesGroup.position = view.center;
    noGroup.position = new Point(-900, -900); // Inicialmente fuera de la vista

    // Manejar movimiento del mouse
    function onMouseMove(event) {
        noGroup.position = event.point;
        detectIntersections(yesGroup, noGroup);
    }

    function detectIntersections(group1, group2) {
        for (var i = 0; i < group1.children.length; i++) {
            for (var j = 0; j < group2.children.length; j++) {
                var intersections = group1.children[i].getIntersections(group2.children[j]);
                intersections.forEach(function (intersection) {
                    new Path.Circle({
                        center: intersection.point,
                        radius: 5,
                        fillColor: '#009dec'
                    }).removeOn({
                        move: true
                    });
                });
            }
        }
    }

    view.onMouseMove = onMouseMove;
}