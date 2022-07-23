import React from 'react';
import translations from '../data/translations.json';

function Translate(props) {
    const langId = localStorage.getItem('langId');
    const translationStrings = Object.values(translations);


    let string = '';

    // Translate will look for a string in the JSON file
    if (translationStrings[0][langId]) {
        string = translationStrings[0][langId][props.string];
    }
    // If the string wasn't found it will use the default string passed through props
    if (!string) {
        string = props.defaultString;
    }

    let style;
    props.color ? style = {color: props.color} : style = {};

    return (
        <span style={style} dangerouslySetInnerHTML={{__html: string}}/>
    );
}

export default Translate;
