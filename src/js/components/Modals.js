// Global Modal UI Components
import { CLASSES, SUBJECTS, DIFFICULTY_LEVELS } from '../config/constants.js';
import { storageService } from '../services/storageService.js';
import { materialGeneratorService } from '../services/materialGeneratorService.js';
import { 
    extractYouTubeVideoId, 
    isValidYouTubeUrl, 
    getYouTubeThumbnailUrl, 
    getYouTubeEmbedUrl, 
    getYouTubeWatchUrl, 
    fetchYouTubeVideoMeta, 
    renderSafeYouTubePlayer,
    renderStudentVideoCard
} from '../services/youtubeService.js';


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

// Helper to render inline formatting (bold, italic, underline, code, inline images, safe math characters)
export function formatInline(str) {
    if (!str) return '';
    let res = String(str);

    // Escape raw '<' that is not part of a valid HTML tag (e.g. math "< 10" or "< Lebih kecil")
    res = res.replace(/<(?![a-zA-Z\/][^>]*>)/g, '&lt;');

    // Inline images: ![alt](url or data:image)
    res = res.replace(/!\[(.*?)\]\(((?:data:image\/[^)\s]+)|(?:https?:\/\/[^\s\)]+))\)/g, '<img src="$2" alt="$1" class="rounded-2xl max-h-96 max-w-full my-3 mx-auto border border-slate-200/90 shadow-sm block object-contain" loading="lazy" />');

    // Bold, Italic, Underline, Code
    res = res
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(/__(.*?)__/g, '<u class="underline decoration-slate-400">$1</u>')
        .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-rose-600 font-mono text-xs border border-slate-200">$1</code>');

    return res;
}

// Helper to render rich markdown formatting (headings, bold, italic, lists, quotes, images, paragraphs)
export function formatRichText(text) {
    if (!text) return '';
    let raw = String(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    // If it's a short single line without block markdown, format inline only
    if (!raw.includes('\n') && !raw.startsWith('#') && !raw.startsWith('>') && !raw.match(/^[-*]\s/) && !raw.match(/^\d+\.\s/)) {
        return formatInline(raw);
    }

    const lines = raw.split('\n');
    const output = [];
    let inList = null; // 'ul' or 'ol'

    const closeList = () => {
        if (inList) {
            output.push(inList === 'ul' ? '</ul>' : '</ol>');
            inList = null;
        }
    };

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        // Empty line creates clean paragraph separation
        if (!line) {
            closeList();
            output.push('<div class="h-3"></div>');
            continue;
        }

        // Full line image markdown: ![alt](url or data:image)
        const fullImgMatch = line.match(/^!\[(.*?)\]\(((?:data:image\/[^)\s]+)|(?:https?:\/\/[^\s\)]+))\)$/);
        if (fullImgMatch) {
            closeList();
            const alt = fullImgMatch[1] || 'Gambar Materi';
            const src = fullImgMatch[2];
            output.push(`
                <figure class="my-4 text-center">
                    <img src="${src}" alt="${alt}" class="rounded-2xl max-h-96 max-w-full mx-auto border border-slate-200/90 shadow-sm block object-contain" loading="lazy" />
                    ${alt && alt !== 'Gambar Materi' ? `<figcaption class="text-[11px] text-slate-500 mt-2 font-medium italic">${alt}</figcaption>` : ''}
                </figure>
            `);
            continue;
        }

        // Raw <img> tag on its own line
        if (line.startsWith('<img') && line.endsWith('>')) {
            closeList();
            output.push(`
                <figure class="my-4 text-center">
                    ${line.replace('<img ', '<img class="rounded-2xl max-h-96 max-w-full mx-auto border border-slate-200/90 shadow-sm block object-contain" loading="lazy" ')}
                </figure>
            `);
            continue;
        }

        // Headings: #, ##, ###
        if (line.startsWith('### ')) {
            closeList();
            output.push(`<h4 class="font-outfit font-bold text-sm sm:text-base text-slate-800 mt-4 mb-2 flex items-center gap-2"><span class="w-1.5 h-3.5 bg-indigo-500 rounded-full inline-block"></span><span>${formatInline(line.substring(4))}</span></h4>`);
            continue;
        }
        if (line.startsWith('## ')) {
            closeList();
            output.push(`<h3 class="font-outfit font-bold text-base sm:text-lg text-slate-900 mt-5 mb-2.5 flex items-center gap-2 pb-1 border-b border-slate-100"><span class="w-2 h-4 bg-brand-600 rounded-full inline-block"></span><span>${formatInline(line.substring(3))}</span></h3>`);
            continue;
        }
        if (line.startsWith('# ')) {
            closeList();
            output.push(`<h2 class="font-outfit font-black text-lg sm:text-xl text-slate-900 mt-6 mb-3 flex items-center gap-2 pb-1.5 border-b border-slate-200"><span class="w-2 h-5 bg-brand-600 rounded-full inline-block"></span><span>${formatInline(line.substring(2))}</span></h2>`);
            continue;
        }

        // Blockquotes / Poin Kunci (> text)
        if (line.startsWith('> ')) {
            closeList();
            output.push(`
                <div class="p-3.5 my-2.5 bg-gradient-to-r from-amber-50 to-orange-50/40 border-l-4 border-amber-500 rounded-r-2xl text-amber-950 text-xs sm:text-sm font-medium leading-relaxed shadow-2xs flex items-start gap-2.5">
                    <i class="fa-solid fa-lightbulb text-amber-600 mt-0.5 shrink-0 text-sm"></i>
                    <div class="flex-1">${formatInline(line.substring(2))}</div>
                </div>
            `);
            continue;
        }

        // Unordered list (- or * item)
        const ulMatch = line.match(/^[-*]\s+(.*)$/);
        if (ulMatch) {
            if (inList !== 'ul') {
                closeList();
                output.push('<ul class="my-2 space-y-1.5 pl-1.5">');
                inList = 'ul';
            }
            output.push(`
                <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                    <span class="flex-1">${formatInline(ulMatch[1])}</span>
                </li>
            `);
            continue;
        }

        // Ordered list or Numbered Subheading (1. item, 2. item)
        const olMatch = line.match(/^(\d+)\.\s+(.*)$/);
        if (olMatch) {
            const num = olMatch[1];
            const textContent = olMatch[2];

            // If it's a section title or heading (e.g. starts with bold or ends without period, like "1. Mengenal Bilangan sampai 50" or "2. Mengenal Puluhan...")
            const isSectionHeading = textContent.startsWith('**') || (!textContent.includes('.') && textContent.length < 60) || /^(mengenal|memahami|membandingkan|pengertian|definisi|tujuan|rumus|cara|langkah)/i.test(textContent.trim());

            if (isSectionHeading && inList !== 'ol') {
                closeList();
                output.push(`
                    <div class="mt-5 mb-2.5 flex items-center gap-2.5">
                        <span class="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-2xs font-outfit">${num}</span>
                        <h3 class="font-outfit font-bold text-sm sm:text-base text-slate-900">${formatInline(textContent)}</h3>
                    </div>
                `);
                continue;
            }

            if (inList !== 'ol') {
                closeList();
                output.push('<ol class="my-2 space-y-1.5 pl-1.5">');
                inList = 'ol';
            }
            output.push(`
                <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <span class="w-5 h-5 rounded-md bg-indigo-100 text-indigo-800 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">${num}</span>
                    <span class="flex-1">${formatInline(textContent)}</span>
                </li>
            `);
            continue;
        }

        closeList();

        // Check if line is a label like "Contoh:", "Tips:", "Catatan:"
        if (/^(contoh|tips|catatan|keterangan):/i.test(line)) {
            output.push(`
                <div class="font-bold text-xs text-brand-700 uppercase tracking-wide mt-3 mb-1 flex items-center gap-1.5">
                    <i class="fa-solid fa-bookmark text-[10px]"></i>
                    <span>${formatInline(line)}</span>
                </div>
            `);
            continue;
        }

        // Regular paragraph line
        output.push(`<p class="text-xs sm:text-sm text-slate-800 leading-relaxed my-1">${formatInline(line)}</p>`);
    }

    closeList();
    return output.join('\n');
}

