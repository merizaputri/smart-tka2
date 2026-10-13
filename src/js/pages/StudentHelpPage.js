// Student Help & Guide Page Component (Bantuan & Panduan Belajar SD)

export function renderStudentHelpPage(container, currentUser, onNavigate) {
    container.innerHTML = `
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            
            <!-- Page Header -->
            <div class="bg-gradient-to-r from-blue-700 via-brand-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
                <div class="relative z-10">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-brand-100 font-bold text-xs mb-2 backdrop-blur-sm">
                        <i class="fa-solid fa-circle-question"></i> Pusat Informasi & FAQ
                    </div>
                    <h2 class="font-outfit font-black text-2xl sm:text-3xl tracking-tight">
                        Panduan & Bantuan Belajar 💡
                    </h2>
                    <p class="text-brand-100 text-xs sm:text-sm mt-1 max-w-xl">
                        Pelajari cara menggunakan aplikasi TKA Smart Exam, memahami timer CBT, dan cara memaksimalkan latihan soalmu!
                    </p>
                </div>
            </div>

            <!-- Guides Grid -->
            <div class="space-y-6">
                
                <!-- Guide Card 1 -->
                <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center text-2xl font-black">
                            <i class="fa-solid fa-book-bookmark"></i>
                        </div>
                        <div>
                            <h3 class="font-outfit font-black text-lg text-slate-800">1. Mempelajari Materi Terlebih Dahulu</h3>
                            <p class="text-xs text-slate-500">Mulai dari materi agar pemahaman konsep lebih matang</p>
                        </div>
                    </div>
                    <div class="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 pl-2">
                        <p>• Buka menu <strong>Materi Belajar</strong> di sidebar kiri.</p>
                        <p>• Pilih mata pelajaran dan baca ringkasan konsep, rumus, serta contoh soal.</p>
                        <p>• Setiap materi yang kamu pelajari akan menambah <strong>+25 XP</strong> ke akunmu!</p>
                    </div>
                </div>

                <!-- Guide Card 2 -->
                <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-black">
                            <i class="fa-solid fa-stopwatch-20"></i>
                        </div>
                        <div>
                            <h3 class="font-outfit font-black text-lg text-slate-800">2. Cara Pengerjaan Ujian & Aturan Timer CBT</h3>
                            <p class="text-xs text-slate-500">Menghadapi simulasi ujian dengan timer otomatis</p>
                        </div>
                    </div>
                    <div class="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 pl-2">
                        <p>• Pilih paket ujian di menu <strong>Pilih Ujian</strong>, lalu klik tombol <strong>Mulai Ujian</strong>.</p>
                        <p>• <strong>Timer Hitung Mundur</strong> akan berjalan otomatis di pojok kanan atas. Pastikan kamu menyelesaikan soal sebelum waktu habis.</p>
                        <p>• Jawabanmu <strong>tersimpan otomatis</strong> setiap kali kamu memilih opsi jawaban (A, B, C, atau D).</p>
                        <p>• Jika waktu habis, sistem CBT akan <strong>mengumpulkan jawabanmu secara otomatis</strong> tanpa ada data yang hilang.</p>
                        <p>• Kamu bisa menggunakan tombol <strong>Tandai Ragu-ragu</strong> jika ingin mengecek kembali soal tertentu di panel nomor soal.</p>
                    </div>
                </div>

                <!-- Guide Card 3 -->
                <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl font-black">
                            <i class="fa-solid fa-square-poll-vertical"></i>
                        </div>
                        <div>
                            <h3 class="font-outfit font-black text-lg text-slate-800">3. Melihat Nilai & Pembahasan Soal</h3>
                            <p class="text-xs text-slate-500">Evaluasi jawaban benar dan salah secara transparan</p>
                        </div>
                    </div>
                    <div class="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 pl-2">
                        <p>• Setelah menekan <strong>Selesai Ujian</strong>, halaman skor akan langsung menampilkan nilai akhir, jumlah benar, dan salah.</p>
                        <p>• Gulir ke bawah untuk melihat <strong>Pembahasan Lengkap</strong> dan penjelasan guru untuk setiap butir soal.</p>
                        <p>• Kamu juga dapat mencetak laporan sertifikat hasil belajar dalam format dokumen/PDF.</p>
                    </div>
                </div>

                <!-- Guide Card 4 -->
                <div class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-black">
                            <i class="fa-solid fa-trophy"></i>
                        </div>
                        <div>
                            <h3 class="font-outfit font-black text-lg text-slate-800">4. Sistem Level, XP & Lencana Prestasi</h3>
                            <p class="text-xs text-slate-500">Mendapatkan penghargaan dari keaktifan belajar</p>
                        </div>
                    </div>
                    <div class="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 pl-2">
                        <p>• <strong>XP Belajar:</strong> Didapatkan dari setiap pengerjaan ujian (+50 XP), bonus nilai ujian, dan bonus lulus KKM (+30 XP).</p>
                        <p>• <strong>Level Siswa:</strong> Level akan naik otomatis seiring bertambahnya XP dari Level 1 (Pemula Hebat) hingga Level 6 (Master TKA Smart).</p>
                        <p>• <strong>Lencana:</strong> Selesaikan misi seperti meraih nilai 100, menyelesaikan 5 ujian, atau mendapat nilai tinggi di Matematika untuk membuka lencana emas!</p>
                    </div>
                </div>

                <!-- Contact & Technical Support Box -->
                <div class="p-6 rounded-3xl bg-gradient-to-r from-brand-50 to-indigo-50 border border-brand-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center text-xl shrink-0 shadow-md shadow-brand-600/30">
                            <i class="fa-solid fa-headset"></i>
                        </div>
                        <div>
                            <h4 class="font-outfit font-black text-base text-slate-800">Mengalami Kendala Ujian?</h4>
                            <p class="text-xs text-slate-600 mt-0.5">Silakan hubungi Bapak/Ibu Guru atau Administrator sekolah untuk bantuan akun dan soal.</p>
                        </div>
                    </div>
                    <button id="btn-help-go-dashboard" class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-outfit font-bold text-xs shadow-sm transition-all whitespace-nowrap">
                        Kembali Ke Beranda
                    </button>
                </div>

            </div>

        </div>
    `;

    document.getElementById('btn-help-go-dashboard')?.addEventListener('click', () => {
        if (onNavigate) onNavigate('student-dashboard');
    });
}
