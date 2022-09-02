import { errorHandler } from "./errorHandling";

let apiKey = '95b3fba8515b07e36f4947f16bc32b95';

async function getLocation(postCode, countryCode, units) {
    try {
        postCode = postCode || '93301';
        units = units || 'imperial'
        countryCode = countryCode || 'US';
        // fetch coords by postal code
        let Response = await fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${postCode},${countryCode}&appid=${apiKey}`, {mode: 'cors'});
        let Json = await Response.json();
        return Json;
    } catch (err) {
        errorHandler(err);
    }

}

async function getWeatherData(lat, long) {
    try {
        // fetch weather data from OpenWeatherAPI
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`, {mode: 'cors'});
        // console.log(response);
        // format resolved promise to json
        let json = await response.json();
        console.log(json);
        return json;
    } catch(error) {
        errorHandler(error);
    }

}


export {
    getLocation,
    getWeatherData,
}