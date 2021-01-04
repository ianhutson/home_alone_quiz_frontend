class Question {
    static numQuestions = 5
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

    static selectDifficulty(difficulty){
        if (difficulty.target.value === "easy"){
            Question.quizDifficulty = "easy"
            Question.fetchQuestions("easy")
    }
        else if (difficulty.target.value === "medium"){
            Question.numQuestions = 10
            Question.quizDifficulty = "medium"
            Question.fetchQuestions("medium")
        }
        else {
            Question.quizDifficulty = "hard"
            Question.numQuestions = 15
            Question.fetchQuestions("hard")
        }
    }
    static fetchQuestions(difficulty) {
        function randQ() {
            Question.quizArr.push(Question.allQuestions.filter(q => q.difficulty === difficulty).sort(function() {
               return 0.5 - Math.random();
             }));
       }
        difficultyText.style.display = "none"
        easy.style.display = "none"
        medium.style.display = "none"
        hard.style.display = "none"
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
                randQ();
                renderQuiz();
            })
    }

   


};