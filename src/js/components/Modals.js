// Global Modal UI Components
import { CLASSES, SUBJECTS, DIFFICULTY_LEVELS } from '../config/constants.js';


export function showModal(htmlContent) {
    const container = document.getElementById('modal-container');
    if (container) {
        container.innerHTML = `
            <div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                ${htmlContent}
            </div>
        `;
    }
}

export function closeModal() {
    const container = document.getElementById('modal-container');
    if (container) container.innerHTML = '';
}

// 1. Finish Exam Confirmation Modal
export function renderFinishConfirmationModal(unansweredCount, totalQuestions, onConfirm, onCancel) {
    const hasUnanswered = unansweredCount > 0;

    const modalHtml = `
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 transform transition-all animate-in zoom-in-95">
            <div class="text-center">
                <div class="w-16 h-16 ${hasUnanswered ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'} rounded-2xl mx-auto flex items-center justify-center text-2xl mb-4">
                    <i class="fa-solid ${hasUnanswered ? 'fa-triangle-exclamation' : 'fa-circle-check'}"></i>
                </div>

                <h3 class="font-outfit text-2xl font-bold text-slate-800 mb-2">Konfirmasi Selesai Ujian</h3>
                <p class="text-slate-600 text-sm mb-6">
                    ${hasUnanswered 
                        ? `<span class="text-amber-700 font-semibold">Perhatian!</span> Masih terdapat <strong class="text-amber-800 font-bold">${unansweredCount} dari ${totalQuestions} soal</strong> yang belum dijawab. Yakin ingin mengumpulkan ujian sekarang?`
                        : `Selamat! Kamu telah menjawab seluruh <strong class="text-emerald-700 font-bold">${totalQuestions} soal</strong>. Apakah kamu yakin ingin menyelesaikan ujian sekarang?`}
                </p>

                <div class="flex gap-3">
                    <button id="modal-btn-cancel" class="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">
                        Periksa Kembali
                    </button>
                    <button id="modal-btn-confirm" class="flex-1 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-lg shadow-brand-600/30 transition-all">
                        Ya, Selesai Ujian
                    </button>
                </div>
            </div>
        </div>
    `;

    showModal(modalHtml);

    document.getElementById('modal-btn-cancel').addEventListener('click', () => {
        closeModal();
        if (onCancel) onCancel();
    });

    document.getElementById('modal-btn-confirm').addEventListener('click', () => {
        closeModal();
        if (onConfirm) onConfirm();
    });
}

// 2. Forgot Password Modal
export function renderPasswordResetModal() {
    const modalHtml = `
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100">
            <div class="flex justify-between items-center mb-4">
                <div class="font-outfit text-xl font-bold text-slate-800 flex items-center gap-2">
                    <i class="fa-solid fa-key text-brand-500"></i> Lupa Password Akun
                </div>
                <button id="modal-close-x" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <p class="text-slate-600 text-sm mb-4">
                Silakan hubungi Bapak/Ibu Guru atau Admin Sekolah untuk mereset password akun NISN Anda.
            </p>

            <div class="bg-brand-50 border border-brand-200 rounded-2xl p-4 mb-6 text-xs text-brand-900 leading-relaxed">
                <div class="font-bold mb-1"><i class="fa-solid fa-circle-info mr-1"></i> Informasi Akun Demo:</div>
                <ul class="list-disc list-inside space-y-1">
                    <li>Siswa Kelas 5: NISN <code class="bg-white px-1 py-0.5 rounded font-mono">0012345678</code> / Password: <code class="bg-white px-1 py-0.5 rounded font-mono">123</code></li>
                    <li>Administrator: <code class="bg-white px-1 py-0.5 rounded font-mono">ADMIN001</code> / Password: <code class="bg-white px-1 py-0.5 rounded font-mono">admin123</code></li>
                </ul>
            </div>

            <button id="modal-btn-close-pwd" class="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-md transition-all">
                Saya Mengerti
            </button>
        </div>
    `;

    showModal(modalHtml);

    const closeHandler = () => closeModal();
    document.getElementById('modal-close-x').addEventListener('click', closeHandler);
    document.getElementById('modal-btn-close-pwd').addEventListener('click', closeHandler);
}

// 3. Batch Import Students Modal
export function renderImportStudentsModal(onImportSuccess) {
    const modalHtml = `
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100">
            <div class="flex justify-between items-center mb-4">
                <div class="font-outfit text-xl font-bold text-slate-800 flex items-center gap-2">
                    <i class="fa-solid fa-file-import text-brand-600"></i> Import Data Siswa (Excel / JSON)
                </div>
                <button id="modal-close-x-imp" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <p class="text-slate-600 text-sm mb-4">
                Unggah file data siswa format JSON atau paste teks JSON siswa di bawah ini. Format yang dibutuhkan: <code>[{"nisn": "...", "name": "...", "kelas": "Kelas 5", "password": "123"}]</code>
            </p>

            <textarea id="import-json-input" rows="6" placeholder='[
  {"nisn": "0099887766", "name": "Ahmad Fauzi", "kelas": "Kelas 5", "password": "123"},
  {"nisn": "0099887767", "name": "Nadia Putri", "kelas": "Kelas 4", "password": "123"}
]' class="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none mb-4"></textarea>

            <div class="flex gap-3">
                <button id="modal-cancel-imp" class="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50">Batal</button>
                <button id="modal-submit-imp" class="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md">Proses Import</button>
            </div>
        </div>
    `;

    showModal(modalHtml);

    document.getElementById('modal-close-x-imp').addEventListener('click', closeModal);
    document.getElementById('modal-cancel-imp').addEventListener('click', closeModal);

    document.getElementById('modal-submit-imp').addEventListener('click', () => {
        const text = document.getElementById('import-json-input').value.trim();
        if (!text) {
            alert("Harap masukkan data JSON terlebih dahulu.");
            return;
        }

        try {
            const parsed = JSON.parse(text);
            if (Array.isArray(parsed)) {
                if (onImportSuccess) onImportSuccess(parsed);
                closeModal();
            } else {
                alert("Format JSON harus berupa Array object []");
            }
        } catch (e) {
            alert("Format JSON tidak valid. Periksa kembali tanda kurung dan petik.");
        }
    });
}

// Helper Renderer for Question Media (Images, SVGs, PDFs)
export function renderQuestionMedia(imageSrc, customImgClass = 'max-h-64 object-contain rounded-xl') {
    if (!imageSrc) return '';

    const isPdf = typeof imageSrc === 'string' && (
        imageSrc.startsWith('data:application/pdf') || 
        imageSrc.toLowerCase().endsWith('.pdf')
    );

    if (isPdf) {
        return `
            <div class="my-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <div class="flex items-center justify-between mb-2">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-extrabold text-xs">
                        <i class="fa-solid fa-file-pdf text-rose-600"></i> Dokumen PDF Soal
                    </span>
                    <a href="${imageSrc}" target="_blank" download="Dokumen_Soal.pdf" class="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-bold text-xs shadow-sm transition-colors inline-flex items-center gap-1">
                        <i class="fa-solid fa-arrow-up-right-from-square text-brand-600"></i> Buka / Download PDF
                    </a>
                </div>
                <object data="${imageSrc}" type="application/pdf" class="w-full h-64 sm:h-80 rounded-xl border border-slate-200 bg-white">
                    <div class="p-4 text-center text-xs text-slate-500">
                        Browser tidak dapat menampilkan preview PDF secara langsung. 
                        <a href="${imageSrc}" target="_blank" class="text-brand-600 font-bold underline">Klik di sini untuk membuka PDF</a>
                    </div>
                </object>
            </div>
        `;
    }

    return `
        <div class="my-3 p-2 bg-slate-50 border border-slate-200 rounded-2xl flex justify-center">
            <img src="${imageSrc}" alt="Gambar Soal" class="${customImgClass}">
        </div>
    `;
}

// Helper to render bold (**text** or <b>), italic (*text* or <i>), underline (__text__ or <u>)
export function formatRichText(text) {
    if (!text) return '';
    return String(text)
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\*(.*?)\*/g, '<i>$1</i>')
        .replace(/__(.*?)__/g, '<u>$1</u>');
}

