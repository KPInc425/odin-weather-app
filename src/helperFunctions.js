import { errorHandler } from "./errorHandling";

// convert from kelvin to fahrenheit (No longer needed with units option from api)
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

function getState(zipString) {

    /* Ensure param is a string to prevent unpredictable parsing results */
    if (typeof zipString !== 'string') {
        console.log('Must pass the zipcode as a string.');
        return;
    }
  
    /* Ensure we have exactly 5 characters to parse */
    if (zipString.length !== 5) {
        errorHandler({code: 422, message: 'Must pass a 5-digit zipcode.'});
        return;
    }
  
    /* Ensure we don't parse strings starting with 0 as octal values */
    const zipcode = parseInt(zipString, 10);
  
    let st;
    let state;
  
    /* Code cases alphabetized by state */
    if (zipcode >= 35000 && zipcode <= 36999) {
        st = 'AL';
        state = 'Alabama';
    } else if (zipcode >= 99500 && zipcode <= 99999) {
        st = 'AK';
        state = 'Alaska';
    } else if (zipcode >= 85000 && zipcode <= 86999) {
        st = 'AZ';
        state = 'Arizona';
    } else if (zipcode >= 71600 && zipcode <= 72999) {
        st = 'AR';
        state = 'Arkansas';
    } else if (zipcode >= 90000 && zipcode <= 96699) {
        st = 'CA';
        state = 'California';
    } else if (zipcode >= 80000 && zipcode <= 81999) {
        st = 'CO';
        state = 'Colorado';
    } else if ((zipcode >= 6000 && zipcode <= 6389) || (zipcode >= 6391 && zipcode <= 6999)) {
        st = 'CT';
        state = 'Connecticut';
    } else if (zipcode >= 19700 && zipcode <= 19999) {
        st = 'DE';
        state = 'Delaware';
    } else if (zipcode >= 32000 && zipcode <= 34999) {
        st = 'FL';
        state = 'Florida';
    } else if ( (zipcode >= 30000 && zipcode <= 31999) || (zipcode >= 39800 && zipcode <= 39999) ) {
        st = 'GA';
        state = 'Georgia';
    } else if (zipcode >= 96700 && zipcode <= 96999) {
        st = 'HI';
        state = 'Hawaii';
    } else if (zipcode >= 83200 && zipcode <= 83999) {
        st = 'ID';
        state = 'Idaho';
    } else if (zipcode >= 60000 && zipcode <= 62999) {
        st = 'IL';
        state = 'Illinois';
    } else if (zipcode >= 46000 && zipcode <= 47999) {
        st = 'IN';
        state = 'Indiana';
    } else if (zipcode >= 50000 && zipcode <= 52999) {
        st = 'IA';
        state = 'Iowa';
    } else if (zipcode >= 66000 && zipcode <= 67999) {
        st = 'KS';
        state = 'Kansas';
    } else if (zipcode >= 40000 && zipcode <= 42999) {
        st = 'KY';
        state = 'Kentucky';
    } else if (zipcode >= 70000 && zipcode <= 71599) {
        st = 'LA';
        state = 'Louisiana';
    } else if (zipcode >= 3900 && zipcode <= 4999) {
        st = 'ME';
        state = 'Maine';
    } else if (zipcode >= 20600 && zipcode <= 21999) {
        st = 'MD';
        state = 'Maryland';
    } else if ( (zipcode >= 1000 && zipcode <= 2799) || (zipcode == 5501) || (zipcode == 5544 ) ) {
        st = 'MA';
        state = 'Massachusetts';
    } else if (zipcode >= 48000 && zipcode <= 49999) {
        st = 'MI';
        state = 'Michigan';
    } else if (zipcode >= 55000 && zipcode <= 56899) {
        st = 'MN';
        state = 'Minnesota';
    } else if (zipcode >= 38600 && zipcode <= 39999) {
        st = 'MS';
        state = 'Mississippi';
    } else if (zipcode >= 63000 && zipcode <= 65999) {
        st = 'MO';
        state = 'Missouri';
    } else if (zipcode >= 59000 && zipcode <= 59999) {
        st = 'MT';
        state = 'Montana';
    } else if (zipcode >= 27000 && zipcode <= 28999) {
        st = 'NC';
        state = 'North Carolina';
    } else if (zipcode >= 58000 && zipcode <= 58999) {
        st = 'ND';
        state = 'North Dakota';
    } else if (zipcode >= 68000 && zipcode <= 69999) {
        st = 'NE';
        state = 'Nebraska';
    } else if (zipcode >= 88900 && zipcode <= 89999) {
        st = 'NV';
        state = 'Nevada';
    } else if (zipcode >= 3000 && zipcode <= 3899) {
        st = 'NH';
        state = 'New Hampshire';
    } else if (zipcode >= 7000 && zipcode <= 8999) {
        st = 'NJ';
        state = 'New Jersey';
    } else if (zipcode >= 87000 && zipcode <= 88499) {
        st = 'NM';
        state = 'New Mexico';
    } else if ( (zipcode >= 10000 && zipcode <= 14999) || (zipcode == 6390) || (zipcode == 501) || (zipcode == 544) ) {
        st = 'NY';
        state = 'New York';
    } else if (zipcode >= 43000 && zipcode <= 45999) {
        st = 'OH';
        state = 'Ohio';
    } else if ((zipcode >= 73000 && zipcode <= 73199) || (zipcode >= 73400 && zipcode <= 74999) ) {
        st = 'OK';
        state = 'Oklahoma';
    } else if (zipcode >= 97000 && zipcode <= 97999) {
        st = 'OR';
        state = 'Oregon';
    } else if (zipcode >= 15000 && zipcode <= 19699) {
        st = 'PA';
        state = 'Pennsylvania';
    } else if (zipcode >= 300 && zipcode <= 999) {
        st = 'PR';
        state = 'Puerto Rico';
    } else if (zipcode >= 2800 && zipcode <= 2999) {
        st = 'RI';
        state = 'Rhode Island';
    } else if (zipcode >= 29000 && zipcode <= 29999) {
        st = 'SC';
        state = 'South Carolina';
    } else if (zipcode >= 57000 && zipcode <= 57999) {
        st = 'SD';
        state = 'South Dakota';
    } else if (zipcode >= 37000 && zipcode <= 38599) {
        st = 'TN';
        state = 'Tennessee';
    } else if ( (zipcode >= 75000 && zipcode <= 79999) || (zipcode >= 73301 && zipcode <= 73399) ||  (zipcode >= 88500 && zipcode <= 88599) ) {
        st = 'TX';
        state = 'Texas';
    } else if (zipcode >= 84000 && zipcode <= 84999) {
        st = 'UT';
        state = 'Utah';
    } else if (zipcode >= 5000 && zipcode <= 5999) {
        st = 'VT';
        state = 'Vermont';
    } else if ( (zipcode >= 20100 && zipcode <= 20199) || (zipcode >= 22000 && zipcode <= 24699) || (zipcode == 20598) ) {
        st = 'VA';
        state = 'Virginia';
    } else if ( (zipcode >= 20000 && zipcode <= 20099) || (zipcode >= 20200 && zipcode <= 20599) || (zipcode >= 56900 && zipcode <= 56999) ) {
        st = 'DC';
        state = 'Washington DC';
    } else if (zipcode >= 98000 && zipcode <= 99499) {
        st = 'WA';
        state = 'Washington';
    } else if (zipcode >= 24700 && zipcode <= 26999) {
        st = 'WV';
        state = 'West Virginia';
    } else if (zipcode >= 53000 && zipcode <= 54999) {
        st = 'WI';
        state = 'Wisconsin';
    } else if (zipcode >= 82000 && zipcode <= 83199) {
        st = 'WY';
        state = 'Wyoming';
    } else {
        st = 'none';
        state = 'none';
        console.error('No state found matching', zipcode);
    }
  
    return st;
}

