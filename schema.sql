-- ========================================================
-- TKA Smart Exam - MySQL Database Schema & Seed Data
-- Database Name: tka_smart_exam / smarttka_db
-- Compatible with MySQL 5.7+ / 8.0+ / MariaDB / Shared Hosting
-- ========================================================

CREATE DATABASE IF NOT EXISTS `smarttka_db` 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `smarttka_db`;

-- --------------------------------------------------------
-- 1. Table Structure for `users`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) NOT NULL,
  `nisn` VARCHAR(64) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `kelas` VARCHAR(32) NOT NULL DEFAULT 'Kelas 5',
  `role` ENUM('siswa', 'admin') NOT NULL DEFAULT 'siswa',
  `password` VARCHAR(128) NOT NULL DEFAULT '123',
  `avatar` LONGTEXT NULL,
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
  `passage` LONGTEXT NULL,
  `question` LONGTEXT NOT NULL,
  `image` LONGTEXT NULL,
  `options` LONGTEXT NOT NULL,
  `answer_key` VARCHAR(64) NOT NULL DEFAULT 'A',
  `explanation` LONGTEXT NULL,
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
  `question_ids` LONGTEXT NOT NULL,
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
  `unanswered_count` INT NOT NULL DEFAULT 0,
  `total_questions` INT NOT NULL DEFAULT 0,
  `kkm` INT NOT NULL DEFAULT 70,
  `status` VARCHAR(32) NOT NULL DEFAULT 'BELUM LULUS',
  `duration_seconds` INT NOT NULL DEFAULT 0,
  `completed_at` VARCHAR(64) NOT NULL,
  `questions` LONGTEXT NULL,
  `answers` LONGTEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Initial Seed Data: Default Admin User
-- --------------------------------------------------------
INSERT INTO `users` (`id`, `nisn`, `name`, `kelas`, `role`, `password`, `avatar`)
VALUES 
  ('u-admin-1', 'ADMIN001', 'Administrator TKA', 'Guru/Admin', 'admin', '123', 'https://api.dicebear.com/7.x/bottts/svg?seed=Admin')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `password` = VALUES(`password`);

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
  ('q-mat-2-9', 'Kelas 2', 'matematika', 'Pengurangan', 'Sedang', NULL, 'Ibu membuat donat.\n\nAda 11 donat cokelat dan 6 donat keju.\n\nSebanyak 9 donat diberikan kepada paman.\n\nPernyataan yang benar adalah ....', NULL, '[{"id":"A","text":"Banyak donat yang dibuat ada 19."},{"id":"B","text":"Selisih banyak donat cokelat dan keju ada 6."},{"id":"C","text":"Sisa donat ibu ada 8."}]', 'C', 'Total donat = 11 + 6 = 17. Sisa donat ibu = 17 − 9 = 8. Jadi pernyataan yang benar adalah sisa donat ibu ada 8.')
ON DUPLICATE KEY UPDATE `question` = VALUES(`question`), `passage` = VALUES(`passage`), `options` = VALUES(`options`), `answer_key` = VALUES(`answer_key`);

