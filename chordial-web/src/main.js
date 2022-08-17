import './style.scss'
// import typescriptLogo from './typescript.svg'
// import { setupCounter } from './counter'
// import { ChordDetect } from "@tonaljs/tonal";

const NOTE_ON = 144
const NOTE_OFF = 128
navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure)
function onMIDISuccess(midiAccess: { inputs: any }) {
  var inputs = midiAccess.inputs
  inputs.forEach(
    (input: { onmidimessage: (midiMessage: any) => void; name: any }) => {
      input.onmidimessage = handleMidiMessage
    },
  )
}

document.addEventListener('keydown', (evt) => {
  console.log(evt)
});
document.addEventListener('click', function(evt) {
  if (evt.target.tagName == 'SPAN' && evt.target.className == 'chord') {
    document.querySelectorAll("span.chord").forEach(span => span.classList.remove("current"));
    evt.target.classList.add("current");
    console.log(evt);
    console.log(evt.target.innerText);
    var chord = Tonal.Chord.get(evt.target.innerText);
    console.log(chord);
  }
});

var notes = new Array()
function handleMidiMessage(midiMessage: any) {
  var type = midiMessage.data[0]
  var note = midiMessage.data[1]
  switch (type) {
    case NOTE_ON:
      notes.push(note)
      notes.sort()
      updateChord()
      break
    case NOTE_OFF:
      notes = notes.filter((n) => n == note)
      break
  }
}

function updateChord() {
  var chord = Tonal.Chord.detect(notes.map(Tonal.Note.fromMidi))
  console.log(chord)
  document.querySelector('div.beat:last-child').innerText = format(chord[0])
}

function onMIDIFailure() {
  console.log('Could not access your MIDI devices.')
}
function format(chordName) {
  if (!(chordName && chordName.replace)) return '?'
  var replacements = {
    '-': '',
    Mb5: 'dim',
    b: '♭',
    '#': '♯',
    M: '',
  }
  for (var pattern in replacements) {
    chordName = chordName.replace(pattern, replacements[pattern])
  }
  return chordName
}
var chords = document.querySelectorAll('div.chord')
;[...chords].forEach((div) => {
  div.innerText = format(div.innerText)
})

loadFileFromServer('silly_games.txt').then((data) => parseChart(data))

function parseChart(data: unknown) {
  var chart = document.getElementById('chart')
  chart.innerHTML = '';
  let lines = data.split('\n')
  lines.forEach((line) => {
    let [chord, lyric] = line.split(/ *\t *|   +/, 2)
    let div = document.createElement('div')
    div.className = 'beat'
    let chordSpan = document.createElement('span')
    chordSpan.className = 'chord'
    chordSpan.innerText = format(chord)
    div.appendChild(chordSpan)
    let lyricSpan = document.createElement('span')
    lyricSpan.className = 'lyric'
    lyricSpan.innerHTML = (lyric ?? ' ');
    div.appendChild(lyricSpan)
    chart?.appendChild(div)
  })
}

function loadFileFromServer(path) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', path)
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject(xhr.statusText)
      }
    }
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  })
}
