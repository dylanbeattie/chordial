import '../css/style.scss'
import { Song } from './song.js';

var song = new Song(`A  hello
B world`);
document.querySelector('#app').innerHTML = song.content;
