<?php
require 'db.php';

$codigo = $_GET['codigo'];

$sql = "SELECT * FROM processos WHERE codigo_acesso = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$codigo]);

$result = $stmt->fetch(PDO::FETCH_ASSOC);
echo json_encode($result);
?>
