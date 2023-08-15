import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const generatePDF = async (sectionId) => {
  const pdf = new jsPDF('p', 'mm', 'a4'); // Create a PDF with A4 dimensions

  const sectionElement = document.getElementById(sectionId);
  if (!sectionElement) {
    console.error(`Element with ID '${sectionId}' not found.`);
    return;
  }

  const canvas = await html2canvas(sectionElement);
  const canvasDataUrl = canvas.toDataURL('image/png');

  // Calculate scale to fit content on A4 page
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const canvasAspectRatio = canvas.width / canvas.height;
  const pdfAspectRatio = pdfWidth / pdfHeight;

  let scale = 1;
  if (canvasAspectRatio > pdfAspectRatio) {
    scale = pdfWidth / canvas.width;
  } else {
    scale = pdfHeight / canvas.height;
  }

  const scaledWidth = canvas.width * scale;
  const scaledHeight = canvas.height * scale;

  // Add the scaled canvas image to the PDF
  pdf.addImage(canvasDataUrl, 'PNG', 0, 0, scaledWidth, scaledHeight);

  pdf.save('section_data.pdf');
};

export { generatePDF };
