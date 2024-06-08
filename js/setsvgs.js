function main() {
    const section2 = document.getElementById('section2');

    var svgHTML1 = `
   <svg  width="100%" height="665" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; "
        id='mySvg'>
        <line id="otherLine" x1="1452.92" y1="0.506226" x2="1452.92" y2="19.5062" stroke="black" />
        <line x1="41.3419" y1="257.006" x2="83.8419" y2="257.006" stroke="black" />
        <line x1="83.8419" y1="257.006" x2="83.8419" y2="654.785" stroke="black" />
        <line x1="41.8419" y1="257.006" x2="41.8419" y2="10.0062" stroke="black" />
        <line id="myLine" x1="41.8419" y1="10.0062" x2="1452.34" y2="10.0062" stroke="black" />
        <line x1="103.3419" y1="645.284" x2="103.3419" y2="664.284" stroke="black" />
        <line x1="102.8419" y1="654.784" x2="83.8419" y2="654.784" stroke="black" />
    </svg>`;

    // Inserta el SVG justo antes del cierre del contenedor
    section2.insertAdjacentHTML('beforeend', svgHTML1);


    const section3 = document.getElementById('section3');

    var svgHTML2 = `
    <svg  id="section3lines" width="100%" height="804" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="127.5371" y1="793.861" x2="156" y2="793.861" stroke="black" />
        <line x1="127.6299" y1="794.361" x2="127.6299" y2="598.829" stroke="black" />
        <line x1="127.6299" y1="598.829" x2="42" y2="598.829" stroke="black" />
        <line x1="42" y1="598.829" x2="42" y2="94.4287" stroke="black" />
        <line id="line3" x1="42" y1="94.4287" x2="1472" y2="94.4287" stroke="black" />
        <line id="line5" x1="1472" y1="94.4287" x2="1472" y2="10.3613" stroke="black" />
        <line id="line4" x1="322.218" y1="10.3613" x2="1472" y2="10.3613" stroke="black" />
        <line x1="322.5" y1="0.361328" x2="322.5" y2="19.3613" stroke="black" />
        <line x1="156.5" y1="784.361" x2="156.5" y2="803.361" stroke="black" />
    </svg>`;

    section3.insertAdjacentHTML('beforeend', svgHTML2);

    const section5 = document.getElementById('section5');

    var svgHTML3 = `<svg id="lines3" width="1159" height="145" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Convertido del primer path con margen izquierdo añadido -->
  <line x1="64.42188" y1="21.3516" x2="64.42188" y2="65.3516" stroke="black"/>
  <line x1="64.42188" y1="65.3516" x2="534.422" y2="65.3516" stroke="black"/>

  <!-- Convertido del segundo path con margen izquierdo añadido -->
  <line id="l3-1" x1="535.422" y1="1.35156" x2="1158.42" y2="1.35156" stroke="black"/>
  <line x1="535.422" y1="1.35156" x2="535.422" y2="127.352" stroke="black"/>

  <!-- Convertido del tercer path con margen izquierdo añadido -->
  <line x1="594.422" y1="144.352" x2="615.922" y2="144.352" stroke="black"/>
</svg>


`;
    section5.insertAdjacentHTML('beforeend', svgHTML3);

    // Inserta el SVG justo antes del cierre del contenedor
}

if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
