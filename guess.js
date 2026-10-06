async function loadGame() {

    const response = await fetch("quotes.json");
    const quotes = await response.json();

    const questionBox =
        document.getElementById("question-box");

    const optionsContainer =
        document.getElementById("options-container");

    const result =
        document.getElementById("guess-result");

    const nextButton =
        document.getElementById("next-question-btn");


    function shuffle(array) {

        for (let i = array.length - 1; i > 0; i--) {

            const j =
                Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] =
                [array[j], array[i]];
        }

        return array;
    }


    function playSound(file) {

        const sound =
            new Audio(`sounds/${file}`);

        sound.volume = 0.5;

        sound.play().catch(() => {});
    }


    function generateQuestion() {

        result.textContent = "";

        optionsContainer.innerHTML = "";

        const quoteObj =
            quotes[Math.floor(Math.random() * quotes.length)];

        const words =
            quoteObj.quote.split(" ");

        if (words.length < 2) {

            questionBox.textContent =
                quoteObj.quote;

            return;
        }


        const hiddenIndex =
            Math.floor(Math.random() * words.length);

        const correctAnswer =
            words[hiddenIndex];

        const displayedWords =
            [...words];

        displayedWords[hiddenIndex] =
            "______";

        questionBox.textContent =
            `"${displayedWords.join(" ")}"`;


        const wrongOptions = [];

        quotes.forEach(q => {

            q.quote.split(" ").forEach(word => {

                if (
                    word.toLowerCase() !==
                    correctAnswer.toLowerCase()
                ) {

                    wrongOptions.push(word);
                }
            });
        });


        shuffle(wrongOptions);


        const options = [
            correctAnswer,
            wrongOptions[0],
            wrongOptions[1],
            wrongOptions[2]
        ];


        shuffle(options);


        options.forEach(option => {

            const btn =
                document.createElement("button");

            btn.textContent = option;


            btn.addEventListener("click", () => {

                if (option === correctAnswer) {

                    result.textContent =
                        "Correct!";

                    playSound("correct.mp3");

                } else {

                    result.textContent =
                        `Wrong! Correct answer: ${correctAnswer}`;

                    playSound("wrong.mp3");
                }

            });


            optionsContainer.appendChild(btn);
        });
    }


    nextButton.addEventListener(
        "click",
        generateQuestion
    );


    generateQuestion();
}

loadGame();

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