<?php
// REST API Backend for TKA Smart Exam (PHP + MySQL)
// Compatible with CWP (Control Web Panel), Shared Hosting, and Vercel
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Credentials from Environment or default values
$db_host = getenv('DB_HOST') ?: '127.0.0.1';
$db_user = getenv('DB_USER') ?: 'smarttka_user';
$db_pass = getenv('DB_PASS') ?: 'smart-tka123';
$db_name = getenv('DB_NAME') ?: 'smarttka_db';
$db_port = getenv('DB_PORT') ?: '3306';

try {
    $pdo = new PDO("mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if (strpos($uri, '/api/health') !== false) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'mysql' => false, 'message' => $e->getMessage()]);
        exit();
    }
    http_response_code(500);
    echo json_encode(['error' => 'Database Connection Failed: ' . $e->getMessage()]);
    exit();
}

$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true) ?? [];

// Route matcher helper
function isRoute($path, $request_uri) {
    return strpos($request_uri, $path) !== false;
}

// Helper to check if request is a DELETE operation (supports HTTP DELETE or POST with action=delete)
function isDeleteAction($method, $input) {
    if ($method === 'DELETE') return true;
    if (isset($input['action']) && strtolower($input['action']) === 'delete') return true;
    if (isset($input['_method']) && strtoupper($input['_method']) === 'DELETE') return true;
    return false;
}

// 1. Health Check
if (isRoute('/api/health', $request_uri)) {
    echo json_encode(['status' => 'ok', 'mysql' => true, 'message' => 'Terhubung ke database MySQL (PHP Backend)!']);
    exit();
}

// 2. USERS CRUD
if (isRoute('/api/users', $request_uri)) {
    if ($method === 'GET') {
        try {
            $stmt = $pdo->query("SELECT * FROM users ORDER BY created_at DESC");
            echo json_encode($stmt->fetchAll());
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit();
    }

    // Handle DELETE user
    if (isDeleteAction($method, $input)) {
        preg_match('/\/users\/([^\/\?]+)/', $request_uri, $matches);
        $id = (isset($matches[1]) && strlen($matches[1]) > 0) ? urldecode($matches[1]) : ($input['id'] ?? ($_GET['id'] ?? ''));
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'User ID required']);
            exit();
        }
        try {
            $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        exit();
    }

    if ($method === 'POST') {
        $id = $input['id'] ?? ('u-std-' . round(microtime(true) * 1000));
        $nisn = $input['nisn'] ?? '';
        $name = $input['name'] ?? '';
        $kelas = $input['kelas'] ?? 'Kelas 5';
        $role = $input['role'] ?? 'siswa';
        $password = $input['password'] ?? '123';
        $avatar = $input['avatar'] ?? '';

        try {
            $sql = "INSERT INTO users (id, nisn, name, kelas, role, password, avatar)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    nisn = VALUES(nisn), name = VALUES(name), kelas = VALUES(kelas),
                    role = VALUES(role), password = VALUES(password), avatar = VALUES(avatar)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id, $nisn, $name, $kelas, $role, $password, $avatar]);
            echo json_encode(['success' => true, 'user' => [
                'id' => $id, 'nisn' => $nisn, 'name' => $name, 'kelas' => $kelas, 'role' => $role, 'password' => $password, 'avatar' => $avatar
            ]]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        exit();
    }
}

