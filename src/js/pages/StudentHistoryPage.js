// Student Exam History Full Page Component (Riwayat Ujian)

import { storageService } from '../services/storageService.js';
import { SUBJECTS } from '../config/constants.js';

export function renderStudentHistoryPage(container, currentUser, onNavigate, onViewResult) {
    const studentResults = storageService.getResultsByStudent(currentUser.id);
    let searchQuery = '';
    let selectedSubject = 'all';
    let selectedMode = 'all';

    function renderView() {
        const filteredResults = studentResults.filter(res => {
            const matchSearch = !searchQuery || (res.packageName || '').toLowerCase().includes(searchQuery.toLowerCase());
            const matchSubj = selectedSubject === 'all' || res.subject === selectedSubject;
            const matchMode = selectedMode === 'all' || res.mode === selectedMode;
            return matchSearch && matchSubj && matchMode;
        });

        container.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                
                <!-- Page Header -->
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
                    <div class="relative z-10">
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-slate-300 font-bold text-xs mb-2 border border-white/20">
                            <i class="fa-solid fa-clock-rotate-left"></i> Rekam Jejak CBT Siswa
                        </div>
                        <h2 class="font-outfit font-black text-2xl sm:text-3xl tracking-tight">
                            Riwayat Ujian & Latihan 🕒
                        </h2>
                        <p class="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                            Semua catatan pengerjaan paket ujian, durasi waktu, skor, dan pembahasan kunci jawaban tersimpan di sini.
                        </p>
                    </div>

                    <div class="relative z-10 flex items-center gap-2">
                        <button id="btn-history-take-exam" class="px-5 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-outfit font-bold text-xs shadow-md transition-all flex items-center gap-2">
                            <i class="fa-solid fa-play"></i>
                            <span>Pilih Paket Baru</span>
                        </button>
                    </div>
                </div>

                <!-- Filters Toolbar -->
                <div class="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 mb-8 shadow-sm space-y-3">
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <!-- Search Box -->
                        <div class="relative">
                            <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                            <input 
                                type="text" 
                                id="history-search-input" 
                                placeholder="Cari nama paket ujian..." 
                                value="${searchQuery}"
                                class="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium text-slate-700 bg-slate-50 focus:bg-white focus:border-brand-500 outline-none transition-all"
                            />
                        </div>

                        <!-- Subject Filter -->
                        <div>
                            <select id="history-filter-subject" class="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 outline-none">
                                <option value="all" ${selectedSubject === 'all' ? 'selected' : ''}>Semua Mata Pelajaran</option>
                                ${SUBJECTS.map(s => `<option value="${s.id}" ${selectedSubject === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
                            </select>
                        </div>

                        <!-- Mode Filter -->
                        <div>
                            <select id="history-filter-mode" class="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 outline-none">
                                <option value="all" ${selectedMode === 'all' ? 'selected' : ''}>Semua Mode Ujian</option>
                                <option value="simulasi" ${selectedMode === 'simulasi' ? 'selected' : ''}>⚡ Mode Simulasi TKA</option>
                                <option value="latihan" ${selectedMode === 'latihan' ? 'selected' : ''}>📚 Mode Latihan</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- History Table / Cards -->
                ${filteredResults.length === 0 ? `
                    <div class="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                        <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto text-2xl mb-3">
                            <i class="fa-solid fa-folder-open"></i>
                        </div>
                        <h3 class="font-outfit font-black text-slate-700 text-xl">Tidak Ada Riwayat Ujian</h3>
                        <p class="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                            ${searchQuery || selectedSubject !== 'all' || selectedMode !== 'all' ? 'Tidak ada hasil yang sesuai dengan filter pencarian.' : 'Kamu belum pernah mengerjakan paket latihan atau simulasi CBT.'}
                        </p>
                    </div>
                ` : `
                    <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        
                        <!-- Desktop Table -->
                        <div class="hidden md:block overflow-x-auto">
                            <table class="w-full text-left border-collapse">
                                <thead>
                                    <tr class="text-[11px] font-extrabold uppercase text-slate-400 border-b border-slate-200 bg-slate-50/70">
                                        <th class="py-3.5 px-4">Waktu Pengerjaan</th>
                                        <th class="py-3.5 px-4">Nama Paket Ujian</th>
                                        <th class="py-3.5 px-4">Mata Pelajaran</th>
                                        <th class="py-3.5 px-4">Mode</th>
                                        <th class="py-3.5 px-4 text-center">Durasi</th>
                                        <th class="py-3.5 px-4 text-center">Skor</th>
                                        <th class="py-3.5 px-4 text-center">Status</th>
                                        <th class="py-3.5 px-4 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                                    ${filteredResults.map(res => {
                                        const subj = SUBJECTS.find(s => s.id === res.subject) || { name: res.subject, badgeBg: 'bg-slate-100', badgeText: 'text-slate-700' };
                                        const formattedDate = new Date(res.completedAt).toLocaleDateString('id-ID', {
                                            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        });
                                        const mins = Math.floor(res.durationSeconds / 60);
                                        const secs = res.durationSeconds % 60;

                                        return `
                                            <tr class="hover:bg-slate-50/80 transition-colors">
                                                <td class="py-4 px-4 text-slate-500 whitespace-nowrap">${formattedDate}</td>
                                                <td class="py-4 px-4 font-bold text-slate-800">${res.packageName}</td>
                                                <td class="py-4 px-4 whitespace-nowrap">
                                                    <span class="px-2.5 py-1 rounded-md text-[11px] font-bold ${subj.badgeBg} ${subj.badgeText}">
                                                        ${subj.name}
                                                    </span>
                                                </td>
                                                <td class="py-4 px-4 whitespace-nowrap">
                                                    <span class="px-2.5 py-1 rounded-md text-[11px] font-bold ${res.mode === 'simulasi' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}">
                                                        ${res.mode === 'simulasi' ? 'Simulasi' : 'Latihan'}
                                                    </span>
                                                </td>
                                                <td class="py-4 px-4 text-center font-mono whitespace-nowrap">${mins}m ${secs}s</td>
                                                <td class="py-4 px-4 text-center whitespace-nowrap">
                                                    <span class="font-outfit font-black text-base ${res.score >= (res.kkm || 70) ? 'text-emerald-600' : 'text-rose-600'}">
                                                        ${res.score}
                                                    </span>
                                                    <span class="text-[10px] text-slate-400">/100</span>
                                                </td>
                                                <td class="py-4 px-4 text-center whitespace-nowrap">
                                                    <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold ${res.status === 'LULUS' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'}">
                                                        ${res.status}
                                                    </span>
                                                </td>
                                                <td class="py-4 px-4 text-right whitespace-nowrap">
                                                    <button data-res-id="${res.id}" class="btn-open-result px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-bold text-xs transition-colors border border-slate-200">
                                                        Pembahasan <i class="fa-solid fa-chevron-right text-[10px] ml-1"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        `;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>

                        <!-- Mobile Card List -->
                        <div class="md:hidden divide-y divide-slate-100">
                            ${filteredResults.map(res => {
                                const subj = SUBJECTS.find(s => s.id === res.subject) || { name: res.subject, badgeBg: 'bg-slate-100', badgeText: 'text-slate-700' };
                                const formattedDate = new Date(res.completedAt).toLocaleDateString('id-ID', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                });
                                return `
                                    <div class="p-4 space-y-3">
                                        <div class="flex items-start justify-between gap-2">
                                            <div>
                                                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${subj.badgeBg} ${subj.badgeText}">${subj.name}</span>
                                                <h4 class="font-outfit font-bold text-sm text-slate-800 mt-1">${res.packageName}</h4>
                                                <div class="text-[11px] text-slate-400 mt-0.5">${formattedDate}</div>
                                            </div>
                                            <div class="text-right">
                                                <div class="font-outfit font-black text-xl ${res.score >= (res.kkm || 70) ? 'text-emerald-600' : 'text-rose-600'}">${res.score}</div>
                                                <span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold ${res.status === 'LULUS' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">${res.status}</span>
                                            </div>
                                        </div>
                                        <button data-res-id="${res.id}" class="btn-open-result w-full py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5">
                                            <span>Lihat Pembahasan</span>
                                            <i class="fa-solid fa-arrow-right text-[10px]"></i>
                                        </button>
                                    </div>
                                `;
                            }).join('')}
                        </div>

                    </div>
                `}

            </div>
        `;

        attachListeners();
    }

    function attachListeners() {
        document.getElementById('btn-history-take-exam')?.addEventListener('click', () => onNavigate('exam-simulation'));

        const searchInp = document.getElementById('history-search-input');
        if (searchInp) {
            searchInp.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                renderView();
                const newInp = document.getElementById('history-search-input');
                if (newInp) {
                    newInp.focus();
                    newInp.setSelectionRange(newInp.value.length, newInp.value.length);
                }
            });
        }

        document.getElementById('history-filter-subject')?.addEventListener('change', (e) => {
            selectedSubject = e.target.value;
            renderView();
        });

        document.getElementById('history-filter-mode')?.addEventListener('change', (e) => {
            selectedMode = e.target.value;
            renderView();
        });

        container.querySelectorAll('.btn-open-result').forEach(btn => {
            btn.addEventListener('click', () => {
                const resId = btn.getAttribute('data-res-id');
                const found = studentResults.find(r => r.id === resId);
                if (found && onViewResult) onViewResult(found);
            });
        });
    }

    renderView();
}
