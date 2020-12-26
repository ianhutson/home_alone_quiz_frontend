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

    static createscore(e){
        e.preventDefault()
        const scoreInput = e.target.children[0].value
        const scoreList = e.target.nextElementSibling
        Score.submitscore(scoreInput, scoreList)
        e.target.reset()
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
            Score.loadedScores.push(newScore)
            
        })
        document.getElementById('score-input').value = ""
        Score.fetchScores()
        scoreContainer.innerHTML = `Top 5: <br>${Score.renderedScores.sort((a, b) => parseInt(b.replace(/\D/g,'')) - parseInt(a.replace(/\D/g,''))).slice(0, 5).join("")}`
    }
}