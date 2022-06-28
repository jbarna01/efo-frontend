import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {EfoExcelControllerService} from "../../../build/openapi/efo";
import {MegerrositesDialogComponent} from "../dialogs/megerrosites-dialog/megerrosites-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message: string = '';


  constructor(private dialog: MatDialog,
              private router: Router,
              private efoExcelControllerService: EfoExcelControllerService) {
  }

  maiNap: Date = new Date();

  ngOnInit(): void {
  }

  public excelKlikk() {
    const title = 'Kulcs Excel generálás';
    const msg = 'Indítsam az Excel tábla generálását?';

    const dialogRef = this.dialog.open(MegerrositesDialogComponent, {
      data: {title: title, msg: msg}, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.efoExcelControllerService.excelExport().subscribe();
      }
    });
  }


}

