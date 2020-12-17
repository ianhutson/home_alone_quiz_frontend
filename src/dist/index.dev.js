"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  // Functions
  function buildQuiz() {
    // variable to store the HTML output
    var output = [];
    fetchQuestions();
    var answers = [];
    fetchAnswers();

    var Answer = function Answer(text, correct) {
      _classCallCheck(this, Answer);

      this.text = text;
      this.correct = correct;
      this.question_id = this.question_id;
    };

    var Question = function Question(text, pic, answer, difficulty) {
      _classCallCheck(this, Question);

      this.text = text;
      this.pic = pic;
      this.answer = answer;
      this.difficulty = difficulty;
    };

    function fetchAnswers() {
      fetch(answersURL).then(function (res) {
        return res.json();
      }).then(function (a) {
        a.forEach(function (value) {
          answers.push(value);
        });
      });
    }

    ;

    function fetchQuestions() {
      fetch(questionsURL).then(function (res) {
        return res.json();
      }).then(function (questions) {
        var i = 0;

        do {
          i += 1;
          console.log(i);
        } while (i < 5);

        var randomIndex = questions[Math.floor(Math.random() * questions.length)];
        currentQuestion = new Question(questions[randomIndex])(function (currentQuestion, questionNumber) {
          // variable to store the list of possible answers
          // and for each available answer...
          var i = 0;

          do {
            i += 1;
            console.log(i);
          } while (i < 3);

          var randomAnswerIndex = answers[Math.floor(Math.random() * answers.length)];
          currentAnswer = new Answer(answers[randomAnswerIndex]);
          currentQuestion.currentAnswer.forEach; // ...add an HTML radio button

          answers.push("<label>\n<input type=\"radio\" name=\"question".concat(questionNumber, "\" value=\"").concat(letter, "\">\n").concat(letter, " :\n                          ").concat(currentQuestion.answers[letter], "\n                        </label>")); // add this question and its answers to the output

          output.push("<div class=\"slide\">\n <div class=\"question\"> ".concat(questionNumber + 1, ". ").concat(currentQuestion.text, " </div>\n <div class=\"answers\"> ").concat(answers.join(''), " </div>\n</div>"));
        }); // finally combine our output list into one string of HTML and put it on the
        // page

        quizContainer.innerHTML = output.join('');
        slides = document.querySelectorAll(".slide"); // Show the first slide

        showSlide(slides, currentSlide);
      });
    }
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

  function showSlide(slides, n) {
    console.log(slides);
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
  var slides = [];
  var currentSlide = 0; // Event listeners

  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();