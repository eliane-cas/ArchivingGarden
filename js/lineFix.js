function adjustLine() {
    const svgWidth = document.getElementById('mySvg').clientWidth;
    const line = document.getElementById('myLine');
    line.setAttribute('x2', svgWidth - 61.08);

    const line2 = document.getElementById('otherLine');
    line2.setAttribute('x1', svgWidth - 61.08);
    line2.setAttribute('x2', svgWidth - 61.08);




}



// Adjust the line on initial load and on window resize
window.onload = adjustLine;
window.onresize = adjustLine;