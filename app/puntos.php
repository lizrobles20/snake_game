<?php
include 'tools.php';
$c = new tools;

if($c->ejecutarComando("INSERT INTO puntuacion (email, nick, puntos) VALUES('lizirobles20@gmail.com', 'lizirobles', '30000')")){
    echo "Todo se guardó correctamente";
} else {
    echo "Upps parece que hay errores.";
}