// 4. Question Form Modal (Tambah & Edit Soal)
export function renderQuestionModal(questionToEdit = null, onSave) {
    const isEdit = !!questionToEdit;
    
    const kelasVal = questionToEdit ? questionToEdit.kelas : 'Kelas 5';
    const subjectVal = questionToEdit ? questionToEdit.subject : 'matematika';
    const difficultyVal = questionToEdit ? (questionToEdit.difficulty || 'Sedang') : 'Sedang';
    const babVal = questionToEdit ? (questionToEdit.bab || '') : '';
    const passageVal = questionToEdit ? (questionToEdit.passage || '') : '';
    const questionVal = questionToEdit ? questionToEdit.question : '';
    const imageVal = questionToEdit ? (questionToEdit.image || '') : '';
    const escapeAttr = (str) => String(str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const getOptText = (id, idx) => {
        if (!questionToEdit || !questionToEdit.options) return '';
        const found = questionToEdit.options.find(o => o && (o.id === id || o.id === id.toLowerCase()));
        if (found) return typeof found === 'string' ? found : (found.text || '');
        if (questionToEdit.options[idx] !== undefined) {
            return typeof questionToEdit.options[idx] === 'string' ? questionToEdit.options[idx] : (questionToEdit.options[idx]?.text || '');
        }
        return '';
    };

    const optA = getOptText('A', 0);
    const optB = getOptText('B', 1);
    const optC = getOptText('C', 2);
    const optD = getOptText('D', 3);
    const keyVal = questionToEdit ? (questionToEdit.answerKey || 'A') : 'A';
    const expVal = questionToEdit ? (questionToEdit.explanation || '') : '';

    const modalHtml = `
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 my-8">
            <div class="flex justify-between items-start mb-5 pb-4 border-b border-slate-100">
                <div>
                    <h3 class="font-outfit text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fa-solid ${isEdit ? 'fa-pen-to-square' : 'fa-circle-plus'} text-brand-600"></i>
                        ${isEdit ? 'Edit Soal Ujian' : 'Tambah Soal Baru'}
                    </h3>
                    <p class="text-xs text-slate-500 mt-1">Isi formulir di bawah ini untuk ${isEdit ? 'memperbarui data' : 'menambahkan'} soal ke dalam Bank Soal TKA.</p>
                </div>
                <button id="modal-close-x-q" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>

            <form id="form-question" class="space-y-4">
                <!-- Metadata Grid: Kelas, Subject, Difficulty -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Kelas <span class="text-rose-500">*</span></label>
                        <select id="qmodal-kelas" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none">
                            ${CLASSES.map(c => `<option value="${c}" ${c === kelasVal ? 'selected' : ''}>${c}</option>`).join('')}
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran <span class="text-rose-500">*</span></label>
                        <select id="qmodal-subject" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none">
                            ${SUBJECTS.map(s => `<option value="${s.id}" ${s.id === subjectVal ? 'selected' : ''}>${s.name}</option>`).join('')}
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Tingkat Kesulitan</label>
                        <select id="qmodal-difficulty" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none">
                            ${DIFFICULTY_LEVELS.map(d => `<option value="${d}" ${d === difficultyVal ? 'selected' : ''}>${d}</option>`).join('')}
                        </select>
                    </div>
                </div>

                <!-- Bab / Topik Materi -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Bab / Topik Materi</label>
                    <input type="text" id="qmodal-bab" value="${escapeAttr(babVal)}" placeholder="Contoh: Membaca Cerita, Geometri, Fotosintesis" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 outline-none">
                </div>

                <!-- Teks Cerita / Wacana (Opsional - Untuk Soal Berkelompok) -->
                <div class="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200">
                    <div class="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                        <label class="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                            <i class="fa-solid fa-book-open text-amber-600"></i> Teks Cerita / Wacana (Opsional)
                        </label>
                        <div class="inline-flex items-center gap-1 bg-amber-100/90 p-1 rounded-xl border border-amber-200">
                            <button type="button" data-format-target="qmodal-passage" data-format-type="bold" class="px-2 py-0.5 rounded-lg bg-white hover:bg-amber-50 text-slate-800 font-bold text-xs border border-amber-200 transition-colors" title="Format Tebal (Bold)">
                                <b>B</b>
                            </button>
                            <button type="button" data-format-target="qmodal-passage" data-format-type="italic" class="px-2 py-0.5 rounded-lg bg-white hover:bg-amber-50 text-slate-800 font-bold text-xs border border-amber-200 transition-colors" title="Format Miring (Italic)">
                                <i>I</i>
                            </button>
                            <button type="button" data-format-target="qmodal-passage" data-format-type="underline" class="px-2 py-0.5 rounded-lg bg-white hover:bg-amber-50 text-slate-800 font-bold text-xs border border-amber-200 transition-colors" title="Format Garis Bawah (Underline)">
                                <u>U</u>
                            </button>
                            <button type="button" data-format-target="qmodal-passage" data-format-type="blank" class="px-2 py-0.5 rounded-lg bg-white hover:bg-amber-50 text-amber-900 font-bold text-[11px] border border-amber-200 transition-colors" title="Sisipkan Bagian Rumpang [....]">
                                [....]
                            </button>
                        </div>
                    </div>
                    <textarea id="qmodal-passage" rows="3" placeholder="Isikan teks cerita/wacana lengkap. Gunakan tombol B, I, U di atas untuk cetak tebal / miring..." class="w-full p-2.5 rounded-xl border border-amber-300 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-amber-500 bg-white outline-none">${passageVal}</textarea>
                </div>

                <!-- Pertanyaan Soal -->
                <div>
                    <div class="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                        <label class="text-xs font-bold text-slate-700">
                            Pertanyaan / Teks Soal <span class="text-rose-500">*</span>
                        </label>
                        <div class="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                            <button type="button" data-format-target="qmodal-question" data-format-type="bold" class="px-2 py-0.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 transition-colors" title="Format Tebal (Bold)">
                                <b>B</b>
                            </button>
                            <button type="button" data-format-target="qmodal-question" data-format-type="italic" class="px-2 py-0.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 transition-colors" title="Format Miring (Italic)">
                                <i>I</i>
                            </button>
                            <button type="button" data-format-target="qmodal-question" data-format-type="underline" class="px-2 py-0.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 transition-colors" title="Format Garis Bawah (Underline)">
                                <u>U</u>
                            </button>
                            <button type="button" data-format-target="qmodal-question" data-format-type="blank" class="px-2 py-0.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 font-bold text-[11px] border border-slate-200 transition-colors" title="Sisipkan Bagian Rumpang [....]">
                                [....]
                            </button>
                        </div>
                    </div>
                    <textarea id="qmodal-question" rows="3" placeholder="Tuliskan teks pertanyaan soal secara lengkap di sini. Gunakan tombol B, I, U untuk format kata..." class="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 outline-none">${questionVal}</textarea>
                </div>

                <!-- Media Soal: Gambar (JPG, PNG) / PDF (Opsional) -->
                <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <label class="block text-xs font-bold text-slate-800 mb-2 flex items-center justify-between">
                        <span><i class="fa-solid fa-paperclip text-brand-600 mr-1"></i> Lampiran Gambar / Dokumen (JPG, PNG, PDF)</span>
                        <span class="text-[11px] font-semibold text-slate-400">Opsional</span>
                    </label>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                        <div>
                            <label class="block text-[11px] font-semibold text-slate-600 mb-1">Upload File (JPG, PNG, PDF):</label>
                            <input type="file" id="qmodal-file-upload" accept="image/jpeg,image/png,image/jpg,application/pdf,.jpg,.jpeg,.png,.pdf" class="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-600 file:text-white hover:file:bg-brand-700 file:cursor-pointer border border-slate-200 rounded-xl bg-white p-1">
                        </div>
                        <div>
                            <label class="block text-[11px] font-semibold text-slate-600 mb-1">Atau Masukkan Link / Data URL:</label>
                            <input type="text" id="qmodal-image" value="${escapeAttr(imageVal)}" placeholder="https://... atau data:..." class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                        </div>
                    </div>

                    <!-- Live Preview Container -->
                    <div id="qmodal-img-preview" class="${imageVal ? '' : 'hidden'} mt-3 p-3 bg-white rounded-xl border border-slate-200">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                                <i class="fa-solid fa-eye text-brand-500"></i> Preview Lampiran:
                            </span>
                            <button type="button" id="qmodal-btn-remove-media" class="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center gap-1">
                                <i class="fa-solid fa-trash-can"></i> Hapus Media
                            </button>
                        </div>
                        <div id="qmodal-preview-content">
                            ${renderQuestionMedia(imageVal, 'max-h-40 object-contain rounded-xl')}
                        </div>
                    </div>
                </div>

                <!-- Pilihan Jawaban (A, B, C, D) -->
                <div class="pt-2">
                    <label class="block text-xs font-bold text-slate-800 mb-2">Pilihan Jawaban (Pilihan Ganda) <span class="text-rose-500">*</span></label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div class="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-brand-500 focus-within:bg-white transition-all">
                            <span class="w-7 h-7 rounded-lg bg-brand-600 text-white font-outfit font-black text-xs flex items-center justify-center flex-shrink-0">A</span>
                            <input type="text" id="qmodal-opt-a" value="${escapeAttr(optA)}" placeholder="Opsi A" class="w-full bg-transparent text-xs font-medium text-slate-800 outline-none">
                        </div>
                        <div class="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-brand-500 focus-within:bg-white transition-all">
                            <span class="w-7 h-7 rounded-lg bg-brand-600 text-white font-outfit font-black text-xs flex items-center justify-center flex-shrink-0">B</span>
                            <input type="text" id="qmodal-opt-b" value="${escapeAttr(optB)}" placeholder="Opsi B" class="w-full bg-transparent text-xs font-medium text-slate-800 outline-none">
                        </div>
                        <div class="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-brand-500 focus-within:bg-white transition-all">
                            <span class="w-7 h-7 rounded-lg bg-brand-600 text-white font-outfit font-black text-xs flex items-center justify-center flex-shrink-0">C</span>
                            <input type="text" id="qmodal-opt-c" value="${escapeAttr(optC)}" placeholder="Opsi C" class="w-full bg-transparent text-xs font-medium text-slate-800 outline-none">
                        </div>
                        <div class="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-brand-500 focus-within:bg-white transition-all">
                            <span class="w-7 h-7 rounded-lg bg-brand-600 text-white font-outfit font-black text-xs flex items-center justify-center flex-shrink-0">D</span>
                            <input type="text" id="qmodal-opt-d" value="${escapeAttr(optD)}" placeholder="Opsi D" class="w-full bg-transparent text-xs font-medium text-slate-800 outline-none">
                        </div>
                    </div>
                </div>

                <!-- Kunci Jawaban & Pembahasan -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Kunci Jawaban <span class="text-rose-500">*</span></label>
                        <select id="qmodal-answer-key" class="w-full px-3 py-2.5 rounded-xl border border-emerald-300 text-xs font-bold text-emerald-900 bg-emerald-50 focus:ring-2 focus:ring-emerald-500 outline-none">
                            <option value="A" ${keyVal === 'A' ? 'selected' : ''}>A (Jawaban Benar)</option>
                            <option value="B" ${keyVal === 'B' ? 'selected' : ''}>B (Jawaban Benar)</option>
                            <option value="C" ${keyVal === 'C' ? 'selected' : ''}>C (Jawaban Benar)</option>
                            <option value="D" ${keyVal === 'D' ? 'selected' : ''}>D (Jawaban Benar)</option>
                        </select>
                    </div>

                    <div class="sm:col-span-2">
                        <label class="block text-xs font-bold text-slate-700 mb-1">Pembahasan / Penjelasan Soal</label>
                        <textarea id="qmodal-explanation" rows="2" placeholder="Jelaskan langkah penyelesaian atau alasan jawaban ini benar..." class="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 outline-none">${expVal}</textarea>
                    </div>
                </div>

                <!-- Error alert message inside modal -->
                <div id="qmodal-error-msg" class="hidden p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold"></div>

                <!-- Buttons -->
                <div class="flex gap-3 pt-4 border-t border-slate-100">
                    <button type="button" id="modal-cancel-q" class="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors">
                        Batal
                    </button>
                    <button type="submit" id="modal-submit-q" class="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-check"></i> ${isEdit ? 'Simpan Perubahan' : 'Tambah Soal Baru'}
                    </button>
                </div>
            </form>
        </div>
    `;

    showModal(modalHtml);

    // Event listeners
    document.getElementById('modal-close-x-q')?.addEventListener('click', closeModal);
    document.getElementById('modal-cancel-q')?.addEventListener('click', closeModal);

    // Textarea Formatting Toolbar Handlers (Bold, Italic, Underline, Rumpang)
    document.querySelectorAll('[data-format-target]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-format-target');
            const type = btn.getAttribute('data-format-type');
            const textarea = document.getElementById(targetId);
            if (!textarea) return;

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const val = textarea.value;
            const selected = val.substring(start, end);

            let prefix = '';
            let suffix = '';
            let defaultText = '';

            if (type === 'bold') {
                prefix = '<b>';
                suffix = '</b>';
                defaultText = 'teks tebal';
            } else if (type === 'italic') {
                prefix = '<i>';
                suffix = '</i>';
                defaultText = 'teks miring';
            } else if (type === 'underline') {
                prefix = '<u>';
                suffix = '</u>';
                defaultText = 'teks garis bawah';
            } else if (type === 'blank') {
                prefix = '[....]';
                suffix = '';
                defaultText = '';
            }

            const insert = selected ? (prefix + selected + suffix) : (prefix + defaultText + suffix);
            textarea.value = val.substring(0, start) + insert + val.substring(end);
            textarea.focus();
            if (selected) {
                textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
            } else if (defaultText) {
                textarea.setSelectionRange(start + prefix.length, start + prefix.length + defaultText.length);
            } else {
                textarea.setSelectionRange(start + insert.length, start + insert.length);
            }
        });
    });

    // Live preview & File Upload handlers
    const imgInput = document.getElementById('qmodal-image');
    const fileInput = document.getElementById('qmodal-file-upload');
    const imgPreview = document.getElementById('qmodal-img-preview');
    const previewContent = document.getElementById('qmodal-preview-content');
    const btnRemoveMedia = document.getElementById('qmodal-btn-remove-media');

    function updatePreview(val) {
        if (val) {
            previewContent.innerHTML = renderQuestionMedia(val, 'max-h-40 object-contain rounded-xl');
            imgPreview.classList.remove('hidden');
        } else {
            previewContent.innerHTML = '';
            imgPreview.classList.add('hidden');
        }
    }

    imgInput?.addEventListener('input', () => {
        updatePreview(imgInput.value.trim());
    });

    fileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("Ukuran file terlalu besar! Maksimal 5 MB.");
            fileInput.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target.result;
            imgInput.value = dataUrl;
            updatePreview(dataUrl);
        };
        reader.readAsDataURL(file);
    });

    btnRemoveMedia?.addEventListener('click', () => {
        imgInput.value = '';
        if (fileInput) fileInput.value = '';
        updatePreview('');
    });

    // Form submission
    document.getElementById('form-question')?.addEventListener('submit', (e) => {
        e.preventDefault();

        const question = document.getElementById('qmodal-question').value.trim();
        const optAVal = document.getElementById('qmodal-opt-a').value.trim();
        const optBVal = document.getElementById('qmodal-opt-b').value.trim();
        const optCVal = document.getElementById('qmodal-opt-c').value.trim();
        const optDVal = document.getElementById('qmodal-opt-d').value.trim();
        const errorMsgEl = document.getElementById('qmodal-error-msg');

        if (!question) {
            errorMsgEl.innerText = "Harap masukkan Teks Pertanyaan Soal.";
            errorMsgEl.classList.remove('hidden');
            return;
        }

        if (!optAVal || !optBVal || !optCVal || !optDVal) {
            errorMsgEl.innerText = "Harap isi semua Pilihan Jawaban (A, B, C, D).";
            errorMsgEl.classList.remove('hidden');
            return;
        }

        errorMsgEl.classList.add('hidden');

        const questionData = {
            ...(questionToEdit ? { id: questionToEdit.id } : {}),
            kelas: document.getElementById('qmodal-kelas').value,
            subject: document.getElementById('qmodal-subject').value,
            bab: document.getElementById('qmodal-bab').value.trim() || 'Umum',
            difficulty: document.getElementById('qmodal-difficulty').value,
            passage: document.getElementById('qmodal-passage')?.value.trim() || null,
            question: question,
            image: document.getElementById('qmodal-image').value.trim() || null,
            options: [
                { id: 'A', text: optAVal },
                { id: 'B', text: optBVal },
                { id: 'C', text: optCVal },
                { id: 'D', text: optDVal }
            ],
            answerKey: document.getElementById('qmodal-answer-key').value,
            explanation: document.getElementById('qmodal-explanation').value.trim()
        };

        if (onSave) onSave(questionData);
        closeModal();
    });
}

