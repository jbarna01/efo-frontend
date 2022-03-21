import {Component, Input, OnInit} from '@angular/core';
import {ComponentBase} from "../../common/utils/component-base";
import {MunkaltatoReszlegDTO, MunkavallaloDTO, NavAdatokDTO} from "../../../../build/openapi/efo";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-munkaorak-rogzitese-panel',
  templateUrl: './munkaorak-rogzitese-panel.component.html',
  styleUrls: ['./munkaorak-rogzitese-panel.component.css']
})
export class MunkaorakRogzitesePanelComponent extends ComponentBase implements OnInit {

  @Input() egyNavAdat: NavAdatokDTO;
  @Input() egyMunkavallalo: MunkavallaloDTO;

  rogzitettMunkaidokdisplayedColumns = [ 'rogzitettNap', 'munkaidoKezdete', 'munkaidoVege', 'munkaorakSzama', 'normalOrakSzama', 'tulorakSzama', 'oradij', 'napidij', 'tuloraDij'];

  constructor(private formBuilder:  FormBuilder,
              private dialog: MatDialog) {
    super();
  }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
  }

  idoEllenorzese(event, egySor: FormGroup): void {
    // let a = egySor.munkaidoKezdetek;
    // let b = this.munkaidoVegek;
    // if (moment(this.igIdo, 'HH:mm').diff(moment(this.tolIdo, 'HH:mm'), "minute") < 0) {
    //   this.igIdo = moment(this.tolIdo, 'HH:mm').add('60', 'minutes').format('HH:mm').toString();
    // }
    // let kulonbsegPerc = moment(this.igIdo, 'HH:mm').diff(moment(this.tolIdo, 'HH:mm'), "minute");
    // this.kulonbseg = moment().hours(0).minutes(kulonbsegPerc).format('hh:mm');
  }
}

export class EgyNapRogzitettAdatai {
  id: number;
  nap: Date;
  tolIdo: string;
  igIdo: string;
  kulonbseg: string;
}
