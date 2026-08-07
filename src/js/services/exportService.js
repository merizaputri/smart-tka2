// Export Service for PDF and Excel (CSV) Reports

export const exportService = {
    exportToExcel(dataList, filename = 'Laporan_Nilai_TKA.xlsx') {
        try {
            if (window.XLSX) {
                const worksheet = window.XLSX.utils.json_to_sheet(dataList);
                const workbook = window.XLSX.utils.book_new();
                window.XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Ujian TKA");
                window.XLSX.writeFile(workbook, filename);
                return true;
            }
        } catch (err) {
            console.error("XLSX export error:", err);
        }

        // Fallback CSV download if XLSX fails
        let csvContent = "data:text/csv;charset=utf-8,";
        if (dataList.length > 0) {
            const headers = Object.keys(dataList[0]).join(",");
            csvContent += headers + "\r\n";
            dataList.forEach(row => {
                const rowStr = Object.values(row).map(v => `"${String(v).replace(/"/g, '""')}"`).join(",");
                csvContent += rowStr + "\r\n";
            });
        }
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename.replace('.xlsx', '.csv'));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return true;
    },

    exportStudentCertificate(result) {
        // Formatted printable window for PDF / Print
        const printWindow = window.open('', '_blank');
        const formattedDate = new Date(result.completedAt).toLocaleDateString('id-ID', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        const html = `
            <!DOCTYPE html>
            <html lang="id">
            <head>
                <meta charset="UTF-8">
                <title>Laporan Hasil Ujian - ${result.studentName}</title>
                <style>
                    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1e293b; background: #f8fafc; }
                    .cert-box { border: 8px double #2563eb; background: white; padding: 40px; border-radius: 12px; max-width: 800px; margin: 0 auto; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
                    .header { color: #1e40af; font-size: 28px; font-weight: bold; margin-bottom: 5px; }
                    .subheader { color: #64748b; font-size: 16px; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 2px; }
                    .name { font-size: 32px; font-weight: bold; color: #0f172a; border-bottom: 2px solid #cbd5e1; display: inline-block; padding-bottom: 8px; margin: 15px 0; }
                    .details { text-align: left; margin: 30px auto; max-width: 500px; font-size: 16px; line-height: 2; }
                    .score-badge { display: inline-block; padding: 12px 30px; font-size: 36px; font-weight: bold; border-radius: 50px; margin: 20px 0; }
                    .pass { background: #dcfce7; color: #15803d; border: 2px solid #86efac; }
                    .fail { background: #fee2e2; color: #b91c1c; border: 2px solid #fca5a5; }
                    .footer { margin-top: 40px; font-size: 13px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                </style>
            </head>
            <body>
                <div class="cert-box">
                    <div class="header">TKA SMART EXAM SD</div>
                    <div class="subheader">Laporan Hasil Tes Kemampuan Akademik</div>
                    <p>Diberikan Kepada Siswa:</p>
                    <div class="name">${result.studentName}</div>
                    <p style="font-size: 18px; color: #475569;">${result.kelas}</p>

                    <div class="details">
                        <strong>Nama Ujian:</strong> ${result.packageName}<br>
                        <strong>Mata Pelajaran:</strong> ${result.subject.toUpperCase()}<br>
                        <strong>Mode Ujian:</strong> ${result.mode === 'simulasi' ? 'Simulasi TKA Resmi' : 'Mode Latihan Mandiri'}<br>
                        <strong>Jumlah Soal:</strong> ${result.totalQuestions} Soal (Benar: ${result.correctCount}, Salah: ${result.wrongCount})<br>
                        <strong>Lama Pengerjaan:</strong> ${Math.floor(result.durationSeconds/60)} menit ${result.durationSeconds%60} detik<br>
                        <strong>Tanggal Ujian:</strong> ${formattedDate}
                    </div>

                    <div>NILAI AKHIR:</div>
                    <div class="score-badge ${result.status === 'LULUS' ? 'pass' : 'fail'}">
                        ${result.score} / 100
                    </div>

                    <div style="font-weight: bold; font-size: 20px; color: ${result.status === 'LULUS' ? '#15803d' : '#b91c1c'}">
                        STATUS: ${result.status} (KKM: ${result.kkm})
                    </div>

                    <div class="footer">
                        Dokumen ini diterbitkan secara otomatis oleh Sistem TKA Smart Exam CBT.
                    </div>
                </div>
                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `;
        printWindow.document.write(html);
        printWindow.document.close();
    }
};
