import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './WordChallenge.css'
import {getWord} from "../../utils/api";
import { Formik } from 'formik';

class WordChallenge extends Component {

    constructor(props){
        super(props);

        this.state = {
            playerScore: 0,
            timerMilliseconds: this.props.match.params.seconds,
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

    setTextInput = (event) => {

        console.log('event.target.value is', event.target.value);

        this.setState({
            playersGuess: event.target.value
        })
    };



    onEnterWord = (event) =>  {

        ///TODO finish this function

        event.preventDefault();

        this.setState({showFormValidation: true});

        setTimeout( () => {

            this.setState({showFormValidation: false})


        }, 300);


    };



    render() {

        const textInputJSX = (this.state.showFormValidation) ? (<div className="section-item semi-square styled-input animated shake fast">
            <input onChange={this.setTextInput} type="text" className={'wrong-input-border'} />
        </div>) : (<div className="section-item semi-square styled-input">
            <input onChange={this.setTextInput} type="text" className={'input-border'} />
        </div>)

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

                    {textInputJSX}

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