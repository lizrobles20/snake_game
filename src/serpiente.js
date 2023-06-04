import { ESTADOSERPIENTE } from "/src/funciones.js";
export default class Serpiente {
  constructor(x, y, w, h, juego) {
    this.ptsJuego = juego;
    this.ptsPosicion = {
      x: x,
      y: y
    };
    this.ptsW = w;
    this.ptsH = h;
    this.ptsVelocidadMaxima = 2;
    this.ptsEstado = ESTADOSERPIENTE.IZQ;
    this.ptsIncremento = [];
    this.ptsCola = 0;
    this.ptsColor = "green";
  }
  
  cambioColor() {
    if (this.ptsJuego.ptsScore === 20) this.ptsColor = "pink";
    if (this.ptsJuego.ptsScore === 40) this.ptsColor = "blue";
    if (this.ptsJuego.ptsScore === 60) this.ptsColor = "yellow";
    if (this.ptsJuego.ptsScore === 100) this.ptsColor = "red";
    if (this.ptsJuego.ptsScore === 150) this.ptsColor = "white";
    if (this.ptsJuego.ptsScore === 200) this.ptsColor = "purple";
    if (this.ptsJuego.ptsScore === 300) this.ptsColor = "grey";
    if (this.ptsJuego.ptsScore === 400) this.ptsColor = "orange";
  }
  dibujar() {
    this.crearSerpiente(
      this.ptsJuego.ptsCtx,
      this.ptsPosicion.x,
      this.ptsPosicion.y,
      this.ptsW,
      this.ptsH,
      this.ptsColor
    );
  }
  actualizar() {
    for (let i = 0; i < this.ptsIncremento.length; i++)
      if (
        this.ptsPosicion.x === this.ptsIncremento[i].x &&
        this.ptsPosicion.y === this.ptsIncremento[i].y
      ) {
        this.ptsJuego.gameOver();
        this.ptsPosicion.x = this.ptsJuego.ptsW;
        this.ptsPosicion.y = this.ptsJuego.ptsH;
      }
    for (let j = 0; j < this.ptsIncremento.length - 1; j++)
      this.ptsIncremento[j] = this.ptsIncremento[j + 1];
    this.ptsIncremento[this.ptsCola - 1] = {
      x: this.ptsPosicion.x,
      y: this.ptsPosicion.y
    };

    if (
      this.ptsPosicion.y + this.ptsH >= this.ptsJuego.ptsH ||
      this.ptsPosicion.y <= 1 ||
      this.ptsPosicion.x + this.ptsW >= this.ptsJuego.ptsW ||
      this.ptsPosicion.x <= 1
    ) {
      this.ptsJuego.gameOver();
      this.ptsIncremento = [0];
    }

    this.cambioColor();

    if (this.ptsEstado === ESTADOSERPIENTE.ARRIBA) this.arriba();
    if (this.ptsEstado === ESTADOSERPIENTE.ABAJO) this.abajo();
    if (this.ptsEstado === ESTADOSERPIENTE.IZQ) this.izquierda();
    if (this.ptsEstado === ESTADOSERPIENTE.DER) this.derecha();
  }

  crearSerpiente(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    for (let i = 0; i < this.ptsIncremento.length; i++) {
      ctx.fillRect(this.ptsIncremento[i].x, this.ptsIncremento[i].y, w, h);
    }
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }
  arriba() {
    this.ptsEstado = ESTADOSERPIENTE.ARRIBA;
    this.ptsPosicion.y -= this.ptsVelocidadMaxima;
  }
  abajo() {
    this.ptsEstado = ESTADOSERPIENTE.ABAJO;
    this.ptsPosicion.y += this.ptsVelocidadMaxima;
  }
  izquierda() {
    this.ptsEstado = ESTADOSERPIENTE.IZQ;
    this.ptsPosicion.x -= this.ptsVelocidadMaxima;
  }
  derecha() {
    this.ptsEstado = ESTADOSERPIENTE.DER;
    this.ptsPosicion.x += this.ptsVelocidadMaxima;
  }
}
