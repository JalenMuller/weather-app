import { GeoFill } from 'react-bootstrap-icons';
import {useState} from 'react'
import Logo from "./Logo"

function SearchBar(props){
    const [showLocationDiv, setLocationDiv] = useState(false)
    const langId = localStorage.getItem('langId')
    const placeholderText = {
        nl: 'Zoek naar jouw stad',
        en: 'Search for your city'
    }
    const search = (e) => {
        // If key pressed = enter
        if (e.charCode === 13) {
            e.preventDefault()
            setLocationDiv(false)
            props.getWeather(e)
        }
    }

    return(
        <>
        <div className="search-content">
        <Logo/>
        <input type="text"
               placeholder= {placeholderText[langId]}
               onKeyPress={search}
               onFocus={() => setLocationDiv(true)}
               onBlur={() => setLocationDiv(false)}
               className="glossy input rem-15"
        />
        {/* {showLocationDiv &&
        <div className="use-location" onMouseDown={props.getLocalWeather}><GeoFill color="#ff4800" size={24} className="geo-fill"/><Translate string="use-location" defaultString="Or use your location"/></div>
        } */}
        {/* <button className="search-button" onClick={getWeather}><img src={searchIcon}/></button> */}
        <button className="glossy icon-button rem-15" onClick={props.getLocalWeather}><GeoFill/></button>
</div>
</>
    )
}
export default SearchBar