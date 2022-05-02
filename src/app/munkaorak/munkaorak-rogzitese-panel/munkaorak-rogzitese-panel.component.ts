import {Component, Input, OnInit} from '@angular/core';
import {ComponentBase} from "../../common/utils/component-base";
import {
  FoglalkoztatasAdatokControllerService,
  FoglalkoztatasAdatokDTO,
  MunkavallaloiRogzitettAdatokControllerService,
  MunkavallaloiRogzitettAdatokDTO,
  NavAdatokDTO
} from "../../../../build/openapi/efo";
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import * as moment from "moment";
import {OrakRogziteseComponent} from "../dialogs/orak-rogzitese/orak-rogzitese.component";
import {PdfViewerComponent} from "../../report/pdf-viewer/pdf-viewer.component";
import {formatDate} from "@angular/common";
import {MegerrositesDialogComponent} from "../../dialogs/megerrosites-dialog/megerrosites-dialog.component";

@Component({
  selector: 'app-munkaorak-rogzitese-panel',
  templateUrl: './munkaorak-rogzitese-panel.component.html',
  styleUrls: ['./munkaorak-rogzitese-panel.component.css']
})
export class MunkaorakRogzitesePanelComponent extends ComponentBase implements OnInit {

  @Input() egyNavAdat: NavAdatokDTO;
  @Input() munkavallaloiRogzitettAdat: MunkavallaloiRogzitettAdatokDTO;

