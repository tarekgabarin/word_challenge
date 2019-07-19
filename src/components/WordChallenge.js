import React, {Component} from 'react';
import PropTypes from 'prop-types';

class WordChallenge extends Component {

    constructor(props){
        super(props);

        this.state = {
            playerScore: 0,
            timer: 0,
            correctWord: "",
            playersGuess: ""
        }
    }



    render() {
        return (
            <div>

            </div>
        );
    }
}

WordChallenge.propTypes = {
    playerScore: PropTypes.number,
    timer: PropTypes.number,
    correctWord: PropTypes.string,
    playersGuess: PropTypes.string
};

export default WordChallenge;