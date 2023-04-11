import axios from 'axios';


export function getWord() {
    return axios.get('https://random-word-api.herokuapp.com/word');
}
