import React, {useState} from "react";


const Weather = () => {
    const [weather, setWeather] = useState('');

    return <div className="weather-card">
        <div>
            <h2>Today's weather in {city}</h2>
            <hr></hr>
        </div>
        <div className="Weath">
            <div className="welement">
                Weather : {weather.descp}
            </div>
            <div className="welement">
                Temperature : {C.toFixed(2)} &#8451;
            </div>
            <div className="welement">
                Humidity :{weather.humidity} %
            </div>
            <div className="welement">
                Pressure :  {weather.press} mb
            </div>
        </div>
    </div>
}
export default Weather