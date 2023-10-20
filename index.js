document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        {
            question: "Which planet is known as the Red Planet?",
            correctAnswer: "Mars",
            answers: ["Earth", "Mars", "Jupiter", "Venus"],
        },
        {
            question: "What is the largest mammal?",
            correctAnswer: "Whale",
            answers: ["Elephant", "Whale", "Hippopotamus", "Lion"],
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            correctAnswer: "William Shakespeare",
            answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Leo Tolstoy"],
        },
    ];

    let currentQuestion = 0;
    let userAnswers = [];

    const questionElement = document.getElementById("question");
    const answerForm = document.getElementById("answer-form");
    const nextButton = document.getElementById("next-button");
    const submitButton = document.getElementById("submit-button");
    const resultsElement = document.getElementById("results");
    const chartElement = document.getElementById("chart");

    function loadQuestion() {
        const currentQuestionData = questions[currentQuestion];
        questionElement.innerText = `Question ${currentQuestion + 1}: ${currentQuestionData.question}`;
        answerForm.innerHTML = "";
        currentQuestionData.answers.forEach((answer) => {
            const input = document.createElement("input");
            const label = document.createElement("label");
            label.innerHTML = answer
            input.type = "radio";
            input.name = "answer";
            input.value = answer;
            input.innerText = answer;
            answerForm.appendChild(input);
            answerForm.appendChild(label);
        });
    }

    nextButton.addEventListener("click", function () {
        const selectedAnswer = document.querySelector("input[name='answer']:checked");
        if (selectedAnswer) {
            userAnswers[currentQuestion] = selectedAnswer.value;
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
                answerForm.reset();
            } else {
                nextButton.style.display = "none";
                submitButton.style.display = "block";
            }
        }
    });

    submitButton.addEventListener("click", function () {
        resultsElement.style.display = "block";
        submitButton.style.display = "none";

        const correctAnswers = userAnswers.filter(
            (answer, index) => answer === questions[index].correctAnswer
        ).length;
        const incorrectAnswers = questions.length - correctAnswers;

        const chart = new Chart(chartElement, {
            type: "bar",
            data: {
                labels: ["Correct Answers", "Incorrect Answers"],
                datasets: [
                    {
                        label: "Quiz Results",
                        data: [correctAnswers, incorrectAnswers],
                        backgroundColor: ["green", "red"],
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    });

    loadQuestion();
});
