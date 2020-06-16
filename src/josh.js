
document.addEventListener('DOMContentLoaded', function(e){
    
        fetch('http://localhost:3000/conversions')
        .then(resp => resp.json())
        .then(console.log)


    const conversionsUrl = ""
    const scoreboardUrl = "http://localhost:3000/scoreboards"
    const leaderboard = document.querySelector('.leaderboard')
    const ol = document.createElement('ol')


    const fetchScores = () => {
        fetch(scoreboardUrl)
        .then(resp => resp.json())
        .then(score => {
            renderScores(score)
        })
    }

    const renderScores = score => {
        console.log(score)
        score.forEach(scoreObj => {
            renderScore(scoreObj)}
        )}

    const renderScore = scoreObj => {
        const li = document.createElement("li")
        li.innerHTML = `
        ${scoreObj.username} <br>
        ${scoreObj.score}`

        ol.append(li)
        leaderboard.append(ol)
    }

    fetchScores()

})