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