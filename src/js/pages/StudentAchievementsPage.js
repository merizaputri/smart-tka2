// Gamification Hub - Prestasi & Lencana Component (SD Kelas 2-6)

import { storageService } from '../services/storageService.js';

export function renderStudentAchievementsPage(container, currentUser, onNavigate) {
    const gamify = storageService.getStudentGamification(currentUser.id);
    const badges = storageService.getStudentBadges(currentUser.id);

    const unlockedCount = badges.filter(b => b.unlocked).length;

    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            
            <!-- Hero Level Banner -->
            <div class="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-amber-500/20 mb-8 relative overflow-hidden">
                <div class="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                <div class="absolute right-12 top-6 text-7xl text-white/15 pointer-events-none">
                    <i class="fa-solid fa-trophy"></i>
                </div>

                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                    <div class="flex items-center gap-5">
                        <div class="relative">
                            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white text-amber-600 flex items-center justify-center text-4xl sm:text-5xl font-black shadow-lg border-4 border-white/40">
                                <i class="fa-solid ${gamify.levelIcon}"></i>
                            </div>
                            <span class="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 font-outfit font-black text-xs shadow-md border-2 border-white">
                                Lvl ${gamify.level}
                            </span>
                        </div>

                        <div>
                            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs mb-2 backdrop-blur-sm">
                                <i class="fa-solid fa-crown text-amber-200"></i> Peringkat: ${gamify.levelTitle}
                            </div>
                            <h2 class="font-outfit font-black text-2xl sm:text-3xl tracking-tight">
                                Prestasi & Lencana Belajar 🏆
                            </h2>
                            <p class="text-amber-100 text-xs sm:text-sm mt-1 max-w-xl">
                                Kumpulkan XP dari setiap ujian yang kamu selesaikan dan buka seluruh lencana bintang akademik!
                            </p>
                        </div>
                    </div>

                    <!-- Quick Counters -->
                    <div class="flex items-center gap-3 bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
                        <div class="text-center px-3 border-r border-white/20">
                            <div class="text-[10px] uppercase font-bold text-amber-100">Total XP</div>
                            <div class="font-outfit font-black text-xl text-white">${gamify.totalXp}</div>
                        </div>
                        <div class="text-center px-3 border-r border-white/20">
                            <div class="text-[10px] uppercase font-bold text-amber-100">Bintang</div>
                            <div class="font-outfit font-black text-xl text-white">⭐ ${gamify.totalStars}</div>
                        </div>
                        <div class="text-center px-3">
                            <div class="text-[10px] uppercase font-bold text-amber-100">Lencana</div>
                            <div class="font-outfit font-black text-xl text-white">${unlockedCount} / ${badges.length}</div>
                        </div>
                    </div>
                </div>

                <!-- XP Progress Bar to Next Level -->
                <div class="mt-6 pt-5 border-t border-white/20 space-y-2">
                    <div class="flex items-center justify-between text-xs font-bold text-white">
                        <span>Progress Menuju Level ${gamify.level < 6 ? gamify.level + 1 : 'MAX'}</span>
                        <span>${gamify.level < 6 ? `${gamify.xpNeededForNext} XP lagi untuk naik level` : 'Level Maksimal Diraih!'}</span>
                    </div>
                    <div class="w-full h-3.5 rounded-full bg-slate-900/30 p-0.5 border border-white/30 overflow-hidden">
                        <div class="h-full bg-white rounded-full transition-all duration-500 shadow-sm" style="width: ${gamify.progressPercent}%"></div>
                    </div>
                </div>
            </div>

            <!-- Badges Collection Grid -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
                    <div>
                        <h3 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                            <i class="fa-solid fa-medal text-amber-500"></i> Koleksi Lencana (${unlockedCount}/${badges.length} Terbuka)
                        </h3>
                        <p class="text-xs text-slate-500 mt-0.5">Selesaikan target belajar untuk membuka lencana penghargaan berikut</p>
                    </div>

                    <div class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
                        Koleksi Siswa: <strong class="text-slate-800">${currentUser.name}</strong>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    ${badges.map(badge => `
                        <div class="p-5 rounded-2xl transition-all duration-200 flex flex-col justify-between ${badge.unlocked ? 'badge-unlocked' : 'badge-locked'}">
                            <div>
                                <div class="flex items-center justify-between gap-2 mb-3">
                                    <div class="w-12 h-12 rounded-2xl ${badge.unlocked ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30' : 'bg-slate-200 text-slate-400'} flex items-center justify-center text-xl font-black">
                                        <i class="fa-solid ${badge.icon}"></i>
                                    </div>

                                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${badge.unlocked ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-200 text-slate-500'}">
                                        ${badge.unlocked ? '✓ Terbuka' : '🔒 Terkunci'}
                                    </span>
                                </div>

                                <h4 class="font-outfit font-bold text-base text-slate-800 mb-1 leading-snug">
                                    ${badge.title}
                                </h4>
                                <p class="text-xs text-slate-500 leading-relaxed mb-3">
                                    ${badge.description}
                                </p>
                            </div>

                            <div class="pt-3 border-t ${badge.unlocked ? 'border-amber-200/60' : 'border-slate-200'}">
                                <div class="text-[11px] font-bold ${badge.unlocked ? 'text-amber-800' : 'text-slate-400'} flex items-center gap-1">
                                    <i class="fa-solid ${badge.unlocked ? 'fa-check' : 'fa-circle-notch text-[9px]'}"></i>
                                    <span>${badge.progressText}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Level Roadmap Section -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
                <div class="border-b border-slate-100 pb-4 mb-6">
                    <h3 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                        <i class="fa-solid fa-map-location-dot text-indigo-600"></i> Jenjang Level Belajar
                    </h3>
                    <p class="text-xs text-slate-500 mt-0.5">Tingkatkan terus nilaimu untuk mencapai gelar Master TKA Smart</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-center">
                    ${[
                        { lvl: 1, name: 'Pemula Hebat', xp: '0 - 150 XP', icon: 'fa-seedling', bg: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                        { lvl: 2, name: 'Penjelajah Cilik', xp: '151 - 350 XP', icon: 'fa-compass', bg: 'bg-blue-50 border-blue-200 text-blue-700' },
                        { lvl: 3, name: 'Ksatria Belajar', xp: '351 - 650 XP', icon: 'fa-shield-halved', bg: 'bg-purple-50 border-purple-200 text-purple-700' },
                        { lvl: 4, name: 'Bintang Kelas', xp: '651 - 1050 XP', icon: 'fa-star', bg: 'bg-amber-50 border-amber-200 text-amber-700' },
                        { lvl: 5, name: 'Juara Akademik', xp: '1051 - 1600 XP', icon: 'fa-trophy', bg: 'bg-rose-50 border-rose-200 text-rose-700' },
                        { lvl: 6, name: 'Master TKA Smart', xp: '1601+ XP', icon: 'fa-crown', bg: 'bg-yellow-50 border-yellow-300 text-yellow-800' }
                    ].map(step => {
                        const isCurrent = gamify.level === step.lvl;
                        const isPast = gamify.level > step.lvl;
                        return `
                            <div class="p-4 rounded-2xl border ${isCurrent ? 'ring-2 ring-brand-500 bg-brand-50/70 border-brand-300 shadow-md scale-105' : (isPast ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200 opacity-60')} transition-all">
                                <div class="w-10 h-10 rounded-xl mx-auto flex items-center justify-center text-lg font-bold mb-2 ${step.bg}">
                                    <i class="fa-solid ${step.icon}"></i>
                                </div>
                                <div class="text-[10px] font-extrabold uppercase tracking-wider ${isCurrent ? 'text-brand-700' : 'text-slate-400'}">Level ${step.lvl}</div>
                                <div class="font-outfit font-black text-xs text-slate-800 mt-0.5">${step.name}</div>
                                <div class="text-[9px] text-slate-500 mt-1 font-mono">${step.xp}</div>
                                ${isCurrent ? `<span class="inline-block mt-2 px-2 py-0.5 rounded-full bg-brand-600 text-white font-black text-[9px]">Kamu Disini</span>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

        </div>
    `;
}
