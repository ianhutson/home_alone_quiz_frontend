const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const scoreContainer = document.getElementById('scoreboard');
const scoreForm = document.getElementById('score-form')
const submitButton = document.getElementById('submit');
const submitScoreButton = document.getElementById('submit-score');
const url = "http://localhost:3000"
const questionsURL = url + "/questions"
const scoresURL = url + "/scores"
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const easy = document.getElementById("easy")
const medium = document.getElementById("medium")
const hard = document.getElementById("hard")
const difficultyText = document.getElementById("difficulty")

previousButton.style.display = "none"
nextButton.style.display = "none"
submitButton.style.display = "none"

easy.addEventListener("click", Question.fetchQuestions);
medium.addEventListener("click", Question.fetchQuestions);
hard.addEventListener("click", Question.fetchQuestions);

function renderQuiz() {
    Answer.renderAnswers();
    Question.slideManager();
    difficultyText.style.display = "none"
    easy.style.display = "none"
    medium.style.display = "none"
    hard.style.display = "none"
    Score.fetchScores();
}