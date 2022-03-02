import {Component, OnInit, ViewChild} from '@angular/core';
import {
  MunkaltatoReszlegControllerService, MunkaltatoReszlegDTO,
  MunkavallaloControllerService,
  MunkavallaloDTO,
  NavAdatokControllerService,
  NavAdatokDTO
} from "../../../build/openapi/efo";
import {MatTableDataSource} from "@angular/material/table";
import {ComponentBase} from "../common/utils/component-base";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-munkaorak',
  templateUrl: './munkaorak.component.html',
  styleUrls: ['./munkaorak.component.css']
})
export class MunkaorakComponent extends ComponentBase implements OnInit {

  displayedColumns: string[] = ['neve'];
  displayedColumnsNav: string[] = ['kezdesNapja', 'napokSzama']
  munkavallalok: MunkavallaloDTO[] = [];
  navAdatok: NavAdatokDTO[] = [];
  dataSource: MatTableDataSource<MunkavallaloDTO>;
  dataSourceNav: MatTableDataSource<NavAdatokDTO>;
  egyNavAdat: NavAdatokDTO = {};
  navOsszesitettAdatLathato = false;

  public kivalasztottMunkavallaloNeve: string = '';
  public kivalasztottMunkavallaloTajSzama: string = '';
  public kivalasztottMunkavallaloAdoszama: string = '';

  szervezetKod = new FormControl();
  kodok: string[];
  kivalasztottReszlegNev: string = null;
  filteredKodok!: Observable<string[]>;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private munkavallaloControllerService: MunkavallaloControllerService,
              private navAdatokControllerService: NavAdatokControllerService,
              private munkaltatoReszlegControllerService: MunkaltatoReszlegControllerService) {
    super();
    this.munkavalalokLekerdezese();
    this.kodokBetoltese()
  }

  ngOnInit(): void {
    this.filteredKodok = this.szervezetKod.valueChanges.pipe(
      startWith(''),
      map(kod => this._filter(kod)),
    );
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

  private szervezetLekereseKodAlapjan(kod: string): void {
    this.munkaltatoReszlegControllerService.reszlegKod(kod).subscribe(reszleg => {
      this.kivalasztottReszlegNev = reszleg.nev;
    })
  }

  private munkavalalokLekerdezese(): void {
    this.munkavallaloControllerService.munkavallalokHianyos().subscribe(munkavallalokList => {
      this.munkavallalok = munkavallalokList;
      this.dataSource = new MatTableDataSource<MunkavallaloDTO>(this.munkavallalok);
      this.dataSource.paginator = this.paginator;
    });
  }

  private applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private felhasznaloValasztas(kivalasztottFelhasznalo: MunkavallaloDTO) {
    const tajSzam = kivalasztottFelhasznalo.tajSzama;
    this.kivalasztottMunkavallaloNeve = kivalasztottFelhasznalo?.neve!;
    this.kivalasztottMunkavallaloTajSzama = tajSzam!;
    this.kivalasztottMunkavallaloAdoszama = kivalasztottFelhasznalo.adoszam!;
    if (!!tajSzam) {
      this.navAdatokControllerService.navAdatokTajAlapjan(tajSzam!).subscribe(navAdatokList => {
        this.navAdatok = navAdatokList;
        this.dataSourceNav = new MatTableDataSource<NavAdatokDTO>(this.navAdatok);
        this.dataSourceNav.paginator = this.paginator;
        this.navOsszesitettAdatLathato = false;
      });
    }
  }

  private bejelentesvalasztas(kivalasztottFelhasznalo: MunkavallaloDTO) {

    const id = kivalasztottFelhasznalo.id;
    this.navAdatokControllerService.navAdatokId(kivalasztottFelhasznalo.id!).subscribe(adat => {
      this.egyNavAdat = adat;
      this.navOsszesitettAdatLathato = true;
    })

  }
}
