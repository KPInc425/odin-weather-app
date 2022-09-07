import { getForecastData, getLocation, getWeatherData, getWeatherGif } from './apiFunctions';
import { cleanData } from './cleanJsonData';
import { displayForecastData, displayWeatherData } from './DOMFunctions';
import { errorHandler } from './errorHandling';
import { getState } from './helperFunctions';
import './reset.css';
import './style.css';


let lat;
let long;
let postalCode;
let cityName;
let stateName;
let countryCode = '';

// get Ref's to input and submit button
const inputPostalCode = document.querySelector('#inputPostalCode');
const btnLocalWeather = document.querySelector('#btnLocalWeather');

// Initialize App
const init = (() => {
    inputPostalCode.value = '93301';
    weatherApp();
})();

btnLocalWeather.addEventListener('click', weatherApp);
inputPostalCode.addEventListener('keyup', (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
        weatherApp();
    }
});

async function weatherApp() {
    // when button clicked > grab value from input text box
    
    postalCode = inputPostalCode.value;
    inputPostalCode.value = "";


    // check if value is empty
    if (postalCode !== "") {
        // set user input location 
        showLoadingWidget();
        await setCurrentLocation();

        // get weather data with set location data
        let weatherData = await getWeatherData(lat, long);

        let forecastData = await getForecastData(lat, long);

        // console.log(weatherData);
        let gifAddress =  await getWeatherGif(weatherData.weather[0].description, weatherData.main.temp);


        // clean up JSON and return only needed data
        let cleanedData = {
            data: cleanData(weatherData),
            cityName: cityName,
            stateName: stateName,
            weatherGif: gifAddress,
        }
        // console.log(cleanedData);
        displayWeatherData(cleanedData);
        // Reactivate when figure out how to parse forecast data
        // displayForecastData();
        hideLoadingWidget();
        // console.log(weatherData);
    } else {
        errorHandler({
            code: 425,
            message: 'You have not entered a Postal Code.'
        });
    }
}

async function setCurrentLocation() {
    // get location from GeoLocationAPI
    let locationData = await getLocation(postalCode);
    // console.log(locationData);

    // Set Global lat, long values
    stateName = getState(postalCode);
    cityName = locationData.name;
    lat = locationData.lat;
    long = locationData.lon;
    // console.log(lat + " " + long);
}

function showLoadingWidget() {
    const weatherApp = document.querySelector('.fieldset');
    // console.log(weatherApp);
    const loadingWidget = document.createElement('img');

    loadingWidget.id = 'loadingWidget'
    loadingWidget.classList.add('loadingWidget');
    loadingWidget.src = "https://media1.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif?cid=bbfc1e49mgk3jbxodjq4l678y0yz8re86kwacdzkm947vdwv&rid=giphy.gif&ct=g" //"https://media4.giphy.com/media/swhRkVYLJDrCE/giphy.gif?cid=bbfc1e495u73r74bqxz2ggjsjf2olp5u2f9tzpaz3dsw3xbl&rid=giphy.gif&ct=g"
    weatherApp.appendChild(loadingWidget);
}

function hideLoadingWidget() {
    const loadingWidget = document.querySelector('#loadingWidget');
    loadingWidget.remove();
}