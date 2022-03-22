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
  navAdatokFk: number;
  munkanap: Date;
  munkaidoKezdete = '';
  munkaidoVege = '';
  munkaorakSzama = '';
  egyNapRogzitettAdatai: EgyNapRogzitettAdatai;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<MunkaorakRogzitesePanelComponent>) {
    this.id = data.id;
    this.navAdatokFk = data.navAdatokFk;
    this.munkanap = data.munkanap;
    this.egyNapRogzitettAdatai = new EgyNapRogzitettAdatai();
  }

  ngOnInit(): void {
  }

  private idoEllenorzese(): void {
    let kulonbsegPerc = 0;
    if (moment(this.munkaidoVege, 'HH:mm').diff(moment(this.munkaidoKezdete, 'HH:mm'), "minute") < 0) {
      // this.igIdo = moment(this.tolIdo, 'HH:mm').add('60', 'minutes').format('HH:mm').toString();
      kulonbsegPerc = moment('24:00', 'HH:mm').diff(moment(this.munkaidoKezdete, 'HH:mm'), "minute") +
        moment(this.munkaidoVege, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute");
    } else {
      kulonbsegPerc = moment(this.munkaidoVege, 'HH:mm').diff(moment(this.munkaidoKezdete, 'HH:mm'), "minute");
    }

    this.munkaorakSzama = moment().hours(0).minutes(kulonbsegPerc).format('hh:mm');
  }

  private megseClick() {
    this.dialogRef.close({data: null});
  }

  private mentesClick() {
    this.egyNapRogzitettAdatai.id = this.id
    this.egyNapRogzitettAdatai.navAdatokFk = this.navAdatokFk;
    this.egyNapRogzitettAdatai.munkanap = this.munkanap;
    this.egyNapRogzitettAdatai.munkaidoKezdete = this.munkaidoKezdete;
    this.egyNapRogzitettAdatai.munkaidoVege = this.munkaidoVege;
    this.egyNapRogzitettAdatai.munkaorakSzama = this.munkaorakSzama;

    this.dialogRef.close({data: this.egyNapRogzitettAdatai});
  }

}
