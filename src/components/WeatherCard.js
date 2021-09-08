import React from "react";
import sunriseIcon from "../assets/images/icon-sunrise.svg"
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
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2)
    return formattedTime
}

const WeatherCard = (props) => {
    let k = props.weather.temp;
    let C = Math.round(k - 273.15);

    let sunrise = convertUnixTimestamp(props.weather.sunrise)
    let sunset = convertUnixTimestamp(props.weather.sunset)
    console.log(sunrise)
    console.log(sunset)
    return(
        <>
                
                
                {/* <div className="divider-black"/> */}
     <div className="weather-bg-block">
           <span className='weather-card-title'>{props.weather.city}</span>
            <div className="weather-details">
                <div className="temp-icon">
                        <div className="mb-10">{C}<span className="temp">°C</span></div>
                        <div><img className={'weather-icon'} src={"http://openweathermap.org/img/wn/" + props.weather.icon + "@2x.png"} /></div>
                    </div>
                    <div className="rem-15"><Sunrise size={24} />{sunrise}</div>
                    <div className="rem-15"><Sunset size={24} />{sunset}</div>
                    {/* <div className="rem-15"><img src={sunriseIcon} className="detail-icon"/>{sunrise}</div> */}
                </div>
                   
                    <div className="weather-details-descp">{props.weather.descp}</div>
                    
      </div>
      
        <div className="weather-card">
                <div className="weather-info">
                    {/*todo gevoelstemperatuur*/}
                    <div className="weather-info-item border-btm-white">
                        <div>Humidity:</div>
                        <div>{props.weather.humidity} %</div>
                    </div>
                    <div className="weather-info-item">
                        <div>Pressure:</div>
                        <div>{props.weather.press} mb</div>
                    </div>
                </div>
        </div>
        </>
    )
}
// 
export default WeatherCard

{/* <div className="weather-details">
                    
// <img className='weather-icon'
//      src={"http://openweathermap.org/img/wn/" + props.weather.icon + "@2x.png"} />
// {/*if NaN show nothing*/}
// <div className=""> {C > 0 ? C : ''}<span className="temp">°C</span></div>
// <div className="">Sun up: </div>

// </div> */}