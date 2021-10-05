import React from 'react'
import nlFlag from "../assets/images/nl.svg"
import usFlag from "../assets/images/us.svg"
function LanguagePopup() {
    const langId = localStorage.getItem('langId')

    const setLang = (langId) => {
        localStorage.setItem('langId', langId)
        window.location.reload(false);
    }

    if (langId){
        return(null)
    } else {
        return (
            <div className="lang-popup">
                <p className="center-text rem-3">Choose your language</p>
                <div className="flag-icons">
                    <img src={nlFlag} alt="Dutch" className="flag-icon" onClick={() => setLang('nl')}/>
                    <img src={usFlag} alt="English (US)" className="flag-icon" onClick={() => setLang('en')}/>
                </div>
            </div>
        )
    }
}

export default LanguagePopup
