var audioCtx;
var analyser;

$(document).ready(function () {
    createPiano(12, onKeyPress, onKeyRelease);
});

function init() {
    // CREATE AUDIO NODES
    // TODO

    // INIT AUDIO NODES
    // TODO

    // CONNECT AUDIO NODES
    // TODO

    if (analyser) {
        initCharts(analyser);
    }
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

    // TODO
}

function onKeyRelease(key, note) {
    var time = getAutioContext().currentTime;
    var frequency = getFrequency(note);
    console.log('release', note, frequency);
    $("#key_" + key).removeClass("pressed");

    // TODO
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

    // TODO
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
