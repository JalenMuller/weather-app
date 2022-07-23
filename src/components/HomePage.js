import React from 'react';
import LocationHistory from "./LocationHistory";
function HomePage({setWeather}) {
    return (
        <div className="grid">
        <LocationHistory setWeather={setWeather}/>
            <div className="card w-75 h-100">
                <h2 className="center-text">News</h2>
            </div>
        </div>
    );
}

export default HomePage;