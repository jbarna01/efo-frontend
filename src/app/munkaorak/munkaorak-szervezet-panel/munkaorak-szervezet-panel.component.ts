import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComponentBase} from "../../common/utils/component-base";
import {
  MunkavallaloControllerService,
  MunkavallaloDTO,
  MunkavallaloiRogzitettAdatokControllerService,
  MunkavallaloiRogzitettAdatokDTO,
  NavAdatokDTO
} from '../../../../build/openapi/efo'
import {FormBuilder} from "@angular/forms";
import {OrakRogziteseComponent} from "../dialogs/orak-rogzitese/orak-rogzitese.component";
import {MatDialog} from "@angular/material/dialog";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-munkaorak-szervezet-panel',
  templateUrl: './munkaorak-szervezet-panel.component.html',
  styleUrls: ['./munkaorak-szervezet-panel.component.css']
})
export class MunkaorakSzervezetPanelComponent extends ComponentBase implements OnInit {

  @Input() egyNavAdat: NavAdatokDTO;
  @Input() egyMunkavallalo: MunkavallaloDTO;
  @Output() munkavallaloiRogzitettAdatok = new EventEmitter<MunkavallaloiRogzitettAdatokDTO>();

  kivalasztottReszlegId: number = null;
  munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO[] = [];

  showSpinner = false;

  constructor(private munkavallaloControllerService: MunkavallaloControllerService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private munkavallaloiRogzitettAdatokControllerService: MunkavallaloiRogzitettAdatokControllerService) {
    super();
  }

  ngOnChanges(): void {
    this.munkavallaloiRogzitettAdatokDTO = null;
    if (!!this.egyNavAdat.id) {
      this.initMunkanapok(this.egyNavAdat);
    }
  }

  ngOnInit(): void {
  }

  private initMunkanapok(navAdatok: NavAdatokDTO): void {

    this.munkavallaloiRogzitettAdatokControllerService.munkavallaloRogzitettAdatokEgyBejelentes(navAdatok.id).subscribe(munkavallaloiRogzitettAdatokDTO => {
      this.munkavallaloiRogzitettAdatokDTO = munkavallaloiRogzitettAdatokDTO;
    });
  }

  public munkaoraRogzites(adat: MunkavallaloiRogzitettAdatokDTO) {
    const dialogRef = this.dialog.open(OrakRogziteseComponent, {
      data: {adat: adat}, height: '630px', panelClass: 'orak-dialog-egyedi', maxHeight: '630px', width: '800px', maxWidth: '800px', disableClose: true
    });
    dialogRef.afterClosed().subscribe(munkaoraAdatok => {
      if (munkaoraAdatok.data == 'INAKTIV') {
        adat.statusz = 'INAKTIV';
        this.munkavallaloiRogzitettAdatokControllerService.munkavallaloRogzitettAdatokMentese(adat).subscribe(munkavallaloiRogzitettAdatokDTO => {
          this.initMunkanapok(this.egyNavAdat);
          this.munkavallaloiRogzitettAdatok.emit(munkavallaloiRogzitettAdatokDTO);
          this.showSpinner = false;
        });
      } else if (munkaoraAdatok.data != null) {
        this.showSpinner = true;
        let munkavallaloiRogzitettAdatokDTO = munkaoraAdatok.data;
        // if (munkaoraAdatok.data.munkanapokSzama == 1) {
          munkavallaloiRogzitettAdatokDTO.munkanapDatuma = adat.munkanapDatuma;
        // } else {
        //   const elsoNap = new Date(adat.munkanapDatuma);
        //   const masodikNap = new Date(elsoNap.getTime() + (24 * 60 * 60 * 1000));
        //   munkavallaloiRogzitettAdatokDTO.munkanapDatuma = formatDate(elsoNap, 'yyyy-MM-dd', 'en_US') + ' - ' + formatDate(masodikNap, 'yyyy-MM-dd', 'en_US');
        // }
        munkavallaloiRogzitettAdatokDTO.statusz = 'ROGZITVE';
        this.munkavallaloiRogzitettAdatokControllerService.munkavallaloRogzitettAdatokMentese(munkavallaloiRogzitettAdatokDTO).subscribe(munkavallaloiRogzitettAdatokDTO => {
          this.initMunkanapok(this.egyNavAdat);
          this.munkavallaloiRogzitettAdatok.emit(munkavallaloiRogzitettAdatokDTO);
          this.showSpinner = false;
        });
      }
    });
  }
}
