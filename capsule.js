const unlockDate =
    new Date("2026-10-07T00:00:00");

const now =
    new Date();

const capsule =
    document.getElementById("capsule-content");

if (now < unlockDate) {

    const daysRemaining =
        Math.ceil(
            (unlockDate - now) /
            (1000 * 60 * 60 * 24)
        );

    capsule.innerHTML = `
        <div class="quote-card">

            <h2>Locked</h2>

            <br>

            <p>
                This message unlocks on
                7 October 2026.
            </p>

            <br>

            <p>
                ${daysRemaining} days remaining.
            </p>

        </div>
    `;

}
else {

    capsule.innerHTML = `
        <div class="quote-card">

            <h2>Happy Birthday!</h2>

            <br>

            <div class="birthday-message">
                Birthday message here.
            </div>

        </div>
    `;
}