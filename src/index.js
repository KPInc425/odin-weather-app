import { getForecastData, getLocation, getWeatherData, getWeatherGif } from './apiFunctions';
import { cleanData } from './cleanJsonData';
import { displayForecastData, displayWeatherData } from './DOMFunctions';
import { errorHandler } from './errorHandling';
import { getState, hideLoadingWidget, showLoadingWidget } from './helperFunctions';
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
    if (e.key === 'Enter') {
        weatherApp();
    }
});

const btnAlertClose = document.querySelector('#btnCloseAlert');
btnAlertClose.addEventListener('click', () => {
    alertContainer.classList.add('hidden');
});

async function weatherApp() {
    // when button clicked > grab value from input text box
    
    postalCode = inputPostalCode.value;
    inputPostalCode.value = "";

    
    
    // check if value is empty
    if (postalCode.length !== 0) {
        // set user input location 
        showLoadingWidget();
        await setCurrentLocation();
        
        // get weather data with set location data
        let weatherData = await getWeatherData(lat, long);
        
        let forecastData = await getForecastData(lat, long);
        
        let gifAddress =  await getWeatherGif(weatherData.weather[0].description, weatherData.main.temp);
        
        
        // clean up JSON and return only needed data
        let cleanedData = {
            data: cleanData(weatherData),
            cityName: cityName,
            stateName: stateName,
            weatherGif: gifAddress,
        }
        displayWeatherData(cleanedData);
        // Reactivate when figure out how to parse forecast data
        // displayForecastData();
        hideLoadingWidget();
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

    // Set Global lat, long values
    stateName = getState(postalCode);
    cityName = locationData.name;
    lat = locationData.lat;
    long = locationData.lon;
}
