// Gamified Student Material Learning Hub (Learning World Subject Cards Grid)
// TKA Smart Exam - SD Kelas 2-6

import { storageService } from '../services/storageService.js';
import { SUBJECTS, getSubjectTheme } from '../config/constants.js';
import { formatRichText } from '../components/Modals.js';
import { extractYouTubeVideoId, renderStudentVideoCard } from '../services/youtubeService.js';

export function renderStudentMaterialPage(container, currentUser, onNavigate, initialMaterialId = null) {
    const studentClass = currentUser?.kelas || 'Kelas 2';
    let selectedSubjectView = null; // null = Map View (Peta Mapel), string = Subject ID
    let selectedSubjectFilter = 'all';
    let searchQuery = '';
    let selectedMaterial = null;

    if (initialMaterialId) {
        const mat = storageService.getMaterialById(initialMaterialId);
        if (mat && (currentUser.role === 'admin' || mat.kelas === studentClass || !mat.kelas)) {
            selectedMaterial = mat;
            selectedSubjectView = mat.subject;
            storageService.markMaterialStudied(currentUser.id, mat.id);
        }
    }

    function renderView() {
        if (selectedMaterial) {
            renderMaterialDetail(selectedMaterial);
        } else if (selectedSubjectView) {
            renderSubjectModulesView(selectedSubjectView);
        } else {
            renderLearningWorldMap();
        }
    }

    // =========================================================================
    // 1. LEARNING WORLD MAP: GRID KARTU PER MATA PELAJARAN (DESKTOP 3, TAB 2, MOB 1)
    // =========================================================================
    function renderLearningWorldMap() {
        const allMaterials = storageService.getMaterials({
            kelas: currentUser.role === 'admin' ? null : studentClass,
            status: currentUser.role === 'admin' ? null : 'published'
        });

        const studiedList = storageService.getStudiedMaterials(currentUser.id);
        const gamify = storageService.getStudentGamification(currentUser.id);

        // Calculate student's overall material stats
        const totalMaterialsForClass = allMaterials.length;
        const totalStudiedForClass = allMaterials.filter(m => studiedList.includes(m.id)).length;
        const totalEarnableXp = totalMaterialsForClass * 25;
        const totalEarnedMaterialXp = totalStudiedForClass * 25;
        const overallPercentage = totalMaterialsForClass > 0 
            ? Math.round((totalStudiedForClass / totalMaterialsForClass) * 100) 
            : 0;

        // If user is searching globally across all materials
        const isSearching = searchQuery.trim().length > 0;
        const searchResults = isSearching 
            ? allMaterials.filter(m => {
                const q = searchQuery.toLowerCase();
                const matchTitle = (m.title || '').toLowerCase().includes(q);
                const matchDesc = (m.description || '').toLowerCase().includes(q);
                const matchSubj = selectedSubjectFilter === 'all' || m.subject === selectedSubjectFilter;
                return (matchTitle || matchDesc) && matchSubj;
            })
            : [];

        container.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 animate-in fade-in duration-300">
                
                <!-- 1. Hero Banner: Learning World Header -->
                <div class="bg-gradient-to-r from-indigo-900 via-brand-900 to-purple-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-indigo-800/40">
                    <div class="absolute -right-16 -top-16 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div class="absolute right-8 bottom-3 text-8xl text-white/5 pointer-events-none hidden md:block">
                        <i class="fa-solid fa-earth-asia"></i>
                    </div>

                    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                        <div class="space-y-2 max-w-2xl">
                            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-indigo-200 font-bold text-xs backdrop-blur-md border border-white/20">
                                <i class="fa-solid fa-graduation-cap text-amber-300"></i>
                                <span>Peta Pembelajaran Siswa • ${studentClass}</span>
                            </div>
                            <h1 class="font-outfit font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight">
                                Dunia Belajar TKA Smart 🗺️
                            </h1>
                            <p class="text-indigo-200 text-xs sm:text-sm leading-relaxed">
                                Jelajahi setiap pulau mata pelajaran, pelajari modul konsep penting, dan raih <strong>+25 XP</strong> untuk setiap materi yang kamu selesaikan!
                            </p>
                        </div>

                        <!-- Gamified Quick Stats Pill -->
                        <div class="flex flex-wrap items-center gap-3 shrink-0">
                            <div class="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-lg shadow-sm">
                                    <i class="fa-solid fa-bolt"></i>
                                </div>
                                <div>
                                    <div class="text-[10px] uppercase font-extrabold text-amber-300 tracking-wider">XP Materi</div>
                                    <div class="font-outfit font-black text-lg sm:text-xl text-white">
                                        ${totalEarnedMaterialXp} <span class="text-xs font-normal text-indigo-200">/ ${totalEarnableXp} XP</span>
                                    </div>
                                </div>
                            </div>

                            <button id="btn-hero-to-exams" class="px-5 py-3.5 rounded-2xl bg-white hover:bg-brand-50 text-slate-900 font-outfit font-black text-xs shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2">
                                <i class="fa-solid fa-bolt text-rose-600"></i>
                                <span>Simulasi Ujian CBT</span>
                            </button>
                        </div>
                    </div>

                    <!-- Progress Bar Overall -->
                    <div class="mt-6 pt-5 border-t border-white/15 space-y-2 relative z-10">
                        <div class="flex items-center justify-between text-xs font-bold text-white">
                            <span class="flex items-center gap-2">
                                <i class="fa-solid fa-circle-check text-emerald-400"></i>
                                <span>Progres Materi Selesai: ${totalStudiedForClass} dari ${totalMaterialsForClass} Modul (${overallPercentage}%)</span>
                            </span>
                            <span class="text-indigo-200">
                                Lvl ${gamify.level} • ${gamify.levelTitle}
                            </span>
                        </div>
                        <div class="w-full h-3 rounded-full bg-slate-950/40 p-0.5 border border-white/20 overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-300 rounded-full transition-all duration-700 shadow-sm" style="width: ${overallPercentage}%"></div>
                        </div>
                    </div>
                </div>

                <!-- 2. Search & Filter Bar -->
                <div class="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
                    <div class="relative">
                        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                        <input 
                            type="text" 
                            id="mat-search-input" 
                            placeholder="Cari materi pembelajaran, topik, rumus, atau konsep penting..." 
                            value="${searchQuery}"
                            class="w-full pl-11 pr-10 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-brand-500 outline-none transition-all font-medium"
                        />
                        ${searchQuery ? `
                            <button id="btn-clear-mat-search" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1">
                                <i class="fa-solid fa-xmark text-sm"></i>
                            </button>
                        ` : ''}
                    </div>

                    <!-- Subject Chips Filter -->
                    <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
                        <button class="btn-quick-subj-tab px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedSubjectFilter === 'all' ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'}" data-subj="all">
                            <i class="fa-solid fa-border-all mr-1.5"></i> Semua Pulau Mapel (${SUBJECTS.length})
                        </button>
                        ${SUBJECTS.map(s => {
                            const theme = getSubjectTheme(s.id);
                            const count = allMaterials.filter(m => m.subject === s.id).length;
                            const isActive = selectedSubjectFilter === s.id;
                            return `
                                <button class="btn-quick-subj-tab px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${isActive ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'}" data-subj="${s.id}">
                                    <i class="fa-solid ${theme.icon}"></i>
                                    <span>${theme.name}</span>
                                    <span class="text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}">${count}</span>
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- 3. MAIN CONTENT: SUBJECT GRID OR GLOBAL SEARCH RESULTS -->
                ${isSearching ? `
                    <!-- SEARCH RESULTS VIEW -->
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <h3 class="font-outfit font-black text-lg text-slate-800 flex items-center gap-2">
                                <i class="fa-solid fa-magnifying-glass text-brand-600"></i>
                                <span>Hasil Pencarian: "${searchQuery}" (${searchResults.length} Modul)</span>
                            </h3>
                            <button id="btn-exit-search" class="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline">
                                ← Kembali ke Peta Mapel
                            </button>
                        </div>

                        ${searchResults.length === 0 ? `
                            <div class="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-3">
                                <div class="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 mx-auto flex items-center justify-center text-3xl">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <h4 class="font-outfit font-bold text-slate-800 text-lg">Materi Tidak Ditemukan</h4>
                                <p class="text-xs text-slate-500 max-w-sm mx-auto">
                                    Tidak ada materi pembelajaran yang cocok dengan kata kunci "${searchQuery}". Coba gunakan kata kunci lain.
                                </p>
                            </div>
                        ` : `
                            <!-- Search Grid: 3 cols desktop, 2 cols tablet, 1 col mobile -->
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                ${searchResults.map(mat => renderMaterialCardHtml(mat, studiedList)).join('')}
                            </div>
                        `}
                    </div>
                ` : `
                    <!-- LEARNING WORLD SUBJECT CARDS GRID (3 cols desktop, 2 cols tablet, 1 col mobile) -->
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h2 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                                    <i class="fa-solid fa-map-location-dot text-brand-600"></i>
                                    <span>Pilihan Pulau Mata Pelajaran</span>
                                </h2>
                                <p class="text-xs text-slate-500 mt-0.5">Pilih kartu mata pelajaran untuk membuka daftar modul pembelajaran lengkap</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${SUBJECTS.map(s => {
                                if (selectedSubjectFilter !== 'all' && selectedSubjectFilter !== s.id) return '';
                                
                                const theme = getSubjectTheme(s.id);
                                const subjMaterials = allMaterials.filter(m => m.subject === s.id);
                                const totalCount = subjMaterials.length;
                                const studiedCount = subjMaterials.filter(m => studiedList.includes(m.id)).length;
                                const progressPct = totalCount > 0 ? Math.round((studiedCount / totalCount) * 100) : 0;
                                const totalXp = totalCount * 25;
                                const earnedXp = studiedCount * 25;

                                // Determine Status
                                let statusKey = 'not_started';
                                let statusLabel = 'Belum Dimulai';
                                let statusBadgeClass = 'bg-slate-100 text-slate-700 border-slate-200';
                                let statusIcon = 'fa-circle-dot';
                                let actionBtnLabel = 'Mulai Belajar';
                                let actionBtnIcon = 'fa-play';

                                if (totalCount > 0 && studiedCount === totalCount) {
                                    statusKey = 'completed';
                                    statusLabel = 'Selesai 🏆';
                                    statusBadgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                                    statusIcon = 'fa-circle-check';
                                    actionBtnLabel = 'Review / Ulangi';
                                    actionBtnIcon = 'fa-rotate-right';
                                } else if (studiedCount > 0 && studiedCount < totalCount) {
                                    statusKey = 'in_progress';
                                    statusLabel = 'Sedang Dipelajari ⚡';
                                    statusBadgeClass = 'bg-amber-100 text-amber-800 border-amber-300';
                                    statusIcon = 'fa-hourglass-half';
                                    actionBtnLabel = 'Lanjutkan';
                                    actionBtnIcon = 'fa-forward-step';
                                }

                                // Level Belajar Berdasarkan Progres
                                let subjectLevel = 1;
                                let levelBadgeTitle = 'Level 1 • Pemula';
                                if (progressPct >= 100) { subjectLevel = 5; levelBadgeTitle = 'Level 5 • Master Mapel 🏆'; }
                                else if (progressPct >= 75) { subjectLevel = 4; levelBadgeTitle = 'Level 4 • Mahir'; }
                                else if (progressPct >= 40) { subjectLevel = 3; levelBadgeTitle = 'Level 3 • Berkembang'; }
                                else if (progressPct > 0) { subjectLevel = 2; levelBadgeTitle = 'Level 2 • Menjelajah'; }

                                return `
                                    <div class="learning-world-card bg-white rounded-3xl border-2 ${theme.cardBorder} ${theme.cardHoverBorder} shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden cursor-pointer group" data-open-subject="${s.id}">
                                        
                                        <!-- Top Illustrative Banner -->
                                        <div>
                                            <div class="p-6 bg-gradient-to-r ${theme.bannerGradient} text-white relative overflow-hidden">
                                                <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                                                <div class="absolute right-3 top-3 opacity-15 text-5xl pointer-events-none">
                                                    <i class="fa-solid ${theme.icon}"></i>
                                                </div>

                                                <div class="flex items-start justify-between gap-3 relative z-10">
                                                    <div class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl text-white shadow-md subject-icon-bounce">
                                                        <i class="fa-solid ${theme.icon}"></i>
                                                    </div>

                                                    <div class="flex flex-col items-end gap-1.5">
                                                        <span class="px-3 py-1 rounded-full text-[10px] font-extrabold bg-white/20 text-white backdrop-blur-md border border-white/30 shadow-xs">
                                                            ${levelBadgeTitle}
                                                        </span>
                                                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusBadgeClass} border shadow-2xs">
                                                            <i class="fa-solid ${statusIcon} mr-1"></i>${statusLabel}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div class="mt-4 relative z-10">
                                                    <div class="text-[11px] font-bold text-white/80 uppercase tracking-wider">${theme.worldTitle}</div>
                                                    <h3 class="font-outfit font-black text-xl text-white tracking-tight leading-tight mt-0.5 group-hover:scale-[1.01] transition-transform">
                                                        ${theme.name}
                                                    </h3>
                                                </div>
                                            </div>

                                            <!-- Body Content -->
                                            <div class="p-6 space-y-4">
                                                <p class="text-xs text-slate-500 leading-relaxed min-h-[38px] line-clamp-2">
                                                    ${theme.description}
                                                </p>

                                                <!-- XP & Materi Counter Capsule -->
                                                <div class="grid grid-cols-2 gap-2.5 text-center">
                                                    <div class="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                                                        <div class="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Materi Ajar</div>
                                                        <div class="font-outfit font-black text-slate-800 text-sm mt-0.5">
                                                            ${studiedCount} <span class="text-xs font-semibold text-slate-400">/ ${totalCount} Modul</span>
                                                        </div>
                                                    </div>

                                                    <div class="p-2.5 rounded-2xl bg-amber-50/70 border border-amber-100">
                                                        <div class="text-[9px] font-extrabold text-amber-700 uppercase tracking-wider">Potensi XP</div>
                                                        <div class="font-outfit font-black text-amber-700 text-sm mt-0.5 flex items-center justify-center gap-1">
                                                            <i class="fa-solid fa-bolt text-amber-500 text-xs"></i>
                                                            <span>+${totalXp} XP</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Subject Progress Bar -->
                                                <div class="space-y-1.5 pt-1">
                                                    <div class="flex items-center justify-between text-[11px] font-bold text-slate-600">
                                                        <span>Progress Selesai</span>
                                                        <span class="text-slate-800">${progressPct}%</span>
                                                    </div>
                                                    <div class="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                                                        <div class="h-full rounded-full transition-all duration-700 ${theme.accentBg}" style="width: ${progressPct}%"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Card Footer Action Button -->
                                        <div class="px-6 pb-6 pt-2">
                                            <button class="btn-open-subject-card w-full py-3 rounded-2xl ${theme.btnClass} text-white font-outfit font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]" data-subject-id="${s.id}">
                                                <i class="fa-solid ${actionBtnIcon}"></i>
                                                <span>${actionBtnLabel}</span>
                                                <i class="fa-solid fa-arrow-right text-[10px] ml-1 group-hover:translate-x-1 transition-transform"></i>
                                            </button>
                                        </div>

                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `}

            </div>
        `;

        attachLearningWorldListeners();
    }

    // Helper: Single Material Card HTML (Reusable in Subject view & Search view)
    function renderMaterialCardHtml(mat, studiedList) {
        const theme = getSubjectTheme(mat.subject);
        const qCount = mat.questionIds ? mat.questionIds.length : (mat.question_count || 0);
        const isStudied = studiedList.includes(mat.id);
        const hasVideo = (mat.video_url || mat.videoUrl) && extractYouTubeVideoId(mat.video_url || mat.videoUrl);

        return `
            <div class="gamify-card p-6 flex flex-col justify-between space-y-4 group border border-slate-200 hover:border-brand-400 transition-all">
                <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                        <span class="px-3 py-1 rounded-full text-[10px] font-extrabold ${theme.badgeBg} ${theme.badgeText} flex items-center gap-1.5 border border-slate-200/50">
                            <i class="fa-solid ${theme.icon}"></i> ${theme.name}
                        </span>
                        
                        <div class="flex items-center gap-1.5">
                            ${isStudied ? `
                                <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center gap-1">
                                    <i class="fa-solid fa-circle-check"></i> Selesai (+25 XP)
                                </span>
                            ` : `
                                <span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-extrabold text-[10px] border border-amber-200 flex items-center gap-1">
                                    <i class="fa-solid fa-bolt text-amber-500"></i> +25 XP
                                </span>
                            `}
                        </div>
                    </div>

                    <h3 class="font-outfit font-black text-base sm:text-lg text-slate-800 group-hover:text-brand-600 transition-colors leading-snug">
                        📘 ${mat.title}
                    </h3>

                    ${mat.description ? `
                        <p class="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                            ${mat.description}
                        </p>
                    ` : ''}
                </div>

                <div class="pt-4 border-t border-slate-100 space-y-3">
                    <div class="flex items-center justify-between text-xs text-slate-500">
                        <span class="font-bold inline-flex items-center gap-1.5 text-indigo-600">
                            <i class="fa-solid fa-list-check"></i> ${qCount} Soal Latihan
                        </span>
                        <div class="flex items-center gap-1.5">
                            ${hasVideo ? `
                                <span class="text-[10px] font-extrabold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                                    <i class="fa-brands fa-youtube text-rose-600"></i> Video
                                </span>
                            ` : ''}
                            ${mat.summary ? `
                                <span class="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                                    💡 Ringkasan
                                </span>
                            ` : ''}
                        </div>
                    </div>

                    <button class="btn-read-material-item w-full py-2.5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-outfit font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5" data-mat-id="${mat.id}">
                        <span>${isStudied ? 'Buka Kembali Materi' : 'Pelajari Materi Ini'}</span>
                        <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // =========================================================================
    // 2. SUB-VIEW: DAFTAR MODUL MATERI PER MATA PELAJARAN TERPILIH
    // =========================================================================
    function renderSubjectModulesView(subjectId) {
        const theme = getSubjectTheme(subjectId);
        const allMaterials = storageService.getMaterials({
            kelas: currentUser.role === 'admin' ? null : studentClass,
            status: currentUser.role === 'admin' ? null : 'published'
        });

        const subjectMaterials = allMaterials.filter(m => m.subject === subjectId);
        const studiedList = storageService.getStudiedMaterials(currentUser.id);

        const totalCount = subjectMaterials.length;
        const studiedCount = subjectMaterials.filter(m => studiedList.includes(m.id)).length;
        const progressPct = totalCount > 0 ? Math.round((studiedCount / totalCount) * 100) : 0;
        const totalXp = totalCount * 25;
        const earnedXp = studiedCount * 25;

        container.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 animate-in fade-in duration-300">
                
                <!-- Back Breadcrumbs Button -->
                <div class="flex items-center justify-between gap-4">
                    <button id="btn-back-to-world-map" class="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-outfit font-bold text-xs shadow-2xs transition-all flex items-center gap-2">
                        <i class="fa-solid fa-arrow-left"></i>
                        <span>Kembali ke Peta Mata Pelajaran</span>
                    </button>

                    <div class="flex items-center gap-2">
                        <button id="btn-switch-to-practice" class="px-4 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-outfit font-bold text-xs border border-emerald-200 transition-colors flex items-center gap-2">
                            <i class="fa-solid fa-pen-ruler text-emerald-600"></i>
                            <span>Latihan Soal Mapel Ini</span>
                        </button>
                    </div>
                </div>

                <!-- Subject Header Banner -->
                <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${theme.bannerGradient} text-white shadow-xl relative overflow-hidden border border-white/20">
                    <div class="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                        <div class="flex items-center gap-4">
                            <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl text-white shadow-lg shrink-0">
                                <i class="fa-solid ${theme.icon}"></i>
                            </div>
                            <div>
                                <div class="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[10px] mb-1.5 backdrop-blur-sm">
                                    <span>${studentClass}</span> • <span>${theme.worldTitle}</span>
                                </div>
                                <h1 class="font-outfit font-black text-2xl sm:text-3xl text-white tracking-tight">
                                    Modul Belajar: ${theme.name}
                                </h1>
                                <p class="text-white/85 text-xs sm:text-sm mt-1 max-w-xl">
                                    ${theme.description}
                                </p>
                            </div>
                        </div>

                        <!-- Progress Capsule -->
                        <div class="bg-white/15 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center min-w-[150px] shrink-0">
                            <div class="text-[10px] font-extrabold uppercase text-white/80">Progres Modul</div>
                            <div class="font-outfit font-black text-2xl text-white mt-0.5">
                                ${studiedCount} / ${totalCount}
                            </div>
                            <div class="text-[11px] font-bold text-amber-300 mt-0.5">
                                <i class="fa-solid fa-bolt"></i> ${earnedXp} / ${totalXp} XP
                            </div>
                        </div>
                    </div>

                    <!-- Progress Bar -->
                    <div class="mt-6 pt-5 border-t border-white/20 space-y-1.5 relative z-10">
                        <div class="flex justify-between text-xs font-bold text-white">
                            <span>Penyelesaian Modul: ${progressPct}%</span>
                            <span>${studiedCount === totalCount && totalCount > 0 ? '🏆 Semua Modul Tuntas!' : `${totalCount - studiedCount} Modul Tersisa`}</span>
                        </div>
                        <div class="w-full h-3 rounded-full bg-black/25 overflow-hidden border border-white/25">
                            <div class="h-full bg-gradient-to-r from-amber-300 to-emerald-300 rounded-full transition-all duration-700" style="width: ${progressPct}%"></div>
                        </div>
                    </div>
                </div>

                <!-- Modules Grid (3 cols desktop, 2 cols tablet, 1 col mobile) -->
                ${subjectMaterials.length === 0 ? `
                    <div class="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-3">
                        <div class="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 mx-auto flex items-center justify-center text-3xl">
                            <i class="fa-solid fa-book-bookmark"></i>
                        </div>
                        <h3 class="font-outfit font-bold text-slate-800 text-lg">Modul Belum Tersedia</h3>
                        <p class="text-xs text-slate-500 max-w-sm mx-auto">
                            Bapak/Ibu Guru sedang mempersiapkan materi pembelajaran untuk mata pelajaran ${theme.name} jenjang ${studentClass}.
                        </p>
                        <div class="pt-3">
                            <button id="btn-empty-back" class="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-outfit font-bold text-xs shadow-md">
                                Kembali ke Peta Mapel
                            </button>
                        </div>
                    </div>
                ` : `
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <h3 class="font-outfit font-black text-lg text-slate-800 flex items-center gap-2">
                                <i class="fa-solid fa-list-check text-brand-600"></i>
                                <span>Daftar Modul Pembelajaran (${subjectMaterials.length} Materi)</span>
                            </h3>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${subjectMaterials.map(mat => renderMaterialCardHtml(mat, studiedList)).join('')}
                        </div>
                    </div>
                `}

            </div>
        `;

        document.getElementById('btn-back-to-world-map')?.addEventListener('click', () => {
            selectedSubjectView = null;
            renderView();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.getElementById('btn-empty-back')?.addEventListener('click', () => {
            selectedSubjectView = null;
            renderView();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.getElementById('btn-switch-to-practice')?.addEventListener('click', () => {
            if (onNavigate) {
                onNavigate('exam-practice', { defaultSubject: subjectId });
            }
        });

        attachCardItemListeners();
    }

    // =========================================================================
    // 3. DETAIL READING VIEW: BACA MATERI ARTIKEL LENGKAP
    // =========================================================================
    function renderMaterialDetail(mat) {
        const questions = storageService.getMaterialQuestions(mat.id);
        const theme = getSubjectTheme(mat.subject);

        const objectivesList = (mat.learning_objectives || mat.learningObjectives || '')
            .split('\n')
            .map(s => s.trim().replace(/^[-*•\d.]+\s*/, ''))
            .filter(Boolean);

        const subtopics = [...new Set(questions.map(q => q.bab || 'Materi Umum'))].filter(Boolean);

        container.innerHTML = `
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6 animate-in fade-in duration-300">
                
                <!-- Back Navigation -->
                <div class="flex items-center justify-between gap-3">
                    <button id="btn-back-to-materials" class="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-outfit font-bold text-xs shadow-2xs transition-all flex items-center gap-2">
                        <i class="fa-solid fa-arrow-left"></i>
                        <span>Kembali</span>
                    </button>

                    <div class="flex items-center gap-2">
                        <span class="px-3.5 py-1.5 rounded-full ${theme.badgeBg} ${theme.badgeText} font-extrabold text-xs border border-slate-200/50 flex items-center gap-1.5">
                            <i class="fa-solid ${theme.icon}"></i> ${mat.kelas} • ${theme.name}
                        </span>
                        <span class="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center gap-1">
                            <i class="fa-solid fa-bolt text-amber-500"></i> +25 XP
                        </span>
                    </div>
                </div>

                <!-- Main Content Article Container -->
                <article class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
                    
                    <!-- Article Header -->
                    <div class="border-b border-slate-100 pb-6">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs mb-3">
                            <i class="fa-solid fa-book-open"></i> Modul Pembelajaran Siswa
                        </div>
                        <h1 class="font-outfit font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                            📘 ${mat.title}
                        </h1>
                        ${mat.description ? `
                            <p class="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                                ${mat.description}
                            </p>
                        ` : ''}
                    </div>

                    <!-- Tujuan Pembelajaran -->
                    ${objectivesList.length > 0 ? `
                        <div class="bg-indigo-50/80 border border-indigo-200/80 rounded-2xl p-5">
                            <h3 class="font-outfit font-bold text-xs text-indigo-950 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <i class="fa-solid fa-bullseye text-indigo-600 text-sm"></i> 🎯 Tujuan Pembelajaran
                            </h3>
                            <ul class="space-y-2 text-xs sm:text-sm text-slate-700">
                                ${objectivesList.map(obj => `
                                    <li class="flex items-start gap-2.5">
                                        <span class="w-5 h-5 rounded-full bg-indigo-200 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">✓</span>
                                        <span class="font-medium">${obj}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}

                    <!-- Video Pembelajaran Multimedia Interaktif (Jika Ada) -->
                    ${(mat.video_url || mat.videoUrl) && extractYouTubeVideoId(mat.video_url || mat.videoUrl) ? `
                        <div>
                            ${renderStudentVideoCard(extractYouTubeVideoId(mat.video_url || mat.videoUrl), mat.title)}
                        </div>
                    ` : ''}

                    <!-- Pokok Bahasan -->
                    ${subtopics.length > 0 ? `
                        <div>
                            <h3 class="font-outfit font-bold text-xs text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                <i class="fa-solid fa-tags text-brand-600"></i> Pokok Bahasan / Subtopik
                            </h3>
                            <div class="flex flex-wrap gap-2">
                                ${subtopics.map((st, i) => `
                                    <span class="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 flex items-center gap-1.5">
                                        <span class="text-brand-600 font-extrabold">${i + 1}.</span>
                                        <span>${st}</span>
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <!-- Penjelasan Materi -->
                    <div class="space-y-3">
                        <h3 class="font-outfit font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <i class="fa-solid fa-book-open text-brand-600"></i> Penjelasan Materi
                        </h3>
                        <div class="p-6 bg-slate-50/60 rounded-3xl border border-slate-200 text-sm sm:text-base text-slate-800 leading-relaxed max-w-none font-medium space-y-1">
                            ${mat.content ? formatRichText(mat.content) : '<p class="text-slate-400 italic">Naskah ringkasan materi akan ditambahkan oleh Guru.</p>'}
                        </div>
                    </div>

                    <!-- Ringkasan & Poin Penting -->
                    ${mat.summary ? `
                        <div class="bg-amber-50/90 border border-amber-200 rounded-3xl p-6 space-y-2">
                            <h3 class="font-outfit font-bold text-xs text-amber-950 uppercase tracking-wider flex items-center gap-2">
                                <i class="fa-solid fa-lightbulb text-amber-600 text-base"></i> 💡 Ringkasan & Poin Penting
                            </h3>
                            <div class="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium space-y-1">
                                ${formatRichText(mat.summary)}
                            </div>
                        </div>
                    ` : ''}

                    <!-- Section Latihan Terkait -->
                    <div class="pt-6 border-t border-slate-100 space-y-4">
                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-brand-50 to-indigo-50 p-5 rounded-2xl border border-brand-200">
                            <div>
                                <h3 class="font-outfit font-bold text-base text-brand-950 flex items-center gap-2">
                                    <i class="fa-solid fa-circle-question text-brand-600"></i> Latihan Soal Mandiri
                                </h3>
                                <p class="text-xs text-slate-600 mt-0.5">
                                    Uji pemahamanmu terhadap materi <strong>"${mat.title}"</strong> dengan menjawab ${questions.length} butir latihan soal.
                                </p>
                            </div>

                            <button id="btn-start-material-practice" class="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-outfit font-bold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center justify-center gap-2 shrink-0">
                                <i class="fa-solid fa-play"></i>
                                <span>Mulai Latihan (${questions.length} Soal)</span>
                            </button>
                        </div>
                    </div>

                </article>

            </div>
        `;

        document.getElementById('btn-back-to-materials')?.addEventListener('click', () => {
            selectedMaterial = null;
            renderView();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.getElementById('btn-start-material-practice')?.addEventListener('click', () => {
            if (questions.length === 0) {
                alert("Materi ini belum memiliki butir latihan soal.");
                return;
            }

            const practicePackage = {
                id: 'pkg-mat-' + mat.id,
                name: `Latihan Mandiri: ${mat.title}`,
                kelas: mat.kelas,
                subject: mat.subject,
                mode: 'latihan',
                durationMinutes: Math.max(10, Math.ceil(questions.length * 1.5)),
                kkm: 70,
                randomizeQuestions: false,
                randomizeOptions: false,
                showResultsToStudent: true,
                instructions: `Latihan mandiri materi "${mat.title}". Kerjakan dengan santai dan pelajari pembahasan setelah selesai.`,
                questionIds: questions.map(q => q.id)
            };

            const session = storageService.startExamSession(practicePackage, currentUser);
            if (onNavigate) onNavigate('exam-engine', session);
        });
    }

    // =========================================================================
    // EVENT LISTENERS BINDINGS
    // =========================================================================
    function attachLearningWorldListeners() {
        document.getElementById('btn-hero-to-exams')?.addEventListener('click', () => {
            if (onNavigate) onNavigate('exam-simulation');
        });

        // Search Input Handling
        const searchInput = document.getElementById('mat-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                renderView();
                const newInp = document.getElementById('mat-search-input');
                if (newInp) {
                    newInp.focus();
                    newInp.setSelectionRange(newInp.value.length, newInp.value.length);
                }
            });
        }

        document.getElementById('btn-clear-mat-search')?.addEventListener('click', () => {
            searchQuery = '';
            renderView();
        });

        document.getElementById('btn-exit-search')?.addEventListener('click', () => {
            searchQuery = '';
            renderView();
        });

        // Subject Tabs Filter in Map
        document.querySelectorAll('.btn-quick-subj-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedSubjectFilter = btn.getAttribute('data-subj');
                renderView();
            });
        });

        // Click on Subject Card to drill down
        document.querySelectorAll('[data-open-subject]').forEach(card => {
            card.addEventListener('click', (e) => {
                // Ignore if clicked on a button that has its own listener
                const subjId = card.getAttribute('data-open-subject');
                selectedSubjectView = subjId;
                renderView();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        document.querySelectorAll('.btn-open-subject-card').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const subjId = btn.getAttribute('data-subject-id');
                selectedSubjectView = subjId;
                renderView();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        attachCardItemListeners();
    }

    function attachCardItemListeners() {
        document.querySelectorAll('.btn-read-material-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const matId = btn.getAttribute('data-mat-id');
                const mat = storageService.getMaterialById(matId);
                if (mat) {
                    selectedMaterial = mat;
                    storageService.markMaterialStudied(currentUser.id, mat.id);
                    renderView();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }

    renderView();
}
