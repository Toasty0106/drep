async function loadQuotes() {

    const response = await fetch("quotes.json");

    const quotes = await response.json();

    document.getElementById("quote-counter").textContent =
    `Quotes Archived: ${quotes.length}`;

    const latestQuoteDate = new Date(
    Math.max(
        ...quotes.map(q => new Date(q.date))
        )
    );

    const today = new Date();

    const daysSinceLastQuote = Math.floor(
        (today - latestQuoteDate) /
        (1000 * 60 * 60 * 24)
    );

    document.getElementById("streak-tracker").textContent = `Days Since Last Legendary Quote: ${daysSinceLastQuote}`;

    const container =
        document.getElementById("quotes-container");

    quotes.forEach(q => {

        const card =
            document.createElement("div");

        card.className = "quote-card";

        card.innerHTML = `
            <p class="quote-text">
                "${q.quote}"
            </p>

            <p class="quote-date">
                ${q.date}
            </p>

            <p class="quote-rating">
                GOAT Rating: ${q.rating}/10
            </p>

            <div class="quote-comment">
                <strong>Commentary:</strong><br>
                ${q.comment}
            </div>
        `;

        card.addEventListener("click", () => {
            card.classList.toggle("expanded");
        });

        container.appendChild(card);
    });
}

loadQuotes();