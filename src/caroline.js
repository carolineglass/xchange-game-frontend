
document.addEventListener('DOMContentLoaded', function(e) {

    const countryImg = document.querySelector('#country-flag')
    const countryName = document.querySelector('#country-name')
    const countryCurrency = document.querySelector('#country-currency')
    const itemImg = document.querySelector('#item-img')
    const itemPrice = document.querySelector('#item-price')
    const itemName = document.querySelector('#item-name')
    const counter = document.getElementById('counter')

    let countdown = setInterval(startTimer, 1000);

    const getConversions = () => {
    fetch('http://localhost:3000/conversions')
    .then(resp => resp.json())
    .then(data => renderCountryItem(data))}

    document.addEventListener('click', e => {
        if (e.target.id === "generate"){
            getConversions()
            counter.innerText = 10;
            countdown
        }//end of if for generate button

    })// end of event listener
    
   function renderCountryItem(data) {
        const randomNumber = Math.floor(Math.random() * 100)
        //randomNumber is 100 to match the array of 100 conversions
        const randomInfo = data[randomNumber]

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
    


})//end of DOMContentLoaded