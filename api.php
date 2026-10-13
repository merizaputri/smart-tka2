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

$pdo = null;
$conn_error = null;

// Try default credentials first, then fallback to local XAMPP root
$credentials = [
    ['user' => $db_user, 'pass' => $db_pass],
    ['user' => 'root', 'pass' => ''],
    ['user' => 'root', 'pass' => 'root']
];

foreach ($credentials as $cred) {
    try {
        $pdo = new PDO("mysql:host={$db_host};port={$db_port};dbname={$db_name};charset=utf8mb4", $cred['user'], $cred['pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
        break;
    } catch (PDOException $e) {
        $conn_error = $e->getMessage();
    }
}

if (!$pdo) {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if (strpos($uri, '/api/health') !== false) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'mysql' => false, 'message' => $conn_error]);
        exit();
    }
    http_response_code(500);
    echo json_encode(['error' => 'Database Connection Failed: ' . $conn_error]);
    exit();
}

// Auto Migration Helper: Ensure missing columns exist in MySQL tables automatically
function ensureSchema($pdo) {
    static $migrated = false;
    if ($migrated) return;
    $migrated = true;

    try {
        // 1. Ensure questions table columns
        $pdo->exec("ALTER TABLE `questions` ADD COLUMN IF NOT EXISTS `passage` LONGTEXT NULL");
        $pdo->exec("ALTER TABLE `questions` ADD COLUMN IF NOT EXISTS `bab` VARCHAR(128) NULL DEFAULT 'Umum'");
        $pdo->exec("ALTER TABLE `questions` ADD COLUMN IF NOT EXISTS `difficulty` VARCHAR(32) NULL DEFAULT 'Sedang'");
        $pdo->exec("ALTER TABLE `questions` ADD COLUMN IF NOT EXISTS `explanation` LONGTEXT NULL");
        $pdo->exec("ALTER TABLE `questions` ADD COLUMN IF NOT EXISTS `image` LONGTEXT NULL");
        $pdo->exec("ALTER TABLE `questions` MODIFY COLUMN `answer_key` VARCHAR(64) NOT NULL DEFAULT 'A'");
        
        // 2. Ensure results table columns
        $pdo->exec("ALTER TABLE `results` ADD COLUMN IF NOT EXISTS `unanswered_count` INT NOT NULL DEFAULT 0");
        $pdo->exec("ALTER TABLE `results` ADD COLUMN IF NOT EXISTS `answers` LONGTEXT NULL");

        // 3. Ensure users table columns
        $pdo->exec("ALTER TABLE `users` MODIFY COLUMN `avatar` LONGTEXT NULL");

        // 4. Ensure materials table exists
        $pdo->exec("CREATE TABLE IF NOT EXISTS `materials` (
            `id` VARCHAR(64) PRIMARY KEY,
            `kelas` VARCHAR(32) NOT NULL,
            `subject` VARCHAR(64) NOT NULL,
            `title` VARCHAR(255) NOT NULL,
            `description` TEXT NULL,
            `content` LONGTEXT NULL,
            `learning_objectives` TEXT NULL,
            `summary` TEXT NULL,
            `video_url` VARCHAR(500) NULL,
            `video_id` VARCHAR(64) NULL,
            `order_number` INT DEFAULT 1,
            `status` VARCHAR(32) DEFAULT 'draft',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX `idx_mat_class_subj` (`kelas`, `subject`),
            INDEX `idx_mat_status` (`status`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

        // Ensure video columns exist if materials table was created earlier
        $colsVideo = $pdo->query("SHOW COLUMNS FROM `materials` LIKE 'video_url'")->fetchAll();
        if (empty($colsVideo)) {
            $pdo->exec("ALTER TABLE `materials` ADD `video_url` VARCHAR(500) NULL AFTER `summary`");
        }
        $colsVideoId = $pdo->query("SHOW COLUMNS FROM `materials` LIKE 'video_id'")->fetchAll();
        if (empty($colsVideoId)) {
            $pdo->exec("ALTER TABLE `materials` ADD `video_id` VARCHAR(64) NULL AFTER `video_url`");
        }

        // 5. Ensure material_questions junction table exists with UNIQUE constraint
        $pdo->exec("CREATE TABLE IF NOT EXISTS `material_questions` (
            `id` VARCHAR(64) PRIMARY KEY,
            `material_id` VARCHAR(64) NOT NULL,
            `question_id` VARCHAR(64) NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY `uniq_mat_quest` (`material_id`, `question_id`),
            INDEX `idx_mq_mat` (`material_id`),
            INDEX `idx_mq_quest` (`question_id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    } catch (PDOException $e) {
        // Fallback for older MySQL / MariaDB versions that don't support ADD COLUMN IF NOT EXISTS
        try {
            $colsPass = $pdo->query("SHOW COLUMNS FROM `questions` LIKE 'passage'")->fetchAll();
            if (empty($colsPass)) {
                $pdo->exec("ALTER TABLE `questions` ADD `passage` LONGTEXT NULL");
            }
            $colsBab = $pdo->query("SHOW COLUMNS FROM `questions` LIKE 'bab'")->fetchAll();
            if (empty($colsBab)) {
                $pdo->exec("ALTER TABLE `questions` ADD `bab` VARCHAR(128) NULL DEFAULT 'Umum'");
            }
            $colsDiff = $pdo->query("SHOW COLUMNS FROM `questions` LIKE 'difficulty'")->fetchAll();
            if (empty($colsDiff)) {
                $pdo->exec("ALTER TABLE `questions` ADD `difficulty` VARCHAR(32) NULL DEFAULT 'Sedang'");
            }
            $colsExp = $pdo->query("SHOW COLUMNS FROM `questions` LIKE 'explanation'")->fetchAll();
            if (empty($colsExp)) {
                $pdo->exec("ALTER TABLE `questions` ADD `explanation` LONGTEXT NULL");
            }
            $colsRes = $pdo->query("SHOW COLUMNS FROM `results` LIKE 'unanswered_count'")->fetchAll();
            if (empty($colsRes)) {
                $pdo->exec("ALTER TABLE `results` ADD `unanswered_count` INT NOT NULL DEFAULT 0");
            }
            $colsAns = $pdo->query("SHOW COLUMNS FROM `results` LIKE 'answers'")->fetchAll();
            if (empty($colsAns)) {
                $pdo->exec("ALTER TABLE `results` ADD `answers` LONGTEXT NULL");
            }
        } catch (PDOException $ex) {}
    }
}

ensureSchema($pdo);

$request_uri = parse_url($_SERVER['REQUEST_URI'] ?? ($_SERVER['PHP_SELF'] ?? '/'), PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

$rawInput = file_get_contents('php://input');
if (empty($rawInput)) {
    $rawInput = @file_get_contents('php://stdin');
}
$input = !empty($rawInput) ? (json_decode($rawInput, true) ?? []) : ($_POST ?? []);
if (empty($input) && !empty($_GET)) {
    $input = $_GET;
}

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
                $opts = $q['options'];
                if (is_string($opts)) {
                    $decoded = json_decode($opts, true);
                    if (is_string($decoded)) {
                        $decoded = json_decode($decoded, true);
                    }
                    $q['options'] = is_array($decoded) ? $decoded : [];
                } else {
                    $q['options'] = is_array($opts) ? $opts : [];
                }
                $q['answerKey'] = $q['answer_key'] ?? ($q['answerKey'] ?? 'A');
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
                $qIds = $p['question_ids'] ?? ($p['questionIds'] ?? []);
                if (is_string($qIds)) {
                    $decoded = json_decode($qIds, true);
                    if (is_string($decoded)) {
                        $decoded = json_decode($decoded, true);
                    }
                    $p['questionIds'] = is_array($decoded) ? $decoded : [];
                } else {
                    $p['questionIds'] = is_array($qIds) ? $qIds : [];
                }
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
                $r['answers'] = isset($r['answers']) && is_string($r['answers']) ? json_decode($r['answers'], true) : ($r['answers'] ?? []);
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
        $ansRaw = $input['answers'] ?? [];
        $answersJson = is_array($ansRaw) ? json_encode($ansRaw, JSON_UNESCAPED_UNICODE) : (is_string($ansRaw) ? $ansRaw : '{}');

        try {
            $sql = "INSERT INTO results (id, student_id, student_name, kelas, package_id, package_name, subject, mode, score, correct_count, wrong_count, unanswered_count, total_questions, kkm, status, duration_seconds, completed_at, questions, answers)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    student_name = VALUES(student_name), score = VALUES(score), correct_count = VALUES(correct_count),
                    wrong_count = VALUES(wrong_count), unanswered_count = VALUES(unanswered_count), status = VALUES(status),
                    questions = VALUES(questions), answers = VALUES(answers)";
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
                $questionsJson,
                $answersJson
            ]);
            echo json_encode(['success' => true, 'id' => $id]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        exit();
    }
}

// 6. UNMAPPED QUESTIONS API
if (isRoute('/api/questions/unmapped-materials', $request_uri)) {
    try {
        $kelas = $_GET['kelas'] ?? '';
        $subject = $_GET['subject'] ?? '';
        $sql = "SELECT q.* FROM questions q 
                LEFT JOIN material_questions mq ON q.id = mq.question_id 
                WHERE mq.id IS NULL";
        $params = [];
        if (!empty($kelas) && $kelas !== 'all') {
            $sql .= " AND q.kelas = ?";
            $params[] = $kelas;
        }
        if (!empty($subject) && $subject !== 'all') {
            $sql .= " AND q.subject = ?";
            $params[] = $subject;
        }
        $sql .= " ORDER BY q.created_at DESC";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();
        foreach ($rows as &$q) {
            $opts = $q['options'];
            if (is_string($opts)) {
                $decoded = json_decode($opts, true);
                if (is_string($decoded)) $decoded = json_decode($decoded, true);
                $q['options'] = is_array($decoded) ? $decoded : [];
            }
            $q['answerKey'] = $q['answer_key'] ?? ($q['answerKey'] ?? 'A');
        }
        echo json_encode($rows, JSON_UNESCAPED_UNICODE);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit();
}

// 7. MATERIALS CRUD & ACTIONS
if (isRoute('/api/materials', $request_uri)) {
    // 7.1 Publish/Unpublish Action
    if (strpos($request_uri, '/publish') !== false || strpos($request_uri, '/unpublish') !== false) {
        preg_match('/\/materials\/([^\/\?]+)\/(publish|unpublish)/', $request_uri, $matches);
        $id = $matches[1] ?? ($input['id'] ?? '');
        $action = $matches[2] ?? (strpos($request_uri, '/publish') !== false ? 'publish' : 'unpublish');
        $newStatus = ($action === 'publish') ? 'published' : 'draft';
        try {
            $stmt = $pdo->prepare("UPDATE materials SET status = ? WHERE id = ?");
            $stmt->execute([$newStatus, $id]);
            echo json_encode(['success' => true, 'id' => $id, 'status' => $newStatus]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        exit();
    }

    // 7.2 Specific Material Questions endpoint: /api/materials/{id}/questions
    if (strpos($request_uri, '/questions') !== false) {
        preg_match('/\/materials\/([^\/\?]+)\/questions(?:\/([^\/\?]+))?/', $request_uri, $matches);
        $matId = $matches[1] ?? '';
        $questId = $matches[2] ?? ($input['questionId'] ?? ($input['question_id'] ?? ''));

        if ($method === 'GET') {
            try {
                $stmt = $pdo->prepare("SELECT q.* FROM questions q 
                                        JOIN material_questions mq ON q.id = mq.question_id 
                                        WHERE mq.material_id = ? ORDER BY q.created_at ASC");
                $stmt->execute([$matId]);
                $rows = $stmt->fetchAll();
                foreach ($rows as &$q) {
                    $opts = $q['options'];
                    if (is_string($opts)) {
                        $decoded = json_decode($opts, true);
                        if (is_string($decoded)) $decoded = json_decode($decoded, true);
                        $q['options'] = is_array($decoded) ? $decoded : [];
                    }
                    $q['answerKey'] = $q['answer_key'] ?? ($q['answerKey'] ?? 'A');
                }
                echo json_encode($rows, JSON_UNESCAPED_UNICODE);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['error' => $e->getMessage()]);
            }
            exit();
        }

        if (isDeleteAction($method, $input)) {
            if (!$matId || !$questId) {
                http_response_code(400);
                echo json_encode(['error' => 'Material ID and Question ID required']);
                exit();
            }
            try {
                $stmt = $pdo->prepare("DELETE FROM material_questions WHERE material_id = ? AND question_id = ?");
                $stmt->execute([$matId, $questId]);
                echo json_encode(['success' => true]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => $e->getMessage()]);
            }
            exit();
        }

        if ($method === 'POST') {
            $questionIds = $input['questionIds'] ?? ($input['question_ids'] ?? ($questId ? [$questId] : []));
            if (!is_array($questionIds)) $questionIds = [$questionIds];
            try {
                $stmt = $pdo->prepare("INSERT IGNORE INTO material_questions (id, material_id, question_id) VALUES (?, ?, ?)");
                foreach ($questionIds as $qid) {
                    $mqId = 'mq-' . round(microtime(true) * 1000) . '-' . substr(md5($matId . $qid), 0, 6);
                    $stmt->execute([$mqId, $matId, $qid]);
                }
                echo json_encode(['success' => true]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => $e->getMessage()]);
            }
            exit();
        }
    }

    // 7.3 DELETE Material
    if (isDeleteAction($method, $input)) {
        preg_match('/\/materials\/([^\/\?]+)/', $request_uri, $matches);
        $id = (isset($matches[1]) && strlen($matches[1]) > 0) ? urldecode($matches[1]) : ($input['id'] ?? ($_GET['id'] ?? ''));
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'Material ID required']);
            exit();
        }
        try {
            $pdo->prepare("DELETE FROM material_questions WHERE material_id = ?")->execute([$id]);
            $pdo->prepare("DELETE FROM materials WHERE id = ?")->execute([$id]);
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        exit();
    }

    // 7.4 GET List or Single Material
    if ($method === 'GET') {
        preg_match('/\/materials\/([^\/\?]+)/', $request_uri, $matches);
        $singleId = (isset($matches[1]) && strlen($matches[1]) > 0 && !in_array($matches[1], ['unmapped-materials', 'generate'])) ? urldecode($matches[1]) : null;

        try {
            if ($singleId) {
                $stmt = $pdo->prepare("SELECT * FROM materials WHERE id = ?");
                $stmt->execute([$singleId]);
                $mat = $stmt->fetch();
                if (!$mat) {
                    http_response_code(404);
                    echo json_encode(['error' => 'Material not found']);
                    exit();
                }
                // Fetch attached questionIds & full questions
                $qStmt = $pdo->prepare("SELECT q.* FROM questions q JOIN material_questions mq ON q.id = mq.question_id WHERE mq.material_id = ? ORDER BY q.created_at ASC");
                $qStmt->execute([$singleId]);
                $qRows = $qStmt->fetchAll();
                $qIds = [];
                foreach ($qRows as &$q) {
                    $qIds[] = $q['id'];
                    $opts = $q['options'];
                    if (is_string($opts)) {
                        $decoded = json_decode($opts, true);
                        if (is_string($decoded)) $decoded = json_decode($decoded, true);
                        $q['options'] = is_array($decoded) ? $decoded : [];
                    }
                    $q['answerKey'] = $q['answer_key'] ?? ($q['answerKey'] ?? 'A');
                }
                $mat['questionIds'] = $qIds;
                $mat['questionCount'] = count($qIds);
                $mat['questions'] = $qRows;
                $mat['learningObjectives'] = is_string($mat['learning_objectives']) ? (json_decode($mat['learning_objectives'], true) ?: $mat['learning_objectives']) : $mat['learning_objectives'];
                $mat['orderNumber'] = (int)($mat['order_number'] ?? 1);
                $mat['videoUrl'] = $mat['video_url'] ?? '';
                $mat['videoId'] = $mat['video_id'] ?? '';
                echo json_encode($mat, JSON_UNESCAPED_UNICODE);
                exit();
            }

            // List with optional filters
            $kelas = $_GET['kelas'] ?? '';
            $subject = $_GET['subject'] ?? '';
            $status = $_GET['status'] ?? '';

            $sql = "SELECT m.*, 
                    COALESCE(GROUP_CONCAT(mq.question_id), '') AS question_ids_str,
                    COUNT(mq.question_id) AS question_count
                    FROM materials m
                    LEFT JOIN material_questions mq ON m.id = mq.material_id
                    WHERE 1=1";
            $params = [];
            if (!empty($kelas) && $kelas !== 'all') {
                $sql .= " AND m.kelas = ?";
                $params[] = $kelas;
            }
            if (!empty($subject) && $subject !== 'all') {
                $sql .= " AND m.subject = ?";
                $params[] = $subject;
            }
            if (!empty($status) && $status !== 'all') {
                $sql .= " AND m.status = ?";
                $params[] = $status;
            }
            $sql .= " GROUP BY m.id ORDER BY m.order_number ASC, m.created_at DESC";

            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $rows = $stmt->fetchAll();
            foreach ($rows as &$m) {
                $qStr = $m['question_ids_str'] ?? '';
                $m['questionIds'] = !empty($qStr) ? explode(',', $qStr) : [];
                $m['questionCount'] = (int)$m['question_count'];
                unset($m['question_ids_str']);
                unset($m['question_count']);
                $m['learningObjectives'] = is_string($m['learning_objectives']) ? (json_decode($m['learning_objectives'], true) ?: $m['learning_objectives']) : $m['learning_objectives'];
                $m['orderNumber'] = (int)($m['order_number'] ?? 1);
                $m['videoUrl'] = $m['video_url'] ?? '';
                $m['videoId'] = $m['video_id'] ?? '';
            }
            echo json_encode($rows, JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit();
    }

    // 7.5 POST Create / Update Material
    if ($method === 'POST') {
        $id = $input['id'] ?? ('mat-' . round(microtime(true) * 1000));
        $kelas = $input['kelas'] ?? 'Kelas 2';
        $subject = $input['subject'] ?? 'fiqih';
        $title = $input['title'] ?? 'Materi Pembelajaran';
        $description = $input['description'] ?? '';
        $content = $input['content'] ?? '';
        $learningObjectivesRaw = $input['learningObjectives'] ?? ($input['learning_objectives'] ?? []);
        $learningObjectivesJson = is_array($learningObjectivesRaw) ? json_encode($learningObjectivesRaw, JSON_UNESCAPED_UNICODE) : (is_string($learningObjectivesRaw) ? $learningObjectivesRaw : '[]');
        $summary = $input['summary'] ?? '';
        $videoUrl = trim($input['video_url'] ?? ($input['videoUrl'] ?? ''));
        $videoId = trim($input['video_id'] ?? ($input['videoId'] ?? ''));
        $orderNumber = (int)($input['orderNumber'] ?? ($input['order_number'] ?? 1));
        $status = $input['status'] ?? 'draft';
        $questionIds = $input['questionIds'] ?? ($input['question_ids'] ?? []);

        try {
            $sql = "INSERT INTO materials (id, kelas, subject, title, description, content, learning_objectives, summary, video_url, video_id, order_number, status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                    kelas = VALUES(kelas), subject = VALUES(subject), title = VALUES(title),
                    description = VALUES(description), content = VALUES(content),
                    learning_objectives = VALUES(learning_objectives), summary = VALUES(summary),
                    video_url = VALUES(video_url), video_id = VALUES(video_id),
                    order_number = VALUES(order_number), status = VALUES(status), updated_at = NOW()";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$id, $kelas, $subject, $title, $description, $content, $learningObjectivesJson, $summary, $videoUrl, $videoId, $orderNumber, $status]);

            // Sync material_questions relationship if questionIds provided
            if (is_array($questionIds)) {
                $pdo->prepare("DELETE FROM material_questions WHERE material_id = ?")->execute([$id]);
                if (!empty($questionIds)) {
                    $mqStmt = $pdo->prepare("INSERT IGNORE INTO material_questions (id, material_id, question_id) VALUES (?, ?, ?)");
                    foreach ($questionIds as $qid) {
                        $mqId = 'mq-' . round(microtime(true) * 1000) . '-' . substr(md5($id . $qid), 0, 6);
                        $mqStmt->execute([$mqId, $id, $qid]);
                    }
                }
            }

            echo json_encode(['success' => true, 'material' => [
                'id' => $id, 'kelas' => $kelas, 'subject' => $subject, 'title' => $title,
                'description' => $description, 'content' => $content,
                'learningObjectives' => is_array($learningObjectivesRaw) ? $learningObjectivesRaw : json_decode($learningObjectivesJson, true),
                'summary' => $summary,
                'video_url' => $videoUrl,
                'videoUrl' => $videoUrl,
                'video_id' => $videoId,
                'videoId' => $videoId,
                'orderNumber' => $orderNumber,
                'status' => $status,
                'questionIds' => is_array($questionIds) ? $questionIds : []
            ]], JSON_UNESCAPED_UNICODE);
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

