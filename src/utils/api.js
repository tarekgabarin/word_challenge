import axios from 'axios';


export function getWord() {
    return axios.get('https://random-word-api.netlify.com/.netlify/functions/word?key=foobar');
}
