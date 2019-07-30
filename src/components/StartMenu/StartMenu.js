import React, {useState} from 'react';

export default function StartMenu (props) {

    const [selectedTimeInSeconds, setTime] = useState(60);

    const [listOfTimes] = useState([
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
    ]);

    function onSelectTime (event) {

        const selectedTime = Number(event.target.value);

        setTime(selectedTime);

    }


    function onStart() {
        props.history.push('/challenge/' + selectedTimeInSeconds)
    }


        const timeOptionsJSX = listOfTimes.map(item => {
            return <option value={item.time}>{item.text}</option>
        });


        return (
            <div className={'start-menu-container'}>
                <div className={'item'}>
                    <h1 className={'start-header-title'}>Start Typing Test</h1>
                </div>
                <div className="styled-select semi-square item" >
                    <select value={selectedTimeInSeconds} onChange={onSelectTime}>
                        {timeOptionsJSX}
                    </select>
                </div>

                <div className="styled-button item">
                    <button onClick={onStart} className={'rounded'} >
                        Start
                    </button>
                </div>


            </div>
        );
}


