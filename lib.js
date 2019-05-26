var frequencies = [
    {"n": "C0", "f": 16.35},
    {"n": "C#0", "f": 17.32},
    {"n": "D0", "f": 18.35},
    {"n": "D#0", "f": 19.45},
    {"n": "E0", "f": 20.60},
    {"n": "F0", "f": 21.83},
    {"n": "F#0", "f": 23.12},
    {"n": "G0", "f": 24.50},
    {"n": "G#0", "f": 25.96},
    {"n": "A0", "f": 27.50},
    {"n": "A#0", "f": 29.14},
    {"n": "B0", "f": 30.87},
    {"n": "C1", "f": 32.70},
    {"n": "C#1", "f": 34.65},
    {"n": "D1", "f": 36.71},
    {"n": "D#1", "f": 38.89},
    {"n": "E1", "f": 41.20},
    {"n": "F1", "f": 43.65},
    {"n": "F#1", "f": 46.25},
    {"n": "G1", "f": 49.00},
    {"n": "G#1", "f": 51.91},
    {"n": "A1", "f": 55.00},
    {"n": "A#1", "f": 58.27},
    {"n": "B1", "f": 61.74},
    {"n": "C2", "f": 65.41},
    {"n": "C#2", "f": 69.30},
    {"n": "D2", "f": 73.42},
    {"n": "D#2", "f": 77.78},
    {"n": "E2", "f": 82.41},
    {"n": "F2", "f": 87.31},
    {"n": "F#2", "f": 92.50},
    {"n": "G2", "f": 98.00},
    {"n": "G#2", "f": 103.83},
    {"n": "A2", "f": 110.00},
    {"n": "A#2", "f": 116.54},
    {"n": "B2", "f": 123.47},
    {"n": "C3", "f": 130.81},
    {"n": "C#3", "f": 138.59},
    {"n": "D3", "f": 146.83},
    {"n": "D#3", "f": 155.56},
    {"n": "E3", "f": 164.81},
    {"n": "F3", "f": 174.61},
    {"n": "F#3", "f": 185.00},
    {"n": "G3", "f": 196.00},
    {"n": "G#3", "f": 207.65},
    {"n": "A3", "f": 220.00},
    {"n": "A#3", "f": 233.08},
    {"n": "B3", "f": 246.94},
    {"n": "C4", "f": 261.63},
    {"n": "C#4", "f": 277.18},
    {"n": "D4", "f": 293.66},
    {"n": "D#4", "f": 311.13},
    {"n": "E4", "f": 329.63},
    {"n": "F4", "f": 349.23},
    {"n": "F#4", "f": 369.99},
    {"n": "G4", "f": 392.00},
    {"n": "G#4", "f": 415.30},
    {"n": "A4", "f": 440.00},
    {"n": "A#4", "f": 466.16},
    {"n": "B4", "f": 493.88},
    {"n": "C5", "f": 523.25},
    {"n": "C#5", "f": 554.37},
    {"n": "D5", "f": 587.33},
    {"n": "D#5", "f": 622.25},
    {"n": "E5", "f": 659.26},
    {"n": "F5", "f": 698.46},
    {"n": "F#5", "f": 739.99},
    {"n": "G5", "f": 783.99},
    {"n": "G#5", "f": 830.61},
    {"n": "A5", "f": 880.00},
    {"n": "A#5", "f": 932.33},
    {"n": "B5", "f": 987.77},
    {"n": "C6", "f": 1046.50},
    {"n": "C#6", "f": 1108.73},
    {"n": "D6", "f": 1174.66},
    {"n": "D#6", "f": 1244.51},
    {"n": "E6", "f": 1318.51},
    {"n": "F6", "f": 1396.91},
    {"n": "F#6", "f": 1479.98},
    {"n": "G6", "f": 1567.98},
    {"n": "G#6", "f": 1661.22},
    {"n": "A6", "f": 1760.00},
    {"n": "A#6", "f": 1864.66},
    {"n": "B6", "f": 1975.53},
    {"n": "C7", "f": 2093.00},
    {"n": "C#7", "f": 2217.46},
    {"n": "D7", "f": 2349.32},
    {"n": "D#7", "f": 2489.02},
    {"n": "E7", "f": 2637.02},
    {"n": "F7", "f": 2793.83},
    {"n": "F#7", "f": 2959.96},
    {"n": "G7", "f": 3135.96},
    {"n": "G#7", "f": 3322.44},
    {"n": "A7", "f": 3520.00},
    {"n": "A#7", "f": 3729.31},
    {"n": "B7", "f": 3951.07},
    {"n": "C8", "f": 4186.01},
    {"n": "C#8", "f": 4434.92},
    {"n": "D8", "f": 4698.64},
    {"n": "D#8", "f": 4978.03}
];

function getFrequency(index) {
    var inside = index >= 0 && index < frequencies.length;
    return inside ? frequencies[index].f : 0;
}

