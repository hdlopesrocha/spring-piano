var pianoState = {};
var audioCtx;
var analyser;
var master;
var kickOscillator;
var kickGain;

$(document).ready(function () {
    createPiano(12, onKeyPress, onKeyRelease);
});

function init() {
    // CREATE AUDIO NODES
    analyser = getAutioContext().createAnalyser();
    master = getAutioContext().createGain();
    kickOscillator = getAutioContext().createOscillator();
    kickGain = getAutioContext().createGain();

    // INIT AUDIO NODES
    kickGain.gain.setValueAtTime(0, getAutioContext().currentTime);
    kickOscillator.type = 'triangle';
    kickOscillator.frequency.value = 60;
    kickOscillator.start(0);

    // CONNECT AUDIO NODES
    master.connect(analyser).connect(getAutioContext().destination);
    kickOscillator.connect(kickGain).connect(master);

    initCharts(analyser);
    window.requestAnimationFrame(loop);
}

function getAutioContext() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
        init();
    }
    return audioCtx;
}

function loop() {
    if (analyser) {
        updateCharts(analyser);
        drawCharts();
    }
    window.requestAnimationFrame(loop);
}

/* ============= */
/* PIANO SECTION */
/* ============= */

function onKeyPress(key, note) {
    var time = getAutioContext().currentTime;
    var frequency = getFrequency(note);
    console.log('press', note, frequency);
    $("#key_" + key).addClass("pressed");

    var state = pianoState[note];
    if (!state) {
        var state = {
            oscillator1: getAutioContext().createOscillator(),
            gain1: getAutioContext().createGain()
        };

        state.oscillator1.start(0);
        state.gain1.gain.value = 0;

        state.oscillator1.connect(state.gain1);
        state.gain1.connect(master);

        pianoState[note] = state;
    }
    var oscillator1 = state.oscillator1;
    var gain1 = state.gain1;

    oscillator1.frequency.setValueAtTime(frequency, time);
    gain1.gain.setTargetAtTime(1.0, time, 0.25);
}

function onKeyRelease(key, note) {
    var time = getAutioContext().currentTime;
    var frequency = getFrequency(note);
    console.log('release', note, frequency);
    $("#key_" + key).removeClass("pressed");

    var state = pianoState[note];
    if (state) {
        console.log('release', time, key, note, frequency);
        var time = getAutioContext().currentTime;
        state.gain1.gain.setTargetAtTime(0.0, time, 0.25);
    }
}

/* ============ */
/* ECHO SECTION */
/* ============ */

function toggleEcho() {
    var time = getAutioContext().currentTime;
    console.log('echo');

    // TODO
}

/* ============ */
/* KICK SECTION */
/* ============ */

function kick() {
    var time = getAutioContext().currentTime;
    console.log('kick');

    kickGain.gain.setValueAtTime(1.0, time);
    kickGain.gain.setTargetAtTime(0.0, time, 0.5);
}

/* =========== */
/* HAT SECTION */
/* =========== */

function hat() {
    var time = getAutioContext().currentTime;
    console.log('hat');

    // TODO
}

/* ============ */
/* CLAP SECTION */
/* ============ */

function clap() {
    var time = getAutioContext().currentTime;
    console.log('clap');

    // TODO
}
