
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (elementId: string, fileName: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento não encontrado');
    }

    // Configurar o elemento para melhor qualidade do PDF
    const originalStyle = element.style.cssText;
    element.style.cssText = `
      ${originalStyle}
      background: white;
      padding: 20px;
      box-shadow: none;
    `;

    // Gerar o canvas do elemento
    const canvas = await html2canvas(element, {
      scale: 2, // Aumentar a qualidade
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight
    });

    // Restaurar o estilo original
    element.style.cssText = originalStyle;

    // Criar o PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Calcular dimensões para caber na página A4
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20; // Margem de 10mm de cada lado
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10; // Margem superior

    // Adicionar a primeira página
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight - 20; // Subtrair margens

    // Adicionar páginas extras se necessário
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 20;
    }

    // Fazer o download
    pdf.save(`${fileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
};
