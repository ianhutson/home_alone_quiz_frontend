class Answer {

    static allAnswers = []

    constructor(answer) {
        this.text = answer.text;
        this.correct = answer.correct;
        this.question_id = answer.question_id
    }

    // static renderAnswers() {
    //     // and for each available answer...
    //     Question.allQuestions.forEach(
    //         (currentQuestion, questionNumber) => {

    //             // variable to store the list of possible answers
    //             const answers = [];

    //             // and for each available answer...
    //             for (this.ans in currentQuestion.answers) {

    //                 // ...add an HTML radio button
    //                 answers.push(
    //                     `<label>
    //                 <input type="radio" name="question${questionNumber}" value="${this.ans.correct}">
    //                 ${this.ans.id} :
    //                 ${currentQuestion.answers[this.ans.text]}
    //               </label>`
    //                 );
    //             }
    //         }

    //     );
    // }
}