const d = document;
let tarjetaUno = 0, tarjetaDos = 0, contador = 0;

const mostrarCartas = () => {
  const tarjetas = d.querySelectorAll(".area-tarjeta");

  tarjetas.forEach((e) => {
    e.style.transform = "rotatey(180deg)"
  });

  setTimeout(() => {
    tarjetas.forEach((e) => {
      e.style.transform = "rotatey(0deg)"
    });
  }, 1000);
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

d.addEventListener("click", (e) => {
  if (e.target.matches("#btn-comenzar-juego")) {
    mezclarCartas();
    mostrarCartas();
    e.target.disabled = true;
  }

  if (e.target.matches(".trasera") || e.target.matches(".trasera *")) {
    let $trasera = e.target;

    if (!(e.target.matches(".trasera"))) {
      $trasera = e.target.parentNode;
    }

    $trasera.classList.add("rotar");
    d.getElementById($trasera.dataset.id).classList.add("rotarCero");
  }
});