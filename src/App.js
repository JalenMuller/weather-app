import React from 'react'
import { useState } from 'react'
import searchIcon from "./assets/images/search-icon.png"
import locationIcon from "./assets/images/location-icon.png"
import Logo from "./components/Logo";
import "./App.css"
import axios from 'axios'
import WeatherCard from "./components/WeatherCard";

const App =  () => {

    const [loading, setLoading] = useState('idle');
    const [weather, setWeather] = useState('');
    const [locInput, setLocInput] = useState('');
    const [city, setCity] = useState('');
    const [userLocation, setUserLocation] = useState('')
    const baseURL = "https://api.openweathermap.org/";
    const apiKey = '&appid=1424c156aeca3cc894f12db19e829024'

    const getWeather = async (e) => {
        e.preventDefault()
        setLoading('loading')
        console.log(e.target.value)
        const url = baseURL + "/data/2.5/weather?q="+ locInput + apiKey
        const req = await axios.get(url);
        const res = await req;
        console.log(res)
        setWeather({
            descp: res.data.weather[0].description,
            temp: res.data.main.temp,
            city: res.data.name,
            humidity: res.data.main.humidity,
            press: res.data.main.pressure,
            icon: res.data.weather[0].icon
        })
        setCity(res.data.name)
        setLoading('done')
    }
    // api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=1424c156aeca3cc894f12db19e829024
    // api.openweathermap.org/data/2.5/weather?lat=51.973576099999995&lon=4.4609001&appid=&appid=1424c156aeca3cc894f12db19e829024



    const getLocalWeather = async () => {
        if (loading === 'loading'){
            return
        }

        setLoading('loading')
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        await setUserLocation({
            lat: pos.coords.latitude,
            long: pos.coords.longitude
        })

        const url = baseURL + 'data/2.5/weather?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude + apiKey
        const req = await axios.get(url);
        const res = await req;
        console.log(res)

        setWeather({
            descp: res.data.weather[0].description,
            temp: res.data.main.temp,
            city: res.data.name,
            humidity: res.data.main.humidity,
            press: res.data.main.pressure,
            icon: res.data.weather[0].icon
        })
        setCity(res.data.name)

        setLoading('done')

    };

    //  async function getCoords_success(pos){

    //      console.log(userLocation)
    //
    // }

    // function getCoords_error(err){
    //     console.warn('ERROR(' + err.code + '): ' + err.message);
    // }

    const handleChange = (e) => {
        e.preventDefault()
        setLocInput(e.target.value)
        // console.log(userLocation)

    }
    const handleKeyPress = (e) => {
        // check if key pressed is enter
        if (e.charCode === 13) {
            e.preventDefault()
            getWeather(e)
        }


    }

    //Converting K to C

    const PageBody = () =>{
        return(
            <div className="page-body">
                <Logo/>
                {/*{loading === 'loading' && <p>Loading...</p>}*/}
                {/*{weather && <Weather />}*/}
                <WeatherCard weather={weather} loading={loading}/>
            </div>
        )
    }


    return (<>
            <div className="search-section">

                    <div className="search-content">
                        {/*<p className="m-0 col-white bold rem-15">Your city:</p>*/}

                        <input type="text"
                               placeholder="Search for your city"
                               onChange={handleChange}
                               onKeyPress={handleKeyPress}
                               className="search-input"
                        />
                        <button className="search-button" onClick={getWeather}><img src={searchIcon}/></button>
                        <button className="search-button" onClick={getLocalWeather}><img src={locationIcon}/></button>


                    </div>
            </div>
            <PageBody/>
        </>
    )
}

export default App