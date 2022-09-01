import './style.css';


let lat;
let long;
let apiKey = '95b3fba8515b07e36f4947f16bc32b95';
let cityName = 'Everett';
let stateCode = '';
let countryCode = '';

const inputCityName = document.querySelector('#inputCity');
const btnLocalWeather = document.querySelector('#btnLocalWeather');

btnLocalWeather.addEventListener('click', async () => {   
    cityName = inputCityName.value;
    if (cityName !== "") {
        await setCurrentLocation();
        let weatherData = await getWeatherData();
        console.log(cleanData(weatherData));
        console.log(weatherData);
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
    let locationData = await getLocation();
    // console.log(locationData[0]); 
    lat = locationData[0].lat;
    long = locationData[0].lon;
    // console.log(lat + " " + long);

}

function error(error) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
}

async function getLocation() {
    try {
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`, {mode: 'cors'});
        let json = await response.json();
        return json;
    } catch (err) {
        error(err);
    }

}

async function getWeatherData() {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`, {mode: 'cors'});
        // console.log(response);
        let json = await response.json();
        // console.log(json);
        return json;
    } catch(error) {
        error(error);
    }

}

function cleanData(dataJSON) {
    // console.log(dataJSON.main);
    // let tempF = Math.round(convertToF(dataJSON.main.temp));
    // let humidity = dataJSON.main.humidity;
    // console.log(tempF);
    // console.log(dataJSON.sys.sunrise);
    // console.log(dataJSON.rain);
    // const rain = dataJSON.rain;

    return {
        temp: Math.round(convertToF(dataJSON.main.temp)) + 'F°',
        tempFeels: Math.round(convertToF(dataJSON.main.feels_like)) + 'F°',
        tempHigh: Math.round(convertToF(dataJSON.main.temp_max)) + 'F°',
        tempLow: Math.round(convertToF(dataJSON.main.temp_min)) + 'F°',
        humidity: dataJSON.main.humidity + '%',
        pressure: convertToInches(dataJSON.main.pressure).toFixed(2) + ' inches',
        cloudsPercent: dataJSON.clouds.all + '%', 
        description: dataJSON.weather[0].description,
        windSpeed: convertToMPH(dataJSON.wind.speed).toFixed(2) + 'mph',
        windDirection: convertToDirection(dataJSON.wind.deg),
        dateTime: new Date(dataJSON.dt * 1000),
        sunRise: new Date(dataJSON.sys.sunrise * 1000),
        sunSet: new Date(dataJSON.sys.sunset * 1000),
        visibility: (dataJSON.visibility * 0.001) + 'km',
        rain1h: (dataJSON.rain !== undefined) ? dataJSON.rain['1h'] + 'mm' : '0in',
        rain3h: (dataJSON.rain !== undefined) ? dataJSON.rain['3h'] + 'mm' : '0in',
        snow1h: (dataJSON.snow !== undefined) ? dataJSON.snow['1h'] + 'mm' : '0in',
        snow3h: (dataJSON.snow !== undefined) ? dataJSON.snow['3h'] + 'mm' : '0in',

    }
}

function convertToF(numKelvin) {
    return 1.8*(numKelvin - 273) + 32;
}

function convertToInches(hPa_pressure) {
    return hPa_pressure * 0.029529983071445;
}

function convertToMPH(mps) {
    return mps * 2.23694;
}

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