import { getNext5WeekDays } from "./helperFunctions";

function displayWeatherData(weatherData) {
    // initialize variables for better readability
    let currentTemp = weatherData.data.tempCurrent;
    let weatherDescription = weatherData.data.description;
    let weatherIcon = weatherData.data.icon;
    let highTemp = weatherData.data.tempHigh;
    let lowTemp = weatherData.data.tempLow;
    let feelsLikeTemp = weatherData.data.tempFeels;
    let cloudPercent = weatherData.data.cloudsPercent;
    let pressure = weatherData.data.pressure;
    let humidity = weatherData.data.humidity;
    let visibility = weatherData.data.visibility;
    let sunriseTime = weatherData.data.sunRise;
    let sunsetTime = weatherData.data.sunSet;
    let location = weatherData.data.location;
    let timeOfCalc = weatherData.data.dateTime;
    let windSpeed = weatherData.data.windSpeed;
    let windDirection = weatherData.data.windDirection;

    // if rainData exist show containers and populate data
    if (weatherData.data.rain1h !== '0mm') {
        let rain1h = weatherData.data.rain1h;
        const rain1HText = document.querySelector('#rain1HText');
        rain1HText.textContent = rain1h;
        if (weatherData.data.rain3h !== '0mm') {
            let rain3h = weatherData.data.rain3h;
            const rain3HText = document.querySelector('#rain3HText');
            rain3HText.textContent = rain3h;
        }
    }
    // if snowData exist show containers and populate data
    if (weatherData.data.snow1h !== '0mm') {
        let snow1h = weatherData.data.snow1h;
        const snow1HText = document.querySelector('#snow1HText');
        snow1HText.textContent = snow1h;
        if (weatherData.data.snow3h !== '0mm') {
            let snow3h = weatherData.data.snow3h;
            const snow3HText = document.querySelector('#snow3HText');
            snow3HText.textContent = snow3h;
        }
    }

    const fieldSetContainer = document.querySelector('.fieldset');
    fieldSetContainer.style.background = `black url(${weatherData.weatherGif}) no-repeat center`;
    fieldSetContainer.style.backgroundSize = 'cover';


    // Populate weather data (this is unruly, figure out how to refactor)
    const tempCurrentText = document.querySelector('#tempCurrentText');
    tempCurrentText.textContent = currentTemp;
    const weatherDescriptionText = document.querySelector('#weatherDescriptionText');
    weatherDescriptionText.textContent = weatherDescription;
    const weatherIconText = document.querySelector('.weatherIcon');
    weatherIconText.style.background = `url(https://openweathermap.org/img/wn/${weatherIcon}@2x.png)`;
    weatherIconText.style.backgroundSize = 'cover';
    const tempHighText = document.querySelector('#tempHighText');
    tempHighText.textContent = highTemp;
    const tempLowText = document.querySelector('#tempLowText');
    tempLowText.textContent = lowTemp;
    const tempFeelsText = document.querySelector('#tempFeelsText');
    tempFeelsText.textContent = feelsLikeTemp;
    const windSpeedText = document.querySelector('#windSpeedText');
    windSpeedText.textContent = windSpeed;
    const windDirectionText = document.querySelector('#windDirectionText');
    windDirectionText.textContent = windDirection;
    const cloudsPercentText = document.querySelector('#cloudsPercentText');
    cloudsPercentText.textContent = cloudPercent;
    const pressureText = document.querySelector('#pressureText');
    pressureText.textContent = pressure;
    const humidityText = document.querySelector('#humidityText');
    humidityText.textContent = humidity;
    const visibilityText = document.querySelector('#visibilityText');
    visibilityText.textContent = visibility;
    const sunriseText = document.querySelector('#sunriseText');
    sunriseText.textContent = sunriseTime;
    const sunsetText = document.querySelector('#sunsetText');
    sunsetText.textContent = sunsetTime;
    const locationText = document.querySelector('#locationText');
    locationText.textContent = `${weatherData.cityName}, ${weatherData.stateName}`;
    const timeText = document.querySelector('#timeText');
    timeText.textContent = timeOfCalc;
}

// function displayForecastData(forecastData) {
//     const forecastDays = getNext5WeekDays();
//     // Get Ref to forecast container
//     const forecastContainer = document.querySelector('#forecastWeatherContainer');
//     forecastContainer.innerHTML = "";

//     // Create and append forecast days container
//     for (let i = 0; i < 5; i++) {
//         let tempDayContainer = document.createElement('div');
//         tempDayContainer.id = `day${i}Container`;
//         tempDayContainer.className = "forecastDayContainer gridForecast"

//         let tempDayLabel = document.createElement('h3');
//         tempDayLabel.classList.add('dayLabel');
//         tempDayLabel.textContent = forecastDays[i];

//         let tempIconContainer = document.createElement('div');
//         tempIconContainer.classList.add('iconContainer');

//         let tempIconSpan = document.createElement('span');
//         tempIconSpan.classList.add('forecastWeatherIcon');

//         tempIconContainer.appendChild(tempIconSpan);

//         let tempForcastHighTemp = document.createElement('p');
//         tempForcastHighTemp.classList.add('forecastTemp');
//         tempForcastHighTemp.innerHTML = "0°"; // `${forecastData.list[i].tempHigh}°`

//         let tempForcastLowTemp = document.createElement('p');
//         tempForcastLowTemp.classList.add('forecastTemp');
//         tempForcastLowTemp.innerHTML = "0°"; // `${forecastData.list[i].tempLow}°`

    
//         tempDayContainer.appendChild(tempDayLabel);
//         tempDayContainer.appendChild(tempIconContainer);
//         tempDayContainer.appendChild(tempForcastHighTemp);
//         tempDayContainer.appendChild(tempForcastLowTemp);

//         forecastContainer.appendChild(tempDayContainer);
//     }


// }

export {
    displayWeatherData,
    // displayForecastData,
}