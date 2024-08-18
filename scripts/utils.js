export function clearTable(tableid) {
    var table = document.getElementById(tableid);
    var rowCount = table.rows.length;
    for (var i = 1; i < rowCount; i++) {
        table.deleteRow(1);
    }
}

export function tableCreate(tableid, dataDict, csvString) {
    // get table element
    const tbl = document.getElementById(tableid)
    
    // clear table
    tbl.innerHTML = ''

    // add headers to CSV string
    csvString = Object.keys(dataDict).join(',') + '\n'

    const theadr = tbl.insertRow();

    for (const key in dataDict){
        const this_cell = theadr.insertCell();
        this_cell.outerHTML = '<th>' + key + '</th>';
    }
    for (let i = 0; i < dataDict[Object.keys(dataDict)[0]].length; i++) {
        const tr = tbl.insertRow();
        for (const key in dataDict) {
            const td = tr.insertCell();
            var cell_out = dataDict[key][i];
            if (typeof(cell_out)==='number'){
                cell_out = cell_out.toFixed(2);
            }
            td.innerHTML = cell_out
            csvString += cell_out + ',';
      }
      // remove last comma
      csvString = csvString.substring(0, csvString.length - 1);

      csvString += '\n';
    }
    return csvString
  }

export function downloadCSVFile(csv_data, filename) {
    // Modified from: https://www.geeksforgeeks.org/how-to-export-html-table-to-csv-using-javascript/
    // Create CSV file object and feed our
    // csv_data into it
    const CSVFile = new Blob([csv_data], { type: "text/csv" });

    // Create to temporary link to initiate
    // download process
    let temp_link = document.createElement('a');

    // Download csv file
    temp_link.download = filename;
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to trigger download 
    temp_link.click();
    document.body.removeChild(temp_link);
}
  
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