INSERT INTO `packages` (`id`, `name`, `duration_minutes`, `kkm`, `mode`, `kelas`, `subject`, `question_ids`, `randomize_questions`, `randomize_options`, `show_results_to_student`)
VALUES
  ('pkg-sim-2-mat', 'Simulasi TKA Matematika Kelas 2 - Paket Utama', 15, 70, 'simulasi', 'Kelas 2', 'matematika', '["q-mat-2-1", "q-mat-2-2", "q-mat-2-3", "q-mat-2-4", "q-mat-2-5", "q-mat-2-6", "q-mat-2-7", "q-mat-2-8", "q-mat-2-9"]', 1, 1, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `question_ids` = VALUES(`question_ids`);

-- --------------------------------------------------------
-- Initial Seed Data: Akidah Akhlak Kelas 2
-- --------------------------------------------------------
INSERT INTO `questions` (`id`, `kelas`, `subject`, `bab`, `difficulty`, `passage`, `question`, `image`, `options`, `answer_key`, `explanation`)
VALUES 
  ('q-akh-2-1', 'Kelas 2', 'akidah_akhlak', 'Kalimat Thayyibah Ta\'awuz', 'Mudah', NULL, 'Kalimat taawuz dibaca ketika kita ingin .... kepada Allah SWT.', NULL, '[{"id":"A","text":"petunjuk"},{"id":"B","text":"perlindungan"},{"id":"C","text":"anugrah"},{"id":"D","text":"kesaksian"}]', 'B', 'Kalimat Ta\'awuz (A\'udzubillahi minasy syaithanir rajim) dibaca ketika kita ingin memohon perlindungan kepada Allah SWT dari godaan setan.'),
  ('q-akh-2-2', 'Kelas 2', 'akidah_akhlak', 'Asmaul Husna', 'Mudah', NULL, 'Arti dari Asmaul Husna Al-Mu\'min adalah Allah Maha ....', NULL, '[{"id":"A","text":"Pemberi rasa aman"},{"id":"B","text":"Agung"},{"id":"C","text":"Melihat"},{"id":"D","text":"Amin"}]', 'A', 'Al-Mu\'min artinya Allah Maha Pemberi rasa aman dan ketenteraman kepada semua makhluk-Nya.'),
  ('q-akh-2-3', 'Kelas 2', 'akidah_akhlak', 'Kalimat Thayyibah Ta\'awuz', 'Mudah', NULL, 'Berikut ini yang bukan manfaat membaca ta\'awudz adalah ....', NULL, '[{"id":"A","text":"melindungi diri segala kejahatan"},{"id":"B","text":"menghilangkan nafsu amarah"},{"id":"C","text":"menimbulkan keresahan hati"}]', 'C', 'Manfaat membaca ta\'awudz antara lain melindungi diri dari kejahatan dan godaan setan serta meredakan amarah. Menimbulkan keresahan hati bukan manfaat membaca ta\'awudz.'),
  ('q-akh-2-4', 'Kelas 2', 'akidah_akhlak', 'Adab Hidup Bersih & Sehat', 'Mudah', NULL, 'Orang yang tidak menjaga kesehatan berarti tidak taat kepada ....', NULL, '[{"id":"A","text":"orang tua"},{"id":"B","text":"Allah Swt."},{"id":"C","text":"guru"}]', 'B', 'Menjaga kesehatan adalah bentuk syukur dan ketaatan kepada perintah Allah Swt.'),
  ('q-akh-2-5', 'Kelas 2', 'akidah_akhlak', 'Kalimat Thayyibah Ta\'awuz', 'Mudah', NULL, 'Meminta perlindungan dari godaan setan adalah makna dari kalimat ....', NULL, '[{"id":"A","text":"tahmid"},{"id":"B","text":"takbir"},{"id":"C","text":"ta\'awuz"}]', 'C', 'Makna kalimat ta\'awuz (A\'udzubillahi minasy syaithanir rajim) adalah memohon perlindungan kepada Allah Swt. dari godaan setan.'),
  ('q-akh-2-6', 'Kelas 2', 'akidah_akhlak', 'Mengenal Sifat Allah Swt.', 'Mudah', NULL, 'Sifat sempurna hanya dimiliki oleh ....', NULL, '[{"id":"A","text":"manusia"},{"id":"B","text":"malaikat"},{"id":"C","text":"Allah Swt."}]', 'C', 'Sifat sempurna dan tanpa kekurangan hanya dimiliki secara mutlak oleh Allah Swt.'),
  ('q-akh-2-7', 'Kelas 2', 'akidah_akhlak', 'Akidah Islam', 'Mudah', NULL, 'Orang yang menyekutukan Allah Swt. tempatnya di ....', NULL, '[{"id":"A","text":"surga"},{"id":"B","text":"neraka"},{"id":"C","text":"dunia"}]', 'B', 'Menyekutukan Allah Swt. (syirik) adalah dosa yang sangat besar dan pelakunya diancam dengan siksa api neraka.'),
  ('q-akh-2-8', 'Kelas 2', 'akidah_akhlak', 'Perlindungan Allah Swt.', 'Mudah', NULL, 'Orang yang beriman pasti akan ... dari marabahaya.', NULL, '[{"id":"A","text":"didatangi"},{"id":"B","text":"dilindungi"},{"id":"C","text":"ditemui"}]', 'B', 'Allah Swt. senantiasa melindungi hamba-hamba-Nya yang beriman dan bertakwa dari marabahaya.'),
  ('q-akh-2-9', 'Kelas 2', 'akidah_akhlak', 'Akidah Islam', 'Mudah', NULL, 'Orang yang tidak beriman pelindungnya adalah ....', NULL, '[{"id":"A","text":"Allah Swt."},{"id":"B","text":"malaikat"},{"id":"C","text":"setan"}]', 'C', 'Orang-orang yang tidak beriman menjadikan setan sebagai pelindung dan pemimpin mereka menuju kesesatan.'),
  ('q-akh-2-10', 'Kelas 2', 'akidah_akhlak', 'Kalimat Thayyibah', 'Mudah', NULL, 'Berikut ini yang bukan kalimat tayibah adalah ....', NULL, '[{"id":"A","text":"takbir"},{"id":"B","text":"tahmid"},{"id":"C","text":"al-Fatihah"}]', 'C', 'Takbir dan tahmid adalah kalimat tayibah, sedangkan Al-Fatihah adalah surah pembuka dalam Al-Qur\'an.'),
  ('q-akh-2-11', 'Kelas 2', 'akidah_akhlak', 'Asmaul Husna', 'Mudah', NULL, 'Siapa yang mampu menghafal asmaulhusna akan ....', NULL, '[{"id":"A","text":"berdosa"},{"id":"B","text":"masuk neraka"},{"id":"C","text":"masuk surga"}]', 'C', 'Rasulullah Saw. bersabda bahwa barang siapa yang menghafal dan mengamalkan Asmaul Husna akan masuk surga.'),
  ('q-akh-2-12', 'Kelas 2', 'akidah_akhlak', 'Asmaul Husna', 'Mudah', NULL, 'Asmaulhusna berjumlah ....', NULL, '[{"id":"A","text":"99"},{"id":"B","text":"100"},{"id":"C","text":"101"}]', 'A', 'Nama-nama indah Allah Swt. (Asmaul Husna) berjumlah 99 nama.'),
  ('q-akh-2-13', 'Kelas 2', 'akidah_akhlak', 'Mengenal Allah Swt.', 'Mudah', NULL, 'Salah satu cara mengenal Allah Swt. adalah dengan mempelajari ....', NULL, '[{"id":"A","text":"asmaulhusna"},{"id":"B","text":"kalimat tayibah"},{"id":"C","text":"asmaulhusna dan kalimat tayibah"}]', 'C', 'Mempelajari Asmaul Husna dan mengamalkan kalimat tayibah adalah sarana terbaik untuk mengenal dan mendekatkan diri kepada Allah Swt.'),
  ('q-akh-2-14', 'Kelas 2', 'akidah_akhlak', 'Asmaul Husna (Al-Mu\'min)', 'Sedang', NULL, 'Allah Swt. yang memberikan rasa aman kepada hamba-Nya, sebab Allah bersifat ....', NULL, '[{"id":"A","text":"الْهَادِي"},{"id":"B","text":"السَّلَامُ"},{"id":"C","text":"الْمُؤْمِنُ"}]', 'C', 'Al-Mu\'min (الْمُؤْمِنُ) artinya Allah Maha Pemberi Rasa Aman kepada seluruh hamba-Nya.'),
  ('q-akh-2-15', 'Kelas 2', 'akidah_akhlak', 'Asmaul Husna (Al-Mu\'min)', 'Mudah', NULL, 'Allah Swt. memiliki sifat Al-Mu\'min, artinya Maha ....', NULL, '[{"id":"A","text":"Pemberi Rasa Aman"},{"id":"B","text":"Bijaksana"},{"id":"C","text":"Pemberi Keselamatan"}]', 'A', 'Al-Mu\'min artinya Allah Maha Pemberi Rasa Aman dan ketenteraman.'),
  ('q-akh-2-16', 'Kelas 2', 'akidah_akhlak', 'Menjaga Iman & Ibadah', 'Mudah', NULL, 'Selalu menjaga iman dilakukan dengan ....', NULL, '[{"id":"A","text":"rajin beribadah"},{"id":"B","text":"rajin belajar"},{"id":"C","text":"berolahraga"}]', 'A', 'Iman kita dapat senantiasa terjaga dan bertambah kuat dengan rajin beribadah dan taat kepada perintah Allah Swt.'),
  ('q-akh-2-17', 'Kelas 2', 'akidah_akhlak', 'Menjaga Akal & Belajar', 'Mudah', NULL, 'Selalu menjaga akal dilakukan dengan ....', NULL, '[{"id":"A","text":"rajin beribadah"},{"id":"B","text":"rajin belajar"},{"id":"C","text":"berolahraga"}]', 'B', 'Akal pikiran yang dianugerahkan Allah Swt. dijaga dan diasah dengan rajin belajar serta menuntut ilmu yang bermanfaat.'),
  ('q-akh-2-18', 'Kelas 2', 'akidah_akhlak', 'Mensyukuri Nikmat Harta', 'Mudah', NULL, 'Sedekah adalah bentuk rasa syukur kita atas nikmat ....', NULL, '[{"id":"A","text":"jasmani"},{"id":"B","text":"harta benda"},{"id":"C","text":"rohani"}]', 'B', 'Mengeluarkan sedekah atau infak adalah wujud syukur seorang muslim atas nikmat harta benda dan rezeki yang diberikan Allah Swt.'),
  ('q-akh-2-19', 'Kelas 2', 'akidah_akhlak', 'Mengenal Sifat Allah (Ar-Razzaq)', 'Mudah', NULL, 'Allah Swt. memberikan rezeki kepada ....', NULL, '[{"id":"A","text":"manusia saja"},{"id":"B","text":"hewan saja"},{"id":"C","text":"semua makhluk"}]', 'C', 'Allah Swt. adalah Maha Pemberi Rezeki (Ar-Razzaq) yang menjamin rezeki untuk semua makhluk ciptaan-Nya di alam semesta.'),
  ('q-akh-2-20', 'Kelas 2', 'akidah_akhlak', 'Ikhtiar dan Tawakal', 'Mudah', NULL, 'Untuk mendapatkan rezeki, kita harus berdoa dan ....', NULL, '[{"id":"A","text":"berusaha"},{"id":"B","text":"bersabar"},{"id":"C","text":"menunggu"}]', 'A', 'Setiap muslim diajarkan untuk bersungguh-sungguh berusaha (ikhtiar) serta diiringi dengan doa kepada Allah Swt. dalam mencari rezeki.'),
  ('q-akh-2-21', 'Kelas 2', 'akidah_akhlak', 'Akhlak Terpuji', 'Mudah', NULL, 'Jika diberi sesuatu oleh orang lain kita harus ....', NULL, '[{"id":"A","text":"berterima kasih"},{"id":"B","text":"menolak"},{"id":"C","text":"diam saja"}]', 'A', 'Adab yang baik ketika menerima pemberian atau kebaikan dari orang lain adalah mengucapkan terima kasih (Jazakallahu khairan).'),
  ('q-akh-2-22', 'Kelas 2', 'akidah_akhlak', 'Nikmat Akal', 'Mudah', NULL, 'Manusia mengetahui benar atau salah, karena memiliki ....', NULL, '[{"id":"A","text":"akal"},{"id":"B","text":"hidung"},{"id":"C","text":"mata"}]', 'A', 'Akal adalah anugerah istimewa dari Allah Swt. yang membedakan manusia dari makhluk lain dan berfungsi untuk membedakan hal yang benar dan salah.'),
  ('q-akh-2-23', 'Kelas 2', 'akidah_akhlak', 'Macam-Macam Nikmat Allah', 'Mudah', NULL, 'Rasa sedih dan senang merupakan nikmat ....', NULL, '[{"id":"A","text":"rohani"},{"id":"B","text":"jasmani"},{"id":"C","text":"harta benda"}]', 'A', 'Perasaan, ketenangan, kebahagiaan, dan suasana hati termasuk ke dalam kategori nikmat rohani (batin).'),
  ('q-akh-2-24', 'Kelas 2', 'akidah_akhlak', 'Sifat Allah (Al-Ghani)', 'Mudah', NULL, 'Allah Swt. senantiasa memberikan rezeki kepada hamba-Nya, karena Allah Maha ....', NULL, '[{"id":"A","text":"pengampun"},{"id":"B","text":"pemaaf"},{"id":"C","text":"kaya"}]', 'C', 'Allah Swt. memiliki sifat Al-Ghaniy yang artinya Maha Kaya dan tidak membutuhkan apa pun dari makhluk-Nya, justru Allah yang melimpahkan kekayaan.'),
  ('q-akh-2-25', 'Kelas 2', 'akidah_akhlak', 'Mensyukuri Nikmat Harta', 'Mudah', NULL, 'Mensyukuri nikmat harta yang kita miliki dapat dengan ....', NULL, '[{"id":"A","text":"olahraga"},{"id":"B","text":"berinfak"},{"id":"C","text":"sekolah"}]', 'B', 'Berinfak dan membantu sesama yang membutuhkan merupakan cara utama dalam mensyukuri rezeki dan harta yang kita miliki.'),
  ('q-akh-2-26', 'Kelas 2', 'akidah_akhlak', 'Akhlak Terpuji (Syukur)', 'Mudah', NULL, 'Anak yang bersyukur tidak suka ....', NULL, '[{"id":"A","text":"mengeluh"},{"id":"B","text":"bersedekah"},{"id":"C","text":"menabung"}]', 'A', 'Ciri anak yang pandai bersyukur adalah selalu merasa cukup (qanaah) serta tidak mudah mengeluh atas keadaan yang dihadapinya.'),
  ('q-akh-2-27', 'Kelas 2', 'akidah_akhlak', 'Memanfaatkan Nikmat Allah', 'Mudah', NULL, 'Nikmat yang kita peroleh harus kita manfaatkan untuk ....', NULL, '[{"id":"A","text":"kesia-siaan"},{"id":"B","text":"senang-senang"},{"id":"C","text":"ketaatan"}]', 'C', 'Segala nikmat yang Allah berikan hendaknya digunakan untuk ketaatan, beribadah, dan berbuat kebajikan.'),
  ('q-akh-2-28', 'Kelas 2', 'akidah_akhlak', 'Akhlak Terpuji (Tawaduk)', 'Mudah', NULL, 'Rendah hati dalam Islam disebut ....', NULL, '[{"id":"A","text":"tawaduk"},{"id":"B","text":"husnuzan"},{"id":"C","text":"rida"}]', 'A', 'Tawaduk artinya sikap rendah hati, tidak sombong, dan tidak membanggakan diri di hadapan orang lain.'),
  ('q-akh-2-29', 'Kelas 2', 'akidah_akhlak', 'Menghindari Sifat Sombong', 'Mudah', NULL, 'Orang yang sombong akan ... orang lain.', NULL, '[{"id":"A","text":"disukai"},{"id":"B","text":"dijauhi"},{"id":"C","text":"disenangi"}]', 'B', 'Sifat sombong (takabur) dibenci oleh Allah Swt. dan membuat orang lain merasa tidak nyaman sehingga akan menjauhinya.'),
  ('q-akh-2-30', 'Kelas 2', 'akidah_akhlak', 'Adab Bersin & Menguap', 'Mudah', NULL, 'Penting untuk mendoakan teman yang bersin. Hal ini karena ....', NULL, '[{"id":"A","text":"menunjukkan sikap tidak peduli"},{"id":"B","text":"mengingatkan kita untuk bersyukur"},{"id":"C","text":"merenggangkan hubungan persahabatan"}]', 'B', 'Mendoakan orang yang bersin dengan mengucapkan \'Yarhamukallah\' mempererat ukhuwah dan mengingatkan kita untuk saling bersyukur atas nikmat kesehatan.'),
  ('q-akh-2-31', 'Kelas 2', 'akidah_akhlak', 'Adab Bersin & Menguap', 'Mudah', NULL, 'Lelah/letih, kantuk, dan kenyang menjadi penyebab kita ....', NULL, '[{"id":"A","text":"menguap"},{"id":"B","text":"bersin"},{"id":"C","text":"sehat"}]', 'A', 'Menguap umumnya terjadi saat tubuh merasa lelah, mengantuk, atau terlalu kenyang. Ketika menguap disunnahkan untuk menutup mulut.'),
  ('q-akh-2-32', 'Kelas 2', 'akidah_akhlak', 'Mengenal Sifat Allah', 'Mudah', NULL, 'Allah adalah Tuhan yang Maha ....', NULL, '[{"id":"A","text":"Lupa"},{"id":"B","text":"Lemah"},{"id":"C","text":"Esa"},{"id":"D","text":"Marah"}]', 'C', 'Allah adalah Tuhan yang Maha Esa (tunggal/satu), tiada sekutu bagi-Nya.'),
  ('q-akh-2-33', 'Kelas 2', 'akidah_akhlak', 'Beriman kepada Malaikat', 'Mudah', NULL, 'Malaikat adalah makhluk Allah yang diciptakan dari ....', NULL, '[{"id":"A","text":"Tanah"},{"id":"B","text":"Cahaya"},{"id":"C","text":"Api"},{"id":"D","text":"Air"}]', 'B', 'Malaikat diciptakan oleh Allah Swt. dari cahaya (nur).'),
  ('q-akh-2-34', 'Kelas 2', 'akidah_akhlak', 'Sifat Wajib Allah', 'Mudah', NULL, 'Sifat wajib Allah berarti sifat yang ....', NULL, '[{"id":"A","text":"Tidak mungkin dimiliki Allah"},{"id":"B","text":"Pasti dimiliki Allah"},{"id":"C","text":"Dimiliki manusia"},{"id":"D","text":"Dimiliki hewan"}]', 'B', 'Sifat wajib bagi Allah adalah sifat-sifat kesempurnaan yang pasti ada dan dimiliki oleh Allah Swt.'),
  ('q-akh-2-35', 'Kelas 2', 'akidah_akhlak', 'Sifat Wajib Allah (Wujud)', 'Mudah', NULL, 'Contoh sifat wajib Allah adalah ....', NULL, '[{"id":"A","text":"Mati"},{"id":"B","text":"Lupa"},{"id":"C","text":"Ada"},{"id":"D","text":"Tidur"}]', 'C', 'Salah satu sifat wajib bagi Allah adalah Wujud yang berarti Ada.'),
  ('q-akh-2-36', 'Kelas 2', 'akidah_akhlak', 'Asmaul Husna (Al-Bashir)', 'Mudah', NULL, 'Allah Maha Melihat disebut ....', NULL, '[{"id":"A","text":"Al-Bashir"},{"id":"B","text":"Al-\'Alim"},{"id":"C","text":"Al-Quddus"},{"id":"D","text":"Al-Ahad"}]', 'A', 'Al-Bashir (الْبَصِيرُ) adalah Asmaul Husna yang berarti Allah Maha Melihat segala hal.'),
  ('q-akh-2-37', 'Kelas 2', 'akidah_akhlak', 'Akhlak Terpuji (Jujur)', 'Mudah', NULL, 'Sikap jujur adalah contoh akhlak ....', NULL, '[{"id":"A","text":"Terpuji"},{"id":"B","text":"Tercela"},{"id":"C","text":"Sombong"},{"id":"D","text":"Malas"}]', 'A', 'Sikap jujur (sidiq) merupakan contoh akhlak terpuji (akhlakul karimah).'),
  ('q-akh-2-38', 'Kelas 2', 'akidah_akhlak', 'Berbakti kepada Orang Tua', 'Mudah', NULL, 'Membantu orang tua termasuk akhlak ....', NULL, '[{"id":"A","text":"Buruk"},{"id":"B","text":"Tercela"},{"id":"C","text":"Terpuji"},{"id":"D","text":"Jahat"}]', 'C', 'Membantu dan berbakti kepada orang tua adalah akhlak terpuji yang sangat dianjurkan dalam Islam.'),
  ('q-akh-2-39', 'Kelas 2', 'akidah_akhlak', 'Akhlak Terpuji vs Tercela', 'Mudah', NULL, 'Lawan dari sifat jujur adalah ....', NULL, '[{"id":"A","text":"Pemurah"},{"id":"B","text":"Bohong"},{"id":"C","text":"Rajin"},{"id":"D","text":"Sabar"}]', 'B', 'Lawan dari sifat jujur adalah bohong atau dusta.'),
  ('q-akh-2-40', 'Kelas 2', 'akidah_akhlak', 'Akhlak Terpuji (Amanah)', 'Mudah', NULL, 'Sifat amanah berarti ....', NULL, '[{"id":"A","text":"Tidak memegang janji"},{"id":"B","text":"Tidak dapat dipercaya"},{"id":"C","text":"Bisa dipercaya"},{"id":"D","text":"Suka marah"}]', 'C', 'Amanah artinya dapat dipercaya dan bertanggung jawab terhadap apa yang diamanahkan.'),
  ('q-akh-2-41', 'Kelas 2', 'akidah_akhlak', 'Akhlak kepada Diri Sendiri', 'Mudah', NULL, 'Rajin belajar termasuk akhlak kepada ....', NULL, '[{"id":"A","text":"Allah"},{"id":"B","text":"Sesama manusia"},{"id":"C","text":"Diri sendiri"},{"id":"D","text":"Hewan"}]', 'C', 'Rajin belajar dan menjaga diri merupakan wujud akhlak terpuji terhadap diri sendiri.'),
  ('q-akh-2-42', 'Kelas 2', 'akidah_akhlak', 'Asmaul Husna (Al-\'Alim)', 'Mudah', NULL, 'Allah Maha Mengetahui segala sesuatu, disebut ....', NULL, '[{"id":"A","text":"Al-Bashir"},{"id":"B","text":"Al-\'Alim"},{"id":"C","text":"Ar-Rahim"},{"id":"D","text":"Al-Khaliq"}]', 'B', 'Al-\'Alim (الْعَلِيمُ) artinya Allah Maha Mengetahui segala sesuatu.'),
  ('q-akh-2-43', 'Kelas 2', 'akidah_akhlak', 'Adab kepada Guru', 'Mudah', NULL, 'Menghormati guru termasuk akhlak kepada ....', NULL, '[{"id":"A","text":"Hewan"},{"id":"B","text":"Orang tua"},{"id":"C","text":"Sesama"},{"id":"D","text":"Guru"}]', 'D', 'Menghormati guru adalah bentuk adab dan akhlak mulia kepada guru.'),
  ('q-akh-2-44', 'Kelas 2', 'akidah_akhlak', 'Adab Berteman', 'Mudah', NULL, 'Berbuat baik kepada teman dapat membuat ....', NULL, '[{"id":"A","text":"Banyak musuh"},{"id":"B","text":"Banyak teman"},{"id":"C","text":"Tidak disukai"},{"id":"D","text":"Sombong"}]', 'B', 'Berbuat baik dan saling tolong-menolong membuat kita disenangi dan memiliki banyak teman.'),
  ('q-akh-2-45', 'Kelas 2', 'akidah_akhlak', 'Asmaul Husna (Al-Khaliq)', 'Mudah', NULL, 'Allah Maha Pencipta disebut ....', NULL, '[{"id":"A","text":"Al-Ahad"},{"id":"B","text":"Ar-Rahman"},{"id":"C","text":"Al-Khaliq"},{"id":"D","text":"Al-Malik"}]', 'C', 'Al-Khaliq (الْخَالِقُ) adalah nama Allah yang berarti Maha Pencipta seluruh alam semesta.')
ON DUPLICATE KEY UPDATE `question` = VALUES(`question`), `passage` = VALUES(`passage`), `options` = VALUES(`options`), `answer_key` = VALUES(`answer_key`), `bab` = VALUES(`bab`), `difficulty` = VALUES(`difficulty`), `explanation` = VALUES(`explanation`);

INSERT INTO `packages` (`id`, `name`, `duration_minutes`, `kkm`, `mode`, `kelas`, `subject`, `question_ids`, `randomize_questions`, `randomize_options`, `show_results_to_student`)
VALUES
  ('pkg-sim-2-akh', 'Simulasi TKA Akidah Akhlak Kelas 2 - Paket Lengkap', 35, 70, 'simulasi', 'Kelas 2', 'akidah_akhlak', '["q-akh-2-1", "q-akh-2-2", "q-akh-2-3", "q-akh-2-4", "q-akh-2-5", "q-akh-2-6", "q-akh-2-7", "q-akh-2-8", "q-akh-2-9", "q-akh-2-10", "q-akh-2-11", "q-akh-2-12", "q-akh-2-13", "q-akh-2-14", "q-akh-2-15", "q-akh-2-16", "q-akh-2-17", "q-akh-2-18", "q-akh-2-19", "q-akh-2-20", "q-akh-2-21", "q-akh-2-22", "q-akh-2-23", "q-akh-2-24", "q-akh-2-25", "q-akh-2-26", "q-akh-2-27", "q-akh-2-28", "q-akh-2-29", "q-akh-2-30", "q-akh-2-31", "q-akh-2-32", "q-akh-2-33", "q-akh-2-34", "q-akh-2-35", "q-akh-2-36", "q-akh-2-37", "q-akh-2-38", "q-akh-2-39", "q-akh-2-40", "q-akh-2-41", "q-akh-2-42", "q-akh-2-43", "q-akh-2-44", "q-akh-2-45"]', 1, 1, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `question_ids` = VALUES(`question_ids`), `duration_minutes` = 35;

-- --------------------------------------------------------
-- Initial Seed Data: Al-Qur'an Hadis Kelas 2
-- --------------------------------------------------------
INSERT INTO `questions` (`id`, `kelas`, `subject`, `bab`, `difficulty`, `passage`, `question`, `image`, `options`, `answer_key`, `explanation`)
VALUES 
  ('q-quran-2-1', 'Kelas 2', 'quran_hadis', 'Menyambung Huruf Hijaiyah', 'Mudah', NULL, '“Nahārun” jika ditulis dengan huruf hijaiyah bersambung menjadi ....', NULL, '[{"id":"A","text":"نَهَرٌ"},{"id":"B","text":"نَهَارٌ"},{"id":"C","text":"نَاهِرٌ"}]', 'B', 'Lafal “Nahārun” memiliki mad thabi\'i pada huruf ha (hā), sehingga ditulis نَهَارٌ dengan huruf alif setelah huruf ha.'),
  ('q-quran-2-2', 'Kelas 2', 'quran_hadis', 'Memisah Huruf Hijaiyah', 'Mudah', NULL, 'Lafal صَعْبٌ bila dipisah penulisannya menjadi ....', NULL, '[{"id":"A","text":"ع ص ب"},{"id":"B","text":"ص ب ع"},{"id":"C","text":"ب ع ص"}]', 'C', 'Lafal صَعْبٌ tersusun atas huruf ص – ع – ب. Jika dibaca dari kanan ke kiri urutannya adalah ص – ع – ب (pilihan C: ب ع ص).'),
  ('q-quran-2-3', 'Kelas 2', 'quran_hadis', 'Tanda Baca (Harakat)', 'Mudah', NULL, 'Huruf hamzah (ء) apabila berharakat dammah dibaca ....', NULL, '[{"id":"A","text":"a"},{"id":"B","text":"i"},{"id":"C","text":"u"}]', 'C', 'Harakat dammah ( ُ ) berbunyi vokal \'u\'. Jadi huruf hamzah (ء) yang berharakat dammah dibaca \'u\'.'),
  ('q-quran-2-4', 'Kelas 2', 'quran_hadis', 'Membaca Kosakata Hijaiyah', 'Mudah', NULL, 'Perhatikan gambar berikut!\n\nLafal huruf hijaiyah yang sesuai dengan gambar di atas adalah ....', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="200" viewBox="0 0 260 200"><rect width="260" height="200" fill="%23f8fafc" rx="12"/><circle cx="130" cy="85" r="55" fill="%23fbbf24" stroke="%23d97706" stroke-width="4"/><polygon points="130,45 143,72 173,76 151,97 156,127 130,113 104,127 109,97 87,76 117,72" fill="%23fef08a" stroke="%23b45309" stroke-width="2"/><path d="M100 130 L85 180 L112 165 L130 180 L130 135 Z" fill="%23ef4444"/><path d="M160 130 L175 180 L148 165 L130 180 L130 135 Z" fill="%23dc2626"/><text x="130" y="195" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23475569" text-anchor="middle">Lencana / Badge</text></svg>', '[{"id":"A","text":"تَاجٌ"},{"id":"B","text":"بَاغٌ"},{"id":"C","text":"بَاجٌ"}]', 'C', 'Gambar tersebut menunjukkan lencana/badge yang dalam bahasa Arab dilafalkan بَاجٌ (baaj).'),
  ('q-quran-2-5', 'Kelas 2', 'quran_hadis', 'Kaidah Menyambung Huruf', 'Mudah', NULL, 'Huruf ي tidak bisa digabung apabila sebelumnya huruf ....', NULL, '[{"id":"A","text":"jim"},{"id":"B","text":"wawu"},{"id":"C","text":"ba\'"}]', 'B', 'Huruf wawu (و) adalah salah satu huruf yang tidak bisa menyambung dengan huruf setelahnya. Oleh karena itu huruf ي tidak bisa digabung jika didahului huruf wawu.'),
  ('q-quran-2-6', 'Kelas 2', 'quran_hadis', 'Mengenal Huruf Lam Alif', 'Mudah', NULL, 'Huruf لا disebut dengan huruf ....', NULL, '[{"id":"A","text":"Lam"},{"id":"B","text":"alif"},{"id":"C","text":"Lam alif"}]', 'C', 'Huruf لا adalah perpaduan antara huruf Lam (ل) dan Alif (ا) yang disebut dengan huruf Lam Alif.'),
  ('q-quran-2-7', 'Kelas 2', 'quran_hadis', 'Tanda Baca (Harakat)', 'Mudah', NULL, 'Zainab menulis huruf mim. Huruf yang ia tulis dibaca “mi”. Huruf yang ditulis Zainab berharakat ....', NULL, '[{"id":"A","text":"fathah"},{"id":"B","text":"kasrah"},{"id":"C","text":"dammah"}]', 'B', 'Harakat kasrah ( ِ ) menghasilkan bunyi vokal \'i\', sehingga huruf mim yang berharakat kasrah dibaca \'mi\' (مِ).'),
  ('q-quran-2-8', 'Kelas 2', 'quran_hadis', 'Bentuk Huruf Hijaiyah', 'Mudah', NULL, 'Huruf ج di awal kata ditulis ....', NULL, '[{"id":"A","text":"جـ"},{"id":"B","text":"ـج"},{"id":"C","text":"ـجـ"}]', 'A', 'Bentuk huruf jim (ج) ketika ditulis di awal kata adalah جـ (menyambung ke huruf setelahnya).'),
  ('q-quran-2-9', 'Kelas 2', 'quran_hadis', 'Mengenal Huruf Hijaiyah', 'Mudah', NULL, 'Huruf hijaiyah berjumlah ....', NULL, '[{"id":"A","text":"21"},{"id":"B","text":"25"},{"id":"C","text":"29"}]', 'C', 'Jumlah huruf hijaiyah pokok dalam bahasa Arab adalah 29 huruf.'),
  ('q-quran-2-10', 'Kelas 2', 'quran_hadis', 'Bentuk Huruf Hijaiyah', 'Mudah', NULL, 'Salah satu huruf hijaiyah yang memiliki bentuk tunggal adalah ....', NULL, '[{"id":"A","text":"د"},{"id":"B","text":"هـ"},{"id":"C","text":"ل"}]', 'A', 'Huruf dal (د) memiliki bentuk tunggal yang tidak berubah di awal kata dan tidak dapat menyambung ke huruf setelahnya.'),
  ('q-quran-2-11', 'Kelas 2', 'quran_hadis', 'Membaca Kosakata Hijaiyah', 'Mudah', NULL, 'بُوكٌ\n\nGambar yang sesuai dengan lafal di atas adalah ....', NULL, '[{"id":"A","text":"📖 Buku"},{"id":"B","text":"🪑 Kursi"},{"id":"C","text":"🕐 Jam"}]', 'A', 'Lafal بُوكٌ (buukun) berbunyi dan melambangkan buku, sehingga gambar yang sesuai adalah Buku.'),
  ('q-quran-2-12', 'Kelas 2', 'quran_hadis', 'Tanda Baca (Harakat)', 'Mudah', NULL, 'Aldi menulis huruf hijaiyah berharakat dammah.\nHuruf yang ditulis Aldi adalah ....', NULL, '[{"id":"A","text":"مُ"},{"id":"B","text":"طُ"},{"id":"C","text":"نُ"}]', 'A', 'Huruf yang berharakat dammah adalah مُ (mu).'),
  ('q-quran-2-13', 'Kelas 2', 'quran_hadis', 'Penulisan Al-Qur\'an', 'Mudah', NULL, 'Ayat-ayat yang ada di dalam Al-Qur’an ditulis dengan menggunakan huruf hijaiyah ....', NULL, '[{"id":"A","text":"pisah"},{"id":"B","text":"bersambung"},{"id":"C","text":"acak"}]', 'B', 'Ayat-ayat suci di dalam mushaf Al-Qur’an ditulis dengan menggunakan huruf hijaiyah bersambung.'),
  ('q-quran-2-14', 'Kelas 2', 'quran_hadis', 'Membedah Huruf Hijaiyah', 'Mudah', NULL, 'Kata يَنْفَعُ terdiri atas huruf ....', NULL, '[{"id":"A","text":"ya, nun, fa, ‘ain"},{"id":"B","text":"ya, nun, qaf, ‘ain"},{"id":"C","text":"ya, nun, qaf, gain"}]', 'A', 'Lafal يَنْفَعُ tersusun dari huruf ya (ي), nun (ن), fa (ف), dan ‘ain (ع).'),
  ('q-quran-2-15', 'Kelas 2', 'quran_hadis', 'Membaca Huruf Hijaiyah Berharakat', 'Mudah', NULL, 'Lafal نُظِرَ cara membacanya ....', NULL, '[{"id":"A","text":"nuzira"},{"id":"B","text":"nudira"},{"id":"C","text":"nuẓira"}]', 'C', 'Huruf nun berharakat dammah (nu), zha berharakat kasrah (ẓi), dan ra berharakat fathah (ra), dibaca nuẓira.'),
  ('q-quran-2-16', 'Kelas 2', 'quran_hadis', 'Bentuk Huruf Hijaiyah', 'Mudah', NULL, 'Huruf hijaiyah yang tidak akan berubah bentuk meskipun di tengah, awal, dan akhir adalah ....', NULL, '[{"id":"A","text":"س"},{"id":"B","text":"ص"},{"id":"C","text":"ر"}]', 'C', 'Huruf Ra (ر) bentuk dasarnya tetap dan tidak berubah bentuk kepala/badannya di posisi awal, tengah, maupun akhir.'),
  ('q-quran-2-17', 'Kelas 2', 'quran_hadis', 'Membaca Kosakata Hijaiyah', 'Mudah', NULL, 'Perhatikan gambar berikut!\n\nLafal huruf hijaiyah yang sesuai dengan gambar di atas adalah ....', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="260" height="200" viewBox="0 0 260 200"><rect width="260" height="200" fill="%23f8fafc" rx="12"/><path d="M70,120 Q110,60 180,80 Q200,90 205,110 Q190,120 160,110 Q120,115 90,140 Z" fill="%23fb923c" stroke="%23ea580c" stroke-width="3"/><circle cx="185" cy="88" r="4" fill="%231e293b"/><path d="M195,85 Q220,65 240,70" fill="none" stroke="%23ea580c" stroke-width="2"/><path d="M195,88 Q225,85 245,95" fill="none" stroke="%23ea580c" stroke-width="2"/><text x="130" y="180" font-family="sans-serif" font-size="12" font-weight="bold" fill="%23475569" text-anchor="middle">Ilustrasi (غَمْبٌ)</text></svg>', '[{"id":"A","text":"دَمَجٌ"},{"id":"B","text":"جَمْجٌ"},{"id":"C","text":"غَمْبٌ"}]', 'C', 'Lafal huruf hijaiyah yang sesuai dengan ilustrasi gambar adalah غَمْبٌ.'),
  ('q-quran-2-18', 'Kelas 2', 'quran_hadis', 'Kaidah Menyambung Huruf Hijaiyah', 'Mudah', NULL, 'Huruf hijaiyah yang tidak boleh disambung ke huruf sesudahnya berjumlah ....', NULL, '[{"id":"A","text":"lima"},{"id":"B","text":"enam"},{"id":"C","text":"tujuh"}]', 'B', 'Ada 6 huruf hijaiyah yang tidak bisa menyambung ke huruf sesudahnya (hanya bisa disambung dari depan), yaitu: ا, د, ذ, ر, ز, و.'),
  ('q-quran-2-19', 'Kelas 2', 'quran_hadis', 'Hukum Bacaan Gunnah', 'Mudah', NULL, 'Gunnah berarti mengeluarkan suara melalui ....', NULL, '[{"id":"A","text":"hidung"},{"id":"B","text":"gusi"},{"id":"C","text":"tenggorokan"}]', 'A', 'Gunnah secara bahasa artinya dengung, yaitu suara merdu yang keluar dari pangkal hidung (al-khaisyum).'),
  ('q-quran-2-20', 'Kelas 2', 'quran_hadis', 'Hukum Bacaan Gunnah', 'Mudah', NULL, 'Membaca bacaan gunnah adalah dengan mendengung dan ....', NULL, '[{"id":"A","text":"dilepaskan"},{"id":"B","text":"dipantulkan"},{"id":"C","text":"ditahan"}]', 'C', 'Cara membaca gunnah adalah dengan mendengung dan ditahan sepanjang 2 harakat.'),
  ('q-quran-2-21', 'Kelas 2', 'quran_hadis', 'Huruf-Huruf Gunnah', 'Mudah', NULL, 'Ada beberapa huruf hijaiyah yang termasuk dalam huruf gunnah. Huruf berikut yang termasuk huruf gunnah adalah ....', NULL, '[{"id":"A","text":"ن"},{"id":"B","text":"ل"},{"id":"C","text":"ك"}]', 'A', 'Huruf yang memiliki sifat gunnah pokok adalah huruf Nun (ن) dan Mim (م).'),
  ('q-quran-2-22', 'Kelas 2', 'quran_hadis', 'Jenis-Jenis Gunnah', 'Sedang', NULL, 'Gunnah yang terdapat pada hukum bacaan tajwid selain gunnah asliyah, disebut ....', NULL, '[{"id":"A","text":"gunnah asliyah"},{"id":"B","text":"gunnah ‘aridah"},{"id":"C","text":"gunnah syamsiyah"}]', 'B', 'Gunnah \'aridah adalah bacaan gunnah yang timbul karena sebab hukum tajwid tertentu seperti Idgham Bighunnah, Ikhfa, atau Iqlab.'),
  ('q-quran-2-23', 'Kelas 2', 'quran_hadis', 'Tanda Baca (Harakat)', 'Mudah', NULL, 'Tanda baca ْ disebut ....', NULL, '[{"id":"A","text":"tasydid"},{"id":"B","text":"tanwin"},{"id":"C","text":"sukun"}]', 'C', 'Tanda bulat/lingkaran kecil di atas huruf ( ْ ) disebut tanda sukun (tanda mati).'),
  ('q-quran-2-24', 'Kelas 2', 'quran_hadis', 'Keutamaan Membaca Al-Qur\'an', 'Mudah', NULL, 'Membaca Al-Qur’an termasuk kegiatan ....', NULL, '[{"id":"A","text":"sosial"},{"id":"B","text":"ibadah"},{"id":"C","text":"sia-sia"}]', 'B', 'Membaca kitab suci Al-Qur’an merupakan amal ibadah yang mendatangkan pahala dan kebaikan berlipat ganda.'),
  ('q-quran-2-25', 'Kelas 2', 'quran_hadis', 'Hukum Mim Sukun (Idgham Mimi)', 'Sedang', NULL, 'Bacaan gunnah yang terjadi jika terdapat huruf mim sukun bertemu dengan huruf mim berharakat hidup adalah ....', NULL, '[{"id":"A","text":"ikhfa’"},{"id":"B","text":"idgam mimi"},{"id":"C","text":"iqlab"}]', 'B', 'Pertemuan antara mim sukun (مْ) dengan huruf mim berharakat (م) dinamakan hukum Idgham Mimi atau Idgham Mutamatsilain.'),
  ('q-quran-2-26', 'Kelas 2', 'quran_hadis', 'Tanda Baca Tasydid', 'Mudah', NULL, 'Cara membaca huruf yang bertanda baca tasydid adalah ....', NULL, '[{"id":"A","text":"tebal"},{"id":"B","text":"tipis"},{"id":"C","text":"dobel"}]', 'C', 'Tanda tasydid/syaddah ( ّ ) menunjukkan huruf tersebut dibaca rangkap (dobel) dan ditekan.'),
  ('q-quran-2-27', 'Kelas 2', 'quran_hadis', 'Hukum Nun Sukun (Idgham Bighunnah)', 'Sedang', NULL, 'Lafal مَنْ وَرَائِهِمْ merupakan contoh bacaan ....', NULL, '[{"id":"A","text":"ikhfa’"},{"id":"B","text":"iqlab"},{"id":"C","text":"idgam bigunnah"}]', 'C', 'Nun sukun (نْ) bertemu huruf wawu (و) dibaca dengung dan melebur (Idgham Bighunnah).'),
  ('q-quran-2-28', 'Kelas 2', 'quran_hadis', 'Jenis-Jenis Gunnah', 'Sedang', NULL, 'Guru menjelaskan jenis-jenis gunnah. Gunnah yang hanya dalam keadaan tertentu disebut ....', NULL, '[{"id":"A","text":"gunnah asliyah"},{"id":"B","text":"gunnah ‘aridah"},{"id":"C","text":"gunnah syamsiyah"}]', 'B', 'Gunnah yang terjadi hanya dalam kondisi pertemuan hukum tajwid tertentu disebut gunnah \'aridah.'),
  ('q-quran-2-29', 'Kelas 2', 'quran_hadis', 'Hukum Mim Sukun (Ikhfa Syafawi)', 'Sedang', NULL, 'Ali menemukan hukum ikhfa’ syafawi dalam ayat. Hukum bacaan tersebut terjadi apabila ada huruf mim sukun bertemu dengan huruf ....', NULL, '[{"id":"A","text":"ba’"},{"id":"B","text":"ra’"},{"id":"C","text":"nun"}]', 'A', 'Hukum Ikhfa Syafawi terjadi apabila mim sukun (مْ) bertemu dengan huruf ba\' (ب).')
ON DUPLICATE KEY UPDATE `question` = VALUES(`question`), `passage` = VALUES(`passage`), `options` = VALUES(`options`), `answer_key` = VALUES(`answer_key`), `bab` = VALUES(`bab`), `difficulty` = VALUES(`difficulty`), `explanation` = VALUES(`explanation`);

INSERT INTO `packages` (`id`, `name`, `duration_minutes`, `kkm`, `mode`, `kelas`, `subject`, `question_ids`, `randomize_questions`, `randomize_options`, `show_results_to_student`)
VALUES
  ('pkg-sim-2-quran', 'Simulasi TKA Al-Qur''an Hadis Kelas 2 - Huruf Hijaiyah & Tanda Baca', 25, 70, 'simulasi', 'Kelas 2', 'quran_hadis', '["q-quran-2-1", "q-quran-2-2", "q-quran-2-3", "q-quran-2-4", "q-quran-2-5", "q-quran-2-6", "q-quran-2-7", "q-quran-2-8", "q-quran-2-9", "q-quran-2-10", "q-quran-2-11", "q-quran-2-12", "q-quran-2-13", "q-quran-2-14", "q-quran-2-15", "q-quran-2-16", "q-quran-2-17", "q-quran-2-18", "q-quran-2-19", "q-quran-2-20", "q-quran-2-21", "q-quran-2-22", "q-quran-2-23", "q-quran-2-24", "q-quran-2-25", "q-quran-2-26", "q-quran-2-27", "q-quran-2-28", "q-quran-2-29"]', 1, 1, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `question_ids` = VALUES(`question_ids`), `duration_minutes` = 25;

-- --------------------------------------------------------
-- Initial Seed Data: Pendidikan Pancasila Kelas 2
-- --------------------------------------------------------
INSERT INTO `questions` (`id`, `kelas`, `subject`, `bab`, `difficulty`, `passage`, `question`, `image`, `options`, `answer_key`, `explanation`)
VALUES 
  ('q-pan-2-1', 'Kelas 2', 'pancasila', 'Dasar Negara Pancasila', 'Mudah', NULL, 'Dasar negara Indonesia adalah ....', NULL, '[{"id":"A","text":"UUD"},{"id":"B","text":"Pancasila"},{"id":"C","text":"Bhinneka Tunggal Ika"},{"id":"D","text":"Garuda"}]', 'B', 'Pancasila merupakan dasar falsafah dan landasan fundamental negara Indonesia.'),
  ('q-pan-2-2', 'Kelas 2', 'pancasila', 'Simbol Sila Pancasila', 'Mudah', NULL, 'Lambang sila pertama Pancasila adalah ....', NULL, '[{"id":"A","text":"bintang"},{"id":"B","text":"rantai"},{"id":"C","text":"pohon beringin"},{"id":"D","text":"kepala banteng"}]', 'A', 'Simbol sila pertama Pancasila (Ketuhanan Yang Maha Esa) adalah Bintang emas bersegi lima.'),
  ('q-pan-2-3', 'Kelas 2', 'pancasila', 'Bunyi Sila Pancasila', 'Mudah', NULL, 'Bunyi sila pertama Pancasila adalah ....', NULL, '[{"id":"A","text":"Persatuan Indonesia"},{"id":"B","text":"Kemanusiaan yang Adil dan Beradab"},{"id":"C","text":"Ketuhanan Yang Maha Esa"},{"id":"D","text":"Keadilan Sosial bagi Seluruh Rakyat Indonesia"}]', 'C', 'Bunyi sila pertama Pancasila adalah "Ketuhanan Yang Maha Esa".'),
  ('q-pan-2-4', 'Kelas 2', 'pancasila', 'Penerapan Sila Pancasila', 'Mudah', NULL, 'Contoh sikap sesuai sila pertama adalah ....', NULL, '[{"id":"A","text":"berdoa sebelum belajar"},{"id":"B","text":"bertengkar dengan teman"},{"id":"C","text":"mengejek teman"},{"id":"D","text":"mengambil barang teman"}]', 'A', 'Berdoa sebelum dan sesudah beraktivitas adalah wujud pengamalan sila pertama (Ketuhanan Yang Maha Esa).'),
  ('q-pan-2-5', 'Kelas 2', 'pancasila', 'Toleransi Beragama', 'Mudah', NULL, 'Kita harus menghormati teman yang berbeda ....', NULL, '[{"id":"A","text":"makanan saja"},{"id":"B","text":"agama"},{"id":"C","text":"tinggi badan"},{"id":"D","text":"warna sepatu"}]', 'B', 'Saling menghormati perbedaan agama merupakan kewajiban setiap warga negara agar tercipta kerukunan.'),
  ('q-pan-2-6', 'Kelas 2', 'pancasila', 'Semboyan Bangsa Indonesia', 'Mudah', NULL, 'Semboyan bangsa Indonesia adalah ....', NULL, '[{"id":"A","text":"Tut Wuri Handayani"},{"id":"B","text":"Merdeka atau Mati"},{"id":"C","text":"Bhinneka Tunggal Ika"},{"id":"D","text":"Indonesia Raya"}]', 'C', 'Semboyan resmi bangsa Indonesia yang tertulis pada lambang Garuda Pancasila adalah Bhinneka Tunggal Ika.'),
  ('q-pan-2-7', 'Kelas 2', 'pancasila', 'Semboyan Bangsa Indonesia', 'Mudah', NULL, 'Arti Bhinneka Tunggal Ika adalah ....', NULL, '[{"id":"A","text":"berbeda-beda tetapi tetap satu"},{"id":"B","text":"hidup sendiri-sendiri"},{"id":"C","text":"semua harus sama"},{"id":"D","text":"bersatu karena sama"}]', 'A', 'Bhinneka Tunggal Ika berasal dari bahasa Jawa Kuno yang berarti "Berbeda-beda tetapi tetap satu jua".'),
  ('q-pan-2-8', 'Kelas 2', 'pancasila', 'Keragaman Suku & Budaya', 'Mudah', NULL, 'Jika teman berbeda suku dengan kita, sikap kita sebaiknya ....', NULL, '[{"id":"A","text":"menjauhinya"},{"id":"B","text":"mengejeknya"},{"id":"C","text":"menghormatinya"},{"id":"D","text":"memusuhinya"}]', 'C', 'Kita harus menghormati dan berteman dengan siapa saja tanpa membedakan latar belakang suku bangsa.'),
  ('q-pan-2-9', 'Kelas 2', 'pancasila', 'Aturan di Sekolah', 'Mudah', NULL, 'Sebelum masuk kelas, kita harus ....', NULL, '[{"id":"A","text":"berlari-lari"},{"id":"B","text":"mengikuti aturan sekolah"},{"id":"C","text":"berteriak"},{"id":"D","text":"mengganggu teman"}]', 'B', 'Sebelum masuk kelas (seperti berbaris dengan tertib), kita harus mematuhi aturan dan tata tertib sekolah.'),
  ('q-pan-2-10', 'Kelas 2', 'pancasila', 'Aturan di Sekolah', 'Mudah', NULL, 'Contoh aturan di sekolah adalah ....', NULL, '[{"id":"A","text":"datang tepat waktu"},{"id":"B","text":"membuang sampah sembarangan"},{"id":"C","text":"berlari di dalam kelas"},{"id":"D","text":"berbicara saat guru menjelaskan"}]', 'A', 'Datang ke sekolah tepat waktu sebelum bel masuk berbunyi adalah contoh disiplin terhadap tata tertib sekolah.'),
  ('q-pan-2-11', 'Kelas 2', 'pancasila', 'Tanggung Jawab & Disiplin', 'Mudah', NULL, 'Jika melanggar aturan, kita harus ....', NULL, '[{"id":"A","text":"melarikan diri"},{"id":"B","text":"menyalahkan teman"},{"id":"C","text":"bertanggung jawab"},{"id":"D","text":"tertawa"}]', 'C', 'Ketika melakukan kesalahan atau melanggar aturan, sikap yang terpuji adalah berani mengakui dan bertanggung jawab.'),
  ('q-pan-2-12', 'Kelas 2', 'pancasila', 'Hak & Kewajiban di Sekolah', 'Mudah', NULL, 'Kewajiban seorang siswa di sekolah adalah ....', NULL, '[{"id":"A","text":"mendapat nilai"},{"id":"B","text":"belajar dengan rajin"},{"id":"C","text":"mendapat hadiah"},{"id":"D","text":"bermain setiap saat"}]', 'B', 'Kewajiban utama peserta didik di sekolah adalah menuntut ilmu dan belajar dengan sungguh-sungguh.'),
  ('q-pan-2-13', 'Kelas 2', 'pancasila', 'Hak & Kewajiban di Sekolah', 'Mudah', NULL, 'Salah satu hak siswa di sekolah adalah ....', NULL, '[{"id":"A","text":"mendapat pelajaran"},{"id":"B","text":"mengotori kelas"},{"id":"C","text":"mengganggu teman"},{"id":"D","text":"melanggar aturan"}]', 'A', 'Mendapatkan bimbingan dan pengajaran dari guru adalah salah satu hak utama siswa di sekolah.'),
  ('q-pan-2-14', 'Kelas 2', 'pancasila', 'Gotong Royong & Kerja Sama', 'Mudah', NULL, 'Membersihkan kelas bersama-sama merupakan contoh ....', NULL, '[{"id":"A","text":"persaingan"},{"id":"B","text":"gotong royong"},{"id":"C","text":"pertengkaran"},{"id":"D","text":"permusuhan"}]', 'B', 'Piket kelas dan kerja bakti bersama teman merupakan contoh penerapan gotong royong di lingkungan sekolah.'),
  ('q-pan-2-15', 'Kelas 2', 'pancasila', 'Gotong Royong & Kerja Sama', 'Mudah', NULL, 'Ketika melakukan kerja kelompok, kita sebaiknya ....', NULL, '[{"id":"A","text":"bekerja sendiri"},{"id":"B","text":"menyuruh teman saja"},{"id":"C","text":"bekerja sama"},{"id":"D","text":"bermalas-malasan"}]', 'C', 'Tugas kelompok dapat selesai dengan baik dan cepat jika semua anggota saling bekerja sama dan berpartisipasi.'),
  ('q-pan-2-16', 'Kelas 2', 'pancasila', 'Tolong Menolong', 'Mudah', NULL, 'Jika melihat teman kesulitan membawa buku, sebaiknya kita ....', NULL, '[{"id":"A","text":"menertawakannya"},{"id":"B","text":"membantunya"},{"id":"C","text":"meninggalkannya"},{"id":"D","text":"mengambil bukunya"}]', 'B', 'Membantu teman yang sedang mengalami kesulitan adalah cerminan sikap peduli dan tolong-menolong.'),
  ('q-pan-2-17', 'Kelas 2', 'pancasila', 'Adab & Sopan Santun', 'Mudah', NULL, 'Ketika teman sedang berbicara, kita sebaiknya ....', NULL, '[{"id":"A","text":"mendengarkan"},{"id":"B","text":"berteriak"},{"id":"C","text":"memotong pembicaraan"},{"id":"D","text":"pergi begitu saja"}]', 'A', 'Mendengarkan dengan penuh perhatian ketika orang lain sedang berbicara merupakan sikap santun dan menghargai orang lain.'),
  ('q-pan-2-18', 'Kelas 2', 'pancasila', 'Sikap Jujur & Rendah Hati', 'Mudah', NULL, 'Jika kita melakukan kesalahan kepada teman, sebaiknya ....', NULL, '[{"id":"A","text":"berbohong"},{"id":"B","text":"meminta maaf"},{"id":"C","text":"menyalahkan teman"},{"id":"D","text":"marah"}]', 'B', 'Meminta maaf dengan tulus saat melakukan kesalahan menjaga persahabatan tetap harmonis dan rukun.'),
  ('q-pan-2-19', 'Kelas 2', 'pancasila', 'Hidup Rukun di Rumah', 'Mudah', NULL, 'Contoh hidup rukun di rumah adalah ....', NULL, '[{"id":"A","text":"bertengkar dengan saudara"},{"id":"B","text":"membantu orang tua"},{"id":"C","text":"merebut mainan"},{"id":"D","text":"tidak mau berbagi"}]', 'B', 'Membantu pekerjaan orang tua di rumah menciptakan suasana keluarga yang rukun dan bahagia.'),
  ('q-pan-2-20', 'Kelas 2', 'pancasila', 'Bermain Rukun & Sportif', 'Mudah', NULL, 'Saat bermain bersama teman, kita harus ....', NULL, '[{"id":"A","text":"mau menang sendiri"},{"id":"B","text":"mengikuti aturan permainan"},{"id":"C","text":"curang"},{"id":"D","text":"marah jika kalah"}]', 'B', 'Mematuhi peraturan permainan membuat permainan berlangsung adil, tertib, dan menyenangkan.'),
  ('q-pan-2-21', 'Kelas 2', 'pancasila', 'Menghargai Prestasi Teman', 'Mudah', NULL, 'Jika teman mendapatkan juara, sikap kita sebaiknya ....', NULL, '[{"id":"A","text":"iri"},{"id":"B","text":"mengejek"},{"id":"C","text":"memberi selamat"},{"id":"D","text":"marah"}]', 'C', 'Memberikan ucapan selamat kepada teman yang berprestasi menunjukkan sikap berjiwa besar dan ikut senang atas kebahagiaan teman.'),
  ('q-pan-2-22', 'Kelas 2', 'pancasila', 'Sikap Adil (Sila Kelima)', 'Mudah', NULL, 'Contoh sikap adil adalah ....', NULL, '[{"id":"A","text":"membagi makanan sama rata"},{"id":"B","text":"mengambil semua makanan"},{"id":"C","text":"memilih teman tertentu"},{"id":"D","text":"tidak mau berbagi"}]', 'A', 'Membagi makanan atau barang secara merata tanpa pilih kasih adalah contoh nyata dari perilaku adil.'),
  ('q-pan-2-23', 'Kelas 2', 'pancasila', 'Kepedulian Sosial', 'Mudah', NULL, 'Menolong teman tanpa membeda-bedakan merupakan sikap ....', NULL, '[{"id":"A","text":"sombong"},{"id":"B","text":"peduli"},{"id":"C","text":"malas"},{"id":"D","text":"iri"}]', 'B', 'Menolong siapapun yang membutuhkan pertolongan dengan ikhlas mencerminkan rasa kepedulian yang tinggi.'),
  ('q-pan-2-24', 'Kelas 2', 'pancasila', 'Musyawarah Mufakat', 'Mudah', NULL, 'Ketika musyawarah, setiap orang boleh ....', NULL, '[{"id":"A","text":"memaksakan kehendak"},{"id":"B","text":"menyampaikan pendapat"},{"id":"C","text":"marah-marah"},{"id":"D","text":"meninggalkan kelompok"}]', 'B', 'Dalam musyawarah untuk mufakat, setiap peserta memiliki hak yang sama untuk mengemukakan pendapatnya dengan sopan.'),
  ('q-pan-2-25', 'Kelas 2', 'pancasila', 'Musyawarah Mufakat', 'Mudah', NULL, 'Hasil musyawarah harus kita ....', NULL, '[{"id":"A","text":"tolak"},{"id":"B","text":"lupakan"},{"id":"C","text":"hormati dan laksanakan"},{"id":"D","text":"abaikan"}]', 'C', 'Keputusan bersama yang dicapai melalui musyawarah wajib dihormati dan dilaksanakan dengan penuh rasa tanggung jawab.')
ON DUPLICATE KEY UPDATE `question` = VALUES(`question`), `passage` = VALUES(`passage`), `options` = VALUES(`options`), `answer_key` = VALUES(`answer_key`), `bab` = VALUES(`bab`), `difficulty` = VALUES(`difficulty`), `explanation` = VALUES(`explanation`);

INSERT INTO `packages` (`id`, `name`, `duration_minutes`, `kkm`, `mode`, `kelas`, `subject`, `question_ids`, `randomize_questions`, `randomize_options`, `show_results_to_student`)
VALUES
  ('pkg-sim-2-pan', 'Simulasi TKA Pendidikan Pancasila Kelas 2 - Nilai Pancasila & Aturan Hidup', 25, 70, 'simulasi', 'Kelas 2', 'pancasila', '["q-pan-2-1", "q-pan-2-2", "q-pan-2-3", "q-pan-2-4", "q-pan-2-5", "q-pan-2-6", "q-pan-2-7", "q-pan-2-8", "q-pan-2-9", "q-pan-2-10", "q-pan-2-11", "q-pan-2-12", "q-pan-2-13", "q-pan-2-14", "q-pan-2-15", "q-pan-2-16", "q-pan-2-17", "q-pan-2-18", "q-pan-2-19", "q-pan-2-20", "q-pan-2-21", "q-pan-2-22", "q-pan-2-23", "q-pan-2-24", "q-pan-2-25"]', 1, 1, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `question_ids` = VALUES(`question_ids`), `duration_minutes` = 25;






