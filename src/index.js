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

easy.addEventListener("click", Question.selectDifficulty);
medium.addEventListener("click", Question.selectDifficulty);
hard.addEventListener("click", Question.selectDifficulty);

function renderQuiz() {
    Score.fetchScores();
    Answer.renderAnswers();
    Question.slideManager();
}