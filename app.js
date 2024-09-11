const form = document.querySelector ('#form-div')
const cityName = document.querySelector ('#input-city-name')
const weatherDiv = document.querySelector('#weather-main-div')
const cityNameArray = []
const weatherDataArray = []

form.addEventListener ('submit' , (event) => {
    
    event.preventDefault()
    
    // if (!cityNameArray.includes(cityName.value.trim().toLowerCase()) && cityName.value.trim() !== ''){
    //     cityNameArray.push(cityName.value.toLowerCase())
    //     // console.log (weatherDataArray)
    // }

    if (cityName.value.trim() === '') {
    
        alert ('Enter city name')
    
    } else {
        
        const weatherApi = fetch(`https://api.weatherapi.com/v1/current.json?key=eb35ff98258548da8fe165621241109&q=${cityName.value}&aqi=no`)
        .then (res => {
            return res.json()
        }).then(res =>{
            console.log (res)
            for (let i = 0; i < weatherDataArray.length; i++){
                if (weatherDataArray =[]){
                    weatherDataArray.push(res)
                } else {
                    let values = Object.values (weatherDataArray[i])
                    if ()
                }
                    
                    console.log('chal raha hai')
                    weatherDataArray.push (res)
                }
            }
            
            console.log (weatherDataArray)
        }).catch (error => {
        
        })
    }
    
    cityName.value = ''

    
})








// weather API
// const weatherApi = fetch('https://api.weatherapi.com/v1/current.json?key=eb35ff98258548da8fe165621241109&q=${karachi}&aqi=no')
// .then (res => {
//     return res.json()
// }).then(res =>{
//     console.log (res)
//     console.log (weatherApi)
// }).catch (error=>{
//     console.log (error)
// })