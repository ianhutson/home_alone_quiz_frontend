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


function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function slideManager() {
    const slides = Array.from(document.getElementsByClassName("slide"));
    let currentSlide = 0;
    showSlide(currentSlide);

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;
        Question.finalQuestions[0].forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
       
            if (userAnswer === "true") {
                numCorrect++;
                answerContainers[questionNumber].style.color = 'lightgreen';
            } else {
                answerContainers[questionNumber].style.color = 'red';
            }
        });
        
        resultsContainer.innerHTML = `Score: ${Math.round(numCorrect/Question.numQuestions)*100}% <br><br>`;
        scoreForm.innerHTML = "Submit your score! <br>"+ `Name: <form id="score-form">
        <input size="10" type="text" id="score-input">
        <input id="submit-score" type="button" value="Submit Score!">
        </form><br><br>`;
        document.getElementById("submit-score").addEventListener("click", Score.submitScore)
        generateScoreboard();
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        } else {
            previousButton.style.display = 'inline-block';
        }
        if (currentSlide === slides.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        } else {
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide(n) {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide(n) {
        showSlide(currentSlide - 1);
    }

    submitButton.addEventListener('click', showResults)
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
}

function generateScoreboard() {
    const renderedScores = []
    Score.loadedScores.filter(score => score.difficulty === Question.quizDifficulty).forEach((score) => {
            renderedScores.push(
                score.name + " - " + score.value + "%" + " - " + score.difficulty + `<br>`
            )
    })
scoreContainer.innerHTML = `<div class="scoreboard-container"> ${Question.quizDifficulty.charAt(0).toUpperCase() + Question.quizDifficulty.slice(1)} Quiz Scoreboard: <br>${renderedScores.sort((a, b) => parseInt(b.replace(/\D/g,'')) - parseInt(a.replace(/\D/g,''))).slice(0, 5).join("")}</div>`
}

function renderQuiz() {
    Score.fetchScores();
    Answer.renderAnswers();
    slideManager();
}