// 5. Student Form Modal (Tambah & Edit Siswa)
export function renderStudentModal(studentToEdit = null, onSave) {
    const isEdit = !!studentToEdit;

    const nameVal = studentToEdit ? studentToEdit.name : '';
    const nisnVal = studentToEdit ? studentToEdit.nisn : '';
    const kelasVal = studentToEdit ? studentToEdit.kelas : 'Kelas 5';
    const pwdVal = studentToEdit ? studentToEdit.password : '123';

    const modalHtml = `
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 my-8 animate-in zoom-in-95">
            <div class="flex justify-between items-start mb-5 pb-4 border-b border-slate-100">
                <div>
                    <h3 class="font-outfit text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fa-solid ${isEdit ? 'fa-user-pen' : 'fa-user-plus'} text-brand-600"></i>
                        ${isEdit ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}
                    </h3>
                    <p class="text-xs text-slate-500 mt-1">Isi formulir di bawah ini untuk ${isEdit ? 'memperbarui data' : 'menambahkan'} siswa ke dalam sistem.</p>
                </div>
                <button id="modal-close-x-s" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>

            <form id="form-student" class="space-y-4">
                <!-- Nama Lengkap -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Siswa <span class="text-rose-500">*</span></label>
                    <input type="text" id="smodal-name" value="${nameVal}" placeholder="Masukkan Nama Lengkap Siswa" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none">
                </div>

                <!-- NISN & Kelas -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">NISN <span class="text-rose-500">*</span></label>
                        <input type="text" id="smodal-nisn" value="${nisnVal}" placeholder="Contoh: 0012345678" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Kelas <span class="text-rose-500">*</span></label>
                        <select id="smodal-kelas" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none">
                            ${CLASSES.map(c => `<option value="${c}" ${c === kelasVal ? 'selected' : ''}>${c}</option>`).join('')}
                        </select>
                    </div>
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Password Login Siswa <span class="text-rose-500">*</span></label>
                    <input type="text" id="smodal-password" value="${pwdVal}" placeholder="Password untuk masuk akun" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none">
                    <p class="text-[11px] text-slate-400 mt-1">Default password untuk siswa baru adalah <code class="font-mono">123</code>.</p>
                </div>

                <!-- Error alert message inside modal -->
                <div id="smodal-error-msg" class="hidden p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold"></div>

                <!-- Buttons -->
                <div class="flex gap-3 pt-4 border-t border-slate-100">
                    <button type="button" id="modal-cancel-s" class="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors">
                        Batal
                    </button>
                    <button type="submit" id="modal-submit-s" class="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-check"></i> ${isEdit ? 'Simpan Perubahan' : 'Tambah Siswa Baru'}
                    </button>
                </div>
            </form>
        </div>
    `;

    showModal(modalHtml);

    document.getElementById('modal-close-x-s')?.addEventListener('click', closeModal);
    document.getElementById('modal-cancel-s')?.addEventListener('click', closeModal);

    document.getElementById('form-student')?.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('smodal-name').value.trim();
        const nisn = document.getElementById('smodal-nisn').value.trim();
        const kelas = document.getElementById('smodal-kelas').value;
        const password = document.getElementById('smodal-password').value.trim();
        const errorMsgEl = document.getElementById('smodal-error-msg');

        if (!name) {
            errorMsgEl.innerText = "Harap masukkan Nama Lengkap Siswa.";
            errorMsgEl.classList.remove('hidden');
            return;
        }

        if (!nisn) {
            errorMsgEl.innerText = "Harap masukkan NISN Siswa.";
            errorMsgEl.classList.remove('hidden');
            return;
        }

        errorMsgEl.classList.add('hidden');

        const studentData = {
            ...(studentToEdit ? { id: studentToEdit.id } : {}),
            name,
            nisn,
            kelas,
            password: password || '123',
            role: 'siswa',
            avatar: studentToEdit ? studentToEdit.avatar : `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`
        };

        if (onSave) onSave(studentData);
        closeModal();
    });
}

