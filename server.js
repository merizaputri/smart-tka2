// Universal Local Development Server for TKA Smart Exam (Node.js + PHP fallback)
// Supports localhost:3000, 127.0.0.1:3000 (IPv4 & IPv6), static SPA files, and PHP REST API execution.

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.mjs': 'application/javascript; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

function getPhpExecutable() {
    const xamppPath = 'C:\\xampp\\php\\php.exe';
    if (fs.existsSync(xamppPath)) return xamppPath;
    return 'php';
}

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = decodeURIComponent(parsedUrl.pathname);

    // Handle /api routes via PHP
    if (pathname.startsWith('/api')) {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const phpBin = getPhpExecutable();
            const env = {
                ...process.env,
                REQUEST_METHOD: req.method,
                REQUEST_URI: req.url,
                QUERY_STRING: parsedUrl.search.replace(/^\?/, ''),
                CONTENT_TYPE: req.headers['content-type'] || 'application/json',
                CONTENT_LENGTH: Buffer.byteLength(body).toString(),
                SCRIPT_FILENAME: path.join(ROOT_DIR, 'api.php')
            };

            const phpProc = spawn(phpBin, [path.join(ROOT_DIR, 'api.php')], {
                env,
                cwd: ROOT_DIR
            });

            let stdoutData = '';
            let stderrData = '';

            if (body) {
                phpProc.stdin.write(body);
            }
            phpProc.stdin.end();

            phpProc.stdout.on('data', data => { stdoutData += data; });
            phpProc.stderr.on('data', data => { stderrData += data; });

            phpProc.on('close', code => {
                // Separate headers and body if PHP output contains CGI headers
                const headerEndIndex = stdoutData.indexOf('\r\n\r\n');
                let responseBody = stdoutData;
                let statusCode = 200;

                if (headerEndIndex !== -1) {
                    const headerPart = stdoutData.substring(0, headerEndIndex);
                    responseBody = stdoutData.substring(headerEndIndex + 4);
                    const statusMatch = headerPart.match(/Status:\s*(\d+)/i);
                    if (statusMatch) statusCode = parseInt(statusMatch[1], 10);
                }

                if (!res.headersSent) {
                    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=UTF-8' });
                }
                res.end(responseBody || (code !== 0 ? JSON.stringify({ error: stderrData || 'PHP execution error' }) : '{}'));
            });

            phpProc.on('error', err => {
                if (!res.headersSent) {
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
                }
                res.end(JSON.stringify({ status: 'ok', fallback: true, message: 'LocalStorage mode active' }));
            });
        });
        return;
    }

    // Serve Static Files
    let filePath = path.join(ROOT_DIR, pathname === '/' ? 'index.html' : pathname);

    // Prevent directory traversal
    if (!filePath.startsWith(ROOT_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || stats.isDirectory()) {
            // SPA Fallback: serve index.html
            filePath = path.join(ROOT_DIR, 'index.html');
        }

        fs.readFile(filePath, (readErr, content) => {
            if (readErr) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
                return;
            }

            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`========================================================`);
    console.log(`  Server TKA Smart Exam Berjalan Sukses!`);
    console.log(`  - Local:   http://localhost:${PORT}`);
    console.log(`  - IPv4:    http://127.0.0.1:${PORT}`);
    console.log(`========================================================`);
});
