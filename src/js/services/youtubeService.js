// YouTube Multimedia & Educational Video Service for TKA Smart Exam
// Provides safe parsing, validation, thumbnail generation, oEmbed metadata, and secure iframe embeds.

/**
 * Safely extracts the 11-character YouTube Video ID from any standard or short URL.
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID&feature=share
 * - https://m.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID?t=10
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube-nocookie.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - Raw 11-character ID
 * 
 * @param {string} input 
 * @returns {string|null} 11-character video ID or null if invalid
 */
export function extractYouTubeVideoId(input) {
    if (!input || typeof input !== 'string') return null;
    const str = input.trim();
    if (!str) return null;

    // 1. Direct 11-character Video ID pattern
    if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
        return str;
    }

    // 2. youtu.be/VIDEO_ID
    const shortMatch = str.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})(?:[?&].*)?$/i);
    if (shortMatch && shortMatch[1]) {
        return shortMatch[1];
    }

    // 3. youtube.com/(watch?v=|embed/|v/|shorts/)VIDEO_ID
    const fullMatch = str.match(/(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com|youtube-nocookie\.com)\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/)([a-zA-Z0-9_-]{11})(?:[?&].*)?$/i);
    if (fullMatch && fullMatch[1]) {
        return fullMatch[1];
    }

    return null;
}

/**
 * Checks whether an input is a valid YouTube URL or video ID.
 * @param {string} input 
 * @returns {boolean}
 */
export function isValidYouTubeUrl(input) {
    return extractYouTubeVideoId(input) !== null;
}

/**
 * Returns a high-security YouTube Embed URL using the youtube-nocookie.com privacy-enhanced domain.
 * @param {string} videoId 
 * @returns {string}
 */
export function getYouTubeEmbedUrl(videoId) {
    const cleanId = extractYouTubeVideoId(videoId);
    if (!cleanId) return '';
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(cleanId)}?rel=0&modestbranding=1`;
}

/**
 * Returns a high-quality video thumbnail URL.
 * @param {string} videoId 
 * @returns {string}
 */
export function getYouTubeThumbnailUrl(videoId) {
    const cleanId = extractYouTubeVideoId(videoId);
    if (!cleanId) return '';
    return `https://img.youtube.com/vi/${encodeURIComponent(cleanId)}/hqdefault.jpg`;
}

/**
 * Standard YouTube watch URL
 * @param {string} videoId 
 * @returns {string}
 */
export function getYouTubeWatchUrl(videoId) {
    const cleanId = extractYouTubeVideoId(videoId);
    if (!cleanId) return '';
    return `https://www.youtube.com/watch?v=${encodeURIComponent(cleanId)}`;
}

/**
 * Fetches oEmbed video metadata (title, author) from YouTube without requiring an API key.
 * Fails gracefully if offline or video is restricted.
 * 
 * @param {string} videoId 
 * @returns {Promise<{title: string, author: string, thumbnail: string, valid: boolean}>}
 */
export async function fetchYouTubeVideoMeta(videoId) {
    const cleanId = extractYouTubeVideoId(videoId);
    if (!cleanId) {
        return { title: '', author: '', thumbnail: '', valid: false };
    }

    const defaultThumbnail = getYouTubeThumbnailUrl(cleanId);

    try {
        const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${encodeURIComponent(cleanId)}&format=json`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const response = await fetch(oembedUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
            const data = await response.json();
            return {
                title: data.title || 'Video Pembelajaran YouTube',
                author: data.author_name || 'YouTube',
                thumbnail: data.thumbnail_url || defaultThumbnail,
                valid: true
            };
        }
    } catch (e) {
        // Network timeout, CORS on local, or private video: fallback gracefully
    }

    return {
        title: 'Video Pembelajaran YouTube',
        author: 'YouTube',
        thumbnail: defaultThumbnail,
        valid: true
    };
}

/**
 * Escapes HTML characters for safe template string injection.
 */
function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Generates safe, responsive iframe HTML embed for YouTube.
 * 
 * @param {string} videoId 
 * @param {string} title 
 * @returns {string}
 */
export function renderSafeYouTubePlayer(videoId, title = 'Video Pembelajaran Siswa') {
    const cleanId = extractYouTubeVideoId(videoId);
    if (!cleanId) return '';

    const embedUrl = getYouTubeEmbedUrl(cleanId);
    const safeTitle = escapeHtml(title);

    return `
        <div class="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-slate-200">
            <iframe 
                src="${embedUrl}" 
                title="${safeTitle}" 
                class="absolute inset-0 w-full h-full"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin"
                loading="lazy"
                allowfullscreen>
            </iframe>
        </div>
    `;
}

/**
 * Generates an attractive child-friendly Video Learning card for elementary students.
 * 
 * @param {string} videoId 
 * @param {string} title 
 * @returns {string}
 */
export function renderStudentVideoCard(videoId, title = 'Video Pembelajaran') {
    const cleanId = extractYouTubeVideoId(videoId);
    if (!cleanId) return '';

    const safeTitle = escapeHtml(title);
    const playerHtml = renderSafeYouTubePlayer(cleanId, safeTitle);
    const watchUrl = getYouTubeWatchUrl(cleanId);

    return `
        <div class="rounded-3xl border border-rose-100 bg-gradient-to-br from-rose-50/70 via-white to-amber-50/60 p-5 sm:p-6 shadow-sm space-y-4">
            <!-- Header Card -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div class="flex items-center gap-2.5">
                    <div class="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-lg shadow-md shadow-rose-600/20 shrink-0">
                        <i class="fa-solid fa-play"></i>
                    </div>
                    <div>
                        <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-100/80 text-rose-800 text-[10px] font-extrabold uppercase tracking-wider">
                            <i class="fa-brands fa-youtube text-rose-600"></i> Video Pembelajaran Interaktif
                        </div>
                        <h3 class="font-outfit font-bold text-base sm:text-lg text-slate-800 leading-tight mt-0.5">
                            🎬 Tonton & Simak Video Edukasi
                        </h3>
                    </div>
                </div>

                <a href="${watchUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors shadow-2xs self-start sm:self-auto">
                    <i class="fa-brands fa-youtube text-rose-600"></i>
                    <span>Buka di YouTube</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
            </div>

            <!-- Video Player Embed -->
            <div class="w-full">
                ${playerHtml}
            </div>

            <!-- Friendly Note & Disclaimer -->
            <div class="flex items-start gap-2.5 p-3 rounded-2xl bg-white/80 border border-slate-200/80 text-xs text-slate-600">
                <span class="text-amber-500 font-bold text-sm shrink-0 mt-0.5">💡</span>
                <p class="leading-relaxed text-[11px] sm:text-xs">
                    <strong>Tips Belajar:</strong> Simak video di atas dengan cermat sebelum membaca naskah materi lengkap. Jika video tidak dapat diputar karena izin pemilik atau batasan akun, kamu tetap dapat membaca penjelasan materi di bawah ini.
                </p>
            </div>
        </div>
    `;
}

export const youtubeService = {
    extractVideoId: extractYouTubeVideoId,
    isValidUrl: isValidYouTubeUrl,
    getEmbedUrl: getYouTubeEmbedUrl,
    getThumbnailUrl: getYouTubeThumbnailUrl,
    getWatchUrl: getYouTubeWatchUrl,
    fetchVideoMeta: fetchYouTubeVideoMeta,
    renderPlayer: renderSafeYouTubePlayer,
    renderStudentCard: renderStudentVideoCard
};
