// Rich Initial Seed Data for TKA Smart Exam

export const INITIAL_STUDENTS = [
    {
        id: 'u-std-1',
        nisn: '0012345678',
        name: 'Budi Santoso',
        kelas: 'Kelas 5',
        role: 'siswa',
        password: '123',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Budi'
    },
    {
        id: 'u-std-2',
        nisn: '0012345679',
        name: 'Siti Aminah',
        kelas: 'Kelas 5',
        role: 'siswa',
        password: '123',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Siti'
    },
    {
        id: 'u-std-3',
        nisn: '0023456780',
        name: 'Andi Pratama',
        kelas: 'Kelas 6',
        role: 'siswa',
        password: '123',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Andi'
    },
    {
        id: 'u-std-4',
        nisn: '0034567891',
        name: 'Dewi Lestari',
        kelas: 'Kelas 4',
        role: 'siswa',
        password: '123',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Dewi'
    },
    {
        id: 'u-std-5',
        nisn: '0045678902',
        name: 'Rian Hidayat',
        kelas: 'Kelas 2',
        role: 'siswa',
        password: '123',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Rian'
    }
];

// SVG Diagram Helpers for rich question visuals
const GEOMETRY_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180" viewBox="0 0 300 180"><rect width="300" height="180" fill="%23f8fafc" rx="8"/><polygon points="150,20 260,150 40,150" fill="%2393c5fd" stroke="%232563eb" stroke-width="4"/><text x="150" y="165" font-family="sans-serif" font-size="14" font-weight="bold" fill="%231e40af" text-anchor="middle">Segitiga Sama Sisi (Alas = 12 cm, Tinggi = 10 cm)</text></svg>`;
const FRACTION_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23ffffff" rx="8"/><circle cx="100" cy="100" r="80" fill="%23e2e8f0" stroke="%23475569" stroke-width="3"/><path d="M100 100 L100 20 A80 80 0 0 1 180 100 Z" fill="%2310b981"/><path d="M100 100 L180 100 A80 80 0 0 1 100 180 Z" fill="%2310b981"/><path d="M100 100 L100 180 A80 80 0 0 1 20 100 Z" fill="%2310b981"/><text x="100" y="195" font-family="sans-serif" font-size="12" fill="%230f766e" text-anchor="middle">Lingkaran Terbagi 4 Bagian</text></svg>`;
const PHOTOSYNTHESIS_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><rect width="320" height="180" fill="%23f0fdf4" rx="8"/><circle cx="50" cy="40" r="25" fill="%23fbbf24"/><path d="M120 140 Q160 60 220 140 T300 140" fill="none" stroke="%2316a34a" stroke-width="6"/><text x="160" y="165" font-family="sans-serif" font-size="13" font-weight="bold" fill="%2314532d" text-anchor="middle">Proses Fotosintesis pada Tumbuhan Hijau</text></svg>`;
const BADGE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="200" viewBox="0 0 260 200"><rect width="260" height="200" fill="%23f8fafc" rx="12"/><circle cx="130" cy="85" r="55" fill="%23fbbf24" stroke="%23d97706" stroke-width="4"/><polygon points="130,45 143,72 173,76 151,97 156,127 130,113 104,127 109,97 87,76 117,72" fill="%23fef08a" stroke="%23b45309" stroke-width="2"/><path d="M100 130 L85 180 L112 165 L130 180 L130 135 Z" fill="%23ef4444"/><path d="M160 130 L175 180 L148 165 L130 180 L130 135 Z" fill="%23dc2626"/><text x="130" y="195" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23475569" text-anchor="middle">Lencana / Badge</text></svg>`;
const SHRIMP_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="200" viewBox="0 0 260 200"><rect width="260" height="200" fill="%23f8fafc" rx="12"/><path d="M70,120 Q110,60 180,80 Q200,90 205,110 Q190,120 160,110 Q120,115 90,140 Z" fill="%23fb923c" stroke="%23ea580c" stroke-width="3"/><circle cx="185" cy="88" r="4" fill="%231e293b"/><path d="M195,85 Q220,65 240,70" fill="none" stroke="%23ea580c" stroke-width="2"/><path d="M195,88 Q225,85 245,95" fill="none" stroke="%23ea580c" stroke-width="2"/><text x="130" y="180" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23475569" text-anchor="middle">Ilustrasi (غَمْبٌ)</text></svg>`;

