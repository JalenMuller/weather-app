import axios from './axios'

const langId = localStorage.getItem('langId')

const apiKey = "&appid=1424c156aeca3cc894f12db19e829024"
const lang = `&lang=${langId}`

function getPosition() {

    return new Promise((res, rej) => {

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
        } else {
          console.log("Sorry, your browser does not support HTML5 geolocation.");
        }
    
        function success(position) {
          res(position)
        }
    
        function error(error) {
          console.log("Sorry, we can't retrieve your local weather without location permission.");
        }
    
      });
    
    };

async function fetchWeather(e, fetchUrl) {
    let res;
    try{
        fetchUrl = "data/2.5/weather?q="+ e.target.value + apiKey + lang
        res = await axios.get(fetchUrl)
        // console.log(res)
        }catch{
            // alert('Your city was not found.')
            return false
        }
        localStorage.setItem('recentLocation', res.data.name)
        return res    
    }

const fetchLocalWeather = async () => {
    const pos = await getPosition()
    let latitude = pos.coords.latitude
    let longitude = pos.coords.longitude
    console.log(pos.coords.longitude)
    const fetchUrl = 'data/2.5/weather?lat=' + latitude + '&lon=' + longitude + apiKey
    let res;
    try{
        res = await axios.get(fetchUrl)
        // console.log(res)
        }catch{
            // alert('Your city was not found.')
            return false
        }
        localStorage.setItem('recentLocation', res.data.name)
        return res    
    }

export {fetchWeather, fetchLocalWeather}