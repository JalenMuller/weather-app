import React from 'react';
import {GeoAltFill} from "react-bootstrap-icons";

function LocationHistory({setWeather}) {
    let history
    if(localStorage.getItem("locationHistory")) {
        history = JSON.parse(localStorage.getItem("locationHistory"));
    } else{
        return null
    }
    function fetchRecentLoc(location){
        setWeather(location)
    }
    console.log(history);
    return (
        <div className="glossy w-25 h-100 flex-center">
            <h1 className="center-text rem-2">History</h1>
            <div className="widget-list">
            {history.map(location => (<div onClick={e => fetchRecentLoc(location)} key={location} className="flex-row cursor-pointer"><GeoAltFill size={24}/><li>&nbsp;{location}</li></div>))}
            </div>
        </div>
    );
}

export default LocationHistory;