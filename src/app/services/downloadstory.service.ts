import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake"
import * as pdfFonts from "pdfmake/build/vfs_fonts"
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class DownloadstoryService {

  constructor() { }
  generatePDF(input:string)
  {
    const docDefinition = {
      content: [
        { text: input, style: 'story' },
      ],
      styles: {
        story: {
          fontSize: 14,
          alignment: 'justify',
          color: '#000', 
          margin: [0, 20, 0, 0]
        },
      },
      footer: function () {
        return [
          { text: `Generated by AIVENTURE`, alignment: 'center' },
        ];
      },
    };

    pdfMake.createPdf(docDefinition).download('Your-Story.pdf');
  }
}





  
