<?php
//Iniciar la sesión y comprobar permisos CUANDO SEA NECEARIO
include 'tools.php';

if ((isset($_GET['email'])) && (isset($_GET['nick'])) && (isset($_GET['puntos']))) {
    $email = $_GET['email'];
    $nick = $_GET['nick'];
    $puntos = $_GET['puntos'];
    $c = new tools;

    $sql = "INSERT INTO PUNTUACION (email, nick, puntos) values ( '" . $email .  "', '" .  $nick . "', '" . $puntos . "')"; 
    
    if( $c->ejecutarComando($sql) ){
        echo "Se agregaron los datos";
    } else {
        echo "Fallo en la inserción";
    }

} else {
    echo "No son los valores necesarios";
}
