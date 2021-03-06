class Question {
    static numQuestions = 0
    static allQuestions = [];
    static quizArr = []
    static finalQuestions = []
    static quizDifficulty = ""

    constructor(question) {
        this.id = question.id
        this.text = question.attributes.text;
        this.pic = question.attributes.pic;
        this.difficulty = question.attributes.difficulty;
        this.answers = []
        Question.allQuestions.push(this)
    }

    static slideManager() {
        const slides = Array.from(document.getElementsByClassName("slide"));
        let currentSlide = 0;
        showSlide(currentSlide);

        function float2int(value) { return value | 0; }

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
            resultsContainer.innerHTML = `Score: ${float2int((numCorrect/Question.numQuestions)*100)}% <br><br>`;
            scoreForm.innerHTML = "Submit your score! <br>" + `Name: <form id="score-form">
            <input size="10" type="text" id="score-input">
            <input id="submit-score" type="button" value="Submit Score!">
            </form><br><br>`;
            document.getElementById("submit-score").addEventListener("click", Score.submitScore)
            Score.generateScoreboard();
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



    static randQ(difficulty) {
        if (difficulty === "random") {
            Question.quizArr.push(this.allQuestions)
        } else {

            Question.quizArr.push(Question.allQuestions.filter(q => q.difficulty === difficulty).sort(function() {
                return 0.5 - Math.random();
            }));
        }
    }

    static fetchQuestions(difficulty) {
        fetch(questionsURL)
            .then(res => res.json())
            .then(questions => {
                for (let question of questions.data) {
                    let newQuestion = new Question(question)
                    question.attributes.answers.forEach(answer => {
                        let newAnswers = new Answer(answer)
                        newQuestion.answers.push(newAnswers)
                    })
                }
                selectDifficulty();
                renderQuiz();
            })

        function selectDifficulty() {
            if (difficulty.target.value === "easy") {
                Question.numQuestions = 5
                Question.quizDifficulty = "easy"

            } else if (difficulty.target.value === "medium") {
                Question.numQuestions = 10
                Question.quizDifficulty = "medium"

            } else if (difficulty.target.value === "hard") {
                Question.quizDifficulty = "hard"
                Question.numQuestions = 15
            } else {
                Question.quizDifficulty = "random"
                Question.numQuestions = 10
            }
            Question.randQ(difficulty.target.value);
        }

    }
};