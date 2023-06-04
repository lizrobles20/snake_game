export const ESTADOS = {
  PAUSADO: 0,
  CORRIENDO: 1,
  MENU: 2,
  GAMEOVER: 3,
  PUNTUACIONES: 4
};
export const ESTADOSERPIENTE = {
  REPOSO: 0,
  ARRIBA: 1,
  ABAJO: 2,
  IZQ: 3,
  DER: 4
};
export function colisionSerpienteComida(c, s) {
  return (
    c.ptsPosicion.x + c.ptsW >= s.ptsPosicion.x &&
    c.ptsPosicion.x <= s.ptsPosicion.x + s.ptsW &&
    c.ptsPosicion.y - c.ptsH <= s.ptsPosicion.y &&
    c.ptsPosicion.y + c.ptsH >= s.ptsPosicion.y
  );
}
export function sound(src, loop) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  if (loop) this.sound.setAttribute("loop", true);
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  };
  this.stop = function() {
    this.sound.pause();
  };
}
