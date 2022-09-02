import { convertToDirection, convertToInches, convertToMPH } from "./helperFunctions";

function cleanData(dataJSON) {
    // return cleaned data object from JSON
    return {
        tempCurrent: Math.round(dataJSON.main.temp) + 'F°',
        tempFeels: Math.round(dataJSON.main.feels_like) + 'F°',
        tempHigh: Math.round(dataJSON.main.temp_max) + 'F°',
        tempLow: Math.round(dataJSON.main.temp_min) + 'F°',
        humidity: dataJSON.main.humidity + '%',
        pressure: convertToInches(dataJSON.main.pressure).toFixed(2),
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

export { cleanData };

