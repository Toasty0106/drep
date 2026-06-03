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
        "Okay twin we get it, you're smart 💔";
}
else if (goatLevel >= 90) {
    verdict =
        "All this and still can't hear well🙄";
}
else if (goatLevel >= 85) {
    verdict =
        "Least exciting day waking up as Dhriti Shaw.";
}
else {
    verdict =
        "We retarding today.🔥";
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