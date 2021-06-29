const d = document;
let $tarjetaUno = null, $tarjetaDos = null, contadorCoincidencias = 0, temporizador;

const mostrarCartas = () => {
  const $tarjetas = d.querySelectorAll(".area-tarjeta");

  $tarjetas.forEach((e) => {
    if (e.classList.contains("rotarCero")) {
      e.classList.remove("rotarCero");
    }
    e.classList.add("rotar");
  });

  setTimeout(() => {
    $tarjetas.forEach((e) => {
      e.classList.remove("rotar");
      e.classList.add("rotarCero");
    });
  }, 3000);
}

const mezclarCartas = () => {
  const iconos = [
    `<i data-numero="1" class="fas fa-bahai"></i>`,
    `<i data-numero="2" class="far fa-hand-spock"></i>`,
    `<i data-numero="3" class="fas fa-meteor"></i>`,
    `<i data-numero="4" class="fas fa-angry"></i>`,
    `<i data-numero="5" class="fas fa-atom"></i>`,
    `<i data-numero="6" class="fas fa-basketball-ball"></i>`,
    `<i data-numero="7" class="fas fa-bicycle"></i>`,
    `<i data-numero="8" class="fas fa-book-dead"></i>`,
    `<i data-numero="9" class="fas fa-chess-knight"></i>`,
    `<i data-numero="10" class="fas fa-lemon"></i>`,
    `<i data-numero="11" class="fas fa-dog"></i>`,
    `<i data-numero="12" class="fas fa-hotdog"></i>`,
    `<i data-numero="1" class="fas fa-bahai"></i>`,
    `<i data-numero="2" class="far fa-hand-spock"></i>`,
    `<i data-numero="3" class="fas fa-meteor"></i>`,
    `<i data-numero="4" class="fas fa-angry"></i>`,
    `<i data-numero="5" class="fas fa-atom"></i>`,
    `<i data-numero="6" class="fas fa-basketball-ball"></i>`,
    `<i data-numero="7" class="fas fa-bicycle"></i>`,
    `<i data-numero="8" class="fas fa-book-dead"></i>`,
    `<i data-numero="9" class="fas fa-chess-knight"></i>`,
    `<i data-numero="10" class="fas fa-lemon"></i>`,
    `<i data-numero="11" class="fas fa-dog"></i>`,
    `<i data-numero="12" class="fas fa-hotdog"></i>`,
  ];

  iconos.sort(() => Math.random() - 0.5);

  insertarIconos(iconos);
}

const insertarIconos = (iconos) => {
  const caraDelantera = d.querySelectorAll(".delantera");
  let i = 0;

  caraDelantera.forEach((e) => {
    e.insertAdjacentHTML("afterbegin", iconos[i]);
    i++;
  });
}

const verificarCoincidencia = () => {
  let numeroTarjetaUno = $tarjetaUno.childNodes[3].firstChild.dataset.numero,
    numeroTarjetaDos = $tarjetaDos.childNodes[3].firstChild.dataset.numero;

  deshabilitarClic(true);

  if (numeroTarjetaUno !== numeroTarjetaDos) {
    setTimeout(() => {
      $tarjetaUno.classList.remove("rotar");
      $tarjetaUno.classList.add("rotarCero");

      $tarjetaDos.classList.remove("rotar");
      $tarjetaDos.classList.add("rotarCero");
      deshabilitarClic(false);
    }, 600);
  } else {
    contadorCoincidencias = contadorCoincidencias + 2;
    deshabilitarClic(false);
  }
}

const deshabilitarClic = (deshabilitar) => {
  const todasAreaTarjetas = d.querySelectorAll(".area-tarjeta");

  if (deshabilitar) {
    todasAreaTarjetas.forEach((e) => {
      e.classList.add("deshabilitarClick");
    });
  } else {
    todasAreaTarjetas.forEach((e) => {
      e.classList.remove("deshabilitarClick");
    });
  }
}

const iniciarReloj = () => {
  let contadorSegundos = 0, contadorMinutos = 0;
  const $reloj = d.getElementById("reloj");

  temporizador = setInterval(() => {
    if (contadorSegundos === '60') {
      contadorSegundos = 0;
      contadorMinutos++;
      contadorMinutos = contadorMinutos;

      if (contadorMinutos === 60) {
        contadorMinutos = 0;
      }
    }

    contadorSegundos++;


    contadorSegundos = ("0" + contadorSegundos).slice(-2);

    $reloj.innerHTML = `
    <p class="reloj">
      <span>${contadorMinutos}</span>:<span>${contadorSegundos}</span>
    </p>`

  }, 1000);
}

const vaciarCartas = () => {
  const $tarjetas = d.querySelectorAll(".area-tarjeta");
  let nodoPadre;

  $tarjetas.forEach((e) => {
    nodoPadre = e.childNodes[3];
    nodoPadre.removeChild(nodoPadre.firstChild);
  });
}

const ganador = () => {
  const $tiempo = d.getElementById("tiempo"),
    $reloj = d.getElementById("reloj"),
    $modalContainer = d.querySelector(".modal-container");

  setTimeout(() => {
    $tiempo.innerHTML = $reloj.innerHTML;
    $modalContainer.classList.add("modal-open");
  }, 1000);
}

d.addEventListener("click", (e) => {
  if (e.target.matches("#btn-comenzar-juego")) {
    mezclarCartas();
    mostrarCartas();
    e.target.disabled = true;
    e.target.classList.add("btn-jugar-deshabilitar");
    deshabilitarClic(false);
    iniciarReloj();
  }

  if (e.target.matches("#volver-jugar")) {
    const $modalContainer = d.querySelector(".modal-container"),
      $tarjetas = d.querySelectorAll(".area-tarjeta"),
      $reloj = d.getElementById("reloj");

    $reloj.removeChild($reloj.firstChild);

    $modalContainer.classList.remove("modal-open");
    $modalContainer.classList.add("moda-closed");

    contadorCoincidencias = 0;

    $tarjetaUno = null;
    $tarjetaDos = null;

    $tarjetas.forEach((e) => {
      e.classList.remove("rotar");
      e.classList.add("rotarCero");
    });
    vaciarCartas();
    mezclarCartas();
    setTimeout(() => {
      mostrarCartas();
    }, 2000);
    iniciarReloj();
  }

  if (e.target.matches(".trasera") || e.target.matches(".trasera *")) {
    let $areaTarjeta;

    if (($tarjetaUno != null) && ($tarjetaDos != null)) {
      $tarjetaUno = null;
      $tarjetaDos = null;
    }

    if (e.target.matches(".trasera")) {
      $areaTarjeta = e.target.parentNode;
    } else {
      $areaTarjeta = e.target.parentNode.parentNode;
    }

    $areaTarjeta.classList.remove("rotarCero");
    $areaTarjeta.classList.add("rotar");

    if ($tarjetaUno === null) {
      $tarjetaUno = $areaTarjeta;
    } else {
      $tarjetaDos = $areaTarjeta;
      verificarCoincidencia();
    }

    if (contadorCoincidencias === 24) {
      clearInterval(temporizador);
      ganador();
    }
  }
});

d.addEventListener("DOMContentLoaded", deshabilitarClic(true));