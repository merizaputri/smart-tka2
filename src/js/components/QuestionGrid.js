// CBT Question Grid Palette Component

export function renderQuestionGrid(containerId, questions, answers, flagged, currentIndex, onSelectQuestion) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let answeredCount = 0;
    let flaggedCount = 0;
    let unansweredCount = 0;

    questions.forEach(q => {
        if (answers[q.id]) answeredCount++;
        else unansweredCount++;
        if (flagged[q.id]) flaggedCount++;
    });

    const gridHtml = questions.map((q, idx) => {
        const isAnswered = Boolean(answers[q.id]);
        const isFlagged = Boolean(flagged[q.id]);
        const isActive = idx === currentIndex;

        let btnClass = "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200";
        let statusBadge = "";

        if (isFlagged) {
            btnClass = "bg-amber-400 text-slate-900 border-amber-500 font-bold shadow-sm";
            statusBadge = `<i class="fa-solid fa-bookmark text-[9px] absolute top-1 right-1 text-amber-900"></i>`;
        } else if (isAnswered) {
            btnClass = "bg-emerald-500 text-white border-emerald-600 font-bold shadow-sm";
            statusBadge = `<i class="fa-solid fa-check text-[9px] absolute top-1 right-1 text-emerald-100"></i>`;
        }

        const activeClass = isActive ? "ring-4 ring-brand-500 ring-offset-2 scale-105 z-10 shadow-lg" : "";

        return `
            <button data-index="${idx}" class="palette-btn relative flex items-center justify-center w-11 h-11 rounded-xl border font-outfit text-base font-bold transition-all ${btnClass} ${activeClass}">
                ${idx + 1}
                ${statusBadge}
            </button>
        `;
    }).join('');

    container.innerHTML = `
        <div class="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div class="font-outfit font-bold text-slate-800 flex items-center gap-2">
                    <i class="fa-solid fa-grid-2 text-brand-600"></i> Nomor Soal CBT
                </div>
                <div class="text-xs text-slate-500 font-medium">Total: ${questions.length}</div>
            </div>

            <!-- Question Number Grid -->
            <div class="grid grid-cols-4 sm:grid-cols-5 gap-2.5 my-3 max-h-[320px] overflow-y-auto p-1">
                ${gridHtml}
            </div>

            <!-- Color Legend -->
            <div class="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-[11px] font-semibold">
                <div class="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-1.5 rounded-lg border border-emerald-200">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Sudah (${answeredCount})</span>
                </div>
                <div class="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2 py-1.5 rounded-lg border border-amber-200">
                    <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span>Ragu (${flaggedCount})</span>
                </div>
                <div class="flex items-center gap-1.5 text-slate-700 bg-slate-100 px-2 py-1.5 rounded-lg border border-slate-200">
                    <span class="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                    <span>Belum (${unansweredCount})</span>
                </div>
            </div>
        </div>
    `;

    // Attach click events
    container.querySelectorAll('.palette-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(btn.getAttribute('data-index'), 10);
            if (typeof onSelectQuestion === 'function') {
                onSelectQuestion(idx);
            }
        });
    });
}
