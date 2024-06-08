function adjustLine() {
    try {

        const svgWidth = document.getElementById('mySvg').clientWidth;
        const line = document.getElementById('myLine');
        line.setAttribute('x2', svgWidth - 61.08);

        const line2 = document.getElementById('otherLine');
        line2.setAttribute('x1', svgWidth - 61.08);
        line2.setAttribute('x2', svgWidth - 61.08);


        const svgWidth2 = document.getElementById('section3lines').clientWidth;

        const line3 = document.getElementById('line3');
        line3.setAttribute('x2', svgWidth2 - 41);


        const line5 = document.getElementById('line5');
        line5.setAttribute('x1', svgWidth2 - 41);
        line5.setAttribute('x2', svgWidth2 - 41);


        const line4 = document.getElementById('line4');
        line4.setAttribute('x2', svgWidth2 - 41);

    } catch {

    }

}



if (document.readyState === 'complete') {
    adjustLine();
}
window.onresize = adjustLine;