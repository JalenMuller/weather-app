import axios from './axios';

const langId = localStorage.getItem('langId');

const lang = `&lang=${langId}`;

function getPosition() {

    return new Promise((res, rej) => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Sorry, your browser does not support HTML5 geolocation.");
        }

        function success(position) {
            res(position);
        }

        function error(error) {
            console.log("Sorry, we can't retrieve your local weather without location permission.");
        }

    });

};

function cacheCity(city) {
    if (localStorage.getItem('locationHistory')) {
        let history = JSON.parse(localStorage.getItem('locationHistory'));
        if (history.filter(name => name === city).length !== 0) {
            console.log('not empty');
            return;
        }
        history.push(city);
        localStorage.setItem("locationHistory", JSON.stringify(history));
    } else {
        localStorage.setItem("locationHistory", JSON.stringify([city]));
    }
}


async function fetchWeather(location) {
    let response;
    if (location !== 'geo-location') {
        try {
            let fetchUrl = `data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}${lang}`;
            let res = await axios.get(fetchUrl);
            response = res;
            // console.log(res)
        } catch {
            // alert('Your city was not found.')
            response = false;
        }
    } else {
        const pos = await getPosition();
        let latitude = pos.coords.latitude;
        let longitude = pos.coords.longitude;
        console.log(pos.coords.longitude);
        const fetchUrl = `data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}${lang}`;
        try {
            response = await axios.get(fetchUrl);
            // console.log(res)
        } catch {
            // alert('Your city was not found.')
            response = false;
        }
    }

    if (!response) {
        return false;
    } else {
        cacheCity(response.data.name);
        let capitalisedDescp = response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1);
        return ({
            descp: capitalisedDescp,
            temp: response.data.main.temp,
            city: response.data.name,
            humidity: response.data.main.humidity,
            presponses: response.data.main.presponses,
            feels_like: response.data.main.feels_like,
            temp_max: response.data.main.temp_max,
            temp_min: response.data.main.temp_min,
            icon: response.data.weather[0].icon,
            sunrise: response.data.sys.sunrise,
            sunset: response.data.sys.sunset
        });
    }
}


export {fetchWeather};