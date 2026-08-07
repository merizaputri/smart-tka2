// Persistent Hybrid Storage Adapter & CBT State Engine (MySQL REST API + LocalStorage Fallback)

import { STORAGE_KEYS, DEFAULT_ADMIN } from '../config/constants.js';
import { INITIAL_STUDENTS, INITIAL_QUESTIONS, INITIAL_PACKAGES, INITIAL_RESULTS } from '../data/initialData.js';

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

            if (usersRes.ok) {
                const users = await usersRes.json();
                if (users.length > 0) {
                    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
                } else {
                    const localUsers = this.getUsers();
                    localUsers.forEach(u => {
                        fetch('/api/users', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(u)
                        }).catch(() => {});
                    });
                }
            }

            if (questionsRes.ok) {
                const dbQuestions = await questionsRes.json();
                const dbQuestionIds = new Set(dbQuestions.map(q => q.id));
                const localQuestions = this.getQuestions();

                localQuestions.forEach(q => {
                    if (!dbQuestionIds.has(q.id)) {
                        fetch('/api/questions', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(q)
                        }).catch(() => {});
                    }
                });

                const combinedMap = new Map();
                localQuestions.forEach(q => combinedMap.set(q.id, q));
                dbQuestions.forEach(q => combinedMap.set(q.id, q));
                localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(Array.from(combinedMap.values())));
            }

            if (packagesRes.ok) {
                const dbPackages = await packagesRes.json();
                const dbPackageIds = new Set(dbPackages.map(p => p.id));
                const localPackages = this.getPackages();

                localPackages.forEach(p => {
                    if (!dbPackageIds.has(p.id)) {
                        fetch('/api/packages', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(p)
                        }).catch(() => {});
                    }
                });

                const combinedMap = new Map();
                localPackages.forEach(p => combinedMap.set(p.id, p));
                dbPackages.forEach(p => combinedMap.set(p.id, p));
                localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(Array.from(combinedMap.values())));
            }

            if (resultsRes.ok) {
                const results = await resultsRes.json();
                if (results.length > 0) localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
            }
        } catch (e) {
            // MySQL server unreachable, silently fallback to localStorage
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

    saveUser(user) {
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

        // Sync to MySQL API in background
        fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).catch(() => {});

        return user;
    },

    deleteUser(id) {
        const users = this.getUsers().filter(u => u.id !== id);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

        // Sync to MySQL API in background
        fetch(`/api/users/${id}`, { method: 'DELETE' }).catch(() => {});
    },

    importUsers(userList) {
        const currentUsers = this.getUsers();
        let addedCount = 0;
        userList.forEach(newUser => {
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

                    // Sync each to MySQL API
                    fetch('/api/users', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(uObj)
                    }).catch(() => {});
                }
            }
        });
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(currentUsers));
        return addedCount;
    },

    // --- QUESTIONS CRUD ---
    getQuestions() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUESTIONS)) || [];
        } catch (e) {
            return [];
        }
    },

    saveQuestion(question) {
        const questions = this.getQuestions();
        if (question.id) {
            const index = questions.findIndex(q => q.id === question.id);
            if (index !== -1) questions[index] = { ...questions[index], ...question };
        } else {
            question.id = 'q-' + Date.now();
            questions.push(question);
        }
        localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));

        // Sync to MySQL API in background
        fetch('/api/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(question)
        }).catch(() => {});

        return question;
    },

    deleteQuestion(id) {
        const questions = this.getQuestions().filter(q => q.id !== id);
        localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));

        // Sync to MySQL API in background
        fetch(`/api/questions/${id}`, { method: 'DELETE' }).catch(() => {});
    },

    // --- PACKAGES CRUD ---
    getPackages() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.PACKAGES)) || [];
        } catch (e) {
            return [];
        }
    },

    savePackage(pkg) {
        const packages = this.getPackages();
        if (pkg.id) {
            const index = packages.findIndex(p => p.id === pkg.id);
            if (index !== -1) packages[index] = { ...packages[index], ...pkg };
        } else {
            pkg.id = 'pkg-' + Date.now();
            packages.push(pkg);
        }
        localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));

        // Sync to MySQL API in background
        fetch('/api/packages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pkg)
        }).catch(() => {});

        return pkg;
    },

    deletePackage(id) {
        const packages = this.getPackages().filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));

        // Sync to MySQL API in background
        fetch(`/api/packages/${id}`, { method: 'DELETE' }).catch(() => {});
    },

    // --- CBT ACTIVE EXAM SESSION & TIMER PERSISTENCE ---
    startExamSession(pkg, student) {
        const allQuestions = this.getQuestions();
        let selectedQuestions = allQuestions.filter(q => pkg.questionIds.includes(q.id));

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

        // Sync to MySQL API in background
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
    }
};

// Initialize storage & sync background
storageService.init();
