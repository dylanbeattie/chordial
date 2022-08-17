import '../css/style.scss'
import { Song } from './song.js';

var song = Song.parseLines(`A  hello
B world`);
document.querySelector('#app').innerHTML = song.beats.map(beat => beat.chord.name).join('/');
