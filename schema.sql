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
