import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {
  EfoExcelControllerService,
  MunkaltatoReszlegControllerService,
  MunkavallaloControllerService,
  MunkavallaloDTO
} from "../../../build/openapi/efo";
import {MegerrositesDialogComponent} from "../dialogs/megerrosites-dialog/megerrosites-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {saveAs} from "file-saver";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message: string = '';
  hianyosMunkavallalokSzama = 0;
  szervezetiEgysegekSzama = 0;


  constructor(private dialog: MatDialog,
              private router: Router,
              private munkavallaloControllerService: MunkavallaloControllerService,
              private munkaltatoReszlegControllerService: MunkaltatoReszlegControllerService,
              private efoExcelControllerService: EfoExcelControllerService) {
  }

  maiNap: Date = new Date();

  ngOnInit(): void {
    this.munkavallaloControllerService.munkavallalokHianyos('HIANYOS').subscribe(munkavallalokList => {
      this.hianyosMunkavallalokSzama = munkavallalokList.length;
    });
    this.munkaltatoReszlegControllerService.reszlegekAll().subscribe(szervezetiEgysegekLista => {
      this.szervezetiEgysegekSzama = szervezetiEgysegekLista.length;
    });
  }

  public excelKlikk() {
    const title = 'Kulcs Excel generálás';
    const msg = 'Indítsam az Excel tábla generálását?';

    const dialogRef = this.dialog.open(MegerrositesDialogComponent, {
      data: {title: title, msg: msg}, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.efoExcelControllerService.excelExport().subscribe(blob => saveAs(blob, 'kulcs_excel_' + formatDate(new Date(), 'yyyy-MM-dd', 'en_US')));
      }
    });
  }


}

