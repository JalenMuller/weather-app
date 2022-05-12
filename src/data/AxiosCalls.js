import axios from './axios'

const langId = localStorage.getItem('langId')

const apiKey = "&appid=1424c156aeca3cc894f12db19e829024"
const lang = `&lang=${langId}`

async function fetchWeather(e) {
let res;
try{
    let fetchUrl = "data/2.5/weather?q="+ e.target.value + apiKey + lang
    res = await axios.get(fetchUrl)
    // console.log(res)
    }catch{
        // alert('Your city was not found.')
        return false
    }
    localStorage.setItem('recentLocation', res.data.name)
    return res    
}

export {fetchWeather}