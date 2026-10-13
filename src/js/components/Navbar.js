// Gamified Learning Platform - Global Left Sidebar & Responsive Navigation Component

import { storageService } from '../services/storageService.js';

export function renderNavbar(currentUser, currentView, onNavigate, onLogout) {
    const navbarContainer = document.getElementById('navbar-container');
    const appView = document.getElementById('app-view');

    if (!currentUser) {
        if (navbarContainer) navbarContainer.innerHTML = '';
        if (appView) appView.className = 'flex-grow flex flex-col';
        return;
    }

    const isAdmin = currentUser.role === 'admin';
    const isExamSession = currentView === 'exam-engine';

    if (isExamSession) {
        if (navbarContainer) navbarContainer.innerHTML = '';
        if (appView) appView.className = 'flex-grow flex flex-col';
        return;
    }

    // Adjust app-view padding on desktop for left permanent sidebar
    if (appView) {
        appView.className = 'flex-grow flex flex-col lg:pl-64 transition-all duration-200';
    }

    // Get live student gamification data
    const gamify = !isAdmin ? storageService.getStudentGamification(currentUser.id) : null;

    navbarContainer.innerHTML = `
        <!-- Top App Bar for Mobile & Tablet (Hidden on Desktop) -->
        <header class="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-xs flex items-center justify-between">
            <div class="flex items-center gap-3">
                <button id="mobile-drawer-open-btn" class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors focus:ring-2 focus:ring-brand-500">
                    <i class="fa-solid fa-bars text-base"></i>
                </button>
                <div class="flex items-center gap-2 cursor-pointer" id="mobile-nav-brand">
                    <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-sm">
                        <i class="fa-solid fa-graduation-cap text-base"></i>
                    </div>
                    <div>
                        <div class="font-outfit font-black text-sm text-slate-800 leading-tight">TKA Smart</div>
                        <div class="text-[9px] font-bold text-brand-600 uppercase tracking-wider">${isAdmin ? 'Admin Panel' : (currentUser.kelas || 'SD')}</div>
                    </div>
                </div>
            </div>

            <!-- Mobile XP & Star Pill -->
            ${!isAdmin && gamify ? `
                <div class="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full text-xs font-black text-amber-700 shadow-2xs">
                    <i class="fa-solid fa-star text-amber-500 text-xs"></i>
                    <span>${gamify.totalStars}</span>
                    <span class="text-slate-300 mx-0.5">•</span>
                    <span class="text-[11px] text-indigo-700 font-bold">${gamify.totalXp} XP</span>
                </div>
            ` : `
                <div class="flex items-center gap-2">
                    <img src="${currentUser.avatar}" class="w-8 h-8 rounded-full border border-slate-200">
                </div>
            `}
        </header>

        <!-- Mobile Drawer Backdrop -->
        <div id="mobile-drawer-backdrop" class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 hidden transition-opacity lg:hidden"></div>

        <!-- Left Permanent Sidebar (Desktop) / Offcanvas Drawer (Mobile) -->
        <aside id="main-sidebar" class="fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/90 shadow-sm flex flex-col justify-between transition-transform duration-300 ease-in-out -translate-x-full lg:translate-x-0">
            
            <!-- Sidebar Top Content -->
            <div class="flex flex-col flex-grow overflow-y-auto sidebar-scrollbar">
                
                <!-- Brand Logo Section -->
                <div class="p-5 border-b border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-3 cursor-pointer" id="sidebar-brand-logo">
                        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center font-black shadow-md shadow-brand-500/20 transform hover:scale-105 transition-transform">
                            <i class="fa-solid fa-graduation-cap text-lg"></i>
                        </div>
                        <div>
                            <div class="font-outfit font-black text-lg bg-gradient-to-r from-brand-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent leading-tight tracking-tight">
                                TKA Smart
                            </div>
                            <div class="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                                ${isAdmin ? 'Portal Guru & Admin' : 'CBT SD Kelas 2-6'}
                            </div>
                        </div>
                    </div>

                    <!-- Mobile Drawer Close Button -->
                    <button id="mobile-drawer-close-btn" class="lg:hidden w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors">
                        <i class="fa-solid fa-xmark text-sm"></i>
                    </button>
                </div>

                <!-- Student Profile & Gamification Capsule (Student Mode) -->
                ${!isAdmin && gamify ? `
                    <div class="p-4 mx-3 my-3 bg-gradient-to-br from-brand-50 via-indigo-50/60 to-purple-50 rounded-2xl border border-brand-100/80 shadow-2xs">
                        <div class="flex items-center gap-3 mb-2.5">
                            <div class="relative">
                                <img src="${currentUser.avatar}" alt="${currentUser.name}" class="w-11 h-11 rounded-2xl bg-white p-0.5 border-2 border-brand-300 object-cover shadow-xs">
                                <span class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-900 font-outfit font-black text-[10px] flex items-center justify-center shadow-xs border border-white">
                                    ${gamify.level}
                                </span>
                            </div>
                            <div class="min-w-0 flex-grow">
                                <div class="font-outfit font-black text-xs text-slate-800 truncate" title="${currentUser.name}">
                                    ${currentUser.name}
                                </div>
                                <div class="flex items-center gap-1.5 mt-0.5">
                                    <span class="px-1.5 py-0.5 rounded-md bg-brand-200/70 text-brand-900 font-bold text-[9px]">
                                        ${currentUser.kelas}
                                    </span>
                                    <span class="text-[10px] font-bold text-indigo-700 truncate">
                                        Lvl ${gamify.level}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- XP Progress Mini Bar -->
                        <div class="space-y-1">
                            <div class="flex items-center justify-between text-[10px] font-bold">
                                <span class="text-indigo-600 flex items-center gap-1">
                                    <i class="fa-solid fa-bolt text-amber-500"></i> ${gamify.totalXp} XP
                                </span>
                                <span class="text-amber-600 flex items-center gap-1">
                                    <i class="fa-solid fa-star text-amber-400"></i> ${gamify.totalStars}
                                </span>
                            </div>
                            <div class="w-full h-2 rounded-full bg-white border border-brand-200 overflow-hidden">
                                <div class="h-full xp-progress-bar rounded-full" style="width: ${gamify.progressPercent}%"></div>
                            </div>
                        </div>
                    </div>
                ` : `
                    <!-- Admin Capsule -->
                    <div class="p-4 mx-3 my-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                        <img src="${currentUser.avatar}" class="w-10 h-10 rounded-2xl bg-white p-0.5 border border-purple-300">
                        <div class="min-w-0 flex-grow">
                            <div class="font-outfit font-bold text-xs text-slate-800 truncate">${currentUser.name}</div>
                            <div class="text-[10px] font-extrabold text-purple-700 uppercase tracking-wide">Administrator</div>
                        </div>
                    </div>
                `}

                <!-- Sidebar Navigation Menu Links -->
                <nav class="px-3 space-y-6 flex-grow py-2">
                    
                    ${!isAdmin ? `
                        <!-- GROUP 1: BELAJAR -->
                        <div>
                            <div class="px-3 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Belajar
                            </div>
                            <div class="space-y-1">
                                <button class="nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-outfit text-xs font-bold transition-all ${currentView === 'student-dashboard' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}" data-route="student-dashboard">
                                    <i class="fa-solid fa-house w-4 text-center text-sm ${currentView === 'student-dashboard' ? 'text-white' : 'text-brand-600'}"></i>
                                    <span>Beranda</span>
                                </button>

                                <button class="nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-outfit text-xs font-bold transition-all ${currentView === 'student-materials' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}" data-route="student-materials">
                                    <i class="fa-solid fa-book-bookmark w-4 text-center text-sm ${currentView === 'student-materials' ? 'text-white' : 'text-indigo-600'}"></i>
                                    <span>Materi Belajar</span>
                                </button>

                                <button class="nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-outfit text-xs font-bold transition-all ${currentView === 'exam-simulation' || currentView === 'exam-menu' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}" data-route="exam-simulation">
                                    <i class="fa-solid fa-bolt w-4 text-center text-sm ${currentView === 'exam-simulation' || currentView === 'exam-menu' ? 'text-white' : 'text-rose-600'}"></i>
                                    <span>Simulasi Ujian</span>
                                </button>

                                <button class="nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-outfit text-xs font-bold transition-all ${currentView === 'exam-practice' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}" data-route="exam-practice">
                                    <i class="fa-solid fa-pen-ruler w-4 text-center text-sm ${currentView === 'exam-practice' ? 'text-white' : 'text-emerald-600'}"></i>
                                    <span>Latihan Soal</span>
                                </button>
                            </div>
                        </div>

                        <!-- GROUP 2: PERKEMBANGAN -->
                        <div>
                            <div class="px-3 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Perkembangan
                            </div>
                            <div class="space-y-1">
                                <button class="nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-outfit text-xs font-bold transition-all ${currentView === 'student-results' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}" data-route="student-results">
                                    <i class="fa-solid fa-chart-line w-4 text-center text-sm ${currentView === 'student-results' ? 'text-white' : 'text-purple-600'}"></i>
                                    <span>Hasil Belajarku</span>
                                </button>

                                <button class="nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-outfit text-xs font-bold transition-all ${currentView === 'student-achievements' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}" data-route="student-achievements">
                                    <i class="fa-solid fa-award w-4 text-center text-sm ${currentView === 'student-achievements' ? 'text-white' : 'text-amber-500'}"></i>
                                    <span>Prestasi & Lencana</span>
                                </button>

                                <button class="nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-outfit text-xs font-bold transition-all ${currentView === 'student-history' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}" data-route="student-history">
                                    <i class="fa-solid fa-clock-rotate-left w-4 text-center text-sm ${currentView === 'student-history' ? 'text-white' : 'text-slate-500'}"></i>
                                    <span>Riwayat Ujian</span>
                                </button>
                            </div>
                        </div>

                        <!-- GROUP 3: LAINNYA -->
                        <div>
                            <div class="px-3 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Lainnya
                            </div>
                            <div class="space-y-1">
                                <button class="nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-outfit text-xs font-bold transition-all ${currentView === 'student-profile' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}" data-route="student-profile">
                                    <i class="fa-solid fa-user-gear w-4 text-center text-sm ${currentView === 'student-profile' ? 'text-white' : 'text-slate-500'}"></i>
                                    <span>Profil Saya</span>
                                </button>

                                <button class="nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-outfit text-xs font-bold transition-all ${currentView === 'student-help' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}" data-route="student-help">
                                    <i class="fa-solid fa-circle-question w-4 text-center text-sm ${currentView === 'student-help' ? 'text-white' : 'text-slate-500'}"></i>
                                    <span>Bantuan</span>
                                </button>
                            </div>
                        </div>
                    ` : `
                        <!-- ADMIN MENU GROUP -->
                        <div>
                            <div class="px-3 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                                Panel Administrator
                            </div>
                            <div class="space-y-1">
                                <button class="nav-item w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-outfit text-xs font-bold transition-all ${currentView === 'admin-dashboard' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}" data-route="admin-dashboard">
                                    <i class="fa-solid fa-gauge-high w-4 text-center text-sm"></i>
                                    <span>Dashboard Admin</span>
                                </button>
                            </div>
                        </div>
                    `}

                </nav>

            </div>

            <!-- Sidebar Footer & Logout -->
            <div class="p-3 border-t border-slate-100 bg-slate-50/50">
                <button id="sidebar-btn-logout" class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-outfit font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors">
                    <span class="flex items-center gap-2.5">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        <span>Keluar Akun</span>
                    </span>
                    <i class="fa-solid fa-chevron-right text-[10px] text-rose-400"></i>
                </button>
            </div>

        </aside>
    `;

    // --- Sidebar Drawer Functions & Event Listeners ---
    const sidebar = document.getElementById('main-sidebar');
    const backdrop = document.getElementById('mobile-drawer-backdrop');

    function openMobileDrawer() {
        if (sidebar && backdrop) {
            sidebar.classList.remove('-translate-x-full');
            backdrop.classList.remove('hidden');
        }
    }

    function closeMobileDrawer() {
        if (sidebar && backdrop) {
            sidebar.classList.add('-translate-x-full');
            backdrop.classList.add('hidden');
        }
    }

    document.getElementById('mobile-drawer-open-btn')?.addEventListener('click', openMobileDrawer);
    document.getElementById('mobile-drawer-close-btn')?.addEventListener('click', closeMobileDrawer);
    backdrop?.addEventListener('click', closeMobileDrawer);

    // Brand logo clicks
    const handleBrandClick = () => {
        closeMobileDrawer();
        onNavigate(isAdmin ? 'admin-dashboard' : 'student-dashboard');
    };
    document.getElementById('sidebar-brand-logo')?.addEventListener('click', handleBrandClick);
    document.getElementById('mobile-nav-brand')?.addEventListener('click', handleBrandClick);

    // Navigation Item Clicks
    navbarContainer.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const route = btn.getAttribute('data-route');
            closeMobileDrawer();
            onNavigate(route);
        });
    });

    // Logout Click
    document.getElementById('sidebar-btn-logout')?.addEventListener('click', () => {
        closeMobileDrawer();
        onLogout();
    });
}

