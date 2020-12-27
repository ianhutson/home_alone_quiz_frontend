class Score {
    static renderedScores = []
    static loadedScores = []

    constructor(score) {
        this.value = score.value;
        this.name = score.name;
        this.difficulty = "default"
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
    
    static submitScore(){
        const scoreInput = document.getElementById('score-input').value
        const configObj = {
            method: "POST", 
            headers: {
                "Content-type": "application/json", 
                "Accept": "application/json"
            }, 
            body: JSON.stringify({ 
                name: scoreInput,
                value: resultsContainer.innerText.replace(/\D/g,'')
            })
        }
        fetch(scoresURL, configObj)
        .then(res => res.json())
        .then(data => {
            let newScore = new Score(data.data.attributes)
            Score.loadedScores.push(newScore)
            console.log(Score.loadedScores)
            generateScoreboard()
        })
        document.getElementById('score-input').value = ""
        scoreForm.innerText = ""
    }
}