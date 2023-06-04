import Juego from "/src/juego.js";
let canvas = document.getElementById("pantalla");
let ctx = canvas.getContext("2d");
const ptsAncho = 500,
  ptsAlto = 500;
let juego = new Juego(ctx, ptsAncho, ptsAlto);

function cicloDelJuego() {
  ctx.clearRect(0, 0, ptsAncho, ptsAlto);
  juego.dibujar();
  juego.actualizar();
  requestAnimationFrame(cicloDelJuego);
}
cicloDelJuego();
