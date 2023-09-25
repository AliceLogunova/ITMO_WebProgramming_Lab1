<?php
    session_start();

    require "utils.php";
    
    $initial_time = microtime(true);
    $_SESSION['x'] = floatval(str_replace(',', '.', $_POST['coo_x']));
    $_SESSION['y'] = floatval(str_replace(',', '.', $_POST['coo_y']));
    $_SESSION['R'] = floatval(str_replace(',', '.', $_POST['radius']));
    
    if (validate($_SESSION['x'], $_SESSION['y'], $_SESSION['R'])) {
        $hitResult = dotHit($_SESSION['x'], $_SESSION['y'], $_SESSION['R']);
        $executionTime = $initial_time - $_SERVER['REQUEST_TIME'];
    
        $result = array(
            'x' => $_SESSION['x'],
            'y' => $_SESSION['y'],
            'R' => $_SESSION['R'],
            'hitResult' => $hitResult ? "True" : "False",
            'exectime' => $executionTime
        );
    
        $_SESSION['results'][] = $result;
    
        echo json_encode($result);
        http_response_code(201);
    } else {
        echo json_encode(array('hitResult' => "Incorrect data", 'execute time' => NULL));
        http_response_code(400);
    }