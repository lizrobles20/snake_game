import { colisionSerpienteComida, sound } from "/src/funciones.js";
export default class Comida {
  constructor(x, y, w, h, juego) {
    this.ptsJuego = juego;
    this.ptsImagen = new Image();
    this.ptsImagen.src = "../img/manzana.png";
    this.ptsPosicion = {
      x: x,
      y: y
    };
    this.ptsW = w + 12;
    this.ptsH = h + 12;
    this.ptsEnergia = 1000;
    this.comer = [];
    for (let a = 0; a <= 10; a++) {
      this.comer.push(new sound("../sound/Manzana.mp3", false));
    }
    this.comida = 0;
  }
  dibujar() {
    this.crearComida(
      this.ptsJuego.ptsCtx,
      this.ptsPosicion.x,
      this.ptsPosicion.y,
      this.ptsW,
      this.ptsH
    );
  }
  actualizar() {
    if (colisionSerpienteComida(this, this.ptsJuego.ptsSerpiente)) {
      this.ptsEnergia = 0;
      this.ptsJuego.ptsSerpiente.ptsCola++;
      this.comerComida();
    }
  }
  crearComida(ctx, x, y, w, h) {
    ctx.drawImage(this.ptsImagen, x, y, w, h);
    if (this.ptsEnergia === 1000) this.ptsEnergia = 1;
  }
  comerComida() {
    this.comer[this.comida].play();
    this.comida++;
    if (this.comida >= this.comer.length) this.comida = 0;
  }
}