// 6. Package Form Modal (3-Step Wizard: Info Paket -> Pilih Soal -> Review & Simpan)
export function renderPackageModal(packageToEdit = null, availableQuestions = [], onSave) {
    const isEdit = !!packageToEdit;

    // Wizard Step State (1, 2, or 3)
    let currentStep = 1;

    // Form Data State (Step 1)
    const formData = {
        name: packageToEdit ? packageToEdit.name : '',
        kelas: packageToEdit ? packageToEdit.kelas : 'Kelas 5',
        subject: packageToEdit ? packageToEdit.subject : 'matematika',
        mode: packageToEdit ? packageToEdit.mode : 'simulasi',
        durationMinutes: packageToEdit ? (packageToEdit.durationMinutes || 15) : 15,
        kkm: packageToEdit ? (packageToEdit.kkm || 70) : 70,
        randomizeQuestions: packageToEdit ? packageToEdit.randomizeQuestions !== false : true,
        randomizeOptions: packageToEdit ? packageToEdit.randomizeOptions !== false : true,
        showResultsToStudent: packageToEdit ? packageToEdit.showResultsToStudent !== false : true,
        instructions: packageToEdit ? (packageToEdit.instructions || '') : ''
    };

    // Selected Question IDs (strictly filtered to only include questions matching the initial class & subject)
    const initialQIds = packageToEdit && packageToEdit.questionIds ? packageToEdit.questionIds : [];
    let selectedQIds = new Set(
        initialQIds.filter(id => {
            const q = availableQuestions.find(item => item.id === id);
            return q && q.kelas === formData.kelas && q.subject === formData.subject;
        })
    );

    // Filter & Search State (Step 2)
    let searchQuery = '';
    let filterBab = 'ALL';
    let filterDifficulty = 'ALL';
    let filterType = 'ALL';
    let currentPage = 1;
    const pageSize = 8;
    const targetQuestionCount = 20; // Recommended question count benchmark

    // Preview state
    let previewQuestion = null;

    // Helpers to get questions (strictly isolated by class and subject)
    function getBaseQuestions() {
        return availableQuestions.filter(q => q.kelas === formData.kelas && q.subject === formData.subject);
    }

    function getFilteredBankQuestions() {
        const base = getBaseQuestions();
        const query = searchQuery.trim().toLowerCase();

        return base.filter(q => {
            // Bab filter
            if (filterBab !== 'ALL' && (q.bab || 'Materi Umum') !== filterBab) {
                return false;
            }
            // Difficulty filter
            if (filterDifficulty !== 'ALL' && (q.difficulty || 'Sedang') !== filterDifficulty) {
                return false;
            }
            // Type filter
            if (filterType !== 'ALL') {
                const qType = q.type || (q.options && q.options.length > 0 ? 'Pilihan Ganda' : 'Lainnya');
                if (qType !== filterType) return false;
            }
            // Search query (matches question text, bab/topic, difficulty, or question ID)
            if (query) {
                const text = (q.question || '').toLowerCase();
                const bab = (q.bab || '').toLowerCase();
                const id = (q.id || '').toLowerCase();
                const diff = (q.difficulty || '').toLowerCase();
                if (!text.includes(query) && !bab.includes(query) && !id.includes(query) && !diff.includes(query)) {
                    return false;
                }
            }
            return true;
        });
    }

    function getSelectedQuestionsList() {
        return Array.from(selectedQIds)
            .map(id => availableQuestions.find(q => q.id === id))
            .filter(q => q && q.kelas === formData.kelas && q.subject === formData.subject);
    }

    function getQuestionComposition() {
        const list = getSelectedQuestionsList();
        const comp = {};
        list.forEach(q => {
            const b = q.bab || 'Materi Umum';
            comp[b] = (comp[b] || 0) + 1;
        });
        return comp;
    }

    // ========================================================
    // MAIN WIZARD SHELL RENDERER
    // ========================================================
    function renderWizardShell() {
        const modalHtml = `
            <div id="pkg-wizard-modal" class="relative bg-white rounded-3xl p-4 sm:p-7 max-w-5xl xl:max-w-6xl w-full shadow-2xl border border-slate-100 my-2 sm:my-4 max-h-[94vh] flex flex-col animate-in zoom-in-95 overflow-hidden">
                <!-- Header & Stepper Navigation -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg shadow-sm border border-brand-100 flex-shrink-0">
                            <i class="fa-solid ${isEdit ? 'fa-pen-to-square' : 'fa-boxes-stacked'}"></i>
                        </div>
                        <div>
                            <h3 class="font-outfit text-lg sm:text-xl font-bold text-slate-800 leading-tight">
                                ${isEdit ? 'Edit Paket Ujian' : 'Buat Paket Ujian Baru'}
                            </h3>
                            <p id="pkg-stepper-subtitle" class="text-xs text-slate-500 mt-0.5">
                                ${currentStep === 1 ? 'Langkah 1 dari 3: Informasi & Pengaturan Paket' : currentStep === 2 ? 'Langkah 2 dari 3: Pilih Soal dari Bank Soal' : 'Langkah 3 dari 3: Review & Konfirmasi Paket'}
                            </p>
                        </div>
                    </div>

                    <!-- Stepper Badges Component -->
                    <div id="pkg-stepper-badges-container" class="flex items-center gap-1.5 sm:gap-2 self-start sm:self-center bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                        ${renderStepperBadgesHtml()}
                    </div>
                </div>

                <!-- Main Step Content Container -->
                <div id="pkg-step-content-container" class="flex-1 overflow-y-auto py-3 pr-0.5">
                    ${renderStepBodyHtml()}
                </div>

                <!-- Preview Overlay Container -->
                <div id="pkg-preview-container">
                    ${previewQuestion ? renderPreviewOverlayHtml(previewQuestion) : ''}
                </div>
            </div>
        `;

        showModal(modalHtml);
        attachMainEvents();
    }

    function renderStepperBadgesHtml() {
        return `
            <!-- Step 1 Badge -->
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${currentStep === 1 ? 'bg-brand-600 text-white shadow-sm ring-1 ring-brand-300' : currentStep > 1 ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400'}">
                <span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${currentStep === 1 ? 'bg-white text-brand-700 font-extrabold' : currentStep > 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}">
                    ${currentStep > 1 ? '<i class="fa-solid fa-check text-[9px]"></i>' : '1'}
                </span>
                <span class="hidden md:inline">1. Info Paket</span>
                <span class="md:hidden">1</span>
            </div>

            <i class="fa-solid fa-chevron-right text-[10px] ${currentStep > 1 ? 'text-emerald-500' : 'text-slate-300'}"></i>

            <!-- Step 2 Badge -->
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${currentStep === 2 ? 'bg-brand-600 text-white shadow-sm ring-1 ring-brand-300' : currentStep > 2 ? 'bg-emerald-100 text-emerald-800' : 'text-slate-400'}">
                <span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${currentStep === 2 ? 'bg-white text-brand-700 font-extrabold' : currentStep > 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}">
                    ${currentStep > 2 ? '<i class="fa-solid fa-check text-[9px]"></i>' : '2'}
                </span>
                <span class="hidden md:inline">2. Pilih Soal</span>
                <span class="md:hidden">2</span>
                <span id="pkg-stepper-count-badge" class="px-1.5 py-0.2 rounded-full text-[10px] ${currentStep === 2 ? 'bg-white/25 text-white' : 'bg-emerald-200 text-emerald-900'} font-black ${selectedQIds.size > 0 ? '' : 'hidden'}">
                    ${selectedQIds.size}
                </span>
            </div>

            <i class="fa-solid fa-chevron-right text-[10px] ${currentStep > 2 ? 'text-emerald-500' : 'text-slate-300'}"></i>

            <!-- Step 3 Badge -->
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${currentStep === 3 ? 'bg-brand-600 text-white shadow-sm ring-1 ring-brand-300' : 'text-slate-400'}">
                <span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${currentStep === 3 ? 'bg-white text-brand-700 font-extrabold' : 'bg-slate-200 text-slate-500'}">
                    3
                </span>
                <span class="hidden md:inline">3. Review</span>
                <span class="md:hidden">3</span>
            </div>

            <button type="button" id="modal-close-x-pkg" class="ml-2 text-slate-400 hover:text-slate-700 w-7 h-7 rounded-full hover:bg-slate-200/70 flex items-center justify-center transition-colors" title="Tutup Modal">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>
        `;
    }

    function renderStepBodyHtml() {
        if (currentStep === 1) return renderStep1Html();
        if (currentStep === 2) return renderStep2Html();
        return renderStep3Html();
    }

    // ========================================================
    // STEP 1: INFORMASI PAKET
    // ========================================================
    function renderStep1Html() {
        return `
            <form id="form-pkg-step-1" class="space-y-4 max-w-3xl mx-auto py-2">
                <!-- Nama Paket Ujian -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Nama Paket Ujian <span class="text-rose-500">*</span></label>
                    <input type="text" id="pkgmodal-name" value="${formData.name}" placeholder="Contoh: Simulasi TKA Matematika Kelas 5 - Paket A" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none transition-all shadow-sm" required>
                    <p class="text-[11px] text-slate-400 mt-1">Berikan nama yang jelas agar mudah diidentifikasi oleh siswa dan guru.</p>
                </div>

                <!-- Kelas, Subject, Mode Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Kelas <span class="text-rose-500">*</span></label>
                        <select id="pkgmodal-kelas" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none shadow-sm cursor-pointer">
                            ${CLASSES.map(c => `<option value="${c}" ${c === formData.kelas ? 'selected' : ''}>${c}</option>`).join('')}
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran <span class="text-rose-500">*</span></label>
                        <select id="pkgmodal-subject" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none shadow-sm cursor-pointer">
                            ${SUBJECTS.map(s => `<option value="${s.id}" ${s.id === formData.subject ? 'selected' : ''}>${s.name}</option>`).join('')}
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Mode Ujian <span class="text-rose-500">*</span></label>
                        <select id="pkgmodal-mode" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none shadow-sm cursor-pointer">
                            <option value="simulasi" ${formData.mode === 'simulasi' ? 'selected' : ''}>⚡ Mode Simulasi TKA</option>
                            <option value="latihan" ${formData.mode === 'latihan' ? 'selected' : ''}>📚 Mode Latihan Mandiri</option>
                        </select>
                    </div>
                </div>

                <!-- Timer & KKM -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Durasi Timer (Menit) <span class="text-rose-500">*</span></label>
                        <div class="relative">
                            <input type="number" id="pkgmodal-duration" value="${formData.durationMinutes}" min="1" max="180" class="w-full pl-3.5 pr-12 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none shadow-sm" required>
                            <span class="absolute right-3.5 top-2.5 text-xs text-slate-400 font-medium pointer-events-none">Menit</span>
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">KKM Minimum Kelulusan <span class="text-rose-500">*</span></label>
                        <div class="relative">
                            <input type="number" id="pkgmodal-kkm" value="${formData.kkm}" min="0" max="100" class="w-full pl-3.5 pr-12 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none shadow-sm" required>
                            <span class="absolute right-3.5 top-2.5 text-xs text-slate-400 font-medium pointer-events-none">Poin</span>
                        </div>
                    </div>
                </div>

                <!-- Option toggles -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1.5">Pengaturan Fitur Ujian</label>
                    <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <label class="flex items-center gap-2.5 cursor-pointer font-semibold text-slate-700 hover:text-brand-700 transition-colors p-1 rounded-lg">
                            <input type="checkbox" id="pkgmodal-random-q" ${formData.randomizeQuestions ? 'checked' : ''} class="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500">
                            <span>Acak Urutan Soal</span>
                        </label>
                        <label class="flex items-center gap-2.5 cursor-pointer font-semibold text-slate-700 hover:text-brand-700 transition-colors p-1 rounded-lg">
                            <input type="checkbox" id="pkgmodal-random-opt" ${formData.randomizeOptions ? 'checked' : ''} class="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500">
                            <span>Acak Pilihan Opsi</span>
                        </label>
                        <label class="flex items-center gap-2.5 cursor-pointer font-semibold text-slate-700 hover:text-brand-700 transition-colors p-1 rounded-lg">
                            <input type="checkbox" id="pkgmodal-show-results" ${formData.showResultsToStudent ? 'checked' : ''} class="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500">
                            <span>Tampilkan Hasil Nilai</span>
                        </label>
                    </div>
                </div>

                <!-- Petunjuk Pengerjaan -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Petunjuk / Instruksi Ujian (Opsional)</label>
                    <textarea id="pkgmodal-instructions" rows="2" placeholder="Contoh: Kerjakan soal dengan teliti dan cermat. Berdoalah sebelum memulai ujian." class="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 outline-none shadow-sm">${formData.instructions}</textarea>
                </div>

                <!-- Error alert message inside modal -->
                <div id="pkgmodal-error-msg-1" class="hidden p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span id="pkgmodal-error-text-1"></span>
                </div>

                <!-- Step 1 Action Buttons -->
                <div class="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                    <button type="button" id="modal-cancel-pkg" class="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors">
                        Batal
                    </button>
                    <button type="submit" id="btn-next-to-step-2" class="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center gap-2">
                        <span>Lanjut ke Pilih Soal</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </form>
        `;
    }

    // ========================================================
    // STEP 2: PILIH SOAL (DUA KOLOM + REACTIVE SUB-COMPONENTS)
    // ========================================================
    function renderStep2Html() {
        const baseQuestions = getBaseQuestions();
        const uniqueBabs = [...new Set(baseQuestions.map(q => q.bab || 'Materi Umum'))].sort();

        return `
            <div class="space-y-3">
                <!-- Top Filter & Search Bar with Realtime Status -->
                <div class="bg-slate-50/90 p-3 rounded-2xl border border-slate-200/80 space-y-2.5">
                    <!-- Search & Select Dropdowns -->
                    <div class="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                        <!-- Search Box (col 5) -->
                        <div class="sm:col-span-5 relative">
                            <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-2.5 text-slate-400 text-xs"></i>
                            <input type="text" id="pkg-search-q-input" value="${searchQuery}" placeholder="Cari teks soal, materi/bab, atau ID..." class="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none shadow-xs">
                            <button type="button" id="btn-clear-search-q" class="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs ${searchQuery ? '' : 'hidden'}">
                                <i class="fa-solid fa-circle-xmark"></i>
                            </button>
                        </div>

                        <!-- Dropdown Bab (col 3) -->
                        <div class="sm:col-span-3">
                            <select id="pkg-filter-bab-select" class="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-brand-500 outline-none shadow-xs cursor-pointer">
                                <option value="ALL" ${filterBab === 'ALL' ? 'selected' : ''}>Semua Materi (${baseQuestions.length})</option>
                                ${uniqueBabs.map(b => {
                                    const cnt = baseQuestions.filter(q => (q.bab || 'Materi Umum') === b).length;
                                    return `<option value="${b}" ${filterBab === b ? 'selected' : ''}>${b} (${cnt})</option>`;
                                }).join('')}
                            </select>
                        </div>

                        <!-- Dropdown Kesulitan (col 2) -->
                        <div class="sm:col-span-2">
                            <select id="pkg-filter-diff-select" class="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-brand-500 outline-none shadow-xs cursor-pointer">
                                <option value="ALL" ${filterDifficulty === 'ALL' ? 'selected' : ''}>Semua Kesulitan</option>
                                ${DIFFICULTY_LEVELS.map(d => `<option value="${d}" ${filterDifficulty === d ? 'selected' : ''}>${d}</option>`).join('')}
                            </select>
                        </div>

                        <!-- Dropdown Tipe (col 2) -->
                        <div class="sm:col-span-2">
                            <select id="pkg-filter-type-select" class="w-full px-2.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-brand-500 outline-none shadow-xs cursor-pointer">
                                <option value="ALL" ${filterType === 'ALL' ? 'selected' : ''}>Semua Tipe</option>
                                <option value="Pilihan Ganda" ${filterType === 'Pilihan Ganda' ? 'selected' : ''}>Pilihan Ganda</option>
                            </select>
                        </div>
                    </div>

                    <!-- Quick Topic Filter Chips (1-Click Filter) -->
                    ${uniqueBabs.length > 0 ? `
                        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
                            <span class="text-[10px] font-bold text-slate-400 shrink-0 uppercase tracking-wider">Topik:</span>
                            <button type="button" class="btn-topic-chip px-2.5 py-0.5 rounded-lg font-bold shrink-0 transition-all ${filterBab === 'ALL' ? 'bg-brand-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}" data-bab="ALL">
                                Semua (${baseQuestions.length})
                            </button>
                            ${uniqueBabs.map(b => {
                                const count = baseQuestions.filter(q => (q.bab || 'Materi Umum') === b).length;
                                const isActive = filterBab === b;
                                return `
                                    <button type="button" class="btn-topic-chip px-2.5 py-0.5 rounded-lg font-bold shrink-0 transition-all ${isActive ? 'bg-brand-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}" data-bab="${b}">
                                        ${b} (${count})
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    ` : ''}

                    <!-- Realtime Counter & Capacity Banner -->
                    <div id="pkg-counter-banner-container" class="pt-1.5 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                        ${renderCounterBannerHtml()}
                    </div>
                </div>

                <!-- TWO COLUMN GRID -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
                    
                    <!-- ============================================ -->
                    <!-- LEFT COLUMN: BANK SOAL (lg:col-span-7)       -->
                    <!-- ============================================ -->
                    <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs flex flex-col">
                        <!-- Left Header Bar -->
                        <div class="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-100">
                            <div class="flex items-center gap-2">
                                <span class="font-outfit text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                    <i class="fa-solid fa-database text-brand-600"></i> Bank Soal
                                </span>
                                <span id="pkg-bank-found-count" class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                                    ${getFilteredBankQuestions().length} Soal
                                </span>
                            </div>

                            <!-- Pilih Semua Button (current filter) -->
                            <button type="button" id="btn-toggle-select-all-filtered" class="text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200">
                                <i class="fa-solid fa-square-check"></i>
                                <span id="btn-toggle-select-all-label">Pilih Semua (Filter)</span>
                            </button>
                        </div>

                        <!-- Bank Soal Cards Sub-Container -->
                        <div id="pkg-bank-cards-list" class="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                            ${renderBankCardsHtml()}
                        </div>

                        <!-- Pagination Footer -->
                        <div id="pkg-bank-pagination-container" class="pt-2.5 mt-2 border-t border-slate-100">
                            ${renderPaginationHtml()}
                        </div>
                    </div>

                    <!-- ============================================ -->
                    <!-- RIGHT COLUMN: SOAL TERPILIH (lg:col-span-5)  -->
                    <!-- ============================================ -->
                    <div class="lg:col-span-5 bg-slate-50/90 rounded-2xl border border-slate-200 p-3.5 shadow-xs flex flex-col">
                        <!-- Right Header Bar -->
                        <div class="flex items-center justify-between pb-2.5 mb-2 border-b border-slate-200">
                            <div class="flex items-center gap-2">
                                <span class="font-outfit text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                    <i class="fa-solid fa-list-check text-emerald-600"></i> Soal Terpilih
                                </span>
                                <span id="pkg-selected-pill-badge" class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                                    ${selectedQIds.size} Butir
                                </span>
                            </div>

                            <button type="button" id="btn-clear-all-selected" class="text-[11px] font-bold px-2 py-1 rounded-lg text-rose-600 hover:bg-rose-100/80 transition-colors flex items-center gap-1 ${selectedQIds.size > 0 ? '' : 'hidden'}">
                                <i class="fa-regular fa-trash-can"></i> Hapus Semua
                            </button>
                        </div>

                        <!-- Mini Composition Summary Chart -->
                        <div id="pkg-composition-container" class="mb-2">
                            ${renderCompositionChartHtml()}
                        </div>

                        <!-- Selected Questions Scrollable List -->
                        <div id="pkg-selected-cards-list" class="space-y-1.5 max-h-[290px] overflow-y-auto pr-1">
                            ${renderSelectedCardsHtml()}
                        </div>
                    </div>
                </div>

                <!-- Error alert message for Step 2 -->
                <div id="pkgmodal-error-msg-2" class="hidden p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span id="pkgmodal-error-text-2"></span>
                </div>

                <!-- Step 2 Navigation Action Buttons -->
                <div class="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <button type="button" id="btn-back-to-step-1" class="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                        <i class="fa-solid fa-arrow-left"></i>
                        <span>Kembali ke Info Paket</span>
                    </button>

                    <div class="flex items-center gap-3">
                        <button type="button" id="btn-next-to-step-3" class="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center gap-2">
                            <span>Lanjut ke Review</span>
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Realtime Counter & Capacity Banner HTML
    function renderCounterBannerHtml() {
        const count = selectedQIds.size;
        const remaining = targetQuestionCount - count;

        return `
            <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-100/70 text-brand-800 font-extrabold text-[11px]">
                    <i class="fa-solid fa-graduation-cap"></i> ${formData.kelas} • ${SUBJECTS.find(s => s.id === formData.subject)?.name || formData.subject}
                </span>
                <span class="text-slate-400 text-[11px] hidden sm:inline">Target standar: <strong>${targetQuestionCount} soal</strong></span>
            </div>

            <!-- Counter Status Badge -->
            <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs transition-all ${count >= targetQuestionCount ? 'bg-emerald-500 text-white shadow-emerald-500/20' : count > 0 ? 'bg-brand-600 text-white shadow-brand-600/20' : 'bg-amber-100 text-amber-800 border border-amber-200'}">
                    <i class="fa-solid ${count >= targetQuestionCount ? 'fa-circle-check' : count > 0 ? 'fa-list-check' : 'fa-info-circle'}"></i>
                    <span>${count} / ${targetQuestionCount} Soal Dipilih</span>
                </span>

                <span class="text-[11px] font-bold ${count >= targetQuestionCount ? 'text-emerald-600' : 'text-slate-500'}">
                    ${count >= targetQuestionCount ? '✓ Paket soal lengkap' : remaining > 0 ? `${remaining} soal lagi` : ''}
                </span>
            </div>
        `;
    }

    // Bank Soal Cards List HTML
    function renderBankCardsHtml() {
        const filteredQuestions = getFilteredBankQuestions();
        const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / pageSize));
        if (currentPage > totalPages) currentPage = totalPages;
        const startIndex = (currentPage - 1) * pageSize;
        const pageQuestions = filteredQuestions.slice(startIndex, startIndex + pageSize);

        if (filteredQuestions.length === 0) {
            return `
                <div class="py-12 px-4 text-center">
                    <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-xl mb-2">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <p class="text-xs font-bold text-slate-700">Tidak ada soal yang sesuai filter</p>
                    <p class="text-[11px] text-slate-400 mt-0.5">Coba sesuaikan kata kunci pencarian atau filter materi.</p>
                </div>
            `;
        }

        return pageQuestions.map(q => {
            const isSelected = selectedQIds.has(q.id);
            const diffColor = q.difficulty === 'Mudah' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : q.difficulty === 'Sulit' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200';

            return `
                <div class="pkg-q-card p-3 rounded-xl border transition-all duration-150 cursor-pointer ${isSelected ? 'bg-brand-50/70 border-brand-400 ring-1 ring-brand-300 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'}" data-q-id="${q.id}">
                    <div class="flex items-start justify-between gap-2 mb-1.5 pointer-events-none">
                        <div class="flex flex-wrap items-center gap-1.5">
                            <span class="px-2 py-0.5 rounded-md bg-brand-100/80 text-brand-800 text-[10px] font-bold">
                                ${q.bab || 'Materi Umum'}
                            </span>
                            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold border ${diffColor}">
                                ${q.difficulty || 'Sedang'}
                            </span>
                            ${q.image ? `<span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium inline-flex items-center gap-1"><i class="fa-solid fa-image text-brand-500"></i> Media</span>` : ''}
                        </div>

                        <span class="text-[10px] font-mono text-slate-400 shrink-0">#${q.id}</span>
                    </div>

                    <!-- Question Text Preview -->
                    <div class="text-xs text-slate-800 font-medium line-clamp-2 leading-relaxed mb-2.5 pointer-events-none">
                        ${formatRichText(q.question)}
                    </div>

                    <!-- Card Actions -->
                    <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <button type="button" class="btn-preview-question text-slate-500 hover:text-brand-600 font-semibold text-[11px] inline-flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-slate-100 transition-colors" data-preview-id="${q.id}">
                            <i class="fa-regular fa-eye"></i> Preview Detail
                        </button>

                        ${isSelected ? `
                            <button type="button" class="btn-toggle-q px-3 py-1 rounded-lg bg-emerald-600 hover:bg-rose-600 text-white text-[11px] font-bold inline-flex items-center gap-1 shadow-xs transition-all" data-q-id="${q.id}">
                                <i class="fa-solid fa-check"></i>
                                <span>✓ Terpilih</span>
                            </button>
                        ` : `
                            <button type="button" class="btn-toggle-q px-3 py-1 rounded-lg bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-700 text-[11px] font-bold inline-flex items-center gap-1 transition-all" data-q-id="${q.id}">
                                <i class="fa-solid fa-plus"></i>
                                <span>+ Pilih</span>
                            </button>
                        `}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Pagination HTML
    function renderPaginationHtml() {
        const filteredQuestions = getFilteredBankQuestions();
        const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / pageSize));

        if (filteredQuestions.length <= pageSize) {
            return `
                <div class="text-[11px] text-slate-400 text-center">
                    Menampilkan semua ${filteredQuestions.length} butir soal
                </div>
            `;
        }

        return `
            <div class="flex items-center justify-between text-xs text-slate-500">
                <span class="text-[11px]">
                    Hal. <strong>${currentPage}</strong> / <strong>${totalPages}</strong> (${filteredQuestions.length} soal)
                </span>
                <div class="flex items-center gap-1">
                    <button type="button" id="btn-page-prev" class="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center font-bold text-xs" ${currentPage <= 1 ? 'disabled' : ''}>
                        <i class="fa-solid fa-chevron-left text-[10px]"></i>
                    </button>
                    
                    ${Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                        .map((p, idx, arr) => {
                            const prev = arr[idx - 1];
                            const isGap = prev && p - prev > 1;
                            return `
                                ${isGap ? `<span class="px-1 text-slate-400">...</span>` : ''}
                                <button type="button" class="btn-page-num w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center transition-all ${p === currentPage ? 'bg-brand-600 text-white shadow-xs' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'}" data-page="${p}">
                                    ${p}
                                </button>
                            `;
                        }).join('')}

                    <button type="button" id="btn-page-next" class="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center font-bold text-xs" ${currentPage >= totalPages ? 'disabled' : ''}>
                        <i class="fa-solid fa-chevron-right text-[10px]"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Mini Composition Chart HTML
    function renderCompositionChartHtml() {
        const selectedQuestions = getSelectedQuestionsList();
        const composition = getQuestionComposition();

        if (selectedQuestions.length === 0) return '';

        return `
            <div class="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs">
                <div class="flex items-center justify-between mb-1.5">
                    <span class="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                        <i class="fa-solid fa-chart-pie text-brand-600"></i> Komposisi Soal
                    </span>
                    <span class="text-[10px] font-bold text-slate-500">${Object.keys(composition).length} Materi</span>
                </div>
                <div class="space-y-1.5 max-h-20 overflow-y-auto pr-1">
                    ${Object.entries(composition).map(([babName, count]) => {
                        const percent = Math.round((count / selectedQuestions.length) * 100);
                        return `
                            <div>
                                <div class="flex justify-between text-[10px] font-semibold text-slate-600 mb-0.5">
                                    <span class="truncate max-w-[150px]" title="${babName}">${babName}</span>
                                    <span class="font-bold text-slate-800">${count} (${percent}%)</span>
                                </div>
                                <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div class="bg-brand-600 h-full rounded-full transition-all duration-300" style="width: ${percent}%"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    // Selected Soal Cards HTML
    function renderSelectedCardsHtml() {
        const selectedQuestions = getSelectedQuestionsList();

        if (selectedQuestions.length === 0) {
            return `
                <div class="py-12 px-4 text-center bg-white rounded-xl border border-dashed border-slate-200">
                    <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-lg mb-2">
                        <i class="fa-solid fa-inbox"></i>
                    </div>
                    <p class="text-xs font-bold text-slate-700">Belum ada soal dipilih</p>
                    <p class="text-[11px] text-slate-400 mt-0.5">Pilih soal dari daftar Bank Soal di sebelah kiri.</p>
                </div>
            `;
        }

        return selectedQuestions.map((q, idx) => {
            const numStr = String(idx + 1).padStart(2, '0');
            return `
                <div class="p-2.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs flex items-start gap-2.5 transition-all">
                    <span class="w-6 h-6 rounded-lg bg-brand-50 text-brand-700 font-extrabold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        ${numStr}
                    </span>

                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-1.5 mb-1">
                            <span class="px-1.5 py-0.2 rounded bg-brand-100/70 text-brand-800 font-bold text-[9px] truncate max-w-[130px]">
                                ${q.bab || 'Materi Umum'}
                            </span>
                            <span class="text-[9px] font-mono text-slate-400">#${q.id}</span>
                        </div>
                        <p class="text-[11px] font-medium text-slate-800 line-clamp-2 leading-tight">
                            ${formatRichText(q.question)}
                        </p>
                    </div>

                    <div class="flex items-center gap-1 shrink-0">
                        <button type="button" class="btn-preview-question text-slate-400 hover:text-brand-600 p-1 rounded-md hover:bg-slate-50 transition-colors" data-preview-id="${q.id}" title="Preview Soal">
                            <i class="fa-regular fa-eye text-xs"></i>
                        </button>
                        <button type="button" class="btn-remove-selected text-slate-400 hover:text-rose-600 p-1 rounded-md hover:bg-rose-50 transition-colors" data-remove-id="${q.id}" title="Hapus dari Paket">
                            <i class="fa-solid fa-xmark text-xs"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ========================================================
    // STEP 3: REVIEW & SIMPAN
    // ========================================================
    function renderStep3Html() {
        const selectedQuestions = getSelectedQuestionsList();
        const composition = getQuestionComposition();
        const subjectObj = SUBJECTS.find(s => s.id === formData.subject);

        return `
            <div class="space-y-4 max-w-4xl mx-auto py-1">
                <!-- Summary Card Details -->
                <div class="bg-gradient-to-r from-brand-50/70 to-slate-50 p-4 sm:p-5 rounded-2xl border border-brand-100 space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                            <span class="text-[10px] font-extrabold uppercase tracking-wider text-brand-600">Review Paket Ujian</span>
                            <h4 class="font-outfit text-base sm:text-lg font-bold text-slate-800 mt-0.5">${formData.name}</h4>
                        </div>
                        <span class="px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 self-start ${formData.mode === 'simulasi' ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'}">
                            <i class="fa-solid ${formData.mode === 'simulasi' ? 'fa-bolt' : 'fa-book-open'}"></i>
                            <span>${formData.mode === 'simulasi' ? 'Mode Simulasi TKA' : 'Mode Latihan Mandiri'}</span>
                        </span>
                    </div>

                    <!-- Metadata Grid -->
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-3 border-t border-brand-100/80">
                        <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                            <span class="text-[10px] text-slate-400 font-bold block">Kelas & Mapel</span>
                            <span class="font-bold text-slate-800">${formData.kelas}</span>
                            <span class="text-brand-600 block text-[11px] font-semibold">${subjectObj?.name || formData.subject}</span>
                        </div>
                        <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                            <span class="text-[10px] text-slate-400 font-bold block">Durasi Ujian</span>
                            <span class="font-bold text-slate-800 text-sm">⏱ ${formData.durationMinutes} Menit</span>
                        </div>
                        <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                            <span class="text-[10px] text-slate-400 font-bold block">KKM Minimum</span>
                            <span class="font-bold text-slate-800 text-sm">🎯 Nilai ${formData.kkm}</span>
                        </div>
                        <div class="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                            <span class="text-[10px] text-slate-400 font-bold block">Total Soal</span>
                            <span class="font-extrabold text-brand-700 text-sm">📝 ${selectedQuestions.length} Butir</span>
                        </div>
                    </div>

                    <!-- Settings & Composition -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                        <!-- Fitur Pengaturan -->
                        <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Pengaturan Ujian</span>
                            <div class="flex flex-wrap gap-2">
                                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${formData.randomizeQuestions ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'}">
                                    ${formData.randomizeQuestions ? '✓ Acak Soal' : '✗ Urutan Tetap'}
                                </span>
                                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${formData.randomizeOptions ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'}">
                                    ${formData.randomizeOptions ? '✓ Acak Opsi' : '✗ Opsi Tetap'}
                                </span>
                                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${formData.showResultsToStudent ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'}">
                                    ${formData.showResultsToStudent ? '✓ Tampil Nilai' : '✗ Sembunyikan Nilai'}
                                </span>
                            </div>
                            ${formData.instructions ? `
                                <div class="pt-1 text-[11px] text-slate-600 italic">
                                    <strong>Petunjuk:</strong> "${formData.instructions}"
                                </div>
                            ` : ''}
                        </div>

                        <!-- Komposisi Materi -->
                        <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Distribusi Materi Soal</span>
                            <div class="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                                ${Object.entries(composition).map(([babName, count]) => `
                                    <span class="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-[10px] border border-slate-200">
                                        ${babName}: <strong class="text-brand-600">${count}</strong>
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Compact Question Preview List -->
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                            <i class="fa-solid fa-list-ol text-brand-600"></i> Daftar Soal yang Akan Diujikan (${selectedQuestions.length})
                        </span>
                        <button type="button" id="btn-edit-questions-from-review" class="text-brand-600 hover:text-brand-800 text-xs font-bold inline-flex items-center gap-1">
                            <i class="fa-solid fa-pencil"></i> Ubah Pilihan Soal
                        </button>
                    </div>

                    <div class="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 max-h-56 overflow-y-auto shadow-2xs">
                        ${selectedQuestions.map((q, idx) => `
                            <div class="p-2.5 flex items-center justify-between gap-3 text-xs hover:bg-slate-50 transition-colors">
                                <div class="flex items-center gap-2.5 min-w-0">
                                    <span class="w-5 h-5 rounded-md bg-slate-100 text-slate-600 font-bold text-[10px] flex items-center justify-center shrink-0">
                                        ${idx + 1}
                                    </span>
                                    <span class="px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 font-bold text-[10px] shrink-0">
                                        ${q.bab || 'Umum'}
                                    </span>
                                    <span class="text-slate-800 font-medium truncate max-w-[450px]">
                                        ${formatRichText(q.question)}
                                    </span>
                                </div>
                                <button type="button" class="btn-preview-question text-slate-400 hover:text-brand-600 text-xs font-semibold px-2 py-1 rounded hover:bg-slate-100 shrink-0" data-preview-id="${q.id}">
                                    <i class="fa-regular fa-eye"></i> Detail
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Final Action Buttons -->
                <div class="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <button type="button" id="btn-back-to-step-2" class="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5">
                        <i class="fa-solid fa-arrow-left"></i>
                        <span>Kembali ke Pilih Soal</span>
                    </button>

                    <button type="button" id="btn-finalize-submit-pkg" class="px-7 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-lg shadow-brand-600/30 transition-all flex items-center gap-2">
                        <i class="fa-solid fa-check"></i>
                        <span>${isEdit ? 'Simpan Perubahan Paket' : 'Buat Paket Ujian Sekarang'}</span>
                    </button>
                </div>
            </div>
        `;
    }

    // ========================================================
    // PREVIEW OVERLAY MODAL
    // ========================================================
    function renderPreviewOverlayHtml(q) {
        if (!q) return '';
        const isSelected = selectedQIds.has(q.id);

        return `
            <div id="pkg-preview-backdrop" class="absolute inset-0 bg-slate-900/60 backdrop-blur-xs z-40 flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
                <div class="bg-white rounded-3xl p-5 sm:p-6 max-w-xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col space-y-3.5 animate-in zoom-in-95">
                    <!-- Preview Header -->
                    <div class="flex items-start justify-between pb-3 border-b border-slate-100">
                        <div>
                            <div class="flex items-center gap-1.5 mb-1">
                                <span class="px-2 py-0.5 rounded-md bg-brand-100 text-brand-800 text-[10px] font-bold">
                                    ${q.kelas} • ${q.bab || 'Materi Umum'}
                                </span>
                                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${q.difficulty === 'Mudah' ? 'bg-emerald-50 text-emerald-700' : q.difficulty === 'Sulit' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}">
                                    ${q.difficulty || 'Sedang'}
                                </span>
                            </div>
                            <span class="text-[10px] font-mono text-slate-400">ID Soal: #${q.id}</span>
                        </div>
                        <button type="button" id="btn-close-preview" class="text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                            <i class="fa-solid fa-xmark text-base"></i>
                        </button>
                    </div>

                    <!-- Question Content -->
                    <div class="space-y-3 text-xs text-slate-800">
                        <!-- Stimulus Passage (if any) -->
                        ${q.passage ? `
                            <div class="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                                <span class="font-bold text-[10px] text-amber-700 uppercase tracking-wider block mb-1">Bacaan / Stimulus:</span>
                                ${formatRichText(q.passage)}
                            </div>
                        ` : ''}

                        <!-- Question Text -->
                        <div class="font-semibold text-sm leading-relaxed">
                            ${formatRichText(q.question)}
                        </div>

                        <!-- Question Media / Image / SVG -->
                        ${q.image ? renderQuestionMedia(q.image) : ''}

                        <!-- Options List -->
                        ${q.options && q.options.length > 0 ? `
                            <div class="space-y-2 pt-2">
                                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pilihan Jawaban:</span>
                                ${q.options.map((opt, i) => {
                                    const optId = opt && opt.id ? opt.id : ['A', 'B', 'C', 'D'][i];
                                    const optText = typeof opt === 'string' ? opt : (opt?.text || '');
                                    const isKey = q.answerKey === optId;
                                    return `
                                        <div class="flex items-start gap-2.5 p-2.5 rounded-xl border ${isKey ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700'}">
                                            <span class="w-5 h-5 rounded-lg flex items-center justify-center font-bold text-[10px] ${isKey ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}">
                                                ${optId}
                                            </span>
                                            <span class="flex-1 text-xs leading-tight pt-0.5">${formatRichText(optText)}</span>
                                            ${isKey ? `<span class="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Kunci</span>` : ''}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        ` : ''}

                        <!-- Explanation (if any) -->
                        ${q.explanation ? `
                            <div class="p-3 bg-brand-50 border border-brand-200 rounded-xl text-[11px] text-brand-900">
                                <span class="font-bold block text-brand-700 mb-0.5"><i class="fa-solid fa-circle-info mr-1"></i> Pembahasan:</span>
                                ${formatRichText(q.explanation)}
                            </div>
                        ` : ''}
                    </div>

                    <!-- Preview Footer Actions -->
                    <div class="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                        <button type="button" id="btn-close-preview-footer" class="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-bold text-xs hover:bg-slate-50">
                            Tutup Preview
                        </button>
                        <button type="button" id="btn-preview-toggle-select" class="px-5 py-2 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 ${isSelected ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-brand-600 hover:bg-brand-700 text-white'}">
                            <i class="fa-solid ${isSelected ? 'fa-trash-can' : 'fa-plus'}"></i>
                            <span>${isSelected ? 'Hapus dari Paket' : '+ Tambahkan ke Paket'}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // ========================================================
    // REACTIVE SUB-PANEL UPDATERS (ZERO FLICKER & PRESERVES FOCUS)
    // ========================================================
    function updateStep2SubPanels() {
        // 1. Update Bank List
        const bankListEl = document.getElementById('pkg-bank-cards-list');
        if (bankListEl) {
            bankListEl.innerHTML = renderBankCardsHtml();
        }

        // 2. Update Bank Found Count
        const bankFoundEl = document.getElementById('pkg-bank-found-count');
        if (bankFoundEl) {
            bankFoundEl.innerText = `${getFilteredBankQuestions().length} Soal`;
        }

        // 3. Update Pagination
        const paginationEl = document.getElementById('pkg-bank-pagination-container');
        if (paginationEl) {
            paginationEl.innerHTML = renderPaginationHtml();
        }

        // 4. Update Select All Button Label
        const selectAllLabelEl = document.getElementById('btn-toggle-select-all-label');
        if (selectAllLabelEl) {
            const filtered = getFilteredBankQuestions();
            const allSelected = filtered.length > 0 && filtered.every(q => selectedQIds.has(q.id));
            selectAllLabelEl.innerText = allSelected ? 'Batal Pilih Semua (Filter)' : 'Pilih Semua (Filter)';
        }

        // 5. Update Selected List
        const selectedListEl = document.getElementById('pkg-selected-cards-list');
        if (selectedListEl) {
            selectedListEl.innerHTML = renderSelectedCardsHtml();
        }

        // 6. Update Selected Count Pill
        const selectedPillEl = document.getElementById('pkg-selected-pill-badge');
        if (selectedPillEl) {
            selectedPillEl.innerText = `${selectedQIds.size} Butir`;
        }

        // 7. Update Clear All Button Visibility
        const clearAllBtn = document.getElementById('btn-clear-all-selected');
        if (clearAllBtn) {
            if (selectedQIds.size > 0) clearAllBtn.classList.remove('hidden');
            else clearAllBtn.classList.add('hidden');
        }

        // 8. Update Mini Composition Chart
        const compEl = document.getElementById('pkg-composition-container');
        if (compEl) {
            compEl.innerHTML = renderCompositionChartHtml();
        }

        // 9. Update Counter & Capacity Banner
        const counterBannerEl = document.getElementById('pkg-counter-banner-container');
        if (counterBannerEl) {
            counterBannerEl.innerHTML = renderCounterBannerHtml();
        }

        // 10. Update Stepper Header Counter Badge
        const stepperBadgeEl = document.getElementById('pkg-stepper-count-badge');
        if (stepperBadgeEl) {
            stepperBadgeEl.innerText = selectedQIds.size;
            if (selectedQIds.size > 0) stepperBadgeEl.classList.remove('hidden');
            else stepperBadgeEl.classList.add('hidden');
        }

        // 11. Re-bind dynamic question event listeners
        attachStep2DynamicEvents();
    }

    // ========================================================
    // EVENT BINDINGS
    // ========================================================
    function attachMainEvents() {
        // Modal Close Button
        document.getElementById('modal-close-x-pkg')?.addEventListener('click', closeModal);
        document.getElementById('modal-cancel-pkg')?.addEventListener('click', closeModal);

        if (currentStep === 1) {
            const formStep1 = document.getElementById('form-pkg-step-1');
            const kelasSelect = document.getElementById('pkgmodal-kelas');
            const subjectSelect = document.getElementById('pkgmodal-subject');

            kelasSelect?.addEventListener('change', (e) => {
                const oldKelas = formData.kelas;
                formData.kelas = e.target.value;
                if (oldKelas !== formData.kelas) {
                    // Purge question IDs that don't belong to the new class
                    selectedQIds = new Set(
                        Array.from(selectedQIds).filter(id => {
                            const q = availableQuestions.find(item => item.id === id);
                            return q && q.kelas === formData.kelas && q.subject === formData.subject;
                        })
                    );
                }
            });

            subjectSelect?.addEventListener('change', (e) => {
                const oldSubject = formData.subject;
                formData.subject = e.target.value;
                if (oldSubject !== formData.subject) {
                    // Purge question IDs that don't belong to the new subject (e.g. Matematika -> Bahasa Indonesia)
                    selectedQIds = new Set(
                        Array.from(selectedQIds).filter(id => {
                            const q = availableQuestions.find(item => item.id === id);
                            return q && q.kelas === formData.kelas && q.subject === formData.subject;
                        })
                    );
                }
            });

            formStep1?.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('pkgmodal-name').value.trim();
                const duration = parseInt(document.getElementById('pkgmodal-duration').value, 10) || 15;
                const kkm = parseInt(document.getElementById('pkgmodal-kkm').value, 10) || 70;

                const errorDiv = document.getElementById('pkgmodal-error-msg-1');
                const errorText = document.getElementById('pkgmodal-error-text-1');

                if (!name) {
                    if (errorText && errorDiv) {
                        errorText.innerText = "Harap masukkan Nama Paket Ujian.";
                        errorDiv.classList.remove('hidden');
                    }
                    return;
                }

                // Save field values
                formData.name = name;
                formData.kelas = document.getElementById('pkgmodal-kelas').value;
                formData.subject = document.getElementById('pkgmodal-subject').value;
                formData.mode = document.getElementById('pkgmodal-mode').value;
                formData.durationMinutes = duration;
                formData.kkm = kkm;
                formData.randomizeQuestions = document.getElementById('pkgmodal-random-q').checked;
                formData.randomizeOptions = document.getElementById('pkgmodal-random-opt').checked;
                formData.showResultsToStudent = document.getElementById('pkgmodal-show-results').checked;
                formData.instructions = document.getElementById('pkgmodal-instructions').value.trim();

                // Strictly prune any questions from previous class/subject selections
                selectedQIds = new Set(
                    Array.from(selectedQIds).filter(id => {
                        const q = availableQuestions.find(item => item.id === id);
                        return q && q.kelas === formData.kelas && q.subject === formData.subject;
                    })
                );

                // Reset filter defaults for Step 2
                filterBab = 'ALL';
                filterDifficulty = 'ALL';
                filterType = 'ALL';
                searchQuery = '';
                currentPage = 1;

                // Advance to Step 2
                currentStep = 2;
                renderWizardShell();
            });
        }
        else if (currentStep === 2) {
            // Step Navigation: Back to Step 1
            document.getElementById('btn-back-to-step-1')?.addEventListener('click', () => {
                currentStep = 1;
                renderWizardShell();
            });

            // Step Navigation: Next to Step 3
            document.getElementById('btn-next-to-step-3')?.addEventListener('click', () => {
                const errorDiv = document.getElementById('pkgmodal-error-msg-2');
                const errorText = document.getElementById('pkgmodal-error-text-2');

                if (selectedQIds.size === 0) {
                    if (errorDiv && errorText) {
                        errorText.innerText = "Harap pilih minimal 1 butir soal untuk dimasukkan ke dalam paket ujian.";
                        errorDiv.classList.remove('hidden');
                    }
                    return;
                }

                currentStep = 3;
                renderWizardShell();
            });

            // Realtime Search Input (Input event with zero-flicker update)
            const searchInput = document.getElementById('pkg-search-q-input');
            const clearBtn = document.getElementById('btn-clear-search-q');

            searchInput?.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                currentPage = 1;
                if (clearBtn) {
                    if (searchQuery) clearBtn.classList.remove('hidden');
                    else clearBtn.classList.add('hidden');
                }
                updateStep2SubPanels();
            });

            clearBtn?.addEventListener('click', () => {
                searchQuery = '';
                if (searchInput) searchInput.value = '';
                clearBtn.classList.add('hidden');
                currentPage = 1;
                updateStep2SubPanels();
            });

            // Topic Chips
            document.querySelectorAll('.btn-topic-chip').forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBab = btn.getAttribute('data-bab');
                    currentPage = 1;
                    const selectBab = document.getElementById('pkg-filter-bab-select');
                    if (selectBab) selectBab.value = filterBab;

                    // Update active chip styling
                    document.querySelectorAll('.btn-topic-chip').forEach(c => {
                        const isMatch = c.getAttribute('data-bab') === filterBab;
                        c.className = `btn-topic-chip px-2.5 py-0.5 rounded-lg font-bold shrink-0 transition-all ${isMatch ? 'bg-brand-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`;
                    });

                    updateStep2SubPanels();
                });
            });

            // Bab dropdown filter
            document.getElementById('pkg-filter-bab-select')?.addEventListener('change', (e) => {
                filterBab = e.target.value;
                currentPage = 1;
                // Update chip active styles
                document.querySelectorAll('.btn-topic-chip').forEach(c => {
                    const isMatch = c.getAttribute('data-bab') === filterBab;
                    c.className = `btn-topic-chip px-2.5 py-0.5 rounded-lg font-bold shrink-0 transition-all ${isMatch ? 'bg-brand-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`;
                });
                updateStep2SubPanels();
            });

            // Kesulitan dropdown filter
            document.getElementById('pkg-filter-diff-select')?.addEventListener('change', (e) => {
                filterDifficulty = e.target.value;
                currentPage = 1;
                updateStep2SubPanels();
            });

            // Tipe dropdown filter
            document.getElementById('pkg-filter-type-select')?.addEventListener('change', (e) => {
                filterType = e.target.value;
                currentPage = 1;
                updateStep2SubPanels();
            });

            // Select All (filtered)
            document.getElementById('btn-toggle-select-all-filtered')?.addEventListener('click', () => {
                const filtered = getFilteredBankQuestions();
                const areAllSelected = filtered.length > 0 && filtered.every(q => selectedQIds.has(q.id));

                if (areAllSelected) {
                    filtered.forEach(q => selectedQIds.delete(q.id));
                } else {
                    filtered.forEach(q => selectedQIds.add(q.id));
                }
                updateStep2SubPanels();
            });

            // Clear All Selected
            document.getElementById('btn-clear-all-selected')?.addEventListener('click', () => {
                if (confirm(`Hapus seluruh ${selectedQIds.size} butir soal yang telah dipilih dari paket ini?`)) {
                    selectedQIds.clear();
                    updateStep2SubPanels();
                }
            });

            attachStep2DynamicEvents();
        }
        else if (currentStep === 3) {
            // Step Navigation: Back to Step 2
            document.getElementById('btn-back-to-step-2')?.addEventListener('click', () => {
                currentStep = 2;
                renderWizardShell();
            });

            document.getElementById('btn-edit-questions-from-review')?.addEventListener('click', () => {
                currentStep = 2;
                renderWizardShell();
            });

            // Submit / Save Package (strictly sanitized by class & subject)
            document.getElementById('btn-finalize-submit-pkg')?.addEventListener('click', () => {
                const questionIds = Array.from(selectedQIds).filter(id => {
                    const q = availableQuestions.find(item => item.id === id);
                    return q && q.kelas === formData.kelas && q.subject === formData.subject;
                });

                const packageData = {
                    ...(packageToEdit ? { id: packageToEdit.id } : {}),
                    name: formData.name,
                    kelas: formData.kelas,
                    subject: formData.subject,
                    mode: formData.mode,
                    durationMinutes: formData.durationMinutes,
                    kkm: formData.kkm,
                    randomizeQuestions: formData.randomizeQuestions,
                    randomizeOptions: formData.randomizeOptions,
                    showResultsToStudent: formData.showResultsToStudent,
                    instructions: formData.instructions || 'Kerjakan soal dengan cermat dan teliti. Timer akan berjalan otomatis saat tombol Mulai Ujian diklik.',
                    questionIds
                };

                if (onSave) onSave(packageData);
                closeModal();
            });

            // Preview in Step 3
            document.querySelectorAll('.btn-preview-question').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const qId = btn.getAttribute('data-preview-id');
                    const q = availableQuestions.find(item => item.id === qId);
                    if (q) openPreview(q);
                });
            });
        }
    }

    // Bind event listeners for dynamically updated question cards and pagination
    function attachStep2DynamicEvents() {
        // Toggle question via button
        document.querySelectorAll('.btn-toggle-q').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const qId = btn.getAttribute('data-q-id');
                if (selectedQIds.has(qId)) {
                    selectedQIds.delete(qId);
                } else {
                    selectedQIds.add(qId);
                }
                updateStep2SubPanels();
            });
        });

        // Click card to select
        document.querySelectorAll('.pkg-q-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.btn-preview-question') || e.target.closest('.btn-toggle-q')) return;
                const qId = card.getAttribute('data-q-id');
                if (!selectedQIds.has(qId)) {
                    selectedQIds.add(qId);
                    updateStep2SubPanels();
                }
            });
        });

        // Remove from right list
        document.querySelectorAll('.btn-remove-selected').forEach(btn => {
            btn.addEventListener('click', () => {
                const qId = btn.getAttribute('data-remove-id');
                selectedQIds.delete(qId);
                updateStep2SubPanels();
            });
        });

        // Pagination buttons
        document.getElementById('btn-page-prev')?.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updateStep2SubPanels();
            }
        });

        document.getElementById('btn-page-next')?.addEventListener('click', () => {
            const totalPages = Math.ceil(getFilteredBankQuestions().length / pageSize);
            if (currentPage < totalPages) {
                currentPage++;
                updateStep2SubPanels();
            }
        });

        document.querySelectorAll('.btn-page-num').forEach(btn => {
            btn.addEventListener('click', () => {
                currentPage = parseInt(btn.getAttribute('data-page'), 10) || 1;
                updateStep2SubPanels();
            });
        });

        // Preview buttons
        document.querySelectorAll('.btn-preview-question').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const qId = btn.getAttribute('data-preview-id');
                const q = availableQuestions.find(item => item.id === qId);
                if (q) openPreview(q);
            });
        });
    }

    // Open & Close Preview Overlay
    function openPreview(q) {
        previewQuestion = q;
        const container = document.getElementById('pkg-preview-container');
        if (container) {
            container.innerHTML = renderPreviewOverlayHtml(q);

            const closePreview = () => {
                previewQuestion = null;
                container.innerHTML = '';
            };

            document.getElementById('btn-close-preview')?.addEventListener('click', closePreview);
            document.getElementById('btn-close-preview-footer')?.addEventListener('click', closePreview);
            document.getElementById('pkg-preview-backdrop')?.addEventListener('click', (e) => {
                if (e.target.id === 'pkg-preview-backdrop') closePreview();
            });

            document.getElementById('btn-preview-toggle-select')?.addEventListener('click', () => {
                if (selectedQIds.has(q.id)) {
                    selectedQIds.delete(q.id);
                } else {
                    selectedQIds.add(q.id);
                }
                if (currentStep === 2) updateStep2SubPanels();
                // Update preview toggle button state
                const previewToggleBtn = document.getElementById('btn-preview-toggle-select');
                if (previewToggleBtn) {
                    const isNowSelected = selectedQIds.has(q.id);
                    previewToggleBtn.className = `px-5 py-2 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 ${isNowSelected ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-brand-600 hover:bg-brand-700 text-white'}`;
                    previewToggleBtn.innerHTML = `
                        <i class="fa-solid ${isNowSelected ? 'fa-trash-can' : 'fa-plus'}"></i>
                        <span>${isNowSelected ? 'Hapus dari Paket' : '+ Tambahkan ke Paket'}</span>
                    `;
                }
            });
        }
    }

    // Initialize Wizard
    renderWizardShell();
}



