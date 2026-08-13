// Admin Dashboard Suite Component

import { storageService } from '../services/storageService.js';
import { exportService } from '../services/exportService.js';
import { CLASSES, SUBJECTS, DIFFICULTY_LEVELS } from '../config/constants.js';
import { renderImportStudentsModal, renderQuestionModal, renderStudentModal, renderPackageModal, renderQuestionMedia, formatRichText } from '../components/Modals.js';

export function renderAdminDashboardPage(container, currentUser, onNavigate) {
    let activeTab = 'siswa'; // 'siswa' | 'soal' | 'paket' | 'laporan' | 'kelas'
    let selectedClassFilter = 'all';
    let selectedSubjectFilter = 'all';
    let soalViewMode = 'cards'; // 'cards' | 'table'

    function renderView() {
        const users = storageService.getUsers().filter(u => u.role === 'siswa');
        const questions = storageService.getQuestions();
        const packages = storageService.getPackages();
        const results = storageService.getResults();

        // Calculate stats
        const totalStudents = users.length;
        const totalQuestions = questions.length;
        const totalPackages = packages.length;
        
        let avgScore = 0;
        if (results.length > 0) {
            const sum = results.reduce((acc, r) => acc + r.score, 0);
            avgScore = Math.round(sum / results.length);
        }

        container.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                
                <!-- Admin Hero Header -->
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-semibold text-xs mb-2 border border-purple-500/30">
                            <i class="fa-solid fa-user-shield"></i> Control Panel Administrator
                        </div>
                        <h2 class="font-outfit font-black text-2xl sm:text-3xl tracking-tight">Manajemen TKA Smart Exam</h2>
                        <p class="text-slate-400 text-xs sm:text-sm mt-1">Kelola data siswa, bank soal, paket ujian CBT, serta pantau laporan kelulusan.</p>
                    </div>

                    <div class="flex items-center gap-3">
                        <button id="admin-btn-export-excel" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-outfit font-bold text-xs shadow-md transition-all flex items-center gap-1.5">
                            <i class="fa-solid fa-file-excel"></i> Export Excel (CSV)
                        </button>
                    </div>
                </div>

                <!-- Quick Stats Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
                            <i class="fa-solid fa-users"></i>
                        </div>
                        <div>
                            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Siswa</div>
                            <div class="font-outfit font-black text-2xl text-slate-800">${totalStudents} <span class="text-xs font-normal text-slate-400">Siswa</span></div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold">
                            <i class="fa-solid fa-folder-tree"></i>
                        </div>
                        <div>
                            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bank Soal</div>
                            <div class="font-outfit font-black text-2xl text-slate-800">${totalQuestions} <span class="text-xs font-normal text-slate-400">Soal</span></div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold">
                            <i class="fa-solid fa-box-archive"></i>
                        </div>
                        <div>
                            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Paket Ujian</div>
                            <div class="font-outfit font-black text-2xl text-slate-800">${totalPackages} <span class="text-xs font-normal text-slate-400">Paket</span></div>
                        </div>
                    </div>

                    <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl font-bold">
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <div>
                            <div class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rata-Rata Nilai</div>
                            <div class="font-outfit font-black text-2xl text-slate-800">${avgScore} <span class="text-xs font-normal text-slate-400">/ 100</span></div>
                        </div>
                    </div>
                </div>

                <!-- Admin Main Navigation Tabs -->
                <div class="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-slate-200">
                    <button id="admin-tab-siswa" class="px-5 py-3 rounded-2xl font-outfit text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'siswa' ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
                        <i class="fa-solid fa-users mr-1.5"></i> Manajemen Siswa
                    </button>
                    <button id="admin-tab-soal" class="px-5 py-3 rounded-2xl font-outfit text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'soal' ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
                        <i class="fa-solid fa-file-lines mr-1.5"></i> Manajemen Soal
                    </button>
                    <button id="admin-tab-paket" class="px-5 py-3 rounded-2xl font-outfit text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'paket' ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
                        <i class="fa-solid fa-boxes-stacked mr-1.5"></i> Paket Ujian
                    </button>
                    <button id="admin-tab-laporan" class="px-5 py-3 rounded-2xl font-outfit text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'laporan' ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
                        <i class="fa-solid fa-chart-pie mr-1.5"></i> Laporan & Ranking
                    </button>
                </div>

                <!-- TAB CONTENTS -->
                <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
                    ${activeTab === 'siswa' ? renderSiswaTab(users) : ''}
                    ${activeTab === 'soal' ? renderSoalTab(questions) : ''}
                    ${activeTab === 'paket' ? renderPaketTab(packages, questions) : ''}
                    ${activeTab === 'laporan' ? renderLaporanTab(results) : ''}
                </div>

            </div>
        `;

        attachGlobalListeners();
    }

    // --- SUB-RENDERERS ---

    // 1. MANAJEMEN SISWA TAB
    function renderSiswaTab(users) {
        const filteredUsers = users.filter(u => selectedClassFilter === 'all' || u.kelas === selectedClassFilter);

        return `
            <div>
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
                    <div>
                        <h3 class="font-outfit font-black text-xl text-slate-800">Daftar Data Siswa</h3>
                        <p class="text-xs text-slate-500 mt-0.5">Kelola data siswa per kelas dan NISN untuk akses ujian CBT</p>
                    </div>

                    <div class="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <select id="filter-class-siswa" class="flex-1 sm:flex-none px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 outline-none">
                            <option value="all" ${selectedClassFilter === 'all' ? 'selected' : ''}>Semua Kelas</option>
                            ${CLASSES.map(c => `<option value="${c}" ${selectedClassFilter === c ? 'selected' : ''}>${c}</option>`).join('')}
                        </select>

                        <button id="btn-import-siswa" class="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 transition-colors">
                            <i class="fa-solid fa-file-import mr-1"></i> Import JSON
                        </button>
                        <button id="btn-add-siswa" class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all">
                            <i class="fa-solid fa-plus mr-1"></i> Tambah Siswa Baru
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                    <table class="w-full text-left border-collapse min-w-[650px]">
                        <thead>
                            <tr class="text-[11px] font-extrabold uppercase text-slate-400 border-b border-slate-200 bg-slate-50">
                                <th class="py-3 px-4">Siswa</th>
                                <th class="py-3 px-4">NISN</th>
                                <th class="py-3 px-4">Kelas</th>
                                <th class="py-3 px-4">Password</th>
                                <th class="py-3 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                            ${filteredUsers.map(u => `
                                <tr class="hover:bg-slate-50/80 transition-colors">
                                    <td class="py-3.5 px-4 flex items-center gap-3">
                                        <img src="${u.avatar}" class="w-8 h-8 rounded-full bg-slate-100 p-0.5 border border-slate-200 object-cover">
                                        <span class="font-bold text-slate-800">${u.name}</span>
                                    </td>
                                    <td class="py-3.5 px-4 font-mono text-slate-600">${u.nisn}</td>
                                    <td class="py-3.5 px-4">
                                        <span class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-brand-50 text-brand-700">${u.kelas}</span>
                                    </td>
                                    <td class="py-3.5 px-4 font-mono text-slate-500">${u.password}</td>
                                    <td class="py-3.5 px-4 text-right space-x-1">
                                        <button data-edit-user="${u.id}" class="text-brand-600 hover:bg-brand-50 p-2 rounded-lg transition-colors" title="Edit Siswa">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button data-delete-user="${u.id}" class="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-colors" title="Hapus Siswa">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // 2. MANAJEMEN SOAL TAB
    function renderSoalTab(questions) {
        const filteredQuestions = questions.filter(q => {
            const matchClass = selectedClassFilter === 'all' || q.kelas === selectedClassFilter;
            const matchSubj = selectedSubjectFilter === 'all' || q.subject === selectedSubjectFilter;
            return matchClass && matchSubj;
        });

        return `
            <div>
                <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
                    <div>
                        <h3 class="font-outfit font-black text-xl text-slate-800">Bank Soal TKA</h3>
                        <p class="text-xs text-slate-500 mt-0.5">Kelola soal pilihan ganda, gambar, kunci jawaban, dan pembahasan</p>
                    </div>

                    <div class="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
                        <!-- Responsive View Mode Toggle (Cards / Data Table) -->
                        <div class="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                            <button id="soal-view-cards" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${soalViewMode === 'cards' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}">
                                <i class="fa-solid fa-border-all"></i> <span class="hidden sm:inline">Kartu</span>
                            </button>
                            <button id="soal-view-table" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${soalViewMode === 'table' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}">
                                <i class="fa-solid fa-table-list"></i> <span class="hidden sm:inline">Tabel</span>
                            </button>
                        </div>

                        <select id="filter-class-soal" class="flex-1 sm:flex-none px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 outline-none">
                            <option value="all" ${selectedClassFilter === 'all' ? 'selected' : ''}>Semua Kelas</option>
                            ${CLASSES.map(c => `<option value="${c}" ${selectedClassFilter === c ? 'selected' : ''}>${c}</option>`).join('')}
                        </select>

                        <select id="filter-subj-soal" class="flex-1 sm:flex-none px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 outline-none">
                            <option value="all" ${selectedSubjectFilter === 'all' ? 'selected' : ''}>Semua Mapel</option>
                            ${SUBJECTS.map(s => `<option value="${s.id}" ${selectedSubjectFilter === s.id ? 'selected' : ''}>${s.name}</option>`).join('')}
                        </select>

                        <button id="btn-add-soal" class="w-full sm:w-auto px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1">
                            <i class="fa-solid fa-plus"></i> Tambah Soal Baru
                        </button>
                    </div>
                </div>

                ${filteredQuestions.length === 0 ? `
                    <div class="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6">
                        <i class="fa-solid fa-folder-open text-3xl text-slate-400 mb-2"></i>
                        <p class="text-xs font-bold text-slate-600">Tidak ada soal yang ditemukan.</p>
                        <p class="text-[11px] text-slate-400 mt-0.5">Coba ubah filter kelas/mapel atau tambahkan soal baru.</p>
                    </div>
                ` : soalViewMode === 'table' ? `
                    <!-- Responsive Data Table View -->
                    <div class="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                        <table class="w-full text-left border-collapse min-w-[750px]">
                            <thead>
                                <tr class="text-[11px] font-extrabold uppercase text-slate-400 border-b border-slate-200 bg-slate-50">
                                    <th class="py-3 px-4 w-12 text-center">#</th>
                                    <th class="py-3 px-4 w-44">Kelas & Mapel</th>
                                    <th class="py-3 px-4">Teks Soal & Pembahasan</th>
                                    <th class="py-3 px-4 w-36 text-center">Kunci Jawaban</th>
                                    <th class="py-3 px-4 w-28 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                                ${filteredQuestions.map((q, idx) => {
                                    const subj = SUBJECTS.find(s => s.id === q.subject) || { name: q.subject };
                                    const correctOpt = q.options ? q.options.find(o => o.id === q.answerKey) : null;
                                    return `
                                        <tr class="hover:bg-slate-50/80 transition-colors">
                                            <td class="py-3.5 px-4 text-center font-outfit font-bold text-slate-600 align-top">
                                                ${idx + 1}
                                            </td>
                                            <td class="py-3.5 px-4 space-y-1 align-top">
                                                <div class="flex items-center gap-1.5 flex-wrap">
                                                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">${q.kelas}</span>
                                                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">${subj.name}</span>
                                                </div>
                                                <div class="text-[11px] text-slate-400 font-semibold truncate max-w-[150px]">${q.bab || '-'}</div>
                                            </td>
                                            <td class="py-3.5 px-4 align-top">
                                                ${q.passage ? `<div class="mb-2 p-2 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 line-clamp-2"><i class="fa-solid fa-book-open text-amber-600 mr-1"></i> <strong>Wacana:</strong> ${formatRichText(q.passage)}</div>` : ''}
                                                <div class="font-semibold text-slate-800 leading-snug line-clamp-2 max-w-lg mb-1">${formatRichText(q.question)}</div>
                                                ${q.image ? `<div class="inline-flex items-center gap-1 text-[10px] text-brand-600 font-bold mb-1"><i class="fa-solid fa-paperclip"></i> Ada Lampiran Media</div>` : ''}
                                                <div class="text-[11px] text-slate-400 line-clamp-1"><strong>Pembahasan:</strong> ${q.explanation || '-'}</div>
                                            </td>
                                            <td class="py-3.5 px-4 text-center align-top">
                                                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
                                                    <i class="fa-solid fa-key text-emerald-600"></i> ${q.answerKey} ${correctOpt ? `(${correctOpt.text})` : ''}
                                                </span>
                                            </td>
                                            <td class="py-3.5 px-4 text-right space-x-1 align-top">
                                                <button data-edit-question="${q.id}" class="text-brand-600 hover:bg-brand-50 p-2 rounded-lg transition-colors" title="Edit Soal">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                </button>
                                                <button data-delete-question="${q.id}" class="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-colors" title="Hapus Soal">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                ` : `
                    <!-- Responsive Cards View -->
                    <div class="space-y-4">
                        ${filteredQuestions.map((q, idx) => {
                            const subj = SUBJECTS.find(s => s.id === q.subject) || { name: q.subject };
                            return `
                                <div class="border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-brand-300 transition-all bg-slate-50/50">
                                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-200/80">
                                        <div class="flex flex-wrap items-center gap-2">
                                            <span class="font-outfit font-black text-xs px-2.5 py-1 rounded-lg bg-brand-600 text-white">#${idx + 1}</span>
                                            <span class="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-700">${q.kelas}</span>
                                            <span class="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800">${subj.name}</span>
                                            <span class="text-xs font-semibold text-slate-500 max-w-xs truncate">• ${q.bab || 'Bab Ujian'}</span>
                                            ${q.difficulty ? `<span class="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">${q.difficulty}</span>` : ''}
                                            ${q.passage ? `<span class="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 inline-flex items-center gap-1"><i class="fa-solid fa-book-open text-amber-600"></i> Wacana</span>` : ''}
                                        </div>
                                        <div class="flex items-center gap-2 self-end sm:self-auto shrink-0">
                                            <button data-edit-question="${q.id}" class="text-brand-600 hover:bg-brand-50 px-2.5 py-1.5 rounded-lg transition-colors text-xs font-bold border border-brand-200 flex items-center gap-1" title="Edit Soal">
                                                <i class="fa-solid fa-pen-to-square"></i> Edit
                                            </button>
                                            <button data-delete-question="${q.id}" class="text-rose-600 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors text-xs font-bold border border-rose-200 flex items-center gap-1" title="Hapus Soal">
                                                <i class="fa-solid fa-trash-can"></i> Hapus
                                            </button>
                                        </div>
                                    </div>

                                    ${q.passage ? `
                                        <div class="mb-3 p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-950 leading-relaxed shadow-sm">
                                            <div class="font-bold text-amber-900 flex items-center gap-1.5 mb-1.5 text-[11px] uppercase tracking-wider">
                                                <i class="fa-solid fa-book-open text-amber-600"></i> Teks Cerita / Wacana Soal
                                            </div>
                                            <div class="whitespace-pre-line font-serif text-slate-800 leading-relaxed">${formatRichText(q.passage)}</div>
                                        </div>
                                    ` : ''}

                                    <div class="text-slate-800 font-medium text-xs sm:text-sm mb-3 whitespace-pre-line leading-relaxed">
                                        ${formatRichText(q.question)}
                                    </div>

                                    ${renderQuestionMedia(q.image, 'max-h-40 sm:max-h-56 object-contain rounded-lg mb-3 max-w-full')}

                                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs mb-3">
                                        ${q.options.map(opt => `
                                            <div class="p-2.5 rounded-xl border ${opt.id === q.answerKey ? 'bg-emerald-100 border-emerald-400 font-bold text-emerald-900' : 'bg-white border-slate-200 text-slate-700'}">
                                                <strong>${opt.id}.</strong> ${opt.text}
                                            </div>
                                        `).join('')}
                                    </div>

                                    <div class="text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200">
                                        <strong class="text-slate-700"><i class="fa-solid fa-circle-info text-brand-500 mr-1"></i> Pembahasan:</strong> ${q.explanation || '-'}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `}
            </div>
        `;
    }

    // 3. MANAJEMEN PAKET UJIAN TAB
    function renderPaketTab(packages, questions) {
        return `
            <div>
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
                    <div>
                        <h3 class="font-outfit font-black text-xl text-slate-800">Paket Ujian CBT</h3>
                        <p class="text-xs text-slate-500 mt-0.5">Atur durasi timer, KKM, mode ujian latihan/simulasi, acak soal & jawaban</p>
                    </div>

                    <button id="btn-add-paket" class="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all">
                        <i class="fa-solid fa-plus mr-1"></i> Buat Paket Ujian Baru
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${packages.map(pkg => {
                        const subj = SUBJECTS.find(s => s.id === pkg.subject) || { name: pkg.subject };
                        const qCount = pkg.questionIds ? pkg.questionIds.length : 0;
                        const isSim = pkg.mode === 'simulasi';

                        return `
                            <div class="border border-slate-200 rounded-3xl p-6 bg-white hover:shadow-md transition-all relative">
                                <div class="flex items-center justify-between gap-2 mb-3">
                                    <span class="px-3 py-1 rounded-full text-xs font-extrabold ${isSim ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}">
                                        ${isSim ? 'Simulasi TKA' : 'Mode Latihan'}
                                    </span>
                                    <div class="flex items-center gap-1">
                                        <button data-edit-package="${pkg.id}" class="text-brand-600 hover:bg-brand-50 p-2 rounded-lg transition-colors text-xs font-bold" title="Edit Paket">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button data-delete-package="${pkg.id}" class="text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-colors text-xs font-bold" title="Hapus Paket">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                </div>

                                <h4 class="font-outfit font-black text-lg text-slate-800 mb-1">${pkg.name}</h4>
                                <div class="text-xs font-bold text-brand-600 mb-4">${subj.name} • ${pkg.kelas}</div>

                                <div class="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                                    <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                        <div class="text-[10px] text-slate-400">JUMLAH</div>
                                        <div class="font-bold text-slate-800 mt-0.5">${qCount} Soal</div>
                                    </div>
                                    <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                        <div class="text-[10px] text-slate-400">TIMER</div>
                                        <div class="font-bold text-slate-800 mt-0.5">${pkg.durationMinutes} Menit</div>
                                    </div>
                                    <div class="bg-slate-50 p-2 rounded-xl border border-slate-100">
                                        <div class="text-[10px] text-slate-400">KKM</div>
                                        <div class="font-bold text-emerald-600 mt-0.5">${pkg.kkm || 70}</div>
                                    </div>
                                </div>

                                <div class="text-[11px] text-slate-500 space-y-1 bg-slate-50 p-3 rounded-xl">
                                    <div>⚡ Acak Soal: <strong>${pkg.randomizeQuestions ? 'Ya' : 'Tidak'}</strong></div>
                                    <div>🔀 Acak Pilihan: <strong>${pkg.randomizeOptions ? 'Ya' : 'Tidak'}</strong></div>
                                    <div>👁️ Hasil ke Siswa: <strong>${pkg.showResultsToStudent !== false ? 'Langsung Tampil' : 'Disembunyikan'}</strong></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    // 4. LAPORAN & RANKING TAB
    function renderLaporanTab(results) {
        return `
            <div>
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
                    <div>
                        <h3 class="font-outfit font-black text-xl text-slate-800">Laporan Hasil & Peringkat Siswa</h3>
                        <p class="text-xs text-slate-500 mt-0.5">Pantau nilai ujian, durasi pengerjaan, dan ranking kelulusan</p>
                    </div>

                    <button id="btn-export-laporan" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all">
                        <i class="fa-solid fa-file-excel mr-1"></i> Download Laporan Excel
                    </button>
                </div>

                <div class="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                    <table class="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr class="text-[11px] font-extrabold uppercase text-slate-400 border-b border-slate-200 bg-slate-50">
                                <th class="py-3 px-4">Ranking</th>
                                <th class="py-3 px-4">Nama Siswa</th>
                                <th class="py-3 px-4">Kelas</th>
                                <th class="py-3 px-4">Paket Ujian</th>
                                <th class="py-3 px-4 text-center">Nilai</th>
                                <th class="py-3 px-4 text-center">Durasi</th>
                                <th class="py-3 px-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                            ${results.sort((a,b) => b.score - a.score).map((r, rankIdx) => `
                                <tr class="hover:bg-slate-50/80 transition-colors">
                                    <td class="py-3.5 px-4">
                                        <span class="w-7 h-7 rounded-full flex items-center justify-center font-outfit font-black text-xs ${rankIdx === 0 ? 'bg-amber-400 text-amber-950' : rankIdx === 1 ? 'bg-slate-300 text-slate-900' : rankIdx === 2 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'}">
                                            ${rankIdx + 1}
                                        </span>
                                    </td>
                                    <td class="py-3.5 px-4 font-bold text-slate-800">${r.studentName}</td>
                                    <td class="py-3.5 px-4">${r.kelas}</td>
                                    <td class="py-3.5 px-4 font-medium text-slate-700">${r.packageName}</td>
                                    <td class="py-3.5 px-4 text-center font-outfit font-black text-base ${r.score >= (r.kkm||70) ? 'text-emerald-600' : 'text-rose-600'}">${r.score}</td>
                                    <td class="py-3.5 px-4 text-center font-mono">${Math.floor(r.durationSeconds/60)}m ${r.durationSeconds%60}s</td>
                                    <td class="py-3.5 px-4 text-center">
                                        <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold ${r.status === 'LULUS' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">${r.status}</span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // --- EVENT ATTACHMENT ---
    function attachGlobalListeners() {
        document.getElementById('admin-tab-siswa')?.addEventListener('click', () => { activeTab = 'siswa'; renderView(); });
        document.getElementById('admin-tab-soal')?.addEventListener('click', () => { activeTab = 'soal'; renderView(); });
        document.getElementById('admin-tab-paket')?.addEventListener('click', () => { activeTab = 'paket'; renderView(); });
        document.getElementById('admin-tab-laporan')?.addEventListener('click', () => { activeTab = 'laporan'; renderView(); });

        document.getElementById('soal-view-cards')?.addEventListener('click', () => { soalViewMode = 'cards'; renderView(); });
        document.getElementById('soal-view-table')?.addEventListener('click', () => { soalViewMode = 'table'; renderView(); });

        document.getElementById('filter-class-siswa')?.addEventListener('change', (e) => { selectedClassFilter = e.target.value; renderView(); });
        document.getElementById('filter-class-soal')?.addEventListener('change', (e) => { selectedClassFilter = e.target.value; renderView(); });
        document.getElementById('filter-subj-soal')?.addEventListener('change', (e) => { selectedSubjectFilter = e.target.value; renderView(); });

        // Add Siswa
        document.getElementById('btn-add-siswa')?.addEventListener('click', () => {
            renderStudentModal(null, async (newStudentData) => {
                await storageService.saveUser(newStudentData);
                renderView();
            });
        });

        // Edit Siswa
        container.querySelectorAll('[data-edit-user]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-edit-user');
                const users = storageService.getUsers();
                const studentToEdit = users.find(u => u.id === id);
                if (studentToEdit) {
                    renderStudentModal(studentToEdit, async (updatedStudentData) => {
                        await storageService.saveUser(updatedStudentData);
                        renderView();
                    });
                }
            });
        });

        // Delete Siswa
        container.querySelectorAll('[data-delete-user]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-delete-user');
                if (confirm("Hapus siswa ini?")) {
                    await storageService.deleteUser(id);
                    renderView();
                }
            });
        });

        // Import Siswa Modal
        document.getElementById('btn-import-siswa')?.addEventListener('click', () => {
            renderImportStudentsModal(async (importedList) => {
                const count = await storageService.importUsers(importedList);
                alert(`Berhasil mengimport ${count} data siswa!`);
                renderView();
            });
        });

        // Add Soal
        document.getElementById('btn-add-soal')?.addEventListener('click', () => {
            renderQuestionModal(null, async (newQuestionData) => {
                await storageService.saveQuestion(newQuestionData);
                renderView();
            });
        });

        // Edit Soal
        container.querySelectorAll('[data-edit-question]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-edit-question');
                const questions = storageService.getQuestions();
                const questionToEdit = questions.find(q => q.id === id);
                if (questionToEdit) {
                    renderQuestionModal(questionToEdit, async (updatedData) => {
                        await storageService.saveQuestion(updatedData);
                        renderView();
                    });
                }
            });
        });

        // Delete Soal
        container.querySelectorAll('[data-delete-question]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-delete-question');
                if (confirm("Hapus soal ini dari bank soal?")) {
                    await storageService.deleteQuestion(id);
                    renderView();
                }
            });
        });

        // Add Paket
        document.getElementById('btn-add-paket')?.addEventListener('click', () => {
            const allQuestions = storageService.getQuestions();
            renderPackageModal(null, allQuestions, async (newPackageData) => {
                await storageService.savePackage(newPackageData);
                renderView();
            });
        });

        // Edit Paket
        container.querySelectorAll('[data-edit-package]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-edit-package');
                const packages = storageService.getPackages();
                const pkgToEdit = packages.find(p => p.id === id);
                if (pkgToEdit) {
                    const allQuestions = storageService.getQuestions();
                    renderPackageModal(pkgToEdit, allQuestions, async (updatedPackageData) => {
                        await storageService.savePackage(updatedPackageData);
                        renderView();
                    });
                }
            });
        });

        // Delete Paket
        container.querySelectorAll('[data-delete-package]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-delete-package');
                if (confirm("Hapus paket ujian ini?")) {
                    await storageService.deletePackage(id);
                    renderView();
                }
            });
        });

        // Export Excel
        const exportExcelHandler = () => {
            const results = storageService.getResults();
            const exportData = results.map(r => ({
                "ID Hasil": r.id,
                "Nama Siswa": r.studentName,
                "Kelas": r.kelas,
                "Paket Ujian": r.packageName,
                "Mode": r.mode,
                "Nilai Akhir": r.score,
                "Benar": r.correctCount,
                "Salah": r.wrongCount,
                "KKM": r.kkm,
                "Status": r.status,
                "Durasi (detik)": r.durationSeconds,
                "Waktu Selesai": r.completedAt
            }));
            exportService.exportToExcel(exportData, 'Laporan_Nilai_TKA_SmartExam.xlsx');
        };

        document.getElementById('admin-btn-export-excel')?.addEventListener('click', exportExcelHandler);
        document.getElementById('btn-export-laporan')?.addEventListener('click', exportExcelHandler);
    }

    renderView();
}
