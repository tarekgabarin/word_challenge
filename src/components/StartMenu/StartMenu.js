import React, {Component} from 'react';

class StartMenu extends Component {
    render() {
        return (
            <div>
                <h1>Start Typing Test</h1>
                <select className="select-css">
                    <option>This is a native select element</option>
                    <option>Apples</option>
                    <option>Bananas</option>
                    <option>Grapes</option>
                    <option>Oranges</option>
                </select>
            </div>
        );
    }
}

export default StartMenu;