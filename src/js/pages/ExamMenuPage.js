// Exam Selection & Confirmation Page

import { storageService } from '../services/storageService.js';
import { SUBJECTS, EXAM_MODES } from '../config/constants.js';

export function renderExamMenuPage(container, currentUser, onStartExam) {
    const packages = storageService.getPackages();
    let selectedSubject = 'all'; // 'all' or specific subject id
    let selectedPackageForModal = null;

    function renderView() {
        const studentClass = currentUser.kelas || 'Kelas 5';
        
        // Filter packages for this student's grade & selected subject
        const availablePackages = packages.filter(pkg => {
            const matchesClass = pkg.kelas === studentClass || !pkg.kelas;
            const matchesSubject = selectedSubject === 'all' || pkg.subject === selectedSubject;
            return matchesClass && matchesSubject;
        });

        container.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                
                <!-- Page Title -->
                <div class="mb-8">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 font-bold text-xs mb-2">
                        <i class="fa-solid fa-list-check"></i> Menu Ujian CBT • ${studentClass}
                    </div>
                    <h2 class="font-outfit font-black text-3xl text-slate-800 tracking-tight">Pilih Paket Ujian TKA</h2>
                    <p class="text-slate-500 text-sm mt-1">Pilih mata pelajaran dan paket soal yang ingin kamu kerjakan untuk latihan.</p>
                </div>

                <!-- Subject Filter Bar -->
                <div class="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
                    <button data-subject="all" class="subject-tab-btn px-4 py-2.5 rounded-2xl font-outfit text-xs font-bold transition-all whitespace-nowrap ${selectedSubject === 'all' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
                        <i class="fa-solid fa-layer-group mr-1.5"></i> Semua Mapel
                    </button>
                    ${SUBJECTS.map(subj => `
                        <button data-subject="${subj.id}" class="subject-tab-btn px-4 py-2.5 rounded-2xl font-outfit text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${selectedSubject === subj.id ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
                            <i class="fa-solid ${subj.icon}"></i> ${subj.name}
                        </button>
                    `).join('')}
                </div>

                <!-- Package Cards Grid -->
                ${availablePackages.length === 0 ? `
                    <div class="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl mb-3">
                            <i class="fa-solid fa-folder-open"></i>
                        </div>
                        <h3 class="font-outfit font-bold text-slate-700 text-lg">Belum Ada Paket Soal Tersedia</h3>
                        <p class="text-xs text-slate-500 max-w-sm mx-auto mt-1">Paket soal untuk mata pelajaran ini sedang dipersiapkan oleh Admin.</p>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${availablePackages.map(pkg => {
                            const subj = SUBJECTS.find(s => s.id === pkg.subject) || { name: pkg.subject, icon: 'fa-book' };
                            const isSimulation = pkg.mode === 'simulasi';
                            const questionCount = pkg.questionIds ? pkg.questionIds.length : 0;

                            return `
                                <div class="bg-white rounded-3xl border border-slate-200 hover:border-brand-300 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group">
                                    <div class="p-6">
                                        <!-- Header badges -->
                                        <div class="flex items-center justify-between gap-2 mb-4">
                                            <span class="px-3 py-1 rounded-full text-xs font-extrabold ${subj.badgeBg || 'bg-brand-50'} ${subj.badgeText || 'text-brand-700'} border ${subj.border || 'border-brand-200'} flex items-center gap-1.5">
                                                <i class="fa-solid ${subj.icon}"></i> ${subj.name}
                                            </span>
                                            <span class="px-3 py-1 rounded-full text-[11px] font-extrabold ${isSimulation ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'}">
                                                ${isSimulation ? '⚡ Mode Simulasi' : '📚 Mode Latihan'}
                                            </span>
                                        </div>

                                        <h3 class="font-outfit font-extrabold text-xl text-slate-800 group-hover:text-brand-600 transition-colors leading-snug mb-3">
                                            ${pkg.name}
                                        </h3>

                                        <!-- Features Pills -->
                                        <div class="grid grid-cols-3 gap-2 my-4 text-center">
                                            <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                                <div class="text-[10px] text-slate-400 font-bold uppercase">Jumlah Soal</div>
                                                <div class="font-outfit font-black text-slate-800 text-base mt-0.5">${questionCount} Soal</div>
                                            </div>
                                            <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                                <div class="text-[10px] text-slate-400 font-bold uppercase">Durasi Timer</div>
                                                <div class="font-outfit font-black text-slate-800 text-base mt-0.5">${pkg.durationMinutes || 15} Menit</div>
                                            </div>
                                            <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                                                <div class="text-[10px] text-slate-400 font-bold uppercase">Nilai KKM</div>
                                                <div class="font-outfit font-black text-emerald-600 text-base mt-0.5">${pkg.kkm || 70}</div>
                                            </div>
                                        </div>

                                        <p class="text-xs text-slate-500 line-clamp-2">
                                            ${pkg.instructions || 'Ujian CBT dengan timer otomatis dan jawaban tersimpan real-time.'}
                                        </p>
                                    </div>

                                    <!-- Bottom Action -->
                                    <div class="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                                        <div class="text-xs font-semibold text-slate-500">
                                            <i class="fa-solid fa-clock text-slate-400 mr-1"></i> ${pkg.durationMinutes} m
                                        </div>
                                        <button data-pkg-id="${pkg.id}" class="btn-open-confirm px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-outfit font-bold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center gap-1.5">
                                            Mulai Ujian <i class="fa-solid fa-arrow-right text-[10px]"></i>
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}

            </div>
        `;

        // Attach Subject Tab Event Listeners
        container.querySelectorAll('.subject-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedSubject = btn.getAttribute('data-subject');
                renderView();
            });
        });

        // Attach Start Exam Modal Launchers
        container.querySelectorAll('.btn-open-confirm').forEach(btn => {
            btn.addEventListener('click', () => {
                const pkgId = btn.getAttribute('data-pkg-id');
                const pkg = packages.find(p => p.id === pkgId);
                if (pkg) showConfirmationModal(pkg);
            });
        });
    }

    function showConfirmationModal(pkg) {
        const subj = SUBJECTS.find(s => s.id === pkg.subject) || { name: pkg.subject };
        const questionCount = pkg.questionIds ? pkg.questionIds.length : 0;
        const isSimulation = pkg.mode === 'simulasi';

        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
            <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 animate-in zoom-in-95">
                    
                    <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                        <div>
                            <span class="text-xs font-bold text-brand-600 uppercase tracking-wider">Konfirmasi Ujian CBT</span>
                            <h3 class="font-outfit font-black text-2xl text-slate-800 leading-tight">${pkg.name}</h3>
                        </div>
                        <button id="conf-modal-close" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <!-- Details Summary Grid -->
                    <div class="grid grid-cols-2 gap-3 mb-5">
                        <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <div class="text-[11px] font-bold text-slate-400 uppercase">Mata Pelajaran</div>
                            <div class="font-semibold text-slate-800 text-sm mt-0.5">${subj.name}</div>
                        </div>
                        <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <div class="text-[11px] font-bold text-slate-400 uppercase">Mode Ujian</div>
                            <div class="font-bold text-sm mt-0.5 ${isSimulation ? 'text-rose-600' : 'text-emerald-600'}">
                                ${isSimulation ? 'Mode Simulasi TKA' : 'Mode Latihan'}
                            </div>
                        </div>
                        <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <div class="text-[11px] font-bold text-slate-400 uppercase">Jumlah Soal</div>
                            <div class="font-bold text-slate-800 text-sm mt-0.5">${questionCount} Soal Pilihan Ganda</div>
                        </div>
                        <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                            <div class="text-[11px] font-bold text-slate-400 uppercase">Waktu pengerjaan</div>
                            <div class="font-bold text-slate-800 text-sm mt-0.5">${pkg.durationMinutes || 15} Menit (Countdown)</div>
                        </div>
                    </div>

                    <!-- CBT Rules -->
                    <div class="bg-brand-50/70 border border-brand-200 rounded-2xl p-4 mb-6 text-xs text-brand-900 space-y-2">
                        <div class="font-extrabold text-brand-900 flex items-center gap-1.5 text-sm">
                            <i class="fa-solid fa-clipboard-check text-brand-600"></i> Aturan & Petunjuk Pengerjaan:
                        </div>
                        <ul class="list-disc list-inside space-y-1 text-slate-700">
                            <li>Waktu ujian akan <strong>langsung menghitung mundur</strong> setelah tombol Mulai diklik.</li>
                            <li>Timer tetap berjalan meskipun halaman tidak sengaja ditutup atau di-refresh.</li>
                            <li>Jawaban akan <strong>tersimpan otomatis</strong> setiap kali kamu memilih opsi A, B, C, D.</li>
                            <li>Gunakan tombol <strong>Tandai Ragu-ragu</strong> untuk soal yang ingin ditinjau kembali.</li>
                            <li>Jika waktu habis, ujian akan <strong>otomatis dikirimkan (auto-submit)</strong>.</li>
                        </ul>
                    </div>

                    <div class="flex gap-3">
                        <button id="conf-modal-cancel" class="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50">
                            Batal
                        </button>
                        <button id="conf-modal-start" class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-outfit font-bold text-base shadow-lg shadow-emerald-600/30">
                            <i class="fa-solid fa-play mr-1"></i> Klik Mulai Ujian
                        </button>
                    </div>

                </div>
            </div>
        `;

        document.getElementById('conf-modal-close').addEventListener('click', () => { modalContainer.innerHTML = ''; });
        document.getElementById('conf-modal-cancel').addEventListener('click', () => { modalContainer.innerHTML = ''; });

        document.getElementById('conf-modal-start').addEventListener('click', () => {
            modalContainer.innerHTML = '';
            // Launch exam session in storage
            const session = storageService.startExamSession(pkg, currentUser);
            if (onStartExam) onStartExam(session);
        });
    }

    renderView();
}
