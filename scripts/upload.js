import { stitchLines } from "./nlp_utils.js";
import { tableCreate, downloadCSVFile, clearTable } from "./utils.js"

// create a variable to store the CSV data
var csvString = ''
var dataDict = {}

function processTextContent(textContent) {
    // function to extract text and calculate average font size over all lines of text
    var count = 0;
    var totalFont = 0;
    var lines = [];
    textContent.items.forEach(item => {
        // extract text
        // text += item.str + ' ';
        lines.push(item.str)

        // The transform property provides the matrix for scaling and transforming the text
        const transform = item.transform;
      
        // The vertical scaling factor is typically found at transform[3]
        totalFont += Math.sqrt(transform[0] ** 2 + transform[1] ** 2);
        count++;
    });

    //!TODO - stop and think; do we need to do this if each line doesn't contain a new line character? 
    // stitch together text into sentences  
    text = stitchLines(lines)

    return [text, totalFont/count]
  }
  
// Function to extract text from PDF using PDF.js
async function extractTextFromPDF(file) {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
    let extractedText = '';

    var AvgFontSize = 0;
    var count = 0;
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const [pageText, fontSize] = processTextContent(textContent);
        AvgFontSize += fontSize;
        count++;
        extractedText += `${pageText} `;
    }

    // get Flesch score
    const fleschScore = FleschKincaid.rate(extractedText);

    // add current analytics to data dictionary
    let output = {'Number of Pages':pdf.numPages, 'Average Font Size': AvgFontSize/count, 'Flesch Score':fleschScore};
    for (const item in output) {
        if (item in dataDict) {
            dataDict[item].push(output[item])
        } else {
            dataDict[item] = [output[item]]
        }
    }
}

document.getElementById('myFile').addEventListener('change', async function(event) {
    event.preventDefault();

    // reset results box
    document.getElementById('text1').innerHTML = '';

    // get number of files to process
    var N = document.getElementById('myFile').files.length

    // loop through all files
    for (let i = 0; i<N; i++){
        const pdfFile = document.getElementById('myFile').files[i];

        if (pdfFile) {
            // add file to data dictionary
            if ('File' in dataDict) {
                dataDict['File'].push(pdfFile.name)
            } else {
                dataDict['File'] = [pdfFile.name]
            }
            // extract and process text
            await extractTextFromPDF(pdfFile);
        } else {
            document.getElementById('text1').innerHTML += 'Please upload a valid PDF file.<br>';
        }
    }
    // create table
    csvString = tableCreate('table1', dataDict, csvString)
});

document.getElementById('download1').addEventListener('click', async function(event) {
    downloadCSVFile(csvString, 'temp.csv')
});

document.getElementById('clear1').addEventListener('click', async function(event) {
    csvString = ''
    dataDict = {}
    clearTable('table1')
});