export const INITIAL_QUESTIONS = [
    // MATHEMATICS KELAS 2
    {
        id: 'q-mat-2-1',
        kelas: 'Kelas 2',
        subject: 'matematika',
        bab: 'Pengukuran Panjang',
        difficulty: 'Mudah',
        question: 'Alat yang digunakan untuk mengukur panjang meja adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Timbangan' },
            { id: 'B', text: 'Penggaris' },
            { id: 'C', text: 'Jam' },
            { id: 'D', text: 'Gelas ukur' }
        ],
        answerKey: 'B',
        explanation: 'Penggaris atau meteran adalah alat ukur baku yang digunakan untuk mengukur panjang suatu benda seperti meja.'
    },
    {
        id: 'q-mat-2-2',
        kelas: 'Kelas 2',
        subject: 'matematika',
        bab: 'Bangun Datar',
        difficulty: 'Mudah',
        question: 'Bangun datar yang memiliki 4 sisi sama panjang adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Lingkaran' },
            { id: 'B', text: 'Persegi' },
            { id: 'C', text: 'Segitiga' },
            { id: 'D', text: 'Persegi panjang' }
        ],
        answerKey: 'B',
        explanation: 'Persegi adalah bangun datar dua dimensi yang memiliki 4 buah sisi sama panjang dan 4 sudut siku-siku.'
    },
    {
        id: 'q-mat-2-3',
        kelas: 'Kelas 2',
        subject: 'matematika',
        bab: 'Bangun Datar',
        difficulty: 'Mudah',
        question: 'Bangun datar yang memiliki 3 sisi adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Lingkaran' },
            { id: 'B', text: 'Persegi' },
            { id: 'C', text: 'Segitiga' },
            { id: 'D', text: 'Oval' }
        ],
        answerKey: 'C',
        explanation: 'Segitiga adalah bangun datar yang dibatasi oleh 3 buah sisi dan memiliki 3 titik sudut.'
    },
    {
        id: 'q-mat-2-4',
        kelas: 'Kelas 2',
        subject: 'matematika',
        bab: 'Satuan Waktu',
        difficulty: 'Mudah',
        question: 'Satu minggu terdiri atas ....',
        image: null,
        options: [
            { id: 'A', text: '5 hari' },
            { id: 'B', text: '6 hari' },
            { id: 'C', text: '7 hari' },
            { id: 'D', text: '8 hari' }
        ],
        answerKey: 'C',
        explanation: 'Satu minggu terdiri dari 7 hari (Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, dan Minggu).'
    },
    {
        id: 'q-mat-2-5',
        kelas: 'Kelas 2',
        subject: 'matematika',
        bab: 'Pengurangan',
        difficulty: 'Mudah',
        question: 'Pengurangan bilangan berikut yang hasilnya 7 adalah ....',
        image: null,
        options: [
            { id: 'A', text: '14 − 5' },
            { id: 'B', text: '17 − 7' },
            { id: 'C', text: '13 − 6' }
        ],
        answerKey: 'C',
        explanation: '13 − 6 = 7, sedangkan 14 − 5 = 9 dan 17 − 7 = 10.'
    },
    {
        id: 'q-mat-2-6',
        kelas: 'Kelas 2',
        subject: 'matematika',
        bab: 'Pengurangan',
        difficulty: 'Mudah',
        question: 'Perhatikan pengurangan berikut!\n\n14 − □ = 9\n\nBilangan yang tepat untuk mengisi titik-titik adalah ....',
        image: null,
        options: [
            { id: 'A', text: '4' },
            { id: 'B', text: '5' },
            { id: 'C', text: '6' }
        ],
        answerKey: 'B',
        explanation: '14 − 5 = 9, jadi bilangan yang tepat untuk mengisi titik-titik adalah 5.'
    },
    {
        id: 'q-mat-2-7',
        kelas: 'Kelas 2',
        subject: 'matematika',
        bab: 'Pengurangan',
        difficulty: 'Sedang',
        question: 'Perhatikan pengurangan berikut!\n\n(i) 20 − 13 = 7\n\n(ii) 16 − 12 = 4\n\n(iii) 15 − 6 = 7\n\nPengurangan yang hasilnya benar adalah nomor ....',
        image: null,
        options: [
            { id: 'A', text: '(i) dan (ii)' },
            { id: 'B', text: '(i) dan (iii)' },
            { id: 'C', text: '(ii) dan (iii)' }
        ],
        answerKey: 'A',
        explanation: 'Pengurangan (i) 20 − 13 = 7 (benar) dan (ii) 16 − 12 = 4 (benar). Pengurangan (iii) 15 − 6 = 9 (salah). Jadi yang benar adalah nomor (i) dan (ii).'
    },
    {
        id: 'q-mat-2-8',
        kelas: 'Kelas 2',
        subject: 'matematika',
        bab: 'Pengurangan',
        difficulty: 'Mudah',
        question: 'Siswa kelas II ada 20.\n\nSiswa perempuan ada 11.\n\nBanyak siswa laki-laki ada ....',
        image: null,
        options: [
            { id: 'A', text: '9 anak' },
            { id: 'B', text: '11 anak' },
            { id: 'C', text: '12 anak' }
        ],
        answerKey: 'A',
        explanation: 'Banyak siswa laki-laki = 20 − 11 = 9 anak.'
    },
    {
        id: 'q-mat-2-9',
        kelas: 'Kelas 2',
        subject: 'matematika',
        bab: 'Pengurangan',
        difficulty: 'Sedang',
        question: 'Ibu membuat donat.\n\nAda 11 donat cokelat dan 6 donat keju.\n\nSebanyak 9 donat diberikan kepada paman.\n\nPernyataan yang benar adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Banyak donat yang dibuat ada 19.' },
            { id: 'B', text: 'Selisih banyak donat cokelat dan keju ada 6.' },
            { id: 'C', text: 'Sisa donat ibu ada 8.' }
        ],
        answerKey: 'C',
        explanation: 'Total donat = 11 + 6 = 17. Sisa donat ibu = 17 − 9 = 8. Jadi pernyataan yang benar adalah sisa donat ibu ada 8.'
    },

    // AKIDAH AKHLAK KELAS 2
    {
        id: 'q-akh-2-1',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Kalimat Thayyibah Ta\'awuz',
        difficulty: 'Mudah',
        question: 'Kalimat taawuz dibaca ketika kita ingin .... kepada Allah SWT.',
        image: null,
        options: [
            { id: 'A', text: 'petunjuk' },
            { id: 'B', text: 'perlindungan' },
            { id: 'C', text: 'anugrah' },
            { id: 'D', text: 'kesaksian' }
        ],
        answerKey: 'B',
        explanation: 'Kalimat Ta\'awuz (A\'udzubillahi minasy syaithanir rajim) dibaca ketika kita ingin memohon perlindungan kepada Allah SWT dari godaan setan.'
    },
    {
        id: 'q-akh-2-2',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Asmaul Husna',
        difficulty: 'Mudah',
        question: 'Arti dari Asmaul Husna Al-Mu\'min adalah Allah Maha ....',
        image: null,
        options: [
            { id: 'A', text: 'Pemberi rasa aman' },
            { id: 'B', text: 'Agung' },
            { id: 'C', text: 'Melihat' },
            { id: 'D', text: 'Amin' }
        ],
        answerKey: 'A',
        explanation: 'Al-Mu\'min artinya Allah Maha Pemberi rasa aman dan ketenteraman kepada semua makhluk-Nya.'
    },
    {
        id: 'q-akh-2-3',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Kalimat Thayyibah Ta\'awuz',
        difficulty: 'Mudah',
        question: 'Berikut ini yang bukan manfaat membaca ta\'awudz adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'melindungi diri segala kejahatan' },
            { id: 'B', text: 'menghilangkan nafsu amarah' },
            { id: 'C', text: 'menimbulkan keresahan hati' }
        ],
        answerKey: 'C',
        explanation: 'Manfaat membaca ta\'awudz antara lain melindungi diri dari kejahatan dan godaan setan serta meredakan amarah. Menimbulkan keresahan hati bukan manfaat membaca ta\'awudz.'
    },
    {
        id: 'q-akh-2-4',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Adab Hidup Bersih & Sehat',
        difficulty: 'Mudah',
        question: 'Orang yang tidak menjaga kesehatan berarti tidak taat kepada ....',
        image: null,
        options: [
            { id: 'A', text: 'orang tua' },
            { id: 'B', text: 'Allah Swt.' },
            { id: 'C', text: 'guru' }
        ],
        answerKey: 'B',
        explanation: 'Menjaga kesehatan adalah bentuk syukur dan ketaatan kepada perintah Allah Swt.'
    },
    {
        id: 'q-akh-2-5',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Kalimat Thayyibah Ta\'awuz',
        difficulty: 'Mudah',
        question: 'Meminta perlindungan dari godaan setan adalah makna dari kalimat ....',
        image: null,
        options: [
            { id: 'A', text: 'tahmid' },
            { id: 'B', text: 'takbir' },
            { id: 'C', text: 'ta\'awuz' }
        ],
        answerKey: 'C',
        explanation: 'Makna kalimat ta\'awuz (A\'udzubillahi minasy syaithanir rajim) adalah memohon perlindungan kepada Allah Swt. dari godaan setan.'
    },
    {
        id: 'q-akh-2-6',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Mengenal Sifat Allah Swt.',
        difficulty: 'Mudah',
        question: 'Sifat sempurna hanya dimiliki oleh ....',
        image: null,
        options: [
            { id: 'A', text: 'manusia' },
            { id: 'B', text: 'malaikat' },
            { id: 'C', text: 'Allah Swt.' }
        ],
        answerKey: 'C',
        explanation: 'Sifat sempurna dan tanpa kekurangan hanya dimiliki secara mutlak oleh Allah Swt.'
    },
    {
        id: 'q-akh-2-7',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Akidah Islam',
        difficulty: 'Mudah',
        question: 'Orang yang menyekutukan Allah Swt. tempatnya di ....',
        image: null,
        options: [
            { id: 'A', text: 'surga' },
            { id: 'B', text: 'neraka' },
            { id: 'C', text: 'dunia' }
        ],
        answerKey: 'B',
        explanation: 'Menyekutukan Allah Swt. (syirik) adalah dosa yang sangat besar dan pelakunya diancam dengan siksa api neraka.'
    },
    {
        id: 'q-akh-2-8',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Perlindungan Allah Swt.',
        difficulty: 'Mudah',
        question: 'Orang yang beriman pasti akan ... dari marabahaya.',
        image: null,
        options: [
            { id: 'A', text: 'didatangi' },
            { id: 'B', text: 'dilindungi' },
            { id: 'C', text: 'ditemui' }
        ],
        answerKey: 'B',
        explanation: 'Allah Swt. senantiasa melindungi hamba-hamba-Nya yang beriman dan bertakwa dari marabahaya.'
    },
    {
        id: 'q-akh-2-9',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Akidah Islam',
        difficulty: 'Mudah',
        question: 'Orang yang tidak beriman pelindungnya adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Allah Swt.' },
            { id: 'B', text: 'malaikat' },
            { id: 'C', text: 'setan' }
        ],
        answerKey: 'C',
        explanation: 'Orang-orang yang tidak beriman menjadikan setan sebagai pelindung dan pemimpin mereka menuju kesesatan.'
    },
    {
        id: 'q-akh-2-10',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Kalimat Thayyibah',
        difficulty: 'Mudah',
        question: 'Berikut ini yang bukan kalimat tayibah adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'takbir' },
            { id: 'B', text: 'tahmid' },
            { id: 'C', text: 'al-Fatihah' }
        ],
        answerKey: 'C',
        explanation: 'Takbir dan tahmid adalah kalimat tayibah, sedangkan Al-Fatihah adalah surah pembuka dalam Al-Qur\'an.'
    },
    {
        id: 'q-akh-2-11',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Asmaul Husna',
        difficulty: 'Mudah',
        question: 'Siapa yang mampu menghafal asmaulhusna akan ....',
        image: null,
        options: [
            { id: 'A', text: 'berdosa' },
            { id: 'B', text: 'masuk neraka' },
            { id: 'C', text: 'masuk surga' }
        ],
        answerKey: 'C',
        explanation: 'Rasulullah Saw. bersabda bahwa barang siapa yang menghafal dan mengamalkan Asmaul Husna akan masuk surga.'
    },
    {
        id: 'q-akh-2-12',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Asmaul Husna',
        difficulty: 'Mudah',
        question: 'Asmaulhusna berjumlah ....',
        image: null,
        options: [
            { id: 'A', text: '99' },
            { id: 'B', text: '100' },
            { id: 'C', text: '101' }
        ],
        answerKey: 'A',
        explanation: 'Nama-nama indah Allah Swt. (Asmaul Husna) berjumlah 99 nama.'
    },
    {
        id: 'q-akh-2-13',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Mengenal Allah Swt.',
        difficulty: 'Mudah',
        question: 'Salah satu cara mengenal Allah Swt. adalah dengan mempelajari ....',
        image: null,
        options: [
            { id: 'A', text: 'asmaulhusna' },
            { id: 'B', text: 'kalimat tayibah' },
            { id: 'C', text: 'asmaulhusna dan kalimat tayibah' }
        ],
        answerKey: 'C',
        explanation: 'Mempelajari Asmaul Husna dan mengamalkan kalimat tayibah adalah sarana terbaik untuk mengenal dan mendekatkan diri kepada Allah Swt.'
    },
    {
        id: 'q-akh-2-14',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Asmaul Husna (Al-Mu\'min)',
        difficulty: 'Sedang',
        question: 'Allah Swt. yang memberikan rasa aman kepada hamba-Nya, sebab Allah bersifat ....',
        image: null,
        options: [
            { id: 'A', text: 'الْهَادِي' },
            { id: 'B', text: 'السَّلَامُ' },
            { id: 'C', text: 'الْمُؤْمِنُ' }
        ],
        answerKey: 'C',
        explanation: 'Al-Mu\'min (الْمُؤْمِنُ) artinya Allah Maha Pemberi Rasa Aman kepada seluruh hamba-Nya.'
    },
    {
        id: 'q-akh-2-15',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Asmaul Husna (Al-Mu\'min)',
        difficulty: 'Mudah',
        question: 'Allah Swt. memiliki sifat Al-Mu\'min, artinya Maha ....',
        image: null,
        options: [
            { id: 'A', text: 'Pemberi Rasa Aman' },
            { id: 'B', text: 'Bijaksana' },
            { id: 'C', text: 'Pemberi Keselamatan' }
        ],
        answerKey: 'A',
        explanation: 'Al-Mu\'min artinya Allah Maha Pemberi Rasa Aman dan ketenteraman.'
    },
    {
        id: 'q-akh-2-16',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Menjaga Iman & Ibadah',
        difficulty: 'Mudah',
        question: 'Selalu menjaga iman dilakukan dengan ....',
        image: null,
        options: [
            { id: 'A', text: 'rajin beribadah' },
            { id: 'B', text: 'rajin belajar' },
            { id: 'C', text: 'berolahraga' }
        ],
        answerKey: 'A',
        explanation: 'Iman kita dapat senantiasa terjaga dan bertambah kuat dengan rajin beribadah dan taat kepada perintah Allah Swt.'
    },
    {
        id: 'q-akh-2-17',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Menjaga Akal & Belajar',
        difficulty: 'Mudah',
        question: 'Selalu menjaga akal dilakukan dengan ....',
        image: null,
        options: [
            { id: 'A', text: 'rajin beribadah' },
            { id: 'B', text: 'rajin belajar' },
            { id: 'C', text: 'berolahraga' }
        ],
        answerKey: 'B',
        explanation: 'Akal pikiran yang dianugerahkan Allah Swt. dijaga dan diasah dengan rajin belajar serta menuntut ilmu yang bermanfaat.'
    },
    {
        id: 'q-akh-2-18',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Mensyukuri Nikmat Harta',
        difficulty: 'Mudah',
        question: 'Sedekah adalah bentuk rasa syukur kita atas nikmat ....',
        image: null,
        options: [
            { id: 'A', text: 'jasmani' },
            { id: 'B', text: 'harta benda' },
            { id: 'C', text: 'rohani' }
        ],
        answerKey: 'B',
        explanation: 'Mengeluarkan sedekah atau infak adalah wujud syukur seorang muslim atas nikmat harta benda dan rezeki yang diberikan Allah Swt.'
    },
    {
        id: 'q-akh-2-19',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Mengenal Sifat Allah (Ar-Razzaq)',
        difficulty: 'Mudah',
        question: 'Allah Swt. memberikan rezeki kepada ....',
        image: null,
        options: [
            { id: 'A', text: 'manusia saja' },
            { id: 'B', text: 'hewan saja' },
            { id: 'C', text: 'semua makhluk' }
        ],
        answerKey: 'C',
        explanation: 'Allah Swt. adalah Maha Pemberi Rezeki (Ar-Razzaq) yang menjamin rezeki untuk semua makhluk ciptaan-Nya di alam semesta.'
    },
    {
        id: 'q-akh-2-20',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Ikhtiar dan Tawakal',
        difficulty: 'Mudah',
        question: 'Untuk mendapatkan rezeki, kita harus berdoa dan ....',
        image: null,
        options: [
            { id: 'A', text: 'berusaha' },
            { id: 'B', text: 'bersabar' },
            { id: 'C', text: 'menunggu' }
        ],
        answerKey: 'A',
        explanation: 'Setiap muslim diajarkan untuk bersungguh-sungguh berusaha (ikhtiar) serta diiringi dengan doa kepada Allah Swt. dalam mencari rezeki.'
    },
    {
        id: 'q-akh-2-21',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Akhlak Terpuji',
        difficulty: 'Mudah',
        question: 'Jika diberi sesuatu oleh orang lain kita harus ....',
        image: null,
        options: [
            { id: 'A', text: 'berterima kasih' },
            { id: 'B', text: 'menolak' },
            { id: 'C', text: 'diam saja' }
        ],
        answerKey: 'A',
        explanation: 'Adab yang baik ketika menerima pemberian atau kebaikan dari orang lain adalah mengucapkan terima kasih (Jazakallahu khairan).'
    },
    {
        id: 'q-akh-2-22',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Nikmat Akal',
        difficulty: 'Mudah',
        question: 'Manusia mengetahui benar atau salah, karena memiliki ....',
        image: null,
        options: [
            { id: 'A', text: 'akal' },
            { id: 'B', text: 'hidung' },
            { id: 'C', text: 'mata' }
        ],
        answerKey: 'A',
        explanation: 'Akal adalah anugerah istimewa dari Allah Swt. yang membedakan manusia dari makhluk lain dan berfungsi untuk membedakan hal yang benar dan salah.'
    },
    {
        id: 'q-akh-2-23',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Macam-Macam Nikmat Allah',
        difficulty: 'Mudah',
        question: 'Rasa sedih dan senang merupakan nikmat ....',
        image: null,
        options: [
            { id: 'A', text: 'rohani' },
            { id: 'B', text: 'jasmani' },
            { id: 'C', text: 'harta benda' }
        ],
        answerKey: 'A',
        explanation: 'Perasaan, ketenangan, kebahagiaan, dan suasana hati termasuk ke dalam kategori nikmat rohani (batin).'
    },
    {
        id: 'q-akh-2-24',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Sifat Allah (Al-Ghani)',
        difficulty: 'Mudah',
        question: 'Allah Swt. senantiasa memberikan rezeki kepada hamba-Nya, karena Allah Maha ....',
        image: null,
        options: [
            { id: 'A', text: 'pengampun' },
            { id: 'B', text: 'pemaaf' },
            { id: 'C', text: 'kaya' }
        ],
        answerKey: 'C',
        explanation: 'Allah Swt. memiliki sifat Al-Ghaniy yang artinya Maha Kaya dan tidak membutuhkan apa pun dari makhluk-Nya, justru Allah yang melimpahkan kekayaan.'
    },
    {
        id: 'q-akh-2-25',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Mensyukuri Nikmat Harta',
        difficulty: 'Mudah',
        question: 'Mensyukuri nikmat harta yang kita miliki dapat dengan ....',
        image: null,
        options: [
            { id: 'A', text: 'olahraga' },
            { id: 'B', text: 'berinfak' },
            { id: 'C', text: 'sekolah' }
        ],
        answerKey: 'B',
        explanation: 'Berinfak dan membantu sesama yang membutuhkan merupakan cara utama dalam mensyukuri rezeki dan harta yang kita miliki.'
    },
    {
        id: 'q-akh-2-26',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Akhlak Terpuji (Syukur)',
        difficulty: 'Mudah',
        question: 'Anak yang bersyukur tidak suka ....',
        image: null,
        options: [
            { id: 'A', text: 'mengeluh' },
            { id: 'B', text: 'bersedekah' },
            { id: 'C', text: 'menabung' }
        ],
        answerKey: 'A',
        explanation: 'Ciri anak yang pandai bersyukur adalah selalu merasa cukup (qanaah) serta tidak mudah mengeluh atas keadaan yang dihadapinya.'
    },
    {
        id: 'q-akh-2-27',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Memanfaatkan Nikmat Allah',
        difficulty: 'Mudah',
        question: 'Nikmat yang kita peroleh harus kita manfaatkan untuk ....',
        image: null,
        options: [
            { id: 'A', text: 'kesia-siaan' },
            { id: 'B', text: 'senang-senang' },
            { id: 'C', text: 'ketaatan' }
        ],
        answerKey: 'C',
        explanation: 'Segala nikmat yang Allah berikan hendaknya digunakan untuk ketaatan, beribadah, dan berbuat kebajikan.'
    },
    {
        id: 'q-akh-2-28',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Akhlak Terpuji (Tawaduk)',
        difficulty: 'Mudah',
        question: 'Rendah hati dalam Islam disebut ....',
        image: null,
        options: [
            { id: 'A', text: 'tawaduk' },
            { id: 'B', text: 'husnuzan' },
            { id: 'C', text: 'rida' }
        ],
        answerKey: 'A',
        explanation: 'Tawaduk artinya sikap rendah hati, tidak sombong, dan tidak membanggakan diri di hadapan orang lain.'
    },
    {
        id: 'q-akh-2-29',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Menghindari Sifat Sombong',
        difficulty: 'Mudah',
        question: 'Orang yang sombong akan ... orang lain.',
        image: null,
        options: [
            { id: 'A', text: 'disukai' },
            { id: 'B', text: 'dijauhi' },
            { id: 'C', text: 'disenangi' }
        ],
        answerKey: 'B',
        explanation: 'Sifat sombong (takabur) dibenci oleh Allah Swt. dan membuat orang lain merasa tidak nyaman sehingga akan menjauhinya.'
    },
    {
        id: 'q-akh-2-30',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Adab Bersin & Menguap',
        difficulty: 'Mudah',
        question: 'Penting untuk mendoakan teman yang bersin. Hal ini karena ....',
        image: null,
        options: [
            { id: 'A', text: 'menunjukkan sikap tidak peduli' },
            { id: 'B', text: 'mengingatkan kita untuk bersyukur' },
            { id: 'C', text: 'merenggangkan hubungan persahabatan' }
        ],
        answerKey: 'B',
        explanation: 'Mendoakan orang yang bersin dengan mengucapkan \'Yarhamukallah\' mempererat ukhuwah dan mengingatkan kita untuk saling bersyukur atas nikmat kesehatan.'
    },
    {
        id: 'q-akh-2-31',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Adab Bersin & Menguap',
        difficulty: 'Mudah',
        question: 'Lelah/letih, kantuk, dan kenyang menjadi penyebab kita ....',
        image: null,
        options: [
            { id: 'A', text: 'menguap' },
            { id: 'B', text: 'bersin' },
            { id: 'C', text: 'sehat' }
        ],
        answerKey: 'A',
        explanation: 'Menguap umumnya terjadi saat tubuh merasa lelah, mengantuk, atau terlalu kenyang. Ketika menguap disunnahkan untuk menutup mulut.'
    },
    {
        id: 'q-akh-2-32',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Mengenal Sifat Allah',
        difficulty: 'Mudah',
        question: 'Allah adalah Tuhan yang Maha ....',
        image: null,
        options: [
            { id: 'A', text: 'Lupa' },
            { id: 'B', text: 'Lemah' },
            { id: 'C', text: 'Esa' },
            { id: 'D', text: 'Marah' }
        ],
        answerKey: 'C',
        explanation: 'Allah adalah Tuhan yang Maha Esa (tunggal/satu), tiada sekutu bagi-Nya.'
    },
    {
        id: 'q-akh-2-33',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Beriman kepada Malaikat',
        difficulty: 'Mudah',
        question: 'Malaikat adalah makhluk Allah yang diciptakan dari ....',
        image: null,
        options: [
            { id: 'A', text: 'Tanah' },
            { id: 'B', text: 'Cahaya' },
            { id: 'C', text: 'Api' },
            { id: 'D', text: 'Air' }
        ],
        answerKey: 'B',
        explanation: 'Malaikat diciptakan oleh Allah Swt. dari cahaya (nur).'
    },
    {
        id: 'q-akh-2-34',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Sifat Wajib Allah',
        difficulty: 'Mudah',
        question: 'Sifat wajib Allah berarti sifat yang ....',
        image: null,
        options: [
            { id: 'A', text: 'Tidak mungkin dimiliki Allah' },
            { id: 'B', text: 'Pasti dimiliki Allah' },
            { id: 'C', text: 'Dimiliki manusia' },
            { id: 'D', text: 'Dimiliki hewan' }
        ],
        answerKey: 'B',
        explanation: 'Sifat wajib bagi Allah adalah sifat-sifat kesempurnaan yang pasti ada dan dimiliki oleh Allah Swt.'
    },
    {
        id: 'q-akh-2-35',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Sifat Wajib Allah (Wujud)',
        difficulty: 'Mudah',
        question: 'Contoh sifat wajib Allah adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Mati' },
            { id: 'B', text: 'Lupa' },
            { id: 'C', text: 'Ada' },
            { id: 'D', text: 'Tidur' }
        ],
        answerKey: 'C',
        explanation: 'Salah satu sifat wajib bagi Allah adalah Wujud yang berarti Ada.'
    },
    {
        id: 'q-akh-2-36',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Asmaul Husna (Al-Bashir)',
        difficulty: 'Mudah',
        question: 'Allah Maha Melihat disebut ....',
        image: null,
        options: [
            { id: 'A', text: 'Al-Bashir' },
            { id: 'B', text: 'Al-\'Alim' },
            { id: 'C', text: 'Al-Quddus' },
            { id: 'D', text: 'Al-Ahad' }
        ],
        answerKey: 'A',
        explanation: 'Al-Bashir (الْبَصِيرُ) adalah Asmaul Husna yang berarti Allah Maha Melihat segala hal.'
    },
    {
        id: 'q-akh-2-37',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Akhlak Terpuji (Jujur)',
        difficulty: 'Mudah',
        question: 'Sikap jujur adalah contoh akhlak ....',
        image: null,
        options: [
            { id: 'A', text: 'Terpuji' },
            { id: 'B', text: 'Tercela' },
            { id: 'C', text: 'Sombong' },
            { id: 'D', text: 'Malas' }
        ],
        answerKey: 'A',
        explanation: 'Sikap jujur (sidiq) merupakan contoh akhlak terpuji (akhlakul karimah).'
    },
    {
        id: 'q-akh-2-38',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Berbakti kepada Orang Tua',
        difficulty: 'Mudah',
        question: 'Membantu orang tua termasuk akhlak ....',
        image: null,
        options: [
            { id: 'A', text: 'Buruk' },
            { id: 'B', text: 'Tercela' },
            { id: 'C', text: 'Terpuji' },
            { id: 'D', text: 'Jahat' }
        ],
        answerKey: 'C',
        explanation: 'Membantu dan berbakti kepada orang tua adalah akhlak terpuji yang sangat dianjurkan dalam Islam.'
    },
    {
        id: 'q-akh-2-39',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Akhlak Terpuji vs Tercela',
        difficulty: 'Mudah',
        question: 'Lawan dari sifat jujur adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Pemurah' },
            { id: 'B', text: 'Bohong' },
            { id: 'C', text: 'Rajin' },
            { id: 'D', text: 'Sabar' }
        ],
        answerKey: 'B',
        explanation: 'Lawan dari sifat jujur adalah bohong atau dusta.'
    },
    {
        id: 'q-akh-2-40',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Akhlak Terpuji (Amanah)',
        difficulty: 'Mudah',
        question: 'Sifat amanah berarti ....',
        image: null,
        options: [
            { id: 'A', text: 'Tidak memegang janji' },
            { id: 'B', text: 'Tidak dapat dipercaya' },
            { id: 'C', text: 'Bisa dipercaya' },
            { id: 'D', text: 'Suka marah' }
        ],
        answerKey: 'C',
        explanation: 'Amanah artinya dapat dipercaya dan bertanggung jawab terhadap apa yang diamanahkan.'
    },
    {
        id: 'q-akh-2-41',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Akhlak kepada Diri Sendiri',
        difficulty: 'Mudah',
        question: 'Rajin belajar termasuk akhlak kepada ....',
        image: null,
        options: [
            { id: 'A', text: 'Allah' },
            { id: 'B', text: 'Sesama manusia' },
            { id: 'C', text: 'Diri sendiri' },
            { id: 'D', text: 'Hewan' }
        ],
        answerKey: 'C',
        explanation: 'Rajin belajar dan menjaga diri merupakan wujud akhlak terpuji terhadap diri sendiri.'
    },
    {
        id: 'q-akh-2-42',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Asmaul Husna (Al-\'Alim)',
        difficulty: 'Mudah',
        question: 'Allah Maha Mengetahui segala sesuatu, disebut ....',
        image: null,
        options: [
            { id: 'A', text: 'Al-Bashir' },
            { id: 'B', text: 'Al-\'Alim' },
            { id: 'C', text: 'Ar-Rahim' },
            { id: 'D', text: 'Al-Khaliq' }
        ],
        answerKey: 'B',
        explanation: 'Al-\'Alim (الْعَلِيمُ) artinya Allah Maha Mengetahui segala sesuatu.'
    },
    {
        id: 'q-akh-2-43',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Adab kepada Guru',
        difficulty: 'Mudah',
        question: 'Menghormati guru termasuk akhlak kepada ....',
        image: null,
        options: [
            { id: 'A', text: 'Hewan' },
            { id: 'B', text: 'Orang tua' },
            { id: 'C', text: 'Sesama' },
            { id: 'D', text: 'Guru' }
        ],
        answerKey: 'D',
        explanation: 'Menghormati guru adalah bentuk adab dan akhlak mulia kepada guru.'
    },
    {
        id: 'q-akh-2-44',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Adab Berteman',
        difficulty: 'Mudah',
        question: 'Berbuat baik kepada teman dapat membuat ....',
        image: null,
        options: [
            { id: 'A', text: 'Banyak musuh' },
            { id: 'B', text: 'Banyak teman' },
            { id: 'C', text: 'Tidak disukai' },
            { id: 'D', text: 'Sombong' }
        ],
        answerKey: 'B',
        explanation: 'Berbuat baik dan saling tolong-menolong membuat kita disenangi dan memiliki banyak teman.'
    },
    {
        id: 'q-akh-2-45',
        kelas: 'Kelas 2',
        subject: 'akidah_akhlak',
        bab: 'Asmaul Husna (Al-Khaliq)',
        difficulty: 'Mudah',
        question: 'Allah Maha Pencipta disebut ....',
        image: null,
        options: [
            { id: 'A', text: 'Al-Ahad' },
            { id: 'B', text: 'Ar-Rahman' },
            { id: 'C', text: 'Al-Khaliq' },
            { id: 'D', text: 'Al-Malik' }
        ],
        answerKey: 'C',
        explanation: 'Al-Khaliq (الْخَالِقُ) adalah nama Allah yang berarti Maha Pencipta seluruh alam semesta.'
    },






    {
        id: 'q-mat-5-1',
        kelas: 'Kelas 5',
        subject: 'matematika',
        bab: 'Geometri & Bangun Datar',
        difficulty: 'Sedang',
        question: 'Perhatikan gambar segitiga di bawah ini! Hitunglah luas segitiga tersebut jika alasnya 12 cm dan tingginya 10 cm.',
        image: GEOMETRY_SVG,
        options: [
            { id: 'A', text: '60 cm²' },
            { id: 'B', text: '120 cm²' },
            { id: 'C', text: '48 cm²' },
            { id: 'D', text: '30 cm²' }
        ],
        answerKey: 'A',
        explanation: 'Rumus luas segitiga = ½ × alas × tinggi. Maka, Luas = ½ × 12 cm × 10 cm = 60 cm².'
    },
    {
        id: 'q-mat-5-2',
        kelas: 'Kelas 5',
        subject: 'matematika',
        bab: 'Pecahan & Desimal',
        difficulty: 'Mudah',
        question: 'Pada gambar lingkaran berikut, 3 dari 4 bagian diarsir dengan warna hijau. Berapakah nilai pecahan dari bagian yang diarsir?',
        image: FRACTION_SVG,
        options: [
            { id: 'A', text: '1/4' },
            { id: 'B', text: '2/4' },
            { id: 'C', text: '3/4' },
            { id: 'D', text: '4/3' }
        ],
        answerKey: 'C',
        explanation: 'Bagian yang diarsir ada 3 dari total 4 bagian yang sama besar, sehingga nilainya adalah 3/4.'
    },
    {
        id: 'q-mat-5-3',
        kelas: 'Kelas 5',
        subject: 'matematika',
        bab: 'Operasi Hitung Campuran',
        difficulty: 'Sedang',
        question: 'Hasil dari 250 + 15 × 8 - 75 adalah ...',
        image: null,
        options: [
            { id: 'A', text: '295' },
            { id: 'B', text: '375' },
            { id: 'C', text: '2045' },
            { id: 'D', text: '270' }
        ],
        answerKey: 'A',
        explanation: 'Kerjakan perkalian terlebih dahulu: 15 × 8 = 120. Lalu lakukan penjumlahan dan pengurangan dari kiri ke kanan: 250 + 120 - 75 = 370 - 75 = 295.'
    },
    {
        id: 'q-mat-5-4',
        kelas: 'Kelas 5',
        subject: 'matematika',
        bab: 'KPK & FPB',
        difficulty: 'Sedang',
        question: 'KPK dari bilangan 12 dan 18 adalah ...',
        image: null,
        options: [
            { id: 'A', text: '6' },
            { id: 'B', text: '36' },
            { id: 'C', text: '72' },
            { id: 'D', text: '24' }
        ],
        answerKey: 'B',
        explanation: 'Faktorisasi prima: 12 = 2² × 3, 18 = 2 × 3². KPK dihitung dengan mengambil pangkat tertinggi: 2² × 3² = 4 × 9 = 36.'
    },
    {
        id: 'q-mat-5-5',
        kelas: 'Kelas 5',
        subject: 'matematika',
        bab: 'Volume Bangun Ruang',
        difficulty: 'Sulit',
        question: 'Sebuah kubus memiliki panjang rusuk 8 cm. Berapakah volume kubus tersebut?',
        image: null,
        options: [
            { id: 'A', text: '64 cm³' },
            { id: 'B', text: '384 cm³' },
            { id: 'C', text: '512 cm³' },
            { id: 'D', text: '256 cm³' }
        ],
        answerKey: 'C',
        explanation: 'Volume kubus = s × s × s = 8 × 8 × 8 = 512 cm³.'
    },

    // BAHASA INDONESIA KELAS 5
    {
        id: 'q-ind-5-1',
        kelas: 'Kelas 5',
        subject: 'indonesia',
        bab: 'Membaca Memahami Paragraf',
        difficulty: 'Mudah',
        question: 'Bacalah teks berikut!\n"Hutan mangroove memiliki peran sangat vital bagi ekosistem pesisir. Selain mencegah abrasi pantai, akar mangrove menjadi tempat berkembang biak biota laut seperti ikan dan kepiting."\nIde pokok paragraf di atas adalah ...',
        image: null,
        options: [
            { id: 'A', text: 'Jenis-jenis ikan di hutan mangrove' },
            { id: 'B', text: 'Pentingnya peran hutan mangrove bagi ekosistem pesisir' },
            { id: 'C', text: 'Cara merawat akar mangrove' },
            { id: 'D', text: 'Penyebab abrasi di pantai' }
        ],
        answerKey: 'B',
        explanation: 'Kalimat utama paragraf tersebut membahas peran vital hutan mangrove bagi ekosistem pesisir.'
    },
    {
        id: 'q-ind-5-2',
        kelas: 'Kelas 5',
        subject: 'indonesia',
        bab: 'Sinonim & Antonim',
        difficulty: 'Mudah',
        question: 'Berdasarkan teks cerita, sifat tokoh Andi yang rajin dan tekun berantonim (berlawanan kata) dengan kata ...',
        image: null,
        options: [
            { id: 'A', text: 'Giat' },
            { id: 'B', text: 'Malas' },
            { id: 'C', text: 'Cerdas' },
            { id: 'D', text: 'Disiplin' }
        ],
        answerKey: 'B',
        explanation: 'Antonim atau lawan kata dari "rajin" adalah "malas".'
    },

    // IPAS KELAS 5
    {
        id: 'q-ipas-5-1',
        kelas: 'Kelas 5',
        subject: 'ipas',
        bab: 'Ekosistem & Fotosintesis',
        difficulty: 'Sedang',
        question: 'Tumbuhan hijau membuat makanannya sendiri melalui proses fotosintesis. Gas yang diserap tumbuhan dari udara saat fotosintesis berlangsung adalah ...',
        image: PHOTOSYNTHESIS_SVG,
        options: [
            { id: 'A', text: 'Oksigen' },
            { id: 'B', text: 'Karbondioksida' },
            { id: 'C', text: 'Nitrogen' },
            { id: 'D', text: 'Hidrogen' }
        ],
        answerKey: 'B',
        explanation: 'Dalam proses fotosintesis, tumbuhan menyerap gas Karbondioksida (CO₂) dan menghasilkan Oksigen (O₂).'
    },
    {
        id: 'q-ipas-5-2',
        kelas: 'Kelas 5',
        subject: 'ipas',
        bab: 'Rantai Makanan',
        difficulty: 'Mudah',
        question: 'Dalam rantai makanan di sawah: Padi ➔ Belalang ➔ Katak ➔ Ular ➔ Elang. Organisme yang bertindak sebagai Konsumen II adalah ...',
        image: null,
        options: [
            { id: 'A', text: 'Belalang' },
            { id: 'B', text: 'Katak' },
            { id: 'C', text: 'Ular' },
            { id: 'D', text: 'Padi' }
        ],
        answerKey: 'B',
        explanation: 'Padi (Produsen) ➔ Belalang (Konsumen I) ➔ Katak (Konsumen II) ➔ Ular (Konsumen III).'
    },

    // PENDIDIKAN PANCASILA KELAS 5
    {
        id: 'q-pan-5-1',
        kelas: 'Kelas 5',
        subject: 'pancasila',
        bab: 'Sila-Sila Pancasila',
        difficulty: 'Mudah',
        question: 'Sikap saling menghargai pendapat orang lain saat bermusyawarah di kelas merupakan pengamalan Pancasila sila ke-...',
        image: null,
        options: [
            { id: 'A', text: 'Pertama' },
            { id: 'B', text: 'Kedua' },
            { id: 'C', text: 'Ketiga' },
            { id: 'D', text: 'Keempat' }
        ],
        answerKey: 'D',
        explanation: 'Musyawarah untuk mufakat dan menghargai pendapat adalah cerminan Sila ke-4 Pancasila (Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan).'
    },

    // PENDIDIKAN PANCASILA KELAS 2
    {
        id: 'q-pan-2-1',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Dasar Negara Pancasila',
        difficulty: 'Mudah',
        passage: null,
        question: 'Dasar negara Indonesia adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'UUD' },
            { id: 'B', text: 'Pancasila' },
            { id: 'C', text: 'Bhinneka Tunggal Ika' },
            { id: 'D', text: 'Garuda' }
        ],
        answerKey: 'B',
        explanation: 'Pancasila merupakan dasar falsafah dan landasan fundamental negara Indonesia.'
    },
    {
        id: 'q-pan-2-2',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Simbol Sila Pancasila',
        difficulty: 'Mudah',
        passage: null,
        question: 'Lambang sila pertama Pancasila adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'bintang' },
            { id: 'B', text: 'rantai' },
            { id: 'C', text: 'pohon beringin' },
            { id: 'D', text: 'kepala banteng' }
        ],
        answerKey: 'A',
        explanation: 'Simbol sila pertama Pancasila (Ketuhanan Yang Maha Esa) adalah Bintang emas bersegi lima.'
    },
    {
        id: 'q-pan-2-3',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Bunyi Sila Pancasila',
        difficulty: 'Mudah',
        passage: null,
        question: 'Bunyi sila pertama Pancasila adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Persatuan Indonesia' },
            { id: 'B', text: 'Kemanusiaan yang Adil dan Beradab' },
            { id: 'C', text: 'Ketuhanan Yang Maha Esa' },
            { id: 'D', text: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia' }
        ],
        answerKey: 'C',
        explanation: 'Bunyi sila pertama Pancasila adalah "Ketuhanan Yang Maha Esa".'
    },
    {
        id: 'q-pan-2-4',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Penerapan Sila Pancasila',
        difficulty: 'Mudah',
        passage: null,
        question: 'Contoh sikap sesuai sila pertama adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'berdoa sebelum belajar' },
            { id: 'B', text: 'bertengkar dengan teman' },
            { id: 'C', text: 'mengejek teman' },
            { id: 'D', text: 'mengambil barang teman' }
        ],
        answerKey: 'A',
        explanation: 'Berdoa sebelum dan sesudah beraktivitas adalah wujud pengamalan sila pertama (Ketuhanan Yang Maha Esa).'
    },
    {
        id: 'q-pan-2-5',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Toleransi Beragama',
        difficulty: 'Mudah',
        passage: null,
        question: 'Kita harus menghormati teman yang berbeda ....',
        image: null,
        options: [
            { id: 'A', text: 'makanan saja' },
            { id: 'B', text: 'agama' },
            { id: 'C', text: 'tinggi badan' },
            { id: 'D', text: 'warna sepatu' }
        ],
        answerKey: 'B',
        explanation: 'Saling menghormati perbedaan agama merupakan kewajiban setiap warga negara agar tercipta kerukunan.'
    },
    {
        id: 'q-pan-2-6',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Semboyan Bangsa Indonesia',
        difficulty: 'Mudah',
        passage: null,
        question: 'Semboyan bangsa Indonesia adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Tut Wuri Handayani' },
            { id: 'B', text: 'Merdeka atau Mati' },
            { id: 'C', text: 'Bhinneka Tunggal Ika' },
            { id: 'D', text: 'Indonesia Raya' }
        ],
        answerKey: 'C',
        explanation: 'Semboyan resmi bangsa Indonesia yang tertulis pada lambang Garuda Pancasila adalah Bhinneka Tunggal Ika.'
    },
    {
        id: 'q-pan-2-7',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Semboyan Bangsa Indonesia',
        difficulty: 'Mudah',
        passage: null,
        question: 'Arti Bhinneka Tunggal Ika adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'berbeda-beda tetapi tetap satu' },
            { id: 'B', text: 'hidup sendiri-sendiri' },
            { id: 'C', text: 'semua harus sama' },
            { id: 'D', text: 'bersatu karena sama' }
        ],
        answerKey: 'A',
        explanation: 'Bhinneka Tunggal Ika berasal dari bahasa Jawa Kuno yang berarti "Berbeda-beda tetapi tetap satu jua".'
    },
    {
        id: 'q-pan-2-8',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Keragaman Suku & Budaya',
        difficulty: 'Mudah',
        passage: null,
        question: 'Jika teman berbeda suku dengan kita, sikap kita sebaiknya ....',
        image: null,
        options: [
            { id: 'A', text: 'menjauhinya' },
            { id: 'B', text: 'mengejeknya' },
            { id: 'C', text: 'menghormatinya' },
            { id: 'D', text: 'memusuhinya' }
        ],
        answerKey: 'C',
        explanation: 'Kita harus menghormati dan berteman dengan siapa saja tanpa membedakan latar belakang suku bangsa.'
    },
    {
        id: 'q-pan-2-9',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Aturan di Sekolah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Sebelum masuk kelas, kita harus ....',
        image: null,
        options: [
            { id: 'A', text: 'berlari-lari' },
            { id: 'B', text: 'mengikuti aturan sekolah' },
            { id: 'C', text: 'berteriak' },
            { id: 'D', text: 'mengganggu teman' }
        ],
        answerKey: 'B',
        explanation: 'Sebelum masuk kelas (seperti berbaris dengan tertib), kita harus mematuhi aturan dan tata tertib sekolah.'
    },
    {
        id: 'q-pan-2-10',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Aturan di Sekolah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Contoh aturan di sekolah adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'datang tepat waktu' },
            { id: 'B', text: 'membuang sampah sembarangan' },
            { id: 'C', text: 'berlari di dalam kelas' },
            { id: 'D', text: 'berbicara saat guru menjelaskan' }
        ],
        answerKey: 'A',
        explanation: 'Datang ke sekolah tepat waktu sebelum bel masuk berbunyi adalah contoh disiplin terhadap tata tertib sekolah.'
    },
    {
        id: 'q-pan-2-11',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Tanggung Jawab & Disiplin',
        difficulty: 'Mudah',
        passage: null,
        question: 'Jika melanggar aturan, kita harus ....',
        image: null,
        options: [
            { id: 'A', text: 'melarikan diri' },
            { id: 'B', text: 'menyalahkan teman' },
            { id: 'C', text: 'bertanggung jawab' },
            { id: 'D', text: 'tertawa' }
        ],
        answerKey: 'C',
        explanation: 'Ketika melakukan kesalahan atau melanggar aturan, sikap yang terpuji adalah berani mengakui dan bertanggung jawab.'
    },
    {
        id: 'q-pan-2-12',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Hak & Kewajiban di Sekolah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Kewajiban seorang siswa di sekolah adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'mendapat nilai' },
            { id: 'B', text: 'belajar dengan rajin' },
            { id: 'C', text: 'mendapat hadiah' },
            { id: 'D', text: 'bermain setiap saat' }
        ],
        answerKey: 'B',
        explanation: 'Kewajiban utama peserta didik di sekolah adalah menuntut ilmu dan belajar dengan sungguh-sungguh.'
    },
    {
        id: 'q-pan-2-13',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Hak & Kewajiban di Sekolah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Salah satu hak siswa di sekolah adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'mendapat pelajaran' },
            { id: 'B', text: 'mengotori kelas' },
            { id: 'C', text: 'mengganggu teman' },
            { id: 'D', text: 'melanggar aturan' }
        ],
        answerKey: 'A',
        explanation: 'Mendapatkan bimbingan dan pengajaran dari guru adalah salah satu hak utama siswa di sekolah.'
    },
    {
        id: 'q-pan-2-14',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Gotong Royong & Kerja Sama',
        difficulty: 'Mudah',
        passage: null,
        question: 'Membersihkan kelas bersama-sama merupakan contoh ....',
        image: null,
        options: [
            { id: 'A', text: 'persaingan' },
            { id: 'B', text: 'gotong royong' },
            { id: 'C', text: 'pertengkaran' },
            { id: 'D', text: 'permusuhan' }
        ],
        answerKey: 'B',
        explanation: 'Piket kelas dan kerja bakti bersama teman merupakan contoh penerapan gotong royong di lingkungan sekolah.'
    },
    {
        id: 'q-pan-2-15',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Gotong Royong & Kerja Sama',
        difficulty: 'Mudah',
        passage: null,
        question: 'Ketika melakukan kerja kelompok, kita sebaiknya ....',
        image: null,
        options: [
            { id: 'A', text: 'bekerja sendiri' },
            { id: 'B', text: 'menyuruh teman saja' },
            { id: 'C', text: 'bekerja sama' },
            { id: 'D', text: 'bermalas-malasan' }
        ],
        answerKey: 'C',
        explanation: 'Tugas kelompok dapat selesai dengan baik dan cepat jika semua anggota saling bekerja sama dan berpartisipasi.'
    },
    {
        id: 'q-pan-2-16',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Tolong Menolong',
        difficulty: 'Mudah',
        passage: null,
        question: 'Jika melihat teman kesulitan membawa buku, sebaiknya kita ....',
        image: null,
        options: [
            { id: 'A', text: 'menertawakannya' },
            { id: 'B', text: 'membantunya' },
            { id: 'C', text: 'meninggalkannya' },
            { id: 'D', text: 'mengambil bukunya' }
        ],
        answerKey: 'B',
        explanation: 'Membantu teman yang sedang mengalami kesulitan adalah cerminan sikap peduli dan tolong-menolong.'
    },
    {
        id: 'q-pan-2-17',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Adab & Sopan Santun',
        difficulty: 'Mudah',
        passage: null,
        question: 'Ketika teman sedang berbicara, kita sebaiknya ....',
        image: null,
        options: [
            { id: 'A', text: 'mendengarkan' },
            { id: 'B', text: 'berteriak' },
            { id: 'C', text: 'memotong pembicaraan' },
            { id: 'D', text: 'pergi begitu saja' }
        ],
        answerKey: 'A',
        explanation: 'Mendengarkan dengan penuh perhatian ketika orang lain sedang berbicara merupakan sikap santun dan menghargai orang lain.'
    },
    {
        id: 'q-pan-2-18',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Sikap Jujur & Rendah Hati',
        difficulty: 'Mudah',
        passage: null,
        question: 'Jika kita melakukan kesalahan kepada teman, sebaiknya ....',
        image: null,
        options: [
            { id: 'A', text: 'berbohong' },
            { id: 'B', text: 'meminta maaf' },
            { id: 'C', text: 'menyalahkan teman' },
            { id: 'D', text: 'marah' }
        ],
        answerKey: 'B',
        explanation: 'Meminta maaf dengan tulus saat melakukan kesalahan menjaga persahabatan tetap harmonis dan rukun.'
    },
    {
        id: 'q-pan-2-19',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Hidup Rukun di Rumah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Contoh hidup rukun di rumah adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'bertengkar dengan saudara' },
            { id: 'B', text: 'membantu orang tua' },
            { id: 'C', text: 'merebut mainan' },
            { id: 'D', text: 'tidak mau berbagi' }
        ],
        answerKey: 'B',
        explanation: 'Membantu pekerjaan orang tua di rumah menciptakan suasana keluarga yang rukun dan bahagia.'
    },
    {
        id: 'q-pan-2-20',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Bermain Rukun & Sportif',
        difficulty: 'Mudah',
        passage: null,
        question: 'Saat bermain bersama teman, kita harus ....',
        image: null,
        options: [
            { id: 'A', text: 'mau menang sendiri' },
            { id: 'B', text: 'mengikuti aturan permainan' },
            { id: 'C', text: 'curang' },
            { id: 'D', text: 'marah jika kalah' }
        ],
        answerKey: 'B',
        explanation: 'Mematuhi peraturan permainan membuat permainan berlangsung adil, tertib, dan menyenangkan.'
    },
    {
        id: 'q-pan-2-21',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Menghargai Prestasi Teman',
        difficulty: 'Mudah',
        passage: null,
        question: 'Jika teman mendapatkan juara, sikap kita sebaiknya ....',
        image: null,
        options: [
            { id: 'A', text: 'iri' },
            { id: 'B', text: 'mengejek' },
            { id: 'C', text: 'memberi selamat' },
            { id: 'D', text: 'marah' }
        ],
        answerKey: 'C',
        explanation: 'Memberikan ucapan selamat kepada teman yang berprestasi menunjukkan sikap berjiwa besar dan ikut senang atas kebahagiaan teman.'
    },
    {
        id: 'q-pan-2-22',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Sikap Adil (Sila Kelima)',
        difficulty: 'Mudah',
        passage: null,
        question: 'Contoh sikap adil adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'membagi makanan sama rata' },
            { id: 'B', text: 'mengambil semua makanan' },
            { id: 'C', text: 'memilih teman tertentu' },
            { id: 'D', text: 'tidak mau berbagi' }
        ],
        answerKey: 'A',
        explanation: 'Membagi makanan atau barang secara merata tanpa pilih kasih adalah contoh nyata dari perilaku adil.'
    },
    {
        id: 'q-pan-2-23',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Kepedulian Sosial',
        difficulty: 'Mudah',
        passage: null,
        question: 'Menolong teman tanpa membeda-bedakan merupakan sikap ....',
        image: null,
        options: [
            { id: 'A', text: 'sombong' },
            { id: 'B', text: 'peduli' },
            { id: 'C', text: 'malas' },
            { id: 'D', text: 'iri' }
        ],
        answerKey: 'B',
        explanation: 'Menolong siapapun yang membutuhkan pertolongan dengan ikhlas mencerminkan rasa kepedulian yang tinggi.'
    },
    {
        id: 'q-pan-2-24',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Musyawarah Mufakat',
        difficulty: 'Mudah',
        passage: null,
        question: 'Ketika musyawarah, setiap orang boleh ....',
        image: null,
        options: [
            { id: 'A', text: 'memaksakan kehendak' },
            { id: 'B', text: 'menyampaikan pendapat' },
            { id: 'C', text: 'marah-marah' },
            { id: 'D', text: 'meninggalkan kelompok' }
        ],
        answerKey: 'B',
        explanation: 'Dalam musyawarah untuk mufakat, setiap peserta memiliki hak yang sama untuk mengemukakan pendapatnya dengan sopan.'
    },
    {
        id: 'q-pan-2-25',
        kelas: 'Kelas 2',
        subject: 'pancasila',
        bab: 'Musyawarah Mufakat',
        difficulty: 'Mudah',
        passage: null,
        question: 'Hasil musyawarah harus kita ....',
        image: null,
        options: [
            { id: 'A', text: 'tolak' },
            { id: 'B', text: 'lupakan' },
            { id: 'C', text: 'hormati dan laksanakan' },
            { id: 'D', text: 'abaikan' }
        ],
        answerKey: 'C',
        explanation: 'Keputusan bersama yang dicapai melalui musyawarah wajib dihormati dan dilaksanakan dengan penuh rasa tanggung jawab.'
    },

    // BAHASA INGGRIS KELAS 5
    {
        id: 'q-ing-5-1',
        kelas: 'Kelas 5',
        subject: 'inggris',
        bab: 'Daily Vocabulary & Grammar',
        difficulty: 'Mudah',
        question: 'Complete the sentence: "My sister usually ...... to school by bicycle every morning."',
        image: null,
        options: [
            { id: 'A', text: 'go' },
            { id: 'B', text: 'goes' },
            { id: 'C', text: 'went' },
            { id: 'D', text: 'going' }
        ],
        answerKey: 'B',
        explanation: 'Subjek "My sister" adalah orang ketiga tunggal (She), sehingga verb dalam Simple Present Tense menggunakan akhiran -es (goes).'
    },
    // BAHASA INDONESIA SOAL BERWACANA / CERITA (KELAS 2)
    {
        id: 'q-bind-2-1',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Membaca Cerita / Wacana',
        difficulty: 'Mudah',
        passage: 'Cerita berikut untuk soal nomor 1–5.\n\nNiko dan Arif mendapat PR Bahasa Indonesia dari Bu Guru.\n\nMereka mengerjakan PR tersebut di rumah Niko.\n\nMereka merasa kesulitan dalam mengerjakan PR itu.\n\nKemudian, Niko minta tolong kepada kakaknya.\n\nKakak Niko bernama Nina.\n\nNina membantu Niko dan Arif dengan senang hati.\n\nAkhirnya mereka bisa mengerjakan PR itu.\n\nMereka pun berterima kasih kepada Kak Nina.',
        question: 'Siapa yang membantu Niko mengerjakan PR?',
        image: null,
        options: [
            { id: 'A', text: 'Kak Arif.' },
            { id: 'B', text: 'Kak Nina.' },
            { id: 'C', text: 'Bu guru.' }
        ],
        answerKey: 'B',
        explanation: 'Berdasarkan cerita di atas, Nina (kakak Niko) membantu Niko dan Arif mengerjakan PR dengan senang hati.'
    },
    {
        id: 'q-bind-2-2',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Membaca Cerita / Wacana',
        difficulty: 'Mudah',
        passage: 'Cerita berikut untuk soal nomor 1–5.\n\nNiko dan Arif mendapat PR Bahasa Indonesia dari Bu Guru.\n\nMereka mengerjakan PR tersebut di rumah Niko.\n\nMereka merasa kesulitan dalam mengerjakan PR itu.\n\nKemudian, Niko minta tolong kepada kakaknya.\n\nKakak Niko bernama Nina.\n\nNina membantu Niko dan Arif dengan senang hati.\n\nAkhirnya mereka bisa mengerjakan PR itu.\n\nMereka pun berterima kasih kepada Kak Nina.',
        question: 'Bagaimana perasaan Kak Nina ketika diminta untuk membantu mengerjakan PR?',
        image: null,
        options: [
            { id: 'A', text: 'Marah.' },
            { id: 'B', text: 'Senang.' },
            { id: 'C', text: 'Bingung.' }
        ],
        answerKey: 'B',
        explanation: 'Di dalam teks cerita disebutkan bahwa "Nina membantu Niko dan Arif dengan senang hati".'
    },
    {
        id: 'q-bind-2-3',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Membaca Cerita / Wacana',
        difficulty: 'Mudah',
        passage: 'Cerita berikut untuk soal nomor 1–5.\n\nNiko dan Arif mendapat PR Bahasa Indonesia dari Bu Guru.\n\nMereka mengerjakan PR tersebut di rumah Niko.\n\nMereka merasa kesulitan dalam mengerjakan PR itu.\n\nKemudian, Niko minta tolong kepada kakaknya.\n\nKakak Niko bernama Nina.\n\nNina membantu Niko dan Arif dengan senang hati.\n\nAkhirnya mereka bisa mengerjakan PR itu.\n\nMereka pun berterima kasih kepada Kak Nina.',
        question: 'Di mana Niko dan Arif mengerjakan PR?',
        image: null,
        options: [
            { id: 'A', text: 'Di sekolah.' },
            { id: 'B', text: 'Di rumah Niko.' },
            { id: 'C', text: 'Di rumah Arif.' }
        ],
        answerKey: 'B',
        explanation: 'Kalimat kedua cerita menjelaskan "Mereka mengerjakan PR tersebut di rumah Niko".'
    },
    {
        id: 'q-bind-2-4',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Membaca Cerita / Wacana',
        difficulty: 'Mudah',
        passage: 'Cerita berikut untuk soal nomor 1–5.\n\nNiko dan Arif mendapat PR Bahasa Indonesia dari Bu Guru.\n\nMereka mengerjakan PR tersebut di rumah Niko.\n\nMereka merasa kesulitan dalam mengerjakan PR itu.\n\nKemudian, Niko minta tolong kepada kakaknya.\n\nKakak Niko bernama Nina.\n\nNina membantu Niko dan Arif dengan senang hati.\n\nAkhirnya mereka bisa mengerjakan PR itu.\n\nMereka pun berterima kasih kepada Kak Nina.',
        question: 'Apa yang dilakukan Niko dan Arif ketika sudah bisa mengerjakan PR?',
        image: null,
        options: [
            { id: 'A', text: 'Berterima kasih kepada Kak Nina.' },
            { id: 'B', text: 'Meminta Kak Nina selalu mengajarinya.' },
            { id: 'C', text: 'Menyuruh Kak Nina menemui Bu Guru.' }
        ],
        answerKey: 'A',
        explanation: 'Kalimat terakhir cerita menyebutkan "Mereka pun berterima kasih kepada Kak Nina".'
    },
    {
        id: 'q-bind-2-5',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Membaca Cerita / Wacana',
        difficulty: 'Mudah',
        passage: 'Cerita berikut untuk soal nomor 1–5.\n\nNiko dan Arif mendapat PR Bahasa Indonesia dari Bu Guru.\n\nMereka mengerjakan PR tersebut di rumah Niko.\n\nMereka merasa kesulitan dalam mengerjakan PR itu.\n\nKemudian, Niko minta tolong kepada kakaknya.\n\nKakak Niko bernama Nina.\n\nNina membantu Niko dan Arif dengan senang hati.\n\nAkhirnya mereka bisa mengerjakan PR itu.\n\nMereka pun berterima kasih kepada Kak Nina.',
        question: 'Apa PR yang diberikan Bu guru kepada Niko dan Arif?',
        image: null,
        options: [
            { id: 'A', text: 'Matematika.' },
            { id: 'B', text: 'Bahasa Inggris.' },
            { id: 'C', text: 'Bahasa Indonesia.' }
        ],
        answerKey: 'C',
        explanation: 'Kalimat pertama cerita menyebutkan "Niko dan Arif mendapat PR Bahasa Indonesia dari Bu Guru".'
    },
    {
        id: 'q-bind-2-6',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Membaca Puisi',
        difficulty: 'Mudah',
        passage: 'Puisi berikut untuk soal nomor 6–9.\n\nTaman Bunga\n\nMawar yang cantik [....]\nMelati yang putih mewangi\nAnggrek yang tumbuh ceria\nDan aster yang warna-warni\nOh taman bungaku\nIndah mewangi setiap hari\nMembuat hati selalu berseri\nKebahagiaan darimu\nKubalas dengan merawatmu',
        question: 'Ekspresi yang sesuai dengan puisi tersebut adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'sedih' },
            { id: 'B', text: 'senang' },
            { id: 'C', text: 'kaget' }
        ],
        answerKey: 'B',
        explanation: 'Puisi "Taman Bunga" menggambarkan kegembiraan terhadap indahnya taman bunga (hati selalu berseri), sehingga ekspresi yang sesuai adalah senang.'
    },
    {
        id: 'q-bind-2-7',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Membaca Puisi',
        difficulty: 'Mudah',
        passage: 'Puisi berikut untuk soal nomor 6–9.\n\nTaman Bunga\n\nMawar yang cantik [....]\nMelati yang putih mewangi\nAnggrek yang tumbuh ceria\nDan aster yang warna-warni\nOh taman bungaku\nIndah mewangi setiap hari\nMembuat hati selalu berseri\nKebahagiaan darimu\nKubalas dengan merawatmu',
        question: 'Tema puisi tersebut adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'keindahan' },
            { id: 'B', text: 'pendidikan' },
            { id: 'C', text: 'kebudayaan' }
        ],
        answerKey: 'A',
        explanation: 'Puisi tersebut menceritakan keindahan berbagai bunga di taman seperti mawar, melati, anggrek, dan aster.'
    },
    {
        id: 'q-bind-2-8',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Membaca Puisi',
        difficulty: 'Mudah',
        passage: 'Puisi berikut untuk soal nomor 6–9.\n\nTaman Bunga\n\nMawar yang cantik [....]\nMelati yang putih mewangi\nAnggrek yang tumbuh ceria\nDan aster yang warna-warni\nOh taman bungaku\nIndah mewangi setiap hari\nMembuat hati selalu berseri\nKebahagiaan darimu\nKubalas dengan merawatmu',
        question: 'Kata yang tepat untuk melengkapi puisi tersebut adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'layu' },
            { id: 'B', text: 'merona' },
            { id: 'C', text: 'sayu' }
        ],
        answerKey: 'B',
        explanation: 'Kalimat "Mawar yang cantik merona" sangat tepat untuk melengkapi bagian rumpang larik pertama puisi.'
    },
    {
        id: 'q-bind-2-9',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Membaca Puisi',
        difficulty: 'Mudah',
        passage: 'Puisi berikut untuk soal nomor 6–9.\n\nTaman Bunga\n\nMawar yang cantik [....]\nMelati yang putih mewangi\nAnggrek yang tumbuh ceria\nDan aster yang warna-warni\nOh taman bungaku\nIndah mewangi setiap hari\nMembuat hati selalu berseri\nKebahagiaan darimu\nKubalas dengan merawatmu',
        question: 'Arti kata "berseri" pada puisi tersebut adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'cantik' },
            { id: 'B', text: 'bahagia' },
            { id: 'C', text: 'indah' }
        ],
        answerKey: 'B',
        explanation: 'Kata "berseri" dalam kalimat "Membuat hati selalu berseri" bermakna gembira atau bahagia.'
    },
    {
        id: 'q-bind-2-23',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Ungkapan Perasaan & Emosi',
        difficulty: 'Mudah',
        passage: null,
        question: 'Berikut ini merupakan penyebab munculnya perasaan sedih, yaitu ....',
        image: null,
        options: [
            { id: 'A', text: 'mendapat juara kelas' },
            { id: 'B', text: 'hewan kesayangannya mati' },
            { id: 'C', text: 'sahabatnya pindah sekolah' }
        ],
        answerKey: 'B',
        explanation: 'Kehilangan hewan kesayangan yang mati atau ditinggal sahabat dapat menimbulkan perasaan sedih. Pilihan B merupakan salah satu penyebab utama rasa sedih.'
    },
    {
        id: 'q-bind-2-24',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Tanda Baca & Tanda Titik',
        difficulty: 'Mudah',
        passage: null,
        question: 'Kalimat berikut yang diakhiri dengan tanda titik adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Alin pergi ke puncak' },
            { id: 'B', text: 'Di mana rumahmu' },
            { id: 'C', text: 'Kakak sudah sampai rumah' }
        ],
        answerKey: 'C',
        explanation: 'Kalimat berita / pernyataan diakhiri dengan tanda titik (.) seperti "Kakak sudah sampai rumah.", sedangkan kalimat tanya "Di mana rumahmu" diakhiri tanda tanya (?).'
    },
    {
        id: 'q-bind-2-25',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Huruf Kapital & Ejaan',
        difficulty: 'Mudah',
        passage: null,
        question: 'Penggunaan huruf kapital yang tepat terdapat pada kalimat ....',
        image: null,
        options: [
            { id: 'A', text: 'Ayah pergi ke rumah Pak Beni.' },
            { id: 'B', text: 'Linda dan keluarganya berlibur di Bali.' },
            { id: 'C', text: 'Kakak akan pergi ke Pantai.' }
        ],
        answerKey: 'A',
        explanation: 'Huruf kapital digunakan di awal kalimat, nama sapaan (Pak Beni), serta nama geografi/tempat (Bali). Pilihan A dan B menerapkan ejaan kapital secara benar.'
    },
    {
        id: 'q-bind-2-26',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Kalimat Tanya',
        difficulty: 'Mudah',
        passage: null,
        question: 'Berikut ini yang merupakan kalimat tanya adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Siapa yang mengantarmu pergi sekolah?' },
            { id: 'B', text: 'Apakah ayahmu sudah pulang?' },
            { id: 'C', text: 'Tolong bantu aku membawa buku ini?' }
        ],
        answerKey: 'A',
        explanation: 'Kalimat tanya menggunakan kata tanya seperti "Siapa" atau "Apakah" dan diakhiri tanda tanya. "Siapa yang mengantarmu pergi sekolah?" adalah contoh kalimat tanya yang tepat.'
    },
    {
        id: 'q-bind-2-27',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Kata Tanya & Waktu',
        difficulty: 'Mudah',
        passage: null,
        question: 'Kalimat berikut yang menanyakan waktu adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Kapan kamu akan pergi ke rumah nenek?' },
            { id: 'B', text: 'Siapa yang akan menemanimu pergi ke rumah nenek?' },
            { id: 'C', text: 'Kapan rumah nenekmu kebanjiran?' }
        ],
        answerKey: 'A',
        explanation: 'Kata tanya "Kapan" berfungsi untuk menanyakan waktu. Kalimat "Kapan kamu akan pergi ke rumah nenek?" menanyakan waktu keberangkatan.'
    },
    {
        id: 'q-bind-2-14',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Kata Tanya & Tempat',
        difficulty: 'Mudah',
        passage: null,
        question: 'Kalimat berikut yang menanyakan tempat adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Apa nama desa Nenek?' },
            { id: 'B', text: 'Di mana letak desa Nenek?' },
            { id: 'C', text: 'Bagaimana desa Nenek?' }
        ],
        answerKey: 'B',
        explanation: 'Kata tanya "Di mana" digunakan untuk menanyakan lokasi atau tempat ("Di mana letak desa Nenek?").'
    },
    {
        id: 'q-bind-2-15',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Struktur Kalimat (S-P-O)',
        difficulty: 'Mudah',
        passage: null,
        question: 'Perhatikan kalimat berikut!\n\nPaman membeli jagung rebus.\n\nPredikat pada kalimat tersebut adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'paman' },
            { id: 'B', text: 'membeli' },
            { id: 'C', text: 'jagung rebus' }
        ],
        answerKey: 'B',
        explanation: 'Dalam susunan kalimat Paman (Subjek) + membeli (Predikat) + jagung rebus (Objek), kata kerja "membeli" bertindak sebagai Predikat.'
    },
    {
        id: 'q-bind-2-16',
        kelas: 'Kelas 2',
        subject: 'indonesia',
        bab: 'Kata Tanya & Keadaan',
        difficulty: 'Mudah',
        passage: null,
        question: 'Perhatikan kalimat berikut!\n\n[...] keadaanmu sekarang?\n\nKata tanya untuk melengkapi kalimat tersebut adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'bagaimana' },
            { id: 'B', text: 'mengapa' },
            { id: 'C', text: 'di mana' }
        ],
        answerKey: 'A',
        explanation: 'Kata tanya "Bagaimana" digunakan untuk menanyakan keadaan, situasi, atau kabar ("Bagaimana keadaanmu sekarang?").'
    },
    {
        id: 'q-ing-2-7',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Daily Habits & Expressions',
        difficulty: 'Mudah',
        passage: null,
        question: 'Before eating, Muslims say ....',
        image: null,
        options: [
            { id: 'A', text: 'Bismillah' },
            { id: 'B', text: 'Goodbye' },
            { id: 'C', text: 'Thank you' }
        ],
        answerKey: 'A',
        explanation: 'Sebelum makan, umat Islam mengucapkan Bismillah ("Before eating, Muslims say Bismillah").'
    },
    {
        id: 'q-ing-2-8',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Cleanliness & Environment',
        difficulty: 'Mudah',
        passage: null,
        question: 'We throw rubbish into the ....',
        image: null,
        options: [
            { id: 'A', text: 'river' },
            { id: 'B', text: 'trash bin' },
            { id: 'C', text: 'road' }
        ],
        answerKey: 'B',
        explanation: 'Trash bin artinya tempat sampah. Sampah harus dibuang ke tempat sampah ("We throw rubbish into the trash bin").'
    },
    {
        id: 'q-ing-2-9',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Family Members',
        difficulty: 'Mudah',
        passage: null,
        question: 'My father and my mother are my ....',
        image: null,
        options: [
            { id: 'A', text: 'friends' },
            { id: 'B', text: 'parents' },
            { id: 'C', text: 'cousins' }
        ],
        answerKey: 'B',
        explanation: 'Father (ayah) dan mother (ibu) disebut parents (orang tua).'
    },
    {
        id: 'q-ing-2-10',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Adjectives & Opposites',
        difficulty: 'Mudah',
        passage: null,
        question: 'The opposite of "big" is ....',
        image: null,
        options: [
            { id: 'A', text: 'small' },
            { id: 'B', text: 'long' },
            { id: 'C', text: 'tall' }
        ],
        answerKey: 'A',
        explanation: 'Opposite artinya lawan kata. Lawan kata dari "big" (besar) adalah "small" (kecil).'
    },
    {
        id: 'q-ing-2-11',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Good Manners & Respect',
        difficulty: 'Mudah',
        passage: null,
        question: 'We should [....] our teacher.',
        image: null,
        options: [
            { id: 'A', text: 'respect' },
            { id: 'B', text: 'fight' },
            { id: 'C', text: 'ignore' }
        ],
        answerKey: 'A',
        explanation: 'Respect artinya menghormati. Kita harus menghormati guru kita ("We should respect our teacher").'
    },
    {
        id: 'q-ing-2-12',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Fruits & Vocabulary',
        difficulty: 'Mudah',
        passage: null,
        question: 'Which one is a fruit?',
        image: null,
        options: [
            { id: 'A', text: 'banana' },
            { id: 'B', text: 'chair' },
            { id: 'C', text: 'pencil' }
        ],
        answerKey: 'A',
        explanation: 'Banana (pisang) adalah jenis buah-buahan (fruit).'
    },
    {
        id: 'q-ing-2-13',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Colors & National Flag',
        difficulty: 'Mudah',
        passage: null,
        question: 'The Indonesian flag is ....',
        image: null,
        options: [
            { id: 'A', text: 'red and white' },
            { id: 'B', text: 'blue and yellow' },
            { id: 'C', text: 'green and white' }
        ],
        answerKey: 'A',
        explanation: 'Bendera negara Indonesia berwarna merah dan putih (red and white).'
    },
    // --- AKIDAH AKHLAK ---
    {
        id: 'q-akidah-5-1',
        kelas: 'Kelas 5',
        subject: 'akidah_akhlak',
        bab: 'Kalimat Tayyibah & Asmaul Husna',
        difficulty: 'Mudah',
        passage: null,
        question: 'Kalimat tayyibah "Subhanallah" diucapkan ketika melihat keindahan ciptaan Allah SWT. Arti dari kalimat tayyibah "Subhanallah" adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Maha Suci Allah' },
            { id: 'B', text: 'Maha Besar Allah' },
            { id: 'C', text: 'Segala Puji Bagi Allah' },
            { id: 'D', text: 'Maha Pengasih Lagi Maha Penyayang' }
        ],
        answerKey: 'A',
        explanation: 'Kalimat tayyibah "Subhanallah" (Tasbih) memiliki arti "Maha Suci Allah".'
    },
    {
        id: 'q-akidah-5-2',
        kelas: 'Kelas 5',
        subject: 'akidah_akhlak',
        bab: 'Akhlak Terpuji',
        difficulty: 'Sedang',
        passage: null,
        question: 'Sikap selalu berkata jujur dan terbuka sesuai dengan keadaan yang sebenarnya dinamakan akhlak ....',
        image: null,
        options: [
            { id: 'A', text: 'Siddiq (Jujur)' },
            { id: 'B', text: 'Amanah (Dapat Dipercaya)' },
            { id: 'C', text: 'Tabligh (Menyampaikan)' },
            { id: 'D', text: 'Fathanah (Cerdas)' }
        ],
        answerKey: 'A',
        explanation: 'Siddiq artinya benar atau jujur, yaitu kesesuaian antara perkataan dan perbuatan.'
    },

    // --- FIQIH ---
    {
        id: 'q-fiqih-2-1',
        kelas: 'Kelas 2',
        subject: 'fiqih',
        bab: 'Rukun Islam & Salat Wajib',
        difficulty: 'Mudah',
        passage: null,
        question: 'Jumlah salat fardhu (wajib) yang dikerjakan oleh umat Islam dalam sehari semalam adalah ....',
        image: null,
        options: [
            { id: 'A', text: '3 waktu' },
            { id: 'B', text: '5 waktu' },
            { id: 'C', text: '7 waktu' }
        ],
        answerKey: 'B',
        explanation: 'Salat wajib bagi umat Islam terdiri dari 5 waktu yaitu Subuh, Zuhur, Asar, Magrib, dan Isya.'
    },
    {
        id: 'q-fiqih-3-1',
        kelas: 'Kelas 3',
        subject: 'fiqih',
        bab: 'Syarat & Rukun Salat',
        difficulty: 'Mudah',
        passage: null,
        question: 'Menutup aurat dan suci dari hadas kecil maupun besar merupakan ....',
        image: null,
        options: [
            { id: 'A', text: 'Syarat Sah Salat' },
            { id: 'B', text: 'Sunah Salat' },
            { id: 'C', text: 'Batal Salat' }
        ],
        answerKey: 'A',
        explanation: 'Syarat sah salat adalah hal-hal yang harus dipenuhi sebelum melaksanakan salat, seperti suci dari hadas dan menutup aurat.'
    },
    {
        id: 'q-fiqih-4-1',
        kelas: 'Kelas 4',
        subject: 'fiqih',
        bab: 'Bersuci (Tayamum)',
        difficulty: 'Sedang',
        passage: null,
        question: 'Bersuci menggunakan debu yang suci sebagai pengganti wudu ketika tidak ada air disebut ....',
        image: null,
        options: [
            { id: 'A', text: 'Mandi Wajib' },
            { id: 'B', text: 'Tayamum' },
            { id: 'C', text: 'Istinja' },
            { id: 'D', text: 'Wudu' }
        ],
        answerKey: 'B',
        explanation: 'Tayamum adalah keringanan bersuci menggunakan debu yang suci apabila tidak ditemukan air atau sedang sakit.'
    },
    {
        id: 'q-fiqih-5-1',
        kelas: 'Kelas 5',
        subject: 'fiqih',
        bab: 'Thaharah & Salat',
        difficulty: 'Mudah',
        passage: null,
        question: 'Rukun wudu yang pertama adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Membasuh Muka' },
            { id: 'B', text: 'Niat' },
            { id: 'C', text: 'Membasuh Kedua Tangan' },
            { id: 'D', text: 'Mengusap Kepala' }
        ],
        answerKey: 'B',
        explanation: 'Rukun wudu berurutan dimulai dari niat, membasuh muka, membasuh kedua tangan hingga siku, mengusap sebagian kepala, membasuh kedua kaki hingga mata kaki, dan tertib.'
    },
    {
        id: 'q-fiqih-5-2',
        kelas: 'Kelas 5',
        subject: 'fiqih',
        bab: 'Zakat & Sedekah',
        difficulty: 'Sedang',
        passage: null,
        question: 'Zakat yang wajib dikeluarkan oleh setiap jiwa umat Islam pada bulan Ramadan sebelum salat Idul Fitri adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Zakat Maal' },
            { id: 'B', text: 'Zakat Fitrah' },
            { id: 'C', text: 'Sedekah Subuh' },
            { id: 'D', text: 'Infaq Jiwa' }
        ],
        answerKey: 'B',
        explanation: 'Zakat Fitrah disyariatkan untuk menyucikan jiwa setiap Muslim dan ditunaikan di bulan Ramadan hingga sebelum salat Idul Fitri.'
    },
    {
        id: 'q-fiqih-6-1',
        kelas: 'Kelas 6',
        subject: 'fiqih',
        bab: 'Makanan & Minuman Halal',
        difficulty: 'Sedang',
        passage: null,
        question: 'Daging hewan yang sembelihannya tidak menyebut nama Allah SWT hukum mengonsumsinya adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Halal' },
            { id: 'B', text: 'Haram' },
            { id: 'C', text: 'Makruh' },
            { id: 'D', text: 'Mubah' }
        ],
        answerKey: 'B',
        explanation: 'Syarat kehalalan daging hewan sembelihan adalah disembelih dengan menyebut nama Allah SWT.'
    },

    // --- AL-QURAN HADIS ---
    {
        id: 'q-quran-5-1',
        kelas: 'Kelas 5',
        subject: 'quran_hadis',
        bab: 'Surah Pendek & Tajwid',
        difficulty: 'Mudah',
        passage: null,
        question: 'Surah Al-Ikhlas menjelaskan tentang ajaran ....',
        image: null,
        options: [
            { id: 'A', text: 'Tauhid (Keesaan Allah)' },
            { id: 'B', text: 'Hari Kiamat' },
            { id: 'C', text: 'Toleransi Beragama' },
            { id: 'D', text: 'Kisah Para Nabi' }
        ],
        answerKey: 'A',
        explanation: 'Surah Al-Ikhlas menegaskan kemurnian keesaan Allah SWT (Tauhid).'
    },
    {
        id: 'q-quran-5-2',
        kelas: 'Kelas 5',
        subject: 'quran_hadis',
        bab: 'Hadis Pilihan & Hukum Tajwid',
        difficulty: 'Sedang',
        passage: null,
        question: 'Hukum bacaan Nun Sukun (نْ) atau Tanwin (ً ٍ ٌ) apabila bertemu dengan huruf Alif (أ), Ha (هـ), \'Ain (ع), Ghain (غ), Ha (ح), Khaw (خ) disebut ....',
        image: null,
        options: [
            { id: 'A', text: 'Izhar Halqi' },
            { id: 'B', text: 'Idgham Bighunnah' },
            { id: 'C', text: 'Iqlab' },
            { id: 'D', text: 'Ikhfa Hakiki' }
        ],
        answerKey: 'A',
        explanation: 'Izhar Halqi dibaca jelas tanpa dengung ketika Nun Sukun/Tanwin bertemu salah satu dari 6 huruf tenggorokan (Halqi).'
    },
    {
        id: 'q-quran-2-1',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Menyambung Huruf Hijaiyah',
        difficulty: 'Mudah',
        passage: null,
        question: '“Nahārun” jika ditulis dengan huruf hijaiyah bersambung menjadi ....',
        image: null,
        options: [
            { id: 'A', text: 'نَهَرٌ' },
            { id: 'B', text: 'نَهَارٌ' },
            { id: 'C', text: 'نَاهِرٌ' }
        ],
        answerKey: 'B',
        explanation: 'Lafal “Nahārun” memiliki mad thabi\'i pada huruf ha (hā), sehingga ditulis نَهَارٌ dengan huruf alif setelah huruf ha.'
    },
    {
        id: 'q-quran-2-2',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Memisah Huruf Hijaiyah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Lafal صَعْبٌ bila dipisah penulisannya menjadi ....',
        image: null,
        options: [
            { id: 'A', text: 'ع ص ب' },
            { id: 'B', text: 'ص ب ع' },
            { id: 'C', text: 'ب ع ص' }
        ],
        answerKey: 'C',
        explanation: 'Lafal صَعْبٌ tersusun atas huruf ص – ع – ب. Jika dibaca dari kanan ke kiri urutannya adalah ص – ع – ب (pilihan C: ب ع ص).'
    },
    {
        id: 'q-quran-2-3',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Tanda Baca (Harakat)',
        difficulty: 'Mudah',
        passage: null,
        question: 'Huruf hamzah (ء) apabila berharakat dammah dibaca ....',
        image: null,
        options: [
            { id: 'A', text: 'a' },
            { id: 'B', text: 'i' },
            { id: 'C', text: 'u' }
        ],
        answerKey: 'C',
        explanation: 'Harakat dammah ( ُ ) berbunyi vokal \'u\'. Jadi huruf hamzah (ء) yang berharakat dammah dibaca \'u\'.'
    },
    {
        id: 'q-quran-2-4',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Membaca Kosakata Hijaiyah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Perhatikan gambar berikut!\n\nLafal huruf hijaiyah yang sesuai dengan gambar di atas adalah ....',
        image: BADGE_SVG,
        options: [
            { id: 'A', text: 'تَاجٌ' },
            { id: 'B', text: 'بَاغٌ' },
            { id: 'C', text: 'بَاجٌ' }
        ],
        answerKey: 'C',
        explanation: 'Gambar tersebut menunjukkan lencana/badge yang dalam bahasa Arab dilafalkan بَاجٌ (baaj).'
    },
    {
        id: 'q-quran-2-5',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Kaidah Menyambung Huruf',
        difficulty: 'Mudah',
        passage: null,
        question: 'Huruf ي tidak bisa digabung apabila sebelumnya huruf ....',
        image: null,
        options: [
            { id: 'A', text: 'jim' },
            { id: 'B', text: 'wawu' },
            { id: 'C', text: 'ba\'' }
        ],
        answerKey: 'B',
        explanation: 'Huruf wawu (و) adalah salah satu huruf yang tidak bisa menyambung dengan huruf setelahnya. Oleh karena itu huruf ي tidak bisa digabung jika didahului huruf wawu.'
    },
    {
        id: 'q-quran-2-6',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Mengenal Huruf Lam Alif',
        difficulty: 'Mudah',
        passage: null,
        question: 'Huruf لا disebut dengan huruf ....',
        image: null,
        options: [
            { id: 'A', text: 'Lam' },
            { id: 'B', text: 'alif' },
            { id: 'C', text: 'Lam alif' }
        ],
        answerKey: 'C',
        explanation: 'Huruf لا adalah perpaduan antara huruf Lam (ل) dan Alif (ا) yang disebut dengan huruf Lam Alif.'
    },
    {
        id: 'q-quran-2-7',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Tanda Baca (Harakat)',
        difficulty: 'Mudah',
        passage: null,
        question: 'Zainab menulis huruf mim. Huruf yang ia tulis dibaca “mi”. Huruf yang ditulis Zainab berharakat ....',
        image: null,
        options: [
            { id: 'A', text: 'fathah' },
            { id: 'B', text: 'kasrah' },
            { id: 'C', text: 'dammah' }
        ],
        answerKey: 'B',
        explanation: 'Harakat kasrah ( ِ ) menghasilkan bunyi vokal \'i\', sehingga huruf mim yang berharakat kasrah dibaca \'mi\' (مِ).'
    },
    {
        id: 'q-quran-2-8',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Bentuk Huruf Hijaiyah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Huruf ج di awal kata ditulis ....',
        image: null,
        options: [
            { id: 'A', text: 'جـ' },
            { id: 'B', text: 'ـج' },
            { id: 'C', text: 'ـجـ' }
        ],
        answerKey: 'A',
        explanation: 'Bentuk huruf jim (ج) ketika ditulis di awal kata adalah جـ (menyambung ke huruf setelahnya).'
    },
    {
        id: 'q-quran-2-9',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Mengenal Huruf Hijaiyah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Huruf hijaiyah berjumlah ....',
        image: null,
        options: [
            { id: 'A', text: '21' },
            { id: 'B', text: '25' },
            { id: 'C', text: '29' }
        ],
        answerKey: 'C',
        explanation: 'Jumlah huruf hijaiyah pokok dalam bahasa Arab adalah 29 huruf.'
    },
    {
        id: 'q-quran-2-10',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Bentuk Huruf Hijaiyah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Salah satu huruf hijaiyah yang memiliki bentuk tunggal adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'د' },
            { id: 'B', text: 'هـ' },
            { id: 'C', text: 'ل' }
        ],
        answerKey: 'A',
        explanation: 'Huruf dal (د) memiliki bentuk tunggal yang tidak berubah di awal kata dan tidak dapat menyambung ke huruf setelahnya.'
    },
    {
        id: 'q-quran-2-11',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Membaca Kosakata Hijaiyah',
        difficulty: 'Mudah',
        passage: null,
        question: 'بُوكٌ\n\nGambar yang sesuai dengan lafal di atas adalah ....',
        image: null,
        options: [
            { id: 'A', text: '📖 Buku' },
            { id: 'B', text: '🪑 Kursi' },
            { id: 'C', text: '🕐 Jam' }
        ],
        answerKey: 'A',
        explanation: 'Lafal بُوكٌ (buukun) berbunyi dan melambangkan buku, sehingga gambar yang sesuai adalah Buku.'
    },
    {
        id: 'q-quran-2-12',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Tanda Baca (Harakat)',
        difficulty: 'Mudah',
        passage: null,
        question: 'Aldi menulis huruf hijaiyah berharakat dammah.\nHuruf yang ditulis Aldi adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'مُ' },
            { id: 'B', text: 'طُ' },
            { id: 'C', text: 'نُ' }
        ],
        answerKey: 'A',
        explanation: 'Huruf yang berharakat dammah adalah مُ (mu).'
    },
    {
        id: 'q-quran-2-13',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Penulisan Al-Qur\'an',
        difficulty: 'Mudah',
        passage: null,
        question: 'Ayat-ayat yang ada di dalam Al-Qur’an ditulis dengan menggunakan huruf hijaiyah ....',
        image: null,
        options: [
            { id: 'A', text: 'pisah' },
            { id: 'B', text: 'bersambung' },
            { id: 'C', text: 'acak' }
        ],
        answerKey: 'B',
        explanation: 'Ayat-ayat suci di dalam mushaf Al-Qur’an ditulis dengan menggunakan huruf hijaiyah bersambung.'
    },
    {
        id: 'q-quran-2-14',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Membedah Huruf Hijaiyah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Kata يَنْفَعُ terdiri atas huruf ....',
        image: null,
        options: [
            { id: 'A', text: 'ya, nun, fa, ‘ain' },
            { id: 'B', text: 'ya, nun, qaf, ‘ain' },
            { id: 'C', text: 'ya, nun, qaf, gain' }
        ],
        answerKey: 'A',
        explanation: 'Lafal يَنْفَعُ tersusun dari huruf ya (ي), nun (ن), fa (ف), dan ‘ain (ع).'
    },
    {
        id: 'q-quran-2-15',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Membaca Huruf Hijaiyah Berharakat',
        difficulty: 'Mudah',
        passage: null,
        question: 'Lafal نُظِرَ cara membacanya ....',
        image: null,
        options: [
            { id: 'A', text: 'nuzira' },
            { id: 'B', text: 'nudira' },
            { id: 'C', text: 'nuẓira' }
        ],
        answerKey: 'C',
        explanation: 'Huruf nun berharakat dammah (nu), zha berharakat kasrah (ẓi), dan ra berharakat fathah (ra), dibaca nuẓira.'
    },
    {
        id: 'q-quran-2-16',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Bentuk Huruf Hijaiyah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Huruf hijaiyah yang tidak akan berubah bentuk meskipun di tengah, awal, dan akhir adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'س' },
            { id: 'B', text: 'ص' },
            { id: 'C', text: 'ر' }
        ],
        answerKey: 'C',
        explanation: 'Huruf Ra (ر) bentuk dasarnya tetap dan tidak berubah bentuk kepala/badannya di posisi awal, tengah, maupun akhir.'
    },
    {
        id: 'q-quran-2-17',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Membaca Kosakata Hijaiyah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Perhatikan gambar berikut!\n\nLafal huruf hijaiyah yang sesuai dengan gambar di atas adalah ....',
        image: SHRIMP_SVG,
        options: [
            { id: 'A', text: 'دَمَجٌ' },
            { id: 'B', text: 'جَمْجٌ' },
            { id: 'C', text: 'غَمْبٌ' }
        ],
        answerKey: 'C',
        explanation: 'Lafal huruf hijaiyah yang sesuai dengan ilustrasi gambar adalah غَمْبٌ.'
    },
    {
        id: 'q-quran-2-18',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Kaidah Menyambung Huruf Hijaiyah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Huruf hijaiyah yang tidak boleh disambung ke huruf sesudahnya berjumlah ....',
        image: null,
        options: [
            { id: 'A', text: 'lima' },
            { id: 'B', text: 'enam' },
            { id: 'C', text: 'tujuh' }
        ],
        answerKey: 'B',
        explanation: 'Ada 6 huruf hijaiyah yang tidak bisa menyambung ke huruf sesudahnya (hanya bisa disambung dari depan), yaitu: ا, د, ذ, ر, ز, و.'
    },
    {
        id: 'q-quran-2-19',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Hukum Bacaan Gunnah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Gunnah berarti mengeluarkan suara melalui ....',
        image: null,
        options: [
            { id: 'A', text: 'hidung' },
            { id: 'B', text: 'gusi' },
            { id: 'C', text: 'tenggorokan' }
        ],
        answerKey: 'A',
        explanation: 'Gunnah secara bahasa artinya dengung, yaitu suara merdu yang keluar dari pangkal hidung (al-khaisyum).'
    },
    {
        id: 'q-quran-2-20',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Hukum Bacaan Gunnah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Membaca bacaan gunnah adalah dengan mendengung dan ....',
        image: null,
        options: [
            { id: 'A', text: 'dilepaskan' },
            { id: 'B', text: 'dipantulkan' },
            { id: 'C', text: 'ditahan' }
        ],
        answerKey: 'C',
        explanation: 'Cara membaca gunnah adalah dengan mendengung dan ditahan sepanjang 2 harakat.'
    },
    {
        id: 'q-quran-2-21',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Huruf-Huruf Gunnah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Ada beberapa huruf hijaiyah yang termasuk dalam huruf gunnah. Huruf berikut yang termasuk huruf gunnah adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'ن' },
            { id: 'B', text: 'ل' },
            { id: 'C', text: 'ك' }
        ],
        answerKey: 'A',
        explanation: 'Huruf yang memiliki sifat gunnah pokok adalah huruf Nun (ن) dan Mim (م).'
    },
    {
        id: 'q-quran-2-22',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Jenis-Jenis Gunnah',
        difficulty: 'Sedang',
        passage: null,
        question: 'Gunnah yang terdapat pada hukum bacaan tajwid selain gunnah asliyah, disebut ....',
        image: null,
        options: [
            { id: 'A', text: 'gunnah asliyah' },
            { id: 'B', text: 'gunnah ‘aridah' },
            { id: 'C', text: 'gunnah syamsiyah' }
        ],
        answerKey: 'B',
        explanation: 'Gunnah \'aridah adalah bacaan gunnah yang timbul karena sebab hukum tajwid tertentu seperti Idgham Bighunnah, Ikhfa, atau Iqlab.'
    },
    {
        id: 'q-quran-2-23',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Tanda Baca (Harakat)',
        difficulty: 'Mudah',
        passage: null,
        question: 'Tanda baca ْ disebut ....',
        image: null,
        options: [
            { id: 'A', text: 'tasydid' },
            { id: 'B', text: 'tanwin' },
            { id: 'C', text: 'sukun' }
        ],
        answerKey: 'C',
        explanation: 'Tanda bulat/lingkaran kecil di atas huruf ( ْ ) disebut tanda sukun (tanda mati).'
    },
    {
        id: 'q-quran-2-24',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Keutamaan Membaca Al-Qur\'an',
        difficulty: 'Mudah',
        passage: null,
        question: 'Membaca Al-Qur’an termasuk kegiatan ....',
        image: null,
        options: [
            { id: 'A', text: 'sosial' },
            { id: 'B', text: 'ibadah' },
            { id: 'C', text: 'sia-sia' }
        ],
        answerKey: 'B',
        explanation: 'Membaca kitab suci Al-Qur’an merupakan amal ibadah yang mendatangkan pahala dan kebaikan berlipat ganda.'
    },
    {
        id: 'q-quran-2-25',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Hukum Mim Sukun (Idgham Mimi)',
        difficulty: 'Sedang',
        passage: null,
        question: 'Bacaan gunnah yang terjadi jika terdapat huruf mim sukun bertemu dengan huruf mim berharakat hidup adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'ikhfa’' },
            { id: 'B', text: 'idgam mimi' },
            { id: 'C', text: 'iqlab' }
        ],
        answerKey: 'B',
        explanation: 'Pertemuan antara mim sukun (مْ) dengan huruf mim berharakat (م) dinamakan hukum Idgham Mimi atau Idgham Mutamatsilain.'
    },
    {
        id: 'q-quran-2-26',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Tanda Baca Tasydid',
        difficulty: 'Mudah',
        passage: null,
        question: 'Cara membaca huruf yang bertanda baca tasydid adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'tebal' },
            { id: 'B', text: 'tipis' },
            { id: 'C', text: 'dobel' }
        ],
        answerKey: 'C',
        explanation: 'Tanda tasydid/syaddah ( ّ ) menunjukkan huruf tersebut dibaca rangkap (dobel) dan ditekan.'
    },
    {
        id: 'q-quran-2-27',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Hukum Nun Sukun (Idgham Bighunnah)',
        difficulty: 'Sedang',
        passage: null,
        question: 'Lafal مَنْ وَرَائِهِمْ merupakan contoh bacaan ....',
        image: null,
        options: [
            { id: 'A', text: 'ikhfa’' },
            { id: 'B', text: 'iqlab' },
            { id: 'C', text: 'idgam bigunnah' }
        ],
        answerKey: 'C',
        explanation: 'Nun sukun (نْ) bertemu huruf wawu (و) dibaca dengung dan melebur (Idgham Bighunnah).'
    },
    {
        id: 'q-quran-2-28',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Jenis-Jenis Gunnah',
        difficulty: 'Sedang',
        passage: null,
        question: 'Guru menjelaskan jenis-jenis gunnah. Gunnah yang hanya dalam keadaan tertentu disebut ....',
        image: null,
        options: [
            { id: 'A', text: 'gunnah asliyah' },
            { id: 'B', text: 'gunnah ‘aridah' },
            { id: 'C', text: 'gunnah syamsiyah' }
        ],
        answerKey: 'B',
        explanation: 'Gunnah yang terjadi hanya dalam kondisi pertemuan hukum tajwid tertentu disebut gunnah \'aridah.'
    },
    {
        id: 'q-quran-2-29',
        kelas: 'Kelas 2',
        subject: 'quran_hadis',
        bab: 'Hukum Mim Sukun (Ikhfa Syafawi)',
        difficulty: 'Sedang',
        passage: null,
        question: 'Ali menemukan hukum ikhfa’ syafawi dalam ayat. Hukum bacaan tersebut terjadi apabila ada huruf mim sukun bertemu dengan huruf ....',
        image: null,
        options: [
            { id: 'A', text: 'ba’' },
            { id: 'B', text: 'ra’' },
            { id: 'C', text: 'nun' }
        ],
        answerKey: 'A',
        explanation: 'Hukum Ikhfa Syafawi terjadi apabila mim sukun (مْ) bertemu dengan huruf ba\' (ب).'
    },
    // FIQIH KELAS 2
    {
        id: 'q-fiqih-2-1',
        kelas: 'Kelas 2',
        subject: 'fiqih',
        bab: 'Azan dan Ikamah',
        difficulty: 'Sedang',
        passage: null,
        question: 'Azan Subuh memiliki tambahan bacaan “Salat lebih baik daripada tidur” (ash-shalatu khairum minan naum). Bacaan ini ditambahkan pada waktu Subuh karena ....',
        image: null,
        options: [
            { id: 'A', text: 'Waktu Subuh banyak orang masih tidur' },
            { id: 'B', text: 'Subuh adalah salat yang paling singkat' },
            { id: 'C', text: 'Waktu Subuh lama' },
            { id: 'D', text: 'Salat Subuh hanya dikerjakan dua rakaat' }
        ],
        answerKey: 'A',
        explanation: 'Pada azan Subuh ditambahkan bacaan tathwib "Ash-shalatu khairum minan naum" (salat lebih baik daripada tidur) untuk mengingatkan dan membangunkan orang yang umumnya masih terlelap tidur.'
    },
    {
        id: 'q-fiqih-2-2',
        kelas: 'Kelas 2',
        subject: 'fiqih',
        bab: 'Azan dan Ikamah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Sebagai pertanda bahwa waktu salat sudah tiba, dalam azan disebutkan asma Allah Swt. dan persaksian atas ....',
        image: null,
        options: [
            { id: 'A', text: 'Malaikat' },
            { id: 'B', text: 'Manusia' },
            { id: 'C', text: 'Nabi Muhammad saw.' },
            { id: 'D', text: 'Para sahabat' }
        ],
        answerKey: 'C',
        explanation: 'Dalam lafal azan terdapat dua kalimat syahadat, yaitu bersaksi tiada Tuhan selain Allah Swt. dan Nabi Muhammad saw. adalah utusan Allah.'
    },
    {
        id: 'q-fiqih-2-3',
        kelas: 'Kelas 2',
        subject: 'fiqih',
        bab: 'Azan dan Ikamah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Dalam azan dan ikamah, lafal “Hayya \'alal falah” (حَيَّ عَلَى الْفَلَاحِ) artinya ....',
        image: null,
        options: [
            { id: 'A', text: 'Tiada Tuhan selain Allah' },
            { id: 'B', text: 'Segala puji bagi Allah' },
            { id: 'C', text: 'Mari kita meraih kemenangan' },
            { id: 'D', text: 'Mari kita mendirikan salat' }
        ],
        answerKey: 'C',
        explanation: 'Lafal "Hayya \'alal falah" artinya "Marilah menuju kemenangan / meraih kebahagiaan dunia dan akhirat".'
    },
    {
        id: 'q-fiqih-2-4',
        kelas: 'Kelas 2',
        subject: 'fiqih',
        bab: 'Azan dan Ikamah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Ketika azan dikumandangkan, lafal takbir (الله أكبر) dibaca di ....',
        image: null,
        options: [
            { id: 'A', text: 'Awal dan akhir azan' },
            { id: 'B', text: 'Tengah azan saja' },
            { id: 'C', text: 'Sebelum syahadat saja' },
            { id: 'D', text: 'Setelah salam' }
        ],
        answerKey: 'A',
        explanation: 'Lafal takbir "Allahu Akbar" dikumandangkan di bagian awal azan (4 kali) dan di bagian akhir azan (2 kali).'
    },
    {
        id: 'q-fiqih-2-5',
        kelas: 'Kelas 2',
        subject: 'fiqih',
        bab: 'Azan dan Ikamah',
        difficulty: 'Mudah',
        passage: null,
        question: 'Azan disunnahkan dalam Islam sebagai seruan ibadah. Lafal azan diawali dengan kalimat ....',
        image: null,
        options: [
            { id: 'A', text: 'Basmalah' },
            { id: 'B', text: 'Syahadat' },
            { id: 'C', text: 'Takbir' },
            { id: 'D', text: 'Hamdalah' }
        ],
        answerKey: 'C',
        explanation: 'Kumandang azan diawali dengan kalimat takbir (Allahu Akbar) mengagungkan kebesaran Allah Swt.'
    },
    {
        id: 'q-fiqih-2-6',
        kelas: 'Kelas 2',
        subject: 'fiqih',
        bab: 'Salat Fardu',
        difficulty: 'Mudah',
        passage: null,
        question: 'Telah masuknya waktu salat fardu wajib ditandai dengan ....',
        image: null,
        options: [
            { id: 'A', text: 'Terbitnya matahari' },
            { id: 'B', text: 'Terbenamnya matahari' },
            { id: 'C', text: 'Kumandang azan' },
            { id: 'D', text: 'Suara lonceng' }
        ],
        answerKey: 'C',
        explanation: 'Kumandang azan adalah tanda bahwa waktu salat fardu telah tiba dan panggilan untuk segera salat berjamaah.'
    },
    {
        id: 'q-fiqih-2-7',
        kelas: 'Kelas 2',
        subject: 'fiqih',
        bab: 'Salat Berjamaah',
        difficulty: 'Sedang',
        passage: null,
        question: 'Pak Bowo segera mengajak Yuda ke masjid setelah mendengar kumandang azan. Oleh karena itu, Pak Bowo dan Yuda akan mendapat ....',
        image: null,
        options: [
            { id: 'A', text: 'Pujian manusia' },
            { id: 'B', text: 'Pahala dan kemenangan dari Allah Swt.' },
            { id: 'C', text: 'Hadiah duniawi' },
            { id: 'D', text: 'Keuntungan materi' }
        ],
        answerKey: 'B',
        explanation: 'Menjawab azan dan bersegera ke masjid untuk salat berjamaah mendatangkan pahala 27 derajat serta kemenangan (falah) dari Allah Swt.'
    },
    {
        id: 'q-fiqih-2-8',
        kelas: 'Kelas 2',
        subject: 'fiqih',
        bab: 'Azan dan Ikamah',
        difficulty: 'Sedang',
        passage: null,
        question: 'Dalam ikamah terdapat lafal “Qad qamatis-salah” (قَدْ قَامَتِ الصَّلَاةُ). Lafal tersebut memiliki arti ....',
        image: null,
        options: [
            { id: 'A', text: 'Mari kita menegakkan salat' },
            { id: 'B', text: 'Sungguh salat telah dimulai/ditegakkan' },
            { id: 'C', text: 'Mari kita meraih kemenangan' },
            { id: 'D', text: 'Tiada Tuhan selain Allah' }
        ],
        answerKey: 'B',
        explanation: 'Lafal "Qad qamatis-salah" berarti "Sesungguhnya salat telah siap didirikan / ditegakkan" sebagai tanda imam dan makmum memulai salat.'
    },
    {
        id: 'q-fiqih-2-9',
        kelas: 'Kelas 2',
        subject: 'fiqih',
        bab: 'Ketentuan Salat Fardu',
        difficulty: 'Mudah',
        passage: null,
        question: 'Ibadah fardu umat Islam yang diawali dengan takbiratul ihram dan diakhiri dengan salam adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Puasa' },
            { id: 'B', text: 'Salat' },
            { id: 'C', text: 'Zakat' },
            { id: 'D', text: 'Haji' }
        ],
        answerKey: 'B',
        explanation: 'Salat adalah ibadah yang terdiri dari ucapan dan gerakan khusus yang diawali dengan takbiratul ihram dan diakhiri dengan salam.'
    },
    {
        id: 'q-fiqih-2-10',
        kelas: 'Kelas 2',
        subject: 'fiqih',
        bab: 'Salat Fardu',
        difficulty: 'Mudah',
        passage: null,
        question: 'Salat fardu lima waktu terdiri atas Zuhur, Asar, Magrib, Isya, dan Subuh. Salat fardu yang jumlah rakaatnya dua adalah salat ....',
        image: null,
        options: [
            { id: 'A', text: 'Subuh' },
            { id: 'B', text: 'Magrib' },
            { id: 'C', text: 'Isya' },
            { id: 'D', text: 'Zuhur' }
        ],
        answerKey: 'A',
        explanation: 'Salat Subuh berjumlah 2 rakaat dan dikerjakan pada waktu terbit fajar shadiq hingga menjelang matahari terbit.'
    },
    {
        id: 'q-fiqih-2-11',
        kelas: 'Kelas 2',
        subject: 'fiqih',
        bab: 'Ketentuan Salat Fardu',
        difficulty: 'Mudah',
        passage: null,
        question: 'Membaca doa qunut hukumnya adalah sunnah. Membaca doa qunut disunnahkan pada saat salat ....',
        image: null,
        options: [
            { id: 'A', text: 'Magrib' },
            { id: 'B', text: 'Isya' },
            { id: 'C', text: 'Subuh' },
            { id: 'D', text: 'Zuhur' }
        ],
        answerKey: 'C',
        explanation: 'Membaca doa qunut disunnahkan pada rakaat kedua salat Subuh saat berdiri setelah iktidal sebelum sujud.'
    },
    {
        id: 'q-fiqih-2-12',
        kelas: 'Kelas 2',
        subject: 'fiqih',
        bab: 'Salat Fardu',
        difficulty: 'Mudah',
        passage: null,
        question: 'Salat fardu lima waktu terdiri atas Zuhur, Asar, Magrib, Isya, dan Subuh. Salat Magrib dikerjakan sebanyak ....',
        image: null,
        options: [
            { id: 'A', text: '2 rakaat' },
            { id: 'B', text: '3 rakaat' },
            { id: 'C', text: '4 rakaat' },
            { id: 'D', text: '1 rakaat' }
        ],
        answerKey: 'B',
        explanation: 'Salat Magrib dikerjakan sebanyak 3 rakaat saat matahari terbenam.'
    },
    // BAHASA INGGRIS KELAS 2
    {
        id: 'q-ing-2-1',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Fruits & Food',
        difficulty: 'Mudah',
        passage: null,
        question: 'What is "apel" in English?',
        image: null,
        options: [
            { id: 'A', text: 'Banana' },
            { id: 'B', text: 'Apple' },
            { id: 'C', text: 'Orange' },
            { id: 'D', text: 'Mango' }
        ],
        answerKey: 'B',
        explanation: '"Apel" dalam bahasa Inggris adalah "Apple". (Banana = Pisang, Orange = Jeruk, Mango = Mangga).'
    },
    {
        id: 'q-ing-2-2',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Fruits & Food',
        difficulty: 'Mudah',
        passage: null,
        question: 'What is "pisang" in English?',
        image: null,
        options: [
            { id: 'A', text: 'Banana' },
            { id: 'B', text: 'Grape' },
            { id: 'C', text: 'Watermelon' },
            { id: 'D', text: 'Papaya' }
        ],
        answerKey: 'A',
        explanation: '"Pisang" dalam bahasa Inggris adalah "Banana". (Grape = Anggur, Watermelon = Semangka, Papaya = Pepaya).'
    },
    {
        id: 'q-ing-2-3',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Expressing Likes',
        difficulty: 'Mudah',
        passage: null,
        question: 'Rina likes mango. She says ....',
        image: null,
        options: [
            { id: 'A', text: 'I don\'t like mango' },
            { id: 'B', text: 'I like mango' },
            { id: 'C', text: 'I doesn\'t like mango' },
            { id: 'D', text: 'I am mango' }
        ],
        answerKey: 'B',
        explanation: 'Untuk menyatakan bahwa diri sendiri menyukai mangga, ungkapan yang benar adalah "I like mango".'
    },
    {
        id: 'q-ing-2-4',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Expressing Dislikes',
        difficulty: 'Mudah',
        passage: null,
        question: 'Budi tidak suka jeruk. Dalam bahasa Inggris, Budi mengatakan ....',
        image: null,
        options: [
            { id: 'A', text: 'I like orange' },
            { id: 'B', text: 'I likes orange' },
            { id: 'C', text: 'I don\'t like orange' },
            { id: 'D', text: 'I doesn\'t like orange' }
        ],
        answerKey: 'C',
        explanation: 'Untuk menyatakan ketidaksukaan dengan subjek "I", digunakan pola "I don\'t like + nama benda" (I don\'t like orange).'
    },
    {
        id: 'q-ing-2-5',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Simple Present Questions',
        difficulty: 'Mudah',
        passage: null,
        question: 'Perhatikan percakapan berikut!\nA: Do you like apples?\nB: Yes, ....',
        image: null,
        options: [
            { id: 'A', text: 'I do' },
            { id: 'B', text: 'I don\'t' },
            { id: 'C', text: 'I doesn\'t' },
            { id: 'D', text: 'I am not' }
        ],
        answerKey: 'A',
        explanation: 'Jawaban singkat persetujuan untuk pertanyaan yang diawali "Do you...?" adalah "Yes, I do".'
    },
    {
        id: 'q-ing-2-6',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Simple Present Questions',
        difficulty: 'Mudah',
        passage: null,
        question: 'Perhatikan percakapan berikut!\nA: Do you like bananas?\nB: No, ....',
        image: null,
        options: [
            { id: 'A', text: 'I do' },
            { id: 'B', text: 'I like' },
            { id: 'C', text: 'I don\'t' },
            { id: 'D', text: 'I likes' }
        ],
        answerKey: 'C',
        explanation: 'Jawaban singkat penolakan untuk pertanyaan "Do you...?" adalah "No, I don\'t".'
    },
    {
        id: 'q-ing-2-7',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Family Preferences',
        difficulty: 'Mudah',
        passage: null,
        question: 'My father likes bananas. Artinya adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Ayah saya tidak suka pisang' },
            { id: 'B', text: 'Ayah saya suka pisang' },
            { id: 'C', text: 'Ibu saya suka pisang' },
            { id: 'D', text: 'Kakak saya suka pisang' }
        ],
        answerKey: 'B',
        explanation: '"My father" = Ayah saya, "likes" = suka, "bananas" = buah pisang. Jadi artinya "Ayah saya suka pisang".'
    },
    {
        id: 'q-ing-2-8',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Subject-Verb Agreement',
        difficulty: 'Sedang',
        passage: null,
        question: 'My mother .... apples.',
        image: null,
        options: [
            { id: 'A', text: 'like' },
            { id: 'B', text: 'likes' },
            { id: 'C', text: 'liking' },
            { id: 'D', text: 'don\'t like' }
        ],
        answerKey: 'B',
        explanation: 'Subjek "My mother" adalah orang ketiga tunggal (She), sehingga kata kerja "like" ditambah akhiran -s menjadi "likes".'
    },
    {
        id: 'q-ing-2-9',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Third-Person Singular',
        difficulty: 'Sedang',
        passage: null,
        question: 'Perhatikan percakapan berikut!\nA: Does your brother like mangoes?\nB: Yes, ....',
        image: null,
        options: [
            { id: 'A', text: 'he like mangoes' },
            { id: 'B', text: 'he likes mangoes' },
            { id: 'C', text: 'I likes mangoes' },
            { id: 'D', text: 'she likes mangoes' }
        ],
        answerKey: 'B',
        explanation: '"Your brother" adalah kata ganti laki-laki (He). Pada kalimat positif Simple Present, kata kerja berakhiran -s: "he likes mangoes".'
    },
    {
        id: 'q-ing-2-10',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Third-Person Negative',
        difficulty: 'Sedang',
        passage: null,
        question: 'Perhatikan percakapan berikut!\nA: Does your sister like oranges?\nB: No, she ....',
        image: null,
        options: [
            { id: 'A', text: 'like oranges' },
            { id: 'B', text: 'likes oranges' },
            { id: 'C', text: 'doesn\'t like oranges' },
            { id: 'D', text: 'don\'t like oranges' }
        ],
        answerKey: 'C',
        explanation: 'Untuk subjek tunggal "She" pada kalimat negatif, auxiliary verb yang dipakai adalah "doesn\'t" diikuti kata kerja dasar: "doesn\'t like oranges".'
    },
    {
        id: 'q-ing-2-11',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Classroom Objects',
        difficulty: 'Mudah',
        passage: null,
        question: '"Kursi" dalam bahasa Inggris adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Table' },
            { id: 'B', text: 'Chair' },
            { id: 'C', text: 'Book' },
            { id: 'D', text: 'Bag' }
        ],
        answerKey: 'B',
        explanation: '"Kursi" dalam bahasa Inggris adalah "Chair". (Table = Meja, Book = Buku, Bag = Tas).'
    },
    {
        id: 'q-ing-2-12',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'Classroom Objects',
        difficulty: 'Mudah',
        passage: null,
        question: '"Penghapus" dalam bahasa Inggris adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Pencil' },
            { id: 'B', text: 'Ruler' },
            { id: 'C', text: 'Eraser' },
            { id: 'D', text: 'Sharpener' }
        ],
        answerKey: 'C',
        explanation: '"Penghapus" dalam bahasa Inggris adalah "Eraser". (Pencil = Pensil, Ruler = Penggaris, Sharpener = Rautan).'
    },
    {
        id: 'q-ing-2-13',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'There is / There are',
        difficulty: 'Mudah',
        passage: null,
        question: 'There .... a book on the table.',
        image: null,
        options: [
            { id: 'A', text: 'are' },
            { id: 'B', text: 'am' },
            { id: 'C', text: 'is' },
            { id: 'D', text: 'do' }
        ],
        answerKey: 'C',
        explanation: '"A book" adalah benda tunggal (singular), sehingga to be yang tepat digunakan adalah "is" -> "There is a book on the table".'
    },
    {
        id: 'q-ing-2-14',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'There is / There are',
        difficulty: 'Mudah',
        passage: null,
        question: 'There .... three chairs in the classroom.',
        image: null,
        options: [
            { id: 'A', text: 'is' },
            { id: 'B', text: 'are' },
            { id: 'C', text: 'am' },
            { id: 'D', text: 'does' }
        ],
        answerKey: 'B',
        explanation: '"Three chairs" adalah benda jamak (plural/lebih dari satu), sehingga to be yang tepat digunakan adalah "are" -> "There are three chairs in the classroom".'
    },
    {
        id: 'q-ing-2-15',
        kelas: 'Kelas 2',
        subject: 'inggris',
        bab: 'There is / There are',
        difficulty: 'Mudah',
        passage: null,
        question: 'Perhatikan kalimat berikut!\nThere are two books.\nArtinya adalah ....',
        image: null,
        options: [
            { id: 'A', text: 'Ada satu buku' },
            { id: 'B', text: 'Ada dua buku' },
            { id: 'C', text: 'Ada tiga buku' },
            { id: 'D', text: 'Tidak ada buku' }
        ],
        answerKey: 'B',
        explanation: '"There are" = Ada, "two" = dua, "books" = buku-buku. Jadi kalimat tersebut memiliki arti "Ada dua buku".'
    }
];

