// Gamified Student Dashboard (Beranda) Component for SD Kelas 2-6

import { storageService } from '../services/storageService.js';
import { SUBJECTS } from '../config/constants.js';

export function renderStudentDashboardPage(container, currentUser, onNavigate, onViewResult) {
    const gamify = storageService.getStudentGamification(currentUser.id);
    const missions = storageService.getDailyMissions(currentUser.id);
    const studentResults = storageService.getResultsByStudent(currentUser.id);
    const allPackages = storageService.getPackages();
    const allMaterials = storageService.getMaterials({
        kelas: currentUser.kelas || 'Kelas 5',
        status: 'published'
    });

    // Class-specific recommended packages (top 2)
    const recommendedPackages = allPackages
        .filter(p => p.kelas === currentUser.kelas || !p.kelas)
        .slice(0, 3);

    // Recommended materials for this student's class (top 2)
    const recommendedMaterials = allMaterials.slice(0, 2);

    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
            
            <!-- 1. Hero Welcome & Gamified Progress Header -->
            <div class="bg-gradient-to-r from-brand-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-brand-700/20 relative overflow-hidden">
                <div class="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                <div class="absolute right-8 bottom-4 text-8xl text-white/10 pointer-events-none hidden md:block">
                    <i class="fa-solid fa-graduation-cap"></i>
                </div>

                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                    <div class="flex items-center gap-5">
                        <div class="relative shrink-0">
                            <img src="${currentUser.avatar}" alt="${currentUser.name}" class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white p-1 shadow-xl border-4 border-white/40 object-cover">
                            <span class="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 font-outfit font-black text-xs shadow-md border-2 border-white">
                                Lvl ${gamify.level}
                            </span>
                        </div>

                        <div>
                            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs mb-2 backdrop-blur-sm">
                                <i class="fa-solid fa-award text-amber-300"></i> ${currentUser.kelas || 'Siswa SD'} • ${gamify.levelTitle}
                            </div>
                            <h2 class="font-outfit font-black text-2xl sm:text-3xl tracking-tight">
                                Halo, ${currentUser.name}! 👋
                            </h2>
                            <p class="text-brand-100 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                                Siap belajar dan naik level hari ini? Selesaikan misi latihan harianmu untuk mengumpulkan bintang dan XP!
                            </p>
                        </div>
                    </div>

                    <div class="flex flex-wrap items-center gap-3">
                        <button id="hero-btn-materials" class="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-outfit font-bold text-xs backdrop-blur-md border border-white/20 shadow-sm transition-all flex items-center gap-2">
                            <i class="fa-solid fa-book-bookmark text-amber-300"></i>
                            <span>Materi Belajar</span>
                        </button>
                        <button id="hero-btn-start-exam" class="px-6 py-3 rounded-2xl bg-white hover:bg-brand-50 text-brand-800 font-outfit font-black text-xs shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 whitespace-nowrap">
                            <i class="fa-solid fa-play text-emerald-600"></i>
                            <span>Mulai Ujian CBT</span>
                        </button>
                    </div>
                </div>

                <!-- XP Level Bar -->
                <div class="mt-6 pt-5 border-t border-white/20 space-y-2 relative z-10">
                    <div class="flex items-center justify-between text-xs font-bold text-white">
                        <span class="flex items-center gap-1.5">
                            <i class="fa-solid fa-bolt text-amber-400"></i> Level ${gamify.level}: ${gamify.levelTitle} (${gamify.totalXp} XP)
                        </span>
                        <span>
                            ${gamify.level < 6 ? `${gamify.xpNeededForNext} XP lagi menuju Level ${gamify.level + 1}` : '🏆 Level Maksimal Diraih!'}
                        </span>
                    </div>
                    <div class="w-full h-3 rounded-full bg-slate-900/40 p-0.5 border border-white/30 overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-500 shadow-sm" style="width: ${gamify.progressPercent}%"></div>
                    </div>
                </div>
            </div>

            <!-- 2. Student Key Progress Metrics Cards -->
            <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <!-- Stat 1: Total XP -->
                <div class="gamify-card p-5 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-black shrink-0">
                        <i class="fa-solid fa-bolt"></i>
                    </div>
                    <div>
                        <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total XP</div>
                        <div class="font-outfit font-black text-2xl text-slate-800 mt-0.5">${gamify.totalXp}</div>
                    </div>
                </div>

                <!-- Stat 2: Total Bintang -->
                <div class="gamify-card p-5 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-black shrink-0">
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div>
                        <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bintang Belajar</div>
                        <div class="font-outfit font-black text-2xl text-slate-800 mt-0.5">${gamify.totalStars} ⭐</div>
                    </div>
                </div>

                <!-- Stat 3: Ujian Selesai -->
                <div class="gamify-card p-5 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-black shrink-0">
                        <i class="fa-solid fa-file-circle-check"></i>
                    </div>
                    <div>
                        <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ujian Selesai</div>
                        <div class="font-outfit font-black text-2xl text-slate-800 mt-0.5">${gamify.totalExams} <span class="text-xs font-normal text-slate-400">Kali</span></div>
                    </div>
                </div>

                <!-- Stat 4: Rata-Rata Nilai -->
                <div class="gamify-card p-5 flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl ${gamify.avgScore >= 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'} flex items-center justify-center text-xl font-black shrink-0">
                        <i class="fa-solid fa-chart-simple"></i>
                    </div>
                    <div>
                        <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rata-Rata Nilai</div>
                        <div class="font-outfit font-black text-2xl text-slate-800 mt-0.5">${gamify.avgScore} <span class="text-xs font-normal text-slate-400">/ 100</span></div>
                    </div>
                </div>

            </div>

            <!-- 3. Misi Belajar Hari Ini -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <div>
                        <h3 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                            <i class="fa-solid fa-bullseye text-brand-600"></i> Misi Belajar Hari Ini 🎯
                        </h3>
                        <p class="text-xs text-slate-500 mt-0.5">Selesaikan misi harian untuk mendapatkan bonus XP dan mempercepat kenaikan level</p>
                    </div>
                    <span class="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1.5 rounded-full self-start sm:self-auto border border-brand-200">
                        ${missions.filter(m => m.completed).length} / ${missions.length} Selesai
                    </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${missions.map(m => `
                        <div class="p-5 rounded-2xl border ${m.completed ? 'border-emerald-300 bg-emerald-50/40' : 'border-slate-200 bg-slate-50/70'} flex flex-col justify-between space-y-4 transition-all">
                            <div>
                                <div class="flex items-center justify-between gap-2 mb-2">
                                    <div class="w-10 h-10 rounded-xl ${m.completed ? 'bg-emerald-500 text-white' : 'bg-brand-100 text-brand-700'} flex items-center justify-center text-base font-bold shadow-2xs">
                                        <i class="fa-solid ${m.icon}"></i>
                                    </div>
                                    <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${m.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                                        +${m.rewardXp} XP
                                    </span>
                                </div>

                                <h4 class="font-outfit font-bold text-sm text-slate-800 leading-snug">
                                    ${m.title}
                                </h4>
                                <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                                    ${m.description}
                                </p>
                            </div>

                            <div class="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                                <span class="text-xs font-bold ${m.completed ? 'text-emerald-700' : 'text-slate-500'}">
                                    ${m.completed ? '✓ Selesai' : 'Belum Selesai'}
                                </span>
                                
                                ${!m.completed ? `
                                    <button class="btn-do-mission px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-outfit font-bold text-xs shadow-xs transition-all flex items-center gap-1" data-route="${m.actionRoute}">
                                        <span>${m.actionLabel}</span>
                                        <i class="fa-solid fa-arrow-right text-[10px]"></i>
                                    </button>
                                ` : `
                                    <span class="text-xs text-emerald-600 font-extrabold flex items-center gap-1">
                                        <i class="fa-solid fa-circle-check"></i> Klaim Berhasil
                                    </span>
                                `}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- 4. Rekomendasi Belajar & Paket Ujian -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <!-- Left: Rekomendasi Paket Ujian (8 cols) -->
                <div class="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                    <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div>
                            <h3 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                                <i class="fa-solid fa-file-signature text-emerald-600"></i> Rekomendasi Paket Ujian
                            </h3>
                            <p class="text-xs text-slate-500 mt-0.5">Paket soal pilihan sesuai jenjang ${currentUser.kelas || 'kelasmu'}</p>
                        </div>
                        <button id="btn-browse-all-exams" class="text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3.5 py-2 rounded-xl transition-colors">
                            Lihat Semua <i class="fa-solid fa-arrow-right ml-1"></i>
                        </button>
                    </div>

                    ${recommendedPackages.length === 0 ? `
                        <div class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-4">
                            <p class="text-xs text-slate-500">Belum ada paket ujian yang tersedia untuk jenjang kelasmu.</p>
                        </div>
                    ` : `
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            ${recommendedPackages.map(pkg => {
                                const subj = SUBJECTS.find(s => s.id === pkg.subject) || { name: pkg.subject, icon: 'fa-book', badgeBg: 'bg-brand-50', badgeText: 'text-brand-700' };
                                const isSim = pkg.mode === 'simulasi';
                                const qCount = pkg.questionIds ? pkg.questionIds.length : 0;

                                return `
                                    <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-brand-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                                        <div>
                                            <div class="flex items-center justify-between gap-2 mb-2">
                                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${subj.badgeBg} ${subj.badgeText}">
                                                    ${subj.name}
                                                </span>
                                                <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold ${isSim ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}">
                                                    ${isSim ? 'Simulasi' : 'Latihan'}
                                                </span>
                                            </div>

                                            <h4 class="font-outfit font-bold text-base text-slate-800 line-clamp-1">
                                                ${pkg.name}
                                            </h4>

                                            <div class="flex items-center gap-3 mt-3 text-xs text-slate-500">
                                                <span><i class="fa-solid fa-list-ol text-slate-400 mr-1"></i> ${qCount} Soal</span>
                                                <span><i class="fa-solid fa-clock text-slate-400 mr-1"></i> ${pkg.durationMinutes || 15}m</span>
                                                <span><i class="fa-solid fa-award text-amber-500 mr-1"></i> KKM ${pkg.kkm || 70}</span>
                                            </div>
                                        </div>

                                        <button class="btn-quick-exam w-full py-2.5 rounded-xl ${isSim ? 'bg-brand-600 hover:bg-brand-700 shadow-brand-600/20' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'} text-white font-outfit font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5" data-pkg-id="${pkg.id}" data-mode="${pkg.mode}">
                                            <span>${isSim ? 'Mulai Simulasi' : 'Mulai Latihan'}</span>
                                            <i class="fa-solid fa-arrow-right text-[10px]"></i>
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `}
                </div>

                <!-- Right: Rekomendasi Materi Pembelajaran (4 cols) -->
                <div class="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                            <div>
                                <h3 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                                    <i class="fa-solid fa-book-open text-indigo-600"></i> Materi Ajar
                                </h3>
                                <p class="text-xs text-slate-500 mt-0.5">Pelajari konsep materi sebelum ujian</p>
                            </div>
                        </div>

                        ${recommendedMaterials.length === 0 ? `
                            <div class="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-4">
                                <p class="text-xs text-slate-500">Materi ajar akan segera diperbarui oleh Guru.</p>
                            </div>
                        ` : `
                            <div class="space-y-3">
                                ${recommendedMaterials.map(mat => `
                                    <div class="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer btn-open-mat" data-mat-id="${mat.id}">
                                        <span class="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">📘 ${mat.kelas}</span>
                                        <h4 class="font-outfit font-bold text-xs text-slate-800 line-clamp-1">${mat.title}</h4>
                                        <p class="text-[11px] text-slate-500 line-clamp-2 mt-1">${mat.description || 'Pelajari materi dan ringkasan konsep penting.'}</p>
                                    </div>
                                `).join('')}
                            </div>
                        `}
                    </div>

                    <button id="btn-browse-all-materials" class="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-outfit font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2">
                        <i class="fa-solid fa-book-bookmark text-amber-400"></i>
                        <span>Buka Semua Materi</span>
                    </button>
                </div>

            </div>

            <!-- 5. Aktivitas Ujian & Hasil Terbaru -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
                <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div>
                        <h3 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                            <i class="fa-solid fa-clock-rotate-left text-brand-600"></i> Aktivitas Pengerjaan Terbaru
                        </h3>
                        <p class="text-xs text-slate-500 mt-0.5">Daftar nilai ujian dan evaluasi jawaban yang baru saja kamu selesaikan</p>
                    </div>
                    <button id="btn-view-history-tab" class="text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3.5 py-2 rounded-xl transition-colors">
                        Riwayat Lengkap <i class="fa-solid fa-arrow-right ml-1"></i>
                    </button>
                </div>

                ${studentResults.length === 0 ? `
                    <div class="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <div class="w-14 h-14 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mx-auto text-2xl mb-3 shadow-2xs">
                            <i class="fa-solid fa-pen-ruler"></i>
                        </div>
                        <h4 class="font-outfit font-bold text-slate-700 text-base">Belum Ada Riwayat Ujian</h4>
                        <p class="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">Yuk mulai latihan atau simulasi pertamamu sekarang untuk menguji kemampuanmu!</p>
                        <div class="flex items-center justify-center gap-3">
                            <button id="btn-empty-start-sim" class="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md">
                                <i class="fa-solid fa-bolt mr-1"></i> Simulasi Ujian
                            </button>
                            <button id="btn-empty-start-prac" class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md">
                                <i class="fa-solid fa-pen-ruler mr-1"></i> Latihan Soal
                            </button>
                        </div>
                    </div>
                ` : `
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse min-w-[650px]">
                            <thead>
                                <tr class="text-[11px] font-extrabold uppercase text-slate-400 border-b border-slate-200 bg-slate-50/50">
                                    <th class="py-3 px-3">Tanggal</th>
                                    <th class="py-3 px-3">Paket Ujian</th>
                                    <th class="py-3 px-3">Mata Pelajaran</th>
                                    <th class="py-3 px-3">Mode</th>
                                    <th class="py-3 px-3 text-center">Nilai</th>
                                    <th class="py-3 px-3 text-center">Status</th>
                                    <th class="py-3 px-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                                ${studentResults.slice(0, 5).map(res => {
                                    const subj = SUBJECTS.find(s => s.id === res.subject) || { name: res.subject, badgeBg: 'bg-slate-100', badgeText: 'text-slate-700' };
                                    const formattedDate = new Date(res.completedAt).toLocaleDateString('id-ID', {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    });

                                    return `
                                        <tr class="hover:bg-slate-50/80 transition-colors">
                                            <td class="py-3.5 px-3 text-slate-500 whitespace-nowrap">${formattedDate}</td>
                                            <td class="py-3.5 px-3 font-bold text-slate-800">${res.packageName}</td>
                                            <td class="py-3.5 px-3 whitespace-nowrap">
                                                <span class="px-2.5 py-1 rounded-md text-[11px] font-bold ${subj.badgeBg} ${subj.badgeText}">
                                                    ${subj.name}
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-3 whitespace-nowrap">
                                                <span class="px-2.5 py-1 rounded-md text-[11px] font-bold ${res.mode === 'simulasi' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}">
                                                    ${res.mode === 'simulasi' ? 'Simulasi' : 'Latihan'}
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-3 text-center whitespace-nowrap">
                                                <span class="font-outfit font-black text-base ${res.score >= (res.kkm || 70) ? 'text-emerald-600' : 'text-rose-600'}">
                                                    ${res.score}
                                                </span>
                                                <span class="text-[10px] text-slate-400">/100</span>
                                            </td>
                                            <td class="py-3.5 px-3 text-center whitespace-nowrap">
                                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${res.status === 'LULUS' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'}">
                                                    ${res.status}
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-3 text-right whitespace-nowrap">
                                                <button data-res-id="${res.id}" class="btn-dash-view-result px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-bold text-xs transition-colors border border-slate-200">
                                                    Detail <i class="fa-solid fa-chevron-right text-[10px] ml-1"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                `}
            </div>

        </div>
    `;

    // Event Attachments
    document.getElementById('hero-btn-materials')?.addEventListener('click', () => onNavigate('student-materials'));
    document.getElementById('hero-btn-start-exam')?.addEventListener('click', () => onNavigate('exam-simulation'));
    document.getElementById('btn-browse-all-exams')?.addEventListener('click', () => onNavigate('exam-simulation'));
    document.getElementById('btn-browse-all-materials')?.addEventListener('click', () => onNavigate('student-materials'));
    document.getElementById('btn-view-history-tab')?.addEventListener('click', () => onNavigate('student-history'));
    document.getElementById('btn-empty-start-sim')?.addEventListener('click', () => onNavigate('exam-simulation'));
    document.getElementById('btn-empty-start-prac')?.addEventListener('click', () => onNavigate('exam-practice'));

    container.querySelectorAll('.btn-do-mission').forEach(btn => {
        btn.addEventListener('click', () => {
            const route = btn.getAttribute('data-route');
            if (route && onNavigate) onNavigate(route);
        });
    });

    container.querySelectorAll('.btn-quick-exam').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            if (mode === 'latihan') {
                onNavigate('exam-practice');
            } else {
                onNavigate('exam-simulation');
            }
        });
    });

    container.querySelectorAll('.btn-open-mat').forEach(btn => {
        btn.addEventListener('click', () => {
            const matId = btn.getAttribute('data-mat-id');
            onNavigate('student-materials', { materialId: matId });
        });
    });

    container.querySelectorAll('.btn-dash-view-result').forEach(btn => {
        btn.addEventListener('click', () => {
            const resId = btn.getAttribute('data-res-id');
            const found = studentResults.find(r => r.id === resId);
            if (found && onViewResult) onViewResult(found);
        });
    });
}
