import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MunkavallaloControllerService, MunkavallaloDTO} from "../../../build/openapi/efo";
import {MatRow, MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ComponentBase} from "../common/utils/component-base";

@Component({
  selector: 'app-munkavallalok',
  templateUrl: './munkavallalok.component.html',
  styleUrls: ['./munkavallalok.component.css']
})
export class MunkavallalokComponent extends ComponentBase implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['icon', 'neve', 'tajSzama', 'adoszam'];
  munkavallalok: MunkavallaloDTO[] = [];
  szerkesztettFelhasznalo = {} as MunkavallaloDTO;
  dataSource!: MatTableDataSource<MunkavallaloDTO>;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  filterMezoErteke = '';
  inputMezokTiltva: boolean = true;
  filterMezoLetiltva: boolean = false;
  tableKlikkLetiltva: boolean = false;
  megseGombTiltva: boolean = true;
  szerkestesGombTiltva: boolean = true;
  mentesGombTiltva: boolean = true;
  mindenMunkavallalo: boolean = false;
  valasztottNem: string;

  munkavallaloForm: FormGroup = new FormGroup({
    vezetekNev: new FormControl({value: '', disabled: true}, [Validators.maxLength(100), Validators.required]),
    keresztNev: new FormControl({value: '', disabled: true}, [Validators.maxLength(100), Validators.required]),
    anyjaNeve: new FormControl({value: '', disabled: true}, [Validators.maxLength(100), Validators.required]),
    iranyitoszam: new FormControl({value: '', disabled: true}, [Validators.pattern('^[0-9]{4}$'), Validators.required, Validators.maxLength(4)]),
    telepules: new FormControl({value: '', disabled: true}, [Validators.maxLength(100), Validators.required]),
    cim: new FormControl({value: '', disabled: true}, [Validators.maxLength(200), Validators.required]),
    adoszam: new FormControl({value: '', disabled: true}, [Validators.pattern('^[0-9]{10}$'), Validators.required]),
    tajSzam: new FormControl({value: '', disabled: true}, [Validators.pattern('^[0-9]{9}$'), Validators.required]),
    szuletesiHely: new FormControl({value: '', disabled: true}, [Validators.maxLength(100), Validators.required]),
    szuletesiIdo: new FormControl({value: '', disabled: true}, [Validators.maxLength(10), Validators.required]),
    // valasztottNem: new FormControl({value: '', disabled: true}, [Validators.required]),
    orszag: new FormControl({value: '', disabled: true}, [Validators.maxLength(100), Validators.required])
  });

  constructor(private munkavallaloControllerService: MunkavallaloControllerService) {
    super();
    // this.munkavalalokLekerdezese();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.changeMindenMunkavallalo();
  }

  private munkavalalokLekerdezese(): void {
    if (this.mindenMunkavallalo) {
      this.munkavallaloControllerService.munkavallalokHianyos('HIANYOS').subscribe(munkavallalokList => {
        this.munkavallalok = munkavallalokList;
        this.dataSource = new MatTableDataSource<MunkavallaloDTO>(this.munkavallalok);
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.munkavallaloControllerService.munkavallalokAll().subscribe(munkavallalokList => {
        this.munkavallalok = munkavallalokList;
        this.dataSource = new MatTableDataSource<MunkavallaloDTO>(this.munkavallalok);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  private applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private felhasznaloValasztas(kivalasztottFelhasznalo: MunkavallaloDTO) {
    if (!this.tableKlikkLetiltva) {
      this.szerkesztettFelhasznalo = kivalasztottFelhasznalo;
      this.szerkestesGombTiltva = false;
      this.filterMezoErteke = '';
    }
  }

  public nemErteke():boolean {
    return this.szerkesztettFelhasznalo.nem == 'F';
  }

  public nemValasztas(event: any) {
    this.valasztottNem = event.value;

  }

  private megseGomb() {
    this.szerkesztettFelhasznalo = {};
    this.munkavalalokLekerdezese();
    this.filterMezoLetiltva = false;
    this.tableKlikkLetiltva = false;
    this.megseGombTiltva = true;
    this.szerkestesGombTiltva = true;
    this.mentesGombTiltva = true;
    this.munkavallaloForm.disable();
    // this.munkavallaloForm.controls['vezetekNev'].disable();
    // this.munkavallaloForm.controls['keresztNev'].disable();
    // this.munkavallaloForm.controls['tajSzam'].disable();
    // this.munkavallaloForm.controls['adoszam'].disable();
    this.filterMezoErteke = '';
  }

  private szerkesztesEndegelyezese() {
    this.filterMezoLetiltva = true;
    this.tableKlikkLetiltva = true;
    this.megseGombTiltva = false;
    this.szerkestesGombTiltva = true;
    this.mentesGombTiltva = false;
    this.munkavallaloForm.enable();
    // this.munkavallaloForm.controls['vezetekNev'].disable();
    // this.munkavallaloForm.controls['keresztNev'].disable();
    // this.munkavallaloForm.controls['tajSzam'].disable();
    // this.munkavallaloForm.controls['adoszam'].disable();
    this.filterMezoErteke = '';
  }

  private munkavallaloMentese(): void {
    this.validateAllFormFields(this.munkavallaloForm);
    if (this.munkavallaloForm.invalid) {
      console.log('Hiányos adatbegadás')
    } else {
      this.mentes();
      this.filterMezoLetiltva = false;
      this.tableKlikkLetiltva = false;
      this.megseGombTiltva = true;
      this.szerkestesGombTiltva = true;
      this.mentesGombTiltva = true;
      this.munkavallaloForm.disable();
      this.filterMezoErteke = '';
    }
  }

  private mentes() {
    this.szerkesztettFelhasznalo.nem = this.valasztottNem;
    this.munkavallaloControllerService.munkavallaloMentese(this.szerkesztettFelhasznalo).subscribe(munkavallalo => {
      this.szerkesztettFelhasznalo = munkavallalo;
      this.munkavalalokLekerdezese();
    });
  }

  private changeMindenMunkavallalo() {
    this.mindenMunkavallalo = !this.mindenMunkavallalo;
    this.szerkesztettFelhasznalo = {};
    this.munkavalalokLekerdezese();
    this.filterMezoErteke = '';
  }
}
