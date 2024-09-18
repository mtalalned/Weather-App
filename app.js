const form = document.querySelector ('#form-div')
const cityNameInput = document.querySelector ('#input-city-name')
const weatherDiv = document.querySelector('#weather-main-div')
let cityNameArray = []
let weatherDataArray = []
let Days = []
const blurDiv = document.querySelector ('#blur-background')
const toastDiv = document.querySelector ('#toast-div')


const loader = `
<div role="status" class="basis-[90%] min-[550px]:basis-[75%] sm:basis-[65%] md:basis-[46%] lg:basis-[30%] flex flex-col p-3 gap-2 justify-center items-center">
    <svg aria-hidden="true" class="mt-5 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="283" stroke-dashoffset="70" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
    <span class="font-bold text-lg text-white">Loading......</span>
</div>
`

const toast = `
    <div id="toast-warning" class="relative w-[80%] max-w-[500px] flex max-[450px]:flex-col items-center p-4 text-gray-500 bg-white rounded-lg shadow-[0px_0px_20px_1px_red] outline outline-2 outline-red-400 dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 max-[450px]:w-[50px] max-[450px]:h-[50px] text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
            <svg class="w-10 h-10 max-[450px]:w-[40px] max-[450px]:h-[40px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
            </svg>
            <span class="sr-only">Warning icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">
            <h1 class="text-black text-lg font-bold mb-1">ERROR:</h1>
            <p class="mb-1">Check for following errors:</p>
            <ol>
                <li>1. Enter the correct city name</li>
                <li>2. Ensure blank spaces between words are placed where ever present in official city name</li>
                <li>3. Weather data for the city may not be available</li>
                <li>4. Check your Internet Connection</li>
            </ol>
        </div>
        <button id="close-button" type="button" class="absolute top-2 right-2 ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
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
        
        if (toastDiv.classList.contains('hidden')){
            toastDiv.classList.remove ('hidden')
            toastDiv.innerHTML = toast
            blurDiv.classList.remove('hidden')
        }
        
        const toastCloseButton = document.querySelector ('#close-button') 
        
        toastCloseButton.addEventListener ('click' , event => {
            if (event.target.tagName === 'SPAN' || event.target.tagName === 'svg'){
                event.target.parentNode.parentNode.remove()
                toastDiv.classList.add ('hidden')
                blurDiv.classList.add('hidden')
            } else if (event.target.tagName === 'path') {
                event.target.parentNode.parentNode.parentNode.remove()
                toastDiv.classList.add ('hidden')
                blurDiv.classList.add('hidden')
            } else {
                event.target.parentNode.remove()
                toastDiv.classList.add ('hidden')
                blurDiv.classList.add('hidden')
            }
        })
        
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



