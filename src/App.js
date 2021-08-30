import React from 'react'
import { useState, useContext } from 'react'
import Context from "./store/Context";
import searchIcon from "./assets/search.svg"
import locationIcon from "./assets/cursor-fill.svg"
import Logo from "./components/Logo";
import "./App.css"
import axios from 'axios'
import WeatherCard from "./components/WeatherCard";

const App =  () => {
    const {state, actions} = useContext(Context);
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
        const url = baseURL + "/data/2.5/weather?q="+ state.city + apiKey
        try {
            const req = await axios.get(url);
            const res = await req;
            console.log(res)

            actions({
                type: 'setState', payload: {
                    ...state,
                    weather: {
                        descp: res.data.weather[0].description,
                        temp: res.data.main.temp,
                        city: res.data.name,
                        humidity: res.data.main.humidity,
                        press: res.data.main.pressure,
                        icon: res.data.weather[0].icon
                    }
                }
            })
        }catch(err){
            alert('Your city was not found.')
            setLoading('idle')
        }
        setLoading('done')
    }
    // api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=1424c156aeca3cc894f12db19e829024
    // api.openweathermap.org/data/2.5/weather?lat=51.973576099999995&lon=4.4609001&appid=&appid=1424c156aeca3cc894f12db19e829024


    //
    const getLocalWeather = async () => {


        setLoading('loading')
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const url = baseURL + 'data/2.5/weather?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude + apiKey
        const req = await axios.get(url);
        const res = await req;
        console.log(res)
        actions({type:'setState', payload: {
                ...state,
                weather: {
                    descp: res.data.weather[0].description,
                    temp: res.data.main.temp,
                    city: res.data.name,
                    humidity: res.data.main.humidity,
                    press: res.data.main.pressure,
                    icon: res.data.weather[0].icon
                }
            } },

            )

        setCity(res.data.name)
        setLoading('done')
        
    };
    const setWeatherLoading = (loadingStatus) =>{
        actions({type:'setState', payload: {
            ...state,
            status:{
                weatherLoading: loadingStatus
            }
        } })
    }
    const handleChange = (e) => {
        e.preventDefault()
        const input = e.target.value
        setLocInput(input)
        console.log(userLocation)

    }
    const handleKeyPress = (e) => {

        if (e.charCode === 13) {
            e.preventDefault()
            if(e.target.value !== ''){
            getWeather(e)
            }
        }


    }


    const PageBody = () =>{
        return(
            <div className="page-body">
                <Logo/>
                {state.weatherLoading === 'loading' && <p>Loading...</p>}
                <WeatherCard status={loading}/>
            </div>
        )
    }



    return (<>
            <div className="search-section">

                    <div className="search-content">
                        {/*<p className="m-0 col-white bold rem-15">Your city:</p>*/}
                        <input type="text"
                               placeholder="Search for your city"
                               // onChange={handleChange}
                               onChange={(e) => actions({type:'setState', payload: {...state, city: e.target.value} })}
                               onKeyPress={handleKeyPress}
                               className="search-input"
                        />
                        <button className="search-button" onClick={getWeather}><img src={searchIcon} className="small-icon"/></button>
                        <button className="search-button" onClick={getLocalWeather}><img src={locationIcon} className="small-icon"/></button>


                    </div>
            </div>
            <PageBody/>
        </>
    )
}

export default App