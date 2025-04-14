function main() {
    var elements = document.querySelectorAll('.movable-element');

    elements.forEach(function (element) {
        var posX = 0, posY = 0, lastPosX = 0, lastPosY = 0;

        var hammer = new Hammer(element);

        element.ondragstart = function () { return false; };

        hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        hammer.on('pan', function (ev) {
            if (ev.isFinal) {
                lastPosX += ev.deltaX;
                lastPosY += ev.deltaY;
            } else {
                posX = lastPosX + ev.deltaX;
                posY = lastPosY + ev.deltaY;
                element.style.transform = `translate(${posX}px, ${posY}px)`;
            }
        });
    });
}


if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
