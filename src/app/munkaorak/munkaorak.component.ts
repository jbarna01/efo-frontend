import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MunkavallaloControllerService, MunkavallaloDTO, NavAdatokControllerService, NavAdatokDTO} from "../../../build/openapi/efo";
import {MatTableDataSource} from "@angular/material/table";
import {ComponentBase} from "../common/utils/component-base";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

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
  szerkesztettFelhasznalo = {} as MunkavallaloDTO;
  dataSource!: MatTableDataSource<MunkavallaloDTO>;
  dataSourceNav!: MatTableDataSource<NavAdatokDTO>;

  public kivalasztottMunkavallaloNeve: string = '';
  public kivalasztottMunkavallaloTajSzama: string = '';
  public kivalasztottMunkavallaloAdoszama: string = '';

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private munkavallaloControllerService: MunkavallaloControllerService,
              private navAdatokControllerService: NavAdatokControllerService) {
    super();
    this.munkavalalokLekerdezese();
  }

  ngOnInit(): void {
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
      });
    }
  }

  private bejelentesvalasztas(kivalasztottFelhasznalo: MunkavallaloDTO) {
  }
}
