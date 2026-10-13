// Main Application Controller & Router for TKA Smart Exam

import { storageService } from './services/storageService.js';
import { renderNavbar } from './components/Navbar.js';
import { renderLoginPage } from './pages/LoginPage.js';
import { renderStudentDashboardPage } from './pages/StudentDashboardPage.js';
import { renderExamMenuPage } from './pages/ExamMenuPage.js';
import { renderExamEnginePage } from './pages/ExamEnginePage.js';
import { renderResultPage } from './pages/ResultPage.js';
import { renderAdminDashboardPage } from './pages/AdminDashboardPage.js';
import { renderStudentMaterialPage } from './pages/StudentMaterialPage.js';
import { renderStudentResultsPage } from './pages/StudentResultsPage.js';
import { renderStudentAchievementsPage } from './pages/StudentAchievementsPage.js';
import { renderStudentHistoryPage } from './pages/StudentHistoryPage.js';
import { renderStudentProfilePage } from './pages/StudentProfilePage.js';
import { renderStudentHelpPage } from './pages/StudentHelpPage.js';

class App {
    constructor() {
        this.currentUser = null;
        this.currentView = 'login';
        this.viewStateData = null;
    }

    init() {
        try {
            // Seed initial data and storage
            storageService.init();

            // Check stored session
            this.currentUser = storageService.getCurrentUser();

            // Check if there is an ongoing CBT Exam Session
            const activeExam = storageService.getActiveExamSession();
            if (this.currentUser && activeExam && activeExam.studentId === this.currentUser.id) {
                this.currentView = 'exam-engine';
            } else if (this.currentUser) {
                this.currentView = this.currentUser.role === 'admin' ? 'admin-dashboard' : 'student-dashboard';
            } else {
                this.currentView = 'login';
            }
        } catch (e) {
            console.error("App Init Error:", e);
            localStorage.removeItem('tka_active_exam_v1');
            this.currentView = 'login';
        }

        this.render();
    }

