const ORDER_FILE = "Memories/memories-order.txt";

let memories = [];
let currentMemoryIndex = 0;

/* =========================================
   CUSTOM MEMORY COMMENTS CONFIGURATION
========================================== */
const memoryComments = {
    "WhatsApp Image 2026-10-04 at 18.57.07.jpeg" : "Really fun day :)",
    "WhatsApp Image 2026-10-04 at 18.57.11.jpeg" : "We should go on more walks it's hella fun to yap on walks :)",
    "WhatsApp Image 2026-10-04 at 18.57.20 (1).jpeg" : "How sis complains about my bad angle choices for photos just to cut off my head :)",
    "WhatsApp Image 2026-10-04 at 18.57.20.jpeg" : "More evidence to support the claim :)",
    "WhatsApp Image 2026-10-04 at 18.57.21.jpeg" : "This is such a great angle idk what you mean sis </3",
    "WhatsApp Image 2026-10-04 at 18.57.22.jpeg" : "Okay maybe I see your point o_o (but just in this particular photo)",
    "WhatsApp Image 2026-10-04 at 18.57.45.jpeg" : "By far my favourite photo of us so far :)",
    "WhatsApp Image 2026-10-04 at 18.57.46.jpeg" : "Most accurate representation of our friendship to date :)",
    "WhatsApp Image 2026-10-04 at 18.57.47.jpeg" : "You look like you're planning something mischievous D:",
    "WhatsApp Image 2026-10-04 at 18.57.48.jpeg" : "Yea you don't get to complain about my angle choices they're GOOD :)",
    "WhatsApp Image 2026-10-04 at 18.57.48 (1).jpeg" : "I DO take photos from good angles :)",
    "WhatsApp Image 2026-10-04 at 18.57.49 (1).jpeg" : "ALSO such a good photo (compliments to the photographer) :)",
    "WhatsApp Image 2026-10-04 at 18.57.49.jpeg" : "Just a sweet photo of us :)",
    "WhatsApp Image 2026-10-04 at 18.57.50.jpeg" : "'Ha mummy Chris ko khana khaane Park Street jana hai' SISSSSSS??!?!??!!? (Betrayal does come from those closest to you </3)",
    "WhatsApp Image 2026-10-04 at 18.57.51.jpeg" : "Also a chill photo of us :)",
    "WhatsApp Image 2026-10-04 at 18.57.52.jpeg" : "I really like this photo for the memory but also upset kyuki you got sick afterwards :( (sorry twin </3)",
    "WhatsApp Image 2026-10-04 at 18.57.56 (1).jpeg" : "GOODBYEEEEEEE CPTIIIIII (That rhymed)",
    "WhatsApp Image 2026-10-04 at 18.57.56.jpeg" : "That wide ass smile of yours :))) (I love it so much)",
    "WhatsApp Image 2026-10-04 at 18.57.57 (1).jpeg" : "Why are you so photogenic behen I don't understand </3",
    "WhatsApp Image 2026-10-04 at 18.57.57 (2).jpeg" : "The Three Musketeers (2nd meetup) :)",
    "WhatsApp Image 2026-10-04 at 18.57.57.jpeg" : "So happy to be leaving that place LMAO",
    "WhatsApp Image 2026-10-04 at 18.57.58 (1).jpeg" : "Yes hi can you please be slightly less photogenic sis it's not fair </3",
    "WhatsApp Image 2026-10-04 at 18.57.58 (2).jpeg" : "Best CPTI trio :)",
    "WhatsApp Image 2026-10-04 at 18.57.58.jpeg" : "My twin and me(so grateful for you ong) :)",
    "WhatsApp Image 2026-10-04 at 18.57.59 (1).jpeg" : "Also such a fun day :)",
    "WhatsApp Image 2026-10-04 at 18.57.59.jpeg" : "I had so much fun that hangout I was smiling for the entire cab ride afterwards LMAO",
    "WhatsApp Image 2026-10-04 at 18.58.00.jpeg" : "First 3 musketeer hangout(leaning head of twin)",
    "WhatsApp Image 2026-10-04 at 18.58.01.jpeg" : "First 3 musketeer hangout(upright head of twin)",
    "WhatsApp Image 2026-10-04 at 18.58.02.jpeg" : "GB and your laugh :)",
    "WhatsApp Image 2026-10-04 at 18.58.03 (1).jpeg" : "Supermodel and my ugly(pretty) ass twin <3",
    "WhatsApp Image 2026-10-04 at 18.58.03.jpeg" : "AAAAAAA YOUR LAUGH GENUINELY MELTS MY HEART",
    "WhatsApp Image 2026-10-04 at 18.58.04.jpeg" : "Best photo of you two :)",
    "WhatsApp Image 2026-10-04 at 18.58.04 (1).jpeg" : "Definitely the most unexpected (and funniest) trio(not you with your granny humour tho :>)",
    "WhatsApp Video 2026-10-04 at 18.58.04.mp4" : "This was suchhhhhh a fun day :DD The movie was really good ANDDD my favourite person was there :))",
    "WhatsApp Video 2026-10-04 at 18.58.03.mp4" : "OUR FIRST EVER HANGOUT!! :DDDDDDDDDDDD (I was soooo happy to be with you twin)",
    "WhatsApp Video 2026-10-04 at 18.58.02.mp4" : "Sis thinks she's beautiful or something?? (she is)",
    "WhatsApp Video 2026-10-04 at 18.57.55.mp4" : "<a wild retard appears> followed by a devilishly handsome man(me ofc)",
    "WhatsApp Video 2026-10-04 at 18.57.55 (1).mp4" : "sixxxxxxxxxxxsayyyyyyyyyyyyyvennnnnnnnnnnnnnnn ehehehehehe",
    "WhatsApp Video 2026-10-04 at 18.57.51 (2).mp4" : "Me gracing twin with my presence(she was in fact the one blessing me with her presence :) )",
    "WhatsApp Video 2026-10-04 at 18.57.45.mp4" : "Ez ragebait B)",
    "WhatsApp Video 2026-10-04 at 18.57.18.mp4" : "Us getting the same marks definitely SEALEDDD(110% certainty) that I indeed found my real twin :))",
    "WhatsApp Video 2026-10-04 at 18.57.09.mp4" : "#1 retard(you) & #2 retard(me) meetup ehehehehee",
    "WhatsApp Video 2026-10-04 at 18.57.07.mp4" : "Yea, the haircut kinda grew on me :>",
    "WhatsApp Video 2026-10-04 at 18.57.47.mp4" : "Behind the scenes eheehehheheehe <33",
    "WhatsApp Video 2026-10-04 at 18.57.51.mp4" : "Double trouble (object in the mirror is more retarded than she appears) :)"
};


