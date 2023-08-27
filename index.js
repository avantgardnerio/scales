const canvas = document.getElementById("svgMain");
const ddTuning = document.getElementById("ddTuning");
const ddKey = document.getElementById("ddKey");
const ddScale = document.getElementById("ddScale");
const a4 = 440;

const strings = ddTuning.value.split(" ");
const key = ddKey.value;
const scale = ddScale.value.split(" ").map(n => parseInt(n));

const mandolinFrets = 20;
const guitarFrets = 19;

const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

const stringCnt = strings.length;
const fretCount = mandolinFrets;

const nutPos = 0;
const bridgeSaddlePos = 1000;
const scaleLen = bridgeSaddlePos - nutPos;

const fretPos = (fret) => scaleLen - (scaleLen / Math.pow(2, fret / 12));
const octave = (note) => parseInt(note.substring(note.length - 1));
const noteOnly = (note) => note.substring(0, note.length - 1);
const noteNum = (note) => notes.indexOf(note);
const num2name = (num) => `${notes[num % 12]}${Math.floor(num / 12)}`;

// strings
for(let string = 0; string < stringCnt; string++) {
    let y = string * 40 + 10;
    addLine(0, y, scaleLen, y);
}

// frets
for(let fret = 0; fret < fretCount; fret++) {
    let x = fretPos(fret);
    addLine(x, 10, x, stringCnt * 40 - 30);
}

// dots
addCircle((fretPos(4) + fretPos(5)) / 2, 70, 10)
addCircle((fretPos(6) + fretPos(7)) / 2, 70, 10)
addCircle((fretPos(9) + fretPos(10)) / 2, 70, 10)
addCircle((fretPos(11) + fretPos(12)) / 2, 30, 10)
addCircle((fretPos(11) + fretPos(12)) / 2, 110, 10)

// notes
for(let string = 0; string < stringCnt; string++) {
    const y = (stringCnt - string) * 40 - 25;
    let octaveNum = octave(strings[string]);
    let base = octaveNum * 12 + noteNum(noteOnly(strings[string]));
    for(let fret = 0; fret < fretCount; fret++) {
        let note = base + fret;
        if(!scale.includes((note - noteNum(key)) % 12)) {
            continue;
        }
        note = num2name(note);
        let x = fretPos(fret);
        addText(x, y, note);
    }
}

function addLine(x1, y1, x2, y2) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "grey");
    canvas.appendChild(line);
}

function addCircle(cx, cy, r) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    canvas.appendChild(circle);
}

function addText(x, y, text) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    node.setAttribute("x", x);
    node.setAttribute("y", y);
    node.innerHTML = text;
    canvas.appendChild(node);
}
