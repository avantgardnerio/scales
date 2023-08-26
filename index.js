const canvas = document.getElementById("svgMain");
const a4 = 440;

const irishTenor = ["G", "D", "A", "E"];
const guitarStrings = ["E", "A", "D", "G", "B"];
const mandolinFrets = 20;
const guitarFrets = 19;

const majorScale = [0, 2, 4, 5, 7, 9, 11];
const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

const stringCnt = irishTenor.length;
const fretCount = mandolinFrets;

const nutPos = 0;
const bridgeSaddlePos = 1000;
const scaleLen = bridgeSaddlePos - nutPos;
const fretPos = (fret) => scaleLen - (scaleLen / Math.pow(2, fret / 12));

for(let string = 0; string < stringCnt; string++) {
    let y = string * 40 + 10;
    addLine(0, y, scaleLen, y);
}

for(let fret = 0; fret < fretCount; fret++) {
    let x = fretPos(fret);
    addLine(x, 10, x, 130);
}

// irish tenor
addCircle((fretPos(4) + fretPos(5)) / 2, 70, 10)
addCircle((fretPos(6) + fretPos(7)) / 2, 70, 10)
addCircle((fretPos(9) + fretPos(10)) / 2, 70, 10)
addCircle((fretPos(11) + fretPos(12)) / 2, 30, 10)
addCircle((fretPos(11) + fretPos(12)) / 2, 110, 10)

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
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    line.setAttribute("cx", cx);
    line.setAttribute("cy", cy);
    line.setAttribute("r", r);
    canvas.appendChild(line);
}
