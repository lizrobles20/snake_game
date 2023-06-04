<?php

use iio\libmergepdf\Exception;

session_start();
include_once("config.php");
/**
 * Clase que contiene funciones útiles comunes 
 * 
 * @package  Space Invaders
 * @author   Dr. Jesús Adrián Sevilla Azuara <adrianevil@gmail.com>
 * @license  www.henet.mx, privado
 * @link     http://www.henet.mx
 *
 */
class tools
{
	/**
	 * Devuelve una instancia de la conexión a la base de datos
	 * @return type
	 */
	private function connectDB()
	{

		$conexion = mysqli_connect(RUTA, USER, PASS, DATABASELOCAL);
		if (!$conexion) {
			if (DEBUG) {
				echo "Error: No se pudo conectar a MySQL." . PHP_EOL . "</br>";
				echo "Error de depuración: " . mysqli_connect_errno() . PHP_EOL . "</br>";
				echo "Error de depuración: " . mysqli_connect_error() . PHP_EOL . "</br>";
				exit;
			}
		}

		mysqli_query($conexion, "SET NAMES 'utf8'");
		mysqli_set_charset($conexion, "utf8");
		return $conexion;
	}
	/**
	 * Desconecta la base de datos a partir de la instancia que le pasamos
	 * @param type $conexion
	 * @return type
	 */
	private function disconnectDB($conexion)
	{
		$close = mysqli_close($conexion);
		if (!$close) {
			//if(DEBUG)
			//echo 'Ha sucedido un error inexperado en la desconexion de la base de datos<br>';
		}
		return $close;
	}
	/**
	 * Ejecuta un comando SQL dentro de la base de datos
	 *
	 * @param [cadena] $instruccion Instrucción SQL
	 * @return mysqli_result|bool 
	 */
	public function ejecutarComando($instruccion)
	{
		$c = $this->connectDB();
		if (!$result = mysqli_query($c, $instruccion));
		$this->disconnectDB($c);
		return $result;
	}

	/**
	 * Obtenemos un array multidimensional a partir de una sentencia SQL de entrada
	 * @param String $sql Codigo SQL ejecutable en la base de datos
	 * @return array Arreglo de las filas y campos resultantes
	 */
	public function getArraySQL($sql)
	{
		//Creamos la conexió´n
		$conexion = $this->connectDB();
		//generamos la consulta
		if (!$result = mysqli_query($conexion, $sql)) die(mysqli_error($conexion));
		$rawdata = array();
		//guardamos en un array multidimensional todos los datos de la consulta
		$i = 0;
		while ($row = mysqli_fetch_array($result)) {
			$rawdata[$i] = $row;
			$i++;
		}
		$this->disconnectDB($conexion);
		return $rawdata;
	}

	/**
	 * Dibujamos en pantalla una tabla a partir de un array multidimensional de entrada
	 * @param type $comando Comando SQL a ejecutar
	 */
	function displayTable($comando)
	{
		$rawdata = $this->getArraySQL($comando);
		//DIBUJAMOS LA TABLA
		echo '<table class="table table-striped table-bordered table-condensed">';
		$columnas = count($rawdata[0]) / 2;
		//echo $columnas;
		$filas = count($rawdata);
		//echo "<br>".$filas."<br>";
		//Añadimos los titulos

		for ($i = 1; $i < count($rawdata[0]); $i = $i + 2) {
			next($rawdata[0]);
			echo "<th><b>" . key($rawdata[0]) . "</b></th>";
			next($rawdata[0]);
		}
		for ($i = 0; $i < $filas; $i++) {
			echo "<tr>";
			for ($j = 0; $j < $columnas; $j++) {
				echo "<td>" . $rawdata[$i][$j] . "</td>";
			}
			echo "</tr>";
		}
		echo '</table>';
	}
	/**
	 * Crea un mensaje de error
	 * @param $title Titulo del mensaje
	 * @param $message mensaje
	 */
	function mensajeDeError($title, $message)
	{
		return "
		<div class='row'>
			<div class='col-sm-4'>
			</div>
			<div class='col-sm-4'>
				<div class='page-header'>
					<h1> $title</h1>
				</div>
				<div class='alert alert-info'>
					 $message
				</div>
			</div>
			<div class='col-sm-4'>
			</div>
		</div>
		";
	}
}
