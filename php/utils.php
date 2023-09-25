<?php
    function validate ($x, $y, $R) {
        if (-3 <= $x && $x <= 5 && -3 <= $y && $y <= 5 && $R >=1 && $R <= 3 && is_numeric($x) && is_numeric($y) && is_numeric($R)) {
            return true;
        }
        return false;
    }
    function dotHit ($x, $y, $R) {
        //проверка попадания в четверть круга в 1-ой четверти системы координат
        $equationOfCircle  = sqrt($x**2 + $y**2);
        if($equationOfCircle <= $R && $x >= 0 && $y >= 0){
            return true;
        }
        //проверка поадания точки в область прямоугольника во 2-ой четверти
        if ($x <= $R && $x >= 0 && $y <= 0 && $y >= -0.5 * $R) {
            return true;
        }
        //проверка поадания точки в область треугольника в 4-ой четверти
        if ($x >= -$R && $x <= 0 && $y >= 0 && $y <= 0.5*$R && $y <= 2 / $R * abs($x)) {
            return true;
        }
        return false;
    }
?>