function formatTime(timeToFormat) {
    let hour = Number(timeToFormat.slice(0,2));
    let minute = timeToFormat.slice(3,5);
    let seconds = timeToFormat.slice(6,8);
    let formattedTime;
    if (hour > 13) {
        hour -= 12;
        hour = hour.toString();
        formattedTime = hour + ":" + minute + ":" + seconds + "PM";
        return formattedTime;
    }
    if (hour < 10) {
        hour = hour.toString();
        formattedTime = hour + ":" + minute + ":" + seconds + "AM";
        return formattedTime
    }
    if (hour > 12 && hour < 13) {
        formattedTime = timeToFormat + "PM";
        return formattedTime;
    }

    formattedTime = timeToFormat + "AM";
    return formattedTime;
}

function getNext5WeekDays() {
    switch(new Date().getDay()) {
        case 0:
            return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        case 1:
            return ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        case 2:
            return ['Tue','Wed','Thu','Fri','Sat','Sun','Mon'];
        case 3:
            return ['Wed','Thu','Fri','Sat','Sun','Mon','Tue'];
        case 4:
            return ['Thu','Fri','Sat','Sun','Mon','Tue','Wed'];
        case 5:
            return ['Fri','Sat','Sun','Mon','Tue','Wed','Thu'];
        case 6:
            return ['Sat','Sun','Mon','Tue','Wed','Thu','Fri'];
        default: 
            errorHandler({code: 42, message: "Day was not found."});
    }
}
  
function showLoadingWidget() {
    const weatherApp = document.querySelector('.fieldset');
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

export {
    convertToF,
    convertToInches,
    convertToMPH,
    convertToDirection,
    getState,
    formatTime,
    getNext5WeekDays,
    showLoadingWidget,
    hideLoadingWidget
}