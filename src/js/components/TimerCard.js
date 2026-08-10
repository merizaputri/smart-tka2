// Real-Time CBT Countdown Timer Component

export class TimerCard {
    constructor(containerId, endTime, onTimeUp) {
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.endTime = endTime;
        this.onTimeUp = onTimeUp;
        this.intervalId = null;
        this.isFinished = false;
    }

    start() {
        this.update();
        this.intervalId = setInterval(() => {
            this.update();
        }, 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    update() {
        if (this.isFinished) return;

        const now = Date.now();
        const diffMs = this.endTime - now;
        const remainingSec = Math.max(0, Math.floor(diffMs / 1000));

        const hours = Math.floor(remainingSec / 3600);
        const minutes = Math.floor((remainingSec % 3600) / 60);
        const seconds = remainingSec % 60;

        const formattedH = String(hours).padStart(2, '0');
        const formattedM = String(minutes).padStart(2, '0');
        const formattedS = String(seconds).padStart(2, '0');

        let displayTime = `${formattedM}:${formattedS}`;
        if (hours > 0) {
            displayTime = `${formattedH}:${formattedM}:${formattedS}`;
        }

        // Determine style state based on remaining time
        let bgStyle = "bg-slate-900 text-emerald-400 border-slate-800";
        let iconAnim = "";
        let alertBadge = "";

        if (remainingSec <= 60) {
            // Under 1 minute: Critical Red Flashing Pulse
            bgStyle = "timer-warning-critical text-white border-red-600";
            iconAnim = "fa-spin";
            alertBadge = `<span class="text-[11px] bg-red-800 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">Waktu Hampir Habis!</span>`;
        } else if (remainingSec <= 300) {
            // Under 5 minutes: Amber Warning
            bgStyle = "bg-amber-500 text-white border-amber-600 shadow-amber-500/30";
            iconAnim = "fa-bounce";
            alertBadge = `<span class="text-[11px] bg-amber-700 text-amber-100 px-2 py-0.5 rounded-full font-semibold">Sisa < 5 Menit</span>`;
        }

        const targetContainer = document.getElementById(this.containerId) || this.container;
        if (targetContainer) {
            targetContainer.innerHTML = `
                <div class="flex items-center gap-3 px-4 py-2.5 rounded-xl border ${bgStyle} shadow-lg transition-all duration-300">
                    <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-black/20 text-white">
                        <i class="fa-solid fa-hourglass-half ${iconAnim}"></i>
                    </div>
                    <div class="flex flex-col">
                        <div class="text-[10px] font-bold tracking-wider uppercase text-white/80 leading-none">Sisa Waktu</div>
                        <div class="font-mono text-2xl font-black tracking-widest leading-tight">
                            ${displayTime}
                        </div>
                    </div>
                    ${alertBadge}
                </div>
            `;
        }

        if (remainingSec <= 0 && !this.isFinished) {
            this.isFinished = true;
            this.stop();
            if (typeof this.onTimeUp === 'function') {
                this.onTimeUp();
            }
        }
    }
}
