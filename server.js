// Express.js & MySQL REST API Server for TKA Smart Exam
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./src/js/config/db.js');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static frontend files
app.use(express.static(__dirname));

// --- API ROUTES ---

// 1. Health & Database Connection Check
app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        res.json({ status: 'ok', mysql: true, message: 'Terhubung ke database MySQL!' });
    } catch (err) {
        res.status(500).json({ status: 'error', mysql: false, message: err.message });
    }
});

// 2. USERS CRUD
app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    const { id, nisn, name, kelas, role, password, avatar } = req.body;
    const userId = id || 'u-std-' + Date.now();
    try {
        const sql = `
            INSERT INTO users (id, nisn, name, kelas, role, password, avatar)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            nisn = VALUES(nisn), name = VALUES(name), kelas = VALUES(kelas),
            role = VALUES(role), password = VALUES(password), avatar = VALUES(avatar)
        `;
        await db.query(sql, [userId, nisn, name, kelas || 'Kelas 5', role || 'siswa', password || '123', avatar || '']);
        res.json({ success: true, user: { id: userId, nisn, name, kelas, role, password, avatar } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. QUESTIONS CRUD
app.get('/api/questions', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM questions ORDER BY created_at DESC');
        const formatted = rows.map(q => ({
            ...q,
            options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
            answerKey: q.answer_key
        }));
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/questions', async (req, res) => {
    const { id, kelas, subject, bab, difficulty, passage, question, image, options, answerKey, explanation } = req.body;
    const qId = id || 'q-' + Date.now();
    const optionsJson = JSON.stringify(options || []);
    try {
        const sql = `
            INSERT INTO questions (id, kelas, subject, bab, difficulty, passage, question, image, options, answer_key, explanation)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            kelas = VALUES(kelas), subject = VALUES(subject), bab = VALUES(bab),
            difficulty = VALUES(difficulty), passage = VALUES(passage), question = VALUES(question),
            image = VALUES(image), options = VALUES(options), answer_key = VALUES(answer_key), explanation = VALUES(explanation)
        `;
        await db.query(sql, [qId, kelas || 'Kelas 5', subject || 'matematika', bab || 'Umum', difficulty || 'Sedang', passage || null, question, image || null, optionsJson, answerKey || 'A', explanation || '']);
        res.json({ success: true, question: { id: qId, kelas, subject, bab, difficulty, passage, question, image, options, answerKey, explanation } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/questions/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM questions WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. PACKAGES CRUD
app.get('/api/packages', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM packages ORDER BY created_at DESC');
        const formatted = rows.map(p => ({
            ...p,
            questionIds: typeof p.question_ids === 'string' ? JSON.parse(p.question_ids) : (p.question_ids || []),
            durationMinutes: p.duration_minutes,
            randomizeQuestions: !!p.randomize_questions,
            randomizeOptions: !!p.randomize_options,
            showResultsToStudent: !!p.show_results_to_student
        }));
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/packages', async (req, res) => {
    const { id, name, durationMinutes, kkm, mode, kelas, subject, questionIds, randomizeQuestions, randomizeOptions, showResultsToStudent } = req.body;
    const pkgId = id || 'pkg-' + Date.now();
    const qIdsJson = JSON.stringify(questionIds || []);
    try {
        const sql = `
            INSERT INTO packages (id, name, duration_minutes, kkm, mode, kelas, subject, question_ids, randomize_questions, randomize_options, show_results_to_student)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            name = VALUES(name), duration_minutes = VALUES(duration_minutes), kkm = VALUES(kkm),
            mode = VALUES(mode), kelas = VALUES(kelas), subject = VALUES(subject),
            question_ids = VALUES(question_ids), randomize_questions = VALUES(randomize_questions),
            randomize_options = VALUES(randomize_options), show_results_to_student = VALUES(show_results_to_student)
        `;
        await db.query(sql, [
            pkgId, name, durationMinutes || 15, kkm || 70, mode || 'simulasi', kelas || 'Kelas 5', subject || 'matematika',
            qIdsJson, randomizeQuestions ? 1 : 0, randomizeOptions ? 1 : 0, showResultsToStudent !== false ? 1 : 0
        ]);
        res.json({ success: true, package: { id: pkgId, name, durationMinutes, kkm, mode, kelas, subject, questionIds } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/packages/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM packages WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. RESULTS CRUD
app.get('/api/results', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM results ORDER BY created_at DESC');
        const formatted = rows.map(r => ({
            ...r,
            studentId: r.student_id,
            studentName: r.student_name,
            packageId: r.package_id,
            packageName: r.package_name,
            correctCount: r.correct_count,
            wrongCount: r.wrong_count,
            totalQuestions: r.total_questions,
            durationSeconds: r.duration_seconds,
            completedAt: r.completed_at,
            questions: typeof r.questions === 'string' ? JSON.parse(r.questions) : r.questions
        }));
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/results', async (req, res) => {
    const r = req.body;
    const resId = r.id || 'res-' + Date.now();
    const questionsJson = JSON.stringify(r.questions || []);
    try {
        const sql = `
            INSERT INTO results (id, student_id, student_name, kelas, package_id, package_name, subject, mode, score, correct_count, wrong_count, total_questions, kkm, status, duration_seconds, completed_at, questions)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(sql, [
            resId, r.studentId, r.studentName, r.kelas, r.packageId, r.packageName, r.subject,
            r.mode || 'simulasi', r.score || 0, r.correctCount || 0, r.wrongCount || 0,
            r.totalQuestions || 0, r.kkm || 70, r.status || 'BELUM LULUS',
            r.durationSeconds || 0, r.completedAt || new Date().toISOString(), questionsJson
        ]);
        res.json({ success: true, id: resId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fallback to index.html for SPA routes
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Export app for Vercel / serverless deployment
module.exports = app;

if (require.main === module) {
    app.listen(PORT, HOST, () => {
        console.log(`\n==================================================`);
        console.log(`🚀 TKA Smart Exam CBT Express Server Running!`);
        console.log(`📍 URL: http://${HOST}:${PORT}`);
        console.log(`🗄️  MySQL API Endpoints Available at http://${HOST}:${PORT}/api/health`);
        console.log(`==================================================\n`);
    });
}
