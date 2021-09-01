import React, {useContext, useState} from "react";
import axios from "axios";
import Context from "../store/Context";


const WeatherCard = (status) => {
    const {state, actions} = useContext(Context);
    const [weather, setWeather] = useState('');
    let k = state.weather.temp;
    let C = k - 273.15
    console.log(status)
    if (status.status === 'idle') {
        return(
        <p>Find your city to get started.</p>
        )
    }else if(status.status === 'loading'){

        return (
            <div className="weather-card">
                <div className="mb-2">
                    <h2 className="skeleton skeleton-fit-content">Today's weather in New York</h2>
                </div>
                <div className="weather-box">
                    <div className="weather-temp">
                        <div className="skeleton">{Math.round(C)} &#8451;</div>
                        <div className="weather-icon skeleton" alt="weather icon"/>
                    </div>
                <div className="weather-info">
                    <div className="skeleton skeleton-text">
                        Weather : broken clouds
                    </div>
                    <div className="skeleton skeleton-text">
                        Humidity : 72%
                    </div>
                    <div className="skeleton skeleton-text">
                        Pressure : 1022 mb
                    </div>
                </div>
            </div>
            </div>
        )
    }else if(status.status === 'done'){
        return(
        <div className="weather-card">
        <div className="mb-2">
            <h2 className="weather-card-title">Today's weather in {state.weather.city}</h2>
            <div className="divider-black"/>
        </div>
        <div className="weather-box">
            <div className="weather-temp">
                <img className="weather-icon" src={"http://openweathermap.org/img/wn/" + state.weather.icon + "@2x.png"} alt="weather icon"/>

                {Math.round(C)}<span className="temp">°C</span>
            </div>
        <div className="weather-info">
            {/*todo gevoelstemperatuur*/}
            <div className="weather-info-descp">
                {state.weather.descp}
            </div>
            <div className="weather-info-item">
                Humidity :{state.weather.humidity} %
            </div>
            <div className="weather-info-item">
                Pressure : {state.weather.press} mb
            </div>
        </div>
    </div>
    </div>
        )
    } 
}
export default WeatherCard