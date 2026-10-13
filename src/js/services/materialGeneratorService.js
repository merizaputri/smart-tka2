// Smart Material Generator Service (Semantic Grouping & Educational Draft Synthesizer)

export const materialGeneratorService = {
    /**
     * Group questions by major thematic units for a given class & subject
     */
    generateGroupsFromQuestions(kelas, subject, questions) {
        if (!questions || questions.length === 0) return [];

        // Known domain taxonomies for rich curriculum grouping
        const domainTaxonomies = {
            'fiqih': [
                {
                    key: 'azan_ikamah',
                    title: 'Azan dan Ikamah',
                    description: 'Ketentuan, lafal, arti, dan keutamaan mengumandangkan azan dan ikamah sebagai seruan salat.',
                    keywords: ['azan', 'ikamah', 'adzan', 'iqamah', 'muazin', 'tathwib', 'hayya', 'qad qamatis', 'berjamaah', 'masjid']
                },
                {
                    key: 'ketentuan_rukun',
                    title: 'Ketentuan dan Rukun Salat',
                    description: 'Memahami rukun-rukun salat, syarat sah, syarat wajib, dan pembatal salat fardu.',
                    keywords: ['rukun', 'syarat', 'niat', 'batal', 'sah', 'fatihah', 'al-fatihah', 'salam pertama', 'iktidal', 'tertib']
                },
                {
                    key: 'gerakan_salat',
                    title: 'Tata Cara dan Gerakan Salat',
                    description: 'Urutan gerakan salat dari takbiratul ihram, rukuk, iktidal, sujud, hingga posisi duduk dengan tumaninah.',
                    keywords: ['gerakan', 'posisi', 'rukuk', 'ruku\'', 'sujud', 'duduk', 'iftirasy', 'tawaruk', 'tahiyat', 'sedekap', 'anggota sujud', 'tumaninah', 'tegak', 'membungkuk']
                },
                {
                    key: 'bacaan_salat',
                    title: 'Bacaan dalam Salat',
                    description: 'Lafal doa dan bacaan dari doa iftitah, surah pendek, tasbih rukuk, sujud, hingga doa tasyahud.',
                    keywords: ['bacaan', 'doa', 'iftitah', 'subhana', 'rabbighfirli', 'sami\'allahu', 'tasyahud', 'salawat', 'assalamu\'alaikum', 'surah pendek']
                },
                {
                    key: 'salat_fardu',
                    title: 'Ketentuan Salat Fardu Lima Waktu',
                    description: 'Waktu pelaksanaan, jumlah rakaat, dan keutamaan salat fardu Subuh, Zuhur, Asar, Magrib, dan Isya.',
                    keywords: ['salat fardu', 'fardu', 'waktu salat', 'rakaat', 'subuh', 'zuhur', 'asar', 'magrib', 'isya', 'dua rakaat', 'keutamaan']
                }
            ],
            'akidah_akhlak': [
                {
                    key: 'asmaul_husna',
                    title: 'Mengenal Asmaul Husna',
                    description: 'Mempelajari nama-nama indah Allah Swt. dan maknanya dalam kehidupan sehari-hari.',
                    keywords: ['asmaul', 'husna', 'al-mu\'min', 'al-alim', 'al-bashir', 'al-khaliq', 'al-ghani', 'ar-razzaq', 'sifat allah', '99', 'wujud', 'esa']
                },
                {
                    key: 'kalimat_thayyibah',
                    title: 'Kalimat Thayyibah dan Dzikir',
                    description: 'Makna dan keutamaan mengucapkan kalimat thayyibah seperti Ta\'awuz, Basmalah, Takbir, dan Tahmid.',
                    keywords: ['thayyibah', 'tayibah', 'taawuz', 'ta\'awudz', 'perlindungan', 'setan', 'takbir', 'tahmid', 'istighfar', 'dzikir']
                },
                {
                    key: 'akhlak_terpuji',
                    title: 'Akhlak Terpuji (Akhlakul Karimah)',
                    description: 'Membiasakan sikap jujur, amanah, tawaduk, bersyukur, serta berbakti kepada orang tua dan guru.',
                    keywords: ['akhlak', 'jujur', 'amanah', 'tawaduk', 'rendah hati', 'syukur', 'nikmat', 'orang tua', 'guru', 'teman', 'bersih', 'sehat', 'sedekah', 'infak']
                },
                {
                    key: 'adab_keseharian',
                    title: 'Adab Islami Sehari-Hari',
                    description: 'Adab dan etika dalam bersin, menguap, menjaga kesehatan jasmani dan rohani.',
                    keywords: ['adab', 'bersin', 'menguap', 'sombong', 'kesehatan', 'letih', 'kantuk', 'mendoakan']
                }
            ],
            'quran_hadis': [
                {
                    key: 'huruf_hijaiyah',
                    title: 'Mengenal dan Menulis Huruf Hijaiyah',
                    description: 'Mengenal bentuk huruf hijaiyah tunggal, bersambung, dan kaidah penulisan Al-Qur\'an.',
                    keywords: ['hijaiyah', 'huruf', 'bersambung', 'pisah', 'tanda baca', 'harakat', 'sukun', 'tasydid', 'fathah', 'kasrah', 'dammah']
                },
                {
                    key: 'tajwid_gunnah',
                    title: 'Hukum Tajwid dan Bacaan Gunnah',
                    description: 'Mempelajari kaidah membaca gunnah, idgham, dan cara membaca Al-Qur\'an secara tartil.',
                    keywords: ['gunnah', 'tajwid', 'dengung', 'idgam', 'idgham', 'ikhfa', 'iqlab', 'mim sukun', 'nun sukun', 'asliyah', 'aridah']
                }
            ],
            'matematika': [
                {
                    key: 'bilangan_operasi',
                    title: 'Operasi Hitung Bilangan',
                    description: 'Pengurangan, penjumlahan, dan operasi hitung campuran.',
                    keywords: ['hitung', 'pengurangan', 'penjumlahan', 'perkalian', 'pembagian', 'kpk', 'fpb', 'bilangan']
                },
                {
                    key: 'geometri_pengukuran',
                    title: 'Geometri dan Pengukuran',
                    description: 'Mengenal bangun datar, sifat-sifatnya, dan pengukuran satuan panjang serta waktu.',
                    keywords: ['bangun', 'datar', 'segitiga', 'persegi', 'panjang', 'penggaris', 'waktu', 'minggu', 'luas', 'volume']
                }
            ]
        };

        const subjectTaxonomy = domainTaxonomies[subject] || [];
        const groupsMap = new Map();
        const unassignedQuestions = [];

        // 1. Match questions with predefined curriculum themes
        questions.forEach(q => {
            const babText = (q.bab || '').toLowerCase();
            const qText = (q.question || '').toLowerCase();
            const expText = (q.explanation || '').toLowerCase();
            const fullText = `${babText} ${qText} ${expText}`;

            let matchedTheme = null;
            let highestScore = 0;

            for (const theme of subjectTaxonomy) {
                let score = 0;
                theme.keywords.forEach(kw => {
                    if (babText.includes(kw)) score += 3;
                    if (qText.includes(kw)) score += 1;
                    if (expText.includes(kw)) score += 1;
                });
                if (score > highestScore && score >= 2) {
                    highestScore = score;
                    matchedTheme = theme;
                }
            }

            if (matchedTheme) {
                if (!groupsMap.has(matchedTheme.key)) {
                    groupsMap.set(matchedTheme.key, {
                        key: matchedTheme.key,
                        title: matchedTheme.title,
                        description: matchedTheme.description,
                        subtopics: new Set(),
                        questionIds: []
                    });
                }
                const grp = groupsMap.get(matchedTheme.key);
                grp.questionIds.push(q.id);
                if (q.bab && q.bab.trim()) {
                    grp.subtopics.add(q.bab.trim());
                }
            } else {
                unassignedQuestions.push(q);
            }
        });

        // 2. Group any remaining questions dynamically by their existing 'bab'
        if (unassignedQuestions.length > 0) {
            const babGroups = new Map();
            unassignedQuestions.forEach(q => {
                const babKey = (q.bab && q.bab.trim()) ? q.bab.trim() : 'Materi Umum';
                if (!babGroups.has(babKey)) {
                    babGroups.set(babKey, []);
                }
                babGroups.get(babKey).push(q);
            });

            babGroups.forEach((bQuestions, bTitle) => {
                const groupKey = 'custom_' + bTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_');
                groupsMap.set(groupKey, {
                    key: groupKey,
                    title: bTitle,
                    description: `Materi pembelajaran mengenai topik ${bTitle} untuk ${kelas}.`,
                    subtopics: new Set([bTitle]),
                    questionIds: bQuestions.map(q => q.id)
                });
            });
        }

        // Convert Map to array with synthesized educational content
        const resultGroups = [];
        let order = 1;

        groupsMap.forEach(grp => {
            if (grp.questionIds.length > 0) {
                const grpQuestions = questions.filter(q => grp.questionIds.includes(q.id));
                const draft = this.synthesizeMaterialDraft(grp, grpQuestions, kelas, subject, order);
                resultGroups.push(draft);
                order++;
            }
        });

        return resultGroups;
    },

    /**
     * Synthesize a draft material from a cluster of questions
     */
    synthesizeMaterialDraft(groupMeta, grpQuestions, kelas, subject, orderNumber = 1) {
        const subtopicList = Array.from(groupMeta.subtopics || []);
        
        // Extract distinct key insights from explanations
        const insights = [];
        const seenExplanations = new Set();
        
        grpQuestions.forEach(q => {
            if (q.explanation && !seenExplanations.has(q.explanation)) {
                seenExplanations.add(q.explanation);
                // Clean and format insight
                let exp = q.explanation.trim();
                if (exp) insights.push(exp);
            }
        });

        // Generate Structured Learning Objectives
        const learningObjectives = [];
        if (subtopicList.length > 0) {
            subtopicList.slice(0, 5).forEach(st => {
                learningObjectives.push(`Siswa dapat memahami konsep dan ketentuan mengenai ${st}.`);
            });
        }
        if (learningObjectives.length === 0) {
            learningObjectives.push(`Siswa memahami konsep dasar materi ${groupMeta.title}.`);
            learningObjectives.push(`Siswa mampu menjawab soal-soal latihan terkait materi ${groupMeta.title} dengan tepat.`);
        }

        // Generate Rich Educational Explanatory Content
        let contentMarkdown = `### Pengantar Materi: ${groupMeta.title}\n\n`;
        contentMarkdown += `${groupMeta.description || `Materi ini disusun untuk membimbing siswa ${kelas} dalam menguasai topik ${groupMeta.title}.`}\n\n`;

        if (subtopicList.length > 0) {
            contentMarkdown += `#### 📌 Subtopik yang Dipelajari:\n`;
            subtopicList.forEach((st, idx) => {
                contentMarkdown += `${idx + 1}. **${st}**\n`;
            });
            contentMarkdown += `\n`;
        }

        contentMarkdown += `#### 📖 Pembahasan Konsep Penting:\n`;
        if (insights.length > 0) {
            insights.slice(0, 8).forEach(ins => {
                contentMarkdown += `* ${ins}\n`;
            });
        } else {
            contentMarkdown += `* Pelajari setiap butir soal dan penjelasan terlampir pada materi ini.\n`;
        }
        contentMarkdown += `\n`;

        // Generate Key Summary Points
        let summaryMarkdown = `**Intisari ${groupMeta.title}:**\n`;
        const sampleInsights = insights.slice(0, 4);
        if (sampleInsights.length > 0) {
            sampleInsights.forEach(ins => {
                summaryMarkdown += `• ${ins}\n`;
            });
        } else {
            summaryMarkdown += `• Kuasai konsep dasar, urutan tata cara, dan hikmah dari materi ${groupMeta.title}.\n`;
        }

        return {
            id: `mat-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            kelas: kelas,
            subject: subject,
            title: groupMeta.title,
            description: groupMeta.description || `Materi ${groupMeta.title} untuk ${kelas}`,
            learningObjectives: learningObjectives,
            content: contentMarkdown,
            summary: summaryMarkdown,
            orderNumber: orderNumber,
            status: 'draft',
            questionIds: grpQuestions.map(q => q.id),
            questionCount: grpQuestions.length,
            subtopics: subtopicList
        };
    }
};
