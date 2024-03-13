import { Injectable } from '@nestjs/common';
import { Recipe } from '../domain/Recipe';
import PDFDocument from 'pdfkit';
@Injectable()
export class RecipePDFGenerator {
  async generatePDF(recipe: Recipe): Promise<Buffer> {
    const pdfDocument = this.createPDFDocument(recipe);
    const pdfData = [];

    pdfDocument.on('data', (data) => {
      pdfData.push(data);
    });

    pdfDocument.on('end', () => {
      const data = Buffer.concat(pdfData);
      return data;
    });

    return Buffer.from(pdfData);
  }

  private createPDFDocument(recipe: Recipe): PDFKit.PDFDocument {
    const document = new PDFDocument({
      size: 'A4',
      bufferPages: true,
    });

    document.image('', 0, 0, {
      fit: [document.page.width, document.page.height],
      align: 'center',
      valign: 'center',
    });

    document.text('Ingredients');

    document.text(JSON.stringify(recipe), 100, 50);
    document.end();

    return document;
  }
}
