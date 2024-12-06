<?php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',  // main frontend
        'http://localhost:5000',  // admin page
    ],
    'allowed_headers' => ['Content-Type', 'Authorization'],
    'exposed_headers' => ['Authorization'],
    'max_age' => 0,
    'supports_credentials' => true,
];
