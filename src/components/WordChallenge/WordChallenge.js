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
            isGameOver: false
        }
    }


    componentDidMount() {

        getWord().then(response => {

            const word = response.data[0];

            this.setState({
                correctWord: word
            })

        }).catch(err => {
            if(err){
                console.log(err)
            }
        });

         setInterval(() => {

            if(this.state.timerOn){
                 const oneSecondFromCurrentTimer = this.state.timerSeconds - 1;
                 if (oneSecondFromCurrentTimer < 1) {

                     this.setState({
                         timerOn: false,
                         timerSeconds: 0
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

        console.log('event.target.value is', event.target.value);

        this.setState({
            playersGuess: event.target.value
        })
    };

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
                        console.log(err)
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

    calculateWordsPerMinute = () => {

        const wordsTyped = this.state.playerScore / 100;

        return  wordsTyped / this.state.minutes

    };



    render() {

        const textInputJSX = (this.state.showFormValidation) ? (<div className="section-item semi-square styled-input animated shake fast">
            <input onKeyPress={this.enterKeyPressed} value={this.state.playersGuess} onChange={this.setTextInput} type="text" className={'wrong-input-border'} />
        </div>) : (<div className="section-item semi-square styled-input">
            <input onKeyPress={this.enterKeyPressed} value={this.state.playersGuess}  onChange={this.setTextInput} type="text" className={'input-border'} />
        </div>)

        return (
            <div>
                <div className='section-wrapper'>
                    {this.state.timerSeconds && (
                        <div className='section-item'>
                            <span>seconds</span>
                            {this.state.timerSeconds}
                        </div>
                    )}
                    <div className="section-item">
                        <span>Score</span>
                        {this.state.playerScore}
                    </div>
                </div>
                <div className="section-wrapper">
                    <div className="section-item">
                        <h1>{this.state.correctWord}</h1>
                    </div>
                </div>
                <div className="section-wrapper">

                    {textInputJSX}

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
    isGameOver: PropTypes.bool
};

export default WordChallenge;