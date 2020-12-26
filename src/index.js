const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const scoreContainer = document.getElementById('scoreboard');
const scoreForm = document.getElementById('score-form')
const submitButton = document.getElementById('submit');
const submitScoreButton = document.getElementById('submit-score');
const url = "http://localhost:3000"
const questionsURL = url + "/questions"
const answersURL = url + "/answers"
const scoresURL = url + "/scores"
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

Question.fetchQuestions();

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
        Question.quizArr.forEach((currentQuestion, questionNumber) => {
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
     

        generateScoreboard();
        resultsContainer.innerHTML = `Score: ${Math.round(numCorrect/Question.quizArr.length)*100}% <br><br>`;
        scoreForm.innerHTML = "Submit your score! <br>"+ `Name: <form id="score-form">
        <input size="10" type="text" id="score-input">
        <input id="submit-score" type="button" value="Submit Score!">
        </form><br><br>`;
        scoreContainer.innerHTML = `Top 5: <br>${Score.renderedScores.sort((a, b) => parseInt(b.replace(/\D/g,'')) - parseInt(a.replace(/\D/g,''))).slice(0, 5).join("")}`
        document.getElementById("submit-score").addEventListener("click", Score.submitScore)
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

    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
}

function generateScoreboard() {
    Score.loadedScores.forEach((score) => {
            Score.renderedScores.push(
                score.name + " - " + score.value + "%" + `<br>`
            )
    })
}
function updateScoreboard() {
    const updatedScores = []
    Score.loadedScores.forEach((score) => {
            updatedScores.push(
                score.name + " - " + score.value + "%" + `<br>`
            )
    })
}

function renderQuiz() {
    Score.fetchScores();
    Question.randQ();
    Answer.renderAnswers();
    slideManager();
}