import React from 'react'
import { useState, useContext } from 'react'
import Context from "./store/Context";
import searchIcon from "./assets/search-icon.png"
import locationIcon from "./assets/location-icon.png"
import Logo from "./components/Logo";
import "./App.css"
import axios from 'axios'


const App =  () => {

    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState('');
    const [locInput, setLocInput] = useState('');
    const [city, setCity] = useState('');
    const [userLocation, setUserLocation] = useState('')
    const baseURL = "https://api.openweathermap.org/";
    const apiKey = '&appid=1424c156aeca3cc894f12db19e829024'

    const getWeather = async (e) => {
        e.preventDefault()

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
        })
        setCity(res.data.name)

    }
    // api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=1424c156aeca3cc894f12db19e829024
    // api.openweathermap.org/data/2.5/weather?lat=51.973576099999995&lon=4.4609001&appid=&appid=1424c156aeca3cc894f12db19e829024



    const getLocalWeather = async () => {
        setLoading(true)
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
        })
        setCity(res.data.name)

        setLoading(false)

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
        const input = e.target.value
        setLocInput(input)
        console.log(userLocation)

    }
    const handleKeyPress = (e) => {

        if (e.charCode === 13) {
            e.preventDefault()
            getWeather(e)
        }


    }

    //Converting K to C
    let k = weather.temp;
    let C = k - 273.15
    const PageBody = () =>{
        return(
            <div className="page-body">
                <Logo/>
                {loading && <p>Loading...</p>}
                {/*{weather && <Weather />}*/}
            </div>
        )
    }


    const {state, actions} = useContext(Context);
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
                        <button className="search-button" onClick={getWeather}><img src={searchIcon}/></button>
                        <button className="search-button" onClick={getLocalWeather}><img src={locationIcon}/></button>


                    </div>
            </div>
            <PageBody/>
        </>
    )
}

export default App