// 3. QUESTIONS CRUD
if (isRoute('/api/questions', $request_uri)) {
    if ($method === 'GET') {
        try {
            $stmt = $pdo->query("SELECT * FROM questions ORDER BY created_at DESC");
            $rows = $stmt->fetchAll();
            foreach ($rows as &$q) {
                $q['options'] = is_string($q['options']) ? json_decode($q['options'], true) : $q['options'];
                $q['answerKey'] = $q['answer_key'];
            }
            echo json_encode($rows, JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit();
    }

    // Handle DELETE question
    if (isDeleteAction($method, $input)) {
        preg_match('/\/questions\/([^\/\?]+)/', $request_uri, $matches);
        $id = (isset($matches[1]) && strlen($matches[1]) > 0) ? urldecode($matches[1]) : ($input['id'] ?? ($_GET['id'] ?? ''));
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'Question ID required']);
            exit();
        }
        try {
            $stmt = $pdo->prepare("DELETE FROM questions WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        exit();
    }

    if ($method === 'POST') {
        $id = $input['id'] ?? ('q-' . round(microtime(true) * 1000));
        $kelas = $input['kelas'] ?? 'Kelas 5';
        $subject = $input['subject'] ?? 'matematika';
        $bab = $input['bab'] ?? 'Umum';
        $difficulty = $input['difficulty'] ?? 'Sedang';
        $passage = $input['passage'] ?? null;
        $question = $input['question'] ?? '';
        $image = $input['image'] ?? null;
        $optionsRaw = $input['options'] ?? [];
        $optionsJson = is_array($optionsRaw) ? json_encode($optionsRaw, JSON_UNESCAPED_UNICODE) : (is_string($optionsRaw) ? $optionsRaw : '[]');
        $answerKey = $input['answerKey'] ?? ($input['answer_key'] ?? 'A');
        $explanation = $input['explanation'] ?? '';

        try {
            $sql = "INSERT INTO questions (id, kelas, subject, bab, difficulty, passage, question, image, options, answer_key, explanation)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    kelas = VALUES(kelas), subject = VALUES(subject), bab = VALUES(bab),
                    difficulty = VALUES(difficulty), passage = VALUES(passage), question = VALUES(question),
                    image = VALUES(image), options = VALUES(options), answer_key = VALUES(answer_key), explanation = VALUES(explanation)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id, $kelas, $subject, $bab, $difficulty, $passage, $question, $image, $optionsJson, $answerKey, $explanation]);
            echo json_encode(['success' => true, 'question' => [
                'id' => $id, 'kelas' => $kelas, 'subject' => $subject, 'bab' => $bab, 'difficulty' => $difficulty,
                'passage' => $passage, 'question' => $question, 'image' => $image,
                'options' => is_array($optionsRaw) ? $optionsRaw : json_decode($optionsJson, true),
                'answerKey' => $answerKey, 'explanation' => $explanation
            ]], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        exit();
    }
}

// 4. PACKAGES CRUD
if (isRoute('/api/packages', $request_uri)) {
    if ($method === 'GET') {
        try {
            $stmt = $pdo->query("SELECT * FROM packages ORDER BY created_at DESC");
            $rows = $stmt->fetchAll();
            foreach ($rows as &$p) {
                $p['questionIds'] = is_string($p['question_ids']) ? json_decode($p['question_ids'], true) : ($p['question_ids'] ?? []);
                $p['durationMinutes'] = (int)$p['duration_minutes'];
                $p['randomizeQuestions'] = (bool)$p['randomize_questions'];
                $p['randomizeOptions'] = (bool)$p['randomize_options'];
                $p['showResultsToStudent'] = (bool)$p['show_results_to_student'];
            }
            echo json_encode($rows, JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit();
    }

    // Handle DELETE package
    if (isDeleteAction($method, $input)) {
        preg_match('/\/packages\/([^\/\?]+)/', $request_uri, $matches);
        $id = (isset($matches[1]) && strlen($matches[1]) > 0) ? urldecode($matches[1]) : ($input['id'] ?? ($_GET['id'] ?? ''));
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'Package ID required']);
            exit();
        }
        try {
            $stmt = $pdo->prepare("DELETE FROM packages WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        exit();
    }

    if ($method === 'POST') {
        $id = $input['id'] ?? ('pkg-' . round(microtime(true) * 1000));
        $name = $input['name'] ?? '';
        $durationMinutes = $input['durationMinutes'] ?? ($input['duration_minutes'] ?? 15);
        $kkm = $input['kkm'] ?? 70;
        $mode = $input['mode'] ?? 'simulasi';
        $kelas = $input['kelas'] ?? 'Kelas 5';
        $subject = $input['subject'] ?? 'matematika';
        $qIdsRaw = $input['questionIds'] ?? ($input['question_ids'] ?? []);
        $qIdsJson = is_array($qIdsRaw) ? json_encode($qIdsRaw) : (is_string($qIdsRaw) ? $qIdsRaw : '[]');
        $randomizeQuestions = !empty($input['randomizeQuestions']) || !empty($input['randomize_questions']) ? 1 : 0;
        $randomizeOptions = !empty($input['randomizeOptions']) || !empty($input['randomize_options']) ? 1 : 0;
        $showResultsToStudent = (isset($input['showResultsToStudent']) && $input['showResultsToStudent'] === false) || (isset($input['show_results_to_student']) && $input['show_results_to_student'] == 0) ? 0 : 1;

        try {
            $sql = "INSERT INTO packages (id, name, duration_minutes, kkm, mode, kelas, subject, question_ids, randomize_questions, randomize_options, show_results_to_student)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    name = VALUES(name), duration_minutes = VALUES(duration_minutes), kkm = VALUES(kkm),
                    mode = VALUES(mode), kelas = VALUES(kelas), subject = VALUES(subject),
                    question_ids = VALUES(question_ids), randomize_questions = VALUES(randomize_questions),
                    randomize_options = VALUES(randomize_options), show_results_to_student = VALUES(show_results_to_student)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id, $name, $durationMinutes, $kkm, $mode, $kelas, $subject, $qIdsJson, $randomizeQuestions, $randomizeOptions, $showResultsToStudent]);
            echo json_encode(['success' => true, 'package' => [
                'id' => $id, 'name' => $name, 'durationMinutes' => (int)$durationMinutes, 'kkm' => (int)$kkm,
                'mode' => $mode, 'kelas' => $kelas, 'subject' => $subject,
                'questionIds' => is_array($qIdsRaw) ? $qIdsRaw : json_decode($qIdsJson, true),
                'randomizeQuestions' => (bool)$randomizeQuestions, 'randomizeOptions' => (bool)$randomizeOptions,
                'showResultsToStudent' => (bool)$showResultsToStudent
            ]], JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        exit();
    }
}

// 5. RESULTS CRUD
if (isRoute('/api/results', $request_uri)) {
    if ($method === 'GET') {
        try {
            $stmt = $pdo->query("SELECT * FROM results ORDER BY created_at DESC");
            $rows = $stmt->fetchAll();
            foreach ($rows as &$r) {
                $r['studentId'] = $r['student_id'];
                $r['studentName'] = $r['student_name'];
                $r['packageId'] = $r['package_id'];
                $r['packageName'] = $r['package_name'];
                $r['correctCount'] = (int)$r['correct_count'];
                $r['wrongCount'] = (int)$r['wrong_count'];
                $r['unansweredCount'] = (int)($r['unanswered_count'] ?? 0);
                $r['totalQuestions'] = (int)$r['total_questions'];
                $r['durationSeconds'] = (int)$r['duration_seconds'];
                $r['completedAt'] = $r['completed_at'];
                $r['questions'] = is_string($r['questions']) ? json_decode($r['questions'], true) : $r['questions'];
            }
            echo json_encode($rows, JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit();
    }

    // Handle DELETE result
    if (isDeleteAction($method, $input)) {
        preg_match('/\/results\/([^\/\?]+)/', $request_uri, $matches);
        $id = (isset($matches[1]) && strlen($matches[1]) > 0) ? urldecode($matches[1]) : ($input['id'] ?? ($_GET['id'] ?? ''));
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'Result ID required']);
            exit();
        }
        try {
            $stmt = $pdo->prepare("DELETE FROM results WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        exit();
    }

    if ($method === 'POST') {
        $id = $input['id'] ?? ('res-' . round(microtime(true) * 1000));
        $qRaw = $input['questions'] ?? [];
        $questionsJson = is_array($qRaw) ? json_encode($qRaw, JSON_UNESCAPED_UNICODE) : (is_string($qRaw) ? $qRaw : '[]');

        try {
            $sql = "INSERT INTO results (id, student_id, student_name, kelas, package_id, package_name, subject, mode, score, correct_count, wrong_count, unanswered_count, total_questions, kkm, status, duration_seconds, completed_at, questions)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    student_name = VALUES(student_name), score = VALUES(score), correct_count = VALUES(correct_count),
                    wrong_count = VALUES(wrong_count), unanswered_count = VALUES(unanswered_count), status = VALUES(status)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $id,
                $input['studentId'] ?? ($input['student_id'] ?? ''),
                $input['studentName'] ?? ($input['student_name'] ?? ''),
                $input['kelas'] ?? '',
                $input['packageId'] ?? ($input['package_id'] ?? ''),
                $input['packageName'] ?? ($input['package_name'] ?? ''),
                $input['subject'] ?? '',
                $input['mode'] ?? 'simulasi',
                $input['score'] ?? 0,
                $input['correctCount'] ?? ($input['correct_count'] ?? 0),
                $input['wrongCount'] ?? ($input['wrong_count'] ?? 0),
                $input['unansweredCount'] ?? ($input['unanswered_count'] ?? 0),
                $input['totalQuestions'] ?? ($input['total_questions'] ?? 0),
                $input['kkm'] ?? 70,
                $input['status'] ?? 'BELUM LULUS',
                $input['durationSeconds'] ?? ($input['duration_seconds'] ?? 0),
                $input['completedAt'] ?? ($input['completed_at'] ?? date('c')),
                $questionsJson
            ]);
            echo json_encode(['success' => true, 'id' => $id]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        exit();
    }
}

// Fallback: 404
http_response_code(404);
echo json_encode(['error' => 'Endpoint Not Found']);
