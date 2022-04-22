import React from 'react'
import { useState } from 'react'
import "./css/main-theme.css"
import axios from './data/axios'
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from './components/LoadingSpinner';
import TopBar from './components/TopBar';
import LanguagePopup from './components/LanguagePopup';
import Translate from './functions/Translate';

const App =  () => {
    const [loading, setLoading] = useState('idle');
    const [weather, setWeather] = useState('');

    const apiKey = "&appid=1424c156aeca3cc894f12db19e829024"
    const langId = localStorage.getItem('langId')

    const lang = `&lang=${langId}`
    async function fetchWeather(fetchUrl){
        let res
        try{
        res = await axios.get(fetchUrl)
        }catch{
            alert('Your city was not found.')
            return
        }
     

        setWeather({
            descp: res.data.weather[0].description,
            temp: res.data.main.temp,
            city: res.data.name,
            humidity: res.data.main.humidity,
            press: res.data.main.pressure,
            feels_like: res.data.main.feels_like,
            temp_max: res.data.main.temp_max,
            temp_min: res.data.main.temp_min,
            icon: res.data.weather[0].icon,
            sunrise: res.data.sys.sunrise,
            sunset: res.data.sys.sunset
        })

        localStorage.setItem('recentLocation', res.data.name)

        return res
    }

    const getWeather = async (e) => {
        if(loading === 'loading') return
        setLoading('loading')
        let fetchUrl = "/data/2.5/weather?q="+ e.target.value + apiKey + lang
        await fetchWeather(fetchUrl)
        setLoading('done')
    }
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

    const getLocalWeather = async () => {
        if(loading === 'loading') return
        setLoading('loading')
        const pos = await getPosition()
        console.log(pos.coords)
        let latitude = pos.coords.latitude
        let longitude = pos.coords.longitude
        console.log(pos.coords.longitude)
        const fetchUrl = 'data/2.5/weather?lat=' + latitude + '&lon=' + longitude + apiKey
        await fetchWeather(fetchUrl)
        setLoading('done')

    };


    // const RecentLocWidget = () => {
    //     const recentLoc = localStorage.getItem('recentLocation')
    //     if (recentLoc){
    //         return(
    //         <div className="weather-bg-block">
    //         <h2>Or use your most recent city</h2>
    //         <h2>{recentLoc}</h2>
    //         </div>
    //         )
    //     } else {
    //         return null
    //     }
    // }

    const PageBody = () =>{
        return(
            <div className="page-body">
                {loading === 'loading' && <LoadingSpinner/>}
                {loading === 'done' ? 
                <WeatherCard weather={weather}/> : 
                <p className="find-location-text"><Translate string="search-city" defaultString="Search for your city"/></p>}
                {/* <RecentLocWidget/> */}
                <LanguagePopup/>
                
                
                
            </div>
        )
    }


    return (
        <div className="App">
            <TopBar getWeather={getWeather} getLocalWeather={getLocalWeather}/>
            <PageBody/>
        </div>
    )
}

export default App