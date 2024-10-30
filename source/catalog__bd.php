
<?php
//Сделал возможность поиска по status, priceTo, oldPrice
//Уссловие для name чтобы строка была равна formal (покажет 1 элемент)
//Уссловие для priceTo чтобы число было больше или равно чем число в БД
//Уссловие для oldPrice чтобы число было равно числу в БД
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli("localhost", "Rubsee", "C3P5BAGxaKRNzxu");

if ($conn->connect_error) {
    die("Ошибка: " . $conn->connect_error);
}

$query = 'SELECT * FROM `Rubsee` . `catalog` WHERE 1=1';

$conditions = [];

if ($_GET) {
    if (!empty($_GET['name'])) {
        $name = $conn->real_escape_string($_GET['name']);
        $conditions[] = "name LIKE '%$name%'";
    }
    if (!empty($_GET['priceTo'])) {
        $price_to = intval($_GET['priceTo']);
        $conditions[] = "price <= $price_to";
    }
    if (!empty($_GET['oldPrice'])) {
        $old_price = intval($_GET['oldPrice']);
        $conditions[] = "oldPrice = $old_price";
    }
    if (!empty($_GET['status'])) {
        $status = $conn->real_escape_string($_GET['status']);
        $conditions[] = "status LIKE '%$status%'";
    }
}


if (!empty($conditions)) { //тут проверяю не пустой ли массив запросов
    $query .= ' AND ' . implode(' AND ', $conditions); //конкатенирует основной запрос с массивом запросов $conditions
}

$result = mysqli_query($conn, $query);

if (!$result) {  // Если запрос не удался
    die("Ошибка в запросе: " . $conn->error);  // Вывести ошибку
}

$my_data = '[';
while ($arr = mysqli_fetch_assoc($result)) {
    $my_data .= '{"id":' . $arr['id'] . ',"isBig":' . $arr['isBig'] . '},';
}
// $my_data = substr($my_data, 0, -1);
$my_data = rtrim($my_data, ',');
$my_data .= ']';

echo $my_data;

$conn->close();
?>