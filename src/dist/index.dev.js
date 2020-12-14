"use strict";

(function () {
  // Functions
  function buildQuiz() {
    // variable to store the HTML output
    var output = []; // fetch attempts

    function fetchQuestions() {
      fetch(questionsURL).then(function (res) {
        return res.json();
      }).then(function (questions) {
        return questions.forEach(console.log);
      });
    } // for each question...


    myQuestions.forEach(function (currentQuestion, questionNumber) {
      // variable to store the list of possible answers
      var answers = []; // and for each available answer...

      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push("<label>\n                <input type=\"radio\" name=\"question".concat(questionNumber, "\" value=\"").concat(letter, "\">\n                ").concat(letter, " :\n                ").concat(currentQuestion.answers[letter], "\n              </label>"));
      } // add this question and its answers to the output


      output.push("<div class=\"slide\">\n              <div class=\"question\"> ".concat(currentQuestion.question, " </div>\n              <div class=\"answers\"> ").concat(answers.join(""), " </div>\n            </div>"));
    }); // finally combine our output list into one string of HTML and put it on the page

    quizContainer.innerHTML = output.join('');
  }

  function showResults() {
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers'); // keep track of user's answers

    var numCorrect = 0; // for each question...

    myQuestions.forEach(function (currentQuestion, questionNumber) {
      // find selected answer
      var answerContainer = answerContainers[questionNumber];
      var selector = "input[name=question".concat(questionNumber, "]:checked");
      var userAnswer = (answerContainer.querySelector(selector) || {}).value; // if answer is correct

      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++; // color the answers green

        answerContainers[questionNumber].style.color = 'lightgreen';
      } // if answer is wrong or blank
      else {
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
    }); // show number of correct answers out of total

    resultsContainer.innerHTML = "".concat(numCorrect, " out of ").concat(myQuestions.length);
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

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  } // Variables


  var quizContainer = document.getElementById('quiz');
  var resultsContainer = document.getElementById('results');
  var submitButton = document.getElementById('submit');
  var url = "http://localhost:3000";
  var questionsURL = url + "/questions";
  var answersURL = url + "/answers";
  var myQuestions = "";
  var myQuestionsExample = [{
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich"
    },
    correctAnswer: "c"
  }, {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "c"
  }, {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint"
    },
    correctAnswer: "d"
  }]; // Kick things off

  buildQuiz(); // Pagination

  var previousButton = document.getElementById("previous");
  var nextButton = document.getElementById("next");
  var slides = document.querySelectorAll(".slide");
  var currentSlide = 0; // Show the first slide

  showSlide(currentSlide); // Event listeners

  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();