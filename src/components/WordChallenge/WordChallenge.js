import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import './WordChallenge.css'
import {getWord} from "../../utils/api";

const WordChallenge = (props) => {

    const [playerScore, setPlayerScore] = useState(0)
    const [timerSeconds, setTimerSeconds] = useState(Number(props.match.params.seconds))
    const [minutes, ] = useState(Number(props.match.params.seconds) / 60)
    const [showFormValidation, setShowFormValidation] = useState(false)
    const [timerOn, setTimerOn] = useState(true)
    const [correctWord, setCorrectWord] = useState("")
    const [playersGuess, setPlayersGuess] = useState("")
    const [wordsPerMinute, setWordsPerMinute] = useState(0)
    const [hasNetworkError, setHasNetworkError] = useState(false)

    const [hasGameStarted, setHasGameStarted] = useState(false)

        //Calculate the WPM once the timer is up
    const calculateWordsPerMinute = useCallback(() => {
            const wordsTyped = playerScore / 100;
            return  wordsTyped / minutes
        }, [playerScore, minutes]);

    useEffect(() => {
            ///API call to get random word
            if (hasGameStarted === false){
                getWord().then(response => {
                    const word = response.data[0];
                    setCorrectWord(word)
                    setHasGameStarted(true)        
                }).catch(err => {
                    if(err){
                        console.log(err);
                        setHasNetworkError(true)
                    }
                });
            }

        ///Set the timer when the game begins, and end game when timer has reached zero seconds
         const interval = setInterval(() => {
            if(timerOn){
                 const oneSecondFromCurrentTimer = timerSeconds - 1;
                 if (oneSecondFromCurrentTimer < 1) {
                     const wordsPerMinute = calculateWordsPerMinute();
                     setTimerOn(false)
                     setTimerSeconds(0)
                     setWordsPerMinute(wordsPerMinute)

                 } else {
                    setTimerSeconds(oneSecondFromCurrentTimer)
                 }
            }
            return clearInterval(interval)
        }, 1000);
        
    }, [calculateWordsPerMinute, timerSeconds, hasGameStarted, timerOn])

    const setTextInput = (event) => {
        setPlayersGuess(event.target.value)
    };

    ///Checks to see if the word has been correctly typed when the user presses the "Enter" key
    const enterKeyPressed = (event) => {
        if (event.key === "Enter") {
            const enteredWord = playersGuess.toLowerCase().trim();
            if (enteredWord === correctWord){
                getWord().then(response => {
                    const word = response.data[0];
                    setCorrectWord(word)
                    setPlayerScore(playerScore + 100)
                    setPlayersGuess("")

                }).catch(err => {
                    if(err){
                        console.log(err);
                        setHasNetworkError(true)
                    }
                });

            } else {

                setShowFormValidation(true)

                setTimeout( () => {
                    setShowFormValidation(false)
                }, 300);

            }

        }
    };



    ///Go back to the start menu
    const goBack = (event) => {
        event.preventDefault();
        props.history.push('/')
    };

     {

        const textInputJSX = (showFormValidation) ? (<div className="section-item semi-square styled-input animated shake fast">
            <input onKeyDown={enterKeyPressed} value={playersGuess} onChange={setTextInput} type="text" className={'wrong-input-border'} />
        </div>) : (<div className="section-item semi-square styled-input">
            <input onKeyDown={enterKeyPressed} value={playersGuess}  onChange={setTextInput} type="text" className={'input-border'} />
        </div>);


        const timeOverOptionsJSX = (
            <section>

                <div className="section-item">
                    <div className="styled-button item">
                        <button onClick={(e) => goBack(e)} className={'rounded'} >
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

        const currentGameMenuJSX = (timerSeconds !== 0) ? textInputJSX : timeOverOptionsJSX;

        const lowerUI = (hasNetworkError) ? (hasErrorJSX) : (currentGameMenuJSX);


        return (
            <div>


                    <div className='section-wrapper'>
                            <div className='section-item'>
                                <span>seconds</span>
                                {timerSeconds}
                            </div>

                        <div className="section-item">
                            <span>Score</span>
                            {playerScore}
                        </div>
                    </div>


                {(timerSeconds !== 0) ? (
                    <div className="section-wrapper">
                        <div className="section-item">
                            <h1>{correctWord}</h1>
                        </div>
                    </div>
                ) : (
                    <div className="section-wrapper">
                        <div className="section-item">
                            <span>Your WPM is</span>
                            {wordsPerMinute}
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
