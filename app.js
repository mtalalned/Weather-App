const form = document.querySelector ('#form-div')
const cityNameInput = document.querySelector ('#input-city-name')
const weatherDiv = document.querySelector('#weather-main-div')
let cityNameArray = []
let weatherDataArray = []
let Days = []

function Dayimport (res) {

    const currentDate = new Date ()

    const specificTimeZoneDate = new Intl.DateTimeFormat ('en-US', {
        timeZone: res.location.tz_id,
        dateStyle: 'full',
    }).format(currentDate).split(',')

    Days.push (specificTimeZoneDate[0])
}

function renderWeatherData () {
    
    weatherDiv.innerHTML = ''

    weatherDataArray.map ((items , index)=>{
        weatherDiv.innerHTML += `
        <div class="basis-[90%] min-[550px]:basis-[75%] sm:basis-[65%] md:basis-[46%] lg:basis-[30%] bg-white rounded-lg flex flex-col p-3 gap-3 relative hover:shadow-[2px_2px_10px_2px_#ffffff] hover:outline hover:outline-1 hover:outline-cyan-400">
            <div class="flex flex-col">
                <p class="text-4xl">${items.location.name}, ${items.location.region}</p>
                <p class="text-sm">${Days[index]}</p>
                <p class="text-sm">${items.current.last_updated}</p>
            </div>
            <div class="flex justify-around items-center">
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
                    <h2 class="text-sm font-bold">Wind Speed:</h2>
                    <p class="text-sm"><i class="text-cyan-400 fa-solid fa-wind"></i> ${items.current.wind_kph} km/hr</p>
                </div>
                <div>
                    <h2 class="text-sm font-bold">Humidity:</h2>
                    <p class="text-sm"><img src="./Assets/drop.png" alt="logo" width="15" height="15" class="inline">
                            ${items.current.humidity}%</p>
                </div>
                <div>
                    <h2 class="text-sm font-bold">Precipitation:</h2>
                    <p class="text-sm"><i class="text-cyan-400 fa-solid fa-cloud-rain"></i> ${items.current.precip_mm}mm</p>
                </div>
            </div>
            <div>
                <button class="absolute right-[2.5%] top-[2.5%] px-1 m-0 hover:text-white hover:bg-cyan-400 hover:rounded-full active:bg-cyan-900"><i class="remove-btn-${index} fa-solid fa-xmark text-2xl"></i></button>
            </div>
        </div>
        `
    })
}

form.addEventListener ('submit' , (event) => {
    
    event.preventDefault()

    const trimmedCityName = cityNameInput.value.toLowerCase().replaceAll(' ', '') 
    
    const apiDATA = fetch (`https://api.weatherapi.com/v1/current.json?key=eb35ff98258548da8fe165621241109&q=${cityNameInput.value}&aqi=no`)
    .then(res => res.json())
    .then (res => {
        if (weatherDataArray.length === 0) {
            weatherDataArray.push (res)
            cityNameArray.push(trimmedCityName)
            Dayimport(res)
        } else if (!cityNameArray.includes(trimmedCityName)){
            weatherDataArray.push (res)
            cityNameArray.push (trimmedCityName)
            Dayimport(res)
        }
        
        renderWeatherData()

    }).catch(err => {
        alert('Check for following errors: \n 1. Enter the name correctly \n 2. Ensure spaces between words are placed where ever present in city name \n 3. Weather data for the city may not be available')
    })
    
    cityNameInput.value = ''
    
})

weatherDiv.addEventListener ('click' , event => {
    for (let i = 0; i < weatherDataArray.length; i++) {
        if (event.target.classList.contains (`remove-btn-${i}`)) {
            weatherDataArray.splice(i , 1)
            cityNameArray.splice (i , 1)
            Days.splice(i , 1)
            renderWeatherData ()
            break;
        }
    }
})




