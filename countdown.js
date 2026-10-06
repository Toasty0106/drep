const capsule = document.getElementById("capsule-content");

if (capsule) {
    const unlockDate = new Date("2026-10-07T00:00:00");
    const now = new Date();

    if (now < unlockDate) {
        const daysRemaining = Math.ceil((unlockDate - now) / (1000 * 60 * 60 * 24));
        capsule.innerHTML = `
            <div class="quote-card">
                <h2>Locked</h2>
                <br>
                <p>This message unlocks on 7 October 2026.</p>
                <br>
                <p>${daysRemaining} days remaining.</p>
            </div>
        `;
    } else {
        capsule.innerHTML = `
            <div class="quote-card">
                <h2>Happy Birthday Twin! <3</h2>
                <br>
                <div class="birthday-message">
                    <!-- Your long birthday text content stays here completely untouched -->
                </div>
            </div>
        `;
    }
}

const audio = document.getElementById("bg-music");
const playPauseBtn = document.getElementById("play-pause-btn");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const timeDisplay = document.getElementById("player-time");

let isDragging = false;

function formatTime(secs) {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

if (audio) {
    audio.addEventListener("loadedmetadata", () => {
        timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
    });

    playPauseBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = "⏸";
        } else {
            audio.pause();
            playPauseBtn.textContent = "▶";
        }
    });

    audio.addEventListener("timeupdate", () => {
        if (!isDragging && audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
        }
    });

    function scrub(e) {
        if (!audio.duration) return;

        const rect = progressContainer.getBoundingClientRect();
        const clientX = e.touches ? e.touches.clientX : e.clientX;
        
        let clickX = clientX - rect.left;
        if (clickX < 0) clickX = 0;
        if (clickX > rect.width) clickX = rect.width;

        const progressPercent = (clickX / rect.width) * 100;
        progressBar.style.width = `${progressPercent}%`;

        const targetTime = (clickX / rect.width) * audio.duration;
        timeDisplay.textContent = `${formatTime(targetTime)} / ${formatTime(audio.duration)}`;
        
        return targetTime;
    }

    progressContainer.addEventListener("mousedown", (e) => {
        isDragging = true;
        const newTime = scrub(e);
        if (newTime !== undefined) audio.currentTime = newTime;
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        scrub(e);
    });

    window.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        isDragging = false;
        const newTime = scrub(e);
        if (newTime !== undefined) audio.currentTime = newTime;
    });

    progressContainer.addEventListener("touchstart", (e) => {
        isDragging = true;
        scrub(e);
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        scrub(e);
    }, { passive: true });

    window.addEventListener("touchend", (e) => {
        if (!isDragging) return;
        isDragging = false;
        const newTime = scrub(e);
        if (newTime !== undefined) audio.currentTime = newTime;
    });

    audio.addEventListener("ended", () => {
        playPauseBtn.textContent = "▶";
        progressBar.style.width = "0%";
        timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
    });
}
