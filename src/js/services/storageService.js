// Persistent Hybrid Storage Adapter & CBT State Engine (MySQL REST API + LocalStorage Fallback)

import { STORAGE_KEYS, DEFAULT_ADMIN } from '../config/constants.js';
import { INITIAL_STUDENTS, INITIAL_QUESTIONS, INITIAL_PACKAGES, INITIAL_RESULTS } from '../data/initialData.js';
import { extractYouTubeVideoId } from './youtubeService.js';

export const storageService = {
    init() {
        let users = [];
        try {
            users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
        } catch (e) {}

        const adminUser = users.find(u => u.role === 'admin');
        if (users.length === 0 || !adminUser || !adminUser.password) {
            const allUsers = [DEFAULT_ADMIN, ...INITIAL_STUDENTS];
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(allUsers));
        }
        let questions = [];
        try { questions = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUESTIONS)) || []; } catch (e) {}
        const qIdSet = new Set(questions.map(q => q.id));
        let qUpdated = false;
        INITIAL_QUESTIONS.forEach(iq => {
            if (!qIdSet.has(iq.id)) {
                questions.push(iq);
                qUpdated = true;
            }
        });
        if (qUpdated || questions.length === 0) {
            localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
        }

        let packages = [];
        try { packages = JSON.parse(localStorage.getItem(STORAGE_KEYS.PACKAGES)) || []; } catch (e) {}
        const pIdSet = new Set(packages.map(p => p.id));
        let pUpdated = false;
        INITIAL_PACKAGES.forEach(ip => {
            if (!pIdSet.has(ip.id)) {
                packages.push(ip);
                pUpdated = true;
            } else {
                const existingPkg = packages.find(p => p.id === ip.id);
                if (existingPkg) {
                    const existingQIds = new Set(existingPkg.questionIds || []);
                    (ip.questionIds || []).forEach(qid => {
                        if (!existingQIds.has(qid)) {
                            existingPkg.questionIds.push(qid);
                            pUpdated = true;
                        }
                    });
                }
            }
        });
        if (pUpdated || packages.length === 0) {
            localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
        }

        if (!localStorage.getItem(STORAGE_KEYS.RESULTS)) {
            localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(INITIAL_RESULTS));
        }

        // Try syncing from MySQL database in background
        this.syncFromApi();
    },

    async syncFromApi() {
        try {
            const res = await fetch('/api/health');
            if (!res.ok) return;
            const health = await res.json();
            if (!health.mysql) return;

            const [usersRes, questionsRes, packagesRes, resultsRes] = await Promise.all([
                fetch('/api/users'),
                fetch('/api/questions'),
                fetch('/api/packages'),
                fetch('/api/results')
            ]);

            // 1. Sync Users
            if (usersRes.ok) {
                const users = await usersRes.json();
                if (Array.isArray(users) && users.length > 0) {
                    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
                } else {
                    const localUsers = this.getUsers();
                    for (const u of localUsers) {
                        await fetch('/api/users', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(u)
                        }).catch(() => {});
                    }
                }
            }

            // 2. Sync Questions
            if (questionsRes.ok) {
                const dbQuestions = await questionsRes.json();
                if (Array.isArray(dbQuestions)) {
                    const dbQIdSet = new Set(dbQuestions.map(q => q.id));
                    const localQuestions = this.getQuestions();
                    
                    for (const q of localQuestions) {
                        if (!dbQIdSet.has(q.id)) {
                            dbQuestions.push(q);
                            await fetch('/api/questions', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(q)
                            }).catch(() => {});
                        }
                    }
                    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(dbQuestions));
                }
            }

            // 3. Sync Packages
            if (packagesRes.ok) {
                const dbPackages = await packagesRes.json();
                if (Array.isArray(dbPackages)) {
                    const localPackages = this.getPackages();
                    const formatted = dbPackages.map(p => {
                        let qIds = p.questionIds || p.question_ids || [];
                        if (typeof qIds === 'string') {
                            try {
                                qIds = JSON.parse(qIds);
                                if (typeof qIds === 'string') qIds = JSON.parse(qIds);
                            } catch (e) { qIds = []; }
                        }
                        return {
                            ...p,
                            questionIds: Array.isArray(qIds) ? qIds : [],
                            durationMinutes: parseInt(p.durationMinutes || p.duration_minutes, 10) || 15,
                            kkm: parseInt(p.kkm, 10) || 70,
                            randomizeQuestions: p.randomizeQuestions !== false && p.randomize_questions != 0,
                            randomizeOptions: p.randomizeOptions !== false && p.randomize_options != 0,
                            showResultsToStudent: p.showResultsToStudent !== false && p.show_results_to_student != 0
                        };
                    });

                    for (const lp of localPackages) {
                        const existingInDb = formatted.find(p => p.id === lp.id);
                        if (!existingInDb) {
                            formatted.push(lp);
                            await fetch('/api/packages', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(lp)
                            }).catch(() => {});
                        } else {
                            const dbQIds = new Set(existingInDb.questionIds || []);
                            let needUpdate = false;
                            (lp.questionIds || []).forEach(qid => {
                                if (!dbQIds.has(qid)) {
                                    existingInDb.questionIds.push(qid);
                                    needUpdate = true;
                                }
                            });
                            if (needUpdate) {
                                await fetch('/api/packages', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(existingInDb)
                                }).catch(() => {});
                            }
                        }
                    }
                    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(formatted));
                }
            }

            // 4. Sync Results
            if (resultsRes.ok) {
                const dbResults = await resultsRes.json();
                if (Array.isArray(dbResults) && dbResults.length > 0) {
                    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(dbResults));
                } else {
                    const localResults = this.getResults();
                    for (const r of localResults) {
                        await fetch('/api/results', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(r)
                        }).catch(() => {});
                    }
                }
            }

            // 5. Sync Materials & Material Questions
            const materialsRes = await fetch('/api/materials').catch(() => null);
            if (materialsRes && materialsRes.ok) {
                const dbMaterials = await materialsRes.json();
                if (Array.isArray(dbMaterials)) {
                    const localMaterials = this.getMaterials();
                    const dbMatMap = new Map(dbMaterials.map(m => [m.id, m]));

                    for (const lm of localMaterials) {
                        if (!dbMatMap.has(lm.id)) {
                            dbMaterials.push(lm);
                            await fetch('/api/materials', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(lm)
                            }).catch(() => {});
                        }
                    }
                    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(dbMaterials));

                    const mQuestions = [];
                    dbMaterials.forEach(m => {
                        (m.questionIds || []).forEach(qid => {
                            mQuestions.push({
                                id: `mq-${m.id}-${qid}`,
                                material_id: m.id,
                                question_id: qid,
                                created_at: m.created_at || new Date().toISOString()
                            });
                        });
                    });
                    localStorage.setItem(STORAGE_KEYS.MATERIAL_QUESTIONS, JSON.stringify(mQuestions));
                }
            }
        } catch (e) {
            // MySQL server unreachable, fallback silently to localStorage
        }
    },

    // --- USER SESSION MANAGEMENT ---
    getCurrentUser() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    },

    setCurrentUser(user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    },

    logout() {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    },

    authenticate(nisnOrUsername, password) {
        const users = this.getUsers();
        const found = users.find(u => 
            (u.nisn.toLowerCase() === nisnOrUsername.trim().toLowerCase() || 
             u.name.toLowerCase() === nisnOrUsername.trim().toLowerCase()) &&
            u.password === password.trim()
        );
        return found || null;
    },

    // --- USERS CRUD ---
    getUsers() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
        } catch (e) {
            return [];
        }
    },

    async saveUser(user) {
        const users = this.getUsers();
        if (user.id) {
            const index = users.findIndex(u => u.id === user.id);
            if (index !== -1) users[index] = { ...users[index], ...user };
        } else {
            user.id = 'u-std-' + Date.now();
            user.role = user.role || 'siswa';
            user.avatar = user.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user.name)}`;
            users.push(user);
        }
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

        // Sync to MySQL API
        try {
            await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
        } catch (e) {}

        return user;
    },

    async deleteUser(id) {
        const users = this.getUsers().filter(u => u.id !== id);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

        // Sync to MySQL API (Try HTTP DELETE then Fallback POST for CWP hosting)
        try {
            const res = await fetch(`/api/users/${encodeURIComponent(id)}`, { method: 'DELETE' });
            if (!res.ok) {
                await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'delete', id })
                });
            }
        } catch (e) {
            try {
                await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'delete', id })
                });
            } catch (err) {}
        }
    },

    async importUsers(userList) {
        const currentUsers = this.getUsers();
        let addedCount = 0;
        for (const newUser of userList) {
            if (newUser.name && newUser.nisn) {
                const exists = currentUsers.some(u => u.nisn === newUser.nisn);
                if (!exists) {
                    const uObj = {
                        id: 'u-std-' + Date.now() + '-' + Math.floor(Math.random()*1000),
                        nisn: String(newUser.nisn),
                        name: String(newUser.name),
                        kelas: newUser.kelas || 'Kelas 5',
                        role: 'siswa',
                        password: String(newUser.password || '123'),
                        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(newUser.name)}`
                    };
                    currentUsers.push(uObj);
                    addedCount++;

                    // Sync to MySQL API
                    try {
                        await fetch('/api/users', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(uObj)
                        });
                    } catch (e) {}
                }
            }
        }
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(currentUsers));
        return addedCount;
    },

    // --- QUESTIONS CRUD ---
    getQuestions() {
        try {
            const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUESTIONS)) || [];
            return raw.map(q => {
                let opts = q.options;
                if (typeof opts === 'string') {
                    try {
                        opts = JSON.parse(opts);
                        if (typeof opts === 'string') opts = JSON.parse(opts);
                    } catch (e) { opts = []; }
                }
                return {
                    ...q,
                    options: Array.isArray(opts) ? opts : [],
                    answerKey: q.answerKey || q.answer_key || 'A'
                };
            });
        } catch (e) {
            return [];
        }
    },

    async saveQuestion(question) {
        const questions = this.getQuestions();
        if (question.id) {
            const index = questions.findIndex(q => q.id === question.id);
            if (index !== -1) questions[index] = { ...questions[index], ...question };
        } else {
            question.id = 'q-' + Date.now();
            questions.push(question);
        }
        localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));

        // Sync to MySQL API
        try {
            await fetch('/api/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(question)
            });
        } catch (e) {}

        return question;
    },

    async deleteQuestion(id) {
        const questions = this.getQuestions().filter(q => q.id !== id);
        localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));

        // Sync to MySQL API (Try HTTP DELETE then Fallback POST for CWP hosting)
        try {
            const res = await fetch(`/api/questions/${encodeURIComponent(id)}`, { method: 'DELETE' });
            if (!res.ok) {
                await fetch('/api/questions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'delete', id })
                });
            }
        } catch (e) {
            try {
                await fetch('/api/questions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'delete', id })
                });
            } catch (err) {}
        }
    },

    getPackages() {
        try {
            const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.PACKAGES)) || [];
            return raw.map(p => {
                let qIds = p.questionIds || p.question_ids || [];
                if (typeof qIds === 'string') {
                    try {
                        qIds = JSON.parse(qIds);
                        if (typeof qIds === 'string') qIds = JSON.parse(qIds);
                    } catch (e) { qIds = []; }
                }
                return {
                    ...p,
                    questionIds: Array.isArray(qIds) ? qIds : [],
                    durationMinutes: parseInt(p.durationMinutes || p.duration_minutes, 10) || 15,
                    kkm: parseInt(p.kkm, 10) || 70,
                    randomizeQuestions: p.randomizeQuestions !== false && p.randomize_questions != 0,
                    randomizeOptions: p.randomizeOptions !== false && p.randomize_options != 0,
                    showResultsToStudent: p.showResultsToStudent !== false && p.show_results_to_student != 0
                };
            });
        } catch (e) {
            return [];
        }
    },

    async savePackage(pkg) {
        const packages = this.getPackages();
        if (pkg.id) {
            const index = packages.findIndex(p => p.id === pkg.id);
            if (index !== -1) packages[index] = { ...packages[index], ...pkg };
        } else {
            pkg.id = 'pkg-' + Date.now();
            packages.push(pkg);
        }
        localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));

        // Sync to MySQL API
        try {
            await fetch('/api/packages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pkg)
            });
        } catch (e) {}

        return pkg;
    },

    async deletePackage(id) {
        const packages = this.getPackages().filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));

        // Sync to MySQL API (Try HTTP DELETE then Fallback POST for CWP hosting)
        try {
            const res = await fetch(`/api/packages/${encodeURIComponent(id)}`, { method: 'DELETE' });
            if (!res.ok) {
                await fetch('/api/packages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'delete', id })
                });
            }
        } catch (e) {
            try {
                await fetch('/api/packages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'delete', id })
                });
            } catch (err) {}
        }
    },

    // --- CBT ACTIVE EXAM SESSION & TIMER PERSISTENCE ---
    startExamSession(pkg, student) {
        const allQuestions = this.getQuestions();
        // Strictly filter questions matching package questionIds AND matching package subject and class
        let selectedQuestions = allQuestions.filter(q => (pkg.questionIds || []).includes(q.id) && q.subject === pkg.subject && q.kelas === pkg.kelas);

        if (selectedQuestions.length === 0) {
            selectedQuestions = allQuestions.filter(q => q.kelas === pkg.kelas && q.subject === pkg.subject);
        }

        if (pkg.randomizeQuestions) {
            const passageGroups = new Map();
            selectedQuestions.forEach(q => {
                const key = q.passage ? q.passage.trim() : 'standalone_' + q.id;
                if (!passageGroups.has(key)) passageGroups.set(key, []);
                passageGroups.get(key).push(q);
            });
            const shuffledGroups = Array.from(passageGroups.values()).sort(() => Math.random() - 0.5);
            selectedQuestions = shuffledGroups.flat();
        }

        const processedQuestions = selectedQuestions.map(q => {
            let options = [...q.options];
            if (pkg.randomizeOptions) {
                options = [...options].sort(() => Math.random() - 0.5);
            }
            return { ...q, options };
        });

        const startTime = Date.now();
        const durationMs = (pkg.durationMinutes || 15) * 60 * 1000;
        const endTime = startTime + durationMs;

        const sessionState = {
            sessionId: 'sess-' + Date.now(),
            studentId: student.id,
            studentName: student.name,
            studentClass: student.kelas,
            packageId: pkg.id,
            packageName: pkg.name,
            subject: pkg.subject,
            mode: pkg.mode,
            kkm: pkg.kkm || 70,
            showResultsToStudent: pkg.showResultsToStudent !== false,
            questions: processedQuestions,
            answers: {},
            flagged: {},
            currentQuestionIndex: 0,
            startTime,
            endTime,
            durationMinutes: pkg.durationMinutes || 15,
            lastSavedAt: new Date().toISOString()
        };

        localStorage.setItem(STORAGE_KEYS.ACTIVE_EXAM, JSON.stringify(sessionState));
        return sessionState;
    },

    getActiveExamSession() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_EXAM);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    },

    saveExamAnswer(questionId, selectedOptionId) {
        const session = this.getActiveExamSession();
        if (!session) return null;

        session.answers[questionId] = selectedOptionId;
        session.lastSavedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEYS.ACTIVE_EXAM, JSON.stringify(session));
        return session;
    },

    toggleFlagQuestion(questionId) {
        const session = this.getActiveExamSession();
        if (!session) return null;

        session.flagged[questionId] = !session.flagged[questionId];
        session.lastSavedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEYS.ACTIVE_EXAM, JSON.stringify(session));
        return session;
    },

    setCurrentQuestionIndex(index) {
        const session = this.getActiveExamSession();
        if (!session) return null;

        session.currentQuestionIndex = index;
        localStorage.setItem(STORAGE_KEYS.ACTIVE_EXAM, JSON.stringify(session));
        return session;
    },

    finishExamSession() {
        const session = this.getActiveExamSession();
        if (!session) return null;

        const totalQuestions = session.questions.length;
        let correctCount = 0;
        let wrongCount = 0;
        let unansweredCount = 0;

        session.questions.forEach(q => {
            const studentAns = session.answers[q.id];
            if (!studentAns) {
                unansweredCount++;
            } else if (studentAns === q.answerKey) {
                correctCount++;
            } else {
                wrongCount++;
            }
        });

        const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
        const durationSeconds = Math.round((Date.now() - session.startTime) / 1000);
        const isPassed = score >= session.kkm;

        const resultObj = {
            id: 'res-' + Date.now(),
            studentId: session.studentId,
            studentName: session.studentName,
            kelas: session.studentClass,
            packageId: session.packageId,
            packageName: session.packageName,
            subject: session.subject,
            mode: session.mode,
            score,
            correctCount,
            wrongCount,
            unansweredCount,
            totalQuestions,
            durationSeconds,
            kkm: session.kkm,
            status: isPassed ? 'LULUS' : 'BELUM LULUS',
            showResultsToStudent: session.showResultsToStudent,
            completedAt: new Date().toISOString(),
            answers: session.answers,
            questions: session.questions
        };

        const results = this.getResults();
        results.unshift(resultObj);
        localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_EXAM);

        // Sync to MySQL API
        fetch('/api/results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultObj)
        }).catch(() => {});

        return resultObj;
    },

    // --- RESULTS CRUD ---
    getResults() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.RESULTS)) || [];
        } catch (e) {
            return [];
        }
    },

    getResultsByStudent(studentId) {
        return this.getResults().filter(r => r.studentId === studentId);
    },

    async deleteResult(id) {
        const results = this.getResults().filter(r => r.id !== id);
        localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));

        // Sync to MySQL API (Try HTTP DELETE then Fallback POST for CWP hosting)
        try {
            const res = await fetch(`/api/results/${encodeURIComponent(id)}`, { method: 'DELETE' });
            if (!res.ok) {
                await fetch('/api/results', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'delete', id })
                });
            }
        } catch (e) {
            try {
                await fetch('/api/results', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'delete', id })
                });
            } catch (err) {}
        }
    },

    // --- MATERIALS & MATERIAL_QUESTIONS CRUD ---
    getMaterials(filters = {}) {
        try {
            let list = JSON.parse(localStorage.getItem(STORAGE_KEYS.MATERIALS)) || [];
            if (filters.kelas && filters.kelas !== 'all') {
                list = list.filter(m => m.kelas === filters.kelas);
            }
            if (filters.subject && filters.subject !== 'all') {
                list = list.filter(m => m.subject === filters.subject);
            }
            if (filters.status && filters.status !== 'all') {
                list = list.filter(m => m.status === filters.status);
            }
            return list.sort((a, b) => (a.order_number || 0) - (b.order_number || 0) || new Date(b.created_at || 0) - new Date(a.created_at || 0));
        } catch (e) {
            return [];
        }
    },

    getMaterialById(id) {
        const list = this.getMaterials();
        const mat = list.find(m => m.id === id);
        if (!mat) return null;

        const mappings = this.getMaterialQuestionMappings();
        const mappedQIds = mappings.filter(mq => mq.material_id === id).map(mq => mq.question_id);
        const combinedQIds = Array.from(new Set([...(mat.questionIds || []), ...mappedQIds]));
        return { ...mat, questionIds: combinedQIds };
    },

    getNextMaterialOrderNumber(kelas, subject) {
        try {
            const materials = this.getMaterials();
            const matching = materials.filter(m => (!kelas || m.kelas === kelas) && (!subject || m.subject === subject));
            if (matching.length === 0) return 1;
            const maxOrder = Math.max(...matching.map(m => parseInt(m.order_number || m.orderNumber || 0, 10)));
            return (maxOrder > 0 ? maxOrder : matching.length) + 1;
        } catch (e) {
            return 1;
        }
    },

    getMaterialQuestionMappings() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.MATERIAL_QUESTIONS)) || [];
        } catch (e) {
            return [];
        }
    },

    async saveMaterial(materialData, questionIds = null) {
        let list = this.getMaterials();
        const now = new Date().toISOString();
        const id = materialData.id || ('mat-' + Date.now());
        
        let qIds = questionIds !== null ? questionIds : (materialData.questionIds || []);
        if (typeof qIds === 'string') {
            try { qIds = JSON.parse(qIds); } catch (e) { qIds = []; }
        }

        const vUrl = (materialData.video_url || materialData.videoUrl || '').trim();
        const vId = (materialData.video_id || materialData.videoId || (vUrl ? extractYouTubeVideoId(vUrl) : '') || '').trim();

        const formatted = {
            id,
            kelas: materialData.kelas || 'Kelas 2',
            subject: materialData.subject || 'fiqih',
            title: materialData.title || 'Materi Baru',
            description: materialData.description || '',
            content: materialData.content || '',
            learning_objectives: materialData.learning_objectives || materialData.learningObjectives || '',
            learningObjectives: materialData.learning_objectives || materialData.learningObjectives || '',
            summary: materialData.summary || '',
            video_url: vUrl,
            videoUrl: vUrl,
            video_id: vId,
            videoId: vId,
            order_number: parseInt(materialData.order_number || materialData.orderNumber || 0, 10),
            orderNumber: parseInt(materialData.order_number || materialData.orderNumber || 0, 10),
            status: materialData.status || 'draft',
            created_at: materialData.created_at || now,
            updated_at: now,
            questionIds: qIds,
            question_count: qIds.length
        };

        const existingIdx = list.findIndex(m => m.id === id);
        if (existingIdx >= 0) {
            list[existingIdx] = formatted;
        } else {
            list.unshift(formatted);
        }
        localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(list));

        // Update local material_questions mappings
        let mappings = this.getMaterialQuestionMappings().filter(mq => mq.material_id !== id);
        qIds.forEach(qid => {
            mappings.push({
                id: `mq-${id}-${qid}`,
                material_id: id,
                question_id: qid,
                created_at: now
            });
        });
        localStorage.setItem(STORAGE_KEYS.MATERIAL_QUESTIONS, JSON.stringify(mappings));

        // Sync to MySQL API
        try {
            await fetch('/api/materials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formatted)
            });
        } catch (e) {}

        return formatted;
    },

    async deleteMaterial(id) {
        let list = this.getMaterials().filter(m => m.id !== id);
        localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(list));

        let mappings = this.getMaterialQuestionMappings().filter(mq => mq.material_id !== id);
        localStorage.setItem(STORAGE_KEYS.MATERIAL_QUESTIONS, JSON.stringify(mappings));

        // Sync deletion to MySQL API
        try {
            const res = await fetch(`/api/materials/${encodeURIComponent(id)}`, { method: 'DELETE' });
            if (!res.ok) {
                await fetch('/api/materials', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'delete', id })
                });
            }
        } catch (e) {
            try {
                await fetch('/api/materials', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'delete', id })
                });
            } catch (err) {}
        }
    },

    async setMaterialStatus(id, status) {
        const mat = this.getMaterialById(id);
        if (!mat) return null;
        mat.status = status;
        mat.updated_at = new Date().toISOString();
        return await this.saveMaterial(mat);
    },

    async publishMaterial(id) {
        return await this.setMaterialStatus(id, 'published');
    },

    async unpublishMaterial(id) {
        return await this.setMaterialStatus(id, 'draft');
    },

    getMaterialQuestions(materialId) {
        const mappings = this.getMaterialQuestionMappings().filter(mq => mq.material_id === materialId);
        const qIdSet = new Set(mappings.map(mq => mq.question_id));
        const allQuestions = this.getQuestions();
        return allQuestions.filter(q => qIdSet.has(q.id));
    },

    getMaterialsForQuestion(questionId) {
        const mappings = this.getMaterialQuestionMappings().filter(mq => mq.question_id === questionId);
        const matIdSet = new Set(mappings.map(mq => mq.material_id));
        const allMaterials = this.getMaterials();
        return allMaterials.filter(m => matIdSet.has(m.id));
    },

    getMaterialsByQuestionIds(questionIds = []) {
        if (!Array.isArray(questionIds) || questionIds.length === 0) return [];
        const qIdSet = new Set(questionIds);
        const mappings = this.getMaterialQuestionMappings().filter(mq => qIdSet.has(mq.question_id));
        const matIdCountMap = {};
        mappings.forEach(mq => {
            matIdCountMap[mq.material_id] = (matIdCountMap[mq.material_id] || 0) + 1;
        });

        const allMaterials = this.getMaterials();
        const results = [];
        for (const [matId, count] of Object.entries(matIdCountMap)) {
            const mat = allMaterials.find(m => m.id === matId);
            if (mat) {
                results.push({
                    ...mat,
                    matchedQuestionCount: count
                });
            }
        }
        return results.sort((a, b) => b.matchedQuestionCount - a.matchedQuestionCount);
    },

    getUnmappedQuestions(kelas = null, subject = null) {
        const mappings = this.getMaterialQuestionMappings();
        const mappedQIdSet = new Set(mappings.map(mq => mq.question_id));
        let questions = this.getQuestions().filter(q => !mappedQIdSet.has(q.id));
        if (kelas && kelas !== 'all') {
            questions = questions.filter(q => q.kelas === kelas);
        }
        if (subject && subject !== 'all') {
            questions = questions.filter(q => q.subject === subject);
        }
        return questions;
    },

    async mapQuestionsToMaterial(materialId, questionIds = []) {
        if (!materialId || !questionIds || questionIds.length === 0) return;
        const mat = this.getMaterialById(materialId);
        if (!mat) return;
        const currentQIds = new Set(mat.questionIds || []);
        questionIds.forEach(id => currentQIds.add(id));
        mat.questionIds = Array.from(currentQIds);
        await this.saveMaterial(mat, mat.questionIds);
    },

    async unmapQuestionFromMaterial(materialId, questionId) {
        if (!materialId || !questionId) return;
        const mat = this.getMaterialById(materialId);
        if (!mat) return;
        const filteredQIds = (mat.questionIds || []).filter(id => id !== questionId);
        mat.questionIds = filteredQIds;
        await this.saveMaterial(mat, filteredQIds);
    },

    // --- ALIAS FOR CBT EXAM SESSION ---
    createExamSession(pkg, student) {
        return this.startExamSession(pkg, student);
    },

    // --- GAMIFICATION & LEARNING PROGRESS ENGINE ---
    getStudiedMaterials(studentId) {
        try {
            const key = `tka_studied_materials_${studentId}`;
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch (e) {
            return [];
        }
    },

    markMaterialStudied(studentId, materialId) {
        if (!studentId || !materialId) return;
        const studied = this.getStudiedMaterials(studentId);
        if (!studied.includes(materialId)) {
            studied.push(materialId);
            const key = `tka_studied_materials_${studentId}`;
            localStorage.setItem(key, JSON.stringify(studied));
        }
    },

    getStudentGamification(studentId) {
        const results = this.getResultsByStudent(studentId);
        const studied = this.getStudiedMaterials(studentId);

        let totalXp = 0;
        let totalStars = 0;
        let totalScoreSum = 0;
        let passedCount = 0;
        let perfectScoreCount = 0;

        // Calculate XP from actual exam results
        results.forEach(res => {
            const score = Number(res.score) || 0;
            const kkm = Number(res.kkm) || 70;
            totalScoreSum += score;

            // Base XP for finishing
            let examXp = 50;
            // Score scaled XP
            examXp += score;
            // KKM Pass bonus
            if (score >= kkm || res.status === 'LULUS') {
                examXp += 30;
                passedCount++;
            }
            // Perfect score bonus
            if (score === 100) {
                examXp += 50;
                perfectScoreCount++;
            }

            totalXp += examXp;

            // Stars
            if (score >= 90) totalStars += 3;
            else if (score >= 75) totalStars += 2;
            else if (score >= 60) totalStars += 1;
        });

        // XP from studied materials (+25 XP per material)
        totalXp += (studied.length * 25);

        const totalExams = results.length;
        const avgScore = totalExams > 0 ? Math.round(totalScoreSum / totalExams) : 0;

        // Level Hierarchy
        const levels = [
            { level: 1, title: 'Pemula Hebat', minXp: 0, maxXp: 150, badgeIcon: 'fa-seedling', color: 'emerald' },
            { level: 2, title: 'Penjelajah Cilik', minXp: 151, maxXp: 350, badgeIcon: 'fa-compass', color: 'blue' },
            { level: 3, title: 'Ksatria Belajar', minXp: 351, maxXp: 650, badgeIcon: 'fa-shield-halved', color: 'purple' },
            { level: 4, title: 'Bintang Kelas', minXp: 651, maxXp: 1050, badgeIcon: 'fa-star', color: 'amber' },
            { level: 5, title: 'Juara Akademik', minXp: 1051, maxXp: 1600, badgeIcon: 'fa-trophy', color: 'rose' },
            { level: 6, title: 'Master TKA Smart', minXp: 1601, maxXp: 99999, badgeIcon: 'fa-crown', color: 'yellow' }
        ];

        let currentLevel = levels[0];
        for (const lvl of levels) {
            if (totalXp >= lvl.minXp) {
                currentLevel = lvl;
            }
        }

        // Progress percentage to next level
        let progressPercent = 100;
        let xpNeededForNext = 0;
        if (currentLevel.level < 6) {
            const levelRange = currentLevel.maxXp - currentLevel.minXp;
            const xpInCurrentLevel = Math.max(0, totalXp - currentLevel.minXp);
            progressPercent = Math.min(100, Math.max(5, Math.round((xpInCurrentLevel / levelRange) * 100)));
            xpNeededForNext = Math.max(0, currentLevel.maxXp - totalXp);
        }

        return {
            totalXp,
            totalStars,
            level: currentLevel.level,
            levelTitle: currentLevel.title,
            levelIcon: currentLevel.badgeIcon,
            levelColor: currentLevel.color,
            progressPercent,
            xpNeededForNext,
            maxXp: currentLevel.maxXp,
            totalExams,
            avgScore,
            passedCount,
            perfectScoreCount,
            studiedMaterialsCount: studied.length
        };
    },

    getStudentBadges(studentId) {
        const gamify = this.getStudentGamification(studentId);
        const results = this.getResultsByStudent(studentId);
        const mathResults = results.filter(r => r.subject === 'matematika');
        const hasHighMath = mathResults.some(r => r.score >= 85);

        return [
            {
                id: 'badge-1',
                title: 'Langkah Pertama',
                description: 'Selesaikan latihan CBT pertamamu',
                icon: 'fa-flag-checkered',
                category: 'Memulai',
                color: 'blue',
                unlocked: gamify.totalExams >= 1,
                progressText: `${Math.min(1, gamify.totalExams)} / 1 Ujian Selesai`
            },
            {
                id: 'badge-2',
                title: 'Jagoan Matematika',
                description: 'Raih nilai ≥ 85 pada latihan Matematika',
                icon: 'fa-calculator',
                category: 'Mata Pelajaran',
                color: 'emerald',
                unlocked: hasHighMath,
                progressText: hasHighMath ? 'Tercapai! Nilai ≥ 85' : 'Raih skor ≥ 85 di Matematika'
            },
            {
                id: 'badge-3',
                title: 'Kutu Buku Cilik',
                description: 'Pelajari minimal 1 modul materi pembelajaran',
                icon: 'fa-book-open-reader',
                category: 'Materi',
                color: 'indigo',
                unlocked: gamify.studiedMaterialsCount >= 1,
                progressText: `${Math.min(1, gamify.studiedMaterialsCount)} / 1 Materi Dipelajari`
            },
            {
                id: 'badge-4',
                title: 'Lulus KKM',
                description: 'Selesaikan ujian dengan status LULUS KKM',
                icon: 'fa-circle-check',
                category: 'Prestasi',
                color: 'emerald',
                unlocked: gamify.passedCount >= 1,
                progressText: `${Math.min(1, gamify.passedCount)} / 1 Ujian Lulus`
            },
            {
                id: 'badge-5',
                title: 'Nilai Sempurna',
                description: 'Raih skor 100 sempurna pada ujian CBT',
                icon: 'fa-star',
                category: 'Prestasi',
                color: 'amber',
                unlocked: gamify.perfectScoreCount >= 1,
                progressText: gamify.perfectScoreCount >= 1 ? 'Hebat! Skor 100 diraih' : 'Raih nilai 100 di 1 ujian'
            },
            {
                id: 'badge-6',
                title: 'Pejuang Belajar',
                description: 'Selesaikan minimal 5 paket latihan atau simulasi',
                icon: 'fa-fire-flame-curved',
                category: 'Konsistensi',
                color: 'rose',
                unlocked: gamify.totalExams >= 5,
                progressText: `${Math.min(5, gamify.totalExams)} / 5 Ujian Selesai`
            },
            {
                id: 'badge-7',
                title: 'Penjelajah Materi',
                description: 'Pelajari minimal 3 modul materi pembelajaran',
                icon: 'fa-graduation-cap',
                category: 'Materi',
                color: 'purple',
                unlocked: gamify.studiedMaterialsCount >= 3,
                progressText: `${Math.min(3, gamify.studiedMaterialsCount)} / 3 Materi Dipelajari`
            },
            {
                id: 'badge-8',
                title: 'Bintang Kelas',
                description: 'Kumpulkan minimal 500 XP belajar',
                icon: 'fa-trophy',
                category: 'Level',
                color: 'gold',
                unlocked: gamify.totalXp >= 500,
                progressText: `${Math.min(500, gamify.totalXp)} / 500 XP`
            }
        ];
    },

    getDailyMissions(studentId) {
        const gamify = this.getStudentGamification(studentId);
        const results = this.getResultsByStudent(studentId);
        
        const today = new Date().toDateString();
        const examsToday = results.filter(r => new Date(r.completedAt).toDateString() === today);
        const passedToday = examsToday.some(r => r.status === 'LULUS');

        return [
            {
                id: 'mission-1',
                title: 'Kerjakan 1 Paket Latihan Mandiri',
                description: 'Latih kemampuanmu mengerjakan soal CBT dengan santai',
                rewardXp: 50,
                icon: 'fa-pen-to-square',
                completed: examsToday.length >= 1 || results.length >= 1,
                progress: examsToday.length >= 1 || results.length >= 1 ? 1 : 0,
                total: 1,
                actionRoute: 'exam-practice',
                actionLabel: 'Latihan Soal'
            },
            {
                id: 'mission-2',
                title: 'Pelajari 1 Modul Materi Pembelajaran',
                description: 'Baca ringkasan dan konsep penting mata pelajaran',
                rewardXp: 30,
                icon: 'fa-book-bookmark',
                completed: gamify.studiedMaterialsCount >= 1,
                progress: Math.min(1, gamify.studiedMaterialsCount),
                total: 1,
                actionRoute: 'student-materials',
                actionLabel: 'Buka Materi'
            },
            {
                id: 'mission-3',
                title: 'Ikuti Simulasi Ujian & Lulus (≥ KKM)',
                description: 'Tunjukkan kesiapan CBT resmi dengan melampaui batas KKM',
                rewardXp: 75,
                icon: 'fa-award',
                completed: passedToday || gamify.passedCount >= 1,
                progress: passedToday || gamify.passedCount >= 1 ? 1 : 0,
                total: 1,
                actionRoute: 'exam-simulation',
                actionLabel: 'Simulasi Ujian'
            }
        ];
    }
};

// Initialize storage & sync background
storageService.init();
