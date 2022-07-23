import React, {useState} from 'react';
import "./css/main-theme.css";
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from './components/LoadingSpinner';
import NavBar from './components/NavBar';
import setLanguage from './functions/setLanguage';
import HomePage from "./components/HomePage";
import {fetchWeather} from './data/ApiFunctions';
import SideBar from './components/SideBar';

const App = () => {
    const [loading, setLoading] = useState('idle');
    const [weatherInfo, setWeatherInfo] = useState('');

    setLanguage();
    let showSidebar = false;

    async function setWeather(cityName) {
        if (loading === 'loading') return;
        setLoading('loading');

        let res = await fetchWeather(cityName);
        console.log(res);
        setWeatherInfo(res);

        setLoading('done');
    }

    const PageBody = () => {
        return (
            <div>
                <SideBar enabled={showSidebar}/>
                {loading === 'loading' && <LoadingSpinner/>}
                {loading === 'done' ?
                    <WeatherCard weather={weatherInfo}/> :
                    <HomePage setWeather={setWeather}/>}
                {/* <RecentLocWidget/> */}
            </div>
        );
    };


    return (
        <div className="App">
            <NavBar setWeather={setWeather}/>
            <PageBody/>
        </div>
    );
};

export default App;