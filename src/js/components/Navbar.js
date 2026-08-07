// Navigation Bar Component

export function renderNavbar(currentUser, currentView, onNavigate, onLogout) {
    const navbarContainer = document.getElementById('navbar-container');
    if (!currentUser) {
        navbarContainer.innerHTML = '';
        return;
    }

    const isAdmin = currentUser.role === 'admin';

    navbarContainer.innerHTML = `
        <nav class="glass-nav sticky top-0 z-30 border-b border-slate-200 shadow-sm transition-all duration-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    
                    <!-- Logo & Title -->
                    <div class="flex items-center gap-3 cursor-pointer" id="nav-brand-logo">
                        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                            <i class="fa-solid fa-laptop-code text-lg"></i>
                        </div>
                        <div>
                            <div class="font-outfit font-extrabold text-xl bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent leading-tight">
                                TKA Smart Exam
                            </div>
                            <div class="text-[10px] font-semibold text-slate-500 tracking-wide uppercase">CBT SD Kelas 2-6</div>
                        </div>
                    </div>

                    <!-- Desktop Nav Links -->
                    <div class="hidden md:flex items-center gap-2">
                        ${!isAdmin ? `
                            <button id="nav-btn-dashboard" class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'student-dashboard' ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}">
                                <i class="fa-solid fa-house mr-1.5"></i> Dashboard
                            </button>
                            <button id="nav-btn-exams" class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'exam-menu' ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}">
                                <i class="fa-solid fa-file-pen mr-1.5"></i> Pilih Ujian
                            </button>
                        ` : `
                            <button id="nav-btn-admin" class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'admin-dashboard' ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}">
                                <i class="fa-solid fa-gauge-high mr-1.5"></i> Panel Admin
                            </button>
                        `}
                    </div>

                    <!-- User Profile & Logout -->
                    <div class="flex items-center gap-3">
                        <div class="flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-full transition-all border border-slate-200/80">
                            <img src="${currentUser.avatar}" alt="Avatar" class="w-8 h-8 rounded-full bg-white p-0.5 border border-brand-200 object-cover">
                            <div class="text-left hidden sm:block">
                                <div class="text-xs font-bold text-slate-800 leading-none">${currentUser.name}</div>
                                <div class="text-[10px] font-semibold ${isAdmin ? 'text-purple-600' : 'text-emerald-600'} leading-tight mt-0.5">
                                    ${isAdmin ? 'Administrator' : currentUser.kelas}
                                </div>
                            </div>
                        </div>

                        <button id="nav-btn-logout" class="w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 flex items-center justify-center transition-colors" title="Keluar">
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    `;

    // Attach Event Listeners
    const logoEl = document.getElementById('nav-brand-logo');
    if (logoEl) {
        logoEl.addEventListener('click', () => {
            onNavigate(isAdmin ? 'admin-dashboard' : 'student-dashboard');
        });
    }

    const dashBtn = document.getElementById('nav-btn-dashboard');
    if (dashBtn) dashBtn.addEventListener('click', () => onNavigate('student-dashboard'));

    const examBtn = document.getElementById('nav-btn-exams');
    if (examBtn) examBtn.addEventListener('click', () => onNavigate('exam-menu'));

    const adminBtn = document.getElementById('nav-btn-admin');
    if (adminBtn) adminBtn.addEventListener('click', () => onNavigate('admin-dashboard'));

    const logoutBtn = document.getElementById('nav-btn-logout');
    if (logoutBtn) logoutBtn.addEventListener('click', () => onLogout());
}
