const table = document.getElementById('param_tab');
const form = document.getElementById('form');
const error_div = document.getElementById('error')

const xhr = new XMLHttpRequest();
xhr.open('GET', 'php/table_results.php', true);
xhr.setRequestHeader('Content-type', 'application/json');
xhr.onload = function () {
    if (xhr.status === 200) {
        const savedResults = JSON.parse(xhr.responseText);
        // Отобразите сохраненные результаты в таблице
        savedResults.forEach(result => {
            const currentTime = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
            const content = `<tr>
                                <td>${result.x}</td>
                                <td>${result.y}</td>
                                <td>${result.R}</td>
                                <td>${result.hitResult}</td>
                                <td>${result.exectime}</td>
                                <td>${currentTime}</td>
                            </tr>`

            table.innerHTML += content;
        });
    }
};

xhr.send();

document.getElementById("clear_but").addEventListener("click", function () {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/clear_tab.php", true);
    xhr.send();
    table.innerHTML = `<th>Координата X</th>
                        <th>Координата Y</th>
                        <th>Величина радиуса</th>
                        <th>Попадание в область</th>
                        <th>Время работы php-скрипта</th>
                        <th>Текущее время</th>`
});

function showError(message, delay){
    error_div.innerText = message;

    setTimeout(function() {
        error_div.innerText = "";

    }, delay);
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const x = formData.get('coo_x');
    const y = formData.get('coo_y');
    const R = formData.get('radius');

    console.log(x, y, R);
    
    
    if (isNaN(x) || isNaN(y) || isNaN(R)) {
        showError("Values must be numeric", 3000);
        return;
    }
    if (-3 >= x || x >= 5) {
        showError("X value must be greater than -3 and less than 5", 3000);
        return;
    }
    if (-3 >= y || y >= 5) {
        showError("Y value must be greater than -3 and less than 5", 3000);
        return;
    }
    else {
        fetch('php/script.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                const currentTime = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
                const content = `<tr>
                                <td>${result.x}</td>
                                <td>${result.y}</td>
                                <td>${result.R}</td>
                                <td>${result.hitResult}</td>
                                <td>${result.exectime}</td>
                                <td>${currentTime}</td>
                            </tr>`

                table.innerHTML += content;
            })
    } 
})



    