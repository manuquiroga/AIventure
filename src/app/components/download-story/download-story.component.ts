import { Component } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake"
import * as pdfFonts from "pdfmake/build/vfs_fonts"
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

import { OpenaiService } from 'src/app/services/openai.service';

@Component({
  selector: 'app-download-story',
  templateUrl: './download-story.component.html',
  styleUrls: ['./download-story.component.css']
})
export class DownloadStoryComponent {

  generatePDF(input:string)
  {
    const docDefinition = {
      content: [input],
      footer: function(currentPage, pageCount) {
        return { text: `AIVENTURE ${pageCount}`, alignment: 'center' };
      },
    };

    pdfMake.createPdf(docDefinition).download('Your-History.pdf');
  }

}
