import { ESTADOS } from "/src/funciones.js";
export default class Menu {
  constructor(juego) {
    this.ptsJuego = juego;
    this.ptsW = this.ptsJuego.ptsW / 4;
    this.ptsH = this.ptsJuego.ptsH;
    this.ptsPosicion = {
      x: this.ptsW * 3,
      y: 0
    };
    this.ptsCentro = this.ptsW / 2;
    this.ptsFila = this.ptsH / 40;
    this.ptsTitulos = this.ptsH / 25;
    this.ptsTextos = this.ptsH / 45;
    this.ptsImagen1 = new Image();
    this.ptsImagen1.src = "../img/bg.png";
    this.ptsImagen2 = new Image();
    this.ptsImagen2.src = "../img/fondito.jpg";
    this.ptsImagen3 = new Image();
    this.ptsImagen3.src = "../img/teclitas.jpg";
    this.ptsImagen4 = new Image();
    this.ptsImagen4.src = "../img/pausita.png";
    this.ptsImagen5 = new Image();
    this.ptsImagen5.src = "../img/pausa.png";
    this.ptsImagen6 = new Image();
    this.ptsImagen6.src = "../img/gameover.png";
    this.ptsColorN = "green";
  }
  cambioColor() {
    if (this.ptsJuego.ptsScore === 20) this.ptsColorN = "pink";
    if (this.ptsJuego.ptsScore === 40) this.ptsColorN = "blue";
    if (this.ptsJuego.ptsScore === 60) this.ptsColorN = "yellow";
    if (this.ptsJuego.ptsScore === 100) this.ptsColorN = "red";
    if (this.ptsJuego.ptsScore === 150) this.ptsColorN = "white";
    if (this.ptsJuego.ptsScore === 200) this.ptsColorN = "purple";
    if (this.ptsJuego.ptsScore === 300) this.ptsColorN = "grey";
    if (this.ptsJuego.ptsScore === 400) this.ptsColorN = "orange";
  }
  dibujar() {
    switch (this.ptsJuego.ptsEstado) {
      case ESTADOS.PAUSADO:
        this.crearMenuPausa(
          this.ptsJuego.ptsCtx,
          0,
          0,
          this.ptsJuego.ptsW,
          this.ptsJuego.ptsH
        );
        break;
      case ESTADOS.CORRIENDO:
        this.crearMenuInter(
          this.ptsJuego.ptsCtx,
          0,
          0,
          this.ptsJuego.ptsW,
          this.ptsJuego.ptsH,
          this.ptsColorN
        );
        break;
      case ESTADOS.MENU:
        this.crearMenuInicio(
          this.ptsJuego.ptsCtx,
          0,
          0,
          this.ptsJuego.ptsW,
          this.ptsJuego.ptsH
        );
        break;
      case ESTADOS.GAMEOVER:
        this.crearMenuGameover(
          this.ptsJuego.ptsCtx,
          0,
          0,
          this.ptsJuego.ptsW,
          this.ptsJuego.ptsH
        );
        break;
      default:
        break;
    }
  }
  actualizar() {
    this.cambioColor();
  }
  crearMenuInicio(ctx, x, y, w, h) {
    ctx.drawImage(this.ptsImagen2, x, y, w, h);
    ctx.fill();
    ctx.drawImage(this.ptsImagen3, x + 235, y + 335, w - 300, h - 300);
    ctx.drawImage(this.ptsImagen4, x + 70, y + 380, w - 400, h - 400);
    ctx.font = this.ptsTitulos + "px Lucida Console";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("Controles", w / 1.5, h - 140);
    ctx.fillText("ESC para pausa", w / 4, h - 140);
    ctx.font = this.ptsTitulos + 25 + "px Copperplate Gothic Bold";
    ctx.textAlign = "center";
    ctx.fillStyle = "#d6d6d6";
    ctx.fillText("Snake Game", w / 2, h / 9);
    ctx.font = this.ptsTitulos + "px Lucida Console";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("Presiona ESC para iniciar", w / 2, h / 5.5);
    ctx.font = this.ptsTitulos -5 + "px Lucida Console";
    ctx.textAlign = "center";
    ctx.fillStyle = "#c7c7c7";
    ctx.fillText("Una serpiente queda atrapada en una cueva", w / 2, h / 4);
    ctx.fillText("sin salida. Hambrienta, busca comida a ", w / 2, h / 3.5);
    ctx.fillText("través de su camino. La cueva es oscura", w / 2, h / 3.1);
    ctx.fillText("y estrecha. Ayudala a encontrar su comida", w / 2, h / 2.8);
    ctx.fillText("e intentar que no se coma así misma.", w / 2, h / 2.55);
    ctx.fillText("Por alguna razón, todo aquel que intenta", w / 2, h / 2.35);
    ctx.fillText("tocar las paredes de la oscura cueva", w / 2, h / 2.18);
    ctx.fillText("podría morir al instante.", w / 2, h / 2.03);
    ctx.fillText("No dejes que muera y acompañala", w / 2, h / 1.7);
    ctx.fillText("en su delirio existencial.", w / 2, h / 1.6);
  }
  crearMenuPausa(ctx, x, y, w, h) {
    ctx.drawImage(this.ptsImagen5, x, y, w, h);
    ctx.font = this.ptsTitulos + 15 + "px Copperplate Gothic Bold";
    ctx.textAlign = "center";
    ctx.fillStyle = "#D6EAEA";
    ctx.fillText("PAUSA", w / 2, h / 2);
  }
  crearMenuGameover(ctx, x, y, w, h) {
    ctx.drawImage(this.ptsImagen6, x, y, w, h);
    ctx.font = this.ptsTitulos +15 + "px Copperplate Gothic Bold";
    ctx.textAlign = "center";
    ctx.fillStyle = "#cdc7d4";
    ctx.fillText("GAME OVER", w / 2, h / 4.5);
    ctx.font = this.ptsTitulos + 5 + "px Arial";
    ctx.fillText(
      "Presiona ESC para volver a intentarlo",
      w / 2,
      (h / 1.2)
    );
  }
  crearMenuInter(ctx, x, y, w, h, color) {
    ctx.drawImage(this.ptsImagen1, x, y, w, h);
    ctx.font = this.ptsTitulos + "px Impact";
    ctx.fillStyle = color;
    ctx.fillText(this.ptsJuego.ptsScore, w / 1.52, h / 24);
    ctx.fillText(this.ptsJuego.ptsVidas, w / 2.2, h / 24);
    ctx.font = this.ptsTitulos + 5 + "px Impact";
    ctx.fillText("Nivel " + this.ptsJuego.ptsNivel, w / 8.5, h - 15);
  }
}
