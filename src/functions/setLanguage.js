import React from 'react'
import nlFlag from "../assets/images/netherlands.png"
import ukFlag from "../assets/images/united-kingdom.png"
function setLanguage() {

    if(!localStorage.getItem('langId')) {
            let userLang = navigator.language || navigator.userLanguage;
            if(userLang === 'nl'){
                localStorage.setItem('langId', 'nl')
            }else{
                localStorage.setItem('langId', 'en')
            }
            window.location.reload(true)
    }
}

export default setLanguage
