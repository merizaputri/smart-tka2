// Application Constants

export const APP_NAME = "TKA Smart Exam";
export const APP_SUBTITLE = "Media Latihan Tes Kemampuan Akademik SD";

export const CLASSES = [
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

