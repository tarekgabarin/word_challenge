import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../index.css'
import moment from 'moment';
import {describeArc} from "../utils/helper";

const TimerCircle = ({ radius }) => (
    <svg className='countdown-svg'>
        <path fill="none" stroke="#333" stroke-width="4" d={describeArc(50, 50, 48, 0, radius)}/>
    </svg>
);

class WordChallenge extends Component {

    constructor(props){
        super(props);

        //// Get the unit of a minute in milliseconds
        const endTime = moment().add(60, 'seconds').format("MM DD YYYY, h:mm a");
        const startTime = moment().format('"MM DD YYYY, h:mm a"');
        const countdown = moment(endTime).diff(startTime);

        this.state = {
            playerScore: 0,
            timerMilliseconds: countdown,
            timerOn: true,
            correctWord: "",
            playersGuess: "",
            isGameOver: false
        }
    }


    componentDidMount() {
         setInterval(() => {

            if(this.state.timerOn){
                 const oneSecondFromCurrentTimer = this.state.timerMilliseconds - 1000;
                 if (oneSecondFromCurrentTimer < 1000) {

                     this.setState({
                         timerOn: false,
                         timerMilliseconds: 0
                     })

                 } else {
                     this.setState({
                         timerMilliseconds: oneSecondFromCurrentTimer
                     })
                 }
            }



        }, 1000);
    }



    render() {
        return (
            <div>
                <h1>Timer On: {this.state.timerOn}</h1>
                <h1>Timer Seconds: {this.state.timerMilliseconds}</h1>
            </div>
        );
    }
}

WordChallenge.propTypes = {
    playerScore: PropTypes.number,
    timerMilliseconds: PropTypes.number,
    correctWord: PropTypes.string,
    playersGuess: PropTypes.string,
    isGameOver: PropTypes.bool
};

export default WordChallenge;