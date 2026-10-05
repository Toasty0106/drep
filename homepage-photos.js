document.addEventListener("DOMContentLoaded", () => {

    const photos =
        document.querySelectorAll(".homepage-photo");

    const viewer =
        document.getElementById("homepage-photo-viewer");

    const viewerImage =
        document.getElementById("homepage-photo-viewer-image");

    const closeButton =
        document.getElementById("homepage-photo-viewer-close");


    if (
        !photos.length ||
        !viewer ||
        !viewerImage ||
        !closeButton
    ) {
        return;
    }


    /* =========================================
       PHOTO CLICK SOUND
    ========================================== */

    function playPhotoSound() {

        const sound =
            new Audio("sounds/photo-click.mp3");

        sound.volume = 0.5;

        sound.play().catch(() => {});

    }


    /* =========================================
       OPEN PHOTO
    ========================================== */

    function openPhoto(photo) {

        const source =
            photo.dataset.photo;

        if (!source) {
            return;
        }

        viewerImage.src = source;

        viewer.classList.add("active");

        viewer.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "homepage-photo-open"
        );

        playPhotoSound();

    }


    /* =========================================
       CLOSE PHOTO
    ========================================== */

    function closePhoto() {

        viewer.classList.remove("active");

        viewer.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "homepage-photo-open"
        );

        viewerImage.src = "";

    }


    /* =========================================
       CLICK EVENTS
    ========================================== */

    photos.forEach(photo => {

        photo.addEventListener("click", () => {

            openPhoto(photo);

        });


        /* Keyboard accessibility */

        photo.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openPhoto(photo);

            }

        });

    });


    /* =========================================
       CLOSE BUTTON
    ========================================== */

    closeButton.addEventListener(
        "click",
        closePhoto
    );


    /* =========================================
       CLICK OUTSIDE PHOTO
    ========================================== */

    viewer.addEventListener("click", event => {

        if (event.target === viewer) {

            closePhoto();

        }

    });


    /* =========================================
       ESCAPE KEY
    ========================================== */

    document.addEventListener("keydown", event => {

        if (!viewer.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {

            closePhoto();

        }

    });

});