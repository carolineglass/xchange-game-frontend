
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
    const scoreboardUrl = "http://localhost:3000/scoreboards"
    const leaderboard = document.querySelector('.leaderboard')
    const ol = document.createElement('ol')
    const greeting = document.querySelector('#game-title')
    const pTag = document.createElement('p')

    // let guessInput = document.querySelector('.guess-input')

    let score = document.querySelector('#score')

    let correctAnswer = 0

    let countdown = setInterval(startTimer, 1000);
    
    fetchScores()

    const getConversions = () => {
    fetch('http://localhost:3000/conversions')
    .then(resp => resp.json())
    .then(data => renderCountryItem(data))}

    document.addEventListener('click', e => {
        if (e.target.id === "generate"){
            getConversions()
            counter.innerText = 15;
            countdown
        }//end of if for generate button
        else if(e.target.id === 'restart'){
            score.innerText = 0
            xTag.innerText = ""
            pTag.innerHTML = ""
            const x = document.querySelector('.game-over')
            const y = document.querySelector('.username')
            x.style.display = 'none';
            y.style.display = 'flex';
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
        itemPrice.innerText = randomInfo["item"]["price"]
        itemName.innerText = randomInfo["item"]["name"]
    };
    
    function startTimer() {
        let number = parseInt(counter.innerText)
        if (number > 0){
            number -- 
            counter.innerText = number
        } // else if when number = 0 to throw an error to user time is up 
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
        let guess = parseFloat(e.target.guess.value)
        console.log(e.target.guess.value)
        calculateScore(guess)
        // guessInput = ''
        } // if for user-form

        else if(e.target.className === 'username'){
            e.preventDefault()
            const username = e.target.username.value
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

        if (x >= (y - y * .10) && x <= (y + y * .10)) { 
            parsedScore += 5
            score.innerText = parsedScore
            console.log('YOU GOT 5 POINTS!')
        }//end of if for 10%

        else if (x >= (y - y * .2) && x <= (y + y * .2)) {
            parsedScore += 3
            score.innerText = parsedScore
            console.log('YOU GOT 3 POINTS!')
        }//end of else if for 20%

        else if (x >= (y - y * .3) && x <= (y + y * .3)) {
            parsedScore += 1
            score.innerText = parsedScore
            console.log('YOU GOT 1 POINTS!')
        }//end of else if for 30%

        else {
           // GET AN X  
            console.log('SO UNCULTURED')
            xTag.innerText += 'X'
            xMarker.append(xTag)
            if(xTag.innerText === 'XXX'){
                console.log('end of game you uncultured person')
                const x = document.querySelector('.game-div')
                const y = document.querySelector('.game-over')
                x.style.display = 'none';
                y.style.display = 'flex';
                newScoreBoard()
                pTag.innerHTML = ''
            }
        }
    }

    // if the timer/counter number === 0 display "TIMES UP - the correct answer is ..."


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
        pTag.dataset.id = username.id
        pTag.innerHTML = ' '
        pTag.innerHTML = `Welcome to the game ${username.username}! Please read the rules before starting!`
        greeting.append(pTag)
    }

    function newScoreBoard(){
        const findUserId = document.querySelector("#game-title > p")
        const userId = findUserId.dataset.id
        fetch(`http://localhost:3000/scoreboards/${userId}`,{
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({score: score.innerText})
        })
        .then(resp => resp.json())
        .then(scoreObj => {
            renderScore(scoreObj)
        })

    }

    function fetchScores() {
        fetch(scoreboardUrl)
        .then(resp => resp.json())
        .then(score => {
            renderScores(score)
        })
    }

    function renderScores(score) {
        score.forEach(scoreObj => {
            renderScore(scoreObj)}
        )
    }

    function renderScore(scoreObj) {
        ol.children.innerHTML = ''
        const li = document.createElement("li")
        li.innerHTML = `
        ${scoreObj.username} <br>
        ${scoreObj.score}`

        ol.append(li)
        leaderboard.append(ol)
    }


})//end of DOMContentLoaded