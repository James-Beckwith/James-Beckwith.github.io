import { makeArr,plotting } from "./utils.js"

var short_time = makeArr(-1.5,1.5,101)
var FNyq = 1/(2*(short_time[1] - short_time[0]))
var freq_interval = 0.01
var freqs = makeArr(freq_interval, FNyq+freq_interval, Math.ceil(FNyq/freq_interval))
var evr = 50
var combined_signal = new Array(short_time.length).fill(0);
var ys_cos = []
var leg_cos = []
var count = 0
for (var j = 0; j < freqs.length; j++){
    if (j % evr == 0) {
        leg_cos.push((Math.round(freqs[j]*100)/100).toString())
        ys_cos[count] = new Array()
        count++
    }
    for (var i = 0; i < short_time.length; i++) {
        combined_signal[i] += Math.cos(2 * Math.PI * freqs[j] * short_time[i])
        if (j == 0) {
            ys_cos[count-1].push(combined_signal[i])
        }
        else if (j % evr == 0) {
            ys_cos[count-1].push(combined_signal[i]/j)
        }
    }
}
j--

if (j-1 % evr != 0) {
    ys_cos[count] = new Array()
    for (var i = 0; i < short_time.length; i++) {
        ys_cos[count].push(combined_signal[i]/j)
    }
    leg_cos.push((Math.round(freqs[j]*100)/100).toString())
}

var ts_cos = []
for (i = 0; i < ys_cos.length; i++) {
    ts_cos[i] = short_time
}

var fig = plotting(ys_cos, ts_cos, leg_cos, leg_cos, 'Building a spike', "Sum of frequencies to: ", "Hz", false, 'lines')

var plotElem = document.getElementById('plot3');
Plotly.newPlot(plotElem, fig, {showSendToCloud: true});