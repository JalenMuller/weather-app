import { GeoFill } from 'react-bootstrap-icons';
import {useState} from 'react'
import Translate from '../functions/Translate';

function SearchBar(props){
    const [showLocationDiv, setLocationDiv] = useState(false)
    const langId = localStorage.getItem('langId')
    const placeholderText = {
        nl: 'Zoek naar jouw stad',
        en: 'Search for your city'
    }
    const search = (e) => {
        
        if (e.charCode === 13) {
            e.preventDefault()
            setLocationDiv(false)
        props.getWeather(e)
        }
    }

    return(
        <div className="search-content">
        <input type="text"
               placeholder= {placeholderText[langId]}
               onKeyPress={search}
               onFocus={() => setLocationDiv(true)}
               onBlur={() => setLocationDiv(false)}
               className="search-input"
        />
        {showLocationDiv &&
        <div className="use-location" onMouseDown={props.getLocalWeather}><GeoFill color="#ff4800" size={24} className="geo-fill"/><Translate string="use-location" defaultString="Or use your location"/></div>
        }
        {/* <button className="search-button" onClick={getWeather}><img src={searchIcon}/></button> */}
        {/* <button className="search-button" onClick={getLocalWeather}><img className="small-icon" src={locationIcon}/></button> */}
</div>
    )
}
export default SearchBar