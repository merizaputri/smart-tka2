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

// 6. Package Form Modal (Tambah & Edit Paket Ujian)
export function renderPackageModal(packageToEdit = null, availableQuestions = [], onSave) {
    const isEdit = !!packageToEdit;

    const nameVal = packageToEdit ? packageToEdit.name : '';
    const kelasVal = packageToEdit ? packageToEdit.kelas : 'Kelas 5';
    const subjectVal = packageToEdit ? packageToEdit.subject : 'matematika';
    const modeVal = packageToEdit ? packageToEdit.mode : 'simulasi';
    const durationVal = packageToEdit ? packageToEdit.durationMinutes : 15;
    const kkmVal = packageToEdit ? (packageToEdit.kkm || 70) : 70;
    const randomizeQuestions = packageToEdit ? packageToEdit.randomizeQuestions !== false : true;
    const randomizeOptions = packageToEdit ? packageToEdit.randomizeOptions !== false : true;
    const showResults = packageToEdit ? packageToEdit.showResultsToStudent !== false : true;
    const instructionsVal = packageToEdit ? (packageToEdit.instructions || '') : '';
    const selectedQIds = new Set(packageToEdit && packageToEdit.questionIds ? packageToEdit.questionIds : []);

    function getFilteredQuestions(cls, subj) {
        return availableQuestions.filter(q => q.kelas === cls && q.subject === subj);
    }

    function renderQuestionChecklist(cls, subj) {
        const filtered = getFilteredQuestions(cls, subj);
        if (filtered.length === 0) {
            return `<div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">Tidak ada soal untuk ${cls} - ${subj.toUpperCase()} di Bank Soal.</div>`;
        }

        // If creating new package and selectedQIds hasn't been populated yet, default to all filtered questions
        if (!packageToEdit && selectedQIds.size === 0) {
            filtered.forEach(q => selectedQIds.add(q.id));
        }

        let checkedCount = 0;
        filtered.forEach(q => {
            if (selectedQIds.has(q.id)) checkedCount++;
        });

        const allChecked = checkedCount === filtered.length && filtered.length > 0;

        return `
            <div class="max-h-56 overflow-y-auto space-y-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                <div class="flex items-center justify-between pb-2 border-b border-slate-200 px-1 sticky top-0 bg-slate-50 z-10">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-slate-700">Bank Soal</span>
                        <span class="px-2.5 py-0.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-[11px] font-extrabold shadow-sm">
                            <span id="pkgmodal-selected-count-num">${checkedCount}</span> / ${filtered.length} Soal Dipilih
                        </span>
                    </div>
                    <button type="button" id="pkgmodal-toggle-all-q" class="text-brand-600 hover:text-brand-800 text-[11px] font-bold transition-colors">
                        ${allChecked ? 'Batal Pilih Semua' : 'Pilih Semua'}
                    </button>
                </div>
                <div class="space-y-1.5 pt-1">
                    ${filtered.map(q => {
                        const isChecked = selectedQIds.has(q.id);
                        return `
                            <label class="flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer text-xs ${isChecked ? 'bg-brand-50/50 border-brand-300 text-slate-900 shadow-sm' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'}">
                                <input type="checkbox" data-q-id="${q.id}" class="pkgmodal-q-checkbox mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 transition-colors" ${isChecked ? 'checked' : ''}>
                                <div class="flex-1 font-medium line-clamp-2">
                                    <span class="px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 font-bold text-[10px] mr-1">[${q.bab || 'General'}]</span>
                                    <span>${q.question}</span>
                                </div>
                            </label>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    const modalHtml = `
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 my-8 animate-in zoom-in-95">
            <div class="flex justify-between items-start mb-5 pb-4 border-b border-slate-100">
                <div>
                    <h3 class="font-outfit text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fa-solid ${isEdit ? 'fa-pen-to-square' : 'fa-boxes-stacked'} text-brand-600"></i>
                        ${isEdit ? 'Edit Paket Ujian' : 'Buat Paket Ujian Baru'}
                    </h3>
                    <p class="text-xs text-slate-500 mt-1">Atur nama paket, kelas, timer, KKM, serta soal-soal yang diujikan.</p>
                </div>
                <button id="modal-close-x-pkg" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>

            <form id="form-package" class="space-y-4">
                <!-- Nama Paket Ujian -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Nama Paket Ujian <span class="text-rose-500">*</span></label>
                    <input type="text" id="pkgmodal-name" value="${nameVal}" placeholder="Contoh: Simulasi TKA Matematika Kelas 5 - Paket A" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none">
                </div>

                <!-- Kelas, Subject, Mode Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Kelas <span class="text-rose-500">*</span></label>
                        <select id="pkgmodal-kelas" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none">
                            ${CLASSES.map(c => `<option value="${c}" ${c === kelasVal ? 'selected' : ''}>${c}</option>`).join('')}
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran <span class="text-rose-500">*</span></label>
                        <select id="pkgmodal-subject" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none">
                            ${SUBJECTS.map(s => `<option value="${s.id}" ${s.id === subjectVal ? 'selected' : ''}>${s.name}</option>`).join('')}
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Mode Ujian <span class="text-rose-500">*</span></label>
                        <select id="pkgmodal-mode" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none">
                            <option value="simulasi" ${modeVal === 'simulasi' ? 'selected' : ''}>⚡ Mode Simulasi TKA</option>
                            <option value="latihan" ${modeVal === 'latihan' ? 'selected' : ''}>📚 Mode Latihan Mandiri</option>
                        </select>
                    </div>
                </div>

                <!-- Timer & KKM -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Durasi Timer (Menit) <span class="text-rose-500">*</span></label>
                        <input type="number" id="pkgmodal-duration" value="${durationVal}" min="1" max="180" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">KKM Minimum Kelulusan <span class="text-rose-500">*</span></label>
                        <input type="number" id="pkgmodal-kkm" value="${kkmVal}" min="0" max="100" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 focus:bg-white outline-none">
                    </div>
                </div>

                <!-- Option toggles -->
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <label class="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                        <input type="checkbox" id="pkgmodal-random-q" ${randomizeQuestions ? 'checked' : ''} class="rounded border-slate-300 text-brand-600 focus:ring-brand-500">
                        Acak Soal
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                        <input type="checkbox" id="pkgmodal-random-opt" ${randomizeOptions ? 'checked' : ''} class="rounded border-slate-300 text-brand-600 focus:ring-brand-500">
                        Acak Pilihan
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                        <input type="checkbox" id="pkgmodal-show-results" ${showResults ? 'checked' : ''} class="rounded border-slate-300 text-brand-600 focus:ring-brand-500">
                        Tampil Hasil
                    </label>
                </div>

                <!-- Soal Checklist Container -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Pilih Soal dari Bank Soal</label>
                    <div id="pkgmodal-questions-container">
                        ${renderQuestionChecklist(kelasVal, subjectVal)}
                    </div>
                </div>

                <!-- Petunjuk Pengerjaan -->
                <div>
                    <label class="block text-xs font-bold text-slate-700 mb-1">Petunjuk / Instruksi Ujian (Opsional)</label>
                    <textarea id="pkgmodal-instructions" rows="2" placeholder="Tuliskan petunjuk pengerjaan bagi siswa..." class="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 outline-none">${instructionsVal}</textarea>
                </div>

                <!-- Error alert message inside modal -->
                <div id="pkgmodal-error-msg" class="hidden p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold"></div>

                <!-- Buttons -->
                <div class="flex gap-3 pt-4 border-t border-slate-100">
                    <button type="button" id="modal-cancel-pkg" class="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors">
                        Batal
                    </button>
                    <button type="submit" id="modal-submit-pkg" class="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-check"></i> ${isEdit ? 'Simpan Perubahan' : 'Buat Paket Ujian'}
                    </button>
                </div>
            </form>
        </div>
    `;

    showModal(modalHtml);

    // Event listeners
    document.getElementById('modal-close-x-pkg')?.addEventListener('click', closeModal);
    document.getElementById('modal-cancel-pkg')?.addEventListener('click', closeModal);

    const kelasSelect = document.getElementById('pkgmodal-kelas');
    const subjSelect = document.getElementById('pkgmodal-subject');
    const questionsContainer = document.getElementById('pkgmodal-questions-container');

    const updateChecklist = () => {
        const cls = kelasSelect.value;
        const subj = subjSelect.value;
        questionsContainer.innerHTML = renderQuestionChecklist(cls, subj);
        attachChecklistToggle();
    };

    kelasSelect?.addEventListener('change', updateChecklist);
    subjSelect?.addEventListener('change', updateChecklist);

    function attachChecklistToggle() {
        const toggleAllBtn = document.getElementById('pkgmodal-toggle-all-q');
        const checkboxes = document.querySelectorAll('.pkgmodal-q-checkbox');
        const countNumEl = document.getElementById('pkgmodal-selected-count-num');

        const updateChecklistUI = () => {
            const checkedCBs = document.querySelectorAll('.pkgmodal-q-checkbox:checked');
            const total = checkboxes.length;
            const count = checkedCBs.length;

            if (countNumEl) {
                countNumEl.innerText = count;
            }

            if (toggleAllBtn) {
                toggleAllBtn.innerText = (count === total && total > 0) ? 'Batal Pilih Semua' : 'Pilih Semua';
            }
        };

        if (toggleAllBtn) {
            toggleAllBtn.addEventListener('click', () => {
                const allChecked = Array.from(checkboxes).every(cb => cb.checked);
                checkboxes.forEach(cb => {
                    cb.checked = !allChecked;
                    const qId = cb.getAttribute('data-q-id');
                    if (!allChecked) {
                        selectedQIds.add(qId);
                    } else {
                        selectedQIds.delete(qId);
                    }

                    const label = cb.closest('label');
                    if (label) {
                        label.className = `flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer text-xs ${!allChecked ? 'bg-brand-50/50 border-brand-300 text-slate-900 shadow-sm' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'}`;
                    }
                });
                updateChecklistUI();
            });
        }

        checkboxes.forEach(cb => {
            cb.addEventListener('change', (e) => {
                const qId = e.target.getAttribute('data-q-id');
                const isChecked = e.target.checked;
                if (isChecked) {
                    selectedQIds.add(qId);
                } else {
                    selectedQIds.delete(qId);
                }

                const label = e.target.closest('label');
                if (label) {
                    label.className = `flex items-start gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer text-xs ${isChecked ? 'bg-brand-50/50 border-brand-300 text-slate-900 shadow-sm' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'}`;
                }

                updateChecklistUI();
            });
        });
    }

    attachChecklistToggle();

    document.getElementById('form-package')?.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('pkgmodal-name').value.trim();
        const kelas = document.getElementById('pkgmodal-kelas').value;
        const subject = document.getElementById('pkgmodal-subject').value;
        const mode = document.getElementById('pkgmodal-mode').value;
        const durationMinutes = parseInt(document.getElementById('pkgmodal-duration').value, 10) || 15;
        const kkm = parseInt(document.getElementById('pkgmodal-kkm').value, 10) || 70;
        const randomizeQuestions = document.getElementById('pkgmodal-random-q').checked;
        const randomizeOptions = document.getElementById('pkgmodal-random-opt').checked;
        const showResultsToStudent = document.getElementById('pkgmodal-show-results').checked;
        const instructions = document.getElementById('pkgmodal-instructions').value.trim();

        let questionIds = Array.from(selectedQIds);

        const errorMsgEl = document.getElementById('pkgmodal-error-msg');

        if (!name) {
            errorMsgEl.innerText = "Harap masukkan Nama Paket Ujian.";
            errorMsgEl.classList.remove('hidden');
            return;
        }

        // If no checkboxes were checked, default to all questions matching class & subject
        if (questionIds.length === 0) {
            const matchingQ = getFilteredQuestions(kelas, subject);
            questionIds = matchingQ.map(q => q.id);
        }

        errorMsgEl.classList.add('hidden');

        const packageData = {
            ...(packageToEdit ? { id: packageToEdit.id } : {}),
            name,
            kelas,
            subject,
            mode,
            durationMinutes,
            kkm,
            randomizeQuestions,
            randomizeOptions,
            showResultsToStudent,
            instructions: instructions || 'Kerjakan soal dengan cermat dan teliti. Timer akan berjalan otomatis saat tombol Mulai Ujian diklik.',
            questionIds
        };

        if (onSave) onSave(packageData);
        closeModal();
    });
}