export const INITIAL_PACKAGES = [
    {
        id: 'pkg-sim-5-akidah',
        name: 'Simulasi TKA Akidah Akhlak Kelas 5 - Paket Utama',
        subject: 'akidah_akhlak',
        kelas: 'Kelas 5',
        mode: 'simulasi',
        questionIds: ['q-akidah-5-1', 'q-akidah-5-2'],
        durationMinutes: 15,
        kkm: 75,
        randomizeQuestions: true,
        randomizeOptions: true,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Kerjakan soal latihan Akidah Akhlak dengan cermat dan teliti.'
    },
    {
        id: 'pkg-sim-5-fiqih',
        name: 'Simulasi TKA Fiqih Kelas 5 - Paket Utama',
        subject: 'fiqih',
        kelas: 'Kelas 5',
        mode: 'simulasi',
        questionIds: ['q-fiqih-5-1', 'q-fiqih-5-2'],
        durationMinutes: 15,
        kkm: 75,
        randomizeQuestions: true,
        randomizeOptions: true,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Kerjakan soal latihan Fiqih dengan cermat dan ikuti petunjuk.'
    },
    {
        id: 'pkg-sim-2-fiqih',
        name: 'Simulasi TKA Fiqih Kelas 2 - Azan, Ikamah & Salat Fardu',
        subject: 'fiqih',
        kelas: 'Kelas 2',
        mode: 'simulasi',
        questionIds: [
            'q-fiqih-2-1', 'q-fiqih-2-2', 'q-fiqih-2-3', 'q-fiqih-2-4',
            'q-fiqih-2-5', 'q-fiqih-2-6', 'q-fiqih-2-7', 'q-fiqih-2-8',
            'q-fiqih-2-9', 'q-fiqih-2-10', 'q-fiqih-2-11', 'q-fiqih-2-12'
        ],
        durationMinutes: 20,
        kkm: 75,
        randomizeQuestions: true,
        randomizeOptions: true,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Kerjakan soal latihan Fiqih Kelas 2 (Azan, Ikamah, dan Ketentuan Salat Fardu) dengan teliti.'
    },
    {
        id: 'pkg-sim-2-ing',
        name: 'Simulasi TKA Bahasa Inggris Kelas 2 - Fruits, Likes & Classroom Objects',
        subject: 'inggris',
        kelas: 'Kelas 2',
        mode: 'simulasi',
        questionIds: [
            'q-ing-2-1', 'q-ing-2-2', 'q-ing-2-3', 'q-ing-2-4', 'q-ing-2-5',
            'q-ing-2-6', 'q-ing-2-7', 'q-ing-2-8', 'q-ing-2-9', 'q-ing-2-10',
            'q-ing-2-11', 'q-ing-2-12', 'q-ing-2-13', 'q-ing-2-14', 'q-ing-2-15'
        ],
        durationMinutes: 20,
        kkm: 75,
        randomizeQuestions: true,
        randomizeOptions: true,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Kerjakan soal simulasi Bahasa Inggris Kelas 2 dengan cermat dan teliti.'
    },
    {
        id: 'pkg-lat-2-ing',
        name: 'Latihan Soal Bahasa Inggris Kelas 2 - Kosakata & Tata Bahasa Dasar',
        subject: 'inggris',
        kelas: 'Kelas 2',
        mode: 'latihan',
        questionIds: [
            'q-ing-2-1', 'q-ing-2-2', 'q-ing-2-3', 'q-ing-2-4', 'q-ing-2-5',
            'q-ing-2-6', 'q-ing-2-7', 'q-ing-2-8', 'q-ing-2-9', 'q-ing-2-10',
            'q-ing-2-11', 'q-ing-2-12', 'q-ing-2-13', 'q-ing-2-14', 'q-ing-2-15'
        ],
        durationMinutes: 25,
        kkm: 70,
        randomizeQuestions: false,
        randomizeOptions: false,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Latihan mandiri materi Bahasa Inggris Kelas 2. Pembahasan dapat dilihat setelah selesai.'
    },
    {
        id: 'pkg-sim-5-quran',
        name: 'Simulasi TKA Al-Qur\'an Hadis Kelas 5 - Paket Utama',
        subject: 'quran_hadis',
        kelas: 'Kelas 5',
        mode: 'simulasi',
        questionIds: ['q-quran-5-1', 'q-quran-5-2'],
        durationMinutes: 15,
        kkm: 75,
        randomizeQuestions: true,
        randomizeOptions: true,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Bacalah soal Al-Qur\'an Hadis dengan seksama sebelum memilih jawaban.'
    },
    {
        id: 'pkg-sim-2-ing',
        name: 'Simulasi TKA Bahasa Inggris Kelas 2 - Basic Vocabulary & Expressions',
        subject: 'inggris',
        kelas: 'Kelas 2',
        mode: 'simulasi',
        questionIds: ['q-ing-2-7', 'q-ing-2-8', 'q-ing-2-9', 'q-ing-2-10', 'q-ing-2-11', 'q-ing-2-12', 'q-ing-2-13'],
        durationMinutes: 15,
        kkm: 70,
        randomizeQuestions: true,
        randomizeOptions: true,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Choose the best answer for each question carefully.'
    },
    {
        id: 'pkg-sim-2-bind',
        name: 'Simulasi TKA Bahasa Indonesia Kelas 2 - Paket Lengkap',
        subject: 'indonesia',
        kelas: 'Kelas 2',
        mode: 'simulasi',
        questionIds: ['q-bind-2-1', 'q-bind-2-2', 'q-bind-2-3', 'q-bind-2-4', 'q-bind-2-5', 'q-bind-2-6', 'q-bind-2-7', 'q-bind-2-8', 'q-bind-2-9', 'q-bind-2-14', 'q-bind-2-15', 'q-bind-2-16', 'q-bind-2-23', 'q-bind-2-24', 'q-bind-2-25', 'q-bind-2-26', 'q-bind-2-27'],
        durationMinutes: 25,
        kkm: 75,
        randomizeQuestions: false,
        randomizeOptions: false,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Bacalah cerita, puisi, dan pertayaan dengan cermat, lalu jawablah pertanyaan 1-17 di sebelah kanan.'
    },
    {
        id: 'pkg-sim-2-mat',
        name: 'Simulasi TKA Matematika Kelas 2 - Paket Utama',
        subject: 'matematika',
        kelas: 'Kelas 2',
        mode: 'simulasi',
        questionIds: ['q-mat-2-1', 'q-mat-2-2', 'q-mat-2-3', 'q-mat-2-4', 'q-mat-2-5', 'q-mat-2-6', 'q-mat-2-7', 'q-mat-2-8', 'q-mat-2-9'],
        durationMinutes: 15,
        kkm: 70,
        randomizeQuestions: true,
        randomizeOptions: true,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Kerjakan soal-soal latihan matematika kelas 2 dengan teliti dan cermat.'
    },
    {
        id: 'pkg-sim-2-akh',
        name: 'Simulasi TKA Akidah Akhlak Kelas 2 - Paket Lengkap',
        subject: 'akidah_akhlak',
        kelas: 'Kelas 2',
        mode: 'simulasi',
        questionIds: [
            'q-akh-2-1', 'q-akh-2-2', 'q-akh-2-3', 'q-akh-2-4', 'q-akh-2-5',
            'q-akh-2-6', 'q-akh-2-7', 'q-akh-2-8', 'q-akh-2-9', 'q-akh-2-10',
            'q-akh-2-11', 'q-akh-2-12', 'q-akh-2-13', 'q-akh-2-14', 'q-akh-2-15',
            'q-akh-2-16', 'q-akh-2-17', 'q-akh-2-18', 'q-akh-2-19', 'q-akh-2-20',
            'q-akh-2-21', 'q-akh-2-22', 'q-akh-2-23', 'q-akh-2-24', 'q-akh-2-25',
            'q-akh-2-26', 'q-akh-2-27', 'q-akh-2-28', 'q-akh-2-29', 'q-akh-2-30',
            'q-akh-2-31', 'q-akh-2-32', 'q-akh-2-33', 'q-akh-2-34', 'q-akh-2-35',
            'q-akh-2-36', 'q-akh-2-37', 'q-akh-2-38', 'q-akh-2-39', 'q-akh-2-40',
            'q-akh-2-41', 'q-akh-2-42', 'q-akh-2-43', 'q-akh-2-44', 'q-akh-2-45'
        ],
        durationMinutes: 35,
        kkm: 70,
        randomizeQuestions: true,
        randomizeOptions: true,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Kerjakan soal latihan Akidah Akhlak Kelas 2 dengan cermat dan teliti.'
    },
    {
        id: 'pkg-sim-2-quran',
        name: 'Simulasi TKA Al-Qur\'an Hadis Kelas 2 - Huruf Hijaiyah & Tanda Baca',
        subject: 'quran_hadis',
        kelas: 'Kelas 2',
        mode: 'simulasi',
        questionIds: [
            'q-quran-2-1', 'q-quran-2-2', 'q-quran-2-3', 'q-quran-2-4', 'q-quran-2-5',
            'q-quran-2-6', 'q-quran-2-7', 'q-quran-2-8', 'q-quran-2-9', 'q-quran-2-10',
            'q-quran-2-11', 'q-quran-2-12', 'q-quran-2-13', 'q-quran-2-14', 'q-quran-2-15',
            'q-quran-2-16', 'q-quran-2-17', 'q-quran-2-18', 'q-quran-2-19', 'q-quran-2-20',
            'q-quran-2-21', 'q-quran-2-22', 'q-quran-2-23', 'q-quran-2-24', 'q-quran-2-25',
            'q-quran-2-26', 'q-quran-2-27', 'q-quran-2-28', 'q-quran-2-29'
        ],
        durationMinutes: 25,
        kkm: 70,
        randomizeQuestions: true,
        randomizeOptions: true,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Bacalah setiap soal Al-Qur\'an Hadis dengan teliti sebelum memilih jawaban yang paling tepat.'
    },
    {
        id: 'pkg-sim-2-pan',
        name: 'Simulasi TKA Pendidikan Pancasila Kelas 2 - Nilai Pancasila & Aturan Hidup',
        subject: 'pancasila',
        kelas: 'Kelas 2',
        mode: 'simulasi',
        questionIds: [
            'q-pan-2-1', 'q-pan-2-2', 'q-pan-2-3', 'q-pan-2-4', 'q-pan-2-5',
            'q-pan-2-6', 'q-pan-2-7', 'q-pan-2-8', 'q-pan-2-9', 'q-pan-2-10',
            'q-pan-2-11', 'q-pan-2-12', 'q-pan-2-13', 'q-pan-2-14', 'q-pan-2-15',
            'q-pan-2-16', 'q-pan-2-17', 'q-pan-2-18', 'q-pan-2-19', 'q-pan-2-20',
            'q-pan-2-21', 'q-pan-2-22', 'q-pan-2-23', 'q-pan-2-24', 'q-pan-2-25'
        ],
        durationMinutes: 25,
        kkm: 70,
        randomizeQuestions: true,
        randomizeOptions: true,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Kerjakan soal latihan Pendidikan Pancasila dengan teliti dan pilih jawaban yang paling tepat.'
    },
    {
        id: 'pkg-sim-5-mat',
        name: 'Simulasi TKA Matematika Kelas 5 - Paket Utama',
        subject: 'matematika',
        kelas: 'Kelas 5',
        mode: 'simulasi',
        questionIds: ['q-mat-5-1', 'q-mat-5-2', 'q-mat-5-3', 'q-mat-5-4', 'q-mat-5-5'],
        durationMinutes: 15,
        kkm: 70,
        randomizeQuestions: true,
        randomizeOptions: true,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Kerjakan soal dengan cermat dan teliti. Timer akan berjalan otomatis saat tombol Mulai Ujian diklik. Jawaban tersimpan secara real-time.'
    },
    {
        id: 'pkg-lat-5-mat',
        name: 'Latihan TKA Mandiri Matematika Kelas 5',
        subject: 'matematika',
        kelas: 'Kelas 5',
        mode: 'latihan',
        questionIds: ['q-mat-5-1', 'q-mat-5-2', 'q-mat-5-3'],
        durationMinutes: 20,
        kkm: 65,
        randomizeQuestions: false,
        randomizeOptions: false,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Mode Latihan: Setelah ujian selesai, kamu bisa melihat pembahasan lengkap setiap nomor soal.'
    },
    {
        id: 'pkg-sim-5-ipas',
        name: 'Simulasi TKA IPAS Kelas 5 - Paket A',
        subject: 'ipas',
        kelas: 'Kelas 5',
        mode: 'simulasi',
        questionIds: ['q-ipas-5-1', 'q-ipas-5-2'],
        durationMinutes: 10,
        kkm: 75,
        randomizeQuestions: true,
        randomizeOptions: true,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Simulasi resmi ujian IPAS SD Kelas 5. Waktu terbatas 10 menit.'
    },
    {
        id: 'pkg-lat-5-ind',
        name: 'Latihan Bahasa Indonesia Kelas 5',
        subject: 'indonesia',
        kelas: 'Kelas 5',
        mode: 'latihan',
        questionIds: ['q-ind-5-1', 'q-ind-5-2'],
        durationMinutes: 15,
        kkm: 70,
        randomizeQuestions: false,
        randomizeOptions: false,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Latihan Bahasa Indonesia Kelas 5 dengan kunci dan penjelasan.'
    }
];

