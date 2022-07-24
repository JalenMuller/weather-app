import {GeoFill, List} from 'react-bootstrap-icons';
import {useState} from 'react';
import Logo from "./Logo";
import SideBar from './SideBar';

function SearchBar(props) {
    const [showLocationDiv, setLocationDiv] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const langId = localStorage.getItem('langId');
    const placeholderText = {
        nl: 'Zoek naar stad',
        en: 'Search by city'
    };

    const search = (e) => {
        // If key pressed = enter
        if (e.charCode === 13) {
            e.preventDefault();
            setLocationDiv(false);
            console.log(e);
            props.setWeather(e.target.value);
        }
    };
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };
    return (
        <>
            <SideBar showSidebar={showSidebar} toggleSidebar={toggleSidebar}/>
            <div className="navbar">
                <Logo/>
                <div className="search-items">
                    <div>
                        <input type="text"
                               placeholder={placeholderText[langId]}
                               onKeyPress={search}
                               onFocus={() => setLocationDiv(true)}
                               onBlur={() => setLocationDiv(false)}
                               className="search-bar rem-15"
                        />
                        <div className='search-icon'>
                        <img className='search-icon-container'
                             src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"/>
                        </div>
                        </div>
                    <button className="icon-button cursor-pointer" onClick={e => props.setWeather('geo-location')}>
                        <GeoFill className="bootstrap-icon"/></button>
                </div>
                <span id={showSidebar ? "sb-icon-active" : ""} className="sidebar-icon" onClick={toggleSidebar}><List
                    size={60} color="#fff"/></span>
            </div>
        </>
    );
}

export default SearchBar;
