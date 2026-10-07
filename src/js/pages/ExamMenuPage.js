// Exam Selection & Confirmation Page

import { storageService } from '../services/storageService.js';
import { CLASSES, SUBJECTS, EXAM_MODES } from '../config/constants.js';

export function renderExamMenuPage(container, currentUser, onStartExam) {
    const packages = storageService.getPackages();
    let selectedSubject = 'all'; // 'all' or specific subject id
    let selectedMode = 'all'; // 'all' | 'simulasi' | 'latihan'
    let selectedClass = currentUser.kelas || 'Kelas 5';
    let searchQuery = '';

    function renderView() {
        // Filter packages based on class, subject, mode, and search query
        const availablePackages = packages.filter(pkg => {
            const matchesClass = selectedClass === 'all' || pkg.kelas === selectedClass || !pkg.kelas;
            const matchesSubject = selectedSubject === 'all' || pkg.subject === selectedSubject;
            const matchesMode = selectedMode === 'all' || pkg.mode === selectedMode;
            const matchesSearch = !searchQuery || (pkg.name || '').toLowerCase().includes(searchQuery.toLowerCase());
            return matchesClass && matchesSubject && matchesMode && matchesSearch;
        });

        // Quick stats for student
        const totalSimulasi = packages.filter(p => (selectedClass === 'all' || p.kelas === selectedClass) && p.mode === 'simulasi').length;
        const totalLatihan = packages.filter(p => (selectedClass === 'all' || p.kelas === selectedClass) && p.mode === 'latihan').length;

        container.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                
                <!-- Page Title & Greeting -->
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
                    <div class="relative z-10">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 font-bold text-xs mb-2 border border-brand-400/30">
                            <i class="fa-solid fa-graduation-cap"></i> CBT Exam Portal • ${currentUser.kelas || 'Siswa'}
                        </div>
                        <h2 class="font-outfit font-black text-2xl sm:text-3xl tracking-tight">Pilih Paket Ujian TKA</h2>
                        <p class="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                            Halo <strong class="text-white">${currentUser.name || 'Siswa'}</strong>, pilih paket soal simulasi atau latihan di bawah untuk menguji kemampuan akademikmu.
                        </p>
                    </div>

                    <!-- Quick Mode Stats Badge -->
                    <div class="flex items-center gap-2.5 relative z-10">
                        <div class="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                            <div class="text-[10px] uppercase font-bold text-rose-300">Simulasi TKA</div>
                            <div class="font-outfit font-black text-xl text-white">${totalSimulasi} <span class="text-xs font-normal text-slate-300">Paket</span></div>
                        </div>
                        <div class="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                            <div class="text-[10px] uppercase font-bold text-emerald-300">Mode Latihan</div>
                            <div class="font-outfit font-black text-xl text-white">${totalLatihan} <span class="text-xs font-normal text-slate-300">Paket</span></div>
                        </div>
                    </div>
                </div>

                <!-- Main Filter Toolbar -->
                <div class="bg-white border border-slate-200 rounded-3xl p-5 mb-8 shadow-sm space-y-4">
                    <!-- Top Row: Search, Class, and Mode -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <!-- Search Box -->
                        <div class="relative sm:col-span-2 lg:col-span-2">
                            <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                            <input 
                                type="text" 
                                id="student-filter-search" 
                                placeholder="Cari judul paket ujian..." 
                                value="${searchQuery}"
                                class="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-slate-700 bg-slate-50 focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                            />
                        </div>

                        <!-- Class Filter -->
                        <div>
                            <select id="student-filter-class" class="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:bg-white focus:border-brand-500 outline-none">
                                <option value="all" ${selectedClass === 'all' ? 'selected' : ''}>🎓 Semua Kelas</option>
                                ${CLASSES.map(c => `<option value="${c}" ${selectedClass === c ? 'selected' : ''}>${c}</option>`).join('')}
                            </select>
                        </div>

                        <!-- Mode Filter Dropdown/Switcher -->
                        <div>
                            <select id="student-filter-mode" class="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:bg-white focus:border-brand-500 outline-none">
                                <option value="all" ${selectedMode === 'all' ? 'selected' : ''}>🎯 Semua Mode Ujian</option>
                                <option value="simulasi" ${selectedMode === 'simulasi' ? 'selected' : ''}>⚡ Mode Simulasi TKA</option>
                                <option value="latihan" ${selectedMode === 'latihan' ? 'selected' : ''}>📚 Mode Latihan</option>
                            </select>
                        </div>
                    </div>

                    <!-- Bottom Row: Subject Filter Pills -->
                    <div class="pt-3 border-t border-slate-100">
                        <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">Pilih Mata Pelajaran:</div>
                        <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                            <button data-subject="all" class="subject-tab-btn px-4 py-2 rounded-xl font-outfit text-xs font-bold transition-all whitespace-nowrap ${selectedSubject === 'all' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}">
                                <i class="fa-solid fa-layer-group mr-1.5"></i> Semua Mapel
                            </button>
                            ${SUBJECTS.map(subj => `
                                <button data-subject="${subj.id}" class="subject-tab-btn px-4 py-2 rounded-xl font-outfit text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${selectedSubject === subj.id ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}">
                                    <i class="fa-solid ${subj.icon}"></i> ${subj.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Active Filters Reset Bar (if applied) -->
                    ${(selectedSubject !== 'all' || selectedMode !== 'all' || (selectedClass !== currentUser.kelas && selectedClass !== 'all') || searchQuery) ? `
                        <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                            <div class="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                                <span class="font-bold text-slate-700">Filter:</span>
                                ${selectedClass !== 'all' ? `<span class="px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 font-semibold border border-brand-200">${selectedClass}</span>` : ''}
                                ${selectedSubject !== 'all' ? `<span class="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-semibold border border-purple-200">${(SUBJECTS.find(s=>s.id===selectedSubject)||{}).name || selectedSubject}</span>` : ''}
                                ${selectedMode !== 'all' ? `<span class="px-2 py-0.5 rounded-md ${selectedMode === 'simulasi' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'} font-semibold">${selectedMode === 'simulasi' ? 'Simulasi' : 'Latihan'}</span>` : ''}
                                ${searchQuery ? `<span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">"${searchQuery}"</span>` : ''}
                            </div>
                            <button id="student-btn-reset-filters" class="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1">
                                <i class="fa-solid fa-rotate-left text-[10px]"></i> Reset Filter
                            </button>
                        </div>
                    ` : ''}
                </div>

                <!-- Package Cards Grid -->
                ${availablePackages.length === 0 ? `
                    <div class="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                        <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl mb-3">
                            <i class="fa-solid fa-folder-open"></i>
                        </div>
                        <h3 class="font-outfit font-black text-slate-700 text-xl">Belum Ada Paket Soal Tersedia</h3>
                        <p class="text-xs text-slate-500 max-w-sm mx-auto mt-1">Tidak ada paket ujian yang cocok dengan kriteria filter pilihanmu. Coba ubah mata pelajaran atau reset filter.</p>
                        <div class="mt-4">
                            <button id="student-btn-reset-filters-empty" class="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-outfit font-bold text-xs shadow-md transition-all">
                                <i class="fa-solid fa-rotate-left mr-1.5"></i> Tampilkan Semua Paket
                            </button>
                        </div>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${availablePackages.map(pkg => {
                            const subj = SUBJECTS.find(s => s.id === pkg.subject) || { name: pkg.subject, icon: 'fa-book', badgeBg: 'bg-brand-50', badgeText: 'text-brand-700', border: 'border-brand-200' };
                            const isSimulation = pkg.mode === 'simulasi';
                            const questionCount = pkg.questionIds ? pkg.questionIds.length : 0;

                            return `
                                <div class="bg-white rounded-3xl border border-slate-200 hover:border-brand-400 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group">
                                    <div class="p-6">
                                        <!-- Header badges -->
                                        <div class="flex items-center justify-between gap-2 mb-4">
                                            <span class="px-3 py-1 rounded-full text-xs font-extrabold ${subj.badgeBg || 'bg-brand-50'} ${subj.badgeText || 'text-brand-700'} border ${subj.border || 'border-brand-200'} flex items-center gap-1.5">
                                                <i class="fa-solid ${subj.icon}"></i> ${subj.name}
                                            </span>
                                            <div class="flex items-center gap-1.5">
                                                <span class="px-2.5 py-1 rounded-full text-[11px] font-extrabold ${isSimulation ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'}">
                                                    ${isSimulation ? '⚡ Simulasi TKA' : '📚 Latihan'}
                                                </span>
                                                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                                    ${pkg.kelas || 'Semua Kelas'}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 class="font-outfit font-black text-xl text-slate-800 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2 mb-3">
                                            ${pkg.name}
                                        </h3>

                                        <!-- Features Pills -->
                                        <div class="grid grid-cols-3 gap-2 my-4 text-center">
                                            <div class="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                                                <div class="text-[9px] text-slate-400 font-bold uppercase">Jumlah Soal</div>
                                                <div class="font-outfit font-black text-slate-800 text-base mt-0.5">${questionCount} Soal</div>
                                            </div>
                                            <div class="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                                                <div class="text-[9px] text-slate-400 font-bold uppercase">Waktu Timer</div>
                                                <div class="font-outfit font-black text-slate-800 text-base mt-0.5">${pkg.durationMinutes || 15} Menit</div>
                                            </div>
                                            <div class="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                                                <div class="text-[9px] text-slate-400 font-bold uppercase">Nilai KKM</div>
                                                <div class="font-outfit font-black text-emerald-600 text-base mt-0.5">${pkg.kkm || 70}</div>
                                            </div>
                                        </div>

                                        <p class="text-xs text-slate-500 line-clamp-2">
                                            ${pkg.instructions || 'Ujian CBT interaktif dengan timer countdown otomatis, acak soal & jawaban real-time.'}
                                        </p>
                                    </div>

                                    <!-- Bottom Action -->
                                    <div class="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                                        <div class="text-xs font-semibold text-slate-500">
                                            <i class="fa-solid fa-clock text-slate-400 mr-1"></i> ${pkg.durationMinutes || 15} Menit
                                        </div>
                                        <button data-pkg-id="${pkg.id}" class="btn-open-confirm px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-outfit font-bold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center gap-1.5 group-hover:scale-105">
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

        // Search Input Listener
        const searchInput = document.getElementById('student-filter-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                renderView();
                const newInp = document.getElementById('student-filter-search');
                if (newInp) {
                    newInp.focus();
                    newInp.setSelectionRange(newInp.value.length, newInp.value.length);
                }
            });
        }

        // Class Filter Listener
        document.getElementById('student-filter-class')?.addEventListener('change', (e) => {
            selectedClass = e.target.value;
            renderView();
        });

        // Mode Filter Listener
        document.getElementById('student-filter-mode')?.addEventListener('change', (e) => {
            selectedMode = e.target.value;
            renderView();
        });

        // Reset Filters Handler
        const resetFiltersHandler = () => {
            selectedSubject = 'all';
            selectedMode = 'all';
            selectedClass = currentUser.kelas || 'Kelas 5';
            searchQuery = '';
            renderView();
        };
        document.getElementById('student-btn-reset-filters')?.addEventListener('click', resetFiltersHandler);
        document.getElementById('student-btn-reset-filters-empty')?.addEventListener('click', resetFiltersHandler);

        // Subject Tab Event Listeners
        container.querySelectorAll('.subject-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedSubject = btn.getAttribute('data-subject');
                renderView();
            });
        });

        // Start Exam Modal Launchers
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
