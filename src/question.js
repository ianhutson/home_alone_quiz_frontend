class Question {

    static allQuestions = [];
    static quizArr = []

    constructor(question) {
        this.id = question.id
        this.text = question.attributes.text;
        this.pic = question.attributes.pic;
        this.difficulty = question.attributes.difficulty;
        this.answers = []
        Question.allQuestions.push(this)
    }

    static fetchQuestions() {
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
                this.renderQuestions()
            })
    }

    static randQ() {
        for (var i = 0; i < 5; i++) {
            var rand = this.allQuestions[Math.floor(Math.random() * this.allQuestions.length)];
            this.quizArr.push(rand);
        }
        return "#" + this.quizArr.join("")
    }

    static renderQuestions() {
        this.randQ()

        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        function getRandomFromArrayPositionGreaterThanZero(array, amount) {
            return (new Array(amount)).fill(0).map(() => {
                if (array.length > 1) {
                    return array[Math.ceil(Math.random() * (array.length - 1))]
                }
            })
        }
        const output = [];
        this.quizArr.forEach(
            (currentQuestion) => {
                const renderedAnswers = [];
                Array.prototype.random = function() {
                    return this[Math.floor((Math.random() * this.length))];
                }

                currentQuestion.answers.forEach((currentAnswer) => {
                    renderedAnswers.push(
                        `<div class="inner-answer"><label>
                        <input type="radio" name="answer" value="${currentAnswer.correct}">
                        ${currentAnswer.text}
                      </label></div>`
                    )
                })
                const cleanedAnswers = []
                cleanedAnswers.push(getRandomFromArrayPositionGreaterThanZero(renderedAnswers, 3))
                cleanedAnswers[0].push(renderedAnswers[0])
                console.log(cleanedAnswers)
                const shuffledAnswers = shuffle(cleanedAnswers[0])

                output.push(
                    `<div class="slide">
                            <img class="pic" src="${currentQuestion.pic}">
                          <div class="question"> ${currentQuestion.text} </div>
                          <div class="answers"> ${shuffledAnswers.join("")} </div>
                        </div>`
                );
            });
        quizContainer.innerHTML = output.join('');
        slideManager()
    }
};