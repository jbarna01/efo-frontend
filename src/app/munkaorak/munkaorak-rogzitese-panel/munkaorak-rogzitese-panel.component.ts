import {Component, Input, OnInit} from '@angular/core';
import {ComponentBase} from "../../common/utils/component-base";
import {MunkavallaloDTO, NavAdatokDTO} from "../../../../build/openapi/efo";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-munkaorak-rogzitese-panel',
  templateUrl: './munkaorak-rogzitese-panel.component.html',
  styleUrls: ['./munkaorak-rogzitese-panel.component.css']
})
export class MunkaorakRogzitesePanelComponent extends ComponentBase implements OnInit {

  @Input() egyNavAdat: NavAdatokDTO;
  @Input() egyMunkavallalo: MunkavallaloDTO;

  kivalasztottDatum: Date;

  tolSelected = '0700';
  igSelected = '1630';
  tolSelectedTime: string;
  igSelectedTime: string;

  constructor() {
    super();
  }

  ngOnChanges(): void {
  }

  ngOnInit(): void {
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
