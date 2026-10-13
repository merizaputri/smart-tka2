// Gamified Results & Detailed Pembahasan Page Component

import { exportService } from '../services/exportService.js';
import { storageService } from '../services/storageService.js';
import { SUBJECTS } from '../config/constants.js';
import { renderQuestionMedia, formatRichText } from '../components/Modals.js';

export function renderResultPage(container, resultObj, onNavigate) {
    if (!resultObj) {
        container.innerHTML = `<div class="p-8 text-center font-outfit">Data hasil ujian tidak ditemukan.</div>`;
        return;
    }

    const isPassed = resultObj.status === 'LULUS';
    const subj = SUBJECTS.find(s => s.id === resultObj.subject) || { name: resultObj.subject };
    const hideResults = resultObj.showResultsToStudent === false && resultObj.mode === 'simulasi';

    const mins = Math.floor(resultObj.durationSeconds / 60);
    const secs = resultObj.durationSeconds % 60;

    // Calculate earned XP for this specific exam
    const score = Number(resultObj.score) || 0;
    const earnedXp = 50 + score + (isPassed ? 30 : 0) + (score === 100 ? 50 : 0);
    let earnedStars = 0;
    if (score >= 90) earnedStars = 3;
    else if (score >= 75) earnedStars = 2;
    else if (score >= 60) earnedStars = 1;

    container.innerHTML = `
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
            
            <!-- Hero Score & Gamified Reward Card -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                <div class="bg-gradient-to-br ${isPassed ? 'from-emerald-600 via-teal-600 to-indigo-700' : 'from-rose-600 via-amber-600 to-slate-800'} p-6 sm:p-10 text-white text-center relative overflow-hidden">
                    <div class="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white font-bold text-xs backdrop-blur-sm mb-3">
                        <i class="fa-solid fa-square-poll-vertical"></i> HASIL UJIAN CBT TKA
                    </div>

                    <h2 class="font-outfit font-black text-2xl sm:text-3xl tracking-tight mb-1">
                        ${resultObj.packageName}
                    </h2>
                    <p class="text-white/80 text-xs sm:text-sm max-w-md mx-auto">
                        Mata Pelajaran: <strong>${subj.name}</strong> • ${resultObj.kelas || 'SD'}
                    </p>

                    ${hideResults ? `
                        <div class="my-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-md mx-auto">
                            <div class="text-3xl mb-2"><i class="fa-solid fa-lock"></i></div>
                            <div class="font-outfit font-bold text-lg">Hasil Ujian Disimpan</div>
                            <p class="text-xs text-white/90 mt-1">Sesuai aturan Admin, hasil skor ujian simulasi ini disembunyikan dan akan diumumkan langsung oleh Bapak/Ibu Guru.</p>
                        </div>
                    ` : `
                        <!-- Big Score Circle & Gamified Stars -->
                        <div class="my-6 flex flex-col items-center">
                            <div class="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full bg-white text-slate-800 shadow-2xl border-4 border-white/40 font-outfit transform hover:scale-105 transition-transform">
                                <div class="text-4xl sm:text-5xl font-black ${isPassed ? 'text-emerald-600' : 'text-rose-600'} leading-none">
                                    ${resultObj.score}
                                </div>
                                <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">DARI 100</div>
                            </div>

                            <!-- Star Ratings -->
                            <div class="flex items-center gap-1 mt-3 text-2xl text-amber-300">
                                ${Array.from({ length: 3 }).map((_, i) => `
                                    <i class="fa-solid fa-star ${i < earnedStars ? 'text-amber-300 drop-shadow-md' : 'text-white/30'}"></i>
                                `).join('')}
                            </div>

                            <!-- XP Reward Pill -->
                            <div class="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full bg-slate-900/40 backdrop-blur-md text-amber-300 font-outfit font-bold text-xs border border-white/30">
                                <i class="fa-solid fa-bolt text-amber-400"></i>
                                <span>Kamu Mendapatkan +${earnedXp} XP Belajar!</span>
                            </div>
                        </div>

                        <!-- Pass/Fail Badge -->
                        <div class="inline-block px-6 py-2 rounded-full font-outfit font-black text-xs sm:text-sm uppercase tracking-wider ${isPassed ? 'bg-white text-emerald-800 shadow-lg' : 'bg-white text-rose-800 shadow-lg'}">
                            ${isPassed ? '🎉 LULUS (MEMENUHI KKM)' : '⚠️ BELUM LULUS (DI BAWAH KKM)'}
                        </div>
                    `}

                </div>

                ${!hideResults ? `
                    <!-- Score Details Breakdown Stats -->
                    <div class="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-100 bg-slate-50 border-t border-slate-100 text-center">
                        <div class="p-4 sm:p-5">
                            <div class="text-[11px] font-bold text-emerald-600 uppercase">Jawaban Benar</div>
                            <div class="font-outfit font-black text-2xl text-slate-800 mt-0.5">${resultObj.correctCount} <span class="text-xs text-slate-400 font-normal">Soal</span></div>
                        </div>
                        <div class="p-4 sm:p-5">
                            <div class="text-[11px] font-bold text-rose-600 uppercase">Jawaban Salah</div>
                            <div class="font-outfit font-black text-2xl text-slate-800 mt-0.5">${resultObj.wrongCount} <span class="text-xs text-slate-400 font-normal">Soal</span></div>
                        </div>
                        <div class="p-4 sm:p-5">
                            <div class="text-[11px] font-bold text-slate-500 uppercase">Lama Waktu</div>
                            <div class="font-outfit font-black text-xl text-slate-800 mt-0.5 font-mono">${mins}m ${secs}s</div>
                        </div>
                        <div class="p-4 sm:p-5">
                            <div class="text-[11px] font-bold text-brand-600 uppercase">KKM Minimal</div>
                            <div class="font-outfit font-black text-2xl text-slate-800 mt-0.5">${resultObj.kkm || 70}</div>
                        </div>
                    </div>
                ` : ''}

                <!-- Bottom Action Bar -->
                <div class="p-4 sm:p-6 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <button id="res-btn-back" class="px-5 py-2.5 rounded-xl border border-slate-300 font-outfit font-bold text-xs text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-2">
                        <i class="fa-solid fa-house"></i>
                        <span>Kembali Ke Beranda</span>
                    </button>

                    <div class="flex items-center gap-2">
                        <button id="res-btn-retry" class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-outfit font-bold text-xs transition-all flex items-center gap-2 border border-slate-200">
                            <i class="fa-solid fa-rotate-right"></i>
                            <span>Pilih Ujian Lain</span>
                        </button>
                        ${!hideResults ? `
                            <button id="res-btn-print" class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-outfit font-bold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center gap-2">
                                <i class="fa-solid fa-print"></i>
                                <span>Cetak Hasil / PDF</span>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>

            <!-- Detailed Question Review & Explanations (Pembahasan Soal) -->
            ${!hideResults && resultObj.questions ? `
                <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
                    <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                        <div>
                            <h3 class="font-outfit font-black text-xl text-slate-800 flex items-center gap-2">
                                <i class="fa-solid fa-book-bookmark text-brand-600"></i> Pembahasan Soal & Kunci Jawaban
                            </h3>
                            <p class="text-xs text-slate-500 mt-0.5">Pelajari jawaban yang benar dan penjelasannya untuk meningkatkan pemahamanmu.</p>
                        </div>
                        <span class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Total: ${resultObj.questions.length} Butir</span>
                    </div>

                    <div class="space-y-6">
                        ${resultObj.questions.map((q, idx) => {
                            const studentAns = resultObj.answers ? resultObj.answers[q.id] : null;
                            const isCorrect = studentAns === q.answerKey;
                            const isUnanswered = !studentAns;

                            let statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1"><i class="fa-solid fa-check"></i> Jawabanmu Benar</span>`;
                            if (isUnanswered) {
                                statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-300 flex items-center gap-1"><i class="fa-solid fa-minus"></i> Tidak Dijawab</span>`;
                            } else if (!isCorrect) {
                                statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1"><i class="fa-solid fa-xmark"></i> Jawabanmu Salah</span>`;
                            }

                            return `
                                <div class="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 space-y-4">
                                    
                                    <div class="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
                                        <div class="flex items-center gap-2.5">
                                            <span class="w-8 h-8 rounded-xl bg-brand-600 text-white font-outfit font-black text-sm flex items-center justify-center shadow-xs">
                                                ${idx + 1}
                                            </span>
                                            <span class="text-xs font-bold text-slate-600">${q.bab || 'Soal Akademik'}</span>
                                        </div>
                                        ${statusBadge}
                                    </div>

                                    ${q.passage ? `
                                        <div class="p-3.5 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs text-amber-950 leading-relaxed shadow-2xs">
                                            <div class="font-bold text-amber-900 flex items-center gap-1.5 mb-1.5 text-[11px] uppercase tracking-wider">
                                                <i class="fa-solid fa-book-open text-amber-600"></i> Teks Cerita / Wacana Soal
                                            </div>
                                            <div class="whitespace-pre-line font-serif text-slate-800 leading-relaxed">${formatRichText(q.passage)}</div>
                                        </div>
                                    ` : ''}

                                    <div class="text-slate-800 font-bold text-sm sm:text-base whitespace-pre-line leading-relaxed">
                                        ${formatRichText(q.question)}
                                    </div>

                                    ${renderQuestionMedia(q.image, 'max-h-48 object-contain rounded-xl')}

                                    <!-- Options Review -->
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
                                        ${q.options.map(opt => {
                                            const isSelectedOpt = studentAns === opt.id;
                                            const isKeyOpt = q.answerKey === opt.id;

                                            let optionClass = "bg-white border-slate-200 text-slate-700";
                                            if (isKeyOpt) {
                                                optionClass = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-500/20";
                                            } else if (isSelectedOpt && !isCorrect) {
                                                optionClass = "bg-rose-100 border-rose-400 text-rose-950 font-bold";
                                            }

                                            return `
                                                <div class="p-3 rounded-xl border ${optionClass} text-xs flex items-center gap-2">
                                                    <span class="font-bold w-6 h-6 rounded-md bg-white/80 flex items-center justify-center border border-slate-200 shrink-0">${opt.id}</span>
                                                    <span class="flex-grow">${formatRichText(opt.text)}</span>
                                                    ${isKeyOpt ? `<span class="ml-auto text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded font-bold uppercase shrink-0">Kunci Benar</span>` : ''}
                                                    ${isSelectedOpt && !isKeyOpt ? `<span class="ml-auto text-[10px] bg-rose-700 text-white px-2 py-0.5 rounded font-bold uppercase shrink-0">Jawabanmu</span>` : ''}
                                                </div>
                                            `;
                                        }).join('')}
                                    </div>

                                    <!-- Pedagogical Explanation Box -->
                                    <div class="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 leading-relaxed">
                                        <div class="font-black text-amber-950 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                                            <i class="fa-solid fa-lightbulb text-amber-600"></i> Pembahasan Soal & Langkah Pengerjaan:
                                        </div>
                                        <div>${q.explanation || 'Pembahasan kunci jawaban dapat didiskusikan lebih lanjut bersama Bapak/Ibu Guru di kelas.'}</div>
                                    </div>

                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : ''}

        </div>
    `;

    // Event Attachments
    document.getElementById('res-btn-back')?.addEventListener('click', () => onNavigate('student-dashboard'));
    document.getElementById('res-btn-retry')?.addEventListener('click', () => {
        if (resultObj.mode === 'latihan') {
            onNavigate('exam-practice');
        } else {
            onNavigate('exam-simulation');
        }
    });
    document.getElementById('res-btn-print')?.addEventListener('click', () => {
        exportService.exportStudentCertificate(resultObj);
    });
}
