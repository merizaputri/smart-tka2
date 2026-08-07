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


    // MATHEMATICS KELAS 5
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
        explanation: 'Bendera Indonesia berwarna merah dan putih ("red and white").'
    }
];

export const INITIAL_PACKAGES = [
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
        name: 'Latihan Bahasa Indonesia & Pancasila Kelas 5',
        subject: 'indonesia',
        kelas: 'Kelas 5',
        mode: 'latihan',
        questionIds: ['q-ind-5-1', 'q-ind-5-2', 'q-pan-5-1', 'q-ing-5-1'],
        durationMinutes: 15,
        kkm: 70,
        randomizeQuestions: false,
        randomizeOptions: false,
        showResultsToStudent: true,
        startDate: '2026-01-01T00:00',
        endDate: '2026-12-31T23:59',
        instructions: 'Latihan gabungan Bahasa Indonesia dan Pancasila dengan kunci dan penjelasan.'
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