/* =========================================
   LOAD MEMORY ORDER
========================================= */

async function loadMemories() {

    const response = await fetch(ORDER_FILE);

    if (!response.ok) {
        throw new Error("Could not load memories-order.txt");
    }

    const text = await response.text();

    memories = text
        .split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(parseMemoryLine)
        .filter(memory => memory !== null);

    /*
        Sort by actual memory date.
        If two memories have the same date,
        their original order in the text file is preserved.
    */

    memories.sort((a, b) => {

        const dateDifference =
            new Date(a.date) - new Date(b.date);

        if (dateDifference !== 0) {
            return dateDifference;
        }

        return a.originalOrder - b.originalOrder;
    });

    renderGallery();
}


/* =========================================
   PARSE TEXT FILE LINE
========================================= */

function parseMemoryLine(line) {

    const parts = line.split(" | ");

    if (parts.length < 4) {
        return null;
    }

    const originalOrder = parseInt(parts[0], 10);
    const date = parts[1].trim();
    const type = parts[2].trim().toLowerCase();
    const filename = parts.slice(3).join(" | ").trim();

    if (
        Number.isNaN(originalOrder) ||
        !date ||
        !type ||
        !filename
    ) {
        return null;
    }

    return {
        originalOrder,
        date,
        type,
        filename
    };
}


/* =========================================
   PATH HANDLING
========================================= */

function getMemoryPath(memory) {

    let folder;

    if (memory.type === "image") {
        folder = "Memories/photos/";
    }

    else if (memory.type === "video") {
        folder = "Memories/videos/";
    }

    else if (memory.type === "gif") {
        folder = "Memories/gif/";
    }

    else {
        return "";
    }

    /*
        encodeURI preserves the filename structure while
        safely handling spaces and other filename characters.
    */

    return folder + encodeURI(memory.filename);
}


/* =========================================
   DATE FORMATTING
========================================= */

