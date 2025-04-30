<?php
$host = 'localhost';
$dbname = 'nome_do_banco';
$user = 'usuario';
$password = 'senha';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
} catch (PDOException $e) {
  die("Erro de conexão: " . $e->getMessage());
}
?>
