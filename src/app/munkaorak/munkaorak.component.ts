import {Component, OnInit} from '@angular/core';
import {MunkavallaloDTO, NavAdatokControllerService, NavAdatokDTO} from '../../../build/openapi/efo';
import {ComponentBase} from "../common/utils/component-base";
import {MatDatepickerInputEvent} from "@angular/material/datepicker"

@Component({
  selector: 'app-munkaorak',
  templateUrl: './munkaorak.component.html',
  styleUrls: ['./munkaorak.component.css']
})

export class MunkaorakComponent extends ComponentBase implements OnInit {

  kivalasztottFelhasznalo: MunkavallaloDTO = {};
  egyBejelentettNavAdat: NavAdatokDTO = {};

  constructor(private navAdatokControllerService: NavAdatokControllerService) {
    super();
  }

  ngOnInit(): void {
  }

  private munkavallaloValasztas(munkavallaloDTO: MunkavallaloDTO) {
    this.kivalasztottFelhasznalo = munkavallaloDTO;
  }

  private bejelentesvalasztas(felhasznaloNavAdat: NavAdatokDTO) {
    this.navAdatokControllerService.navAdatokId(felhasznaloNavAdat.id!).subscribe(adat => {
      this.egyBejelentettNavAdat = adat;
    })
  }
}
