import { Renderer } from './renderer';
import { Beat, Song } from './song';

export class ChordialEditor extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.addEventListener("keydown", this.keydown.bind(this));
    }
    connectedCallback() {
        this.renderer = new Renderer(this, this.shadow);
        this.song = Song.SillyGames;
        this.updateView();
    }

    updateView() {
        document.getElementById("ascii-chart").innerHTML = this.song.asciify();
        document.getElementById('tab-chart').value = this.renderer.renderTextForPremiere(this.song);
        this.renderer.render(this.song)
    }

    updateBeat(index, chord, lyric) {
        if (this.song.updateBeat(index,chord,lyric)) this.updateView();
    }

    keydown(event) {
        console.log(event.code);
        switch (event.code) {
            case "ArrowUp": this.renderer.moveFocusUp(); break;
            case "ArrowDown": this.renderer.moveFocusDown(); break;
            case "Tab":
                if (event.shiftKey) {
                    this.renderer.moveFocusLeft();
                } else {
                    console.log(this.renderer.beatIndex + 1);
                    console.log(this.song.beats.length);
                    if (this.renderer.beatIndex + 1 == this.song.beats.length) this.song.appendBeat();
                    this.renderer.moveFocusRight();
                }
                event.preventDefault();
                break;
            case "ArrowLeft":
                this.renderer.moveFocusLeft();
                event.preventDefault();
                break;
            case "ArrowRight":
                if (this.renderer.beatIndex + 1 == this.song.beats.length) this.song.appendBeat();
                this.renderer.moveFocusRight();
                break;
            case "Insert":
                this.song.insertBeat(this.renderer.index, "Bb", "woo!");
                event.preventDefault();
                break;
            case "Delete":
                if (event.ctrlKey || event.metaKey) {
                    this.song.removeBeat(this.renderer.index);
                    this.renderer.index -= 1;
                    event.preventDefault();
                }
                break;
            default:
                return;

        }
        this.updateView();
    }
}

customElements.define("chordial-editor", ChordialEditor);