    navigateTo(viewName, data = null) {
        this.currentView = viewName;
        this.viewStateData = data;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    logout() {
        storageService.logout();
        this.currentUser = null;
        this.currentView = 'login';
        this.render();
    }

    render() {
        const appView = document.getElementById('app-view');
        if (!appView) return;

        try {
            // Render Navbar Header & Sidebar
            renderNavbar(
                this.currentUser,
                this.currentView,
                (targetView, data) => this.navigateTo(targetView, data),
                () => this.logout()
            );

            // View Router
            switch (this.currentView) {
                case 'login':
                    renderLoginPage(appView, (user) => {
                        this.currentUser = user;
                        this.navigateTo(user.role === 'admin' ? 'admin-dashboard' : 'student-dashboard');
                    });
                    break;

                case 'student-dashboard':
                    if (!this.currentUser) return this.navigateTo('login');
                    renderStudentDashboardPage(
                        appView,
                        this.currentUser,
                        (targetView, data) => this.navigateTo(targetView, data),
                        (resultObj) => this.navigateTo('result-page', resultObj)
                    );
                    break;

                case 'student-materials':
                    if (!this.currentUser) return this.navigateTo('login');
                    renderStudentMaterialPage(
                        appView,
                        this.currentUser,
                        (targetView, data) => this.navigateTo(targetView, data),
                        this.viewStateData?.materialId || null
                    );
                    break;

                case 'exam-simulation':
                    if (!this.currentUser) return this.navigateTo('login');
                    renderExamMenuPage(
                        appView,
                        this.currentUser,
                        (session) => this.navigateTo('exam-engine', session),
                        (targetView, data) => this.navigateTo(targetView, data),
                        { mode: 'simulasi', ...this.viewStateData }
                    );
                    break;

                case 'exam-practice':
                    if (!this.currentUser) return this.navigateTo('login');
                    renderExamMenuPage(
                        appView,
                        this.currentUser,
                        (session) => this.navigateTo('exam-engine', session),
                        (targetView, data) => this.navigateTo(targetView, data),
                        { mode: 'latihan', ...this.viewStateData }
                    );
                    break;

                case 'exam-menu':
                    if (!this.currentUser) return this.navigateTo('login');
                    renderExamMenuPage(
                        appView,
                        this.currentUser,
                        (session) => this.navigateTo('exam-engine', session),
                        (targetView, data) => this.navigateTo(targetView, data),
                        { mode: this.viewStateData?.mode || 'simulasi', ...this.viewStateData }
                    );
                    break;

                case 'exam-engine':
                    if (!this.currentUser) return this.navigateTo('login');
                    renderExamEnginePage(
                        appView,
                        this.currentUser,
                        (resultObj) => this.navigateTo('result-page', resultObj)
                    );
                    break;

                case 'result-page':
                    if (!this.currentUser) return this.navigateTo('login');
                    renderResultPage(
                        appView,
                        this.viewStateData,
                        (targetView, data) => this.navigateTo(targetView, data)
                    );
                    break;

                case 'student-results':
                    if (!this.currentUser) return this.navigateTo('login');
                    renderStudentResultsPage(
                        appView,
                        this.currentUser,
                        (targetView, data) => this.navigateTo(targetView, data),
                        (resultObj) => this.navigateTo('result-page', resultObj)
                    );
                    break;

                case 'student-achievements':
                    if (!this.currentUser) return this.navigateTo('login');
                    renderStudentAchievementsPage(
                        appView,
                        this.currentUser,
                        (targetView, data) => this.navigateTo(targetView, data)
                    );
                    break;

                case 'student-history':
                    if (!this.currentUser) return this.navigateTo('login');
                    renderStudentHistoryPage(
                        appView,
                        this.currentUser,
                        (targetView, data) => this.navigateTo(targetView, data),
                        (resultObj) => this.navigateTo('result-page', resultObj)
                    );
                    break;

                case 'student-profile':
                    if (!this.currentUser) return this.navigateTo('login');
                    renderStudentProfilePage(
                        appView,
                        this.currentUser,
                        (targetView, data) => this.navigateTo(targetView, data),
                        (updatedUser) => { this.currentUser = updatedUser; this.render(); }
                    );
                    break;

                case 'student-help':
                    if (!this.currentUser) return this.navigateTo('login');
                    renderStudentHelpPage(
                        appView,
                        this.currentUser,
                        (targetView, data) => this.navigateTo(targetView, data)
                    );
                    break;

                case 'admin-dashboard':
                    if (!this.currentUser || this.currentUser.role !== 'admin') {
                        return this.navigateTo('login');
                    }
                    renderAdminDashboardPage(
                        appView,
                        this.currentUser,
                        (targetView, data) => this.navigateTo(targetView, data)
                    );
                    break;

                default:
                    this.navigateTo('login');
                    break;
            }
        } catch (err) {
            console.error("App Render Error, auto-recovering:", err);
            localStorage.removeItem('tka_active_exam_v1');
            if (this.currentUser) {
                this.currentView = this.currentUser.role === 'admin' ? 'admin-dashboard' : 'student-dashboard';
                renderStudentDashboardPage(appView, this.currentUser, (tv, dt) => this.navigateTo(tv, dt), (res) => this.navigateTo('result-page', res));
            } else {
                this.currentView = 'login';
                renderLoginPage(appView, (u) => { this.currentUser = u; this.navigateTo(u.role === 'admin' ? 'admin-dashboard' : 'student-dashboard'); });
            }
        }
    }
}

// Bootstrap Application
function startApp() {
    try {
        const app = new App();
        app.init();
    } catch (e) {
        console.error("Critical Bootstrap Error:", e);
        const appView = document.getElementById('app-view');
        if (appView) {
            appView.innerHTML = `
                <div class="min-h-screen flex items-center justify-center p-6 bg-slate-100">
                    <div class="p-8 max-w-md w-full bg-white rounded-3xl shadow-2xl border border-rose-200 text-center">
                        <div class="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <h2 class="text-xl font-bold text-slate-800 mb-2 font-outfit">Gagal Memuat Aplikasi</h2>
                        <p class="text-xs text-slate-600 mb-6">${e.message || 'Terjadi kesalahan saat memuat data aplikasi.'}</p>
                        <button onclick="localStorage.clear(); location.reload();" class="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-brand-500/30">
                            Reset Cache & Muat Ulang
                        </button>
                    </div>
                </div>
            `;
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}
