// Professional CBT Exam Engine Component (Main Feature)

import { storageService } from '../services/storageService.js';
import { TimerCard } from '../components/TimerCard.js';
import { renderQuestionGrid } from '../components/QuestionGrid.js';
import { renderFinishConfirmationModal, renderQuestionMedia, formatRichText } from '../components/Modals.js';

export function renderExamEnginePage(container, currentUser, onFinishExam) {
    let session = storageService.getActiveExamSession();
    if (!session) {
        alert("Sesi ujian tidak ditemukan atau telah berakhir.");
        if (onFinishExam) onFinishExam(null);
        return;
    }

    let timerCard = null;

    // Prevent accidental window close / refresh without warning
    const beforeUnloadHandler = (e) => {
        e.preventDefault();
        e.returnValue = 'Ujian CBT sedang berlangsung. Jawaban Anda tersimpan otomatis.';
        return e.returnValue;
    };
    window.addEventListener('beforeunload', beforeUnloadHandler);

    function cleanup() {
        window.removeEventListener('beforeunload', beforeUnloadHandler);
        if (timerCard) timerCard.stop();
    }

    function renderCBTLayout() {
        const questions = session.questions || [];
        const currentIndex = session.currentQuestionIndex || 0;
        const currentQuestion = questions[currentIndex];
        const answers = session.answers || {};
        const flagged = session.flagged || {};

        if (!currentQuestion) return;

        const isFirstQuestion = currentIndex === 0;
        const isLastQuestion = currentIndex === questions.length - 1;
        const selectedOption = answers[currentQuestion.id] || null;
        const isFlagged = Boolean(flagged[currentQuestion.id]);

        const answeredCount = Object.keys(answers).length;
        const unansweredCount = questions.length - answeredCount;

        container.innerHTML = `
            <div class="min-h-screen bg-slate-100 flex flex-col justify-between">
                
                <!-- CBT Top Header Bar -->
                <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
                            
                            <!-- Left: Package Title & Mode -->
                            <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                                <div>
                                    <div class="flex items-center gap-2">
                                        <span class="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${session.mode === 'simulasi' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}">
                                            ${session.mode === 'simulasi' ? 'Simulasi TKA' : 'Latihan'}
                                        </span>
                                        <span class="text-xs font-semibold text-slate-500">Soal ${currentIndex + 1} / ${questions.length}</span>
                                    </div>
                                    <h1 class="font-outfit font-extrabold text-base sm:text-lg text-slate-800 leading-tight">
                                        ${session.packageName}
                                    </h1>
                                </div>
                            </div>

                            <!-- Center/Right: Timer & Auto-Save Indicator -->
                            <div class="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                <div class="hidden md:flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                                    <i class="fa-solid fa-cloud-arrow-up"></i> Auto-Save Aktif
                                </div>

                                <div id="cbt-timer-container"></div>
                            </div>

                        </div>
                    </div>
                </header>

                <!-- CBT Main Content Area -->
                <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow w-full">
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        <!-- Middle: Question Container (Cols 8) -->
                        <div class="lg:col-span-8 space-y-6">
                            
                            ${currentQuestion.passage ? `
                                <!-- Split Layout for Passage/Story Questions -->
                                <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                    
                                    <!-- Story Passage Card (Left - 6 cols) -->
                                    <div class="md:col-span-6 bg-gradient-to-br from-amber-50/90 to-orange-50/50 rounded-3xl p-6 border border-amber-200 shadow-sm md:sticky md:top-20 max-h-[75vh] overflow-y-auto">
                                        <div class="flex items-center justify-between border-b border-amber-200/80 pb-3 mb-4">
                                            <div class="flex items-center gap-2.5 font-outfit font-extrabold text-amber-950 text-sm sm:text-base">
                                                <div class="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center text-sm shadow-sm">
                                                    <i class="fa-solid fa-book-open"></i>
                                                </div>
                                                Teks Cerita / Wacana
                                            </div>
                                            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200/80 text-amber-900">
                                                Soal Berwacana
                                            </span>
                                        </div>
                                        <div class="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif">
                                            ${formatRichText(currentQuestion.passage)}
                                        </div>
                                    </div>

                                    <!-- Question & Answer Options Card (Right - 6 cols) -->
                                    <div class="md:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm relative">
                                        
                                        <!-- Question Header Bar -->
                                        <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                                            <div class="flex items-center gap-2.5">
                                                <div class="w-9 h-9 rounded-xl bg-brand-600 text-white font-outfit font-black text-base flex items-center justify-center shadow-md shadow-brand-600/30">
                                                    ${currentIndex + 1}
                                                </div>
                                                <div>
                                                    <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Soal No. ${currentIndex + 1}</div>
                                                    <div class="text-xs text-brand-600 font-semibold truncate max-w-[140px]">${currentQuestion.bab || 'Membaca Cerita'}</div>
                                                </div>
                                            </div>

                                            <span class="px-2 py-0.5 rounded-lg text-[11px] font-bold ${currentQuestion.difficulty === 'Mudah' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">
                                                ${currentQuestion.difficulty || 'Sedang'}
                                            </span>
                                        </div>

                                        <!-- Question Text -->
                                        <div class="text-slate-800 font-bold text-sm sm:text-base leading-relaxed mb-4">
                                            ${formatRichText(currentQuestion.question)}
                                        </div>

                                        <!-- Optional Question Media (Image / PDF) -->
                                        ${renderQuestionMedia(currentQuestion.image, 'max-h-60 object-contain rounded-xl shadow-sm')}

                                        <!-- Answer Options (A, B, C, D) -->
                                        <div class="space-y-3 mt-4">
                                            ${currentQuestion.options.map(opt => {
                                                const isSelected = selectedOption === opt.id;
                                                return `
                                                    <div data-option-id="${opt.id}" class="option-card cursor-pointer p-3.5 rounded-2xl border-2 ${isSelected ? 'border-brand-600 bg-brand-50/70 shadow-md ring-2 ring-brand-500/20' : 'border-slate-200 hover:border-slate-300 bg-white'} flex items-start gap-3 transition-all">
                                                        <div class="w-7 h-7 rounded-xl flex items-center justify-center font-outfit font-black text-xs ${isSelected ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 border border-slate-300'} flex-shrink-0">
                                                            ${opt.id}
                                                        </div>
                                                        <div class="text-slate-800 font-medium text-xs sm:text-sm pt-0.5 flex-grow leading-snug">
                                                            ${formatRichText(opt.text)}
                                                        </div>
                                                        ${isSelected ? `<i class="fa-solid fa-circle-check text-brand-600 text-lg pt-0.5"></i>` : ''}
                                                    </div>
                                                `;
                                            }).join('')}
                                        </div>

                                    </div>
                                </div>
                            ` : `
                                <!-- Standard Single Card Layout -->
                                <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative">
                                    
                                    <!-- Question Header Bar -->
                                    <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 rounded-2xl bg-brand-600 text-white font-outfit font-black text-lg flex items-center justify-center shadow-md shadow-brand-600/30">
                                                ${currentIndex + 1}
                                            </div>
                                            <div>
                                                <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Soal No. ${currentIndex + 1}</div>
                                                <div class="text-xs text-brand-600 font-semibold">${currentQuestion.bab || 'Tes Kemampuan Akademik'}</div>
                                            </div>
                                        </div>

                                        <div class="flex items-center gap-2">
                                            <span class="px-2.5 py-1 rounded-lg text-xs font-bold ${currentQuestion.difficulty === 'Mudah' ? 'bg-emerald-50 text-emerald-700' : currentQuestion.difficulty === 'Sedang' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}">
                                                ${currentQuestion.difficulty || 'Sedang'}
                                            </span>
                                        </div>
                                    </div>

                                    <!-- Question Text -->
                                    <div class="text-slate-800 font-medium text-base sm:text-lg leading-relaxed mb-6 whitespace-pre-line">
                                        ${formatRichText(currentQuestion.question)}
                                    </div>

                                    <!-- Optional Question Media (Image / PDF) -->
                                    ${renderQuestionMedia(currentQuestion.image, 'max-h-72 object-contain rounded-xl shadow-sm')}

                                    <!-- Answer Options (A, B, C, D) -->
                                    <div class="space-y-3.5 mt-6">
                                        ${currentQuestion.options.map(opt => {
                                            const isSelected = selectedOption === opt.id;
                                            return `
                                                <div data-option-id="${opt.id}" class="option-card cursor-pointer p-4 rounded-2xl border-2 ${isSelected ? 'border-brand-600 bg-brand-50/70 shadow-md ring-2 ring-brand-500/20' : 'border-slate-200 hover:border-slate-300 bg-white'} flex items-start gap-4 transition-all">
                                                    <div class="w-8 h-8 rounded-xl flex items-center justify-center font-outfit font-black text-sm ${isSelected ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 border border-slate-300'} flex-shrink-0">
                                                        ${opt.id}
                                                    </div>
                                                    <div class="text-slate-800 font-medium text-sm sm:text-base pt-1 flex-grow">
                                                        ${formatRichText(opt.text)}
                                                    </div>
                                                    ${isSelected ? `<i class="fa-solid fa-circle-check text-brand-600 text-xl pt-1"></i>` : ''}
                                                </div>
                                            `;
                                        }).join('')}
                                    </div>

                                </div>
                            `}

                        </div>

                        <!-- Right Sidebar: Question Palette Grid (Cols 4) -->
                        <div class="lg:col-span-4">
                            <div id="cbt-question-grid-container"></div>
                        </div>

                    </div>
                </main>

                <!-- CBT Bottom Action Control Bar -->
                <footer class="bg-white border-t border-slate-200 sticky bottom-0 z-30 shadow-lg py-4">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex flex-wrap items-center justify-between gap-3">
                            
                            <!-- Left Controls: Previous & Flag -->
                            <div class="flex items-center gap-2">
                                <button id="cbt-btn-prev" ${isFirstQuestion ? 'disabled' : ''} class="px-4 sm:px-5 py-2.5 rounded-xl border border-slate-300 font-outfit font-bold text-xs sm:text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition-all flex items-center gap-1.5">
                                    <i class="fa-solid fa-chevron-left"></i> Sebelumnya
                                </button>

                                <button id="cbt-btn-flag" class="px-4 sm:px-5 py-2.5 rounded-xl font-outfit font-bold text-xs sm:text-sm ${isFlagged ? 'bg-amber-400 text-slate-900 shadow-md' : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-300'} transition-all flex items-center gap-1.5">
                                    <i class="fa-solid fa-bookmark"></i> ${isFlagged ? 'Ditandai Ragu' : 'Tandai Ragu-ragu'}
                                </button>
                            </div>

                            <!-- Right Controls: Next & Finish -->
                            <div class="flex items-center gap-2">
                                <button id="cbt-btn-next" ${isLastQuestion ? 'disabled' : ''} class="px-4 sm:px-5 py-2.5 rounded-xl border border-slate-300 font-outfit font-bold text-xs sm:text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition-all flex items-center gap-1.5">
                                    Selanjutnya <i class="fa-solid fa-chevron-right"></i>
                                </button>

                                <button id="cbt-btn-finish" class="px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-outfit font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2">
                                    <i class="fa-solid fa-circle-check"></i> Selesai Ujian
                                </button>
                            </div>

                        </div>
                    </div>
                </footer>

            </div>
        `;

        // Mount Question Grid Component
        renderQuestionGrid('cbt-question-grid-container', questions, answers, flagged, currentIndex, (newIdx) => {
            session = storageService.setCurrentQuestionIndex(newIdx);
            renderCBTLayout();
        });

        // Initialize Timer Component if not yet active
        if (!timerCard) {
            timerCard = new TimerCard('cbt-timer-container', session.endTime, () => {
                // AUTO SUBMIT WHEN TIMER EXPIRES
                cleanup();
                alert("⏰ WAKTU UJIAN TELAH HABIS!\nUjian Anda akan dikumpulkan secara otomatis.");
                const result = storageService.finishExamSession();
                if (onFinishExam) onFinishExam(result);
            });
            timerCard.start();
        } else {
            timerCard.update();
        }

        // Attach Option Selection Handlers
        container.querySelectorAll('.option-card').forEach(card => {
            card.addEventListener('click', () => {
                const optId = card.getAttribute('data-option-id');
                session = storageService.saveExamAnswer(currentQuestion.id, optId);
                renderCBTLayout();
            });
        });

        // Navigation Buttons
        const prevBtn = document.getElementById('cbt-btn-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    session = storageService.setCurrentQuestionIndex(currentIndex - 1);
                    renderCBTLayout();
                }
            });
        }

        const nextBtn = document.getElementById('cbt-btn-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < questions.length - 1) {
                    session = storageService.setCurrentQuestionIndex(currentIndex + 1);
                    renderCBTLayout();
                }
            });
        }

        // Flag Button
        const flagBtn = document.getElementById('cbt-btn-flag');
        if (flagBtn) {
            flagBtn.addEventListener('click', () => {
                session = storageService.toggleFlagQuestion(currentQuestion.id);
                renderCBTLayout();
            });
        }

        // Finish Exam Button
        const finishBtn = document.getElementById('cbt-btn-finish');
        if (finishBtn) {
            finishBtn.addEventListener('click', () => {
                const ansCount = Object.keys(session.answers || {}).length;
                const unansCount = questions.length - ansCount;

                renderFinishConfirmationModal(unansCount, questions.length, () => {
                    cleanup();
                    const result = storageService.finishExamSession();
                    if (onFinishExam) onFinishExam(result);
                });
            });
        }
    }

    renderCBTLayout();
}
