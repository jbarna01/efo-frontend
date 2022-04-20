import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MunkaorakRogzitesePanelComponent} from "../../munkaorak-rogzitese-panel/munkaorak-rogzitese-panel.component";
// import {EgyNapRogzitettAdatai} from "../../munkaorak.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MunkavallaloiRogzitettAdatokDTO} from "../../../../../build/openapi/efo";
import * as moment from "moment";

@Component({
  selector: 'app-rogzitett-adatok-modositasa',
  templateUrl: './rogzitett-adatok-modositasa.component.html',
  styleUrls: ['./rogzitett-adatok-modositasa.component.css']
})
export class RogzitettAdatokModositasaComponent implements OnInit {

  public modositottRogzitettAdatok: any;

  rogzitettAdatokForm: FormGroup = new FormGroup({
    munkanap: new FormControl({value: '', disabled: true}, [Validators.required]),
    munkaidoKezdete: new FormControl({value: '', disabled: false}, [Validators.required]),
    munkaidoVege: new FormControl({value: '', disabled: false}, [Validators.required]),
    munkaorakSzama: new FormControl({value: '', disabled: true}, [Validators.required]),
    normalOrakSzama: new FormControl({value: '', disabled: false}, [Validators.required]),
    tulorakSzama: new FormControl({value: '', disabled: true}, [Validators.required]),
    oradij: new FormControl({value: '', disabled: false}, [Validators.required]),
//    napidij: new FormControl({value: '', disabled: true}, [Validators.required]),
    tuloradij: new FormControl({value: '', disabled: true}, [Validators.required]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<MunkaorakRogzitesePanelComponent>) {
    this.modositottRogzitettAdatok = data.munkavallaloiRogzitettAdatokDTO;
  }

  ngOnInit(): void {
  }

  private idoEllenorzese(): void {
    let kulonbsegPerc = 0;
    if (moment(this.modositottRogzitettAdatok.munkaidoVege, 'HH:mm').diff(moment(this.modositottRogzitettAdatok.munkaidoKezdete, 'HH:mm'), "minute") < 0) {
      // this.igIdo = moment(this.tolIdo, 'HH:mm').add('60', 'minutes').format('HH:mm').toString();
      kulonbsegPerc = moment('24:00', 'HH:mm').diff(moment(this.modositottRogzitettAdatok.munkaidoKezdete, 'HH:mm'), "minute") +
        moment(this.modositottRogzitettAdatok.munkaidoVege, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute");
    } else {
      kulonbsegPerc = moment(this.modositottRogzitettAdatok.munkaidoVege, 'HH:mm').diff(moment(this.modositottRogzitettAdatok.munkaidoKezdete, 'HH:mm'), "minute");
    }

    this.modositottRogzitettAdatok.munkaorakSzama = kulonbsegPerc / 60;
    this.szamolas();
  }

  private szamolas(): void {
    this.modositottRogzitettAdatok.tulorakSzama = this.modositottRogzitettAdatok.munkaorakSzama - this.modositottRogzitettAdatok.normalOrakSzama;
    this.modositottRogzitettAdatok.oradij = this.modositottRogzitettAdatok.oradij * this.modositottRogzitettAdatok.normalOrakSzama;
    this.modositottRogzitettAdatok.tuloradij = this.modositottRogzitettAdatok.oradij * this.modositottRogzitettAdatok.tulorakSzama * 1.25;
  }

  private bezarClick() {
    this.dialogRef.close({data: null});
  }

  private mentesClick() {
    this.dialogRef.close({data: this.modositottRogzitettAdatok});
  }

}
