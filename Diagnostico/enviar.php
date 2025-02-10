<?php
header("Content-Type: text/plain"); // Evita que devuelva HTML si se usa con AJAX

// Mostrar los datos recibidos
echo "<pre>";
print_r($_POST);
echo "</pre>";
$servername = "localhost";
$username   = "root";  
$password   = "";      
$dbname     = "formulariodb"; 

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}
$conn->set_charset("utf8");

if (!isset($_POST['Nombre'], $_POST['Apellido'], $_POST['Correo'], $_POST['queryType'], $_POST['Mensaje'])) {
    die("Error: faltan datos en el formulario.");
}

// Validar que los campos no estén vacíos
if (
    empty(trim($_POST['Nombre'])) ||
    empty(trim($_POST['Apellido'])) ||
    empty(trim($_POST['Correo'])) ||
    empty(trim($_POST['queryType'])) ||
    empty(trim($_POST['Mensaje']))
) {
    die("Error: Uno o más campos obligatorios están vacíos.");
}

$firstName  = $conn->real_escape_string(trim($_POST['Nombre']));
$lastName   = $conn->real_escape_string(trim($_POST['Apellido']));
$email      = $conn->real_escape_string(trim($_POST['Correo']));
$queryType  = $conn->real_escape_string(trim($_POST['queryType']));
$message    = $conn->real_escape_string(trim($_POST['Mensaje']));
$consent    = isset($_POST['consent']) ? 1 : 0;



$sql = "INSERT INTO formularioconsulta (firstName, lastName, email, TipoConsulta, message, consent)
        VALUES ('$firstName', '$lastName', '$email', '$queryType', '$message', $consent)";

if ($conn->query($sql) === TRUE) {
    echo "Datos insertados correctamente.";
} else {
    echo "Error al insertar en la base de datos: " . $conn->error;
}

$conn->close();
?>
