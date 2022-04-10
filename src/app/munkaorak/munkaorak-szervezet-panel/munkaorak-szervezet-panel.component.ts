import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComponentBase} from "../../common/utils/component-base";
import {
  MunkaltatoReszlegControllerService,
  MunkavallaloControllerService,
  MunkavallaloDTO,
  MunkavallaloiRogzitettAdatokControllerService, MunkavallaloiRogzitettAdatokDTO,
  NavAdatokDTO
} from '../../../../build/openapi/efo'
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {OrakRogziteseComponent} from "../dialogs/orak-rogzitese/orak-rogzitese.component";
import {MatDialog} from "@angular/material/dialog";
import * as moment from "moment";

@Component({
  selector: 'app-munkaorak-szervezet-panel',
  templateUrl: './munkaorak-szervezet-panel.component.html',
  styleUrls: ['./munkaorak-szervezet-panel.component.css']
})
export class MunkaorakSzervezetPanelComponent extends ComponentBase implements OnInit {

  @Input() egyNavAdat: NavAdatokDTO;
  @Input() egyMunkavallalo: MunkavallaloDTO;
  @Output() munkavallaloiRogzitettAdatok = new EventEmitter<MunkavallaloiRogzitettAdatokDTO>();

  szervezetKod = new FormControl();
  kodok: string[];
  kivalasztottReszlegId: number = null;
  kivalasztottReszlegNev: string = null;
  filteredKodok!: Observable<string[]>;
  munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO[] = [];

  constructor(private munkavallaloControllerService: MunkavallaloControllerService,
              // private munkaltatoReszlegControllerService: MunkaltatoReszlegControllerService,
              private formBuilder:  FormBuilder,
              private dialog: MatDialog,
              private munkavallaloiRogzitettAdatokControllerService: MunkavallaloiRogzitettAdatokControllerService) {
    super();
    // this.kodokBetoltese()
  }

  ngOnChanges(): void {
    // this.szervezetKod.patchValue('');
    // this.kivalasztottReszlegNev = null;
    this.munkavallaloiRogzitettAdatokDTO = null;
    if (!!this.egyNavAdat.id) {
      this.initMunkanapok(this.egyNavAdat);
    }
  }

  ngOnInit(): void {
    // this.filteredKodok = this.szervezetKod.valueChanges.pipe(
    //   startWith(''),
    //   map(kod => this._filter(kod)),
    // );

  }

  private initMunkanapok(navAdatok: NavAdatokDTO): void {

    this.munkavallaloiRogzitettAdatokControllerService.munkavallaloRogzitettAdatokEgyBejelents(navAdatok.id).subscribe(munkavallaloiRogzitettAdatokDTO => {
      this.munkavallaloiRogzitettAdatokDTO = munkavallaloiRogzitettAdatokDTO;
    });
  }

  // private szervezetLekereseKodAlapjan(kod: string): void {
  //   this.munkaltatoReszlegControllerService.reszlegKod(kod).subscribe(reszleg => {
  //     this.kivalasztottReszlegId = reszleg.id;
  //     this.kivalasztottReszlegNev = reszleg.nev;
  //     this.initMunkanapok(this.egyNavAdat);
  //   })
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //
  //   return this.kodok.filter(kod => kod.toLowerCase().includes(filterValue));
  // }

  // private kodokBetoltese(): void {
  //   this.munkaltatoReszlegControllerService.reszlegekAll().subscribe(reszlegek => {
  //     this.kodok = reszlegek.map(reszleg => reszleg.kod);
  //   });
  // }

  private munkaoraRogzites(adat: MunkavallaloiRogzitettAdatokDTO) {
    const dialogRef = this.dialog.open(OrakRogziteseComponent, {
      data: { id: adat.id, navAdatokFk: adat.navAdatokFk,  munkanap: adat.munkanap}, height:'650px', panelClass: 'orak-dialog-egyedi',  maxHeight: '650px', width:'800px', maxWidth:'800px', disableClose: true});
    dialogRef.afterClosed().subscribe(munkaoraAdatok => {

      //Ezt az egészet át kell nézni

      let vanTulora = moment(munkaoraAdatok.data.munkaidoVege, 'HH:mm').diff(moment('16:00', 'HH:mm'), "minute") > 0;
      let munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO = {};
      munkavallaloiRogzitettAdatokDTO.id = munkaoraAdatok.data.id;
      munkavallaloiRogzitettAdatokDTO.navAdatokFk = adat.navAdatokFk;
      munkavallaloiRogzitettAdatokDTO.munkaltatoReszlegId = this.kivalasztottReszlegId;
      munkavallaloiRogzitettAdatokDTO.munkanap = adat.munkanap;
      munkavallaloiRogzitettAdatokDTO.munkaidoKezdete = munkaoraAdatok.data.munkaidoKezdete;
      munkavallaloiRogzitettAdatokDTO.munkaidoVege = munkaoraAdatok.data.munkaidoVege;
      munkavallaloiRogzitettAdatokDTO.munkaorakSzama = moment(munkaoraAdatok.data.munkaorakSzama, 'HH:mm').diff(moment('00:00', 'HH:mm'), "minute") / 60;
      munkavallaloiRogzitettAdatokDTO.normalOrakSzama = moment((vanTulora ? '16:00' : munkaoraAdatok.data.munkaidoVege), 'HH:mm').diff(moment(munkaoraAdatok.data.munkaidoKezdete, 'HH:mm'), "minute") / 60;
      munkavallaloiRogzitettAdatokDTO.oradij = 750.0;
      munkavallaloiRogzitettAdatokDTO.napidij = munkavallaloiRogzitettAdatokDTO.normalOrakSzama * munkavallaloiRogzitettAdatokDTO.oradij;
      if (vanTulora) {
        munkavallaloiRogzitettAdatokDTO.tulorakSzama = moment(munkaoraAdatok.data.munkaidoVege, 'HH:mm').diff(moment('16:00', 'HH:mm'), "minute") / 60;
        munkavallaloiRogzitettAdatokDTO.tuloradij = munkavallaloiRogzitettAdatokDTO.tulorakSzama * munkavallaloiRogzitettAdatokDTO.oradij * 1.25;
      } else {
        munkavallaloiRogzitettAdatokDTO.tulorakSzama = 0;
        munkavallaloiRogzitettAdatokDTO.tuloradij = 0;
      }
      munkavallaloiRogzitettAdatokDTO.statusz = 'ROGZITVE';
      this.munkavallaloiRogzitettAdatokControllerService.munkavallaloRogzitettAdatokMentese(munkavallaloiRogzitettAdatokDTO).subscribe(munkavallaloiRogzitettAdatokDTO => {
        this.initMunkanapok(this.egyNavAdat);
        this.munkavallaloiRogzitettAdatok.emit(munkavallaloiRogzitettAdatokDTO);

      });
    });
  }
}
