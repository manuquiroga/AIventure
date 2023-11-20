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
    let docDefinition = {
      content: [
        input
      ]
    };

    pdfMake.createPdf(docDefinition).open();
  }

}
