<?php
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Only POST requests are allowed."]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);
$message = trim($input["message"] ?? "");

if ($message === "") {
    http_response_code(400);
    echo json_encode(["error" => "Message is required."]);
    exit;
}

$apiKey = getenv("GEMINI_API_KEY");

if (!$apiKey) {
    http_response_code(500);
    echo json_encode([
        "error" => "Gemini API key is missing. Set GEMINI_API_KEY in your server environment."
    ]);
    exit;
}

$prompt = <<<PROMPT
You are Cryovix Fixify AI Assistant.

Answer like a helpful customer support assistant for this home appliance repair company.
Keep answers short, clear, and service-focused.

Company: Cryovix Fixify
Services: AC repair, AC installation, gas charging, washing machine repair, refrigerator repair, microwave repair, electrical help, plumbing help.
Phone: 9639378890
Email: cryovixcoolingsystem@gmail.com

User question:
{$message}
PROMPT;

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" . urlencode($apiKey);

$payload = [
    "contents" => [
        [
            "parts" => [
                ["text" => $prompt]
            ]
        ]
    ]
];

$requestBody = json_encode($payload);
$statusCode = 0;

if (function_exists("curl_init")) {
    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
        CURLOPT_POSTFIELDS => $requestBody,
        CURLOPT_TIMEOUT => 30
    ]);

    $response = curl_exec($ch);
    $requestError = curl_error($ch);
    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);
} else {
    $context = stream_context_create([
        "http" => [
            "method" => "POST",
            "header" => "Content-Type: application/json\r\n",
            "content" => $requestBody,
            "timeout" => 30,
            "ignore_errors" => true
        ]
    ]);

    $response = file_get_contents($url, false, $context);
    $requestError = $response === false ? "HTTP request failed." : "";

    $responseHeaders = function_exists("http_get_last_response_headers")
        ? http_get_last_response_headers()
        : ($http_response_header ?? []);

    if (isset($responseHeaders[0]) && preg_match("/\\s(\\d{3})\\s/", $responseHeaders[0], $matches)) {
        $statusCode = (int) $matches[1];
    }
}

if ($response === false) {
    http_response_code(502);
    echo json_encode(["error" => "AI request failed: " . $requestError]);
    exit;
}

$data = json_decode($response, true);

if ($statusCode >= 400) {
    http_response_code($statusCode);
    echo json_encode([
        "error" => $data["error"]["message"] ?? "AI service returned an error."
    ]);
    exit;
}

$reply = $data["candidates"][0]["content"]["parts"][0]["text"] ?? "";

if ($reply === "") {
    http_response_code(502);
    echo json_encode(["error" => "AI response was empty."]);
    exit;
}

echo json_encode(["reply" => $reply]);
