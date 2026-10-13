// Gamified Exam Simulation & Practice Hub (Learning World Subject & Package Cards)
// TKA Smart Exam - SD Kelas 2-6 (Simulasi Ujian CBT & Latihan Soal)

import { storageService } from '../services/storageService.js';
import { CLASSES, SUBJECTS, getSubjectTheme } from '../config/constants.js';

export function renderExamMenuPage(container, currentUser, onStartExam, onNavigate, viewStateData = null) {
    const packages = storageService.getPackages();
    const allQuestions = storageService.getQuestions();
    const studentResults = storageService.getResultsByStudent(currentUser?.id);
    const activeExam = storageService.getActiveExamSession();
    
    // Determine active page mode: 'simulasi' (Simulasi Ujian) or 'latihan' (Latihan Soal)
    const fixedMode = (viewStateData?.mode === 'latihan' || viewStateData?.defaultMode === 'latihan') ? 'latihan' : 'simulasi';
    const isPracticeMode = fixedMode === 'latihan';

    let selectedSubject = viewStateData?.defaultSubject || 'all';
    let selectedClass = currentUser?.kelas || 'Kelas 2';
    let searchQuery = '';

    // Helper: Find student history for a package or topic
    function getStudentHistory(pkgId, pkgName) {
        if (!studentResults || studentResults.length === 0) return null;
        const matches = studentResults.filter(r => r.packageId === pkgId || (pkgName && r.packageName === pkgName));
        if (matches.length === 0) return null;
        matches.sort((a, b) => new Date(b.date || b.timestamp || 0) - new Date(a.date || a.timestamp || 0));
        const latest = matches[0];
        const bestScore = Math.max(...matches.map(m => Number(m.score) || 0));
        return {
            latest,
            bestScore,
            attemptsCount: matches.length
        };
    }

    // Helper: Generate star rating HTML
    function renderStarRating(score, isAttempted = true) {
        if (!isAttempted) {
            return `
                <div class="flex items-center gap-1 text-slate-300 text-xs" title="Belum pernah dikerjakan">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
            `;
        }
        let stars = 0;
        if (score >= 90) stars = 3;
        else if (score >= 75) stars = 2;
        else if (score >= 60) stars = 1;

        return `
            <div class="flex items-center gap-1 text-xs star-glow" title="Nilai: ${score} (${stars} Bintang)">
                <i class="fa-solid fa-star ${stars >= 1 ? 'text-amber-400' : 'text-slate-300'}"></i>
                <i class="fa-solid fa-star ${stars >= 2 ? 'text-amber-400' : 'text-slate-300'}"></i>
                <i class="fa-solid fa-star ${stars >= 3 ? 'text-amber-400' : 'text-slate-300'}"></i>
            </div>
        `;
    }

    function renderView() {
        // Mode Packages strictly filtered
        const modePackages = packages.filter(pkg => pkg.mode === fixedMode);

        // Filter packages by class, subject, and search query
        const filteredPackages = modePackages.filter(pkg => {
            const matchesClass = selectedClass === 'all' || pkg.kelas === selectedClass || !pkg.kelas;
            const matchesSubject = selectedSubject === 'all' || pkg.subject === selectedSubject;
            const matchesSearch = !searchQuery || (pkg.name || '').toLowerCase().includes(searchQuery.toLowerCase());
            return matchesClass && matchesSubject && matchesSearch;
        });

        // For Practice Mode: Also discover topics (bab) from question database
        let availableTopics = [];
        if (isPracticeMode) {
            const classQuestions = allQuestions.filter(q => selectedClass === 'all' || q.kelas === selectedClass);
            const subjQuestions = selectedSubject === 'all' ? classQuestions : classQuestions.filter(q => q.subject === selectedSubject);
            
            // Group questions by subject & bab
            const topicMap = {};
            subjQuestions.forEach(q => {
                const sId = q.subject || 'umum';
                const bab = q.bab || 'Materi Umum';
                const key = `${sId}___${bab}`;
                if (!topicMap[key]) {
                    topicMap[key] = {
                        subject: sId,
                        bab: bab,
                        kelas: q.kelas,
                        questions: [],
                        difficultyCounts: { 'Mudah': 0, 'Sedang': 0, 'Sulit': 0 }
                    };
                }
                topicMap[key].questions.push(q);
                const diff = q.difficulty || 'Sedang';
                topicMap[key].difficultyCounts[diff] = (topicMap[key].difficultyCounts[diff] || 0) + 1;
            });

            availableTopics = Object.values(topicMap).filter(t => {
                if (!searchQuery) return true;
                return t.bab.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       getSubjectTheme(t.subject).name.toLowerCase().includes(searchQuery.toLowerCase());
            });
        }

        const totalAvailable = filteredPackages.length;
        const totalCompletedInMode = modePackages.filter(p => {
            const hist = getStudentHistory(p.id, p.name);
            return hist && hist.attemptsCount > 0;
        }).length;

        container.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 animate-in fade-in duration-300">
                
                <!-- 1. Hero Title & Gamified Header Banner -->
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${isPracticeMode ? 'bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 border border-emerald-800/40' : 'bg-gradient-to-r from-brand-900 via-indigo-950 to-purple-950 border border-indigo-800/40'} text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
                    
                    <!-- Decorative Background Elements -->
                    <div class="absolute -right-16 -top-16 w-72 h-72 ${isPracticeMode ? 'bg-emerald-500/20' : 'bg-brand-500/20'} rounded-full blur-3xl pointer-events-none"></div>
                    <div class="absolute right-8 bottom-3 text-8xl text-white/5 pointer-events-none hidden md:block">
                        <i class="fa-solid ${isPracticeMode ? 'fa-pen-ruler' : 'fa-stopwatch'}"></i>
                    </div>

                    <div class="relative z-10 max-w-2xl space-y-2">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full ${isPracticeMode ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' : 'bg-brand-500/20 text-brand-300 border-brand-400/30'} font-extrabold text-xs border backdrop-blur-md">
                            <i class="fa-solid ${isPracticeMode ? 'fa-pen-to-square' : 'fa-bolt text-amber-300'}"></i>
                            <span>${isPracticeMode ? 'Modul Latihan Mandiri' : 'Simulasi Ujian Resmi CBT'} • ${selectedClass === 'all' ? 'Semua Jenjang' : selectedClass}</span>
                        </div>
                        
                        <h1 class="font-outfit font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white leading-tight">
                            ${isPracticeMode ? 'Arena Latihan Soal Mandiri ✏️' : 'Simulasi Ujian TKA CBT ⚡'}
                        </h1>
                        
                        <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
                            ${isPracticeMode 
                                ? 'Asah pemahaman materi per topik tanpa tekanan waktu berlebih. Kunci jawaban dan pembahasan mendalam langsung tersedia untuk memantapkan konsep.' 
                                : 'Rasakan pengalaman ujian CBT sesungguhnya dengan countdown timer terstandar, batas KKM resmi, dan penilaian langsung untuk melatih ketangkasan.'
                            }
                        </p>
                    </div>

                    <!-- Gamified Stat Capsules -->
                    <div class="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
                        <div class="px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[130px] shadow-sm">
                            <div class="text-[10px] uppercase font-extrabold ${isPracticeMode ? 'text-emerald-300' : 'text-amber-300'} tracking-wider">
                                ${isPracticeMode ? 'Paket Latihan' : 'Paket Simulasi'}
                            </div>
                            <div class="font-outfit font-black text-2xl text-white mt-0.5">
                                ${totalAvailable} <span class="text-xs font-normal text-slate-300">Tersedia</span>
                            </div>
                        </div>

                        <div class="px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[130px] shadow-sm">
                            <div class="text-[10px] uppercase font-extrabold text-indigo-300 tracking-wider">
                                Selesai Dikerjakan
                            </div>
                            <div class="font-outfit font-black text-2xl text-white mt-0.5">
                                ${totalCompletedInMode} <span class="text-xs font-normal text-slate-300">Paket</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2. Filters & Search Toolbar -->
                <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <!-- Search Box -->
                        <div class="relative sm:col-span-2">
                            <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                            <input 
                                type="text" 
                                id="exam-filter-search" 
                                placeholder="${isPracticeMode ? 'Cari topik latihan, mata pelajaran, atau bab...' : 'Cari paket simulasi ujian, mata pelajaran...'}" 
                                value="${searchQuery}"
                                class="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-slate-700 bg-slate-50 focus:bg-white focus:border-brand-500 outline-none transition-all"
                            />
                        </div>

                        <!-- Class Filter -->
                        <div>
                            <select id="exam-filter-class" class="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:border-brand-500">
                                <option value="all" ${selectedClass === 'all' ? 'selected' : ''}>🎓 Semua Jenjang Kelas</option>
                                ${CLASSES.map(c => `<option value="${c}" ${selectedClass === c ? 'selected' : ''}>${c}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <!-- Subject Tabs Filter (Learning World Style) -->
                    <div class="pt-3 border-t border-slate-100">
                        <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pilih Pulau Mata Pelajaran:</div>
                        <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                            <button data-subject="all" class="subject-tab-btn px-4 py-2 rounded-xl font-outfit text-xs font-bold transition-all whitespace-nowrap ${selectedSubject === 'all' ? (isPracticeMode ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25' : 'bg-brand-600 text-white shadow-md shadow-brand-600/25') : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}">
                                <i class="fa-solid fa-layer-group mr-1.5"></i> Semua Mapel (${modePackages.length})
                            </button>
                            ${SUBJECTS.map(subj => {
                                const theme = getSubjectTheme(subj.id);
                                const count = modePackages.filter(p => p.subject === subj.id).length;
                                const isActive = selectedSubject === subj.id;
                                return `
                                    <button data-subject="${subj.id}" class="subject-tab-btn px-4 py-2 rounded-xl font-outfit text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${isActive ? (isPracticeMode ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25' : 'bg-brand-600 text-white shadow-md shadow-brand-600/25') : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}">
                                        <i class="fa-solid ${theme.icon}"></i>
                                        <span>${theme.name}</span>
                                        <span class="text-[10px] ${isActive ? 'text-white/80' : 'text-slate-400'}">(${count})</span>
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Active Filters Reset Bar -->
                    ${(selectedSubject !== 'all' || (selectedClass !== currentUser?.kelas && selectedClass !== 'all') || searchQuery) ? `
                        <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                            <div class="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                                <span class="font-bold text-slate-700">Filter Aktif:</span>
                                ${selectedClass !== 'all' ? `<span class="px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 font-semibold border border-brand-200">${selectedClass}</span>` : ''}
                                ${selectedSubject !== 'all' ? `<span class="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-semibold border border-purple-200">${(SUBJECTS.find(s=>s.id===selectedSubject)||{}).name}</span>` : ''}
                                ${searchQuery ? `<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-semibold border border-amber-200">"${searchQuery}"</span>` : ''}
                            </div>
                            <button id="exam-btn-reset-filters" class="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1">
                                <i class="fa-solid fa-rotate-left text-[10px]"></i> Reset Filter
                            </button>
                        </div>
                    ` : ''}
                </div>

                <!-- 3. MAIN CARDS GRID (RESPONSIVE: 3 cols desktop, 2 cols tablet, 1 col mobile) -->
                ${!isPracticeMode ? `
                    <!-- ============================================================== -->
                    <!-- SIMULASI UJIAN: GRID KARTU PAKET UJIAN CBT PER MATA PELAJARAN -->
                    <!-- ============================================================== -->
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                                <i class="fa-solid fa-bolt text-rose-600"></i>
                                <span>Daftar Paket Simulasi CBT (${filteredPackages.length} Paket)</span>
                            </h2>
                        </div>

                        ${filteredPackages.length === 0 ? `
                            <div class="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-3">
                                <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                                    <i class="fa-solid fa-folder-open"></i>
                                </div>
                                <h3 class="font-outfit font-black text-slate-700 text-xl">
                                    Belum Ada Paket Simulasi
                                </h3>
                                <p class="text-xs text-slate-500 max-w-sm mx-auto">
                                    Tidak ada paket simulasi yang cocok dengan filter "${selectedClass}". Coba ubah mata pelajaran atau reset filter.
                                </p>
                                <div class="pt-2">
                                    <button id="exam-btn-reset-empty" class="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-outfit font-bold text-xs shadow-md transition-all">
                                        <i class="fa-solid fa-rotate-left mr-1.5"></i> Tampilkan Semua Simulasi
                                    </button>
                                </div>
                            </div>
                        ` : `
                            <!-- Desktop 3 cols, Tablet 2 cols, Mobile 1 col -->
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                ${filteredPackages.map(pkg => renderSimulationCardHtml(pkg)).join('')}
                            </div>
                        `}
                    </div>
                ` : `
                    <!-- ============================================================== -->
                    <!-- LATIHAN SOAL: GRID KARTU PER MATA PELAJARAN & TOPIK SOAL -->
                    <!-- ============================================================== -->
                    <div class="space-y-8">
                        
                        <!-- A. Paket Latihan Resmi Tersedia -->
                        <div>
                            <div class="flex items-center justify-between mb-4">
                                <h2 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                                    <i class="fa-solid fa-pen-ruler text-emerald-600"></i>
                                    <span>Paket Latihan Terstruktur (${filteredPackages.length} Paket)</span>
                                </h2>
                            </div>

                            ${filteredPackages.length === 0 ? `
                                <div class="p-6 bg-white rounded-3xl border border-slate-200 text-center text-xs text-slate-500">
                                    Belum ada paket latihan khusus untuk jenjang ${selectedClass}. Kamu bisa mencoba topik latihan mandiri di bawah ini!
                                </div>
                            ` : `
                                <!-- Desktop 3 cols, Tablet 2 cols, Mobile 1 col -->
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    ${filteredPackages.map(pkg => renderPracticePackageCardHtml(pkg)).join('')}
                                </div>
                            `}
                        </div>

                        <!-- B. Pilihan Topik Latihan Soal dari Bank Soal (Dynamic Topics) -->
                        ${availableTopics.length > 0 ? `
                            <div class="pt-4 border-t border-slate-200">
                                <div class="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                                            <i class="fa-solid fa-layer-group text-brand-600"></i>
                                            <span>Asah Topik & Bab Materi (${availableTopics.length} Topik Tersedia)</span>
                                        </h2>
                                        <p class="text-xs text-slate-500 mt-0.5">Pilih topik materi tertentu untuk melatih pemahaman per bab</p>
                                    </div>
                                </div>

                                <!-- Desktop 3 cols, Tablet 2 cols, Mobile 1 col -->
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    ${availableTopics.map(topic => renderTopicPracticeCardHtml(topic)).join('')}
                                </div>
                            </div>
                        ` : ''}

                    </div>
                `}

            </div>
        `;

        // =====================================================================
        // HTML GENERATOR: KARTU SIMULASI UJIAN
        // =====================================================================
        function renderSimulationCardHtml(pkg) {
            const theme = getSubjectTheme(pkg.subject);
            const questionCount = pkg.questionIds ? pkg.questionIds.length : 0;
            const history = getStudentHistory(pkg.id, pkg.name);
            const isOngoing = activeExam && activeExam.packageId === pkg.id;

            // Status Calculation
            let statusLabel = 'Belum Dikerjakan';
            let statusBadge = 'bg-slate-100 text-slate-700 border-slate-200';
            let statusIcon = 'fa-circle-dot';
            let btnLabel = 'Mulai Ujian';
            let btnIcon = 'fa-play';
            let isAttempted = false;
            let lastScore = 0;

            if (isOngoing) {
                statusLabel = 'Sedang Dikerjakan';
                statusBadge = 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse';
                statusIcon = 'fa-clock';
                btnLabel = 'Lanjutkan CBT';
                btnIcon = 'fa-forward-step';
            } else if (history && history.attemptsCount > 0) {
                isAttempted = true;
                lastScore = history.latest.score || 0;
                const passed = lastScore >= (pkg.kkm || 70);
                statusLabel = passed ? 'Lulus Ujian' : 'Remidial';
                statusBadge = passed 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : 'bg-rose-100 text-rose-800 border-rose-300';
                statusIcon = passed ? 'fa-circle-check' : 'fa-circle-exclamation';
                btnLabel = 'Ujian Ulang';
                btnIcon = 'fa-rotate-right';
            }

            return `
                <div class="learning-world-card bg-white rounded-3xl border-2 ${theme.cardBorder} hover:border-brand-400 shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden group">
                    <div>
                        <!-- Header Banner -->
                        <div class="p-5 bg-gradient-to-r ${theme.bannerGradient} text-white relative overflow-hidden">
                            <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-lg pointer-events-none"></div>
                            
                            <div class="flex items-center justify-between gap-2 relative z-10">
                                <span class="px-3 py-1 rounded-full text-[10px] font-extrabold bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center gap-1.5">
                                    <i class="fa-solid ${theme.icon}"></i> ${theme.name}
                                </span>
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-md border border-white/30">
                                    ${pkg.kelas || 'Semua Kelas'}
                                </span>
                            </div>

                            <h3 class="font-outfit font-black text-lg text-white leading-snug mt-3 line-clamp-2 relative z-10 group-hover:scale-[1.01] transition-transform">
                                ${pkg.name}
                            </h3>
                        </div>

                        <!-- Card Body Metrics -->
                        <div class="p-6 space-y-4">
                            
                            <!-- Metrics Pills: Soal, Timer, KKM -->
                            <div class="grid grid-cols-3 gap-2 text-center">
                                <div class="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                                    <div class="text-[9px] text-slate-400 font-extrabold uppercase">Jumlah Soal</div>
                                    <div class="font-outfit font-black text-slate-800 text-sm mt-0.5">${questionCount} Butir</div>
                                </div>
                                <div class="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                                    <div class="text-[9px] text-slate-400 font-extrabold uppercase">Durasi Timer</div>
                                    <div class="font-outfit font-black text-rose-600 text-sm mt-0.5 flex items-center justify-center gap-1">
                                        <i class="fa-solid fa-stopwatch text-xs"></i>
                                        <span>${pkg.durationMinutes || 15}m</span>
                                    </div>
                                </div>
                                <div class="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                                    <div class="text-[9px] text-slate-400 font-extrabold uppercase">KKM Target</div>
                                    <div class="font-outfit font-black text-emerald-600 text-sm mt-0.5">${pkg.kkm || 70}</div>
                                </div>
                            </div>

                            <!-- Riwayat Nilai & Star Rating -->
                            <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between gap-3">
                                <div>
                                    <div class="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Hasil Terakhir:</div>
                                    ${isAttempted ? `
                                        <div class="flex items-center gap-2 mt-0.5">
                                            <span class="font-outfit font-black text-base text-slate-800">${lastScore}</span>
                                            <span class="text-xs text-slate-400">/ 100</span>
                                            <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold ${lastScore >= (pkg.kkm || 70) ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
                                                ${lastScore >= (pkg.kkm || 70) ? 'LULUS' : 'REMIDIAL'}
                                            </span>
                                        </div>
                                    ` : `
                                        <div class="text-xs font-semibold text-slate-500 mt-0.5">Belum ada riwayat</div>
                                    `}
                                </div>

                                <div class="flex flex-col items-end">
                                    <div class="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pencapaian:</div>
                                    ${renderStarRating(lastScore, isAttempted)}
                                </div>
                            </div>

                            <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                ${pkg.instructions || 'Simulasi ujian CBT interaktif dengan timer resmi hitung mundur dan evaluasi otomatis.'}
                            </p>
                        </div>
                    </div>

                    <!-- Footer Action Button -->
                    <div class="px-6 pb-6 pt-2">
                        <button data-pkg-id="${pkg.id}" class="btn-open-confirm-modal w-full py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-outfit font-black text-xs shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                            <i class="fa-solid ${btnIcon}"></i>
                            <span>${btnLabel}</span>
                            <i class="fa-solid fa-arrow-right text-[10px] ml-1 group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </div>
                </div>
            `;
        }

        // =====================================================================
        // HTML GENERATOR: KARTU PAKET LATIHAN RESMI
        // =====================================================================
        function renderPracticePackageCardHtml(pkg) {
            const theme = getSubjectTheme(pkg.subject);
            const questionCount = pkg.questionIds ? pkg.questionIds.length : 0;
            const history = getStudentHistory(pkg.id, pkg.name);
            const isAttempted = history && history.attemptsCount > 0;
            const lastScore = isAttempted ? (history.latest.score || 0) : 0;

            return `
                <div class="learning-world-card bg-white rounded-3xl border-2 ${theme.cardBorder} hover:border-emerald-400 shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden group">
                    <div>
                        <!-- Header Banner -->
                        <div class="p-5 bg-gradient-to-r ${theme.bannerGradient} text-white relative overflow-hidden">
                            <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-lg pointer-events-none"></div>
                            
                            <div class="flex items-center justify-between gap-2 relative z-10">
                                <span class="px-3 py-1 rounded-full text-[10px] font-extrabold bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center gap-1.5">
                                    <i class="fa-solid ${theme.icon}"></i> ${theme.name}
                                </span>
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-400 text-slate-900 shadow-xs">
                                    Mode Latihan
                                </span>
                            </div>

                            <h3 class="font-outfit font-black text-lg text-white leading-snug mt-3 line-clamp-2 relative z-10 group-hover:scale-[1.01] transition-transform">
                                ${pkg.name}
                            </h3>
                        </div>

                        <!-- Card Body Metrics -->
                        <div class="p-6 space-y-4">
                            <div class="grid grid-cols-2 gap-2 text-center">
                                <div class="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                                    <div class="text-[9px] text-slate-400 font-extrabold uppercase">Jumlah Soal</div>
                                    <div class="font-outfit font-black text-slate-800 text-sm mt-0.5">${questionCount} Butir</div>
                                </div>
                                <div class="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                                    <div class="text-[9px] text-slate-400 font-extrabold uppercase">Tingkat Kesulitan</div>
                                    <div class="font-outfit font-black text-emerald-600 text-sm mt-0.5">Adaptif • Sedang</div>
                                </div>
                            </div>

                            <!-- Progres / Hasil Latihan Sebelumnya -->
                            <div class="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/70 flex items-center justify-between gap-3">
                                <div>
                                    <div class="text-[9px] font-bold text-emerald-800 uppercase tracking-wider">Hasil Latihan:</div>
                                    ${isAttempted ? `
                                        <div class="font-outfit font-black text-base text-emerald-900 mt-0.5">
                                            ${lastScore} <span class="text-xs font-normal text-emerald-700">/ 100</span>
                                        </div>
                                    ` : `
                                        <div class="text-xs font-semibold text-emerald-700 mt-0.5">Belum pernah latihan</div>
                                    `}
                                </div>

                                <div class="flex flex-col items-end">
                                    <div class="text-[9px] font-bold text-emerald-800 uppercase tracking-wider mb-1">Bintang:</div>
                                    ${renderStarRating(lastScore, isAttempted)}
                                </div>
                            </div>

                            <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                ${pkg.instructions || 'Latihan mandiri tanpa tekanan waktu. Pembahasan dan kunci jawaban dapat dibuka setelah selesai.'}
                            </p>
                        </div>
                    </div>

                    <!-- Footer Action Button -->
                    <div class="px-6 pb-6 pt-2">
                        <button data-pkg-id="${pkg.id}" class="btn-open-confirm-modal w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-outfit font-black text-xs shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                            <i class="fa-solid fa-play"></i>
                            <span>${isAttempted ? 'Latihan Lagi' : 'Mulai Latihan'}</span>
                            <i class="fa-solid fa-arrow-right text-[10px] ml-1 group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </div>
                </div>
            `;
        }

        // =====================================================================
        // HTML GENERATOR: KARTU TOPIK / BAB DARI BANK SOAL
        // =====================================================================
        function renderTopicPracticeCardHtml(topic) {
            const theme = getSubjectTheme(topic.subject);
            const questionCount = topic.questions.length;
            const topicPkgId = `pkg-topic-${topic.subject}-${encodeURIComponent(topic.bab)}`;
            const history = getStudentHistory(topicPkgId, topic.bab);
            const isAttempted = history && history.attemptsCount > 0;
            const lastScore = isAttempted ? (history.latest.score || 0) : 0;

            // Determine dominant difficulty
            let dominantDiff = 'Sedang';
            if (topic.difficultyCounts['Mudah'] >= topic.difficultyCounts['Sedang'] && topic.difficultyCounts['Mudah'] >= topic.difficultyCounts['Sulit']) {
                dominantDiff = 'Mudah';
            } else if (topic.difficultyCounts['Sulit'] > topic.difficultyCounts['Sedang']) {
                dominantDiff = 'Sulit';
            }

            let diffBadgeClass = 'bg-amber-100 text-amber-800';
            if (dominantDiff === 'Mudah') diffBadgeClass = 'bg-emerald-100 text-emerald-800';
            else if (dominantDiff === 'Sulit') diffBadgeClass = 'bg-rose-100 text-rose-800';

            return `
                <div class="learning-world-card bg-white rounded-3xl border-2 ${theme.cardBorder} hover:border-brand-400 shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden group">
                    <div>
                        <!-- Header Strip -->
                        <div class="p-4 bg-gradient-to-r ${theme.bannerGradient} text-white flex items-center justify-between">
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center gap-1.5">
                                <i class="fa-solid ${theme.icon}"></i> ${theme.name}
                            </span>
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${diffBadgeClass}">
                                ${dominantDiff}
                            </span>
                        </div>

                        <!-- Card Body -->
                        <div class="p-6 space-y-3">
                            <div>
                                <span class="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Topik Bab Pembelajaran</span>
                                <h3 class="font-outfit font-black text-lg text-slate-800 leading-snug mt-0.5 line-clamp-2 group-hover:text-brand-600 transition-colors">
                                    ${topic.bab}
                                </h3>
                            </div>

                            <div class="flex items-center gap-3 text-xs text-slate-500 pt-1">
                                <span class="font-bold text-slate-700">
                                    <i class="fa-solid fa-list-ol mr-1 text-slate-400"></i> ${questionCount} Soal Tersedia
                                </span>
                                <span>•</span>
                                <span class="font-bold text-indigo-600">
                                    <i class="fa-solid fa-bolt mr-1 text-amber-500"></i> +${questionCount * 5} XP
                                </span>
                            </div>

                            <!-- Progres / Hasil Latihan -->
                            <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-2">
                                <div>
                                    <div class="text-[9px] font-bold text-slate-400 uppercase">Skor Terakhir:</div>
                                    <div class="font-outfit font-bold text-sm ${isAttempted ? 'text-slate-800' : 'text-slate-400'}">
                                        ${isAttempted ? `${lastScore} / 100` : 'Belum Dicoba'}
                                    </div>
                                </div>
                                <div>
                                    ${renderStarRating(lastScore, isAttempted)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Action Button -->
                    <div class="px-6 pb-6 pt-2">
                        <button class="btn-start-topic-practice w-full py-3 rounded-2xl bg-slate-900 hover:bg-brand-600 text-white font-outfit font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]" data-topic-subject="${topic.subject}" data-topic-bab="${encodeURIComponent(topic.bab)}" data-topic-class="${topic.kelas}">
                            <i class="fa-solid fa-pen-ruler"></i>
                            <span>${isAttempted ? 'Latihan Ulang Topik Ini' : 'Mulai Latihan Topik Ini'}</span>
                            <i class="fa-solid fa-arrow-right text-[10px] ml-1 group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </div>
                </div>
            `;
        }

        // =====================================================================
        // EVENT LISTENERS
        // =====================================================================
        const searchInput = document.getElementById('exam-filter-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                renderView();
                const newInp = document.getElementById('exam-filter-search');
                if (newInp) {
                    newInp.focus();
                    newInp.setSelectionRange(newInp.value.length, newInp.value.length);
                }
            });
        }

        document.getElementById('exam-filter-class')?.addEventListener('change', (e) => {
            selectedClass = e.target.value;
            renderView();
        });

        const resetFiltersHandler = () => {
            selectedSubject = 'all';
            selectedClass = currentUser?.kelas || 'Kelas 2';
            searchQuery = '';
            renderView();
        };
        document.getElementById('exam-btn-reset-filters')?.addEventListener('click', resetFiltersHandler);
        document.getElementById('exam-btn-reset-empty')?.addEventListener('click', resetFiltersHandler);

        container.querySelectorAll('.subject-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedSubject = btn.getAttribute('data-subject');
                renderView();
            });
        });

        // Open Confirmation Modal for standard packages
        container.querySelectorAll('.btn-open-confirm-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                const pkgId = btn.getAttribute('data-pkg-id');
                const pkg = packages.find(p => p.id === pkgId);
                if (pkg) showConfirmationModal(pkg);
            });
        });

        // Start Practice for Dynamic Topic
        container.querySelectorAll('.btn-start-topic-practice').forEach(btn => {
            btn.addEventListener('click', () => {
                const sId = btn.getAttribute('data-topic-subject');
                const bab = decodeURIComponent(btn.getAttribute('data-topic-bab'));
                const cls = btn.getAttribute('data-topic-class');

                const topicQuestions = allQuestions.filter(q => 
                    q.subject === sId && 
                    (q.bab || 'Materi Umum') === bab && 
                    (cls === 'all' || q.kelas === cls || !q.kelas)
                );

                if (topicQuestions.length === 0) {
                    alert("Belum ada soal pada topik ini.");
                    return;
                }

                const dynamicPkg = {
                    id: `pkg-topic-${sId}-${encodeURIComponent(bab)}`,
                    name: `Latihan Mandiri: ${bab}`,
                    subject: sId,
                    kelas: cls || selectedClass,
                    mode: 'latihan',
                    durationMinutes: Math.max(10, Math.ceil(topicQuestions.length * 1.5)),
                    kkm: 70,
                    randomizeQuestions: true,
                    randomizeOptions: false,
                    showResultsToStudent: true,
                    instructions: `Latihan mandiri topik "${bab}". Kerjakan setiap butir soal dengan cermat. Pembahasan lengkap tersedia setelah selesai.`,
                    questionIds: topicQuestions.map(q => q.id)
                };

                showConfirmationModal(dynamicPkg);
            });
        });
    }

    // =========================================================================
    // MODAL KONFIRMASI MULAI UJIAN / LATIHAN (RAMAH ANAK & PRESERVED TIMER)
    // =========================================================================
    function showConfirmationModal(pkg) {
        const theme = getSubjectTheme(pkg.subject);
        const questionCount = pkg.questionIds ? pkg.questionIds.length : 0;
        const isSimulation = pkg.mode === 'simulasi';
        const coveredMaterials = storageService.getMaterialsByQuestionIds(pkg.questionIds || []);

        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
            <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 my-4 max-h-[92vh] flex flex-col justify-between">
                    
                    <div>
                        <!-- Modal Title Header -->
                        <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                            <div>
                                <span class="text-xs font-extrabold ${isSimulation ? 'text-rose-600' : 'text-emerald-600'} uppercase tracking-wider flex items-center gap-1.5">
                                    <i class="fa-solid ${isSimulation ? 'fa-bolt' : 'fa-pen-ruler'}"></i>
                                    <span>${isSimulation ? 'Konfirmasi Simulasi Ujian' : 'Konfirmasi Latihan Soal'}</span>
                                </span>
                                <h3 class="font-outfit font-black text-xl text-slate-800 leading-tight mt-0.5">${pkg.name}</h3>
                            </div>
                            <button id="conf-modal-close" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <!-- Details Summary Grid -->
                        <div class="grid grid-cols-2 gap-2.5 mb-4">
                            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                <div class="text-[10px] font-extrabold text-slate-400 uppercase">Mata Pelajaran</div>
                                <div class="font-bold text-slate-800 text-xs mt-0.5 flex items-center gap-1.5">
                                    <i class="fa-solid ${theme.icon} ${theme.accentText}"></i>
                                    <span>${theme.name}</span>
                                </div>
                            </div>
                            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                <div class="text-[10px] font-extrabold text-slate-400 uppercase">Kategori</div>
                                <div class="font-bold text-xs mt-0.5 ${isSimulation ? 'text-rose-600' : 'text-emerald-600'}">
                                    ${isSimulation ? '⚡ Simulasi Resmi CBT' : '📚 Latihan Mandiri'}
                                </div>
                            </div>
                            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                <div class="text-[10px] font-extrabold text-slate-400 uppercase">Jumlah Soal</div>
                                <div class="font-bold text-slate-800 text-xs mt-0.5">${questionCount} Soal Pilihan Ganda</div>
                            </div>
                            <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                <div class="text-[10px] font-extrabold text-slate-400 uppercase">Waktu Pengerjaan</div>
                                <div class="font-bold text-slate-800 text-xs mt-0.5 flex items-center gap-1">
                                    <i class="fa-solid fa-stopwatch text-slate-400"></i>
                                    <span>${pkg.durationMinutes || 15} Menit (Timer)</span>
                                </div>
                            </div>
                        </div>

                        <!-- Saran Materi Terkait Soal Ini -->
                        ${coveredMaterials.length > 0 ? `
                            <div class="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-3.5 mb-4 space-y-2">
                                <div class="flex items-center justify-between">
                                    <span class="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                                        <i class="fa-solid fa-graduation-cap text-indigo-600"></i>
                                        <span>📚 Materi Terkait Soal Ini</span>
                                    </span>
                                    <span class="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">${coveredMaterials.length} Materi</span>
                                </div>
                                <p class="text-[11px] text-indigo-700 leading-tight">
                                    Ingin mengingat materi sebelum ujian? Kamu bisa membaca modul ringkas ini terlebih dahulu:
                                </p>
                                <div class="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                                    ${coveredMaterials.map(m => `
                                        <div class="p-2 bg-white rounded-xl border border-indigo-100 flex items-center justify-between text-xs">
                                            <div class="min-w-0 pr-2">
                                                <span class="font-bold text-slate-800 block truncate text-[11px]">📘 ${m.title}</span>
                                            </div>
                                            <button type="button" class="btn-learn-material-link px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] shrink-0 transition-colors" data-mat-id="${m.id}">
                                                Pelajari
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}

                        <!-- Petunjuk Penting & Timer Warning -->
                        <div class="bg-brand-50/70 border border-brand-200 rounded-2xl p-3 mb-4 text-xs text-brand-900 space-y-1">
                            <div class="font-extrabold text-brand-900 flex items-center gap-1.5">
                                <i class="fa-solid fa-circle-info text-brand-600"></i> Petunjuk Penting:
                            </div>
                            <ul class="list-disc list-inside space-y-0.5 text-[11px] text-slate-700">
                                <li>Timer hitung mundur berjalan otomatis saat tombol "Mulai Sekarang" diklik.</li>
                                <li>Jawaban tersimpan otomatis setiap kali kamu memilih opsi A, B, C, atau D.</li>
                                <li>Saat waktu habis, ujian akan otomatis disubmit dan dinilai oleh sistem.</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Footer Action Buttons -->
                    <div class="flex gap-3 pt-2">
                        <button id="conf-modal-cancel" class="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors">
                            Batal
                        </button>
                        <button id="conf-modal-start" class="flex-1 py-3 rounded-xl ${isSimulation ? 'bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 shadow-brand-600/30' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/30'} text-white font-outfit font-black text-xs shadow-lg transition-all flex items-center justify-center gap-1.5">
                            <i class="fa-solid fa-play"></i> Mulai Sekarang
                        </button>
                    </div>

                </div>
            </div>
        `;

        document.getElementById('conf-modal-close').addEventListener('click', () => { modalContainer.innerHTML = ''; });
        document.getElementById('conf-modal-cancel').addEventListener('click', () => { modalContainer.innerHTML = ''; });

        document.querySelectorAll('.btn-learn-material-link').forEach(btn => {
            btn.addEventListener('click', () => {
                const matId = btn.getAttribute('data-mat-id');
                modalContainer.innerHTML = '';
                if (onNavigate) {
                    onNavigate('student-materials', { materialId: matId });
                }
            });
        });

        document.getElementById('conf-modal-start').addEventListener('click', () => {
            modalContainer.innerHTML = '';
            const session = storageService.startExamSession(pkg, currentUser);
            if (onStartExam) onStartExam(session);
        });
    }

    renderView();
}
