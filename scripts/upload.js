// import {flesch} from 'https://esm.sh/flesch@2?bundle'
// import {syllable} from 'https://esm.sh/syllable@5?bundle'
// import {rate} from "./flesch-kincaid.js"

// document.getElementById('myFile').addEventListener('change', () => {
//     var plotElem = document.getElementById('text1');
//     plotElem.innerHTML = FleschKincaid.rate("I'm a little tea spot short and stout. Here is my handle, here is my spout")

// });

        // Function to extract text from PDF using PDF.js
        async function extractTextFromPDF(file) {
            const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
            let extractedText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                extractedText += `${pageText} `;
            }

            return extractedText;
        }

document.getElementById('myFile').addEventListener('change', async function(event) {
    event.preventDefault();

    document.getElementById('text1').textContent = `Flesch Reading Ease score: `;

    const pdfFile = document.getElementById('myFile').files[0];

    if (pdfFile) {
        const text = await extractTextFromPDF(pdfFile);
        const fleschScore = FleschKincaid.rate(text);

        document.getElementById('text1').textContent = `Flesch Reading Ease score: ${fleschScore.toFixed(2)}`;
    } else {
        document.getElementById('text1').textContent = 'Please upload a valid PDF file.';
    }
});


