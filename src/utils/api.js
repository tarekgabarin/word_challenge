import axios from 'axios';
import config from './config.js'

export function getWord() {
    return axios.get('https://random-word-api.netlify.com/.netlify/functions/word?key=foobar');
}