function buildPianoKey(index) {
    var remainder = index % 12;
    var isBlack = remainder == 1 || remainder == 3 || remainder == 6 || remainder == 8 || remainder == 10;
    var clazz = isBlack ? 'black' : 'white';
    clazz += ' n' + remainder + (isBlack ? 's' : '');
    return $('<li id="key_' + index + '" class="' + clazz + '"></li>');
}

var keyState = {};
var currentPressedNote = -1;
var octave = 4;

function increaseOctave() {
    ++octave;
}

function decreaseOctave() {
    --octave;
}

function unpressCurrentKey(release) {
    if (currentPressedNote != -1) {
        release(currentPressedNote, currentPressedNote + octave * 12);
        currentPressedNote = -1;
    }
}

var leftButtonDown = false;
var keys = [65, 87, 83, 69, 68, 82, 70, 71, 89, 72, 85, 74];

function createPiano(notes, press, release) {
    $('input[type=checkbox]').removeAttr('checked');
    $("#piano").html('');
    for (var i = 0; i < notes; ++i) {
        var element = buildPianoKey(i);

        element.mousedown((function (_i) {
            return function () {
                if (currentPressedNote != _i) {
                    unpressCurrentKey(_i);
                }
                currentPressedNote = _i;
                press(_i, _i + octave * 12);
            };
        })(i));

        element.mouseover((function (_i) {
            return function () {
                if (currentPressedNote != _i) {
                    unpressCurrentKey(_i);
                }
                if (leftButtonDown) {
                    currentPressedNote = _i;
                    press(_i, _i + octave * 12);
                }
            };
        })(i));
        $("#piano").append(element);
    }

    $(document).mousedown(function (e) {
        // Left mouse button was pressed, set flag
        if (e.which === 1) {
            leftButtonDown = true;
        }
    });
    $(document).mouseup(function (e) {
        // Left mouse button was released, clear flag
        if (e.which === 1) {
            leftButtonDown = false;
        }
        unpressCurrentKey(release);
    });

    $(document).keydown(function (e) {
        var code = e.keyCode || e.which;
        var i = keys.indexOf(code);
        var s = keyState[code];

        if (i >= 0 && !s) {
            keyState[code] = true;
            press(i, i + octave * 12);
        }
    });

    $(document).keyup(function (e) {
        var code = e.keyCode || e.which;
        var i = keys.indexOf(code);
        if (i >= 0) {
            keyState[code] = false;
            release(i, i + octave * 12);
        }
    });

    $(document).mouseout(function () {
        unpressCurrentKey(release);
    });

    initMidi(press, release);
}

function createWhiteNoise(audioContext) {
    var bufferSize = 4096;
    var whiteNoise = audioContext.createScriptProcessor(bufferSize, 1, 1);
    whiteNoise.onaudioprocess = function (e) {
        var output = e.outputBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
    }
    return whiteNoise;
}

var freqCanvas = null;
var dataCanvas = null;
var freqArray = null;
var dataArray = null;

function initCharts(analyser) {
    freqCanvas = document.getElementById("freqCanvas");
    dataCanvas = document.getElementById("dataCanvas");
    freqArray = new Uint8Array(analyser.frequencyBinCount);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
}

function updateCharts(analyser) {
    analyser.getByteFrequencyData(freqArray);
    analyser.getByteTimeDomainData(dataArray);
}


function drawArrayToCanvas(ctx, canvas, array) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (var x = 0; x < array.length; x++) {
        var px = x / array.length;
        var py = 1 - array[x] / 255;
        var dx = px * freqCanvas.width;
        var dy = py * freqCanvas.height;
        if (x == 0) {
            ctx.moveTo(dx, dy);
        } else {
            ctx.lineTo(dx, dy);
        }
    }
    ctx.stroke();
}

function drawCharts() {
    var freqCtx = freqCanvas.getContext("2d");
    var dataCtx = dataCanvas.getContext("2d");

    freqCtx.lineWidth = 2;
    freqCtx.strokeStyle = "#FFFFFF";
    dataCtx.lineWidth = 2;
    dataCtx.strokeStyle = "#FFFFFF";

    drawArrayToCanvas(freqCtx, freqCanvas, freqArray);
    drawArrayToCanvas(dataCtx, dataCanvas, dataArray);
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
}

var AudioContext = window.AudioContext || window.webkitAudioContext;


function initMidi(press, release) {

    function onMIDISuccess(midiAccess) {
        for (var input of midiAccess.inputs.values()) {
            input.onmidimessage = getMIDIMessage;
        }
    }

    function getMIDIMessage(message) {
        var command = message.data[0];
        var note = message.data[1];
        var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command
        console.log(message);
        switch (command) {
            case 144: // noteOn
                if (velocity > 0) {
                    press(note % 12, note);
                } else {
                    release(note % 12, note);
                }
                break;
            case 128: // noteOff
                release(note % 12, note);
                break;
            // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
        }
    }

    function onMIDIFailure() {
        console.log('Could not access your MIDI devices.');
    }


    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
            .then(onMIDISuccess, onMIDIFailure);

    } else {
        console.log('WebMIDI is not supported in this browser.');
    }
}
