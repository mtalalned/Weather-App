const form = document.querySelector ('#form-div')
const cityNameInput = document.querySelector ('#input-city-name')
const weatherDiv = document.querySelector('#weather-main-div')
let cityNameArray = []
let weatherDataArray = []
let Days = []
let loaderCheck = true

const loader = `
<div role="status" class="basis-[90%] min-[550px]:basis-[75%] sm:basis-[65%] md:basis-[46%] lg:basis-[30%] flex flex-col p-3 gap-2 justify-center items-center">
    <svg aria-hidden="true" class="mt-5 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="283" stroke-dashoffset="70" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
    <span class="font-bold text-lg text-white">Loading......</span>
</div>
`


function Dayimport (res) {
    
    const currentDate = new Date ()

    const specificTimeZoneDate = new Intl.DateTimeFormat ('en-US', {
        timeZone: res.location.tz_id,
        dateStyle: 'full',
    }).format(currentDate).split(',')

    Days.push (specificTimeZoneDate[0])
}

function renderWeatherDataWithLoader () {
    
    weatherDiv.innerHTML = ''
    
    weatherDataArray.push(loader)

    weatherDataArray.map ((items , index) => {
        if (index < weatherDataArray.length - 1) {
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
                <button class="absolute right-[2.5%] top-[2.5%] px-1 m-0 hover:text-white hover:bg-cyan-400 hover:rounded-full active:bg-cyan-900 flex justify-center items-center"><i class="remove-btn-${index} fa-solid fa-xmark text-2xl"></i></button>
            </div>
        </div>
        `
        } else if(index === weatherDataArray.length - 1){
            weatherDiv.innerHTML += weatherDataArray[weatherDataArray.length-1]
        }
    })
}

function renderWeatherDataWithLoaderWithoutPush () {
    
    weatherDiv.innerHTML = ''

    weatherDataArray.map ((items , index) => {
        if (index < weatherDataArray.length - 1) {
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
                <button class="absolute right-[2.5%] top-[2.5%] px-1 m-0 hover:text-white hover:bg-cyan-400 hover:rounded-full active:bg-cyan-900 flex justify-center items-center"><i class="remove-btn-${index} fa-solid fa-xmark text-2xl"></i></button>
            </div>
        </div>
        `
        } else if(index === weatherDataArray.length - 1){
            weatherDiv.innerHTML += weatherDataArray[weatherDataArray.length-1]
        }
    })
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
                <button class="absolute right-[2.5%] top-[2.5%] px-1 m-0 hover:text-white hover:bg-cyan-400 hover:rounded-full active:bg-cyan-900 flex justify-center items-center"><i class="remove-btn-${index} fa-solid fa-xmark text-2xl"></i></button>
            </div>
        </div>
        `
    })
}

form.addEventListener ('submit' , (event) => {
    
    event.preventDefault()

    if (weatherDataArray.length === 0) {
        weatherDiv.innerHTML = loader
    } else if (weatherDataArray.length >= 1) {
        renderWeatherDataWithLoader()
    } 
    
    const trimmedCityName = cityNameInput.value.toLowerCase().replaceAll(' ', '') 
    
    const apiDATA = fetch (`https://api.weatherapi.com/v1/current.json?key=eb35ff98258548da8fe165621241109&q=${cityNameInput.value}&aqi=no`)
    .then(res => res.json())
    .then (res => {
        if (weatherDataArray.length === 0) {
            weatherDataArray.push (res)
            cityNameArray.push(trimmedCityName)
            Dayimport(res)
        } else if (!cityNameArray.includes(trimmedCityName)){
            weatherDataArray.pop()
            weatherDataArray.push (res)
            cityNameArray.push (trimmedCityName)
            Dayimport(res)
        }
        
        renderWeatherData()

    }).catch(err => {
        alert('Check for following errors: \n 1. Enter the name correctly \n 2. Ensure spaces between words are placed where ever present in city name \n 3. Weather data for the city may not be available')
        weatherDataArray.pop()
        renderWeatherData()
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




