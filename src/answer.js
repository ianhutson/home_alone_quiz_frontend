class Answer {

    static allAnswers = []

    constructor(answer) {
        this.text = answer.text;
        this.correct = answer.correct;
        this.question_id = answer.question_id
    }

    static fetchAnswers() {
        fetch(answersURL)
            .then(res => res.json())
            .then(answers => {
                for (let answer of answers) {
                    let newAnswer = new Answer(answer.data)
                }
                this.renderAnswers(answers)
            })
    }

    renderAnswer(answersList) {
        const li = document.createElement('li')
        li.dataset.id = this.question_id
        li.innerText = this.text


        commentList.appendChild(li)
    }
}