if (document.readyState === 'complete') {
    initializePaperJS();
} else {
    document.addEventListener('DOMContentLoaded', initializePaperJS);
}

function initializePaperJS() {
    var canvas = document.getElementById('myCanvas');
    paper.setup(canvas);

    function resizeCanvas() {
        var rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = 650;
        paper.view.setViewSize(canvas.width, canvas.height);
        adjustContent();
    }

    function adjustContent() {
        var words = paper.project.getItem({ className: 'Group' });
        if (words) {
            adjustScaling(words);
        }
    }

    function adjustScaling(words) {
        var maxSVGWidth = 1400;
        var viewportScale = paper.view.bounds.width / words.bounds.width;
        var maxScale = maxSVGWidth / words.bounds.width;
        var scale = Math.min(viewportScale, maxScale) * 0.9;
        words.scale(scale / words.scaling.x);
        words.position.x = paper.view.center.x;
        words.position.y = paper.view.center.y - 70;

        adjustStrokeWidth(words);
    }

    function adjustStrokeWidth(item) {
        item.children.forEach(function (child) {
            if (child instanceof paper.Path) {
                child.style = {
                    strokeWidth: 0.5,  // Ajusta este valor según la apariencia deseada
                    vectorEffect: 'non-scaling-stroke'  // Esto debería mantener el trazo constante
                };
            }
            if (child.hasChildren()) {
                adjustStrokeWidth(child);
            }
        });
    }

    paper.project.importSVG(document.getElementById('intersect2'), {
        expandShapes: true,
        onLoad: function (item) {
            item.visible = true;
            adjustContent();  // Reajuste inicial
        }
    });

    window.addEventListener('resize', resizeCanvas);

    var tool = new paper.Tool();
    tool.onMouseMove = function (event) {
        var noGroup = paper.project.getItem({ name: 'no' });
        if (noGroup && event.point.y < paper.view.size.height * 0.75 && event.point.y > paper.view.size.height * 0.25) {
            noGroup.position = event.point;
            updateIntersections(noGroup);
        }
    };

    function updateIntersections(noGroup) {
        var yesGroup = paper.project.getItem({ name: 'yes' });
        if (noGroup && yesGroup) {
            noGroup.children.forEach(function (noChild) {
                yesGroup.children.forEach(function (yesChild) {
                    var intersections = noChild.getIntersections(yesChild);
                    intersections.forEach(function (intersection) {
                        new paper.Path.Circle({
                            center: intersection.point,
                            radius: 5,
                            fillColor: '#009dec'
                        }).removeOnMove();
                    });
                });
            });
        }
    }
}
