import React, {Component} from 'react';
import './StartMenu.css'

class StartMenu extends Component {
    render() {
        return (
            <div>
                <h1>Start Typing Test</h1>

                <div className="styled-select semi-square" >
                    <select>
                        <option>1 minute</option>
                        <option>2 minutes</option>
                        <option>3 minutes</option>
                        <option>4 minutes</option>
                        <option>5 minutes</option>
                    </select>
                </div>


            </div>
        );
    }
}

export default StartMenu;