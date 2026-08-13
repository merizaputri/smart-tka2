<?php
// PHP Built-in Server Router for TKA Smart Exam
// Serves REST API via api.php, static assets, and Single Page Application (SPA) fallback

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// 1. Route /api requests to api.php
if (strpos($uri, '/api') === 0) {
    require __DIR__ . '/api.php';
    exit();
}

// 2. Serve static files directly if they exist
$filePath = __DIR__ . $uri;
if ($uri !== '/' && file_exists($filePath) && !is_dir($filePath)) {
    return false; // Let PHP built-in server serve the static file
}

// 3. Fallback for SPA routing to index.html
require __DIR__ . '/index.html';
