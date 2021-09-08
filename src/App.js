import React from 'react'
import { useState } from 'react'
import searchIcon from "./assets/images/search-icon.png"
import locationIcon from "./assets/images/icon-location.svg"
import Logo from "./components/Logo";
import "./App.css"
import axios from 'axios'
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from './components/LoadingSpinner';
import SearchBar from './components/SearchBar';

const App =  () => {

    const [loading, setLoading] = useState('idle');
    const [weather, setWeather] = useState('');
    const [locInput, setLocInput] = useState('');
    const [city, setCity] = useState('');
    const [userLocation, setUserLocation] = useState('')
    const baseURL = "https://api.openweathermap.org/";
    const apiKey = '&appid=1424c156aeca3cc894f12db19e829024'

    const getWeather = async (e) => {
        setLoading('loading')
        console.log(e.target.value)
        const url = baseURL + "/data/2.5/weather?q="+ e.target.value + apiKey
        const req = await axios.get(url);
        const res = await req;
        console.log(res)
        saveWeather(res)
        setLoading('done')
    }
    // api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=1424c156aeca3cc894f12db19e829024
    // api.openweathermap.org/data/2.5/weather?lat=51.973576099999995&lon=4.4609001&appid=&appid=1424c156aeca3cc894f12db19e829024



    const getLocalWeather = async () => {
        if (loading === 'loading'){
            return
        }
        setLoading('loading')

        const pos =  await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject) 
            
        })
        

        await setUserLocation({
            lat: pos.coords.latitude,
            long: pos.coords.longitude
        })

        const url = baseURL + 'data/2.5/weather?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude + apiKey
        const req = await axios.get(url);
        const res = await req;
        console.log(res)

        saveWeather(res)
        setCity(res.data.name)

        setLoading('done')

    };
    const saveWeather = (res) => {

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
        console.log(weather)
    }


    const handleChange = e => {
        e.preventDefault()
        setLocInput(e.target.value)
        // console.log(userLocation)

    }
    const handleKeyPress = e => {
        // check if key pressed is enter
        if (e.charCode === 13) {
            e.preventDefault()
            getWeather(e)
        }


    }
    const searchInput = React.useRef(null)

    const PageBody = () =>{
        return(
            <div className="page-body">
                {loading === 'loading' && <LoadingSpinner/>}
                {loading === 'done' ? <WeatherCard weather={weather}/>
                : <p className="find-location-text">Search for your location to get started.</p>}
                
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