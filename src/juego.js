import Serpiente from "/src/serpiente.js";
import Comida from "/src/comida.js";
import Entradas from "/src/entradas.js";
import { ESTADOS, sound, ESTADOSERPIENTE } from "/src/funciones.js";
import Menu from "/src/menu.js";
export default class Juego {
  constructor(ctx, w, h) {
    this.ptsW = w;
    this.ptsH = h;
    this.ptsCtx = ctx;
    this.ptsSerpiente = new Serpiente(
      this.ptsW / 2 - this.ptsW / 50,
      this.ptsH / 2 - this.ptsH / 50,
      this.ptsW / 29,
      this.ptsH / 29,
      this
    );
    this.ptsComida = new Comida(
      this.ptsW / 2 - this.ptsW / 5,
      this.ptsH / 2 - this.ptsH / 5,
      this.ptsW / 50,
      this.ptsH / 50,
      this
    );
    this.entrada = new Entradas(this);
    this.ptsFondo = new sound("../sound/elFondo.mp3", true);
    this.ptsEstado = ESTADOS.MENU;
    this.ptsMenu = new Menu(this);
    this.ptsVidas = 1;
    this.ptsScore = 0;
    this.ptsNivel = 1;
    this.enviarPuntuacion = true;
  }
  dibujar() {
    this.ptsMenu.dibujar();
    if (this.ptsEstado === ESTADOS.CORRIENDO) {
      this.ptsSerpiente.dibujar();
      if (this.ptsComida.ptsEnergia > 0) this.ptsComida.dibujar();
      else {
        this.ptsComida.ptsPosicion.x = Math.floor(
          Math.random() * (this.ptsW - 50)
        );
        this.ptsComida.ptsPosicion.y = Math.floor(
          Math.random() * (this.ptsH - 50)
        );
        this.ptsComida.ptsEnergia = 1000;
        this.ptsComida.dibujar();
        this.ptsScore = this.ptsScore + 2;
        if (
          this.ptsScore === 20 ||
          this.ptsScore === 40 ||
          this.ptsScore === 60 ||
          this.ptsScore === 100 ||
          this.ptsScore === 150 ||
          this.ptsScore === 200 ||
          this.ptsScore === 300 ||
          this.ptsScore === 400 
        ) {
          this.ptsSerpiente.ptsVelocidadMaxima+=1;
          this.ptsNivel++;
        }
      }
    }
  }
  actualizar() {
    if (this.ptsEstado === ESTADOS.CORRIENDO) {
      this.ptsSerpiente.actualizar();
      this.ptsComida.actualizar();
      this.ptsMenu.actualizar();
    }
    
  }
  iniciar() {
    if (this.ptsEstado === ESTADOS.MENU) {
      this.ptsEstado = ESTADOS.CORRIENDO;
      this.resetGame();
      return;
    }
    if (this.ptsEstado === ESTADOS.PAUSADO) {
      this.ptsEstado = ESTADOS.CORRIENDO;
      this.ptsFondo.play();
      return;
    }
    if (this.ptsEstado === ESTADOS.CORRIENDO) {
      this.ptsEstado = ESTADOS.PAUSADO;
      this.ptsFondo.stop();
    }
    if (this.ptsEstado === ESTADOS.GAMEOVER) {
      this.ptsEstado = ESTADOS.MENU;
    }

  }
  resetGame() {
    this.ptsFondo = new sound("../sound/elFondo.mp3", true);
    this.ptsFondo.play();
    this.ptsSerpiente.ptsCola = 0;
    this.ptsSerpiente.ptsPosicion.x = this.ptsW / 2 - this.ptsW / 50;
    this.ptsSerpiente.ptsPosicion.y = this.ptsW / 2 - this.ptsW / 50;
    this.ptsComida.ptsPosicion.x = this.ptsW / 2 - this.ptsW / 5;
    this.ptsComida.ptsPosicion.y = this.ptsH / 2 - this.ptsH / 5;
    this.entrada.ptsDx = true;
    this.entrada.ptsDy = true;
    this.ptsSerpiente.ptsEstado = ESTADOSERPIENTE.IZQ;
    this.ptsScore = 0;
    this.enviarPuntuacion = true;
    this.ptsSerpiente.ptsColor = "green";
    this.ptsSerpiente.ptsVelocidadMaxima = 2;
    this.ptsMenu.ptsColorN = "green";
  }
  
  gameOver() {
    this.ptsFondo.stop();
    this.ptsEstado = ESTADOS.GAMEOVER;
    if (this.ptsEstado === ESTADOS.GAMEOVER) {
      if (this.enviarPuntuacion) {
        this.guardarPuntuacion();
        this.enviarPuntuacion = false;
      }
    }
  }
 
  guardarPuntuacion() {
    console.log("Guardando la puntuación de: " + this.ptsScore);
    
    let body = '';
    let method = 'get'
    let url = 'app/nuevapuntuacion.php?email=lizirobles20@gmail.com&nick=' + document.getElementById("Nickname").value + '&puntos=' + this.ptsScore;

    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      };
      xhr.send(body);
    });

  }
}
