// Student Dashboard Page Component

import { storageService } from '../services/storageService.js';
import { SUBJECTS } from '../config/constants.js';

export function renderStudentDashboardPage(container, currentUser, onNavigate, onViewResult) {
    const studentResults = storageService.getResultsByStudent(currentUser.id);
    const totalExams = studentResults.length;
    const lastResult = studentResults.length > 0 ? studentResults[0] : null;

    // Calculate stats
    let totalScoreSum = 0;
    let passedCount = 0;
    studentResults.forEach(r => {
        totalScoreSum += r.score;
        if (r.status === 'LULUS') passedCount++;
    });
    const avgScore = totalExams > 0 ? Math.round(totalScoreSum / totalExams) : 0;

    container.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            
            <!-- Hero Welcome Card -->
            <div class="bg-gradient-to-r from-brand-700 via-brand-600 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-brand-700/20 mb-8 relative overflow-hidden">
                <div class="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none"></div>
                
                <div class="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div class="flex items-center gap-5">
                        <img src="${currentUser.avatar}" alt="Avatar" class="w-20 h-20 rounded-2xl bg-white p-1 shadow-md border-2 border-white/50 object-cover">
                        <div>
                            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-semibold text-xs mb-2 backdrop-blur-sm">
                                <i class="fa-solid fa-graduation-cap"></i> ${currentUser.kelas} • NISN: ${currentUser.nisn}
                            </div>
                            <h2 class="font-outfit font-black text-2xl sm:text-3xl tracking-tight">
                                Halo, ${currentUser.name}! 👋
                            </h2>
                            <p class="text-brand-100 text-sm mt-1 max-w-xl">
                                Siap melatih kemampuan akademis hari ini? Kerjakan soal CBT dengan waktu teratur agar makin terbiasa saat ujian asli TKA!
                            </p>
                        </div>
                    </div>

                    <button id="dash-btn-start-exam" class="px-6 py-3.5 rounded-2xl bg-white text-brand-700 font-outfit font-extrabold text-base shadow-lg hover:bg-brand-50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 whitespace-nowrap">
                        <i class="fa-solid fa-play text-emerald-600"></i> Mulai Ujian Sekarang
                    </button>
                </div>
            </div>

            <!-- Stats Overview Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                
                <!-- Stat 1: Total Selesai -->
                <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
                        <i class="fa-solid fa-file-circle-check"></i>
                    </div>
                    <div>
                        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Latihan</div>
                        <div class="font-outfit font-black text-2xl text-slate-800">${totalExams} <span class="text-xs font-normal text-slate-500">Ujian</span></div>
                    </div>
                </div>

                <!-- Stat 2: Nilai Terakhir -->
                <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl ${lastResult ? (lastResult.score >= 70 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600') : 'bg-slate-100 text-slate-400'} flex items-center justify-center text-xl font-bold">
                        <i class="fa-solid fa-trophy"></i>
                    </div>
                    <div>
                        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nilai Terakhir</div>
                        <div class="font-outfit font-black text-2xl text-slate-800">
                            ${lastResult ? `${lastResult.score} <span class="text-xs font-normal text-slate-400">/ 100</span>` : '-'}
                        </div>
                    </div>
                </div>

                <!-- Stat 3: Rata-rata Nilai -->
                <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold">
                        <i class="fa-solid fa-chart-line"></i>
                    </div>
                    <div>
                        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rata-Rata Nilai</div>
                        <div class="font-outfit font-black text-2xl text-slate-800">
                            ${avgScore} <span class="text-xs font-normal text-slate-400">/ 100</span>
                        </div>
                    </div>
                </div>

                <!-- Stat 4: Tingkat Kelulusan -->
                <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <div>
                        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status Lulus</div>
                        <div class="font-outfit font-black text-2xl text-slate-800">
                            ${passedCount} <span class="text-xs font-normal text-slate-400">/ ${totalExams}</span>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Exam History List -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div>
                        <h3 class="font-outfit font-bold text-xl text-slate-800 flex items-center gap-2">
                            <i class="fa-solid fa-clock-rotate-left text-brand-600"></i> Riwayat Ujian & Latihan
                        </h3>
                        <p class="text-slate-500 text-xs mt-0.5">Daftar pengerjaan ujian CBT dan skor yang telah kamu peroleh</p>
                    </div>
                    <button id="dash-btn-browse-all" class="text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3.5 py-2 rounded-xl transition-colors">
                        Pilih Paket Baru <i class="fa-solid fa-arrow-right ml-1"></i>
                    </button>
                </div>

                ${studentResults.length === 0 ? `
                    <div class="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <div class="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto text-2xl mb-3">
                            <i class="fa-solid fa-pen-ruler"></i>
                        </div>
                        <h4 class="font-outfit font-bold text-slate-700 text-lg">Belum Ada Riwayat Ujian</h4>
                        <p class="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">Kamu belum mengerjakan latihan soal TKA. Klik tombol di bawah untuk memulai latihan pertamamu!</p>
                        <button id="empty-start-btn" class="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-md">
                            Mulai Latihan Pertama
                        </button>
                    </div>
                ` : `
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="text-[11px] font-extrabold uppercase text-slate-400 border-b border-slate-200">
                                    <th class="pb-3 px-3">Tanggal & Waktu</th>
                                    <th class="pb-3 px-3">Nama Paket Ujian</th>
                                    <th class="pb-3 px-3">Mata Pelajaran</th>
                                    <th class="pb-3 px-3">Mode</th>
                                    <th class="pb-3 px-3 text-center">Durasi</th>
                                    <th class="pb-3 px-3 text-center">Nilai</th>
                                    <th class="pb-3 px-3 text-center">Status</th>
                                    <th class="pb-3 px-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                                ${studentResults.map(res => {
                                    const subj = SUBJECTS.find(s => s.id === res.subject) || { name: res.subject, badgeBg: 'bg-slate-100', badgeText: 'text-slate-700' };
                                    const formattedDate = new Date(res.completedAt).toLocaleDateString('id-ID', {
                                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    });
                                    const mins = Math.floor(res.durationSeconds / 60);
                                    const secs = res.durationSeconds % 60;

                                    return `
                                        <tr class="hover:bg-slate-50/80 transition-colors">
                                            <td class="py-3.5 px-3 text-slate-500 whitespace-nowrap">${formattedDate}</td>
                                            <td class="py-3.5 px-3 font-semibold text-slate-800">${res.packageName}</td>
                                            <td class="py-3.5 px-3 whitespace-nowrap">
                                                <span class="px-2.5 py-1 rounded-md text-[11px] font-bold ${subj.badgeBg} ${subj.badgeText}">
                                                    ${subj.name}
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-3 whitespace-nowrap">
                                                <span class="px-2.5 py-1 rounded-md text-[11px] font-bold ${res.mode === 'simulasi' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}">
                                                    ${res.mode === 'simulasi' ? 'Simulasi TKA' : 'Latihan'}
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-3 text-center font-mono whitespace-nowrap">${mins}m ${secs}s</td>
                                            <td class="py-3.5 px-3 text-center whitespace-nowrap">
                                                <span class="font-outfit font-black text-base ${res.score >= (res.kkm || 70) ? 'text-emerald-600' : 'text-rose-600'}">
                                                    ${res.score}
                                                </span>
                                                <span class="text-[10px] text-slate-400">/100</span>
                                            </td>
                                            <td class="py-3.5 px-3 text-center whitespace-nowrap">
                                                <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider ${res.status === 'LULUS' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'}">
                                                    ${res.status}
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-3 text-right whitespace-nowrap">
                                                <button data-result-id="${res.id}" class="btn-view-result text-xs bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-semibold px-3 py-1.5 rounded-lg transition-colors border border-slate-200">
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

    // Event Listeners
    const startBtn = document.getElementById('dash-btn-start-exam');
    if (startBtn) startBtn.addEventListener('click', () => onNavigate('exam-menu'));

    const browseBtn = document.getElementById('dash-btn-browse-all');
    if (browseBtn) browseBtn.addEventListener('click', () => onNavigate('exam-menu'));

    const emptyStartBtn = document.getElementById('empty-start-btn');
    if (emptyStartBtn) emptyStartBtn.addEventListener('click', () => onNavigate('exam-menu'));

    container.querySelectorAll('.btn-view-result').forEach(btn => {
        btn.addEventListener('click', () => {
            const resId = btn.getAttribute('data-result-id');
            const found = studentResults.find(r => r.id === resId);
            if (found && onViewResult) onViewResult(found);
        });
    });
}
