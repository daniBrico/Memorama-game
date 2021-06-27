const d = document;

const mostrarCartas = () => {
  const tarjetas = d.querySelectorAll(".area-tarjeta");

  tarjetas.forEach((e) => {
    e.style.transform = "rotatey(180deg)"
  });

  setTimeout(() => {
    tarjetas.forEach((e) => {
      e.style.transform = "rotatey(0deg)"
    });
  }, 3000);
}

const mezclarCartas = () => {

}

d.addEventListener("click", (e) => {
  if (e.target.matches("#btn-comenzar-juego")) {
    mostrarCartas();
  }
});