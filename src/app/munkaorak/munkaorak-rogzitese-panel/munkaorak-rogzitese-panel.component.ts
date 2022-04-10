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
import {OrakRogziteseComponent} from "../dialogs/orak-rogzitese/orak-rogzitese.component";
import {RogzitettAdatokModositasaComponent} from "../dialogs/rogzitett-adatok-modositasa/rogzitett-adatok-modositasa.component";
import {PdfViewerComponent} from "../../report/pdf-viewer/pdf-viewer.component";

@Component({
  selector: 'app-munkaorak-rogzitese-panel',
  templateUrl: './munkaorak-rogzitese-panel.component.html',
  styleUrls: ['./munkaorak-rogzitese-panel.component.css']
})
export class MunkaorakRogzitesePanelComponent extends ComponentBase implements OnInit {

  @Input() egyNavAdat: NavAdatokDTO;
  @Input() munkavallaloiRogzitettAdat: MunkavallaloiRogzitettAdatokDTO;

  munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO[] = [];
  rogzitettMunkaidokdisplayedColumns = ['rogzitettNap', 'munkaidoKezdete', 'munkaidoVege', 'munkaorakSzama', 'normalOrakSzama', 'tulorakSzama', 'oradij', 'napidij', 'tuloraDij', 'osszesen', 'szervezet', 'gombok'];

  constructor(private formBuilder: FormBuilder,
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

  private rogzitettMunkaorakTablazatInit(navAdatokFk: number): void {
    if (this.munkavallaloiRogzitettAdat) {
      this.munkavallaloiRogzitettAdatokControllerService.munkavallaloRogzitettAdatokEgyBejelents(navAdatokFk).subscribe(munkavallaloiRogzitettAdatok => {
        this.munkavallaloiRogzitettAdatokDTO = munkavallaloiRogzitettAdatok.filter(data => data.munkaidoKezdete != null);
      });
    }
  }

  private convertPercToOraString(perc: number): string {
    return moment().hours(0).minutes(perc * 60).format('hh:mm');
  }

  private rekordModositasa(munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO): void {
    const dialogRef = this.dialog.open(RogzitettAdatokModositasaComponent, {
      data: {munkavallaloiRogzitettAdatokDTO: munkavallaloiRogzitettAdatokDTO}, minWidth: 600, disableClose: true
    });
    dialogRef.afterClosed().subscribe(modositottAdatok => {
      this.munkavallaloiRogzitettAdatokControllerService.munkavallaloRogzitettAdatokMentese(modositottAdatok.data).subscribe(munkaoraAdatok => {
        this.rogzitettMunkaorakTablazatInit(munkaoraAdatok.navAdatokFk);
      });
    });
  }

  private rekordTorlese(munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO): void {

    munkavallaloiRogzitettAdatokDTO.munkaltatoReszlegId = null;
    munkavallaloiRogzitettAdatokDTO.munkaidoKezdete = null;
    munkavallaloiRogzitettAdatokDTO.munkaidoVege = null;
    munkavallaloiRogzitettAdatokDTO.munkaorakSzama = null;
    munkavallaloiRogzitettAdatokDTO.normalOrakSzama = null;
    munkavallaloiRogzitettAdatokDTO.oradij = null;
    munkavallaloiRogzitettAdatokDTO.napidij = null;
    munkavallaloiRogzitettAdatokDTO.tuloradij = null;
    munkavallaloiRogzitettAdatokDTO.tulorakSzama = null;
    munkavallaloiRogzitettAdatokDTO.statusz = null;
    this.munkavallaloiRogzitettAdatokControllerService.munkavallaloRogzitettAdatokMentese(munkavallaloiRogzitettAdatokDTO).subscribe(munkavallaloiRogzitettAdatokDTO => {
      this.rogzitettMunkaorakTablazatInit(munkavallaloiRogzitettAdatokDTO.navAdatokFk);

    });
  }

  private printEfoAdatlap(munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO): void {
    console.log(munkavallaloiRogzitettAdatokDTO.id);
    const dialogRef = this.dialog.open(PdfViewerComponent, {
      data: {
        id: munkavallaloiRogzitettAdatokDTO.id,
      }, disableClose: true
    });
    dialogRef.afterClosed().subscribe(printResult => {
    });
  }

}
