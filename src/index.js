const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const url = "http://localhost:3000"
const questionsURL = url + "/questions"
const answersURL = url + "/answers"
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

Question.fetchQuestions();

function slideManager() {
    const slides = Array.from(document.getElementsByClassName("slide"));
    let currentSlide = 0;
    showSlide(currentSlide);

    function showResults() {
        const answerContainers = quizContainer.getElementsByClassName('answers');
        console.log(answerContainers[1])
        let numCorrect = 0;
        Question.allQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            if (userAnswer === true) {
                numCorrect++;
                answerContainers[questionNumber].style.color = 'lightgreen';
            } else {
                answerContainers[questionNumber].style.color = 'red';
            }
        });
        resultsContainer.innerHTML = `${numCorrect} out of ${Question.allQuestions.length}`;
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