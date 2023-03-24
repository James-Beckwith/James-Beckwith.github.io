export function makeArr(startValue, stopValue, cardinality) {
  var arr = [];
  var step = (stopValue - startValue) / (cardinality - 1)
  for (var i = 0; i < cardinality; i++) {
    arr.push(startValue + (step * i));
  }
  return arr;
}

export function plotting(ys, xs, labels, slider_labels, title=null, slider_prefix=null, slider_suffix=null, first_visible=true, mode='lines+markers', dash=null){
    var data = new Array()
    for (var i = 0; i < xs.length; i++) {
        data.push({
                mode : mode,
                visible : false,
                line : {color:'#00CED1', width:4, dash:dash},
                marker : {symbol:'star', size:12},
                name : labels[i],
                x : xs[i],
                y : ys[i]})
    }
    data[1]['visible'] = true
    if (first_visible) {
        data[0]['visible'] = true
        data[0]['mode'] = 'lines'
        data[0]['line'] = {color:'#000000', width:6}
    }
    
    var steps = new Array()
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
    var sliders = [{
        active : 0,
        currentvalue : {prefix: slider_prefix, suffix: slider_suffix},
        pad : {t: 50},
        steps : steps
    }]
    
    var layout = {sliders:sliders, title:{text:title}}
    var fig = {data:data, layout:layout}
    
    return fig
}
