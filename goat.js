const today = new Date();

const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

const goatLevel =
    Math.floor(seededRandom(seed) * 21) + 80;

const visionLevel =
    Math.floor(seededRandom(seed + 1) * 31);

const hearingLevel =
    Math.floor(seededRandom(seed + 2) * 31);

const studyLevel =
    Math.floor(seededRandom(seed + 3) * 34) + 69;

let verdict = "";

if (goatLevel >= 95) {
    verdict =
        "GOAT status has reached dangerous levels.";
}
else if (goatLevel >= 90) {
    verdict =
        "GOAT activity detected. Proceed with admiration.";
}
else if (goatLevel >= 85) {
    verdict =
        "GOAT systems operating normally.";
}
else {
    verdict =
        "GOAT energy remains stable.";
}

document.getElementById("goat-results").innerHTML = `
    <div class="quote-card">
        <p><strong>GOAT Level:</strong> ${goatLevel}%</p>
        <br>

        <p><strong>Vision Level:</strong> ${visionLevel}%</p>
        <br>

        <p><strong>Hearing Level:</strong> ${hearingLevel}%</p>
        <br>

        <p><strong>Study Level:</strong> ${studyLevel}%</p>
        <br>

        <p><strong>Verdict:</strong></p>
        <p>${verdict}</p>
    </div>
`;