export const INITIAL_RESULTS = [
    {
        id: 'res-1001',
        studentId: 'u-std-1',
        studentName: 'Budi Santoso',
        kelas: 'Kelas 5',
        packageId: 'pkg-sim-5-mat',
        packageName: 'Simulasi TKA Matematika Kelas 5 - Paket Utama',
        subject: 'matematika',
        mode: 'simulasi',
        score: 80,
        correctCount: 4,
        wrongCount: 1,
        unansweredCount: 0,
        totalQuestions: 5,
        durationSeconds: 480, // 8 menit
        kkm: 70,
        status: 'LULUS',
        completedAt: '2026-07-20T14:30:00.000Z',
        answers: {
            'q-mat-5-1': 'A',
            'q-mat-5-2': 'C',
            'q-mat-5-3': 'A',
            'q-mat-5-4': 'B',
            'q-mat-5-5': 'A' // wrong
        }
    },
    {
        id: 'res-1002',
        studentId: 'u-std-2',
        studentName: 'Siti Aminah',
        kelas: 'Kelas 5',
        packageId: 'pkg-sim-5-mat',
        packageName: 'Simulasi TKA Matematika Kelas 5 - Paket Utama',
        subject: 'matematika',
        mode: 'simulasi',
        score: 100,
        correctCount: 5,
        wrongCount: 0,
        unansweredCount: 0,
        totalQuestions: 5,
        durationSeconds: 390, // 6.5 menit
        kkm: 70,
        status: 'LULUS',
        completedAt: '2026-07-21T09:15:00.000Z',
        answers: {
            'q-mat-5-1': 'A',
            'q-mat-5-2': 'C',
            'q-mat-5-3': 'A',
            'q-mat-5-4': 'B',
            'q-mat-5-5': 'C'
        }
    }
];
