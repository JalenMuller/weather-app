import React from 'react'
import translations from '../data/translations.json'

function Translate(props) {
    const langId = localStorage.getItem('langId')
    const translationStrings = Object.values(translations);

    
    let string = ''

    // Translate will look for a string in the JSON file
    if(translationStrings[0][langId]){
        string = translationStrings[0][langId][props.string]
    }
    // If the string wasn't found it will use the default string passed through props
    if (string === undefined){
        string = props.defaultString
    }

    return (
        <span dangerouslySetInnerHTML={{__html: string}}></span>
    )
}

export default Translate
