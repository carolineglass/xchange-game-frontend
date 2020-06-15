
document.addEventListener('DOMContentLoaded', function(e) {
    const countryImg = document.querySelector('.country')
    const itemImg = document.querySelector('.item')
    const counter = document.getElementById('counter')
    let countdown = setInterval(startTimer, 1000);

    const getConversions = () => {
    fetch('http://localhost:3000/conversions')
    .then(resp => resp.json())
    .then(data => renderCountryItem(data))}

    document.addEventListener('click', e => {
        if (e.target.className === "generate"){
            getConversions()
            counter.innerText = 10;
            countdown
        }//end of if for generate button

    })// end of event listener
    
   function renderCountryItem(data) {
        const randomNumber = Math.floor(Math.random() * 100)
        //randomNumber is 100 to match the array of 100 conversions
        const randomInfo = data[randomNumber]
        const createCountryImg = document.createElement("img")
        const createItemImg = document.createElement("img")

        createCountryImg.id = "generated-country-img"
        createCountryImg.src = randomInfo["country"]["flag"]
        countryImg.innerHTML = ""
        countryImg.append(createCountryImg)

        createItemImg.id = "generated-item-img"
        createItemImg.src = randomInfo["item"]["img"]
        itemImg.innerHTML = ""
        itemImg.append(createItemImg)
    };
    
    function startTimer() {
        let number = parseInt(counter.innerText)
        if (number > 0){
            number -- 
            counter.innerText = number
        }
    }
    



})//end of DOMContentLoaded