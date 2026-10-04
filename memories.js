const ORDER_FILE = "Memories/memories-order.txt";

let memories = [];
let currentMemoryIndex = 0;


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

    /*
        Removing the media element stops any playing video.
    */

    mediaContainer.innerHTML = "";

    viewer.classList.remove("active");

    viewer.setAttribute("aria-hidden", "true");

    document.body.classList.remove("viewer-open");
}


function renderViewerMedia() {

    const memory =
        memories[currentMemoryIndex];

    const mediaContainer =
        document.getElementById("viewer-media");

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

    /*
        Buttons intentionally remain enabled so the viewer
        loops from the first memory to the last and vice versa.
    */

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

        grid.innerHTML = `
            <p class="memories-error">
                Could not load the memory archive.
                Check that <strong>Memories/memories-order.txt</strong>
                exists and that the filenames are correct.
            </p>
        `;
    });


    document
        .getElementById("viewer-close")
        .addEventListener("click", closeViewer);


    document
        .getElementById("viewer-prev")
        .addEventListener("click", showPreviousMemory);


    document
        .getElementById("viewer-next")
        .addEventListener("click", showNextMemory);


    /*
        Keyboard controls
    */

    document.addEventListener("keydown", event => {

        const viewer =
            document.getElementById("memory-viewer");

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


    /*
        Clicking the dark area outside the media
        closes the viewer.
    */

    document
        .getElementById("memory-viewer")
        .addEventListener("click", event => {

            if (event.target.id === "memory-viewer") {
                closeViewer();
            }
        });

});