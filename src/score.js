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
    
    renderScore(scoreList){
        const li = document.createElement('li')
        li.innerText = this.value
        scoreList.appendChild(li)
    
    }
    
    static submitScore(score, scoreList){
        fetch(scoreURL, {
            method: "POST",
            headers: {
                "Content-type": "application/json", 
                "Accept": "application/json"
            }, 
            body: JSON.stringify({
                value: score.value, 
                name: score.name
            })
        }).then(res => res.json())
        .then(score => {
            let newScore = new Score(score)
            newScore.renderScore(scoreList)
        })
    }

}