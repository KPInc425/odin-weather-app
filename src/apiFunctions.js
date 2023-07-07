import { errorHandler } from "./errorHandling";

let apiKey = '95b3fba8515b07e36f4947f16bc32b95';

async function getLocation(postCode, countryCode, units) {
    try {
        postCode = postCode || '93301';
        units = units || 'imperial'
        countryCode = countryCode || 'US';
        // fetch coords by postal code
        let Response = await fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${postCode},${countryCode}&appid=${apiKey}`, {mode: 'cors'});
        if (Response.status === 404) {
            throw new Object({code: 422, message: 'Invalid Postal Code'});
        }
        let Json = await Response.json();
        return Json;
    } catch (err) {
        errorHandler(err);
    }

}

async function getWeatherData(lat, long, units) {
    try {
        units = units || 'imperial';
        // fetch weather data from OpenWeatherAPI
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`, {mode: 'cors'});
        // format resolved promise to json
        let json = await response.json();
        return json;
    } catch(error) {
        errorHandler(error);
    }
}

async function getForecastData(lat, long, units) {
    try {

        units = units || 'imperial';
        // fetch weather data from OpenWeatherAPI
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`, {mode: 'cors'});
        // format resolved promise to json
        let json = await response.json();
        return json;
    } catch(error) {
        errorHandler(error);
    }
}

async function getWeatherGif(description, temp) {
    try {
        // description = description;
        let currentTimeOfDay = new Date();
        if (temp > 90) {
            console.log('Extreme Hot');
            description = "Hot as hell!"
        } 

        if (temp < 32) {
            console.log('Extreme Cold!');
            description = "Ice Tundra"
        }

        console.log('description: ' + description)
        console.log('CurrentTime: ' + currentTimeOfDay.getHours())

        let response = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=0JvtDfunbRZAukBB5R94oBnUtDprGS0i&s=' + description, {mode: 'cors'});
        let json = await response.json();
        return json.data.images.original.url;
        

    } catch (err) {
        errorHandler(err);
    }
}


export {
    getLocation,
    getWeatherData,
    getWeatherGif,
    getForecastData,
}