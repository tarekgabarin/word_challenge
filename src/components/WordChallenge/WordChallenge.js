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
                <div className='section-wrapper'>
                    {this.state.timerMilliseconds && (
                        <div className='section-item'>
                            <span>seconds</span>
                            {this.state.timerMilliseconds}
                        </div>
                    )}
                    <div className="section-item">
                        <span>Score</span>
                        0
                    </div>
                </div>
                <div className="section-wrapper">
                    <div className="section-item">
                        <h1>Complexity</h1>
                    </div>
                </div>
                <div className="section-wrapper">
                    <div className="section-item semi-square styled-input">
                        <input type="text" />
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