// Utility to optimize & compress image files before embedding in content body (base64)
export function compressImageFile(file, maxDimension = 1000, quality = 0.82) {
    return new Promise((resolve, reject) => {
        if (!file || !file.type || !file.type.startsWith('image/')) {
            return reject(new Error('File yang dipilih bukan gambar.'));
        }

        const reader = new FileReader();
        reader.onerror = () => reject(new Error('Gagal membaca data file gambar.'));
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            const img = new Image();
            img.onerror = () => reject(new Error('Gagal merender gambar ke memori.'));
            img.onload = () => {
                let { width, height } = img;
                if (width > maxDimension || height > maxDimension) {
                    if (width > height) {
                        height = Math.round((height * maxDimension) / width);
                        width = maxDimension;
                    } else {
                        width = Math.round((width * maxDimension) / height);
                        height = maxDimension;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');

                // If PNG is small and compact, preserve transparency
                if (file.type === 'image/png' && file.size < 250 * 1024 && width <= 750) {
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/png'));
                } else {
                    // Fill white background for JPEG rendering
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, width, height);
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', quality));
                }
            };
            img.src = dataUrl;
        };
        reader.readAsDataURL(file);
    });
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
            const mappedMats = storageService.getMaterialsForQuestion(q.id);
            const matBadgeHtml = mappedMats && mappedMats.length > 0
                ? `<span class="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold inline-flex items-center gap-1" title="Materi: ${mappedMats[0].title}"><i class="fa-solid fa-book-bookmark text-indigo-500"></i> ${mappedMats[0].title}</span>`
                : `<span class="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium inline-flex items-center gap-1" title="Belum terhubung materi"><i class="fa-solid fa-triangle-exclamation text-amber-500"></i> Belum ada materi</span>`;

            return `
                <div class="pkg-q-card p-3 rounded-xl border transition-all duration-150 cursor-pointer ${isSelected ? 'bg-brand-50/70 border-brand-400 ring-1 ring-brand-300 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'}" data-q-id="${q.id}">
                    <div class="flex items-start justify-between gap-2 mb-1.5 pointer-events-none">
                        <div class="flex flex-wrap items-center gap-1.5">
                            <span class="px-2 py-0.5 rounded-md bg-brand-100/80 text-brand-800 text-[10px] font-bold">
                                ${q.bab || 'Materi Umum'}
                            </span>
                            ${matBadgeHtml}
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

                <!-- 📚 Materi yang Tercakup dalam Ujian -->
                ${(() => {
                    const coveredMaterials = storageService.getMaterialsByQuestionIds(selectedQuestions.map(q => q.id));
                    return `
                        <div class="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-4 space-y-2.5">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                        <i class="fa-solid fa-graduation-cap"></i>
                                    </span>
                                    <div>
                                        <h5 class="text-xs font-bold text-indigo-950">📚 Materi yang Tercakup dalam Ujian</h5>
                                        <p class="text-[10px] text-indigo-700">Materi pembelajaran yang berkaitan langsung dengan butir soal ujian ini</p>
                                    </div>
                                </div>
                                <span class="px-2.5 py-0.5 rounded-full bg-indigo-200/90 text-indigo-900 text-[11px] font-extrabold">
                                    ${coveredMaterials.length} Materi Terhubung
                                </span>
                            </div>

                            ${coveredMaterials.length > 0 ? `
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                                    ${coveredMaterials.map(m => `
                                        <div class="p-2.5 bg-white rounded-xl border border-indigo-100 flex items-center justify-between shadow-2xs">
                                            <div class="min-w-0 pr-2">
                                                <p class="text-xs font-bold text-slate-800 truncate" title="${m.title}">📘 ${m.title}</p>
                                                <span class="text-[10px] text-indigo-600 font-semibold">${m.matchedQuestionCount} soal tercakup (${Math.round((m.matchedQuestionCount / selectedQuestions.length) * 100)}%)</span>
                                            </div>
                                            <button type="button" class="btn-view-covered-mat px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold transition-colors shrink-0" data-mat-id="${m.id}">
                                                Lihat Materi
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div class="p-2.5 bg-white/90 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
                                    <i class="fa-solid fa-triangle-exclamation text-amber-600 shrink-0"></i>
                                    <span>Soal-soal dalam paket ini belum terhubung ke modul Materi. Anda dapat mengelompokkan dan mengaitkannya pada menu <strong>Materi Pembelajaran</strong>.</span>
                                </div>
                            `}
                        </div>
                    `;
                })()}

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
                    questionIds: questionIds
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

            // View Covered Material in Step 3
            document.querySelectorAll('.btn-view-covered-mat').forEach(btn => {
                btn.addEventListener('click', () => {
                    const matId = btn.getAttribute('data-mat-id');
                    const mat = storageService.getMaterialById(matId);
                    if (mat) {
                        const matQuestions = storageService.getMaterialQuestions(matId);
                        renderMaterialPreviewModal(mat, matQuestions);
                    }
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

// =========================================================================
// 7. MATERIAL FORM MODAL (Buat / Edit Materi Pembelajaran Manual)
// =========================================================================
export function renderMaterialModal(materialToEdit = null, availableQuestions = [], onSave) {
    const isEdit = !!materialToEdit;
    let kelasVal = materialToEdit ? materialToEdit.kelas : (CLASSES[1] || 'Kelas 2');
    let subjectVal = materialToEdit ? materialToEdit.subject : 'fiqih';
    let titleVal = materialToEdit ? (materialToEdit.title || '') : '';
    let descVal = materialToEdit ? (materialToEdit.description || '') : '';
    let objVal = materialToEdit ? (materialToEdit.learning_objectives || materialToEdit.learningObjectives || '') : '';
    let contentVal = materialToEdit ? (materialToEdit.content || '') : '';
    let summaryVal = materialToEdit ? (materialToEdit.summary || '') : '';
    let videoUrlVal = materialToEdit ? (materialToEdit.video_url || materialToEdit.videoUrl || '') : '';
    let orderVal = materialToEdit ? (materialToEdit.order_number || materialToEdit.orderNumber || 1) : storageService.getNextMaterialOrderNumber(kelasVal, subjectVal);
    let statusVal = materialToEdit ? (materialToEdit.status || 'draft') : 'draft';

    const initialQIds = materialToEdit && materialToEdit.questionIds ? materialToEdit.questionIds : [];
    let selectedQIds = new Set(initialQIds);

    // Form interaction states
    let activeTab = 'content'; // 'content' | 'questions'
    let qSearch = '';
    let qBabFilter = 'ALL';
    let isObjectivesOpen = !!objVal.trim();
    let isSummaryOpen = !!summaryVal.trim();
    let isLivePreview = false;
    let isVideoTestActive = false;
    let orderManuallyEdited = isEdit; // if editing, keep as manually set
    let cachedVideoMeta = null;

    // Convert markdown content to visual HTML if needed so editor displays real images and formatting
    const initialVisualContent = (contentVal.trim() && !contentVal.includes('<p') && !contentVal.includes('<div') && !contentVal.includes('<img')) 
        ? formatRichText(contentVal) 
        : contentVal;

    // Snapshot for unsaved changes detection
    const initialSnapshot = {
        kelas: kelasVal,
        subject: subjectVal,
        title: titleVal,
        description: descVal,
        objectives: objVal,
        content: initialVisualContent,
        summary: summaryVal,
        videoUrl: videoUrlVal,
        order: orderVal,
        status: statusVal,
        qIdsCount: selectedQIds.size
    };

    function isFormDirty() {
        const curTitle = document.getElementById('matmodal-title')?.value || titleVal;
        const curDesc = document.getElementById('matmodal-desc')?.value || descVal;
        const curObj = document.getElementById('matmodal-objectives')?.value || objVal;
        const elContent = document.getElementById('matmodal-content');
        const curContent = elContent ? (elContent.isContentEditable ? elContent.innerHTML : elContent.value) : contentVal;
        const curSummary = document.getElementById('matmodal-summary')?.value || summaryVal;
        const curVideo = document.getElementById('matmodal-video-url')?.value || videoUrlVal;
        const curKelas = document.getElementById('matmodal-kelas')?.value || kelasVal;
        const curSubj = document.getElementById('matmodal-subject')?.value || subjectVal;
        const curOrder = document.getElementById('matmodal-order')?.value || orderVal;
        const curStatus = document.getElementById('matmodal-status')?.value || statusVal;

        return curTitle.trim() !== initialSnapshot.title.trim() ||
               curDesc.trim() !== initialSnapshot.description.trim() ||
               curObj.trim() !== initialSnapshot.objectives.trim() ||
               curContent.trim() !== initialSnapshot.content.trim() ||
               curSummary.trim() !== initialSnapshot.summary.trim() ||
               curVideo.trim() !== initialSnapshot.videoUrl.trim() ||
               curKelas !== initialSnapshot.kelas ||
               curSubj !== initialSnapshot.subject ||
               String(curOrder) !== String(initialSnapshot.order) ||
               curStatus !== initialSnapshot.status ||
               selectedQIds.size !== initialSnapshot.qIdsCount;
    }

    function handleCloseAttempt() {
        if (isFormDirty()) {
            if (confirm("Ada perubahan data materi yang belum disimpan.\n\nYakin ingin menutup tanpa menyimpan?")) {
                closeModal();
            }
        } else {
            closeModal();
        }
    }

    function syncStateFromInputs() {
        const elTitle = document.getElementById('matmodal-title');
        if (elTitle) titleVal = elTitle.value;
        const elDesc = document.getElementById('matmodal-desc');
        if (elDesc) descVal = elDesc.value;
        const elObj = document.getElementById('matmodal-objectives');
        if (elObj) objVal = elObj.value;
        const elContent = document.getElementById('matmodal-content');
        if (elContent) {
            contentVal = elContent.isContentEditable ? elContent.innerHTML : (elContent.value || '');
        }
        const elSummary = document.getElementById('matmodal-summary');
        if (elSummary) summaryVal = elSummary.value;
        const elVideo = document.getElementById('matmodal-video-url');
        if (elVideo) videoUrlVal = elVideo.value;
        const elKelas = document.getElementById('matmodal-kelas');
        if (elKelas) kelasVal = elKelas.value;
        const elSubj = document.getElementById('matmodal-subject');
        if (elSubj) subjectVal = elSubj.value;
        const elOrder = document.getElementById('matmodal-order');
        if (elOrder) orderVal = parseInt(elOrder.value, 10) || 1;
        const elStatus = document.getElementById('matmodal-status');
        if (elStatus) statusVal = elStatus.value;
    }

    function getEligibleQuestions() {
        return availableQuestions.filter(q => q.kelas === kelasVal && q.subject === subjectVal);
    }

    function renderModalHtml() {
        const eligibleQuestions = getEligibleQuestions();
        const uniqueBabs = [...new Set(eligibleQuestions.map(q => q.bab || 'Materi Umum'))].sort();
        
        let filteredQuestions = eligibleQuestions;
        if (qBabFilter !== 'ALL') {
            filteredQuestions = filteredQuestions.filter(q => (q.bab || 'Materi Umum') === qBabFilter);
        }
        if (qSearch.trim()) {
            const query = qSearch.toLowerCase().trim();
            filteredQuestions = filteredQuestions.filter(q => (q.question || '').toLowerCase().includes(query) || (q.bab || '').toLowerCase().includes(query));
        }

        const currentVideoId = extractYouTubeVideoId(videoUrlVal);
        const hasValidVideo = !!currentVideoId;
        const hasInvalidVideoUrl = videoUrlVal.trim().length > 0 && !hasValidVideo;

        return `
            <div class="bg-white rounded-3xl p-5 sm:p-7 max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 my-4 flex flex-col space-y-4">
                
                <!-- Modal Top Header -->
                <div class="flex justify-between items-start pb-3 border-b border-slate-100">
                    <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center text-lg shadow-md shadow-brand-500/20 shrink-0">
                            <i class="fa-solid ${isEdit ? 'fa-pen-to-square' : 'fa-book-bookmark'}"></i>
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-extrabold uppercase tracking-wider">
                                    Modul Belajar SD
                                </span>
                                ${isEdit ? `<span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono">ID: ${materialToEdit.id}</span>` : ''}
                            </div>
                            <h3 class="font-outfit text-lg sm:text-xl font-bold text-slate-800 leading-tight mt-0.5">
                                ${isEdit ? 'Edit Materi Pembelajaran' : 'Tambah Materi Pembelajaran Baru'}
                            </h3>
                            <p class="text-xs text-slate-500">Susun materi edukatif terstruktur yang terintegrasi dengan latihan soal & video pembelajaran.</p>
                        </div>
                    </div>

                    <button type="button" id="modal-close-x-mat" class="text-slate-400 hover:text-slate-600 w-9 h-9 rounded-2xl hover:bg-slate-100 flex items-center justify-center transition-colors" title="Tutup">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <!-- Form Tabs Navigation -->
                <div class="flex items-center gap-2 border-b border-slate-200 text-xs font-bold">
                    <button type="button" id="tab-btn-content" class="py-2.5 px-4 border-b-2 transition-all flex items-center gap-2 ${activeTab === 'content' ? 'border-brand-600 text-brand-700 bg-brand-50/50 rounded-t-xl font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-700'}">
                        <i class="fa-solid fa-layer-group text-brand-600"></i>
                        <span>Form Materi & Multimedia</span>
                    </button>
                    <button type="button" id="tab-btn-questions" class="py-2.5 px-4 border-b-2 transition-all flex items-center gap-2 ${activeTab === 'questions' ? 'border-brand-600 text-brand-700 bg-brand-50/50 rounded-t-xl font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-700'}">
                        <i class="fa-solid fa-list-check text-indigo-600"></i>
                        <span>Hubungkan Soal Bank Soal</span>
                        <span class="px-1.5 py-0.2 rounded-full ${selectedQIds.size > 0 ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'} text-[10px]">${selectedQIds.size}</span>
                    </button>
                </div>

                <form id="form-material" class="space-y-5 flex-1" novalidate>
                    
                    <!-- TAB 1: KONTEN LENGKAP & MULTIMEDIA (3 BAGIAN) -->
                    <div id="panel-content" class="${activeTab === 'content' ? 'space-y-5' : 'hidden'}">
                        
                        <!-- ============================================================ -->
                        <!-- BAGIAN A: INFORMASI MATERI -->
                        <!-- ============================================================ -->
                        <div class="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs space-y-4">
                            <div class="flex items-center justify-between pb-2.5 border-b border-slate-100">
                                <div class="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
                                    <span class="w-6 h-6 rounded-lg bg-brand-600 text-white flex items-center justify-center text-xs shadow-xs font-outfit">A</span>
                                    <span>Informasi Materi</span>
                                </div>
                                <span class="text-[10px] text-slate-400 font-medium">Kolom bertanda <span class="text-rose-500 font-bold">*</span> wajib diisi</span>
                            </div>

                            <!-- Row 1: Kelas, Subject, Nomor Urut, Status Publikasi -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                <div>
                                    <label class="block text-xs font-bold text-slate-700 mb-1">
                                        Kelas <span class="text-rose-500">*</span>
                                    </label>
                                    <select id="matmodal-kelas" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer shadow-2xs">
                                        ${CLASSES.map(c => `<option value="${c}" ${c === kelasVal ? 'selected' : ''}>${c}</option>`).join('')}
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-700 mb-1">
                                        Mata Pelajaran <span class="text-rose-500">*</span>
                                    </label>
                                    <select id="matmodal-subject" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer shadow-2xs">
                                        ${SUBJECTS.map(s => `<option value="${s.id}" ${s.id === subjectVal ? 'selected' : ''}>${s.name}</option>`).join('')}
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                                        <span>No. Urut Materi</span>
                                        <span class="text-[10px] text-brand-600 font-semibold" title="Urutan otomatis berdasarkan materi sejenis">Otomatis</span>
                                    </label>
                                    <input type="number" id="matmodal-order" min="1" value="${orderVal}" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-brand-500 outline-none shadow-2xs" title="Nomor urutan tampil pada daftar materi siswa">
                                </div>

                                <div>
                                    <label class="block text-xs font-bold text-slate-700 mb-1">
                                        Status Publikasi
                                    </label>
                                    <select id="matmodal-status" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer shadow-2xs">
                                        <option value="draft" ${statusVal === 'draft' ? 'selected' : ''}>📝 Draft (Hanya Admin)</option>
                                        <option value="published" ${statusVal === 'published' ? 'selected' : ''}>🌐 Published (Tampil di Siswa)</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Row 2: Judul Materi -->
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-1">
                                    Judul Materi Pembelajaran <span class="text-rose-500">*</span>
                                </label>
                                <input type="text" id="matmodal-title" value="${titleVal.replace(/"/g, '&quot;')}" placeholder="Contoh: Tata Cara dan Rukun Salat Fardu, Operasi Hitung Perkalian Dasar, dll." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 outline-none shadow-2xs placeholder:text-slate-400 placeholder:font-normal" required>
                            </div>

                            <!-- Row 3: Deskripsi Singkat -->
                            <div>
                                <label class="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                                    <span>Deskripsi Singkat (Ringkasan Pengantar)</span>
                                    <span class="text-[10px] text-slate-400 font-normal">Opsional</span>
                                </label>
                                <input type="text" id="matmodal-desc" value="${descVal.replace(/"/g, '&quot;')}" placeholder="Tuliskan 1-2 kalimat ringkasan tentang apa yang akan dipelajari siswa dalam materi ini..." class="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-700 focus:ring-2 focus:ring-brand-500 outline-none shadow-2xs placeholder:text-slate-400">
                            </div>
                        </div>

                        <!-- ============================================================ -->
                        <!-- BAGIAN B: KONTEN PEMBELAJARAN -->
                        <!-- ============================================================ -->
                        <div class="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs space-y-4">
                            <div class="flex items-center justify-between pb-2.5 border-b border-slate-100">
                                <div class="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
                                    <span class="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs shadow-xs font-outfit">B</span>
                                    <span>Konten Pembelajaran</span>
                                </div>
                                <span class="text-[10px] text-indigo-600 font-semibold">Teks Edukatif & Poin Penting</span>
                            </div>

                            <!-- Toolbar Editor Konten -->
                            <div class="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
                                <button type="button" id="tb-btn-h2" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[11px] transition-colors" title="Sisipkan Subjudul (## Judul)">
                                    <i class="fa-solid fa-heading text-indigo-600"></i> H2
                                </button>
                                <button type="button" id="tb-btn-h3" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[11px] transition-colors" title="Sisipkan Topik (### Topik)">
                                    <i class="fa-solid fa-heading text-indigo-400"></i> H3
                                </button>
                                <button type="button" id="tb-btn-bold" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[11px] transition-colors" title="Tebal (**teks**)">
                                    <i class="fa-solid fa-bold text-slate-800"></i>
                                </button>
                                <button type="button" id="tb-btn-italic" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[11px] transition-colors" title="Miring (*teks*)">
                                    <i class="fa-solid fa-italic text-slate-800"></i>
                                </button>
                                <button type="button" id="tb-btn-list" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[11px] transition-colors" title="Daftar Poin (- Poin)">
                                    <i class="fa-solid fa-list-ul text-slate-800"></i>
                                </button>
                                <button type="button" id="tb-btn-num" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[11px] transition-colors" title="Daftar Nomor (1. Poin)">
                                    <i class="fa-solid fa-list-ol text-slate-800"></i>
                                </button>
                                <button type="button" id="tb-btn-quote" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-amber-800 font-bold text-[11px] transition-colors" title="Sorotan Catatan Penting (> Catatan)">
                                    <i class="fa-solid fa-lightbulb text-amber-500"></i> Poin Kunci
                                </button>
                                <button type="button" id="tb-btn-img" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[11px] transition-colors flex items-center gap-1.5" title="Sisipkan Gambar (Pilih file atau Copy-Paste langsung di editor)">
                                    <i class="fa-solid fa-image text-emerald-600"></i>
                                    <span>Gambar</span>
                                </button>
                                <input type="file" id="matmodal-img-file-input" accept="image/jpeg,image/png,image/webp,image/gif" class="hidden">
                                
                                <div class="ml-auto flex items-center">
                                    <button type="button" id="btn-toggle-live-preview" class="px-3 py-1 rounded-lg font-bold text-[11px] transition-all flex items-center gap-1.5 ${isLivePreview ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}">
                                        <i class="fa-solid ${isLivePreview ? 'fa-pen-to-square' : 'fa-eye'}"></i>
                                        <span>${isLivePreview ? 'Kembali ke Editor' : 'Pratinjau Teks'}</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Petunjuk Sisipkan Gambar Visual (Langsung Tampil Gambar) -->
                            <div class="flex items-center justify-between px-3.5 py-2 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-[11px] text-emerald-950 font-medium">
                                <div class="flex items-center gap-2">
                                    <i class="fa-solid fa-image text-emerald-600 text-xs"></i>
                                    <span><strong>Visual Editor (Gambar Langsung Tampil):</strong> Salin (Copy) gambar lalu tekan <strong>Ctrl + V</strong> di dalam kotak editor di bawah, atau klik tombol <strong>Gambar</strong>. Gambar akan langsung muncul berupa gambar asli, bukan teks kode Base64!</span>
                                </div>
                                <span id="matmodal-img-status" class="hidden shrink-0 text-[10px] font-bold text-emerald-800 bg-white px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-2xs"></span>
                            </div>

                            <!-- Area Editor Konten Teks Visual (WYSIWYG) -->
                            <div class="relative">
                                <div id="matmodal-content-editor-wrap" class="${isLivePreview ? 'hidden' : 'block'}">
                                    <div 
                                        id="matmodal-content" 
                                        contenteditable="true" 
                                        class="w-full min-h-[260px] max-h-[520px] overflow-y-auto p-4 sm:p-5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none leading-relaxed bg-white shadow-2xs transition-all cursor-text space-y-1"
                                        style="outline: none;"
                                    >${contentVal.trim() ? (contentVal.includes('<p') || contentVal.includes('<figure') || contentVal.includes('<div') || contentVal.includes('<h3') || contentVal.includes('<img') ? contentVal : formatRichText(contentVal)) : '<p class="text-slate-400 italic placeholder-text select-none">Tuliskan materi pembelajaran secara visual di sini. Gambar yang di-copy paste atau diunggah akan langsung muncul berupa gambar asli...</p>'}</div>
                                </div>

                                <div id="matmodal-content-preview-wrap" class="${isLivePreview ? 'block' : 'hidden'} rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
                                    <div class="px-4 py-2.5 bg-gradient-to-r from-indigo-50/70 via-slate-50 to-emerald-50/40 border-b border-slate-200/80 flex items-center justify-between text-xs">
                                        <div class="flex items-center gap-2 font-bold text-slate-700">
                                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                            <i class="fa-solid fa-book-open-reader text-indigo-600"></i>
                                            <span>Pratinjau Hasil Tampilan Materi Siswa</span>
                                        </div>
                                        <span class="text-[10px] font-bold text-indigo-700 bg-white px-2.5 py-0.5 rounded-full border border-indigo-200 shadow-2xs">
                                            Format Rapi & Terstruktur
                                        </span>
                                    </div>
                                    <div class="p-5 sm:p-7 min-h-[220px] max-h-[520px] overflow-y-auto text-xs sm:text-sm text-slate-800 bg-white space-y-1">
                                        ${contentVal.trim() ? formatRichText(contentVal) : '<p class="text-slate-400 italic text-center py-8">Belum ada konten materi yang ditulis untuk dipratinjau.</p>'}
                                    </div>
                                </div>
                            </div>

                            <!-- Collapsible 1: Tujuan Pembelajaran (Opsional) -->
                            <div class="rounded-xl border border-indigo-200/80 overflow-hidden bg-indigo-50/40">
                                <button type="button" id="btn-toggle-objectives" class="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-indigo-50 transition-colors">
                                    <div class="flex items-center gap-2">
                                        <i class="fa-solid fa-bullseye text-indigo-600 text-xs"></i>
                                        <span class="text-xs font-bold text-indigo-950">Tujuan Pembelajaran</span>
                                        <span class="px-2 py-0.2 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">Opsional</span>
                                        ${objVal.trim() ? `<span class="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">✓ Terisi</span>` : ''}
                                    </div>
                                    <div class="flex items-center gap-1.5 text-indigo-600 text-xs font-semibold">
                                        <span class="text-[11px]">${isObjectivesOpen ? 'Tutup Panel' : 'Buka Panel'}</span>
                                        <i class="fa-solid ${isObjectivesOpen ? 'fa-chevron-up' : 'fa-chevron-down'} text-[10px]"></i>
                                    </div>
                                </button>

                                <div id="panel-objectives-body" class="${isObjectivesOpen ? 'p-3.5 border-t border-indigo-200/60 bg-white' : 'hidden'}">
                                    <textarea id="matmodal-objectives" rows="3" placeholder="- Siswa memahami urutan dan tata cara salat&#10;- Siswa mampu menyebutkan rukun-rukun salat&#10;- Siswa dapat membedakan salat fardu dan salat sunah" class="w-full p-2.5 rounded-xl border border-indigo-200 text-xs font-medium text-slate-800 bg-indigo-50/20 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed">${objVal}</textarea>
                                    <p class="text-[11px] text-slate-500 mt-1">Gunakan tanda hubung (-) atau baris baru per butir tujuan.</p>
                                </div>
                            </div>

                            <!-- Collapsible 2: Ringkasan & Poin Penting Siswa (Opsional) -->
                            <div class="rounded-xl border border-amber-200/80 overflow-hidden bg-amber-50/40">
                                <button type="button" id="btn-toggle-summary" class="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-amber-50 transition-colors">
                                    <div class="flex items-center gap-2">
                                        <i class="fa-solid fa-lightbulb text-amber-600 text-xs"></i>
                                        <span class="text-xs font-bold text-amber-950">Ringkasan & Poin Penting Siswa</span>
                                        <span class="px-2 py-0.2 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">Opsional</span>
                                        ${summaryVal.trim() ? `<span class="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">✓ Terisi</span>` : ''}
                                    </div>
                                    <div class="flex items-center gap-1.5 text-amber-700 text-xs font-semibold">
                                        <span class="text-[11px]">${isSummaryOpen ? 'Tutup Panel' : 'Buka Panel'}</span>
                                        <i class="fa-solid ${isSummaryOpen ? 'fa-chevron-up' : 'fa-chevron-down'} text-[10px]"></i>
                                    </div>
                                </button>

                                <div id="panel-summary-body" class="${isSummaryOpen ? 'p-3.5 border-t border-amber-200/60 bg-white' : 'hidden'}">
                                    <textarea id="matmodal-summary" rows="3" placeholder="Poin-poin kesimpulan penting yang wajib diingat siswa sebelum menghadapi ujian atau latihan..." class="w-full p-2.5 rounded-xl border border-amber-200 text-xs font-medium text-slate-800 bg-amber-50/20 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed">${summaryVal}</textarea>
                                    <p class="text-[11px] text-slate-500 mt-1">Ringkasan ini akan disajikan sebagai kartu sorotan khusus di halaman belajar siswa.</p>
                                </div>
                            </div>

                        </div>

                        <!-- ============================================================ -->
                        <!-- BAGIAN C: VIDEO PEMBELAJARAN (YOUTUBE MULTIMEDIA) -->
                        <!-- ============================================================ -->
                        <div class="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs space-y-4">
                            <div class="flex items-center justify-between pb-2.5 border-b border-slate-100">
                                <div class="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
                                    <span class="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs shadow-xs font-outfit">
                                        <i class="fa-brands fa-youtube"></i>
                                    </span>
                                    <span>Video Pembelajaran YouTube</span>
                                </div>
                                <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">Opsional</span>
                            </div>

                            <p class="text-xs text-slate-500 leading-relaxed">
                                Sisipkan video pembelajaran interaktif agar siswa SD dapat menyimak video animasi, rekaman materi, atau visualisasi konsep secara langsung.
                            </p>

                            <!-- Input URL Video YouTube -->
                            <div class="space-y-1.5">
                                <label class="block text-xs font-bold text-slate-700">
                                    URL Video YouTube
                                </label>
                                <div class="flex items-center gap-2">
                                    <div class="relative flex-1">
                                        <i class="fa-brands fa-youtube absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-600 text-sm"></i>
                                        <input 
                                            type="text" 
                                            id="matmodal-video-url" 
                                            value="${videoUrlVal}" 
                                            placeholder="https://www.youtube.com/watch?v=... atau https://youtu.be/..." 
                                            class="w-full pl-10 pr-10 py-2.5 rounded-xl border ${hasInvalidVideoUrl ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 bg-white'} text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-rose-500 outline-none shadow-2xs"
                                        >
                                        ${videoUrlVal ? `
                                            <button type="button" id="btn-clear-video-url" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600 transition-colors p-1" title="Hapus URL Video">
                                                <i class="fa-solid fa-xmark text-xs"></i>
                                            </button>
                                        ` : ''}
                                    </div>

                                    <button type="button" id="btn-verify-video" class="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors shrink-0 flex items-center gap-1.5 shadow-2xs">
                                        <i class="fa-solid fa-magnifying-glass text-slate-500"></i>
                                        <span>Periksa</span>
                                    </button>
                                </div>

                                ${hasInvalidVideoUrl ? `
                                    <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                                        <i class="fa-solid fa-triangle-exclamation text-rose-600"></i>
                                        <span>Format tautan belum dikenali. Gunakan URL YouTube standar (misal: <code>https://www.youtube.com/watch?v=...</code> atau <code>https://youtu.be/...</code>).</span>
                                    </div>
                                ` : ''}
                            </div>

                            <!-- Preview Kartu Video Interaktif jika URL Valid -->
                            ${hasValidVideo ? `
                                <div class="p-4 rounded-2xl bg-gradient-to-br from-rose-50/50 to-slate-50 border border-rose-200/80 space-y-3">
                                    <div class="flex items-center justify-between">
                                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                                            <i class="fa-solid fa-circle-check text-emerald-600"></i>
                                            Video Teridentifikasi (ID: ${currentVideoId})
                                        </span>

                                        <div class="flex items-center gap-1.5">
                                            <button type="button" id="btn-toggle-video-player" class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors shadow-2xs flex items-center gap-1">
                                                <i class="fa-solid ${isVideoTestActive ? 'fa-stop text-rose-600' : 'fa-play text-brand-600'}"></i>
                                                <span>${isVideoTestActive ? 'Tutup Pemutar' : 'Uji Putar Video'}</span>
                                            </button>
                                            <button type="button" id="btn-delete-video" class="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors shadow-2xs flex items-center gap-1">
                                                <i class="fa-solid fa-trash-can"></i>
                                                <span>Hapus Video</span>
                                            </button>
                                        </div>
                                    </div>

                                    ${isVideoTestActive ? `
                                        <div class="w-full">
                                            ${renderSafeYouTubePlayer(currentVideoId, titleVal || 'Video Pembelajaran')}
                                        </div>
                                    ` : `
                                        <div class="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
                                            <div class="relative w-full sm:w-44 aspect-video rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-200 group">
                                                <img src="${getYouTubeThumbnailUrl(currentVideoId)}" alt="Thumbnail Video" class="w-full h-full object-cover">
                                                <div class="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                                                    <div class="w-9 h-9 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs shadow-md">
                                                        <i class="fa-solid fa-play ml-0.5"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex-1 min-w-0 space-y-1">
                                                <h5 id="video-oembed-title" class="font-outfit font-bold text-xs sm:text-sm text-slate-800 line-clamp-2">
                                                    ${cachedVideoMeta?.title || 'Video Pembelajaran YouTube'}
                                                </h5>
                                                <p class="text-[11px] text-slate-500">
                                                    Video siap diputar oleh siswa pada halaman detail materi modul.
                                                </p>
                                                <div class="pt-1">
                                                    <a href="${getYouTubeWatchUrl(currentVideoId)}" target="_blank" rel="noopener noreferrer" class="text-[11px] font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1">
                                                        <span>Buka di YouTube</span>
                                                        <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    `}

                                    <div class="flex items-start gap-2 text-[11px] text-slate-500 pt-1">
                                        <i class="fa-solid fa-circle-info text-amber-500 mt-0.5 shrink-0"></i>
                                        <span>Pastikan video YouTube tidak di-set sebagai 'Private' atau dibatasi umur agar siswa dapat memutarnya di dalam aplikasi.</span>
                                    </div>
                                </div>
                            ` : !hasInvalidVideoUrl ? `
                                <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                                    <i class="fa-solid fa-film text-slate-400 mr-1.5"></i>
                                    <span>Belum ada video terpasang. Tautan video YouTube bersifat opsional.</span>
                                </div>
                            ` : ''}

                        </div>

                    </div>

                    <!-- TAB 2: HUBUNGKAN SOAL BANK SOAL -->
                    <div id="panel-questions" class="${activeTab === 'questions' ? 'space-y-4' : 'hidden'}">
                        <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
                            <div class="flex-1 w-full relative">
                                <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                <input type="text" id="mat-q-search" value="${qSearch}" placeholder="Cari pertanyaan soal atau bab..." class="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 shadow-2xs">
                            </div>
                            <div class="flex items-center gap-2 w-full sm:w-auto">
                                <select id="mat-q-bab-filter" class="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer shadow-2xs">
                                    <option value="ALL">Semua Topik/Bab (${eligibleQuestions.length})</option>
                                    ${uniqueBabs.map(b => `<option value="${b}" ${b === qBabFilter ? 'selected' : ''}>${b} (${eligibleQuestions.filter(q => (q.bab || 'Materi Umum') === b).length})</option>`).join('')}
                                </select>
                                <button type="button" id="btn-mat-select-all-q" class="px-3 py-2 rounded-xl bg-brand-50 text-brand-700 font-bold text-xs hover:bg-brand-100 transition-colors whitespace-nowrap shadow-2xs">
                                    Pilih Semua
                                </button>
                                <button type="button" id="btn-mat-clear-all-q" class="px-3 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300 transition-colors whitespace-nowrap shadow-2xs">
                                    Reset
                                </button>
                            </div>
                        </div>

                        <!-- Question List -->
                        <div class="max-h-80 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white">
                            ${filteredQuestions.length === 0 ? `
                                <div class="p-8 text-center text-slate-400 text-xs space-y-2">
                                    <i class="fa-solid fa-box-open text-2xl text-slate-300"></i>
                                    <p>Tidak ada soal pada Bank Soal yang sesuai dengan <strong>${kelasVal} - ${SUBJECTS.find(s=>s.id===subjectVal)?.name || subjectVal}</strong>.</p>
                                </div>
                            ` : filteredQuestions.map(q => {
                                const isChecked = selectedQIds.has(q.id);
                                return `
                                    <label class="p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer block ${isChecked ? 'bg-brand-50/40' : ''}">
                                        <input type="checkbox" class="mat-q-checkbox mt-1 w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500 cursor-pointer" data-qid="${q.id}" ${isChecked ? 'checked' : ''}>
                                        <div class="flex-1 min-w-0">
                                            <div class="flex items-center gap-1.5 mb-1">
                                                <span class="px-2 py-0.5 rounded bg-brand-100 text-brand-800 text-[10px] font-bold">${q.bab || 'Umum'}</span>
                                                <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${q.difficulty === 'Mudah' ? 'bg-emerald-50 text-emerald-700' : q.difficulty === 'Sulit' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}">${q.difficulty || 'Sedang'}</span>
                                                <span class="text-[10px] font-mono text-slate-400">#${q.id}</span>
                                            </div>
                                            <p class="text-xs text-slate-800 font-medium line-clamp-2">${formatRichText(q.question)}</p>
                                        </div>
                                    </label>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Error Alert -->
                    <div id="matmodal-error" class="hidden p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                        <i class="fa-solid fa-circle-exclamation text-rose-600"></i>
                        <span id="matmodal-error-text"></span>
                    </div>

                    <!-- Footer Action Buttons -->
                    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
                        <button type="button" id="btn-cancel-mat" class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors">
                            Batal
                        </button>

                        <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                            ${!isEdit ? `
                                <button type="button" id="btn-save-as-draft" class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs transition-colors flex items-center justify-center gap-1.5">
                                    <i class="fa-solid fa-pen-ruler text-amber-700"></i>
                                    <span>Simpan sebagai Draft</span>
                                </button>
                                <button type="button" id="btn-save-and-publish" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center justify-center gap-1.5">
                                    <i class="fa-solid fa-rocket"></i>
                                    <span>Publikasikan Materi</span>
                                </button>
                            ` : `
                                <button type="submit" id="btn-save-mat" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30 transition-all flex items-center justify-center gap-1.5">
                                    <i class="fa-solid fa-check"></i>
                                    <span>Simpan Perubahan Materi</span>
                                </button>
                            `}
                        </div>
                    </div>

                </form>
            </div>
        `;
    }

    function renderShell() {
        showModal(renderModalHtml());
        bindEvents();

        // Asynchronously fetch video title if not already loaded
        const curVidId = extractYouTubeVideoId(videoUrlVal);
        if (curVidId && !cachedVideoMeta) {
            fetchYouTubeVideoMeta(curVidId).then(meta => {
                if (meta) {
                    cachedVideoMeta = meta;
                    const titleEl = document.getElementById('video-oembed-title');
                    if (titleEl && meta.title) titleEl.innerText = meta.title;
                }
            });
        }
    }

    // Helper to insert HTML in visual editor at cursor
    function insertHtmlAtCursor(html) {
        const editor = document.getElementById('matmodal-content');
        if (!editor) return;
        editor.focus();

        // Clear placeholder text if present
        if (editor.querySelector('.placeholder-text') || editor.innerHTML.includes('placeholder-text')) {
            editor.innerHTML = '';
        }

        if (editor.isContentEditable) {
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0) {
                const range = sel.getRangeAt(0);
                if (editor.contains(range.commonAncestorContainer)) {
                    range.deleteContents();
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;
                    const frag = document.createDocumentFragment();
                    let node, lastNode;
                    while ((node = tempDiv.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);
                    if (lastNode) {
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                    contentVal = editor.innerHTML;
                    return;
                }
            }
            editor.insertAdjacentHTML('beforeend', html);
            contentVal = editor.innerHTML;
            return;
        }

        const start = editor.selectionStart || 0;
        const end = editor.selectionEnd || 0;
        const text = editor.value || '';
        editor.value = text.substring(0, start) + html + text.substring(end);
        editor.selectionStart = start + html.length;
        editor.selectionEnd = start + html.length;
        contentVal = editor.value;
    }

    function bindEvents() {
        // Modal close events with dirty checking
        document.getElementById('modal-close-x-mat')?.addEventListener('click', handleCloseAttempt);
        document.getElementById('btn-cancel-mat')?.addEventListener('click', handleCloseAttempt);

        // Tab Switching
        document.getElementById('tab-btn-content')?.addEventListener('click', () => {
            syncStateFromInputs();
            activeTab = 'content';
            renderShell();
        });
        document.getElementById('tab-btn-questions')?.addEventListener('click', () => {
            syncStateFromInputs();
            activeTab = 'questions';
            renderShell();
        });

        // Class & Subject Change: Auto-update eligible questions and order number (for new materials)
        document.getElementById('matmodal-kelas')?.addEventListener('change', (e) => {
            kelasVal = e.target.value;
            if (!isEdit && !orderManuallyEdited) {
                orderVal = storageService.getNextMaterialOrderNumber(kelasVal, subjectVal);
                const orderEl = document.getElementById('matmodal-order');
                if (orderEl) orderEl.value = orderVal;
            }
        });
        document.getElementById('matmodal-subject')?.addEventListener('change', (e) => {
            subjectVal = e.target.value;
            if (!isEdit && !orderManuallyEdited) {
                orderVal = storageService.getNextMaterialOrderNumber(kelasVal, subjectVal);
                const orderEl = document.getElementById('matmodal-order');
                if (orderEl) orderEl.value = orderVal;
            }
        });

        document.getElementById('matmodal-order')?.addEventListener('input', () => {
            orderManuallyEdited = true;
        });

        // Toolbar formatting buttons (Visual WYSIWYG Editor)
        document.getElementById('tb-btn-h2')?.addEventListener('click', () => {
            insertHtmlAtCursor('<h3 class="font-outfit font-bold text-base sm:text-lg text-slate-900 mt-5 mb-2.5 flex items-center gap-2 pb-1 border-b border-slate-100"><span class="w-2 h-4 bg-brand-600 rounded-full inline-block"></span>Subjudul Materi</h3><p><br></p>');
        });
        document.getElementById('tb-btn-h3')?.addEventListener('click', () => {
            insertHtmlAtCursor('<h4 class="font-outfit font-bold text-sm sm:text-base text-slate-800 mt-4 mb-2 flex items-center gap-2"><span class="w-1.5 h-3.5 bg-indigo-500 rounded-full inline-block"></span>Topik Bahasan</h4><p><br></p>');
        });
        document.getElementById('tb-btn-bold')?.addEventListener('click', () => {
            document.execCommand('bold', false, null);
            syncStateFromInputs();
        });
        document.getElementById('tb-btn-italic')?.addEventListener('click', () => {
            document.execCommand('italic', false, null);
            syncStateFromInputs();
        });
        document.getElementById('tb-btn-list')?.addEventListener('click', () => {
            document.execCommand('insertUnorderedList', false, null);
            syncStateFromInputs();
        });
        document.getElementById('tb-btn-num')?.addEventListener('click', () => {
            document.execCommand('insertOrderedList', false, null);
            syncStateFromInputs();
        });
        document.getElementById('tb-btn-quote')?.addEventListener('click', () => {
            insertHtmlAtCursor('<div class="p-3.5 my-3 bg-gradient-to-r from-amber-50 to-orange-50/40 border-l-4 border-amber-500 rounded-r-2xl text-amber-950 text-xs sm:text-sm font-medium leading-relaxed shadow-2xs flex items-start gap-2.5"><i class="fa-solid fa-lightbulb text-amber-600 mt-0.5 shrink-0 text-sm"></i><div class="flex-1">Poin kunci yang wajib dipahami siswa...</div></div><p><br></p>');
        });

        // Helper to insert image file directly as visual compressed image (BUKAN kode teks)
        const showImageStatus = (msg) => {
            const statusEl = document.getElementById('matmodal-img-status');
            if (statusEl) {
                statusEl.innerText = msg;
                statusEl.classList.remove('hidden');
                setTimeout(() => {
                    statusEl.classList.add('hidden');
                }, 4000);
            }
        };

        const handleInsertImageFile = async (file) => {
            if (!file || !file.type || !file.type.startsWith('image/')) return;
            showImageStatus('⏳ Memproses gambar...');
            try {
                const compressedDataUrl = await compressImageFile(file);
                const altText = file.name ? file.name.replace(/\.[^/.]+$/, '').trim() : 'Gambar Materi';
                // Sisipkan elemen gambar asli (HTML visual), bukan kode teks base64 panjang
                const imgHtml = `
                    <figure class="my-4 text-center select-none" contenteditable="false">
                        <img src="${compressedDataUrl}" alt="${altText || 'Gambar Materi'}" class="rounded-2xl max-h-80 max-w-full mx-auto border border-slate-200/90 shadow-sm block object-contain" />
                        ${altText && altText !== 'Gambar Materi' ? `<figcaption class="text-[11px] text-slate-500 mt-1.5 font-medium italic">${altText}</figcaption>` : ''}
                    </figure>
                    <p><br></p>
                `;
                insertHtmlAtCursor(imgHtml);
                showImageStatus('✅ Gambar visual berhasil disisipkan!');
            } catch (err) {
                console.error('Gagal memproses gambar:', err);
                showImageStatus('❌ Gagal memproses gambar');
            }
        };

        // File picker trigger for tb-btn-img (Pilih file langsung)
        const imgFileInput = document.getElementById('matmodal-img-file-input');
        document.getElementById('tb-btn-img')?.addEventListener('click', () => {
            if (imgFileInput) {
                imgFileInput.value = '';
                imgFileInput.click();
            }
        });

        imgFileInput?.addEventListener('change', async (e) => {
            const file = e.target.files?.[0];
            if (file) {
                await handleInsertImageFile(file);
            }
        });

        // Direct Paste (Ctrl+V) and Drag & Drop onto visual editor
        const contentEditor = document.getElementById('matmodal-content');
        if (contentEditor) {
            contentEditor.addEventListener('input', () => {
                contentVal = contentEditor.innerHTML;
            });

            // Focus event: clear initial placeholder if user focuses empty editor
            contentEditor.addEventListener('focus', () => {
                if (contentEditor.querySelector('.placeholder-text') || contentEditor.innerHTML.includes('placeholder-text')) {
                    contentEditor.innerHTML = '<p><br></p>';
                }
            });

            // Paste event handler (Gambar langsung masuk sebagai gambar visual!)
            contentEditor.addEventListener('paste', async (e) => {
                const clipboardData = e.clipboardData || window.clipboardData;
                if (!clipboardData) return;

                // 1. Check for image files in clipboardData.items
                let imgFile = null;
                const items = clipboardData.items;
                if (items) {
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].type && items[i].type.startsWith('image/')) {
                            imgFile = items[i].getAsFile();
                            break;
                        }
                    }
                }

                // Fallback check in clipboardData.files
                if (!imgFile && clipboardData.files && clipboardData.files.length > 0) {
                    for (let i = 0; i < clipboardData.files.length; i++) {
                        if (clipboardData.files[i].type && clipboardData.files[i].type.startsWith('image/')) {
                            imgFile = clipboardData.files[i];
                            break;
                        }
                    }
                }

                if (imgFile) {
                    e.preventDefault();
                    await handleInsertImageFile(imgFile);
                    return;
                }

                // 2. Check for copied HTML with <img src="...">
                const html = clipboardData.getData('text/html');
                if (html && html.includes('<img')) {
                    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
                    if (match && match[1]) {
                        e.preventDefault();
                        const src = match[1];
                        insertHtmlAtCursor(`
                            <figure class="my-4 text-center select-none" contenteditable="false">
                                <img src="${src}" alt="Gambar Web" class="rounded-2xl max-h-80 max-w-full mx-auto border border-slate-200/90 shadow-sm block object-contain" />
                            </figure>
                            <p><br></p>
                        `);
                        showImageStatus('✅ Gambar visual disisipkan!');
                        return;
                    }
                }
            });

            // Drag and Drop handlers
            contentEditor.addEventListener('dragover', (e) => {
                e.preventDefault();
                contentEditor.classList.add('border-emerald-500', 'bg-emerald-50/10');
            });
            ['dragleave', 'dragend'].forEach(evt => {
                contentEditor.addEventListener(evt, () => {
                    contentEditor.classList.remove('border-emerald-500', 'bg-emerald-50/10');
                });
            });
            contentEditor.addEventListener('drop', async (e) => {
                e.preventDefault();
                contentEditor.classList.remove('border-emerald-500', 'bg-emerald-50/10');
                if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    const file = Array.from(e.dataTransfer.files).find(f => f.type && f.type.startsWith('image/'));
                    if (file) {
                        await handleInsertImageFile(file);
                    }
                }
            });
        }

        // Live text preview toggle
        document.getElementById('btn-toggle-live-preview')?.addEventListener('click', () => {
            syncStateFromInputs();
            isLivePreview = !isLivePreview;
            renderShell();
        });

        // Collapsible Objectives
        document.getElementById('btn-toggle-objectives')?.addEventListener('click', () => {
            syncStateFromInputs();
            isObjectivesOpen = !isObjectivesOpen;
            renderShell();
        });

        // Collapsible Summary
        document.getElementById('btn-toggle-summary')?.addEventListener('click', () => {
            syncStateFromInputs();
            isSummaryOpen = !isSummaryOpen;
            renderShell();
        });

        // YouTube URL input & validation
        const videoInput = document.getElementById('matmodal-video-url');
        const handleVideoChange = () => {
            const rawVal = videoInput ? videoInput.value.trim() : '';
            if (rawVal !== videoUrlVal) {
                videoUrlVal = rawVal;
                cachedVideoMeta = null;
                isVideoTestActive = false;
                syncStateFromInputs();
                renderShell();
            }
        };

        videoInput?.addEventListener('blur', handleVideoChange);
        document.getElementById('btn-verify-video')?.addEventListener('click', handleVideoChange);

        document.getElementById('btn-clear-video-url')?.addEventListener('click', () => {
            videoUrlVal = '';
            cachedVideoMeta = null;
            isVideoTestActive = false;
            syncStateFromInputs();
            renderShell();
        });

        document.getElementById('btn-delete-video')?.addEventListener('click', () => {
            videoUrlVal = '';
            cachedVideoMeta = null;
            isVideoTestActive = false;
            syncStateFromInputs();
            renderShell();
        });

        document.getElementById('btn-toggle-video-player')?.addEventListener('click', () => {
            isVideoTestActive = !isVideoTestActive;
            syncStateFromInputs();
            renderShell();
        });

        // Question Filtering in Tab 2
        document.getElementById('mat-q-search')?.addEventListener('input', (e) => {
            qSearch = e.target.value;
            syncStateFromInputs();
            renderShell();
        });
        document.getElementById('mat-q-bab-filter')?.addEventListener('change', (e) => {
            qBabFilter = e.target.value;
            syncStateFromInputs();
            renderShell();
        });

        // Checkbox Handlers
        document.querySelectorAll('.mat-q-checkbox').forEach(cb => {
            cb.addEventListener('change', () => {
                const qid = cb.getAttribute('data-qid');
                if (cb.checked) selectedQIds.add(qid);
                else selectedQIds.delete(qid);
            });
        });

        // Select All / Reset
        document.getElementById('btn-mat-select-all-q')?.addEventListener('click', () => {
            getEligibleQuestions().forEach(q => selectedQIds.add(q.id));
            syncStateFromInputs();
            renderShell();
        });
        document.getElementById('btn-mat-clear-all-q')?.addEventListener('click', () => {
            selectedQIds.clear();
            syncStateFromInputs();
            renderShell();
        });

        // Submission logic helper
        const submitFormWithStatus = (targetStatus = null) => {
            syncStateFromInputs();

            const title = (document.getElementById('matmodal-title')?.value || titleVal).trim();
            const kelas = document.getElementById('matmodal-kelas')?.value || kelasVal;
            const subject = document.getElementById('matmodal-subject')?.value || subjectVal;
            const description = (document.getElementById('matmodal-desc')?.value || descVal).trim();
            const learning_objectives = (document.getElementById('matmodal-objectives')?.value || objVal).trim();
            const elContent = document.getElementById('matmodal-content');
            let content = (elContent ? (elContent.isContentEditable ? elContent.innerHTML : (elContent.value || '')) : contentVal).trim();
            if (content.includes('placeholder-text') || content === '<p><br></p>') {
                content = '';
            }
            const summary = (document.getElementById('matmodal-summary')?.value || summaryVal).trim();
            const video_url = (document.getElementById('matmodal-video-url')?.value || videoUrlVal).trim();
            const order_number = parseInt(document.getElementById('matmodal-order')?.value || orderVal, 10) || 1;
            const status = targetStatus || (document.getElementById('matmodal-status')?.value || statusVal);

            const errEl = document.getElementById('matmodal-error');
            const errText = document.getElementById('matmodal-error-text');

            if (!title) {
                if (errEl && errText) {
                    errText.innerText = "Harap isikan Judul Materi Pembelajaran.";
                    errEl.classList.remove('hidden');
                }
                document.getElementById('matmodal-title')?.focus();
                return;
            }

            // Validate video URL if entered
            let video_id = '';
            if (video_url) {
                video_id = extractYouTubeVideoId(video_url);
                if (!video_id) {
                    if (errEl && errText) {
                        errText.innerText = "Format URL Video YouTube belum valid. Harap masukkan URL YouTube yang benar atau kosongkan kolom video.";
                        errEl.classList.remove('hidden');
                    }
                    document.getElementById('matmodal-video-url')?.focus();
                    return;
                }
            }

            const materialData = {
                ...(materialToEdit ? { id: materialToEdit.id } : {}),
                kelas,
                subject,
                title,
                description,
                learning_objectives,
                content,
                summary,
                video_url,
                videoUrl: video_url,
                video_id,
                videoId: video_id,
                order_number,
                orderNumber: order_number,
                status,
                questionIds: Array.from(selectedQIds)
            };

            if (onSave) onSave(materialData);
            closeModal();
        };

        // Form Submit listener
        document.getElementById('form-material')?.addEventListener('submit', (e) => {
            e.preventDefault();
            submitFormWithStatus();
        });

        // Direct Draft & Publish buttons for new material
        document.getElementById('btn-save-as-draft')?.addEventListener('click', () => {
            submitFormWithStatus('draft');
        });
        document.getElementById('btn-save-and-publish')?.addEventListener('click', () => {
            submitFormWithStatus('published');
        });
    }

    renderShell();
}

// =========================================================================
// 8. 🤖 GENERATE MATERI DARI BANK SOAL WIZARD MODAL
// =========================================================================
export function renderGenerateMaterialWizardModal(onGenerated) {
    let currentStep = 1;
    let selectedKelas = 'Kelas 2';
    let selectedSubject = 'fiqih';
    let groupedResults = [];
    let selectedGroupIndices = new Set();
    let isProcessing = false;

    function renderStep1() {
        return `
            <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-100 flex flex-col">
                <div class="flex justify-between items-start mb-4 pb-3 border-b border-slate-100">
                    <div class="flex items-center gap-2.5">
                        <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center text-lg shadow-md shadow-brand-500/20">
                            <i class="fa-solid fa-wand-magic-sparkles"></i>
                        </div>
                        <div>
                            <h3 class="font-outfit text-lg font-bold text-slate-800">Generate Materi dari Bank Soal</h3>
                            <p class="text-xs text-slate-500">Langkah 1: Tentukan Kelas & Mata Pelajaran</p>
                        </div>
                    </div>
                    <button id="modal-close-gen-x" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div class="space-y-4 my-2">
                    <div class="bg-brand-50/70 p-3.5 rounded-2xl border border-brand-200 text-xs text-brand-900 leading-relaxed">
                        <i class="fa-solid fa-circle-info text-brand-600 mr-1"></i>
                        Sistem AI & Analitik SmartTKA akan membaca pertanyaan, bab/topik, dan pembahasan soal untuk mengelompokkannya ke dalam tema-tema materi pembelajaran yang komprehensif.
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Target Kelas <span class="text-rose-500">*</span></label>
                        <select id="gen-kelas-select" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer">
                            ${CLASSES.map(c => `<option value="${c}" ${c === selectedKelas ? 'selected' : ''}>${c}</option>`).join('')}
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Mata Pelajaran <span class="text-rose-500">*</span></label>
                        <select id="gen-subject-select" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-slate-50 focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer">
                            ${SUBJECTS.map(s => `<option value="${s.id}" ${s.id === selectedSubject ? 'selected' : ''}>${s.name}</option>`).join('')}
                        </select>
                    </div>
                </div>

                <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
                    <button type="button" id="btn-cancel-gen" class="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50">
                        Batal
                    </button>
                    <button type="button" id="btn-next-step2" class="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30 flex items-center gap-2">
                        <span>Analisis & Kelompokkan</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    function renderStep2() {
        const totalSoal = groupedResults.reduce((acc, g) => acc + (g.questions?.length || 0), 0);
        const uniqueBabs = new Set();
        groupedResults.forEach(g => (g.subtopics || []).forEach(st => uniqueBabs.add(st)));

        return `
            <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
                <div class="flex justify-between items-start mb-4 pb-3 border-b border-slate-100">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 text-[10px] font-extrabold uppercase">${selectedKelas} • ${selectedSubject}</span>
                            <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">Status Draft</span>
                        </div>
                        <h3 class="font-outfit text-lg font-bold text-slate-800 mt-1">Review Hasil Pengelompokan Materi</h3>
                    </div>
                    <button id="modal-close-gen-x2" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <!-- Summary Info Banner -->
                <div class="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div class="bg-brand-50 p-3 rounded-2xl border border-brand-100">
                        <span class="text-[10px] font-bold text-brand-600 uppercase">Soal Teranalisis</span>
                        <p class="text-lg font-extrabold text-brand-900">${totalSoal} Soal</p>
                    </div>
                    <div class="bg-indigo-50 p-3 rounded-2xl border border-indigo-100">
                        <span class="text-[10px] font-bold text-indigo-600 uppercase">Topik / Subtopik</span>
                        <p class="text-lg font-extrabold text-indigo-900">${uniqueBabs.size} Subtopik</p>
                    </div>
                    <div class="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                        <span class="text-[10px] font-bold text-emerald-600 uppercase">Grup Materi Dihasilkan</span>
                        <p class="text-lg font-extrabold text-emerald-900">${groupedResults.length} Materi</p>
                    </div>
                </div>

                <p class="text-xs text-slate-600 mb-3 font-medium">
                    Pilih materi yang ingin dibuat sebagai <strong>Draft</strong>. Anda dapat mengedit judul materi sebelum men-generate:
                </p>

                <!-- Group Cards List -->
                <div class="space-y-3 flex-1 overflow-y-auto pr-1">
                    ${groupedResults.length === 0 ? `
                        <div class="p-8 text-center bg-slate-50 rounded-2xl text-slate-500 text-xs">
                            Tidak ditemukan soal pada ${selectedKelas} mata pelajaran ${selectedSubject}.
                        </div>
                    ` : groupedResults.map((group, idx) => {
                        const isSelected = selectedGroupIndices.has(idx);
                        return `
                            <div class="p-4 rounded-2xl border transition-all ${isSelected ? 'bg-white border-brand-400 ring-1 ring-brand-300 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'}">
                                <div class="flex items-start gap-3">
                                    <input type="checkbox" class="gen-group-cb mt-1.5 w-4 h-4 text-brand-600 rounded cursor-pointer" data-idx="${idx}" ${isSelected ? 'checked' : ''}>
                                    
                                    <div class="flex-1 min-w-0">
                                        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                            <div class="flex items-center gap-2 flex-1">
                                                <span class="w-6 h-6 rounded-lg bg-brand-100 text-brand-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                                                    ${idx + 1}
                                                </span>
                                                <input type="text" class="gen-group-title w-full font-bold text-slate-800 text-xs sm:text-sm px-2.5 py-1 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none" value="${group.title.replace(/"/g, '&quot;')}" data-idx="${idx}">
                                            </div>
                                            <span class="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200 shrink-0 self-start sm:self-auto">
                                                📝 ${group.questions?.length || 0} Soal Terkait
                                            </span>
                                        </div>

                                        <p class="text-xs text-slate-600 mb-2 leading-relaxed">${group.description}</p>

                                        <!-- Subtopics tags -->
                                        <div class="flex flex-wrap gap-1 mb-2">
                                            ${(group.subtopics || []).map(st => `
                                                <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200">
                                                    📌 ${st}
                                                </span>
                                            `).join('')}
                                        </div>

                                        <!-- Question preview accordion -->
                                        <details class="text-xs text-slate-500 group/det">
                                            <summary class="cursor-pointer text-[11px] font-bold text-brand-600 hover:text-brand-800 inline-flex items-center gap-1">
                                                <span>Lihat ${group.questions?.length || 0} Soal Terkait</span>
                                                <i class="fa-solid fa-chevron-down text-[9px] group-open/det:rotate-180 transition-transform"></i>
                                            </summary>
                                            <div class="mt-2 pl-3 border-l-2 border-brand-200 space-y-1.5 max-h-36 overflow-y-auto">
                                                ${(group.questions || []).map((q, qidx) => `
                                                    <div class="text-[11px] text-slate-700 flex items-start gap-1.5">
                                                        <span class="font-bold text-slate-400 shrink-0">${qidx + 1}.</span>
                                                        <span class="line-clamp-1">${formatRichText(q.question)}</span>
                                                        <span class="text-[9px] font-mono text-slate-400 shrink-0">(${q.bab || 'Umum'})</span>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </details>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Step 2 Actions -->
                <div class="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 mt-4">
                    <button type="button" id="btn-back-step1" class="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50">
                        <i class="fa-solid fa-arrow-left mr-1"></i> Kembali
                    </button>
                    <button type="button" id="btn-finalize-generate" class="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30 flex items-center gap-2 ${selectedGroupIndices.size === 0 ? 'opacity-50 pointer-events-none' : ''}">
                        <i class="fa-solid fa-bolt"></i>
                        <span>Generate ${selectedGroupIndices.size} Draft Materi</span>
                    </button>
                </div>
            </div>
        `;
    }

    function renderStep3(createdCount) {
        return `
            <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center flex flex-col items-center animate-in zoom-in-95">
                <div class="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4 shadow-lg shadow-emerald-500/10">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <h3 class="font-outfit text-xl font-bold text-slate-800 mb-1">Berhasil Dibuat sebagai Draft!</h3>
                <p class="text-xs text-slate-600 mb-5">
                    Sebanyak <strong class="text-emerald-700 font-bold">${createdCount} materi pembelajaran</strong> telah berhasil digenerate ke status <strong>Draft</strong>. Anda dapat mereview, mengedit, dan mempublish materi tersebut untuk siswa.
                </p>

                <button type="button" id="btn-finish-review-gen" class="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/30 transition-all">
                    Review & Kelola Materi Pembelajaran
                </button>
            </div>
        `;
    }

    function render() {
        if (currentStep === 1) {
            showModal(renderStep1());
            document.getElementById('modal-close-gen-x')?.addEventListener('click', closeModal);
            document.getElementById('btn-cancel-gen')?.addEventListener('click', closeModal);

            document.getElementById('btn-next-step2')?.addEventListener('click', () => {
                selectedKelas = document.getElementById('gen-kelas-select').value;
                selectedSubject = document.getElementById('gen-subject-select').value;

                const allQuestions = storageService.getQuestions();
                groupedResults = materialGeneratorService.analyzeAndGroupQuestions(selectedKelas, selectedSubject, allQuestions);
                selectedGroupIndices = new Set(groupedResults.map((_, idx) => idx));

                currentStep = 2;
                render();
            });
        }
        else if (currentStep === 2) {
            showModal(renderStep2());
            document.getElementById('modal-close-gen-x2')?.addEventListener('click', closeModal);
            document.getElementById('btn-back-step1')?.addEventListener('click', () => {
                currentStep = 1;
                render();
            });

            document.querySelectorAll('.gen-group-cb').forEach(cb => {
                cb.addEventListener('change', () => {
                    const idx = parseInt(cb.getAttribute('data-idx'), 10);
                    if (cb.checked) selectedGroupIndices.add(idx);
                    else selectedGroupIndices.delete(idx);
                    render();
                });
            });

            document.querySelectorAll('.gen-group-title').forEach(input => {
                input.addEventListener('change', () => {
                    const idx = parseInt(input.getAttribute('data-idx'), 10);
                    if (groupedResults[idx]) {
                        groupedResults[idx].title = input.value.trim();
                    }
                });
            });

            document.getElementById('btn-finalize-generate')?.addEventListener('click', async () => {
                const groupsToSave = Array.from(selectedGroupIndices).map(idx => groupedResults[idx]);
                let savedCount = 0;

                for (let i = 0; i < groupsToSave.length; i++) {
                    const g = groupsToSave[i];
                    const generatedDraft = materialGeneratorService.generateMaterialDraft(g, selectedKelas, selectedSubject, i + 1);
                    const qIds = (g.questions || []).map(q => q.id);
                    await storageService.saveMaterial(generatedDraft, qIds);
                    savedCount++;
                }

                currentStep = 3;
                showModal(renderStep3(savedCount));

                document.getElementById('btn-finish-review-gen')?.addEventListener('click', () => {
                    closeModal();
                    if (onGenerated) onGenerated();
                });
            });
        }
    }

    render();
}

// =========================================================================
// 9. MATERIAL PREVIEW MODAL (Tampilan Bacaan Edukatif Siswa / Admin)
// =========================================================================
export function renderMaterialPreviewModal(material, relatedQuestions = null) {
    if (!material) return;
    const questions = relatedQuestions || storageService.getMaterialQuestions(material.id);
    const subjectObj = SUBJECTS.find(s => s.id === material.subject);

    // Format objectives list
    const objectivesList = (material.learning_objectives || material.learningObjectives || '')
        .split('\n')
        .map(s => s.trim().replace(/^[-*•\d.]+\s*/, ''))
        .filter(Boolean);

    // Format subtopics
    const subtopics = [...new Set(questions.map(q => q.bab || 'Materi Umum'))].filter(Boolean);

    const modalHtml = `
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col space-y-5 animate-in zoom-in-95">
            <!-- Header Bar -->
            <div class="flex justify-between items-start pb-4 border-b border-slate-100">
                <div>
                    <div class="flex items-center gap-2 mb-1.5">
                        <span class="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 text-[10px] font-bold">
                            ${material.kelas} • ${subjectObj?.name || material.subject}
                        </span>
                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${material.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                            ${material.status === 'published' ? '✓ Published' : '📝 Draft'}
                        </span>
                    </div>
                    <h2 class="font-outfit text-xl sm:text-2xl font-bold text-slate-800">
                        📚 ${material.title}
                    </h2>
                    ${material.description ? `<p class="text-xs text-slate-500 mt-1">${material.description}</p>` : ''}
                </div>
                <button id="modal-close-matpreview" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>

            <!-- 🎯 Tujuan Pembelajaran -->
            ${objectivesList.length > 0 ? `
                <div class="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4">
                    <h4 class="font-bold text-xs text-indigo-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <i class="fa-solid fa-bullseye text-indigo-600"></i> Tujuan Pembelajaran
                    </h4>
                    <ul class="space-y-1.5 text-xs text-slate-700">
                        ${objectivesList.map(obj => `
                            <li class="flex items-start gap-2">
                                <span class="text-indigo-600 font-bold mt-0.5">✓</span>
                                <span>${obj}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}

            <!-- 📌 Subtopik / Pokok Bahasan -->
            ${subtopics.length > 0 ? `
                <div>
                    <h4 class="font-bold text-xs text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <i class="fa-solid fa-tags text-brand-600"></i> Subtopik Materi
                    </h4>
                    <div class="flex flex-wrap gap-1.5">
                        ${subtopics.map(st => `
                            <span class="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200">
                                📌 ${st}
                            </span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- 🎬 Video Pembelajaran Interaktif (Jika Ada) -->
            ${(material.video_url || material.videoUrl) && extractYouTubeVideoId(material.video_url || material.videoUrl) ? `
                <div>
                    ${renderStudentVideoCard(extractYouTubeVideoId(material.video_url || material.videoUrl), material.title)}
                </div>
            ` : ''}

            <!-- 📖 Isi Materi Pembelajaran -->
            <div class="space-y-2">
                <h4 class="font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <i class="fa-solid fa-book-open text-brand-600"></i> Uraian Materi
                </h4>
                <div class="bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed prose prose-sm max-w-none whitespace-pre-line">
                    ${material.content ? formatRichText(material.content) : '<p class="text-slate-400 italic">Belum ada penjelasan materi tertulis.</p>'}
                </div>
            </div>

            <!-- 💡 Ringkasan Inti -->
            ${material.summary ? `
                <div class="bg-amber-50/80 border border-amber-200 rounded-2xl p-4">
                    <h4 class="font-bold text-xs text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <i class="fa-solid fa-lightbulb text-amber-600"></i> Ringkasan Penting
                    </h4>
                    <div class="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                        ${formatRichText(material.summary)}
                    </div>
                </div>
            ` : ''}

            <!-- 📝 Soal Terkait -->
            ${questions.length > 0 ? `
                <div class="space-y-3 pt-2 border-t border-slate-100">
                    <div class="flex items-center justify-between">
                        <h4 class="font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <i class="fa-solid fa-list-check text-brand-600"></i> Soal Latihan Terkait (${questions.length} Soal)
                        </h4>
                    </div>

                    <div class="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                        ${questions.map((q, idx) => `
                            <div class="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5 shadow-2xs">
                                <div class="flex items-center justify-between gap-2">
                                    <span class="px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-bold text-[10px]">${q.bab || 'Umum'}</span>
                                    <span class="text-[10px] text-slate-400 font-mono">#${q.id}</span>
                                </div>
                                <p class="font-medium text-slate-800">${idx + 1}. ${formatRichText(q.question)}</p>
                                ${q.explanation ? `
                                    <div class="pt-1 text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                                        <strong>💡 Pembahasan:</strong> ${formatRichText(q.explanation)}
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Close Button -->
            <div class="pt-4 border-t border-slate-100 flex justify-end">
                <button type="button" id="btn-close-matpreview-footer" class="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors">
                    Tutup Preview
                </button>
            </div>
        </div>
    `;

    showModal(modalHtml);
    document.getElementById('modal-close-matpreview')?.addEventListener('click', closeModal);
    document.getElementById('btn-close-matpreview-footer')?.addEventListener('click', closeModal);
}

// =========================================================================
// 10. MANAGE UNMAPPED QUESTIONS MODAL
// =========================================================================
export function renderManageUnmappedQuestionsModal(onUpdated) {
    let unmappedQuestions = storageService.getUnmappedQuestions();
    let selectedQIds = new Set();
    let targetMaterialId = '';

    const materials = storageService.getMaterials();

    function renderHtml() {
        return `
            <div class="bg-white rounded-3xl p-6 sm:p-7 max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col space-y-4">
                <div class="flex justify-between items-start pb-3 border-b border-slate-100">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold">
                                <i class="fa-solid fa-triangle-exclamation"></i>
                            </span>
                            <div>
                                <h3 class="font-outfit text-base sm:text-lg font-bold text-slate-800">Soal yang Belum Memiliki Materi</h3>
                                <p class="text-xs text-slate-500">Hubungkan soal-soal berikut ke materi pembelajaran agar siswa memiliki materi bacaan.</p>
                            </div>
                        </div>
                    </div>
                    <button id="modal-close-unmapped" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <div class="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-2 items-center justify-between">
                    <span class="text-xs font-bold text-slate-700">
                        Ditemukan <strong class="text-amber-700">${unmappedQuestions.length} butir soal</strong> belum terhubung ke materi.
                    </span>
                    <div class="flex items-center gap-2">
                        <button type="button" id="btn-unmap-select-all" class="px-3 py-1 rounded-lg bg-brand-50 text-brand-700 text-xs font-bold hover:bg-brand-100">
                            Pilih Semua
                        </button>
                        <button type="button" id="btn-unmap-clear-all" class="px-3 py-1 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-300">
                            Reset
                        </button>
                    </div>
                </div>

                <!-- Soal List -->
                <div class="max-h-64 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white">
                    ${unmappedQuestions.length === 0 ? `
                        <div class="p-8 text-center text-emerald-600 font-bold text-xs flex flex-col items-center gap-2">
                            <i class="fa-solid fa-circle-check text-2xl"></i>
                            <span>Semua soal di Bank Soal sudah terhubung ke Materi Pembelajaran!</span>
                        </div>
                    ` : unmappedQuestions.map(q => {
                        const isChecked = selectedQIds.has(q.id);
                        return `
                            <label class="p-3 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer block ${isChecked ? 'bg-amber-50/40' : ''}">
                                <input type="checkbox" class="unmap-q-cb mt-1 w-4 h-4 text-brand-600 rounded cursor-pointer" data-qid="${q.id}" ${isChecked ? 'checked' : ''}>
                                <div class="flex-1 min-w-0 text-xs">
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class="px-2 py-0.5 rounded bg-brand-100 text-brand-800 text-[10px] font-bold">${q.kelas}</span>
                                        <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">${q.subject}</span>
                                        <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">${q.bab || 'Umum'}</span>
                                        <span class="text-[10px] font-mono text-slate-400">#${q.id}</span>
                                    </div>
                                    <p class="text-slate-800 font-medium line-clamp-2">${formatRichText(q.question)}</p>
                                </div>
                            </label>
                        `;
                    }).join('')}
                </div>

                ${unmappedQuestions.length > 0 ? `
                    <!-- Action: Hubungkan ke Materi -->
                    <div class="p-4 bg-brand-50/60 rounded-2xl border border-brand-200 space-y-3">
                        <label class="block text-xs font-bold text-brand-950">
                            Pilih Materi Tujuan untuk Soal Terpilih (${selectedQIds.size} soal):
                        </label>
                        <div class="flex flex-col sm:flex-row gap-2">
                            <select id="select-target-material" class="flex-1 px-3 py-2 rounded-xl border border-brand-300 text-xs font-bold text-slate-800 bg-white outline-none cursor-pointer">
                                <option value="">-- Pilih Materi Pembelajaran --</option>
                                ${materials.map(m => `
                                    <option value="${m.id}">${m.kelas} - ${m.subject} : ${m.title} (${m.status})</option>
                                `).join('')}
                            </select>
                            <button type="button" id="btn-submit-map-questions" class="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md disabled:opacity-50" ${selectedQIds.size === 0 ? 'disabled' : ''}>
                                Hubungkan Soal
                            </button>
                        </div>
                    </div>
                ` : ''}

                <div class="flex justify-end pt-2 border-t border-slate-100">
                    <button type="button" id="btn-close-unmapped-footer" class="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50">
                        Tutup
                    </button>
                </div>
            </div>
        `;
    }

    function render() {
        showModal(renderHtml());

        document.getElementById('modal-close-unmapped')?.addEventListener('click', closeModal);
        document.getElementById('btn-close-unmapped-footer')?.addEventListener('click', closeModal);

        document.querySelectorAll('.unmap-q-cb').forEach(cb => {
            cb.addEventListener('change', () => {
                const qid = cb.getAttribute('data-qid');
                if (cb.checked) selectedQIds.add(qid);
                else selectedQIds.delete(qid);
                render();
            });
        });

        document.getElementById('btn-unmap-select-all')?.addEventListener('click', () => {
            unmappedQuestions.forEach(q => selectedQIds.add(q.id));
            render();
        });

        document.getElementById('btn-unmap-clear-all')?.addEventListener('click', () => {
            selectedQIds.clear();
            render();
        });

        document.getElementById('btn-submit-map-questions')?.addEventListener('click', async () => {
            const matId = document.getElementById('select-target-material')?.value;
            if (!matId) {
                alert("Harap pilih Materi Tujuan terlebih dahulu.");
                return;
            }
            const qIds = Array.from(selectedQIds);
            await storageService.mapQuestionsToMaterial(matId, qIds);
            closeModal();
            if (onUpdated) onUpdated();
        });
    }

    render();
}



