function makeArr(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1)
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + (step * i));
  }
  return arr;
}
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
var title = null
var slider_prefix = null
var slider_suffix = null
var first_visible = true
var mode = 'lines+markers'
var dash = null
var data = new Array()
var first_visible = true
for (var i = 0; i < ts.length; i++) {
    data.push({
            mode : mode,
            visible : false,
            line : {color:'#00CED1', width:4, dash:dash},
            marker : {symbol:'star', size:12},
            name : labels[i],
            x : ts[i],
            y : sigs[i]})
}
data[1]['visible'] = true
if (first_visible) {
    data[0]['visible'] = true
    data[0]['mode'] = 'lines'
    data[0]['line'] = {color:'#000000', width:6}
}

var steps = new Array()
var slider_labels = new Array()
for (i = 0; i < sampling_intervals.length; i++) {
    slider_labels.push((i*dt).toString())
}
for (var i = 1; i < data.length; i++) {
    var falses = new Array(data.length).fill(false)
    var step = {method : 'restyle',
        args : ['visible',falses],
        label: slider_labels[i]
    }
    step['args'][1][i] = true
    if (first_visible) {
        step['args'][1][0] = true
    }
    steps.push(step)
}
console.log(steps)
var sliders = [{
    active : 0,
    currentvalue : {prefix: slider_prefix, suffix: slider_suffix},
    pad : {t: 50},
    steps : steps
}]

var layout = {sliders:sliders}
var fig = {data:data, layout:layout}

TEST2 = document.getElementById('plot1');
console.log(TEST2)
Plotly.newPlot(TEST2, fig, {showSendToCloud: true});