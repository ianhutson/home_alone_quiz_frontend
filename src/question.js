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
                renderQuiz()
            })
    }

    static randQ() {
        for (var i = 0; i < 2; i++) {
            var rand = this.allQuestions[Math.floor(Math.random() * this.allQuestions.length)];
            this.quizArr.push(rand);
        }
        return "#" + this.quizArr.join("")
    }


};