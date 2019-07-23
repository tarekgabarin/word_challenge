import React, {Component} from 'react';

class StartMenu extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedTimeInSeconds: 60,
            listOfTimes: [
                {
                text: '1 minute',
                time: 60
                },
                {
                    text: '2 minute',
                    time: 120
                },
                {
                    text: '3 minute',
                    time: 180
                },
                {
                    text: '4 minute',
                    time: 240
                },
                {
                    text: '5 minute',
                    time: 300
                },
            ]

        }

    }

    onSelectTime = (event) => {

        const selectedTime = Number(event.target.value);

        this.setState({
            selectedTimeInSeconds: selectedTime
        });

    };

    onStart = () => {
        this.props.history.push('/challenge/' + this.state.selectedTimeInSeconds)
    };

    render() {

        const timeOptionsJSX = this.state.listOfTimes.map(item => {
            return <option value={item.time}>{item.text}</option>
        });


        return (
            <div className={'start-menu-container'}>
                <div className={'item'}>
                    <h1 className={'start-header-title'}>Start Typing Test</h1>
                </div>
                <div className="styled-select semi-square item" >
                    <select value={this.state.selectedTimeInSeconds} onChange={(e) => this.onSelectTime(e)}>
                        {timeOptionsJSX}
                    </select>
                </div>

                <div className="styled-button item">
                    <button onClick={this.onStart} className={'rounded'} >
                        Start
                    </button>
                </div>


            </div>
        );
    }
}

export default StartMenu;