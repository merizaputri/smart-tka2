// Student Profile Page Component (Profil Saya)

import { storageService } from '../services/storageService.js';

export function renderStudentProfilePage(container, currentUser, onNavigate, onUserUpdated) {
    const gamify = storageService.getStudentGamification(currentUser.id);
    let isEditingPassword = false;
    let successMessage = '';
    let errorMessage = '';

    function renderView() {
        container.innerHTML = `
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                
                <!-- Profile Header Card -->
                <div class="bg-gradient-to-r from-brand-800 via-indigo-800 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
                    <div class="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                        <div class="relative">
                            <img src="${currentUser.avatar}" alt="${currentUser.name}" class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white p-1 border-4 border-white/40 shadow-xl object-cover">
                            <span class="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-amber-400 text-slate-900 font-outfit font-black text-xs shadow-md border-2 border-white">
                                Lvl ${gamify.level}
                            </span>
                        </div>

                        <div class="text-center sm:text-left flex-grow">
                            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-brand-100 font-bold text-xs mb-2 backdrop-blur-sm">
                                <i class="fa-solid fa-graduation-cap"></i> ${currentUser.kelas || 'Siswa SD'} • NISN: ${currentUser.nisn || '-'}
                            </div>
                            <h2 class="font-outfit font-black text-2xl sm:text-3xl tracking-tight">
                                ${currentUser.name}
                            </h2>
                            <p class="text-brand-100 text-xs sm:text-sm mt-1">
                                Gelar: <strong class="text-amber-300 font-bold">${gamify.levelTitle}</strong> (${gamify.totalXp} XP • ⭐ ${gamify.totalStars} Bintang)
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Alert Feedback (if any) -->
                ${successMessage ? `
                    <div class="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-2">
                        <i class="fa-solid fa-circle-check text-base text-emerald-600"></i>
                        <span>${successMessage}</span>
                    </div>
                ` : ''}

                ${errorMessage ? `
                    <div class="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 font-bold text-xs flex items-center gap-2">
                        <i class="fa-solid fa-circle-exclamation text-base text-rose-600"></i>
                        <span>${errorMessage}</span>
                    </div>
                ` : ''}

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    
                    <!-- Left: Profile Details -->
                    <div class="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                        <div class="border-b border-slate-100 pb-4">
                            <h3 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                                <i class="fa-solid fa-id-card text-brand-600"></i> Informasi Siswa
                            </h3>
                            <p class="text-xs text-slate-500 mt-0.5">Data identitas akun siswa di platform CBT TKA Smart Exam</p>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div class="text-[10px] font-bold text-slate-400 uppercase">Nama Lengkap</div>
                                <div class="font-bold text-sm text-slate-800 mt-1">${currentUser.name}</div>
                            </div>
                            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div class="text-[10px] font-bold text-slate-400 uppercase">NISN</div>
                                <div class="font-bold text-sm text-slate-800 mt-1 font-mono">${currentUser.nisn}</div>
                            </div>
                            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div class="text-[10px] font-bold text-slate-400 uppercase">Tingkat Kelas</div>
                                <div class="font-bold text-sm text-brand-700 mt-1">${currentUser.kelas}</div>
                            </div>
                            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div class="text-[10px] font-bold text-slate-400 uppercase">Status Akun</div>
                                <div class="font-bold text-sm text-emerald-600 mt-1 flex items-center gap-1.5">
                                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Aktif
                                </div>
                            </div>
                        </div>

                        <!-- Change Password Section -->
                        <div class="pt-4 border-t border-slate-100">
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h4 class="font-outfit font-bold text-sm text-slate-800">Keamanan & Kata Sandi</h4>
                                    <p class="text-xs text-slate-500 mt-0.5">Perbarui password masuk untuk akunmu</p>
                                </div>
                                <button id="btn-toggle-password-form" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors">
                                    ${isEditingPassword ? 'Tutup' : 'Ubah Password'}
                                </button>
                            </div>

                            ${isEditingPassword ? `
                                <form id="form-change-password" class="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                                    <div>
                                        <label class="block text-xs font-bold text-slate-700 mb-1">Password Baru</label>
                                        <input type="password" id="input-new-pass" required placeholder="Masukkan password baru" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold text-slate-700 mb-1">Konfirmasi Password Baru</label>
                                        <input type="password" id="input-conf-pass" required placeholder="Ketik ulang password baru" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100">
                                    </div>
                                    <div class="flex justify-end gap-2">
                                        <button type="submit" class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30 transition-all">
                                            Simpan Password Baru
                                        </button>
                                    </div>
                                </form>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Right: Learning Badges Mini Summary -->
                    <div class="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 flex flex-col justify-between">
                        <div>
                            <div class="border-b border-slate-100 pb-4 mb-4">
                                <h3 class="font-outfit font-black text-base text-slate-800 flex items-center gap-2">
                                    <i class="fa-solid fa-trophy text-amber-500"></i> Statistik Belajar
                                </h3>
                            </div>

                            <div class="space-y-3 text-xs">
                                <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                    <span class="text-slate-500 font-medium">Total Ujian:</span>
                                    <span class="font-bold text-slate-800">${gamify.totalExams} Kali</span>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                    <span class="text-slate-500 font-medium">Lulus KKM:</span>
                                    <span class="font-bold text-emerald-600">${gamify.passedCount} Kali</span>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                    <span class="text-slate-500 font-medium">Rata-Rata Nilai:</span>
                                    <span class="font-bold text-purple-700 font-outfit text-sm">${gamify.avgScore} / 100</span>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                    <span class="text-slate-500 font-medium">Materi Dipelajari:</span>
                                    <span class="font-bold text-indigo-700">${gamify.studiedMaterialsCount} Modul</span>
                                </div>
                            </div>
                        </div>

                        <button id="btn-profile-view-achievements" class="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-outfit font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                            <i class="fa-solid fa-award"></i>
                            <span>Buka Halaman Prestasi</span>
                        </button>
                    </div>

                </div>

            </div>
        `;

        attachListeners();
    }

    function attachListeners() {
        document.getElementById('btn-toggle-password-form')?.addEventListener('click', () => {
            isEditingPassword = !isEditingPassword;
            successMessage = '';
            errorMessage = '';
            renderView();
        });

        document.getElementById('btn-profile-view-achievements')?.addEventListener('click', () => {
            if (onNavigate) onNavigate('student-achievements');
        });

        document.getElementById('form-change-password')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newPass = document.getElementById('input-new-pass')?.value?.trim();
            const confPass = document.getElementById('input-conf-pass')?.value?.trim();

            if (!newPass || newPass.length < 3) {
                errorMessage = 'Password minimal terdiri dari 3 karakter.';
                renderView();
                return;
            }

            if (newPass !== confPass) {
                errorMessage = 'Konfirmasi password baru tidak cocok.';
                renderView();
                return;
            }

            try {
                const updatedUser = { ...currentUser, password: newPass };
                await storageService.saveUser(updatedUser);
                storageService.setCurrentUser(updatedUser);
                if (onUserUpdated) onUserUpdated(updatedUser);
                isEditingPassword = false;
                errorMessage = '';
                successMessage = 'Password berhasil diperbarui!';
                renderView();
            } catch (err) {
                errorMessage = 'Gagal memperbarui password: ' + err.message;
                renderView();
            }
        });
    }

    renderView();
}
