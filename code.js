var pianoState = {};
var audioCtx;
var analyser;
var master;
var kickOscillator;
var kickGain;
var hatOscillator;
var hatGain;
var hatFilter;
var trackSource;
var trackGain;

var audio = new Audio();
audio.src = 'clap.mp3';
audio.controls = true;
audio.autoplay = false;

$(document).ready(function () {
    createPiano(12, onKeyPress, onKeyRelease);
});

function init() {
    // CREATE AUDIO NODES
    analyser = getAutioContext().createAnalyser();
    master = getAutioContext().createGain();
    kickOscillator = getAutioContext().createOscillator();
    kickGain = getAutioContext().createGain();
    hatOscillator = createWhiteNoise(getAutioContext());
    hatGain = getAutioContext().createGain();
    hatFilter = getAutioContext().createBiquadFilter();

    // INIT AUDIO NODES
    kickGain.gain.setValueAtTime(0, getAutioContext().currentTime);
    kickOscillator.type = 'triangle';
    kickOscillator.frequency.value = 60;
    kickOscillator.start(0);
    hatGain.gain.setValueAtTime(0, getAutioContext().currentTime);
    hatFilter.type = 'highpass';
    hatFilter.frequency.value = 15000;
    trackSource = getAutioContext().createMediaElementSource(audio);
    trackGain = getAutioContext().createGain();

    // CONNECT AUDIO NODES
    master.connect(analyser).connect(getAutioContext().destination);
    kickOscillator.connect(kickGain).connect(master);
    hatOscillator.connect(hatFilter).connect(hatGain).connect(master);
    trackSource.connect(trackGain).connect(master);

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
            oscillator2: getAutioContext().createOscillator(),
            gain1: getAutioContext().createGain(),
            gain2: getAutioContext().createGain()
        };

        state.oscillator1.start(0);
        state.oscillator2.start(0);
        state.gain1.gain.value = 0;
        state.gain2.gain.value = 0;

        state.oscillator1.connect(state.gain1);
        state.oscillator2.connect(state.gain2);
        state.gain1.connect(master);
        state.gain2.connect(master);

        pianoState[note] = state;
    }
    var oscillator1 = state.oscillator1;
    var oscillator2 = state.oscillator2;
    var gain1 = state.gain1;
    var gain2 = state.gain2;

    oscillator1.type = 'sawtooth';
    oscillator2.type = 'sawtooth';
    oscillator1.frequency.setValueAtTime(frequency, time);
    oscillator2.frequency.setValueAtTime(frequency, time);

    oscillator2.detune.setValueAtTime(0.0, time);
    oscillator2.detune.setTargetAtTime(frequency / 8, time, 1);
    gain1.gain.setTargetAtTime(0.5, time, 0.25);
    gain2.gain.setTargetAtTime(0.5, time, 0.25);

}

function onKeyRelease(key, note) {
    var time = getAutioContext().currentTime;
    var frequency = getFrequency(note);
    console.log('release', note, frequency);
    $("#key_" + key).removeClass("pressed");
    var state = pianoState[note];
    if (state) {
        state.gain1.gain.setTargetAtTime(0.0, time, 0.25);
        state.gain2.gain.setTargetAtTime(0.0, time, 0.25);
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

    hatGain.gain.setValueAtTime(1.0, time);
    hatGain.gain.setTargetAtTime(0.0, time, 0.2);
}

/* ============ */
/* CLAP SECTION */
/* ============ */

function clap() {
    var time = getAutioContext().currentTime;
    console.log('clap');

    audio.play();
}
