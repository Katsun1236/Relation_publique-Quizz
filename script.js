
const questions = [
    {
        question: "Quelle est la principale mission des relations publiques ?",
        answers: [
            "Gérer la communication interne",
            "Renforcer l’image positive de l’entreprise",
            "Vendre des produits",
            "Augmenter les ventes"
        ],
        correctAnswers: [1]
    },
    {
        question: "Quel est l'objectif des relations publiques en cas de crise ?",
        answers: [
            "Ignorer la situation",
            "Répondre rapidement et de manière transparente",
            "Accuser la concurrence",
            "Minimiser l'impact négatif sur la réputation"
        ],
        correctAnswers: [1, 3]
    },
    // Add additional questions following the same structure as above
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h3>${question.question}</h3>
        <form id="question-form">
            ${question.answers.map((answer, index) => {
                return `<label><input type="checkbox" name="answer" value="${index}"> ${answer}</label><br>`;
            }).join('')}
        </form>
    `;
}

function nextQuestion() {
    const selectedAnswers = Array.from(document.querySelectorAll('input[name="answer"]:checked'))
                                  .map(input => parseInt(input.value));
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the selected answers are correct
    const isCorrect = selectedAnswers.every(answer => currentQuestion.correctAnswers.includes(answer)) &&
                      selectedAnswers.length === currentQuestion.correctAnswers.length;
    if (isCorrect) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("next-button").style.display = "none";
        document.getElementById("submit-button").style.display = "inline-block";
    }
}

function submitQuiz() {
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score").textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result-container").style.display = "none";
    document.getElementById("next-button").style.display = "inline-block";
    document.getElementById("submit-button").style.display = "none";
    loadQuestion();
}

loadQuestion();
