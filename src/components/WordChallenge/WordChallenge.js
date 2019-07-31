import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './WordChallenge.css'
import {getWord} from "../../utils/api";

class WordChallenge extends Component {

    constructor(props){
        super(props);

        this.state = {
            playerScore: 0,
            timerSeconds: this.props.match.params.seconds,
            minutes: Number(this.props.match.params.seconds) / 60,
            timerOn: true,
            correctWord: "",
            playersGuess: "",
            showFormValidation: false,
            wordsPerMinute: 0,
            hasNetworkError: false
        }
    }


    componentDidMount() {


        ///API call to get random word
        getWord().then(response => {

            const word = response.data[0];

            this.setState({
                correctWord: word
            })

        }).catch(err => {
            if(err){
                console.log(err);
                this.setState({
                    hasNetworkError: true
                })
            }
        });

        ///Set the timer when the game begins, and end game when timer has reached zero seconds
         setInterval(() => {

            if(this.state.timerOn){
                 const oneSecondFromCurrentTimer = this.state.timerSeconds - 1;
                 if (oneSecondFromCurrentTimer < 1) {

                     const wordsPerMinute = this.calculateWordsPerMinute();

                     this.setState({
                         timerOn: false,
                         timerSeconds: 0,
                         wordsPerMinute
                     })

                 } else {
                     this.setState({
                         timerSeconds: oneSecondFromCurrentTimer
                     })
                 }
            }



        }, 1000);
    }

    setTextInput = (event) => {

        this.setState({
            playersGuess: event.target.value
        })
    };

    ///Checks to see if the word has been correctly typed when the user presses the "Enter" key
    enterKeyPressed = (event) => {
        if (event.key === "Enter") {

            const enteredWord = this.state.playersGuess.toLowerCase().trim();

            if (enteredWord === this.state.correctWord){

                getWord().then(response => {

                    const word = response.data[0];

                    this.setState({
                        correctWord: word,
                        playerScore: this.state.playerScore + 100,
                        playersGuess: ""
                    })

                }).catch(err => {
                    if(err){
                        console.log(err);
                        this.setState({
                            hasNetworkError: true
                        })
                    }
                });

            } else {

                this.setState({showFormValidation: true});

                setTimeout( () => {

                    this.setState({showFormValidation: false})


                }, 300);

            }

        }
    };

    //Calculate the WPM once the timer is up
    calculateWordsPerMinute = () => {

        const wordsTyped = this.state.playerScore / 100;

        return  wordsTyped / this.state.minutes

    };

    ///Go back to the start menu
    goBack = (event) => {

        event.preventDefault();

        this.props.history.push('/')

    };



    render() {

        const textInputJSX = (this.state.showFormValidation) ? (<div className="section-item semi-square styled-input animated shake fast">
            <input onKeyPress={this.enterKeyPressed} value={this.state.playersGuess} onChange={this.setTextInput} type="text" className={'wrong-input-border'} />
        </div>) : (<div className="section-item semi-square styled-input">
            <input onKeyPress={this.enterKeyPressed} value={this.state.playersGuess}  onChange={this.setTextInput} type="text" className={'input-border'} />
        </div>);


        const timeOverOptionsJSX = (
            <section>

                <div className="section-item">
                    <div className="styled-button item">
                        <button onClick={(e) => this.goBack(e)} className={'rounded'} >
                            Retry
                        </button>
                    </div>
                </div>
            </section>

        );

        const hasErrorJSX = (<div className={'section-wrapper'}>
                                <div className="section-item">
                                    <h1>Server Error</h1>
                                </div>
                            </div>);

        const currentGameMenuJSX = (this.state.timerSeconds !== 0) ? textInputJSX : timeOverOptionsJSX;

        const lowerUI = (this.state.hasNetworkError) ? (hasErrorJSX) : (currentGameMenuJSX);


        return (
            <div>


                    <div className='section-wrapper'>
                            <div className='section-item'>
                                <span>seconds</span>
                                {this.state.timerSeconds}
                            </div>

                        <div className="section-item">
                            <span>Score</span>
                            {this.state.playerScore}
                        </div>
                    </div>


                {(this.state.timerSeconds !== 0) ? (
                    <div className="section-wrapper">
                        <div className="section-item">
                            <h1>{this.state.correctWord}</h1>
                        </div>
                    </div>
                ) : (
                    <div className="section-wrapper">
                        <div className="section-item">
                            <span>Your WPM is</span>
                            {this.state.wordsPerMinute}
                        </div>
                    </div>
                )}


                <div className="section-wrapper">

                    {lowerUI}

                </div>

            </div>
        );
    }
}

WordChallenge.propTypes = {
    playerScore: PropTypes.number,
    timerSeconds: PropTypes.number,
    correctWord: PropTypes.string,
    playersGuess: PropTypes.string,
    timerOn: PropTypes.bool,
    showFormValidation: PropTypes.bool,
    minutes: PropTypes.number,
    wordsPerMinute: PropTypes.number
};

export default WordChallenge;
