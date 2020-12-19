const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const url = "http://localhost:3000"
const questionsURL = url + "/questions"
const answersURL = url + "/answers"

Question.fetchQuestions();

let currentSlide = 0;
Question.showSlide(currentSlide)

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");


submitButton.addEventListener('click', Question.showResults);
previousButton.addEventListener("click", Question.showPreviousSlide);
nextButton.addEventListener("click", Question.showNextSlide);