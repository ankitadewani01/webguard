<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Retrieve domain from POST request
$domain = isset($_POST['domain']) ? $_POST['domain'] : '';

if (!empty($domain)) {
    try {
        // Your backend logic here...

        // For demonstration purposes, let's assume the website is legitimate
        $response = array("isFake" => false, "reason" => "Website appears to be legitimate");
    } catch (Exception $e) {
        $response = array("isFake" => true, "reason" => "Error: " . $e->getMessage());
    }
} else {
    $response = array("isFake" => true, "reason" => "Domain not provided");
}

echo json_encode($response);
?>
