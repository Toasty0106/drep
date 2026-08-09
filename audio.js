document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("button").forEach(button => {

        button.addEventListener("click", () => {

            const sound = new Audio("sounds/click.mp3");

            sound.volume = 0.5;

            sound.play().catch(() => {});

        });

    });

});