  foglalkoztatasAdatokDTO: FoglalkoztatasAdatokDTO[] = [];
  rogzitettMunkaidokdisplayedColumns = ['szervezet', 'munkanapDatuma', 'munkaidoKezdete', 'munkaidoVege', 'teljesMunkaorakSzama', 'oradij', 'osszesen', 'gombok'];
  showSpinner = false;

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private munkavallaloiRogzitettAdatokControllerService: MunkavallaloiRogzitettAdatokControllerService,
              private foglalkoztatasAdatokControllerService: FoglalkoztatasAdatokControllerService) {
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
      this.foglalkoztatasAdatokControllerService.foglalkoztatasAdatokNavAdatokFk(navAdatokFk).subscribe(foglalkoztatasAdatok => {
        this.foglalkoztatasAdatokDTO = foglalkoztatasAdatok.filter(data => data.munkaidoKezdete != null);
      });
    }
  }

  private convertPercToOraString(perc: number): string {
    return moment().hours(0).minutes(perc * 60).format('hh:mm');
  }

  private rekordModositasa(adat: FoglalkoztatasAdatokDTO): void {
    let munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO = {};
    const dialogRef = this.dialog.open(OrakRogziteseComponent, {
      data: {adat: adat}, height: '630px', panelClass: 'orak-dialog-egyedi', maxHeight: '630px', width: '800px', maxWidth: '800px', disableClose: true
    });
    dialogRef.afterClosed().subscribe(munkaoraAdatok => {
      if (munkaoraAdatok.data != null && munkaoraAdatok.data != 'INAKTIV') {
        this.showSpinner = true;
        munkavallaloiRogzitettAdatokDTO = this.getMunkavallaloiRogzitettAdatokDTO(munkaoraAdatok.data);
        munkavallaloiRogzitettAdatokDTO.pdf = null;
        this.munkavallaloiRogzitettAdatokControllerService.munkavallaloRogzitettAdatokMentese(munkavallaloiRogzitettAdatokDTO).subscribe(munkavallaloiRogzitettAdatokDTO => {
          this.rogzitettMunkaorakTablazatInit(munkavallaloiRogzitettAdatokDTO.navAdatokFk);
          this.showSpinner = false;
        });
      }
    });
  }

  private getMunkavallaloiRogzitettAdatokDTO(foglalkoztatasAdatokDTO: FoglalkoztatasAdatokDTO): MunkavallaloiRogzitettAdatokDTO {
    let munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO = {};
    munkavallaloiRogzitettAdatokDTO.id = foglalkoztatasAdatokDTO.id;
    munkavallaloiRogzitettAdatokDTO.navAdatokFk = foglalkoztatasAdatokDTO.navAdatokFk;
    munkavallaloiRogzitettAdatokDTO.munkaltatoReszlegId = parseInt(foglalkoztatasAdatokDTO.reszlegId);
    munkavallaloiRogzitettAdatokDTO.munkanapDatuma = foglalkoztatasAdatokDTO.munkanapDatuma.replace('.', '-').replace('.', '-') + 'T00:00:00Z';
    munkavallaloiRogzitettAdatokDTO.oradij = foglalkoztatasAdatokDTO.oradij;
    munkavallaloiRogzitettAdatokDTO.munkaidoKezdete = foglalkoztatasAdatokDTO.munkaidoKezdete;
    munkavallaloiRogzitettAdatokDTO.munkaidoVege = foglalkoztatasAdatokDTO.munkaidoVege;
    munkavallaloiRogzitettAdatokDTO.teljesMunkaorakSzama = foglalkoztatasAdatokDTO.teljesMunkaorakSzama;
    munkavallaloiRogzitettAdatokDTO.tulorakDija = foglalkoztatasAdatokDTO.tulorakDija;
    munkavallaloiRogzitettAdatokDTO.tuloraMunkaidoKezdete = foglalkoztatasAdatokDTO.tuloraMunkaidoKezdete;
    munkavallaloiRogzitettAdatokDTO.tuloraMunkaidoVege = foglalkoztatasAdatokDTO.tuloraMunkaidoVege;
    munkavallaloiRogzitettAdatokDTO.tulorakSzama = foglalkoztatasAdatokDTO.tulorakSzama;
    munkavallaloiRogzitettAdatokDTO.ejszakaiOrakDija = foglalkoztatasAdatokDTO.ejszakaiOrakDija;
    munkavallaloiRogzitettAdatokDTO.ejszakaiMunkaidoKezdete = foglalkoztatasAdatokDTO.ejszakaiMunkaidoKezdete;
    munkavallaloiRogzitettAdatokDTO.ejszakaiMunkaidoVege = foglalkoztatasAdatokDTO.ejszakaiMunkaidoVege;
    munkavallaloiRogzitettAdatokDTO.ejszakaiOrakSzama = foglalkoztatasAdatokDTO.ejszakaiOrakSzama;
    munkavallaloiRogzitettAdatokDTO.munkaszunetinap = foglalkoztatasAdatokDTO.munkaszunetinap;
    munkavallaloiRogzitettAdatokDTO.munkadijOsszesen = foglalkoztatasAdatokDTO.munkadijOsszesen;
    munkavallaloiRogzitettAdatokDTO.szakkepzetsegetIgenyel = foglalkoztatasAdatokDTO.szakkepzetsegetIgenyel == 'IGENYEL' ? true : false;
    munkavallaloiRogzitettAdatokDTO.statusz = foglalkoztatasAdatokDTO.statusz;
    munkavallaloiRogzitettAdatokDTO.modositasIdeje = formatDate(new Date(), 'yyyy-MM-dd', 'en_US') + 'T00:00:00Z';
    return munkavallaloiRogzitettAdatokDTO;
  }

  private rekordTorlese(foglalkoztatasAdatokDTO: FoglalkoztatasAdatokDTO): void {
    let munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO = {};
    const title = 'Rögzített munkanap törlése';
    const msg = 'Valóban törli ezt a rögzített munkanapot?';
    const dialogRef = this.dialog.open(MegerrositesDialogComponent, {
      data: {title: title, msg: msg}, disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        munkavallaloiRogzitettAdatokDTO.id = foglalkoztatasAdatokDTO.id;
        munkavallaloiRogzitettAdatokDTO.navAdatokFk = foglalkoztatasAdatokDTO.navAdatokFk;
        munkavallaloiRogzitettAdatokDTO.munkaltatoReszlegId = null;
        munkavallaloiRogzitettAdatokDTO.munkaidoKezdete = null;
        munkavallaloiRogzitettAdatokDTO.munkaidoVege = null;
        munkavallaloiRogzitettAdatokDTO.teljesMunkaorakSzama = null;
        munkavallaloiRogzitettAdatokDTO.teljesMunkaorakSzama = null;
        munkavallaloiRogzitettAdatokDTO.oradij = null;
        munkavallaloiRogzitettAdatokDTO.tulorakDija = null;
        munkavallaloiRogzitettAdatokDTO.tulorakSzama = null;
        munkavallaloiRogzitettAdatokDTO.statusz = null;
        munkavallaloiRogzitettAdatokDTO.szakkepzetsegetIgenyel = null;
        munkavallaloiRogzitettAdatokDTO.munkanapDatuma = foglalkoztatasAdatokDTO.munkanapDatuma.replace('.', '-').replace('.', '-') + 'T00:00:00Z';
        ;
        munkavallaloiRogzitettAdatokDTO.modositasIdeje = formatDate(new Date(), 'yyyy-MM-dd', 'en_US') + 'T00:00:00Z';
        this.munkavallaloiRogzitettAdatokControllerService.munkavallaloRogzitettAdatokMentese(munkavallaloiRogzitettAdatokDTO).subscribe(munkavallaloiRogzitettAdatokDTO => {
          this.rogzitettMunkaorakTablazatInit(munkavallaloiRogzitettAdatokDTO.navAdatokFk);
        });
      }
    });
  }

  private printEfoAdatlap(foglalkoztatasAdatokDTO: FoglalkoztatasAdatokDTO): void {
    console.log(foglalkoztatasAdatokDTO.id);
    const dialogRef = this.dialog.open(PdfViewerComponent, {
      data: {
        id: foglalkoztatasAdatokDTO.id,
      }, disableClose: true
    });
    dialogRef.afterClosed().subscribe(printResult => {
      let munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO = {};
      const title = 'Nyomtatás';
      const msg = 'Sikerült a nyomtattás?';
      const dialogRef = this.dialog.open(MegerrositesDialogComponent, {
        data: {title: title, msg: msg}, disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          munkavallaloiRogzitettAdatokDTO = this.getMunkavallaloiRogzitettAdatokDTO(foglalkoztatasAdatokDTO);
          munkavallaloiRogzitettAdatokDTO.pdf = foglalkoztatasAdatokDTO.pdf;
          munkavallaloiRogzitettAdatokDTO.nyomtatasIdeje = formatDate(new Date(), 'yyyy-MM-dd', 'en_US') + 'T00:00:00Z';
          this.munkavallaloiRogzitettAdatokControllerService.munkavallaloRogzitettAdatokMentese(munkavallaloiRogzitettAdatokDTO).subscribe(munkavallaloiRogzitettAdatokDTO => {
            this.rogzitettMunkaorakTablazatInit(munkavallaloiRogzitettAdatokDTO.navAdatokFk);
          });
        }
      });
    });
  }

  private vegosszegSzamolas(foglalkoztatasAdatokDTO: FoglalkoztatasAdatokDTO): number {

    let szorzo = foglalkoztatasAdatokDTO.munkaszunetinap ? 2 : 1;

    let normalOsszeg = foglalkoztatasAdatokDTO.oradij * foglalkoztatasAdatokDTO.teljesMunkaorakSzama;
    let tuloraOsszeg = foglalkoztatasAdatokDTO.tulorakDija * foglalkoztatasAdatokDTO.tulorakSzama;
    let ejszakaiOsszeg = foglalkoztatasAdatokDTO.ejszakaiOrakDija * foglalkoztatasAdatokDTO.ejszakaiOrakSzama;

    return (normalOsszeg * szorzo) + tuloraOsszeg + ejszakaiOsszeg;
  }

}
