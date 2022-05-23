  import React from 'react'
  import { useState } from 'react'
  import "./css/main-theme.css"
  import WeatherCard from "./components/WeatherCard";
  import LoadingSpinner from './components/LoadingSpinner';
  import NavBar from './components/NavBar';
  import LanguagePopup from './components/LanguagePopup';
  import Translate from './functions/Translate';
  import {fetchWeather, fetchLocalWeather} from './data/ApiFunctions'
import SideBar from './components/SideBar';

  const App =  () => {
      const [loading, setLoading] = useState('idle');
      const [weatherInfo, setWeatherInfo] = useState('');
      
      let showSidebar = false;

      async function setWeather(e){
        if(loading === 'loading') return
        setLoading('loading')

        let res = await fetchWeather(e)
          if (!res){
            alert('err')
          }
          else{
          setWeatherInfo({
              descp: res.data.weather[0].description,
              temp: res.data.main.temp,
              city: res.data.name,
              humidity: res.data.main.humidity,
              press: res.data.main.pressure,
              feels_like: res.data.main.feels_like,
              temp_max: res.data.main.temp_max,
              temp_min: res.data.main.temp_min,
              icon: res.data.weather[0].icon,
              sunrise: res.data.sys.sunrise,
              sunset: res.data.sys.sunset
          })
          setLoading('done');
        }
      }

    

      const getLocalWeather = async () => {
          if(loading === 'loading') return
          setLoading('loading')
          let res = await fetchLocalWeather();
          if(!res){
            setLoading('idle');
          }else{
          setWeatherInfo({
            descp: res.data.weather[0].description,
            temp: res.data.main.temp,
            city: res.data.name,
            humidity: res.data.main.humidity,
            press: res.data.main.pressure,
            feels_like: res.data.main.feels_like,
            temp_max: res.data.main.temp_max,
            temp_min: res.data.main.temp_min,
            icon: res.data.weather[0].icon,
            sunrise: res.data.sys.sunrise,
            sunset: res.data.sys.sunset
        })
          setLoading('done')
      }

      };


      // const RecentLocWidget = () => {
      //     const recentLoc = localStorage.getItem('recentLocation')
      //     if (recentLoc){
      //         return(
      //         <div className="weather-bg-block">
      //         <h2>Or use your most recent city</h2>
      //         <h2>{recentLoc}</h2>
      //         </div>
      //         )
      //     } else {
      //         return null
      //     }
      // }

      const PageBody = () =>{
          return(
              <div className="page-body">
                  <SideBar enabled={showSidebar}/>
                  {loading === 'loading' && <LoadingSpinner/>}
                  {loading === 'done' ? 
                  <WeatherCard weather={weatherInfo}/> : 
                  <p className="find-location-text"><Translate string="search-city" defaultString="Search for your city"/></p>}
                  {/* <RecentLocWidget/> */}
                  <LanguagePopup/>
                  
                  
                  
              </div>
          )
      }


      return (
          <div className="App">
              <NavBar setWeather={setWeather} getLocalWeather={getLocalWeather} />
              <PageBody/>
          </div>
      )
  }

  export default App