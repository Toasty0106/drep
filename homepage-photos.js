document.addEventListener("DOMContentLoaded", () => {

    const photos =
        document.querySelectorAll(".homepage-photo");

    const viewer =
        document.getElementById("homepage-photo-viewer");

    const viewerImage =
        document.getElementById("homepage-photo-viewer-image");

    /* TARGET THE NEW CAPTION ELEMENT YOU JUST ADDED IN INDEX.HTML */
    const viewerCaption =
        document.getElementById("homepage-photo-viewer-caption");

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
       CUSTOM COMMENTS CONFIGURATION
       Change the text inside the quotes below to whatever you like!
    ========================================== */
    const photoCaptions = {
        "Homepage/home-photo-1.jpeg": "Sis looking like she thinks she's so pretty (she is)",
        "Homepage/home-photo-2.jpeg": "Need to call the police because it HAS to be illegal to look this good",
        "Homepage/home-photo-3.jpeg": "Sun helping you glow even though you were born glowing :)"
    };


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

        /* INJECT THE CAPTION TEXT MATCHING THIS SPECIFIC PHOTO FILE PATH */
        if (viewerCaption) {
            viewerCaption.textContent = photoCaptions[source] || "";
        }

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
        
        /* CLEAR CAPTION ON CLOSE */
        if (viewerCaption) {
            viewerCaption.textContent = "";
        }

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

    /* UPDATED: Checks if clicking viewer background OR content wrapper to close safely */
    viewer.addEventListener("click", event => {

        if (event.target === viewer || event.target.classList.contains("homepage-photo-viewer-content")) {

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

        /* =========================================
       FOOTER EASTER EGG MOBILE CLICK EVENT
    ========================================== */
    const easterEgg = document.getElementById("footer-easter-egg");

    if (easterEgg) {
        // Toggle bubble when tapping directly on the footer string
        easterEgg.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevents instant closing
            easterEgg.classList.toggle("mobile-active");
        });

        // Close bubble when clicking anywhere else on the browser viewport screen frame
        document.addEventListener("click", () => {
            easterEgg.classList.remove("mobile-active");
        });
    }

});