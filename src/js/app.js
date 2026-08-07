// Main Application Controller & Router for TKA Smart Exam

import { storageService } from './services/storageService.js';
import { renderNavbar } from './components/Navbar.js';
import { renderLoginPage } from './pages/LoginPage.js';
import { renderStudentDashboardPage } from './pages/StudentDashboardPage.js';
import { renderExamMenuPage } from './pages/ExamMenuPage.js';
import { renderExamEnginePage } from './pages/ExamEnginePage.js';
import { renderResultPage } from './pages/ResultPage.js';
import { renderAdminDashboardPage } from './pages/AdminDashboardPage.js';

class App {
    constructor() {
        this.currentUser = null;
        this.currentView = 'login';
        this.viewStateData = null;
    }

    init() {
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

        // Render Navbar Header
        renderNavbar(
            this.currentUser,
            this.currentView,
            (targetView) => this.navigateTo(targetView),
            () => this.logout()
        );

        // Hide navbar during active exam session for full immersion CBT
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer) {
            if (this.currentView === 'exam-engine') {
                navbarContainer.style.display = 'none';
            } else {
                navbarContainer.style.display = 'block';
            }
        }

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
                    (targetView) => this.navigateTo(targetView),
                    (resultObj) => this.navigateTo('result-page', resultObj)
                );
                break;

            case 'exam-menu':
                if (!this.currentUser) return this.navigateTo('login');
                renderExamMenuPage(
                    appView,
                    this.currentUser,
                    (session) => this.navigateTo('exam-engine', session)
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
                    (targetView) => this.navigateTo(targetView)
                );
                break;

            case 'admin-dashboard':
                if (!this.currentUser || this.currentUser.role !== 'admin') {
                    return this.navigateTo('login');
                }
                renderAdminDashboardPage(
                    appView,
                    this.currentUser,
                    (targetView) => this.navigateTo(targetView)
                );
                break;

            default:
                this.navigateTo('login');
                break;
        }
    }
}

// Bootstrap Application
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
