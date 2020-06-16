
document.addEventListener('DOMContentLoaded', function(e){

    const conversionsUrl = ""
    const scoreboardUrl = "http://localhost:3000/scoreboards"
    const leaderboard = document.querySelector('.leaderboard')

    const fetchScores = () => {
        fetch(scoreboardUrl)
        .then(resp => resp.json())
        .then(score => {
            renderScores(score)
        })
    }

    const renderScores = score => {
        score.forEach(scoreObj => {
            renderScore(scoreObj)}
        )}

    const renderScore = scoreObj => {
        const ol = document.createElement('ol')
        ol.innerHTML = `
        <h3>${scoreObj.username}</h3>
        <h3>${scoreObj.score}</h3>`

        leaderboard.append(ol)
    }

    fetchScores()



})