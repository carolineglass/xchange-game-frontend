fetch('http://localhost:3000/countries')
.then(resp => resp.json())
.then(console.log)
