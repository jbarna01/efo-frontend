import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EgyNapRogzitettAdatai,MunkaorakRogzitesePanelComponent} from "../../munkaorak-rogzitese-panel/munkaorak-rogzitese-panel.component";
import * as moment from "moment";

@Component({
  selector: 'app-orak-rogzitese',
  templateUrl: './orak-rogzitese.component.html',
  styleUrls: ['./orak-rogzitese.component.css']
})
export class OrakRogziteseComponent implements OnInit {

  // private dialogRef: MatDialogRef<MunkaorakRogzitesePanelComponent>;
  id: number;
  nap: Date;
  igIdo = '';
  tolIdo = '';
  kulonbseg = '';
  egyNapRogzitettAdatai: EgyNapRogzitettAdatai;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<MunkaorakRogzitesePanelComponent>) {
    this.id = data.id;
    this.nap = data.nap;
    this.egyNapRogzitettAdatai = new EgyNapRogzitettAdatai();
  }

  ngOnInit(): void {
  }

  private idoEllenorzese(): void {
    if (moment(this.igIdo, 'HH:mm').diff(moment(this.tolIdo, 'HH:mm'), "minute") < 0) {
      this.igIdo = moment(this.tolIdo, 'HH:mm').add('60', 'minutes').format('HH:mm').toString();
    }
    let kulonbsegPerc = moment(this.igIdo, 'HH:mm').diff(moment(this.tolIdo, 'HH:mm'), "minute");
    this.kulonbseg = moment().hours(0).minutes(kulonbsegPerc).format('hh:mm');
  }

  private megseClick() {
    this.dialogRef.close({data: null});
  }

  private mentesClick() {
    this.egyNapRogzitettAdatai.tolIdo = this.tolIdo;
    this.egyNapRogzitettAdatai.igIdo = this.igIdo;
    this.egyNapRogzitettAdatai.kulonbseg = this.kulonbseg;

    this.dialogRef.close({data: this.egyNapRogzitettAdatai});
  }

}
