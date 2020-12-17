(function() {
    // Functions
    function buildQuiz() {
        // variable to store the HTML output
        var output = [];
        fetchQuestions();
        var answers = [];
        fetchAnswers();

        class Answer {
            constructor(text, correct) {
                this.text = text;
                this.correct = correct;
                this.question_id = this.question_id
            }
        }
        class Question {
            constructor(text, pic, answer, difficulty) {
                this.text = text;
                this.pic = pic;
                this.answer = answer;
                this.difficulty = difficulty;
            }
        }

        function fetchAnswers() {
            fetch(answersURL).then(function(res) {
                return res.json();
            }).then(function(a) {
                a.forEach(function(value) {
                    answers.push(value);
                });
            })
        };

        function fetchQuestions() {
            fetch(questionsURL).then(function(res) {
                return res.json();
            }).then(function(questions) {
                let i = 0;
                do {
                    i += 1;
                    console.log(i);
                } while (i < 5);
                const randomIndex = questions[Math.floor(Math.random() * questions.length)];
                currentQuestion = new Question(questions[randomIndex])
                    (function(currentQuestion, questionNumber) {
                        // variable to store the list of possible answers
                        // and for each available answer...
                        let i = 0;
                        do {
                            i += 1;
                            console.log(i);
                        } while (i < 3);
                        const randomAnswerIndex = answers[Math.floor(Math.random() * answers.length)];
                        currentAnswer = new Answer(answers[randomAnswerIndex])
                        currentQuestion.currentAnswer.forEach(ans =>
                            // ...add an HTML radio button
                            ans.push("<label>\n<input type=\"radio\" name=\"question".concat(questionNumber, "\" value=\"").concat(letter, "\">\n").concat(letter, " :\n                          ").concat(currentQuestion.answers[letter], "\n                        </label>"));
                            // add this question and its answers to the output
                            output.push("<div class=\"slide\">\n <div class=\"question\"> ".concat(questionNumber + 1, ". ").concat(currentQuestion.text, " </div>\n <div class=\"answers\"> ").concat(answers.join(''), " </div>\n</div>"));
                        )
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
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    function showSlide(slides, n) {
        console.log(slides)
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
    }

    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const url = "http://localhost:3000"
    const questionsURL = url + "/questions"
    const answersURL = url + "/answers"
    const myQuestions = ""
    const myQuestionsExample = [{
            question: "Who invented JavaScript?",
            answers: {
                a: "Douglas Crockford",
                b: "Sheryl Sandberg",
                c: "Brendan Eich"
            },
            correctAnswer: "c"
        },
        {
            question: "Which one of these is a JavaScript package manager?",
            answers: {
                a: "Node.js",
                b: "TypeScript",
                c: "npm"
            },
            correctAnswer: "c"
        },
        {
            question: "Which tool can you use to ensure code quality?",
            answers: {
                a: "Angular",
                b: "jQuery",
                c: "RequireJS",
                d: "ESLint"
            },
            correctAnswer: "d"
        }
    ];

    // Kick things off
    buildQuiz();

    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    let slides = [];
    let currentSlide = 0;

    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();