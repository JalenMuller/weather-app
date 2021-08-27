import React, { Component, Fragment } from "react";
import './styles.css'

class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ""
        };
    }
}
export default AutoComplete