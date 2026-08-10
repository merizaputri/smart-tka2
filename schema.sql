-- ========================================================
-- TKA Smart Exam - MySQL Database Schema & Seed Data
-- Database Name: tka_smart_exam
-- Compatible with MySQL 5.7+ / 8.0+ / MariaDB / XAMPP
-- ========================================================

CREATE DATABASE IF NOT EXISTS `tka_smart_exam` 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `tka_smart_exam`;

-- --------------------------------------------------------
-- 1. Table Structure for `users`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) NOT NULL,
  `nisn` VARCHAR(32) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `kelas` VARCHAR(32) NOT NULL DEFAULT 'Kelas 5',
  `role` ENUM('siswa', 'admin') NOT NULL DEFAULT 'siswa',
  `password` VARCHAR(128) NOT NULL DEFAULT '123',
  `avatar` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_nisn` (`nisn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 2. Table Structure for `questions`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `questions` (
  `id` VARCHAR(64) NOT NULL,
  `kelas` VARCHAR(32) NOT NULL DEFAULT 'Kelas 5',
  `subject` VARCHAR(64) NOT NULL DEFAULT 'matematika',
  `bab` VARCHAR(128) NULL DEFAULT 'Umum',
  `difficulty` VARCHAR(32) NULL DEFAULT 'Sedang',
  `passage` TEXT NULL,
  `question` TEXT NOT NULL,
  `image` LONGTEXT NULL,
  `options` JSON NOT NULL,
  `answer_key` CHAR(1) NOT NULL DEFAULT 'A',
  `explanation` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. Table Structure for `packages`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `packages` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `duration_minutes` INT NOT NULL DEFAULT 15,
  `kkm` INT NOT NULL DEFAULT 70,
  `mode` VARCHAR(32) NOT NULL DEFAULT 'simulasi',
  `kelas` VARCHAR(32) NOT NULL DEFAULT 'Kelas 5',
  `subject` VARCHAR(64) NOT NULL DEFAULT 'matematika',
  `question_ids` JSON NOT NULL,
  `randomize_questions` TINYINT(1) NOT NULL DEFAULT 1,
  `randomize_options` TINYINT(1) NOT NULL DEFAULT 1,
  `show_results_to_student` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. Table Structure for `results`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `results` (
  `id` VARCHAR(64) NOT NULL,
  `student_id` VARCHAR(64) NULL,
  `student_name` VARCHAR(128) NOT NULL,
  `kelas` VARCHAR(32) NOT NULL,
  `package_id` VARCHAR(64) NULL,
  `package_name` VARCHAR(128) NOT NULL,
  `subject` VARCHAR(64) NULL,
  `mode` VARCHAR(32) NOT NULL DEFAULT 'simulasi',
  `score` INT NOT NULL DEFAULT 0,
  `correct_count` INT NOT NULL DEFAULT 0,
  `wrong_count` INT NOT NULL DEFAULT 0,
  `total_questions` INT NOT NULL DEFAULT 0,
  `kkm` INT NOT NULL DEFAULT 70,
  `status` VARCHAR(32) NOT NULL DEFAULT 'BELUM LULUS',
  `duration_seconds` INT NOT NULL DEFAULT 0,
  `completed_at` VARCHAR(64) NOT NULL,
  `questions` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Initial Seed Data: Default Admin User
-- --------------------------------------------------------
INSERT INTO `users` (`id`, `nisn`, `name`, `kelas`, `role`, `password`, `avatar`)
VALUES 
  ('u-admin-1', 'ADMIN001', 'Administrator TKA', 'Guru/Admin', 'admin', 'admin123', 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- --------------------------------------------------------
-- Initial Seed Data: Matematika Kelas 2
-- --------------------------------------------------------
INSERT INTO `questions` (`id`, `kelas`, `subject`, `bab`, `difficulty`, `passage`, `question`, `image`, `options`, `answer_key`, `explanation`)
VALUES 
  ('q-mat-2-1', 'Kelas 2', 'matematika', 'Pengukuran Panjang', 'Mudah', NULL, 'Alat yang digunakan untuk mengukur panjang meja adalah ....', NULL, '[{"id":"A","text":"Timbangan"},{"id":"B","text":"Penggaris"},{"id":"C","text":"Jam"},{"id":"D","text":"Gelas ukur"}]', 'B', 'Penggaris atau meteran adalah alat ukur baku yang digunakan untuk mengukur panjang suatu benda seperti meja.'),
  ('q-mat-2-2', 'Kelas 2', 'matematika', 'Bangun Datar', 'Mudah', NULL, 'Bangun datar yang memiliki 4 sisi sama panjang adalah ....', NULL, '[{"id":"A","text":"Lingkaran"},{"id":"B","text":"Persegi"},{"id":"C","text":"Segitiga"},{"id":"D","text":"Persegi panjang"}]', 'B', 'Persegi adalah bangun datar dua dimensi yang memiliki 4 buah sisi sama panjang dan 4 sudut siku-siku.'),
  ('q-mat-2-3', 'Kelas 2', 'matematika', 'Bangun Datar', 'Mudah', NULL, 'Bangun datar yang memiliki 3 sisi adalah ....', NULL, '[{"id":"A","text":"Lingkaran"},{"id":"B","text":"Persegi"},{"id":"C","text":"Segitiga"},{"id":"D","text":"Oval"}]', 'C', 'Segitiga adalah bangun datar yang dibatasi oleh 3 buah sisi dan memiliki 3 titik sudut.'),
  ('q-mat-2-4', 'Kelas 2', 'matematika', 'Satuan Waktu', 'Mudah', NULL, 'Satu minggu terdiri atas ....', NULL, '[{"id":"A","text":"5 hari"},{"id":"B","text":"6 hari"},{"id":"C","text":"7 hari"},{"id":"D","text":"8 hari"}]', 'C', 'Satu minggu terdiri dari 7 hari (Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, dan Minggu).'),
  ('q-mat-2-5', 'Kelas 2', 'matematika', 'Pengurangan', 'Mudah', NULL, 'Pengurangan bilangan berikut yang hasilnya 7 adalah ....', NULL, '[{"id":"A","text":"14 − 5"},{"id":"B","text":"17 − 7"},{"id":"C","text":"13 − 6"}]', 'C', '13 − 6 = 7, sedangkan 14 − 5 = 9 dan 17 − 7 = 10.'),
  ('q-mat-2-6', 'Kelas 2', 'matematika', 'Pengurangan', 'Mudah', NULL, 'Perhatikan pengurangan berikut!\n\n14 − □ = 9\n\nBilangan yang tepat untuk mengisi titik-titik adalah ....', NULL, '[{"id":"A","text":"4"},{"id":"B","text":"5"},{"id":"C","text":"6"}]', 'B', '14 − 5 = 9, jadi bilangan yang tepat untuk mengisi titik-titik adalah 5.'),
  ('q-mat-2-7', 'Kelas 2', 'matematika', 'Pengurangan', 'Sedang', NULL, 'Perhatikan pengurangan berikut!\n\n(i) 20 − 13 = 7\n\n(ii) 16 − 12 = 4\n\n(iii) 15 − 6 = 7\n\nPengurangan yang hasilnya benar adalah nomor ....', NULL, '[{"id":"A","text":"(i) dan (ii)"},{"id":"B","text":"(i) dan (iii)"},{"id":"C","text":"(ii) dan (iii)"}]', 'A', 'Pengurangan (i) 20 − 13 = 7 (benar) dan (ii) 16 − 12 = 4 (benar). Pengurangan (iii) 15 − 6 = 9 (salah). Jadi yang benar adalah nomor (i) dan (ii).'),
  ('q-mat-2-8', 'Kelas 2', 'matematika', 'Pengurangan', 'Mudah', NULL, 'Siswa kelas II ada 20.\n\nSiswa perempuan ada 11.\n\nBanyak siswa laki-laki ada ....', NULL, '[{"id":"A","text":"9 anak"},{"id":"B","text":"11 anak"},{"id":"C","text":"12 anak"}]', 'A', 'Banyak siswa laki-laki = 20 − 11 = 9 anak.'),
  ('q-mat-2-9', 'Kelas 2', 'matematika', 'Pengurangan', 'Sedang', NULL, 'Ibu membuat donat.\n\nAda 11 donat cokelat dan 6 donat keju.\n\nSebanyak 9 donat diberikan kepada paman.\n\nPernyataan yang benar adalah ....', NULL, '[{"id":"A","text":"Banyak donat yang dibuat ada 19."},{"id":"B","text":"Selisih banyak donat cokelat dan keju ada 6."},{"id":"C","text":"Sisa donat ibu ada 8."}]', 'C', 'Total donat = 11 + 6 = 17. Sisa donat ibu = 17 − 9 = 8. Jadi pernyataan yang benar adalah sisa donat ibu ada 8.'),
  ('q-bind-2-1', 'Kelas 2', 'bahasa_indonesia', 'Membaca Cerita / Wacana', 'Mudah', 'Cerita berikut untuk soal nomor 1–5.\n\nNiko dan Arif mendapat PR Bahasa Indonesia dari Bu Guru.\n\nMereka mengerjakan PR tersebut di rumah Niko.\n\nMereka merasa kesulitan dalam mengerjakan PR itu.\n\nKemudian, Niko minta tolong kepada kakaknya.\n\nKakak Niko bernama Nina.\n\nNina membantu Niko dan Arif dengan senang hati.\n\nAkhirnya mereka bisa mengerjakan PR itu.\n\nMereka pun berterima kasih kepada Kak Nina.', 'Siapa yang membantu Niko mengerjakan PR?', NULL, '[{"id":"A","text":"Kak Arif."},{"id":"B","text":"Kak Nina."},{"id":"C","text":"Bu guru."}]', 'B', 'Berdasarkan cerita di atas, Nina (kakak Niko) membantu Niko dan Arif mengerjakan PR dengan senang hati.'),
  ('q-bind-2-2', 'Kelas 2', 'bahasa_indonesia', 'Membaca Cerita / Wacana', 'Mudah', 'Cerita berikut untuk soal nomor 1–5.\n\nNiko dan Arif mendapat PR Bahasa Indonesia dari Bu Guru.\n\nMereka mengerjakan PR tersebut di rumah Niko.\n\nMereka merasa kesulitan dalam mengerjakan PR itu.\n\nKemudian, Niko minta tolong kepada kakaknya.\n\nKakak Niko bernama Nina.\n\nNina membantu Niko dan Arif dengan senang hati.\n\nAkhirnya mereka bisa mengerjakan PR itu.\n\nMereka pun berterima kasih kepada Kak Nina.', 'Bagaimana perasaan Kak Nina ketika diminta untuk membantu mengerjakan PR?', NULL, '[{"id":"A","text":"Marah."},{"id":"B","text":"Senang."},{"id":"C","text":"Bingung."}]', 'B', 'Di dalam teks cerita disebutkan bahwa "Nina membantu Niko dan Arif dengan senang hati".'),
  ('q-bind-2-3', 'Kelas 2', 'bahasa_indonesia', 'Membaca Cerita / Wacana', 'Mudah', 'Cerita berikut untuk soal nomor 1–5.\n\nNiko dan Arif mendapat PR Bahasa Indonesia dari Bu Guru.\n\nMereka mengerjakan PR tersebut di rumah Niko.\n\nMereka merasa kesulitan dalam mengerjakan PR itu.\n\nKemudian, Niko minta tolong kepada kakaknya.\n\nKakak Niko bernama Nina.\n\nNina membantu Niko dan Arif dengan senang hati.\n\nAkhirnya mereka bisa mengerjakan PR itu.\n\nMereka pun berterima kasih kepada Kak Nina.', 'Di mana Niko dan Arif mengerjakan PR?', NULL, '[{"id":"A","text":"Di sekolah."},{"id":"B","text":"Di rumah Niko."},{"id":"C","text":"Di rumah Arif."}]', 'B', 'Kalimat kedua cerita menjelaskan "Mereka mengerjakan PR tersebut di rumah Niko".'),
  ('q-bind-2-4', 'Kelas 2', 'bahasa_indonesia', 'Membaca Cerita / Wacana', 'Mudah', 'Cerita berikut untuk soal nomor 1–5.\n\nNiko dan Arif mendapat PR Bahasa Indonesia dari Bu Guru.\n\nMereka mengerjakan PR tersebut di rumah Niko.\n\nMereka merasa kesulitan dalam mengerjakan PR itu.\n\nKemudian, Niko minta tolong kepada kakaknya.\n\nKakak Niko bernama Nina.\n\nNina membantu Niko dan Arif dengan senang hati.\n\nAkhirnya mereka bisa mengerjakan PR itu.\n\nMereka pun berterima kasih kepada Kak Nina.', 'Apa yang dilakukan Niko dan Arif ketika sudah bisa mengerjakan PR?', NULL, '[{"id":"A","text":"Berterima kasih kepada Kak Nina."},{"id":"B","text":"Meminta Kak Nina selalu mengajarinya."},{"id":"C","text":"Menyuruh Kak Nina menemui Bu Guru."}]', 'A', 'Kalimat terakhir cerita menyebutkan "Mereka pun berterima kasih kepada Kak Nina".'),
  ('q-bind-2-5', 'Kelas 2', 'bahasa_indonesia', 'Membaca Cerita / Wacana', 'Mudah', 'Cerita berikut untuk soal nomor 1–5.\n\nNiko dan Arif mendapat PR Bahasa Indonesia dari Bu Guru.\n\nMereka mengerjakan PR tersebut di rumah Niko.\n\nMereka merasa kesulitan dalam mengerjakan PR itu.\n\nKemudian, Niko minta tolong kepada kakaknya.\n\nKakak Niko bernama Nina.\n\nNina membantu Niko dan Arif dengan senang hati.\n\nAkhirnya mereka bisa mengerjakan PR itu.\n\nMereka pun berterima kasih kepada Kak Nina.', 'Apa PR yang diberikan Bu guru kepada Niko dan Arif?', NULL, '[{"id":"A","text":"Matematika."},{"id":"B","text":"Bahasa Inggris."},{"id":"C","text":"Bahasa Indonesia."}]', 'C', 'Kalimat pertama cerita menyebutkan "Niko dan Arif mendapat PR Bahasa Indonesia dari Bu Guru".'),
  ('q-bind-2-6', 'Kelas 2', 'bahasa_indonesia', 'Membaca Puisi', 'Mudah', 'Puisi berikut untuk soal nomor 6–9.\n\nTaman Bunga\n\nMawar yang cantik [....]\nMelati yang putih mewangi\nAnggrek yang tumbuh ceria\nDan aster yang warna-warni\nOh taman bungaku\nIndah mewangi setiap hari\nMembuat hati selalu berseri\nKebahagiaan darimu\nKubalas dengan merawatmu', 'Ekspresi yang sesuai dengan puisi tersebut adalah ....', NULL, '[{"id":"A","text":"sedih"},{"id":"B","text":"senang"},{"id":"C","text":"kaget"}]', 'B', 'Puisi "Taman Bunga" menggambarkan kegembiraan terhadap indahnya taman bunga (hati selalu berseri), sehingga ekspresi yang sesuai adalah senang.'),
  ('q-bind-2-7', 'Kelas 2', 'bahasa_indonesia', 'Membaca Puisi', 'Mudah', 'Puisi berikut untuk soal nomor 6–9.\n\nTaman Bunga\n\nMawar yang cantik [....]\nMelati yang putih mewangi\nAnggrek yang tumbuh ceria\nDan aster yang warna-warni\nOh taman bungaku\nIndah mewangi setiap hari\nMembuat hati selalu berseri\nKebahagiaan darimu\nKubalas dengan merawatmu', 'Tema puisi tersebut adalah ....', NULL, '[{"id":"A","text":"keindahan"},{"id":"B","text":"pendidikan"},{"id":"C","text":"kebudayaan"}]', 'A', 'Puisi tersebut menceritakan keindahan berbagai bunga di taman seperti mawar, melati, anggrek, dan aster.'),
  ('q-bind-2-8', 'Kelas 2', 'bahasa_indonesia', 'Membaca Puisi', 'Mudah', 'Puisi berikut untuk soal nomor 6–9.\n\nTaman Bunga\n\nMawar yang cantik [....]\nMelati yang putih mewangi\nAnggrek yang tumbuh ceria\nDan aster yang warna-warni\nOh taman bungaku\nIndah mewangi setiap hari\nMembuat hati selalu berseri\nKebahagiaan darimu\nKubalas dengan merawatmu', 'Kata yang tepat untuk melengkapi puisi tersebut adalah ....', NULL, '[{"id":"A","text":"layu"},{"id":"B","text":"merona"},{"id":"C","text":"sayu"}]', 'B', 'Kalimat "Mawar yang cantik merona" sangat tepat untuk melengkapi bagian rumpang larik pertama puisi.'),
  ('q-bind-2-9', 'Kelas 2', 'bahasa_indonesia', 'Membaca Puisi', 'Mudah', 'Puisi berikut untuk soal nomor 6–9.\n\nTaman Bunga\n\nMawar yang cantik [....]\nMelati yang putih mewangi\nAnggrek yang tumbuh ceria\nDan aster yang warna-warni\nOh taman bungaku\nIndah mewangi setiap hari\nMembuat hati selalu berseri\nKebahagiaan darimu\nKubalas dengan merawatmu', 'Arti kata "berseri" pada puisi tersebut adalah ....', NULL, '[{"id":"A","text":"cantik"},{"id":"B","text":"bahagia"},{"id":"C","text":"indah"}]', 'B', 'Kata "berseri" dalam kalimat "Membuat hati selalu berseri" bermakna gembira atau bahagia.'),
  ('q-bind-2-23', 'Kelas 2', 'bahasa_indonesia', 'Ungkapan Perasaan & Emosi', 'Mudah', NULL, 'Berikut ini merupakan penyebab munculnya perasaan sedih, yaitu ....', NULL, '[{"id":"A","text":"mendapat juara kelas"},{"id":"B","text":"hewan kesayangannya mati"},{"id":"C","text":"sahabatnya pindah sekolah"}]', 'B', 'Kehilangan hewan kesayangan yang mati atau ditinggal sahabat dapat menimbulkan perasaan sedih.'),
  ('q-bind-2-24', 'Kelas 2', 'bahasa_indonesia', 'Tanda Baca & Tanda Titik', 'Mudah', NULL, 'Kalimat berikut yang diakhiri dengan tanda titik adalah ....', NULL, '[{"id":"A","text":"Alin pergi ke puncak"},{"id":"B","text":"Di mana rumahmu"},{"id":"C","text":"Kakak sudah sampai rumah"}]', 'C', 'Kalimat berita/pernyataan diakhiri dengan tanda titik (.).'),
  ('q-bind-2-25', 'Kelas 2', 'bahasa_indonesia', 'Huruf Kapital & Ejaan', 'Mudah', NULL, 'Penggunaan huruf kapital yang tepat terdapat pada kalimat ....', NULL, '[{"id":"A","text":"Ayah pergi ke rumah Pak Beni."},{"id":"B","text":"Linda dan keluarganya berlibur di Bali."},{"id":"C","text":"Kakak akan pergi ke Pantai."}]', 'A', 'Huruf kapital digunakan di awal kalimat, nama sapaan, dan nama geografi.'),
  ('q-bind-2-26', 'Kelas 2', 'bahasa_indonesia', 'Kalimat Tanya', 'Mudah', NULL, 'Berikut ini yang merupakan kalimat tanya adalah ....', NULL, '[{"id":"A","text":"Siapa yang mengantarmu pergi sekolah?"},{"id":"B","text":"Apakah ayahmu sudah pulang?"},{"id":"C","text":"Tolong bantu aku membawa buku ini?"}]', 'A', 'Kalimat tanya menggunakan kata tanya seperti "Siapa" atau "Apakah" dan diakhiri tanda tanya.'),
  ('q-bind-2-27', 'Kelas 2', 'bahasa_indonesia', 'Kata Tanya & Waktu', 'Mudah', NULL, 'Kalimat berikut yang menanyakan waktu adalah ....', NULL, '[{"id":"A","text":"Kapan kamu akan pergi ke rumah nenek?"},{"id":"B","text":"Siapa yang akan menemanimu pergi ke rumah nenek?"},{"id":"C","text":"Kapan rumah nenekmu kebanjiran?"}]', 'A', 'Kata tanya "Kapan" digunakan untuk menanyakan waktu.'),
  ('q-bind-2-14', 'Kelas 2', 'bahasa_indonesia', 'Kata Tanya & Tempat', 'Mudah', NULL, 'Kalimat berikut yang menanyakan tempat adalah ....', NULL, '[{"id":"A","text":"Apa nama desa Nenek?"},{"id":"B","text":"Di mana letak desa Nenek?"},{"id":"C","text":"Bagaimana desa Nenek?"}]', 'B', 'Kata tanya "Di mana" digunakan untuk menanyakan lokasi atau tempat.'),
  ('q-bind-2-15', 'Kelas 2', 'bahasa_indonesia', 'Struktur Kalimat (S-P-O)', 'Mudah', NULL, 'Perhatikan kalimat berikut!\n\nPaman membeli jagung rebus.\n\nPredikat pada kalimat tersebut adalah ....', NULL, '[{"id":"A","text":"paman"},{"id":"B","text":"membeli"},{"id":"C","text":"jagung rebus"}]', 'B', 'Dalam susunan kalimat Paman (Subjek) + membeli (Predikat) + jagung rebus (Objek), kata kerja "membeli" bertindak sebagai Predikat.'),
  ('q-bind-2-16', 'Kelas 2', 'bahasa_indonesia', 'Kata Tanya & Keadaan', 'Mudah', NULL, 'Perhatikan kalimat berikut!\n\n[...] keadaanmu sekarang?\n\nKata tanya untuk melengkapi kalimat tersebut adalah ....', NULL, '[{"id":"A","text":"bagaimana"},{"id":"B","text":"mengapa"},{"id":"C","text":"di mana"}]', 'A', 'Kata tanya "Bagaimana" digunakan untuk menanyakan keadaan atau kabar.'),
  ('q-ing-2-7', 'Kelas 2', 'inggris', 'Daily Habits & Expressions', 'Mudah', NULL, 'Before eating, Muslims say ....', NULL, '[{"id":"A","text":"Bismillah"},{"id":"B","text":"Goodbye"},{"id":"C","text":"Thank you"}]', 'A', 'Sebelum makan, umat Islam mengucapkan Bismillah.'),
  ('q-ing-2-8', 'Kelas 2', 'inggris', 'Cleanliness & Environment', 'Mudah', NULL, 'We throw rubbish into the ....', NULL, '[{"id":"A","text":"river"},{"id":"B","text":"trash bin"},{"id":"C","text":"road"}]', 'B', 'Trash bin artinya tempat sampah. Sampah harus dibuang ke tempat sampah.'),
  ('q-ing-2-9', 'Kelas 2', 'inggris', 'Family Members', 'Mudah', NULL, 'My father and my mother are my ....', NULL, '[{"id":"A","text":"friends"},{"id":"B","text":"parents"},{"id":"C","text":"cousins"}]', 'B', 'Father (ayah) dan mother (ibu) disebut parents (orang tua).'),
  ('q-ing-2-10', 'Kelas 2', 'inggris', 'Adjectives & Opposites', 'Mudah', NULL, 'The opposite of "big" is ....', NULL, '[{"id":"A","text":"small"},{"id":"B","text":"long"},{"id":"C","text":"tall"}]', 'A', 'Lawan kata (opposite) dari "big" (besar) adalah "small" (kecil).'),
  ('q-ing-2-11', 'Kelas 2', 'inggris', 'Good Manners & Respect', 'Mudah', NULL, 'We should [....] our teacher.', NULL, '[{"id":"A","text":"respect"},{"id":"B","text":"fight"},{"id":"C","text":"ignore"}]', 'A', 'Respect artinya menghormati. Kita harus menghormati guru kita.'),
  ('q-ing-2-12', 'Kelas 2', 'inggris', 'Fruits & Vocabulary', 'Mudah', NULL, 'Which one is a fruit?', NULL, '[{"id":"A","text":"banana"},{"id":"B","text":"chair"},{"id":"C","text":"pencil"}]', 'A', 'Banana (pisang) adalah jenis buah-buahan (fruit).'),
  ('q-ing-2-13', 'Kelas 2', 'inggris', 'Colors & National Flag', 'Mudah', NULL, 'The Indonesian flag is ....', NULL, '[{"id":"A","text":"red and white"},{"id":"B","text":"blue and yellow"},{"id":"C","text":"green and white"}]', 'A', 'Bendera Indonesia berwarna merah dan putih ("red and white").'),
  ('q-fiqih-2-1', 'Kelas 2', 'fiqih', 'Rukun Islam & Salat Wajib', 'Mudah', NULL, 'Jumlah salat fardhu (wajib) yang dikerjakan oleh umat Islam dalam sehari semalam adalah ....', NULL, '[{"id":"A","text":"3 waktu"},{"id":"B","text":"5 waktu"},{"id":"C","text":"7 waktu"}]', 'B', 'Salat wajib bagi umat Islam terdiri dari 5 waktu yaitu Subuh, Zuhur, Asar, Magrib, dan Isya.'),
  ('q-fiqih-5-1', 'Kelas 5', 'fiqih', 'Thaharah & Salat', 'Mudah', NULL, 'Rukun wudu yang pertama adalah ....', NULL, '[{"id":"A","text":"Membasuh Muka"},{"id":"B","text":"Niat"},{"id":"C","text":"Membasuh Kedua Tangan"},{"id":"D","text":"Mengusap Kepala"}]', 'B', 'Rukun wudu berurutan dimulai dari niat, membasuh muka, membasuh kedua tangan hingga siku, mengusap sebagian kepala, membasuh kedua kaki hingga mata kaki, dan tertib.'),
  ('q-fiqih-5-2', 'Kelas 5', 'fiqih', 'Zakat & Sedekah', 'Sedang', NULL, 'Zakat yang wajib dikeluarkan oleh setiap jiwa umat Islam pada bulan Ramadan sebelum salat Idul Fitri adalah ....', NULL, '[{"id":"A","text":"Zakat Maal"},{"id":"B","text":"Zakat Fitrah"},{"id":"C","text":"Sedekah Subuh"},{"id":"D","text":"Infaq Jiwa"}]', 'B', 'Zakat Fitrah disyariatkan untuk menyucikan jiwa setiap Muslim dan ditunaikan di bulan Ramadan hingga sebelum salat Idul Fitri.')
ON DUPLICATE KEY UPDATE `question` = VALUES(`question`), `passage` = VALUES(`passage`), `options` = VALUES(`options`), `answer_key` = VALUES(`answer_key`);

INSERT INTO `packages` (`id`, `name`, `duration_minutes`, `kkm`, `mode`, `kelas`, `subject`, `question_ids`, `randomize_questions`, `randomize_options`, `show_results_to_student`)
VALUES
  ('pkg-sim-2-mat', 'Simulasi TKA Matematika Kelas 2 - Paket Utama', 15, 70, 'simulasi', 'Kelas 2', 'matematika', '["q-mat-2-1", "q-mat-2-2", "q-mat-2-3", "q-mat-2-4", "q-mat-2-5", "q-mat-2-6", "q-mat-2-7", "q-mat-2-8", "q-mat-2-9"]', 1, 1, 1),
  ('pkg-sim-2-bind', 'Simulasi TKA Bahasa Indonesia Kelas 2 - Paket Lengkap', 25, 75, 'simulasi', 'Kelas 2', 'bahasa_indonesia', '["q-bind-2-1", "q-bind-2-2", "q-bind-2-3", "q-bind-2-4", "q-bind-2-5", "q-bind-2-6", "q-bind-2-7", "q-bind-2-8", "q-bind-2-9", "q-bind-2-14", "q-bind-2-15", "q-bind-2-16", "q-bind-2-23", "q-bind-2-24", "q-bind-2-25", "q-bind-2-26", "q-bind-2-27"]', 0, 0, 1),
  ('pkg-sim-2-ing', 'Simulasi TKA Bahasa Inggris Kelas 2 - Basic Vocabulary & Expressions', 15, 70, 'simulasi', 'Kelas 2', 'inggris', '["q-ing-2-7", "q-ing-2-8", "q-ing-2-9", "q-ing-2-10", "q-ing-2-11", "q-ing-2-12", "q-ing-2-13"]', 1, 1, 1),
  ('pkg-sim-2-fiqih', 'Simulasi TKA Fiqih Kelas 2 - Rukun Islam & Salat Wajib', 15, 70, 'simulasi', 'Kelas 2', 'fiqih', '["q-fiqih-2-1"]', 1, 1, 1),
  ('pkg-sim-5-fiqih', 'Simulasi TKA Fiqih Kelas 5 - Paket Utama', 15, 75, 'simulasi', 'Kelas 5', 'fiqih', '["q-fiqih-5-1", "q-fiqih-5-2"]', 1, 1, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `question_ids` = VALUES(`question_ids`);


