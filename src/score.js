class Score {
    static renderedScores = []
    static loadedScores = []

    constructor(score) {
        this.value = score.value;
        this.name = score.name;
        this.difficulty = score.difficulty;
    }

    static generateScoreboard() {
        const renderedScores = []
        Score.loadedScores.filter(score => score.difficulty === Question.quizDifficulty).forEach((score) => {
            renderedScores.push(
                score.name + " - " + score.value + "%" + " - " + score.difficulty + `<br>`
            )
        })
        scoreContainer.innerHTML = `<div class="scoreboard-container"> ${Question.quizDifficulty.charAt(0).toUpperCase() + Question.quizDifficulty.slice(1)} Quiz Scoreboard: <br>${renderedScores.sort((a, b) => parseInt(b.replace(/\D/g,'')) - parseInt(a.replace(/\D/g,''))).slice(0, 5).join("")}</div>`
    }

    static fetchScores() {
        this.loadedScores = []
        fetch(scoresURL)
            .then(res => res.json())
            .then(scores => {
                for (let score of scores) {
                    this.loadedScores.push(new Score(score))
                }
            })
    }

    static submitScore() {
        const scoreInput = document.getElementById('score-input').value
        const configObj = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: scoreInput,
                value: resultsContainer.innerText.replace(/\D/g, '', ),
                difficulty: Question.quizDifficulty,

            })
        }
        fetch(scoresURL, configObj)
            .then(res => res.json())
            .then(data => {
                let newScore = new Score(data.data.attributes)
                Score.loadedScores.push(newScore)
                Score.generateScoreboard()
            })
        document.getElementById('score-input').value = ""
        scoreForm.innerText = ""
    }
}