import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MunkavallaloControllerService, MunkavallaloDTO, NavAdatokControllerService, NavAdatokDTO} from "../../../../build/openapi/efo";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ComponentBase} from "../../common/utils/component-base";

@Component({
  selector: 'app-munkaorak-nav-adatok',
  templateUrl: './munkaorak-nav-adatok.component.html',
  styleUrls: ['./munkaorak-nav-adatok.component.css']
})
export class MunkaorakNavAdatokComponent extends ComponentBase implements OnInit {

  displayedColumns: string[] = ['neve'];
  displayedColumnsNav: string[] = ['kezdesNapja', 'napokSzama']
  munkavallalok: MunkavallaloDTO[] = [];
  navAdatok: NavAdatokDTO[] = [];
  dataSourceNav: MatTableDataSource<NavAdatokDTO>;
  dataSource: MatTableDataSource<MunkavallaloDTO>;
  kivalasztottFelhasznalo: MunkavallaloDTO = {}

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  @Output() felhasznaloNavAdat = new EventEmitter<NavAdatokDTO>();
  @Output() munkavallalo = new EventEmitter<MunkavallaloDTO>();

  felhasznaloSelectedRowIndex = -1;
  navAdatSelectedRowIndex = 0;

  constructor(private munkavallaloControllerService: MunkavallaloControllerService,
              private navAdatokControllerService: NavAdatokControllerService) {
    super();
    this.munkavalalokLekerdezese();
  }

  ngOnInit(): void {
  }

  private munkavalalokLekerdezese(): void {
    this.munkavallaloControllerService.munkavallalokHianyos('KITOLTOTT').subscribe(munkavallalokList => {
      this.munkavallalok = munkavallalokList;
      this.dataSource = new MatTableDataSource<MunkavallaloDTO>(this.munkavallalok);
      this.dataSource.paginator = this.paginator;
    });
  }

  private applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private felhasznaloValasztas(index: number, kivalasztottFelhasznalo: MunkavallaloDTO) {
    this.felhasznaloSelectedRowIndex = index;
    this.kivalasztottFelhasznalo = kivalasztottFelhasznalo;
    this.munkavallalo.emit(kivalasztottFelhasznalo);
    const tajSzam = kivalasztottFelhasznalo.tajSzama;
    if (!!tajSzam) {
      this.navAdatokControllerService.navAdatokTajAlapjan(tajSzam!).subscribe(navAdatokList => {
        this.navAdatok = navAdatokList;
        this.dataSourceNav = new MatTableDataSource<NavAdatokDTO>(this.navAdatok);
        this.dataSourceNav.paginator = this.paginator;
        this.bejelentesvalasztas(0, this.navAdatok[0]);
      });
    }
  }

  private bejelentesvalasztas(index: number, felhasznaloNavAdat: NavAdatokDTO) {
    this.navAdatSelectedRowIndex = index;
    this.felhasznaloNavAdat.emit(felhasznaloNavAdat);
  }

}
