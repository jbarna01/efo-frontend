import {Component, OnInit} from '@angular/core';
import {MunkavallaloDTO, MunkavallaloiRogzitettAdatokDTO, NavAdatokControllerService, NavAdatokDTO} from '../../../build/openapi/efo';
import {ComponentBase} from "../common/utils/component-base";

@Component({
  selector: 'app-munkaorak',
  templateUrl: './munkaorak.component.html',
  styleUrls: ['./munkaorak.component.css']
})

export class MunkaorakComponent extends ComponentBase implements OnInit {

  kivalasztottFelhasznalo: MunkavallaloDTO = {};
  egyBejelentettNavAdat: NavAdatokDTO = {};
  munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO = {};
  showSpinner = false;

  constructor(private navAdatokControllerService: NavAdatokControllerService) {
    super();
  }

  ngOnInit(): void {
  }

  private munkavallaloValasztas(munkavallaloDTO: MunkavallaloDTO) {
    this.kivalasztottFelhasznalo = munkavallaloDTO;
  }

  private bejelentesvalasztas(felhasznaloNavAdat: NavAdatokDTO) {
    if (!!felhasznaloNavAdat) {
      this.navAdatokControllerService.navAdatokFk(felhasznaloNavAdat.id!).subscribe(adat => {
        this.egyBejelentettNavAdat = adat;
      });
    }
  }

  private munkavallaloiRogzitettAdatok(munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO) {
    this.munkavallaloiRogzitettAdatokDTO = munkavallaloiRogzitettAdatokDTO;
  }
}

