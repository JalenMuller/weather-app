import React, {useContext, useState} from "react";
import axios from "axios";
import Context from "../store/Context";


const WeatherCard = () => {
    const {state, actions} = useContext(Context);
    const [weather, setWeather] = useState('');
    let k = state.weather.temp;
    let C = k - 273.15
    if (state.weather.length !== 0) {
        console.log(weather)
        return (
        <div className="weather-card">
            <div>
                <h2>Today's weather in {state.weather.city}</h2>
                <hr></hr>
            </div>
            <div className="weather-box">
                <div className="weather-temp">
                    {Math.round(C)} &#8451;
                    <img src={"http://openweathermap.org/img/wn/" + state.weather.icon + "@2x.png"} alt="weather icon"/>
                </div>
            <div className="weather-info">
                <div className="welement">
                    Weather : {state.weather.descp}
                </div>
                <div className="welement">
                    Humidity :{state.weather.humidity} %
                </div>
                <div className="welement">
                    Pressure : {state.weather.press} mb
                </div>
            </div>
        </div>
        </div>
            )
    }else{
        return(
        <p>Find your city to get started.</p>
        )
    }
}
export default WeatherCard