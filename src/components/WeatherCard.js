import React from "react";

const WeatherCard = (props) => {
    let k = props.weather.temp;
    let C = Math.round(k - 273.15);

    let skeleton
    let skeletonText
    let skeletonFitContent

    console.log(props);
    if(props.loading === 'idle' || props.loading === 'loading'){
        console.log('setSkeleton')
        skeleton = ' skeleton'
        skeletonText = ' skeleton skeleton-text'
        skeletonFitContent = ' skeleton skeleton-fit-content'
    }else{
        console.log('removeSkeleton')
        skeleton = ''
        skeletonText = ''
        skeletonFitContent = ''
    }

    return(
        <div className="weather-card">
            <div className="mb-2">
                {/*<p>{props.loading}</p>*/}
                <h2 className={'weather-card-title' + skeletonFitContent}>Current weather in {props.weather.city}</h2>
                <div className={"divider-black" + skeleton}/>
            </div>
            <div className="weather-box">
                <div className="weather-temp">
                    {/*todo broken image fixen*/}
                    <img className={'weather-icon' + skeleton}

                         src={props.weather.icon ? "http://openweathermap.org/img/wn/" + props.weather.icon + "@2x.png" : ''} />
                    {/*if NaN show placeholder 18 for the skeleton*/}
                    <div className={skeleton}> {C > 0 ? C : '18'}<span className="temp">°C</span></div>
                </div>
                <div className="weather-info">
                    {/*todo gevoelstemperatuur*/}
                    <div className={"weather-info-item" + skeletonText}>
                        {props.weather.descp}
                    </div>
                    <div className={"weather-info-item" + skeletonText}>
                        Humidity :{props.weather.humidity} %
                    </div>
                    <div className={"weather-info-item" + skeletonText}>
                        Pressure : {props.weather.press} mb
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WeatherCard