const form = document.querySelector ('#form-div')
const cityNameInput = document.querySelector ('#input-city-name')
const weatherDiv = document.querySelector('#weather-main-div')
let cityNameArray = []
let weatherDataArray = []
let Days = []


// const DateGet = new Date ()
// console.log (DateGet.getDate())
// console.log (DateGet.getMonth()+1)
// console.log (DateGet.getFullYear())


form.addEventListener ('submit' , (event) => {
    
    event.preventDefault()

    const trimmedCityName = cityNameInput.value.toLowerCase().replaceAll(' ', '') 
    
    const apiDATA = fetch (`https://api.weatherapi.com/v1/current.json?key=eb35ff98258548da8fe165621241109&q=${trimmedCityName}&aqi=no`)
    .then(res => res.json())
    .then (res => {
        console.log (res)
        // console.log (!cityNameArray.includes(trimmedCityName))
        if (weatherDataArray.length === 0) {
            weatherDataArray.push (res)
            cityNameArray.push(trimmedCityName)
            const todayDate = new Date ()
            
            
            // console.log ('if chal raha hai')
        } else if (!cityNameArray.includes(trimmedCityName)){
            // console.log ('else if chal raha hai')
            weatherDataArray.push (res)
            cityNameArray.push (trimmedCityName)
        }
        console.log('pehla wala' , weatherDataArray)
        
        weatherDataArray.map ((items , index)=>{
            weatherDiv.innerHTML += `
            <div class="basis-[90%] min-[550px]:basis-[75%] sm:basis-[65%] md:basis-[46%] lg:basis-[30%] bg-white rounded-lg flex flex-col p-3 gap-3 relative">
                <div class="flex flex-col">
                    <p class="text-4xl">${items.location.name}, ${items.location.region}</p>
                    <p class="text-sm">Tuesday</p>
                    <p class="text-sm">${items.current.last_updated}</p>
                </div>
                <div class="flex justify-around">
                    <div>
                        <h1 class="text-4xl">${items.current.temp_c}&deg;C</h1>
                        <p class="text-sm">${items.current.condition.text} ${items.current.cloud}%</p>
                    </div>

                    <div>
                        <img src="${items.current.condition.icon}" alt="logo" width="100" height="100">
                    </div>
                </div>
                <div class="flex justify-around">
                    <div class="flex flex-col ">
                        <h2 class="text-sm">Wind Speed:</h2>
                        <p class="text-sm">${items.current.wind_kph} km/hr</p>
                    </div>
                    <div>
                        <h2 class="text-sm">Humidity:</h2>
                        <p class="text-sm">${items.current.humidity}%</p>
                    </div>
                    <div>
                        <h2 class="text-sm">Precipitation:</h2>
                        <p class="text-sm">${items.current.precip_mm}mm</p>
                    </div>
                </div>
                <div>
                    <button class="absolute right-[2.5%] top-[2.5%]"><i class="fa-solid fa-xmark text-2xl"></i></button>
                </div>
            </div>
            `
        })
        
    }).catch(err => {
        alert(err.error.message)
    })

    cityNameInput.value = ''

    // console.log(weatherDataArray.length)
    





})

// console.log('dusra wala' , weatherDataArray)


// var abc = []
// console.log (abc)







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