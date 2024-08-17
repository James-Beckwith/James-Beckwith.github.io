function processTextContent(textContent) {
    var count = 0;
    var totalFont = 0;
    var text = '';
    textContent.items.forEach(item => {
        // extract text
        text += item.str + ' ';

        // The transform property provides the matrix for scaling and transforming the text
        const transform = item.transform;
      
        // The vertical scaling factor is typically found at transform[3]
        totalFont += Math.sqrt(transform[0] ** 2 + transform[1] ** 2);
        count++;
    });
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
        // const pageText = textContent.items.map(item => item.str).join(' ');
        const [pageText, fontSize] = processTextContent(textContent);
        AvgFontSize += fontSize;
        count++;
        extractedText += `${pageText} `;
    }

    return [extractedText, pdf.numPages, AvgFontSize/count];
}

document.getElementById('myFile').addEventListener('change', async function(event) {
    event.preventDefault();

    // reset results box
    document.getElementById('text1').innerHTML = '';

    // get number of files to process
    var N = document.getElementById('myFile').files.length

    for (let i = 0; i<N; i++){
        const pdfFile = document.getElementById('myFile').files[i];

        if (pdfFile) {
            const [text, numPages, FontSize] = await extractTextFromPDF(pdfFile);
            const fleschScore = FleschKincaid.rate(text);
            document.getElementById('text1').innerHTML += `Flesch Reading Ease score: ${fleschScore.toFixed(2)}, npages: ${numPages}, average font size: ${FontSize.toFixed(2)}<br>`;
        } else {
            document.getElementById('text1').innerHTML += 'Please upload a valid PDF file.<br>';
        }
    }
});


