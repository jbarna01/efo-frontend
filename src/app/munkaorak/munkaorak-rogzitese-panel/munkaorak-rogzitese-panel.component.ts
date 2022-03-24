import {Component, Input, OnInit} from '@angular/core';
import {ComponentBase} from "../../common/utils/component-base";
import {
  MunkaltatoReszlegDTO,
  MunkavallaloDTO,
  MunkavallaloiRogzitettAdatokControllerService,
  MunkavallaloiRogzitettAdatokDTO,
  NavAdatokDTO
} from "../../../../build/openapi/efo";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import * as moment from "moment";

@Component({
  selector: 'app-munkaorak-rogzitese-panel',
  templateUrl: './munkaorak-rogzitese-panel.component.html',
  styleUrls: ['./munkaorak-rogzitese-panel.component.css']
})
export class MunkaorakRogzitesePanelComponent extends ComponentBase implements OnInit {

  @Input() egyNavAdat: NavAdatokDTO;
  @Input() munkavallaloiRogzitettAdat: MunkavallaloiRogzitettAdatokDTO;

  munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO[] = [];
  rogzitettMunkaidokdisplayedColumns = [ 'rogzitettNap', 'munkaidoKezdete', 'munkaidoVege', 'munkaorakSzama', 'normalOrakSzama', 'tulorakSzama', 'oradij', 'napidij', 'tuloraDij', 'osszesen', 'szervezet', 'gombok'];

  constructor(private formBuilder:  FormBuilder,
              private dialog: MatDialog,
              private munkavallaloiRogzitettAdatokControllerService: MunkavallaloiRogzitettAdatokControllerService) {
    super();
  }

  ngOnChanges(): void {
    if (!!this.egyNavAdat.id) {
      this.rogzitettMunkaorakTablazatInit(this.egyNavAdat.id);
    }
  }

  ngOnInit(): void {
  }

  private rogzitettMunkaorakTablazatInit(navAdatokFk: number):void {
    if (this.munkavallaloiRogzitettAdat) {
      this.munkavallaloiRogzitettAdatokControllerService.munkavallaloRogzitettAdatokEgyBejelents(navAdatokFk).subscribe(munkavallaloiRogzitettAdatok => {
        this.munkavallaloiRogzitettAdatokDTO = munkavallaloiRogzitettAdatok.filter(data => data.munkaidoKezdete != null);
      });
    }
  }

  private convertPercToOraString(perc: number):string {
    return moment().hours(0).minutes(perc * 60).format('hh:mm');
  }

  private osszegToFtString(osszeg: number) {
    return osszeg.toString();
  }
}
