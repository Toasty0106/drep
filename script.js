const birthday = new Date("2026-10-07T00:00:00");

function updateTimer() {

    const now = new Date();

    let target = new Date(
        now.getFullYear(),
        birthday.getMonth(),
        birthday.getDate()
    );

    if (target < now) {
        target.setFullYear(target.getFullYear() + 1);
    }

    const diff = target - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (diff % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (diff % (1000 * 60))
        / 1000
    );

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateTimer();

setInterval(updateTimer, 1000);
