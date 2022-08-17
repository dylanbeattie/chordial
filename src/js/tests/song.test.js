import { describe, test, expect } from 'vitest'
import { Song } from '../song'

describe('song tests', () => {
    test('song works', () => {
        let song = new Song('TEST')
        expect(song.content).toBe('TEST')
    });
});
