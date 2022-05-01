import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ReportControllerService} from "../../../../build/openapi/efo";
import { NgxExtendedPdfViewerService } from "ngx-extended-pdf-viewer";

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {

  id: number;
  page = 1;
  pdfSrc: ArrayBuffer;

  constructor(
    public reportControllerService: ReportControllerService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.id = data.id;
    this.loadofoPdf();
  }

  ngOnInit(): void {
  }

  loadofoPdf() {
    this.reportControllerService.reportPdf(this.id).subscribe(async result => {
      this.pdfSrc = await result.arrayBuffer();
      console.log("Lekérve")
    });
  }

  nyomtatasBefejezodott() {

  }

}
