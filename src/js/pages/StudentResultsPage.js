// Student Results Analytics Hub Component (Hasil Belajarku)

import { storageService } from '../services/storageService.js';
import { SUBJECTS } from '../config/constants.js';

export function renderStudentResultsPage(container, currentUser, onNavigate, onViewResult) {
    const studentResults = storageService.getResultsByStudent(currentUser.id);
    const gamify = storageService.getStudentGamification(currentUser.id);

    // Group results by subject
    const subjectStats = SUBJECTS.map(s => {
        const tests = studentResults.filter(r => r.subject === s.id);
        const count = tests.length;
        const totalScore = tests.reduce((acc, r) => acc + (Number(r.score) || 0), 0);
        const avg = count > 0 ? Math.round(totalScore / count) : 0;
        const passedCount = tests.filter(r => r.status === 'LULUS' || (r.score >= (r.kkm || 70))).length;
        const highestScore = count > 0 ? Math.max(...tests.map(r => Number(r.score) || 0)) : 0;

        return {
            subject: s,
            count,
            avg,
            passedCount,
            highestScore
        };
    }).filter(st => st.count > 0);

    const latestResult = studentResults.length > 0 ? studentResults[0] : null;

    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            
            <!-- Hero Header Banner -->
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-purple-900 via-indigo-900 to-brand-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div class="relative z-10">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-purple-200 font-bold text-xs mb-2 border border-white/20">
                        <i class="fa-solid fa-chart-line"></i> Analisis & Perkembangan Belajar
                    </div>
                    <h2 class="font-outfit font-black text-2xl sm:text-3xl tracking-tight">
                        Hasil Belajarku 📊
                    </h2>
                    <p class="text-purple-200 text-xs sm:text-sm mt-1 max-w-xl">
                        Pantau performa nilai ujian, rata-rata skor per mata pelajaran, dan pencapaian KKM kamu selama belajar di TKA Smart Exam.
                    </p>
                </div>

                <div class="relative z-10 flex items-center gap-3">
                    <button id="btn-results-start-exam" class="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-purple-900 font-outfit font-bold text-xs shadow-md transition-all flex items-center gap-2">
                        <i class="fa-solid fa-play text-brand-600"></i>
                        <span>Mulai Ujian Baru</span>
                    </button>
                </div>
            </div>

            ${studentResults.length === 0 ? `
                <!-- Empty State -->
                <div class="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-4">
                    <div class="w-20 h-20 rounded-3xl bg-purple-50 text-purple-600 mx-auto flex items-center justify-center text-4xl shadow-sm">
                        <i class="fa-solid fa-square-poll-vertical"></i>
                    </div>
                    <h3 class="font-outfit font-black text-xl text-slate-800">Belum Ada Hasil Ujian</h3>
                    <p class="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                        Kamu belum mengerjakan latihan atau simulasi ujian CBT. Yuk, mulai latihan pertamamu sekarang dan kumpulkan nilai terbaikmu!
                    </p>
                    <div class="pt-2">
                        <button id="btn-empty-start-exam" class="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-outfit font-bold text-xs shadow-md shadow-brand-600/30 transition-all inline-flex items-center gap-2">
                            <i class="fa-solid fa-play"></i>
                            <span>Pilih Paket Latihan</span>
                        </button>
                    </div>
                </div>
            ` : `
                <!-- Top Metric Cards -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    
                    <!-- Card 1: Rata-Rata Nilai -->
                    <div class="gamify-card p-5 flex items-center gap-4">
                        <div class="w-13 h-13 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl font-black shrink-0">
                            <i class="fa-solid fa-calculator"></i>
                        </div>
                        <div>
                            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rata-Rata Nilai</div>
                            <div class="font-outfit font-black text-2xl text-slate-800 mt-0.5">
                                ${gamify.avgScore} <span class="text-xs text-slate-400 font-normal">/ 100</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card 2: Total Ujian Selesai -->
                    <div class="gamify-card p-5 flex items-center gap-4">
                        <div class="w-13 h-13 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-black shrink-0">
                            <i class="fa-solid fa-file-circle-check"></i>
                        </div>
                        <div>
                            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ujian Selesai</div>
                            <div class="font-outfit font-black text-2xl text-slate-800 mt-0.5">
                                ${gamify.totalExams} <span class="text-xs text-slate-400 font-normal">Kali</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card 3: Tingkat Kelulusan KKM -->
                    <div class="gamify-card p-5 flex items-center gap-4">
                        <div class="w-13 h-13 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-black shrink-0">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <div>
                            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lulus KKM</div>
                            <div class="font-outfit font-black text-2xl text-slate-800 mt-0.5">
                                ${gamify.passedCount} <span class="text-xs text-slate-400 font-normal">/ ${gamify.totalExams}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card 4: Nilai Ujian Terakhir -->
                    <div class="gamify-card p-5 flex items-center gap-4">
                        <div class="w-13 h-13 rounded-2xl ${latestResult && latestResult.score >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'} flex items-center justify-center text-2xl font-black shrink-0">
                            <i class="fa-solid fa-trophy"></i>
                        </div>
                        <div>
                            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nilai Terakhir</div>
                            <div class="font-outfit font-black text-2xl text-slate-800 mt-0.5">
                                ${latestResult ? latestResult.score : 0} <span class="text-xs text-slate-400 font-normal">/ 100</span>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- Subject Breakdown Section -->
                <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
                    <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                        <div>
                            <h3 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                                <i class="fa-solid fa-layer-group text-brand-600"></i> Rekap Nilai Per Mata Pelajaran
                            </h3>
                            <p class="text-xs text-slate-500 mt-0.5">Ringkasan performa dan penguasaan per mata pelajaran yang pernah diuji</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        ${subjectStats.map(st => `
                            <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-brand-300 transition-all space-y-3">
                                <div class="flex items-center justify-between">
                                    <span class="px-3 py-1 rounded-full text-xs font-bold ${st.subject.badgeBg || 'bg-brand-50'} ${st.subject.badgeText || 'text-brand-700'} flex items-center gap-1.5">
                                        <i class="fa-solid ${st.subject.icon}"></i> ${st.subject.name}
                                    </span>
                                    <span class="text-[11px] font-bold text-slate-500">${st.count} Ujian</span>
                                </div>

                                <div class="flex items-baseline justify-between pt-1">
                                    <div>
                                        <div class="text-[10px] text-slate-400 font-bold uppercase">Rata-Rata</div>
                                        <div class="font-outfit font-black text-2xl ${st.avg >= 70 ? 'text-emerald-600' : 'text-amber-600'}">${st.avg}</div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-[10px] text-slate-400 font-bold uppercase">Nilai Tertinggi</div>
                                        <div class="font-outfit font-black text-xl text-slate-800">${st.highestScore}</div>
                                    </div>
                                </div>

                                <!-- Progress Bar -->
                                <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                    <div class="h-full ${st.avg >= 70 ? 'bg-emerald-500' : 'bg-amber-500'} rounded-full transition-all" style="width: ${st.avg}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Recent Detailed Results Table -->
                <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
                    <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                        <div>
                            <h3 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                                <i class="fa-solid fa-clock-rotate-left text-brand-600"></i> Hasil Ujian Terbaru
                            </h3>
                            <p class="text-xs text-slate-500 mt-0.5">Daftar pengerjaan ujian dan pembahasan kunci jawaban</p>
                        </div>
                        <button id="btn-view-full-history" class="text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3.5 py-2 rounded-xl transition-colors">
                            Lihat Semua Riwayat <i class="fa-solid fa-arrow-right ml-1"></i>
                        </button>
                    </div>

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
                                ${studentResults.slice(0, 10).map(res => {
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
                                                <button data-result-id="${res.id}" class="btn-detail-result px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-bold text-xs transition-colors border border-slate-200">
                                                    Lihat Detail <i class="fa-solid fa-chevron-right text-[10px] ml-1"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `}

        </div>
    `;

    // Event Listeners
    document.getElementById('btn-results-start-exam')?.addEventListener('click', () => onNavigate('exam-simulation'));
    document.getElementById('btn-empty-start-exam')?.addEventListener('click', () => onNavigate('exam-simulation'));
    document.getElementById('btn-view-full-history')?.addEventListener('click', () => onNavigate('student-history'));

    container.querySelectorAll('.btn-detail-result').forEach(btn => {
        btn.addEventListener('click', () => {
            const resId = btn.getAttribute('data-result-id');
            const found = studentResults.find(r => r.id === resId);
            if (found && onViewResult) onViewResult(found);
        });
    });
}
