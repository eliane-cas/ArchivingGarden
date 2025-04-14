function enableVerticalDragScroll() {
    const container = document.querySelector('.draggable-container');
    let isDown = false;
    let startY;
    let scrollTop;

    if (!container) return;

    container.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;

        isDown = true;
        startY = e.pageY - container.offsetTop;
        scrollTop = container.scrollTop;
        container.classList.add('active');
        e.preventDefault();
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
        const walk = deltaY * 2;
        container.scrollTop = scrollTop - walk;
    });
}


if (document.readyState === 'complete') {
    enableVerticalDragScroll();
} else {
    document.addEventListener('DOMContentLoaded', enableVerticalDragScroll);
}
