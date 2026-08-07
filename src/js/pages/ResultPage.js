// Results & Detailed Pembahasan Page Component

import { exportService } from '../services/exportService.js';
import { SUBJECTS } from '../config/constants.js';
import { renderQuestionMedia, formatRichText } from '../components/Modals.js';

export function renderResultPage(container, resultObj, onNavigate) {
    if (!resultObj) {
        container.innerHTML = `<div class="p-8 text-center">Data hasil ujian tidak ditemukan.</div>`;
        return;
    }

    const isPassed = resultObj.status === 'LULUS';
    const subj = SUBJECTS.find(s => s.id === resultObj.subject) || { name: resultObj.subject };
    const hideResults = resultObj.showResultsToStudent === false && resultObj.mode === 'simulasi';

    const mins = Math.floor(resultObj.durationSeconds / 60);
    const secs = resultObj.durationSeconds % 60;

    container.innerHTML = `
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            
            <!-- Hero Score Banner -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-8">
                <div class="bg-gradient-to-r ${isPassed ? 'from-emerald-600 to-teal-700' : 'from-rose-600 to-amber-700'} p-6 sm:p-10 text-white text-center relative">
                    
                    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white font-semibold text-xs backdrop-blur-sm mb-4">
                        <i class="fa-solid fa-square-poll-vertical"></i> HASIL UJIAN CBT TKA
                    </div>

                    <h2 class="font-outfit font-black text-2xl sm:text-3xl tracking-tight mb-2">
                        ${resultObj.packageName}
                    </h2>
                    <p class="text-white/80 text-sm max-w-md mx-auto">
                        Mata Pelajaran: <strong>${subj.name}</strong> • ${resultObj.kelas}
                    </p>

                    ${hideResults ? `
                        <!-- Hidden Results Confidential Notice -->
                        <div class="my-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-md mx-auto">
                            <div class="text-3xl mb-2"><i class="fa-solid fa-lock"></i></div>
                            <div class="font-outfit font-bold text-lg">Hasil Ujian Disimpan</div>
                            <p class="text-xs text-white/90 mt-1">Sesuai aturan Admin, hasil skor ujian simulasi ini disembunyikan dan akan diumumkan langsung oleh Bapak/Ibu Guru.</p>
                        </div>
                    ` : `
                        <!-- Display Big Score Circle -->
                        <div class="my-6">
                            <div class="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full bg-white text-slate-800 shadow-2xl border-4 border-white/40 font-outfit">
                                <div class="text-4xl font-black ${isPassed ? 'text-emerald-600' : 'text-rose-600'} leading-none">
                                    ${resultObj.score}
                                </div>
                                <div class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">DARI 100</div>
                            </div>
                        </div>

                        <!-- Pass/Fail Badge -->
                        <div class="inline-block px-6 py-2 rounded-full font-outfit font-black text-sm uppercase tracking-wider ${isPassed ? 'bg-white text-emerald-800 shadow-lg' : 'bg-white text-rose-800 shadow-lg'}">
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
                            <div class="text-[11px] font-bold text-slate-500 uppercase">Lama Pengerjaan</div>
                            <div class="font-outfit font-black text-xl text-slate-800 mt-0.5 font-mono">${mins}m ${secs}s</div>
                        </div>
                        <div class="p-4 sm:p-5">
                            <div class="text-[11px] font-bold text-brand-600 uppercase">KKM Minimal</div>
                            <div class="font-outfit font-black text-2xl text-slate-800 mt-0.5">${resultObj.kkm || 70}</div>
                        </div>
                    </div>
                ` : ''}

                <!-- Bottom Action Bar -->
                <div class="p-4 sm:p-6 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <button id="res-btn-back" class="px-5 py-2.5 rounded-xl border border-slate-300 font-outfit font-bold text-xs text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-2">
                        <i class="fa-solid fa-house"></i> Kembali Ke Dashboard
                    </button>

                    ${!hideResults ? `
                        <button id="res-btn-print" class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-outfit font-bold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center gap-2">
                            <i class="fa-solid fa-print"></i> Cetak Sertifikat / PDF
                        </button>
                    ` : ''}
                </div>
            </div>

            <!-- Detailed Question Review & Explanations (Pembahasan Soal) -->
            ${!hideResults && resultObj.questions ? `
                <div class="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
                    <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                        <div>
                            <h3 class="font-outfit font-extrabold text-xl text-slate-800 flex items-center gap-2">
                                <i class="fa-solid fa-book-bookmark text-brand-600"></i> Pembahasan Soal & Kunci Jawaban
                            </h3>
                            <p class="text-xs text-slate-500 mt-0.5">Pelajari jawaban yang benar dan penjelasannya di bawah ini.</p>
                        </div>
                        <span class="text-xs font-bold text-slate-400 uppercase">Total: ${resultObj.questions.length} Soal</span>
                    </div>

                    <div class="space-y-6">
                        ${resultObj.questions.map((q, idx) => {
                            const studentAns = resultObj.answers[q.id];
                            const isCorrect = studentAns === q.answerKey;
                            const isUnanswered = !studentAns;

                            let statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300"><i class="fa-solid fa-check mr-1"></i> Benar</span>`;
                            if (isUnanswered) {
                                statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-300"><i class="fa-solid fa-minus mr-1"></i> Tidak Dijawab</span>`;
                            } else if (!isCorrect) {
                                statusBadge = `<span class="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-300"><i class="fa-solid fa-xmark mr-1"></i> Salah</span>`;
                            }

                            return `
                                <div class="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
                                    
                                    <div class="flex items-center justify-between gap-2 mb-3">
                                        <span class="w-8 h-8 rounded-xl bg-brand-600 text-white font-outfit font-black text-sm flex items-center justify-center">
                                            ${idx + 1}
                                        </span>
                                        ${statusBadge}
                                     </div>

                                     ${q.passage ? `
                                         <div class="mb-4 p-3.5 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs text-amber-950 leading-relaxed shadow-sm">
                                             <div class="font-bold text-amber-900 flex items-center gap-1.5 mb-1.5 text-[11px] uppercase tracking-wider">
                                                 <i class="fa-solid fa-book-open text-amber-600"></i> Teks Cerita / Wacana Soal
                                             </div>
                                             <div class="whitespace-pre-line font-serif text-slate-800 leading-relaxed">${formatRichText(q.passage)}</div>
                                         </div>
                                     ` : ''}

                                     <div class="text-slate-800 font-medium text-base mb-4 whitespace-pre-line">
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
                                                optionClass = "bg-emerald-100 border-emerald-400 text-emerald-900 font-bold ring-2 ring-emerald-500/20";
                                            } else if (isSelectedOpt && !isCorrect) {
                                                optionClass = "bg-rose-100 border-rose-400 text-rose-900 font-bold";
                                            }

                                            return `
                                                <div class="p-3 rounded-xl border ${optionClass} text-xs flex items-center gap-2">
                                                    <span class="font-bold w-6 h-6 rounded-md bg-white/80 flex items-center justify-center border border-slate-200">${opt.id}</span>
                                                    <span>${formatRichText(opt.text)}</span>
                                                    ${isKeyOpt ? `<span class="ml-auto text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded font-bold uppercase">Kunci</span>` : ''}
                                                    ${isSelectedOpt && !isKeyOpt ? `<span class="ml-auto text-[10px] bg-rose-700 text-white px-2 py-0.5 rounded font-bold uppercase">Jawabanmu</span>` : ''}
                                                </div>
                                            `;
                                        }).join('')}
                                    </div>

                                    <!-- Explanation Box -->
                                    <div class="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 mt-3 leading-relaxed">
                                        <div class="font-extrabold text-amber-950 flex items-center gap-1.5 mb-1 text-sm">
                                            <i class="fa-solid fa-lightbulb text-amber-600"></i> Pembahasan Soal:
                                        </div>
                                        <div>${q.explanation || 'Pembahasan kunci jawaban dapat didiskusikan bersama Bapak/Ibu Guru.'}</div>
                                    </div>

                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : ''}

        </div>
    `;

    // Event Listeners
    const backBtn = document.getElementById('res-btn-back');
    if (backBtn) backBtn.addEventListener('click', () => onNavigate('student-dashboard'));

    const printBtn = document.getElementById('res-btn-print');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            exportService.exportStudentCertificate(resultObj);
        });
    }
}
