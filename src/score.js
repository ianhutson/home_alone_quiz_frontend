class Score {
    static renderedScores = []
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
            })
    }

    static generateScoreboard() {
        console.log(this.loadedScores)
        for (let score of this.loadedScores) {
            console.log(score)
            this.renderedScores.push(
                score.attributes.name + " - " + score.attributes.value + "%")

        }
    }

    // static createResult() {
    //     const allResults = []
    //     event.preventDefault()
    //     const configObj = {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({
    //             content: postInput.value
    //         })
    //     }

    //     fetch(resultsURL, configObj)
    //         .then(res => res.json())
    //         .then(data => {
    //             let newResult = new Result(data.data)
    //             allResults.push(newResult)
    //         })

    // }

}