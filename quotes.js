async function loadQuotes() {

    const response = await fetch("quotes.json");

    const quotes = await response.json();

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
        `;

        container.appendChild(card);
    });
}

loadQuotes();