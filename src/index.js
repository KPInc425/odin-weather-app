import './style.css';


let lat;
let long;
let apiKey = '95b3fba8515b07e36f4947f16bc32b95';
let cityName = 'Everett';
let stateCode = '';
let countryCode = '';

// get Ref's to input and submit button
const inputCityName = document.querySelector('#inputCity');
const btnLocalWeather = document.querySelector('#btnLocalWeather');



btnLocalWeather.addEventListener('click', async () => {   
    // when button clicked > grab value from input text box
    cityName = inputCityName.value;
    inputCityName.value = "";

    // check if value is empty
    if (cityName !== "") {
        // set user input location 
        await setCurrentLocation();

        // get weather data with set location data
        let weatherData = await getWeatherData();

        // clean up JSON and return only needed data
        let cleanedData = cleanData(weatherData);
        console.log(cleanedData);
        displayWeatherData(cleanedData);
        // console.log(weatherData);
    } else {
        error({
            code: 425,
            message: 'You have not entered a City Name.'
        });
    }
})


async function setCurrentLocation() {
    // let coords = location.coords;
    // console.log(coords);
    // get location from GeoLocationAPI
    let locationData = await getLocation();
    // console.log(locationData[0]); 

    // Set Global lat, long values
    lat = locationData[0].lat;
    long = locationData[0].lon;
    // console.log(lat + " " + long);

}

function error(error) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
}

async function getLocation() {
    try {
        // fetch coords from GeoAPI
        let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`, {mode: 'cors'});
        // format resolved promise to json
        let json = await response.json();
        return json;
    } catch (err) {
        error(err);
    }

}

async function getWeatherData() {
    try {
        // fetch weather data from OpenWeatherAPI
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`, {mode: 'cors'});
        // console.log(response);
        // format resolved promise to json
        let json = await response.json();
        // console.log(json);
        return json;
    } catch(error) {
        error(error);
    }

}

function cleanData(dataJSON) {
    // return cleaned data object from JSON
    return {
        tempCurrent: Math.round(convertToF(dataJSON.main.temp)) + 'F°',
        tempFeels: Math.round(convertToF(dataJSON.main.feels_like)) + 'F°',
        tempHigh: Math.round(convertToF(dataJSON.main.temp_max)) + 'F°',
        tempLow: Math.round(convertToF(dataJSON.main.temp_min)) + 'F°',
        humidity: dataJSON.main.humidity + '%',
        pressure: convertToInches(dataJSON.main.pressure).toFixed(2) + ' inches',
        cloudsPercent: dataJSON.clouds.all + '%', 
        description: dataJSON.weather[0].description,
        windSpeed: convertToMPH(dataJSON.wind.speed).toFixed(2) + 'mph',
        windDirection: convertToDirection(dataJSON.wind.deg),
        dateTime: new Date(dataJSON.dt * 1000).toTimeString().slice(0,8), // Change these to function
        sunRise: new Date(dataJSON.sys.sunrise * 1000).toTimeString().slice(0,8),
        sunSet: new Date(dataJSON.sys.sunset * 1000).toTimeString().slice(0,8),
        visibility: (dataJSON.visibility * 0.001) + 'km',
        rain1h: (dataJSON.rain !== undefined) ? dataJSON.rain['1h'] + 'mm' : '0mm',
        rain3h: (dataJSON.rain !== undefined) ? dataJSON.rain['3h'] + 'mm' : '0mm',
        snow1h: (dataJSON.snow !== undefined) ? dataJSON.snow['1h'] + 'mm' : '0mm',
        snow3h: (dataJSON.snow !== undefined) ? dataJSON.snow['3h'] + 'mm' : '0mm',
        location: dataJSON.name,

    }
}

function displayWeatherData(weatherData) {
    console.log(weatherData);
    // initialize variables for better readability
    let currentTemp = weatherData.tempCurrent;
    let weatherDescription = weatherData.description;
    let highTemp = weatherData.tempHigh;
    let lowTemp = weatherData.tempLow;
    let feelsLikeTemp = weatherData.tempFeels;
    let cloudPercent = weatherData.cloudsPercent;
    let pressure = weatherData.pressure;
    let humidity = weatherData.humidity;
    let visibility = weatherData.visibility;
    let sunriseTime = weatherData.sunRise;
    let sunsetTime = weatherData.sunSet;
    let location = weatherData.location;
    let timeOfCalc = weatherData.dateTime;
    let windSpeed = weatherData.windSpeed;
    let windDirection = weatherData.windDirection;

    // if rainData exist show containers and populate data
    if (weatherData.rain1h !== '0mm') {
        let rain1h = weatherData.rain1h;
        const rain1HText = document.querySelector('#rain1HText');
        rain1HText.textContent = rain1h;
        if (weatherData.rain3h !== '0mm') {
            let rain3h = weatherData.rain3h;
            const rain3HText = document.querySelector('#rain3HText');
            rain3HText.textContent = rain3h;
        }
    }
    // if snowData exist show containers and populate data
    if (weatherData.snow1h !== '0mm') {
        let snow1h = weatherData.snow1h;
        const snow1HText = document.querySelector('#snow1HText');
        snow1HText.textContent = snow1h;
        if (weatherData.snow3h !== '0mm') {
            let snow3h = weatherData.snow3h;
            const snow3HText = document.querySelector('#snow3HText');
            snow3HText.textContent = snow3h;
        }
    }

    // Populate weather data (this is unruly, figure out how to refactor)
    const tempCurrentText = document.querySelector('#tempCurrentText');
    console.log(tempCurrentText);
    tempCurrentText.textContent = currentTemp;
    const weatherDescriptionText = document.querySelector('#weatherDescriptionText');
    weatherDescriptionText.textContent = weatherDescription;
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
    locationText.textContent = location;
    const timeText = document.querySelector('#timeText');
    timeText.textContent = timeOfCalc;
}

// convert from kelvin to fahrenheit
function convertToF(numKelvin) {
    return 1.8*(numKelvin - 273) + 32;
}

// convert from hectaPascals to inches of mercury
function convertToInches(hPa_pressure) {
    return hPa_pressure * 0.029529983071445;
}

// convert meters per second to miles per hour
function convertToMPH(mps) {
    return mps * 2.23694;
}

// convert wind direction in degrees to a geographical direction
function convertToDirection(deg) {
    if (deg  > 348.75 || deg < 11.25) {
        return 'N';
    } else if (deg > 11.25 || deg < 33.75) {
        return 'NNE';
    } else if (deg > 33.75 || deg < 56.25) {
        return 'NE';
    } else if (deg > 56.25 || deg < 78.75) {
        return 'ENE';
    } else if (deg > 78.75 || deg < 101.25) {
        return 'E';
    } else if (deg > 101.25 || deg < 123.75) {
        return 'ESE';
    } else if (deg > 123.75 || deg < 146.25) {
        return 'SE';
    } else if (deg > 146.25 || deg < 168.75) {
        return 'SSE';
    } else if (deg > 168.75 || deg < 191.25) {
        return 'S';
    } else if (deg > 191.25 || deg < 213.75) {
        return 'SSW';
    } else if (deg > 213.75 || deg < 236.25) {
        return 'SW';
    } else if (deg > 236.25 || deg < 258.75 ) {
        return 'WSW';
    } else if (eg > 258.75 || deg < 281.25) {
        return 'W';
    } else if (deg > 281.25 || deg < 303.75) {
        return 'WNW';
    } else if (eg > 303.75 || deg < 326.25 ) {
            return 'NW';
    } else if (deg > 326.25 || deg < 348.75) {
            return 'NNW';
    }
}