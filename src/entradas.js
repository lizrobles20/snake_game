import { ESTADOS } from "/src/funciones.js";
export default class Entradas {
  constructor(juego) {
    this.ptsJuego = juego;
    this.ptsDx = true;
    this.ptsDy = true;
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        //Se presiona Enter
        case 13:
          if (this.ptsJuego.ptsEstado === ESTADOS.MENU) {
            juego.mostrarTabla();
          }
          break;
        //Se presiona ESC
        case 27:
          juego.iniciar();
          break;
        //Presiona tecla izquierda
        case 37:
          if (this.ptsDy) {
            juego.ptsSerpiente.izquierda();
            this.ptsDy = false;
            this.ptsDx = true;
          }
          break;
        //Presiona tecla Arriba
        case 38:
          if (this.ptsDx) {
            juego.ptsSerpiente.arriba();
            this.ptsDy = true;
            this.ptsDx = false;
          }
          break;
        //Presiona tecla derecha
        case 39:
          if (this.ptsDy) {
            juego.ptsSerpiente.derecha();
            this.ptsDy = false;
            this.ptsDx = true;
          }
          break;
        //Presiona tecla Abajo
        case 40:
          if (this.ptsDx) {
            juego.ptsSerpiente.abajo();
            this.ptsDy = true;
            this.ptsDx = false;
          }
          break;
        
        default:
          break;
      }
    });
  }
}
