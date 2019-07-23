import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './WordChallenge.css'

class WordChallenge extends Component {

    constructor(props){
        super(props);

        console.log('this.props.params is', this.props);

        this.state = {
            playerScore: 0,
            timerMilliseconds: this.props.match.params.seconds,
            timerOn: true,
            correctWord: "",
            playersGuess: "",
            isGameOver: false
        }
    }


    componentDidMount() {
         setInterval(() => {

            if(this.state.timerOn){
                 const oneSecondFromCurrentTimer = this.state.timerMilliseconds - 1;
                 if (oneSecondFromCurrentTimer < 1) {

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
                <div className='countdown-wrapper'>
                    {this.state.timerMilliseconds && (
                        <div className='countdown-item'>
                            <span>seconds</span>
                            {this.state.timerMilliseconds}
                        </div>
                    )}
                    <div className="countdown-item">
                        <span>Score</span>
                        0
                    </div>
                </div>
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