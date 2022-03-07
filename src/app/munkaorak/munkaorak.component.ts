import {Component, OnInit} from '@angular/core';
import {NavAdatokControllerService, NavAdatokDTO} from '../../../build/openapi/efo';
import {ComponentBase} from "../common/utils/component-base";
import {MatDatepickerInputEvent} from "@angular/material/datepicker"

@Component({
  selector: 'app-munkaorak',
  templateUrl: './munkaorak.component.html',
  styleUrls: ['./munkaorak.component.css']
})

export class MunkaorakComponent extends ComponentBase implements OnInit {

  egyBejelentettNavAdat: NavAdatokDTO = {};
  kivalasztottDatum: Date;

  tolSelected = '0700';
  igSelected = '1630';
  tolSelectedTime: string;
  igSelectedTime: string;


  constructor(private navAdatokControllerService: NavAdatokControllerService) {
    super();
  }

  ngOnInit(): void {
  }

  private bejelentesvalasztas(felhasznaloNavAdat: NavAdatokDTO) {
    this.navAdatokControllerService.navAdatokId(felhasznaloNavAdat.id!).subscribe(adat => {
      this.egyBejelentettNavAdat = adat;
    })
  }

  selectEvent(event: MatDatepickerInputEvent<Date>) {
    this.kivalasztottDatum = event.value;
  }

  selectetdTolTime(event: string) {
    this.tolSelectedTime = event;
  }

  selectetdIgTime(event: string) {
    this.igSelectedTime = event;
  }
}
