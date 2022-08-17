import { Chord } from '@tonaljs/tonal';

class Beat {
    uglify = chordName => chordName.replace(/♭/g, 'b').replace(/♯/g, '#');
    
    constructor(chord, lyric) {
        this.chord = Chord.get(this.uglify(chord ?? ""));
        this.lyric = lyric ?? "";
    }
}

class Song {
    constructor() {
        this.beats = new Array();
    }
    insertBeat(index, chord, lyric) {
        this.beats.splice(index, 0, new Beat(chord, lyric));
    }
    appendBeat(chord, lyric) {
        this.beats.push(new Beat(chord, lyric))
    }
    removeBeat(index) {
        this.beats.splice(index, 1);
    }
    static parseLines(lines) {
        let song = new Song();
        song.beats = lines.split(/\r?\n/).map(line => {
            let [chord, lyric] = line.split(/[ \t]+/, 2);
            return new Beat(chord, lyric);
        });
        return song; 
    }
}

export { Song };