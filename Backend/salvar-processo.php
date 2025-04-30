<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$nome = $data['nome_cliente'];
$etapa1 = $data['etapa_1'];
$etapa2 = $data['etapa_2'];
$etapa3 = $data['etapa_3'];
$codigo = uniqid(); // gera link único

$sql = "INSERT INTO processos (nome_cliente, etapa_1, etapa_2, etapa_3, codigo_acesso)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $pdo->prepare($sql);
$stmt->execute([$nome, $etapa1, $etapa2, $etapa3, $codigo]);

echo json_encode(["codigo" => $codigo]);
?>
