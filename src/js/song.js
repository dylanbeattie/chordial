import { Chord } from '@tonaljs/tonal';

class Beat {
    uglify = chordName => chordName.replace(/♭/g, 'b').replace(/♯/g, '#');
    
    constructor(chord, lyric) {
        this.chord = Chord.get(this.uglify(chord ?? ""));
        this.lyric = lyric ?? "";
    }
}

class Song {
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