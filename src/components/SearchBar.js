import { GeoFill } from 'react-bootstrap-icons';
import {useState} from 'react'

function SearchBar(props){
    const [showLocationDiv, setLocationDiv] = useState(false)
    
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
               placeholder="Search by city"
               onKeyPress={search}
               onFocus={() => setLocationDiv(true)}
               onBlur={() => setLocationDiv(false)}
               className="search-input"
        />
        {showLocationDiv &&
        <div className="use-location" onMouseDown={props.getLocalWeather}><GeoFill color="#ff4800" size={24} className="geo-fill"/>Or use your location</div>
        }
        {/* <button className="search-button" onClick={getWeather}><img src={searchIcon}/></button> */}
        {/* <button className="search-button" onClick={getLocalWeather}><img className="small-icon" src={locationIcon}/></button> */}
</div>
    )
}
export default SearchBar