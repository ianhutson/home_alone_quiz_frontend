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
                this.loadedScores.push(scores)
            })
    }

    static generateScoreboard() {
        // something is breaking here
        console.log(this.loadedScores)
        this.loadedScores.forEach(score => { console.log(score) })
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