import React from "react";
import Translate from "../functions/Translate";
import { Sunrise, Sunset } from 'react-bootstrap-icons';

function convertUnixTimestamp(timestamp){

    
    let unix_timestamp = timestamp
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2)
    return formattedTime
}
function getCelsius(temp){
    // kelvin to celsius
    return Math.round(temp - 273.15);
}


const WeatherCard = (props) => {

    let currentTempCelsius = getCelsius(props.weather.temp)
    let feelsLikeTempCelsius = getCelsius(props.weather.feels_like)
    let maxTempCelsius = getCelsius(props.weather.temp_max)
    let minTempCelsius = getCelsius(props.weather.temp_min)

    let sunrise = convertUnixTimestamp(props.weather.sunrise)
    let sunset = convertUnixTimestamp(props.weather.sunset)
    return(
        <>
    {props.weather &&      
     <div className="weather-container">          
     <div className="weather-bg-block">
           <span className='weather-card-title'>{props.weather.city}</span>
            <div className="weather-details">
                <div className="temp-icon">
                        <div className="mb-10">{currentTempCelsius}<span className="temp">°C</span></div>
                        <div>
                        
                        <img 
                        className={'weather-icon'} 
                        src={"http://openweathermap.org/img/wn/" + props.weather.icon + "@2x.png"} 
                        alt={props.weather.icon}    
                        />
                        
                        </div>
                    </div>
                    <div>
                    <div className="rem-15 m-2"><Sunrise size={24} className="icon-align"/>{sunrise}</div>
                    <div className="rem-15 m-2"><Sunset size={24}  className="icon-align"/>{sunset}</div>
                    </div>
                </div>
                   
                    <div className="weather-details-descp">{props.weather.descp}</div>
                    
      </div>
      
        <div className="weather-card">
                <div className="weather-info">
                    {/*todo gevoelstemperatuur*/}
                    <div className="weather-info-item border-btm-white">
                        <div><Translate string="feels-like" defaultString="Feels Like"/>:</div>
                        <div>{feelsLikeTempCelsius}<span className="temp-small">°C</span></div>
                    </div>
                    <div className="weather-info-item border-btm-white">
                        <div>Min Temp:</div>
                        <div>{minTempCelsius}<span className="temp-small">°C</span></div>
                    </div>
                    <div className="weather-info-item border-btm-white">
                        <div>Max Temp:</div>
                        <div>{maxTempCelsius}<span className="temp-small">°C</span></div>
                    </div>
                    <div className="weather-info-item border-btm-white">
                        <div><Translate string="humidity" defaultString="Vochtigheid"/>:</div>
                        <div>{props.weather.humidity} %</div>
                    </div>
                    <div className="weather-info-item">
                        <div><Translate string="pressure" defaultString="Pressure"/>:</div>
                        <div>{props.weather.press} mb</div>
                    </div>
                </div>
        </div>
        </div>
          }
        </>
    )
}
// 
export default WeatherCard
