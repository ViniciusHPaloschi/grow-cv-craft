
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (elementId: string, fileName: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento não encontrado');
    }

    // Configurar o elemento para melhor renderização
    const originalStyle = element.style.cssText;
    element.style.cssText = `
      ${originalStyle}
      background: white;
      padding: 0;
      margin: 0;
      box-shadow: none;
      width: 794px !important;
      min-height: auto;
    `;

    // Forçar re-render do elemento
    element.offsetHeight;

    // Gerar o canvas com configurações otimizadas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 794, // Largura A4 em pixels (210mm * 3.78)
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794,
      windowHeight: element.scrollHeight
    });

    // Restaurar o estilo original
    element.style.cssText = originalStyle;

    // Criar o PDF
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Dimensões da página A4
    const pageWidth = 210; // mm
    const pageHeight = 297; // mm
    const margin = 5; // mm
    const imgWidth = pageWidth - (margin * 2);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Se a imagem cabe em uma página
    if (imgHeight <= pageHeight - (margin * 2)) {
      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
    } else {
      // Múltiplas páginas - dividir o conteúdo
      const pageContentHeight = pageHeight - (margin * 2);
      const totalPages = Math.ceil(imgHeight / pageContentHeight);
      
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        const sourceY = i * (canvas.height / totalPages);
        const sourceHeight = canvas.height / totalPages;
        
        // Criar um canvas temporário para esta página
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sourceHeight;
        const pageCtx = pageCanvas.getContext('2d');
        
        if (pageCtx) {
          pageCtx.drawImage(
            canvas,
            0, sourceY, canvas.width, sourceHeight,
            0, 0, canvas.width, sourceHeight
          );
          
          const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
          const pageImgHeight = (sourceHeight * imgWidth) / canvas.width;
          
          pdf.addImage(pageImgData, 'PNG', margin, margin, imgWidth, pageImgHeight);
        }
      }
    }

    // Fazer o download
    pdf.save(`${fileName}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
};
