
document.addEventListener('DOMContentLoaded', function(e) {

    const countryImg = document.querySelector('#country-flag')
    const countryName = document.querySelector('#country-name')
    const countryCurrency = document.querySelector('#country-currency')
    const itemImg = document.querySelector('#item-img')
    const itemPrice = document.querySelector('#item-price')
    const itemName = document.querySelector('#item-name')
    const counter = document.getElementById('counter')
    const xMarker = document.querySelector('#x-marker')
    const xTag = document.createElement('p')
    const scoreboardUrl = "http://localhost:3000/scoreboards/"
    const leaderboard = document.querySelector('.leaderboard')
    const ol = document.createElement('ol')
    let greeting = document.querySelector('#game-title')
    const generateButton = document.querySelector('#generate')
    const guessButton = document.querySelector('#guess-button')
    const rulesBox = document.querySelector(".rules")

    // let guessInput = document.querySelector('.guess-input')

    let score = document.querySelector('#score')

    let correctAnswer = 0

    let currentScore = '0'

    let countdown = setInterval(startTimer, 1000);
    
    fetchScores()

    const getConversions = () => {
    fetch('http://localhost:3000/conversions')
    .then(resp => resp.json())
    .then(data => renderCountryItem(data))}

    document.addEventListener('click', e => {
        if (e.target.id === "generate"){
            e.target.disabled = true
            guessButton.disabled = false
            getConversions()
            counter.innerText = 15;
            countdown
        }//end of if for generate button
        else if(e.target.id === 'restart'){
            score.innerText = 0
            xTag.innerText = ""
            rulesBox.innerHTML = ""
            const x = document.querySelector('.game-over')
            const y = document.querySelector('.username')
            x.style.display = 'none';
            y.style.display = 'flex';
            generateButton.disabled = false
            rulesBox.innerHTML = `
            <h1 id='game-title'>Guess that Price</h1>
            <h3>Rules:</h3>
            `
        }
    })// end of event listener
    
   function renderCountryItem(data) {
        const randomNumber = Math.floor(Math.random() * 100)
        //randomNumber is 100 to match the array of 100 conversions
        const randomInfo = data[randomNumber]

        renderAnswer(randomInfo)

        //renders the country img and info on the left div
        countryImg.src = randomInfo["country"]["flag"]
        countryName.innerText = randomInfo["country"]["name"]
        countryCurrency.innerText = randomInfo["country"]["currency"]

        //renders the item and info on the right div
        itemImg.src = randomInfo["item"]["img"]
        itemPrice.innerText = `$${randomInfo["item"]["price"]}`
        itemName.innerText = randomInfo["item"]["name"]
    };
    
    function startTimer() {
        let number = parseInt(counter.innerText)
        if (number > 0){
            number -- 
            counter.innerText = number
        } else if (number === 0) {
            counter.innerText = "TIMES UP!"
            guessButton.disabled = true
            generateButton.disabled = false
            endGame()
            console.log("time is up")
        } 
    }
    
    function renderAnswer(conversion) {
        const rate = conversion["country"]["rate"]
        const currency = conversion["country"]["currency"]
        const price = conversion["item"]["price"]
    
        correctAnswer = price * rate
        console.log(correctAnswer)
    }

    document.addEventListener('submit', e => {
        if(e.target.className === 'user-form'){
            e.preventDefault()
            guessButton.disabled = true
            generateButton.disabled = false
            let guess = parseFloat(e.target.guess.value)
            console.log(e.target.guess.value)
            calculateScore(guess)

            if (xTag.innerText.length === 3) {
                counter.innerText = "GAME OVER!"
            } else if (xTag.innerText.length < 3){
                counter.innerText = "GENERATE AGAIN!"
            }

            //changes the innerHTML of the rules div to display correct answer 
            //and points

            rulesBox.innerHTML = 
            `<h2 id="correct-message">The correct conversion is ${correctAnswer.toFixed(2)}. <br>
            You get ${currentScore}</h2>
            `
            
        // guessInput = ''
        } // if for user-form

        else if(e.target.className === 'username'){
            e.preventDefault()
            guessButton.disabled = true
            const username = e.target.username.value
            greeting = document.querySelector('#game-title')
            startGame()

            fetch("http://localhost:3000/scoreboards", {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    score: 0})
            })
            .then(resp => resp.json())
            .then(username => {renderGreeting(username)})

        }// else if for username
        
    })//end of submit guess
    
    function calculateScore(guess) {
        let x = guess //the users input 
        let y = correctAnswer // in the global scope 
        let parsedScore = parseInt(score.innerText)
        const message = document.getElementById("correct-message")
        if (x >= (y - y * .10) && x <= (y + y * .10)) { 
            parsedScore += 5
            score.innerText = parsedScore
            currentScore = '5 points'
            console.log('YOU GOT 5 POINTS!')
        }//end of if for 10%

        else if (x >= (y - y * .2) && x <= (y + y * .2)) {
            parsedScore += 3
            score.innerText = parsedScore
            currentScore = '3 points'
            console.log('YOU GOT 3 POINTS!')
        }//end of else if for 20%

        else if (x >= (y - y * .3) && x <= (y + y * .3)) {
            parsedScore += 1
            score.innerText = parsedScore
            currentScore = '1 point'
            console.log('YOU GOT 1 POINT!')
        }//end of else if for 30%

        else {
            currentScore = '0 points'
            endGame()
        }
    }

    function endGame() {
        // GET AN X  
        console.log('SO UNCULTURED')
        xTag.innerText += 'X'
        xMarker.append(xTag)
        if(xTag.innerText.length === 3){
            console.log('end of game you uncultured person')
            const x = document.querySelector('.game-div')
            const y = document.querySelector('.game-over')
            x.style.display = 'none';
            y.style.display = 'flex';
            newScoreBoard()
            counter.innerText = "GAME OVER!"
        }
    }

    function startGame() {
        const x = document.querySelector('.game-div')
        const y = document.querySelector('.username')
        if (x.style.display === "none") {
          x.style.display = 'flex';
          y.style.display = 'none';
        } else {
          x.style.display = "none";
          y.style.display = 'flex';
        }
      }

    function renderGreeting(username) {
        leaderboard.dataset.id = username.id
        const pTag = document.createElement('p')
        pTag.innerHTML = ' '
        pTag.innerHTML = `Welcome to the game ${username.username}!`
        greeting.append(pTag)
    }

    function newScoreBoard(){
        const userId = leaderboard.dataset.id
        fetch(`http://localhost:3000/scoreboards/${userId}`,{
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({score: score.innerText})
        })
        // .then(resp => resp.json())
        .then(fetchScores)

    }

    function fetchScores() {
        fetch(scoreboardUrl)
        .then(resp => resp.json())
        .then(score => {
            ol.innerHTML = ""
            renderScores(score)
        })
    }

    function renderScores(score) {
        score.sort(function (a, b) {
            return b.score - a.score;
          });
    //this sorts by score highest to lowest
        score.slice(0,10).forEach(scoreObj => {
    //this only renders the first 5 of the array 
            renderScore(scoreObj)}
        )
    }

    function renderScore(scoreObj) {
        ol.children.innerHTML = ''
        const li = document.createElement("li")
        li.innerHTML = `
        ${scoreObj.username} 
        <span id="high-score">${scoreObj.score}</span>`

        ol.append(li)
        leaderboard.append(ol)
    }


})//end of DOMContentLoaded