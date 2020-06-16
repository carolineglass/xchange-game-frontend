
document.addEventListener('DOMContentLoaded', function(e) {

    const countryImg = document.querySelector('#country-flag')
    const countryName = document.querySelector('#country-name')
    const countryCurrency = document.querySelector('#country-currency')
    const itemImg = document.querySelector('#item-img')
    const itemPrice = document.querySelector('#item-price')
    const itemName = document.querySelector('#item-name')
    const counter = document.getElementById('counter')
    const form = document.querySelector('.user-form')

    let score = document.querySelector('#score')

    let correctAnswer = 0

    let countdown = setInterval(startTimer, 1000);

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

    form.addEventListener('submit', e => {
        e.preventDefault()
        const guess = parseFloat(e.target.guess.value)
        console.log(guess)
        calculateScore(guess)
        
        
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
        }
    }

    // if the timer/counter number === 0 display "TIMES UP - the correct answer is ..."


})//end of DOMContentLoaded