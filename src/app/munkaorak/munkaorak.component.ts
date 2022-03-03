import {Component, OnInit} from '@angular/core';
import {NavAdatokControllerService, NavAdatokDTO} from "../../../build/openapi/efo";
import {ComponentBase} from "../common/utils/component-base";

@Component({
  selector: 'app-munkaorak',
  templateUrl: './munkaorak.component.html',
  styleUrls: ['./munkaorak.component.css']
})
export class MunkaorakComponent extends ComponentBase implements OnInit {

  egyNavAdat: NavAdatokDTO = {};

  constructor(private navAdatokControllerService: NavAdatokControllerService) {
    super();
  }

  ngOnInit(): void {
  }

  private bejelentesvalasztas(felhasznaloNavAdat: NavAdatokDTO) {
    this.navAdatokControllerService.navAdatokId(felhasznaloNavAdat.id!).subscribe(adat => {
      this.egyNavAdat = adat;
    })
  }
}
