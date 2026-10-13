// Application Constants

export const APP_NAME = "TKA Smart Exam";
export const APP_SUBTITLE = "Media Latihan Tes Kemampuan Akademik SD";

export const CLASSES = [
    "Kelas 1",
    "Kelas 2",
    "Kelas 3",
    "Kelas 4",
    "Kelas 5",
    "Kelas 6"
];

export const SUBJECTS = [
    { id: 'indonesia', name: 'Bahasa Indonesia', icon: 'fa-book-open', badgeBg: 'bg-blue-100', badgeText: 'text-blue-700', border: 'border-blue-200' },
    { id: 'matematika', name: 'Matematika', icon: 'fa-calculator', badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700', border: 'border-emerald-200' },
    { id: 'ipas', name: 'IPAS (Ilmu Pengetahuan)', icon: 'fa-flask', badgeBg: 'bg-purple-100', badgeText: 'text-purple-700', border: 'border-purple-200' },
    { id: 'pancasila', name: 'Pendidikan Pancasila', icon: 'fa-landmark', badgeBg: 'bg-amber-100', badgeText: 'text-amber-700', border: 'border-amber-200' },
    { id: 'inggris', name: 'Bahasa Inggris', icon: 'fa-language', badgeBg: 'bg-rose-100', badgeText: 'text-rose-700', border: 'border-rose-200' },
    { id: 'akidah_akhlak', name: 'Akidah Akhlak', icon: 'fa-heart-pulse', badgeBg: 'bg-teal-100', badgeText: 'text-teal-700', border: 'border-teal-200' },
    { id: 'fiqih', name: 'Fiqih', icon: 'fa-book-quran', badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-700', border: 'border-indigo-200' },
    { id: 'quran_hadis', name: 'Al-Qur\'an Hadis', icon: 'fa-mosque', badgeBg: 'bg-sky-100', badgeText: 'text-sky-700', border: 'border-sky-200' }
];

export const SUBJECT_THEMES = {
    indonesia: {
        id: 'indonesia',
        name: 'Bahasa Indonesia',
        worldTitle: 'Dunia Kata & Cerita',
        description: 'Pemahaman teks bacaan, ragam kosakata, puisi, dan ketangkasan tata bahasa Indonesia.',
        icon: 'fa-book-open',
        bannerGradient: 'from-blue-600 via-sky-600 to-indigo-700',
        lightBg: 'bg-blue-50/60',
        cardBorder: 'border-blue-200',
        cardHoverBorder: 'hover:border-blue-400',
        badgeBg: 'bg-blue-100',
        badgeText: 'text-blue-800',
        iconBg: 'bg-blue-500 text-white',
        accentBg: 'bg-blue-600',
        accentColor: '#2563eb',
        accentText: 'text-blue-600',
        btnClass: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25',
        cardHeaderBg: 'bg-gradient-to-br from-blue-50 to-indigo-50/50'
    },
    matematika: {
        id: 'matematika',
        name: 'Matematika',
        worldTitle: 'Dunia Angka & Logika',
        description: 'Operasi hitung cerdas, geometri bangun datar, satuan ukur, dan penalaran matematika terapan.',
        icon: 'fa-calculator',
        bannerGradient: 'from-emerald-600 via-teal-600 to-green-700',
        lightBg: 'bg-emerald-50/60',
        cardBorder: 'border-emerald-200',
        cardHoverBorder: 'hover:border-emerald-400',
        badgeBg: 'bg-emerald-100',
        badgeText: 'text-emerald-800',
        iconBg: 'bg-emerald-500 text-white',
        accentBg: 'bg-emerald-600',
        accentColor: '#059669',
        accentText: 'text-emerald-600',
        btnClass: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25',
        cardHeaderBg: 'bg-gradient-to-br from-emerald-50 to-teal-50/50'
    },
    ipas: {
        id: 'ipas',
        name: 'IPAS (Ilmu Pengetahuan)',
        worldTitle: 'Laboratorium Sains Cilik',
        description: 'Petualangan makhluk hidup, rahasia energi, ekosistem alam, dan kenampakan lingkungan sekitar.',
        icon: 'fa-flask',
        bannerGradient: 'from-purple-600 via-violet-600 to-indigo-700',
        lightBg: 'bg-purple-50/60',
        cardBorder: 'border-purple-200',
        cardHoverBorder: 'hover:border-purple-400',
        badgeBg: 'bg-purple-100',
        badgeText: 'text-purple-800',
        iconBg: 'bg-purple-500 text-white',
        accentBg: 'bg-purple-600',
        accentColor: '#7c3aed',
        accentText: 'text-purple-600',
        btnClass: 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/25',
        cardHeaderBg: 'bg-gradient-to-br from-purple-50 to-indigo-50/50'
    },
    pancasila: {
        id: 'pancasila',
        name: 'Pendidikan Pancasila',
        worldTitle: 'Negeri Sahabat Pancasila',
        description: 'Pengamalan nilai-nilai luhur Pancasila, keberagaman suku budaya, norma sosial, dan gotong royong.',
        icon: 'fa-landmark',
        bannerGradient: 'from-amber-500 via-orange-500 to-yellow-600',
        lightBg: 'bg-amber-50/60',
        cardBorder: 'border-amber-200',
        cardHoverBorder: 'hover:border-amber-400',
        badgeBg: 'bg-amber-100',
        badgeText: 'text-amber-800',
        iconBg: 'bg-amber-500 text-white',
        accentBg: 'bg-amber-600',
        accentColor: '#d97706',
        accentText: 'text-amber-600',
        btnClass: 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/25',
        cardHeaderBg: 'bg-gradient-to-br from-amber-50 to-orange-50/50'
    },
    inggris: {
        id: 'inggris',
        name: 'Bahasa Inggris',
        worldTitle: 'English Adventure Land',
        description: 'Kosakata benda harian, sapaan ceria, nama buah dan hewan, serta percakapan sederhana.',
        icon: 'fa-language',
        bannerGradient: 'from-rose-500 via-pink-600 to-red-600',
        lightBg: 'bg-rose-50/60',
        cardBorder: 'border-rose-200',
        cardHoverBorder: 'hover:border-rose-400',
        badgeBg: 'bg-rose-100',
        badgeText: 'text-rose-800',
        iconBg: 'bg-rose-500 text-white',
        accentBg: 'bg-rose-600',
        accentColor: '#e11d48',
        accentText: 'text-rose-600',
        btnClass: 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/25',
        cardHeaderBg: 'bg-gradient-to-br from-rose-50 to-pink-50/50'
    },
    akidah_akhlak: {
        id: 'akidah_akhlak',
        name: 'Akidah Akhlak',
        worldTitle: 'Taman Budi Pekerti Mulia',
        description: 'Mengenal Asmaul Husna, melafalkan kalimat thayyibah, dan membiasakan akhlak terpuji sehari-hari.',
        icon: 'fa-heart-pulse',
        bannerGradient: 'from-teal-600 via-cyan-600 to-emerald-700',
        lightBg: 'bg-teal-50/60',
        cardBorder: 'border-teal-200',
        cardHoverBorder: 'hover:border-teal-400',
        badgeBg: 'bg-teal-100',
        badgeText: 'text-teal-800',
        iconBg: 'bg-teal-500 text-white',
        accentBg: 'bg-teal-600',
        accentColor: '#0d9488',
        accentText: 'text-teal-600',
        btnClass: 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/25',
        cardHeaderBg: 'bg-gradient-to-br from-teal-50 to-cyan-50/50'
    },
    fiqih: {
        id: 'fiqih',
        name: 'Fiqih',
        worldTitle: 'Pesantren Cilik Ibadah',
        description: 'Panduan tata cara bersuci (taharah), seruan azan dan ikamah, serta rukun gerakan salat fardu.',
        icon: 'fa-book-quran',
        bannerGradient: 'from-indigo-600 via-blue-700 to-violet-800',
        lightBg: 'bg-indigo-50/60',
        cardBorder: 'border-indigo-200',
        cardHoverBorder: 'hover:border-indigo-400',
        badgeBg: 'bg-indigo-100',
        badgeText: 'text-indigo-800',
        iconBg: 'bg-indigo-600 text-white',
        accentBg: 'bg-indigo-600',
        accentColor: '#4f46e5',
        accentText: 'text-indigo-600',
        btnClass: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25',
        cardHeaderBg: 'bg-gradient-to-br from-indigo-50 to-blue-50/50'
    },
    quran_hadis: {
        id: 'quran_hadis',
        name: 'Al-Qur\'an Hadis',
        worldTitle: 'Cahaya Qur\'an & Hadis',
        description: 'Melantunkan dan memahami surah pendek pilihan, hukum tajwid dasar, serta teladan hadis nabi.',
        icon: 'fa-mosque',
        bannerGradient: 'from-sky-600 via-cyan-600 to-blue-700',
        lightBg: 'bg-sky-50/60',
        cardBorder: 'border-sky-200',
        cardHoverBorder: 'hover:border-sky-400',
        badgeBg: 'bg-sky-100',
        badgeText: 'text-sky-800',
        iconBg: 'bg-sky-500 text-white',
        accentBg: 'bg-sky-600',
        accentColor: '#0284c7',
        accentText: 'text-sky-600',
        btnClass: 'bg-sky-600 hover:bg-sky-700 shadow-sky-500/25',
        cardHeaderBg: 'bg-gradient-to-br from-sky-50 to-cyan-50/50'
    }
};

export function getSubjectTheme(subjectId) {
    if (subjectId && SUBJECT_THEMES[subjectId]) {
        return SUBJECT_THEMES[subjectId];
    }
    const found = SUBJECTS.find(s => s.id === subjectId);
    return {
        id: subjectId || 'umum',
        name: found ? found.name : (subjectId || 'Umum'),
        worldTitle: 'Modul Pembelajaran',
        description: 'Materi pembelajaran dan latihan soal akademis.',
        icon: found ? found.icon : 'fa-book',
        bannerGradient: 'from-slate-700 via-indigo-800 to-slate-900',
        lightBg: 'bg-slate-50',
        cardBorder: 'border-slate-200',
        cardHoverBorder: 'hover:border-brand-400',
        badgeBg: 'bg-brand-50',
        badgeText: 'text-brand-700',
        iconBg: 'bg-brand-600 text-white',
        accentBg: 'bg-brand-600',
        accentColor: '#2563eb',
        accentText: 'text-brand-600',
        btnClass: 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/25',
        cardHeaderBg: 'bg-slate-50'
    };
}

export const EXAM_MODES = {
    PRACTICE: {
        id: 'latihan',
        label: 'Mode Latihan',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        description: 'Bisa melihat pembahasan, pengulangan tanpa batas, ramah untuk belajar harian.'
    },
    SIMULATION: {
        id: 'simulasi',
        label: 'Mode Simulasi TKA',
        badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
        description: 'Mensimulasikan ujian CBT asli dengan timer ketat dan penilaian resmi.'
    }
};

export const DIFFICULTY_LEVELS = ['Mudah', 'Sedang', 'Sulit'];

export const STORAGE_KEYS = {
    USERS: 'tka_users_v1',
    QUESTIONS: 'tka_questions_v1',
    PACKAGES: 'tka_packages_v1',
    MATERIALS: 'tka_materials_v1',
    MATERIAL_QUESTIONS: 'tka_material_questions_v1',
    SESSIONS: 'tka_sessions_v1',
    RESULTS: 'tka_results_v1',
    CURRENT_USER: 'tka_current_user_v1',
    ACTIVE_EXAM: 'tka_active_exam_v1'
};

export const DEFAULT_ADMIN = {
    id: 'u-admin-1',
    nisn: 'ADMIN001',
    name: 'Administrator TKA',
    role: 'admin',
    password: '123',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin'
};

