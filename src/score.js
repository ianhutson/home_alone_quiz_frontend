class Score {
    static renderedScores = []
    static sortedScores = []
    static loadedScores = []

    constructor(score) {
        this.value = score.value;
        this.name = score.name;
        this.difficulty = "default"
    }

    static fetchScores() {
        fetch(scoresURL)
            .then(res => res.json())
            .then(scores => {
                for (let score of scores) {
                    this.loadedScores.push(new Score(score))
                }
                Score.sortedScores.push(Score.loadedScores.sort((a, b) => (a.value > b.value) ? 1 : -1))

            })
    }

    static createscore(e){
        e.preventDefault()
        const scoreInput = e.target.children[0].value
        const scoreList = e.target.nextElementSibling
        Score.submitscore(scoreInput, scoreList)
        e.target.reset()
    }
    
    
    static renderScore(){
        scoreContainer.innerHTML = `Scoreboard: <br>${Score.renderedScores.slice(0, 5).join("")}`
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
            let newScore = new Score(data)
            this.loadedScores.push(newScore)
            
        })
        this.fetchScores();
        generateScoreboard()
    }

}