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
        Score.fetchScores();
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
         this.quizArr.push(this.allQuestions.sort(function() {
            return 0.5 - Math.random();
          }));
    }


};