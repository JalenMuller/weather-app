import React from 'react'
import nlFlag from "../assets/images/netherlands.png"
import ukFlag from "../assets/images/united-kingdom.png"
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
                    <embed src={ukFlag} alt="English (US)" className="flag-icon" onClick={() => setLang('en-GB')}/>
                </div>
            </div>
        )
    }
}

export default LanguagePopup
