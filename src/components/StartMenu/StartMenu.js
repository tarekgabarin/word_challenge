import React, {Component} from 'react';

class StartMenu extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Start Typing Test</h1>
                </div>
                <div className="styled-select semi-square" >
                    <select>
                        <option>1 minute</option>
                        <option>2 minutes</option>
                        <option>3 minutes</option>
                        <option>4 minutes</option>
                        <option>5 minutes</option>
                    </select>
                </div>

                <div className="styled-button">
                    <button className={'rounded'} >
                        Start
                    </button>
                </div>


            </div>
        );
    }
}

export default StartMenu;