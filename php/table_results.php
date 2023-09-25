<?php
session_start();

// Проверка - существуют ли данные в сессии (не Null)
if (isset($_SESSION['results'])) {
    $savedResults = $_SESSION['results'];

} else {
    $savedResults = array(); // Если результатов нет, создаем пустой массив
}

// Отправляем сохраненные результаты в формате JSON
header('Content-type: application/json');
echo json_encode($savedResults);
?>