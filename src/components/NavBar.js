import { GeoFill, List } from 'react-bootstrap-icons';
import {useState} from 'react'
import Logo from "./Logo"

function SearchBar(props){
    const [showLocationDiv, setLocationDiv] = useState(false)
    const langId = localStorage.getItem('langId')
    const placeholderText = {
        nl: '🔎︎  Zoek naar stad',
        en: '🔎︎  Search by city'
    }
    const search = (e) => {
        // If key pressed = enter
        if (e.charCode === 13) {
            e.preventDefault()
            setLocationDiv(false)
            props.setWeather(e)
        }
    }
    const toggleNav = () => {
        console.log('yeah')
    }
    return(
        <>
        <div className="navbar">
            <Logo/>
        <div className="search-items">
             <input type="text"
               placeholder= {placeholderText[langId]}
               onKeyPress={search}
               onFocus={() => setLocationDiv(true)}
               onBlur={() => setLocationDiv(false)}
               className="search-input glossy rem-15"
        />

        <button className="glossy icon-button" onClick={props.getLocalWeather}><GeoFill className="bootstrap-icon"/></button>
        </div>
        <span className="icon" onClick={toggleNav}><List size={60}/></span>
</div>
</>
    )
}
export default SearchBar  
      /* {showLocationDiv &&
        <div className="use-location" onMouseDown={props.getLocalWeather}><GeoFill color="#ff4800" size={24} className="geo-fill"/><Translate string="use-location" defaultString="Or use your location"/></div>
        } */
        /* <button className="search-button" onClick={getWeather}><img src={searchIcon}/></button> */