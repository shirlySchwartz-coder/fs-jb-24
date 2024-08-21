<?php

$products = [
    ["name" => "מוצר 1", "price" => 100],
    ["name" => "מוצר 2", "price" => 200],
    ["name" => "מוצר 3", "price" => 300],
    ["name" => "מוצר 4", "price" => 400],
    ["name" => "מוצר 5", "price" => 500],
];

$vat = 0.17;

foreach ($products as $product) {
    $priceWithVat = $product["price"] * (1 + $vat);
    echo "שם המוצר: " . $product["name"] . " עם מע"מ: " . number_format($priceWithVat, 2) . "<br>";
}
?>