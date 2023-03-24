import { makeArr,plotting } from "./utils.js"

var Nsamp = 2000.0
var dt = 0.01
var L = (Nsamp - 1.0) * dt
var t = makeArr(0,L,Nsamp)
var f = 1
var sig = t.map(x => Math.sin(x * 2 * Math.PI * f))
var sampling_intervals = makeArr(5, 400, 80)
var ts = []
var sigs = []
var labels = []
for (var i = 0; i < sampling_intervals.length; i++) {
    ts[i] = new Array()
    sigs[i] = new Array()
    step = sampling_intervals[i]
    labels.push('Measured Signal')
    for (var j = 0; j < t.length; j=j+step) {
        ts[i].push(t[j])
        sigs[i].push(sig[j])
    }
}

labels[0] = 'Sine wave'

plotting(sigs, ts, 'plot1',labels, slider_labels=labels, title='Sine Wave Slider', slider_prefix="Sampling interval: ", slider_suffix="ms", dash='longdash')
