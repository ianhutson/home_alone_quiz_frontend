class Answer {

    constructor(answer) {
        this.text = answer.text;
        this.correct = answer.correct;
        this.question_id = answer.question_id
    }

    static renderAnswers() {

        function shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        function getRandomUniqueFromArrayExceptHead(array, amount) {
            const [_head, ...arrayCopy] = array
            return (new Array(amount)).fill(0).map(() => {
                const index = Math.floor(Math.random() * arrayCopy.length)
                return arrayCopy.splice(index, 1)[0]
            })
        }
        const output = [];
        Question.quizArr.forEach(
            (currentQuestion, questionNumber) => {

                Array.prototype.random = function() {
                    return this[Math.floor((Math.random() * this.length))];
                }
                const loadedAnswers = []
                currentQuestion.answers.forEach((currentAnswer) => {
                    loadedAnswers.push(currentAnswer)
                })
                const cleanedAnswers = []
                cleanedAnswers.push(getRandomUniqueFromArrayExceptHead(loadedAnswers, 3))
                cleanedAnswers[0].push(loadedAnswers[0])
                const shuffledAnswers = shuffle(cleanedAnswers[0])
                const renderedAnswers = [];
                shuffledAnswers.forEach((answer) => {
                    renderedAnswers.push(
                        `<div class="inner-answer"><label>
                    <input type="radio" name="question${questionNumber}" value="${answer.correct}">
                    ${answer.text}
                  </label></div>`
                    )
                })
                output.push(
                    `<div class="slide">
                        <img class="pic" src="${currentQuestion.pic}">
                      <div class="question"> ${currentQuestion.text} </div>
                      <div class="answers"> ${renderedAnswers.join("")} </div>
                    </div>`
                );
            });
        quizContainer.innerHTML = output.join('');
    }
}