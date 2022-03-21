import {Component, Input, OnInit} from '@angular/core';
import {ComponentBase} from "../../common/utils/component-base";
import {
  MunkaltatoReszlegControllerService,
  MunkavallaloControllerService,
  MunkavallaloDTO,
  MunkavallaloiRogzitettAdatokControllerService, MunkavallaloiRogzitettAdatokDTO,
  NavAdatokDTO
} from '../../../../build/openapi/efo';
import {FormBuilder, FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {OrakRogziteseComponent} from "../dialogs/orak-rogzitese/orak-rogzitese.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-munkaorak-szervezet-panel',
  templateUrl: './munkaorak-szervezet-panel.component.html',
  styleUrls: ['./munkaorak-szervezet-panel.component.css']
})
export class MunkaorakSzervezetPanelComponent extends ComponentBase implements OnInit {

  @Input() egyNavAdat: NavAdatokDTO;
  @Input() egyMunkavallalo: MunkavallaloDTO;

  szervezetKod = new FormControl();
  kodok: string[];
  kivalasztottReszlegNev: string = null;
  filteredKodok!: Observable<string[]>;
  munkavallaloiRogzitettAdatokSource: MatTableDataSource<MunkavallaloiRogzitettAdatokDTO>;
  munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO[] = [];
  displayedColumns = ['gomb'];


  constructor(private munkavallaloControllerService: MunkavallaloControllerService,
              private munkaltatoReszlegControllerService: MunkaltatoReszlegControllerService,
              private formBuilder:  FormBuilder,
              private dialog: MatDialog,
              private munkavallaloiRogzitettAdatokControllerService: MunkavallaloiRogzitettAdatokControllerService) {
    super();
    this.kodokBetoltese()
  }

  ngOnChanges(): void {
    console.log('OK');
    this.szervezetKod.patchValue('');
    this.kivalasztottReszlegNev = null;
    // this.tablazatAdatok = [];
  }

  ngOnInit(): void {
    this.filteredKodok = this.szervezetKod.valueChanges.pipe(
      startWith(''),
      map(kod => this._filter(kod)),
    );
  }

  private initRow(navAdatok: NavAdatokDTO): void {

    this.munkavallaloiRogzitettAdatokControllerService.munkavallaloRogzitettAdatokEgyBejelents(navAdatok.id).subscribe(munkavallaloiRogzitettAdatokDTO => {
      this.munkavallaloiRogzitettAdatokDTO = munkavallaloiRogzitettAdatokDTO;
    });
    // this.munkavallaloiRogzitettAdatokSource = new MatTableDataSource<MunkavallaloiRogzitettAdatokDTO>(this.munkavallaloiRogzitettAdatokDTO);
  }

  private szervezetLekereseKodAlapjan(kod: string): void {
    this.munkaltatoReszlegControllerService.reszlegKod(kod).subscribe(reszleg => {
      this.kivalasztottReszlegNev = reszleg.nev;
      this.initRow(this.egyNavAdat);
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.kodok.filter(kod => kod.toLowerCase().includes(filterValue));
  }

  private kodokBetoltese(): void {
    this.munkaltatoReszlegControllerService.reszlegekAll().subscribe(reszlegek => {
      this.kodok = reszlegek.map(reszleg => reszleg.kod);
    });
  }

  private munkaoraRogzites(adat: MunkavallaloiRogzitettAdatokDTO) {
    const dialogRef = this.dialog.open(OrakRogziteseComponent, {
      data: { id: adat.id, nap: adat.munkanap}, disableClose: true});
    dialogRef.afterClosed().subscribe(munkaoraAdatok => {
    //
    //   let dolgozhozRogzitetEgyNapiMunkaora: DolgozohozRogzitettMunkaorak = new DolgozohozRogzitettMunkaorak();
    //   dolgozhozRogzitetEgyNapiMunkaora.rogzitettNap = adat.nap;
    //   dolgozhozRogzitetEgyNapiMunkaora.munkaidoKezdete = munkaoraAdatok.data.tolIdo;
    //   dolgozhozRogzitetEgyNapiMunkaora.munkaidoVege = munkaoraAdatok.data.igIdo;
    //   dolgozhozRogzitetEgyNapiMunkaora.munkaorakSzama = munkaoraAdatok.data.kulonbseg;
    //   dolgozhozRogzitetEgyNapiMunkaora.oradij = 750;
    //   let normalMunkaidoPerc = moment('16:00', 'HH:mm').diff(moment(munkaoraAdatok.data.tolIdo, 'HH:mm'), "minute");
    //   dolgozhozRogzitetEgyNapiMunkaora.normalOrakSzama = moment().hours(0).minutes(normalMunkaidoPerc).format('hh:mm');
    //   let tuloraMunkaidoPerc = moment(munkaoraAdatok.data.igIdo, 'HH:mm').diff(moment('16:00', 'HH:mm'), "minute");
    //   dolgozhozRogzitetEgyNapiMunkaora.tulorakSzama = moment().hours(0).minutes(tuloraMunkaidoPerc).format('hh:mm');
    //   dolgozhozRogzitetEgyNapiMunkaora.napidij = normalMunkaidoPerc/60 * dolgozhozRogzitetEgyNapiMunkaora.oradij;
    //   dolgozhozRogzitetEgyNapiMunkaora.tuloraDij = tuloraMunkaidoPerc/60 * dolgozhozRogzitetEgyNapiMunkaora.oradij * 1.25;
    //
    //   this.dolgozohozRogzitettMunkaorak.push(dolgozhozRogzitetEgyNapiMunkaora);
    //   this.rogzitettMunkavallaloiAdatok = new MatTableDataSource<DolgozohozRogzitettMunkaorak>(this.dolgozohozRogzitettMunkaorak)
    //
    //   console.log(munkaoraAdatok.data.tolIdo);
    //   console.log(munkaoraAdatok.data.igIdo);
    //   console.log(munkaoraAdatok.data.kulonbseg);
    //   console.log('OK');
    //
    });
  }


}

export class EgySorAdat {
  id: number;
  nap: Date;
}
