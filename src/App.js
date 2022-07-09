import React from 'react'
import { useState } from 'react'
import "./css/main-theme.css"
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from './components/LoadingSpinner';
import NavBar from './components/NavBar';
import setLanguage from './functions/setLanguage';
import HomePage from "./components/HomePage";
import {fetchWeather, fetchLocalWeather} from './data/ApiFunctions'
import SideBar from './components/SideBar';

const App =  () => {
    const [loading, setLoading] = useState('idle');
    const [weatherInfo, setWeatherInfo] = useState('');

    setLanguage()
    let showSidebar = false;

    async function setWeather(cityName){
        if(loading === 'loading') return
        setLoading('loading')

        function cacheCity(city){
            if(localStorage.getItem('locationHistory')){
                let history = JSON.parse(localStorage.getItem('locationHistory'))
                if(history.filter(name => name === city).length !== 0) {console.log('not empty')
                    return}
                history.push(city)
                localStorage.setItem("locationHistory", JSON.stringify(history))
            } else{
                localStorage.setItem("locationHistory", JSON.stringify([city]))
            }

        }

        let res = await fetchWeather(cityName)
        if (!res){
            alert('err')
        }
        else{
            setWeatherInfo({
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
            cacheCity(res.data.name)
            setLoading('done');
        }
    }



    const getLocalWeather = async () => {
        if(loading === 'loading') return
        setLoading('loading')
        let res = await fetchLocalWeather();
        if(!res){
            setLoading('idle');
        }else{
            setWeatherInfo({
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
            setLoading('done')
        }

    };


    const PageBody = () =>{
        return(
            <div>
                <SideBar enabled={showSidebar}/>
                {loading === 'loading' && <LoadingSpinner/>}
                {loading === 'done' ?
                    <WeatherCard weather={weatherInfo}/> :
                    <HomePage setWeather={setWeather}/>}
                {/* <RecentLocWidget/> */}
            </div>
        )
    }


    return (
        <div className="App">
            <NavBar setWeather={setWeather} getLocalWeather={getLocalWeather} />
            <PageBody/>
        </div>
    )
}

export default App