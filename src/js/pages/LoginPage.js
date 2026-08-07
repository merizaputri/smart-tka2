// Login Page Component (Siswa & Admin)

import { storageService } from '../services/storageService.js';
import { renderPasswordResetModal } from '../components/Modals.js';

export function renderLoginPage(container, onLoginSuccess) {
    let activeTab = 'siswa'; // 'siswa' or 'admin'

    function updateView() {
        container.innerHTML = `
            <div class="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-gradient-to-br from-brand-50 via-slate-50 to-emerald-50 relative overflow-hidden">
                
                <!-- Background Decorative Circles -->
                <div class="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-200/40 blur-3xl pointer-events-none"></div>
                <div class="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none"></div>

                <!-- Main Login Card -->
                <div class="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-6 sm:p-8 relative z-10">
                    
                    <!-- Header Branding -->
                    <div class="text-center mb-6">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-400 text-white shadow-lg shadow-brand-500/30 mb-3 transform hover:scale-105 transition-transform">
                            <i class="fa-solid fa-graduation-cap text-3xl"></i>
                        </div>
                        <h1 class="font-outfit font-extrabold text-3xl text-slate-800 tracking-tight">TKA Smart Exam</h1>
                        <p class="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Media Latihan CBT SD Kelas 2 - 6</p>
                    </div>

                    <!-- Role Tab Switcher -->
                    <div class="flex p-1 bg-slate-100 rounded-2xl mb-6 border border-slate-200/80">
                        <button id="tab-siswa" class="flex-1 py-2.5 rounded-xl font-outfit text-sm font-bold transition-all ${activeTab === 'siswa' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}">
                            <i class="fa-solid fa-user-graduate mr-1.5"></i> Login Siswa
                        </button>
                        <button id="tab-admin" class="flex-1 py-2.5 rounded-xl font-outfit text-sm font-bold transition-all ${activeTab === 'admin' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}">
                            <i class="fa-solid fa-user-shield mr-1.5"></i> Login Admin
                        </button>
                    </div>

                    <!-- Form Error Alert Container -->
                    <div id="login-error-alert" class="hidden mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                        <i class="fa-solid fa-circle-exclamation text-base"></i>
                        <span id="login-error-msg"></span>
                    </div>

                    <!-- Login Form -->
                    <form id="login-form" class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                                ${activeTab === 'siswa' ? 'NISN / Nama Siswa' : 'Username Admin'}
                            </label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                                    <i class="fa-solid ${activeTab === 'siswa' ? 'fa-id-card' : 'fa-user-lock'}"></i>
                                </span>
                                <input type="text" id="login-input-user" required placeholder="${activeTab === 'siswa' ? 'Masukkan NISN atau Nama Siswa' : 'Masukkan Admin ID (misal: ADMIN001)'}" 
                                       class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-slate-800 font-medium text-sm transition-all bg-slate-50/50">
                            </div>
                        </div>

                        <div>
                            <div class="flex justify-between items-center mb-1.5">
                                <label class="block text-xs font-bold text-slate-700 uppercase tracking-wide">Password</label>
                                ${activeTab === 'siswa' ? `
                                    <button type="button" id="btn-forgot-password" class="text-xs text-brand-600 font-semibold hover:underline">
                                        Lupa Password?
                                    </button>
                                ` : ''}
                            </div>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                                    <i class="fa-solid fa-lock"></i>
                                </span>
                                <input type="password" id="login-input-pass" required placeholder="Masukkan Password" 
                                       class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-slate-800 font-medium text-sm transition-all bg-slate-50/50">
                            </div>
                        </div>

                        <button type="submit" class="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-outfit font-bold text-base shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all">
                            Masuk Ke Ujian <i class="fa-solid fa-arrow-right-to-bracket ml-2"></i>
                        </button>
                    </form>

                    <!-- Demo Quick Fill Buttons -->
                    <div class="mt-6 pt-5 border-t border-slate-100">
                        <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 text-center">
                            ⚡ Klik Akun Demo Instan:
                        </div>
                        <div class="flex flex-wrap gap-2 justify-center">
                            ${activeTab === 'siswa' ? `
                                <button type="button" class="demo-fill-btn text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-colors" data-user="0012345678" data-pass="123">
                                    👦 Budi (Kelas 5)
                                </button>
                                <button type="button" class="demo-fill-btn text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold px-2.5 py-1.5 rounded-lg border border-purple-200 transition-colors" data-user="0012345679" data-pass="123">
                                    👧 Siti (Kelas 5)
                                </button>
                                <button type="button" class="demo-fill-btn text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold px-2.5 py-1.5 rounded-lg border border-amber-200 transition-colors" data-user="0045678902" data-pass="123">
                                    👦 Rian (Kelas 2)
                                </button>
                            ` : `
                                <button type="button" class="demo-fill-btn text-xs bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold px-3 py-1.5 rounded-lg border border-brand-200 transition-colors" data-user="ADMIN001" data-pass="admin123">
                                    🔑 Master Admin (ADMIN001)
                                </button>
                            `}
                        </div>
                    </div>

                </div>

                <div class="mt-6 text-center text-xs text-slate-500 font-medium">
                    &copy; 2026 TKA Smart Exam • Sistem CBT Sekolah Dasar Terpadu
                </div>
            </div>
        `;

        // Attach listeners
        document.getElementById('tab-siswa').addEventListener('click', () => {
            activeTab = 'siswa';
            updateView();
        });

        document.getElementById('tab-admin').addEventListener('click', () => {
            activeTab = 'admin';
            updateView();
        });

        const forgotBtn = document.getElementById('btn-forgot-password');
        if (forgotBtn) {
            forgotBtn.addEventListener('click', () => renderPasswordResetModal());
        }

        // Demo fill click
        container.querySelectorAll('.demo-fill-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const u = btn.getAttribute('data-user');
                const p = btn.getAttribute('data-pass');
                document.getElementById('login-input-user').value = u;
                document.getElementById('login-input-pass').value = p;
                document.getElementById('login-form').dispatchEvent(new Event('submit'));
            });
        });

        // Form Submit
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const userInput = document.getElementById('login-input-user').value;
            const passInput = document.getElementById('login-input-pass').value;

            const user = storageService.authenticate(userInput, passInput);
            if (user) {
                // Verify role match
                if (activeTab === 'admin' && user.role !== 'admin') {
                    showError("Akun ini bukan merupakan akun Administrator.");
                    return;
                }
                if (activeTab === 'siswa' && user.role === 'admin') {
                    // Admin logging in from student tab -> allow or switch
                }

                storageService.setCurrentUser(user);
                onLoginSuccess(user);
            } else {
                showError("NISN/Username atau Password tidak cocok.");
            }
        });
    }

    function showError(msg) {
        const alertEl = document.getElementById('login-error-alert');
        const msgEl = document.getElementById('login-error-msg');
        if (alertEl && msgEl) {
            msgEl.textContent = msg;
            alertEl.classList.remove('hidden');
        }
    }

    updateView();
}