function formatDate(dateString) {

    const date = new Date(`${dateString}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


/* =========================================
   RENDER GALLERY
========================================= */

function renderGallery() {

    const grid = document.getElementById("memories-grid");
    const count = document.getElementById("memory-count");

    grid.innerHTML = "";

    count.textContent =
        `${memories.length} ${memories.length === 1 ? "memory" : "memories"}`;


    memories.forEach((memory, index) => {

        const card = document.createElement("article");

        card.className =
            `memory-card memory-${memory.type}`;

        /*
            Give certain cards a larger visual presence.
            This is based on position, not on the media itself.
        */

        if (
            index === 0 ||
            index === 5 ||
            index === 12 ||
            index === 20 ||
            index === 29 ||
            index === 38
        ) {
            card.classList.add("memory-featured");
        }


        const mediaWrapper =
            document.createElement("div");

        mediaWrapper.className = "memory-media";


        if (memory.type === "image") {

            const image =
                document.createElement("img");

            image.src = getMemoryPath(memory);

            image.alt =
                `Memory from ${formatDate(memory.date)}`;

            image.loading = "lazy";

            mediaWrapper.appendChild(image);
        }


        else if (
            memory.type === "video" ||
            memory.type === "gif"
        ) {

            const video =
                document.createElement("video");

            video.src = getMemoryPath(memory);

            video.preload = "metadata";

            video.muted = true;

            video.playsInline = true;

            video.setAttribute("aria-label",
                `Memory from ${formatDate(memory.date)}`
            );

            mediaWrapper.appendChild(video);


            const playIndicator =
                document.createElement("span");

            playIndicator.className =
                "memory-play";

            playIndicator.textContent = "▶";

            mediaWrapper.appendChild(playIndicator);
        }


        const information =
            document.createElement("div");

        information.className =
            "memory-information";


        const date =
            document.createElement("span");

        date.className =
            "memory-date";

        date.textContent =
            formatDate(memory.date);


        const type =
            document.createElement("span");

        type.className =
            "memory-type";

        type.textContent =
            memory.type === "video"
                ? "VIDEO"
                : memory.type === "gif"
                    ? "GIF"
                    : "PHOTO";


        information.appendChild(date);
        information.appendChild(type);


        card.appendChild(mediaWrapper);
        card.appendChild(information);


        card.addEventListener("click", () => {
            openViewer(index);
        });


        grid.appendChild(card);
    });
}


/* =========================================
   VIEWER
========================================= */

function openViewer(index) {

    currentMemoryIndex = index;

    const viewer =
        document.getElementById("memory-viewer");

    viewer.classList.add("active");

    viewer.setAttribute("aria-hidden", "false");

    document.body.classList.add("viewer-open");

    renderViewerMedia();
}


function closeViewer() {

    const viewer =
        document.getElementById("memory-viewer");

    const mediaContainer =
        document.getElementById("viewer-media");

    const commentElement =
        document.getElementById("viewer-comment");

    /*
        Removing the media element stops any playing video.
    */

    mediaContainer.innerHTML = "";
    
    if (commentElement) {
        commentElement.textContent = "";
    }

    viewer.classList.remove("active");

    viewer.setAttribute("aria-hidden", "true");

    document.body.classList.remove("viewer-open");
}


function renderViewerMedia() {

    const memory =
        memories[currentMemoryIndex];

    const mediaContainer =
        document.getElementById("viewer-media");

    const commentElement =
        document.getElementById("viewer-comment");

    const dateElement =
        document.getElementById("viewer-date");

    const positionElement =
        document.getElementById("viewer-position");


    mediaContainer.innerHTML = "";


    if (memory.type === "image") {

        const image =
            document.createElement("img");

        image.src =
            getMemoryPath(memory);

        image.alt =
            `Memory from ${formatDate(memory.date)}`;

        mediaContainer.appendChild(image);
    }


    else {

        const video =
            document.createElement("video");

        video.src =
            getMemoryPath(memory);

        video.controls = true;

        video.autoplay = true;

        video.playsInline = true;

        mediaContainer.appendChild(video);
    }

    /* BIND CAPTION TEXT BY COMPARING FILENAME AGAINST DICTIONARY KEY */
    if (commentElement) {
        commentElement.textContent = memoryComments[memory.filename] || "";
    }

    dateElement.textContent =
        formatDate(memory.date);


    positionElement.textContent =
        `${currentMemoryIndex + 1} / ${memories.length}`;


    updateViewerButtons();
}


/* =========================================
   VIEWER NAVIGATION
========================================= */

function showPreviousMemory() {

    currentMemoryIndex--;

    if (currentMemoryIndex < 0) {
        currentMemoryIndex = memories.length - 1;
    }

    renderViewerMedia();
}


function showNextMemory() {

    currentMemoryIndex++;

    if (currentMemoryIndex >= memories.length) {
        currentMemoryIndex = 0;
    }

    renderViewerMedia();
}


function updateViewerButtons() {

    document.getElementById("viewer-prev").disabled = false;
    document.getElementById("viewer-next").disabled = false;
}


/* =========================================
   EVENTS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadMemories().catch(error => {

        console.error(error);

        const grid =
            document.getElementById("memories-grid");

        grid.innerHTML = `<p class="memories-error"> Could not load the memory archive. Check that <strong>Memories/memories-order.txt</strong> exists and that the filenames are correct. </p>`;
    });
    document.getElementById("viewer-close").addEventListener("click", closeViewer);
    document.getElementById("viewer-prev").addEventListener("click", showPreviousMemory);
    document.getElementById("viewer-next").addEventListener("click", showNextMemory);

    /*Keyboard controls*/

    document.addEventListener("keydown", event => {
    const viewer = document.getElementById("memory-viewer");
    if (!viewer.classList.contains("active")) {
        return;
    }
    if (event.key === "Escape") {
        closeViewer();
    }
    else if (event.key === "ArrowLeft") {
        showPreviousMemory();
    }
    else if (event.key === "ArrowRight") {
        showNextMemory();
    }
    });
    /*Clicking the dark area outside the media closes the viewer.*/
    document.getElementById("memory-viewer").addEventListener("click", event => {
    if (event.target.id === "memory-viewer") {
        closeViewer();
        }
    });
});

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