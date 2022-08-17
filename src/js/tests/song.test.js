import { describe, test, expect } from 'vitest'
import { Song } from '../song'
import { Chord } from '@tonaljs/tonal';

describe('Song parsing code', () => {
    test('extracts one beat for each line', () => {
        let lines = `A\n\nD\n\nE\n\nA\n`;
        var song = Song.parseLines(lines);
        expect(song.beats.length).toBe(8);
    });

    test('parse chords correctly', () => {
        let lines = `A
Ab
Bm
Cmaj7
E♭
F♯
`;

        var song = Song.parseLines(lines);
        expect(song.beats[0].chord).toMatchObject(Chord.get("A"));
        expect(song.beats[1].chord).toMatchObject(Chord.get("Ab"));
        expect(song.beats[2].chord).toMatchObject(Chord.get("Bm"));
        expect(song.beats[3].chord).toMatchObject(Chord.get("Cmaj7"));
        expect(song.beats[4].chord).toMatchObject(Chord.get("Eb"));
        // expect(song.beats[5].chord).toMatchObject(Chord.get("F#"));
    });
});
