import { makeArr,plotting } from "./utils.js"

var Nsamp = 500.0
var dt = 0.01
var L = (Nsamp - 1.0) * dt
var t = makeArr(0,L,Nsamp)
var f = 1
var sig = t.map(x => Math.sin(x * 2 * Math.PI * f))
var sampling_intervals = makeArr(5, 100, 20)
var ts = []
var sigs = []
var labels = []
var step = 1
var slider_labels = new Array()
for (var i = 0; i < sampling_intervals.length; i++) {
    ts[i] = new Array()
    sigs[i] = new Array()
    step = sampling_intervals[i]
    labels.push('Measured Signal')
    slider_labels.push((step*dt).toString())
    for (var j = 0; j < t.length; j=j+step) {
        ts[i].push(t[j])
        sigs[i].push(sig[j])
    }
}

labels[0] = 'Sine wave'
var fig = plotting(sigs, ts, labels, slider_labels, 'Sine Wave Slider', "Sampling interval: ", "s", true, 'lines+markers', 'longdash')
var plotElem = document.getElementById('plot1');
Plotly.newPlot(plotElem, fig, {showSendToCloud: true});

sig = t.map(x => Math.sin(x * 2 * Math.PI * f + 0.5)) 
for (var i = 0; i < sampling_intervals.length; i++) {
    sigs[i] = new Array()
    step = sampling_intervals[i]
    for (var j = 0; j < t.length; j=j+step) {
            sigs[i].push(sig[j])
        }
    }

var fig = plotting(sigs, ts, labels, slider_labels, 'Sine Wave Slider', "Sampling interval: ", "s", true, 'lines+markers', 'longdash')
var plotElem = document.getElementById('plot2');
Plotly.newPlot(plotElem, fig, {showSendToCloud: true});
