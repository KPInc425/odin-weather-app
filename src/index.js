import './style.css';


let lat;
let long;
let apiKey = '95b3fba8515b07e36f4947f16bc32b95';
let cityName = 'Everett';
let stateCode = '';
let countryCode = '';

const btnLocalWeather = document.querySelector('#btnLocalWeather');
btnLocalWeather.addEventListener('click', () => {    
    getLocation();    

    //getWeatherData();
})


function setCurrentLocation(location) {
    let coords = location.coords;
    console.log(coords);
    lat = coords.latitude;
    long = coords.longitude;

}

function error(error) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
}

async function getLocation() {
    let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`, {mode: 'cors'});
    let json = await response.json();
    console.log(json);
}

async function getWeatherData() {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`, {mode: 'cors'});
        console.log(response);
        return response;
    } catch(error) {
        console.log(error);
    }

}

