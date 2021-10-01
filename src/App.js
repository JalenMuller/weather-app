import React from 'react'
import { useState } from 'react'
import searchIcon from "./assets/images/search-icon.png"
import locationIcon from "./assets/images/icon-location.svg"
import Logo from "./components/Logo";
import "./App.css"
import axios from './data/axios'
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from './components/LoadingSpinner';
import SearchBar from './components/SearchBar';

const App =  () => {
    const [loading, setLoading] = useState('idle');
    const [weather, setWeather] = useState('');

    const apiKey = '&appid=1424c156aeca3cc894f12db19e829024'

    async function fetchWeather(fetchUrl){
        const res = await axios.get(fetchUrl)
     

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
        let fetchUrl = "/data/2.5/weather?q="+ e.target.value + apiKey
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
              console.log("Sorry, we can\'t retrieve your local weather without location permission.");
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



    const handleKeyPress = e => {
        // check if key pressed is enter
        if (e.charCode === 13) {
            e.preventDefault()
            getWeather(e)
        }


    }

    const RecentLocWidget = () => {
        const recentLoc = localStorage.getItem('recentLocation')
        if (recentLoc){
            return(
            <div className="weather-bg-block">
            <h2>Or use your most recent city</h2>
            <h2>{recentLoc}</h2>
            </div>
            )
        } else {
            return null
        }
    }

    const PageBody = () =>{
        return(
            <div className="page-body">
                {loading === 'loading' && <LoadingSpinner/>}
                {loading === 'done' ? 
                <WeatherCard weather={weather}/> : 
                <p className="find-location-text">Search for your city to get started.</p>}
                {/* <RecentLocWidget/> */}
              
                
                
            </div>
        )
    }


    return (
        <div className="App">
            <Logo/>
            <SearchBar getWeather={getWeather} getLocalWeather={getLocalWeather}/>
            <PageBody/>
        </div>
    )
}

export default App