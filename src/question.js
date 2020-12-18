class Question {

    static allQuestions = [];

    constructor(question) {
        console.log(this);
        this.id = question.id
        this.text = question.attributes.text;
        this.pic = question.attributes.pic;
        this.correct = question.attributes.correct;
        this.difficulty = question.attributes.difficulty;
        Question.allQuestions.push(this)
        console.log(allQuestions)

    }

    static renderQuestions() {
        for (let question of this.allQuestions) {
            question.renderQuestion()
        }
    }

    static fetchQuestions() {
        fetch(questionsURL)
            .then(res => res.json())
            .then(questions => {
                for (let question of questions) {
                    let newQuestion = new Question(question.data)
                }
                this.renderQuestions()
            })
    }

    renderQuestion() {
        console.log(question)
        const p = document.createElement('p')
        p.innerText = this.text
        const li = document.createElement('li')
        li.dataset.id = this.id
        const answersList = document.createElement('ul')
        this.answers(function(a) {
            let i = 0;
            do {
                i += 1;
            } while (i < 3);
            createAnswer(answer.text, answerList, this.id)
        });

        li.append(p)
        questionList.appendChild(li)
    }
}