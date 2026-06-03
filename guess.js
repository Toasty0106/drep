async function loadGame() {

    const response = await fetch("quotes.json");
    const quotes = await response.json();

    const questionBox =
        document.getElementById("question-box");

    const optionsContainer =
        document.getElementById("options-container");

    const result =
        document.getElementById("guess-result");

    const nextButton =
        document.getElementById("next-question-btn");

    function shuffle(array) {

        for (let i = array.length - 1; i > 0; i--) {

            const j =
                Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] =
                [array[j], array[i]];
        }

        return array;
    }

    function generateQuestion() {

        result.textContent = "";

        optionsContainer.innerHTML = "";

        const quoteObj =
            quotes[Math.floor(Math.random() * quotes.length)];

        const words =
            quoteObj.quote.split(" ");

        if (words.length < 2) {

            questionBox.textContent =
                quoteObj.quote;

            return;
        }

        const hiddenIndex =
            Math.floor(Math.random() * words.length);

        const correctAnswer =
            words[hiddenIndex];

        const displayedWords =
            [...words];

        displayedWords[hiddenIndex] =
            "______";

        questionBox.textContent =
            `"${displayedWords.join(" ")}"`;

        const wrongOptions = [];

        quotes.forEach(q => {

            q.quote.split(" ").forEach(word => {

                if (
                    word.toLowerCase() !==
                    correctAnswer.toLowerCase()
                ) {

                    wrongOptions.push(word);
                }
            });
        });

        shuffle(wrongOptions);

        const options = [
            correctAnswer,
            wrongOptions[0],
            wrongOptions[1],
            wrongOptions[2]
        ];

        shuffle(options);

        options.forEach(option => {

            const btn =
                document.createElement("button");

            btn.textContent = option;

            btn.addEventListener("click", () => {

                if (option === correctAnswer) {

                    result.textContent =
                        "✅ Correct!";

                } else {

                    result.textContent =
                        `❌ Wrong! Correct answer: ${correctAnswer}`;
                }
            });

            optionsContainer.appendChild(btn);
        });
    }

    nextButton.addEventListener(
        "click",
        generateQuestion
    );

    generateQuestion();
}

loadGame();