import { getLocation, getWeatherData } from './apiFunctions';
import { cleanData } from './cleanJsonData';
import { displayWeatherData } from './DOMFunctions';
import { errorHandler } from './errorHandling';
import { getState } from './helperFunctions';
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
        await setCurrentLocation();

        // get weather data with set location data
        let weatherData = await getWeatherData(lat, long);
        console.log(weatherData);

        // clean up JSON and return only needed data
        let cleanedData = {
            data: cleanData(weatherData),
            cityName: cityName,
            stateName: stateName,
        }
        console.log(cleanedData);
        displayWeatherData(cleanedData);
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
    console.log(locationData);

    // Set Global lat, long values
    stateName = getState(postalCode);
    cityName = locationData.name;
    lat = locationData.lat;
    long = locationData.lon;
    // console.log(lat + " " + long);
}


