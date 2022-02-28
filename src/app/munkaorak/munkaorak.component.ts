import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MunkavallaloControllerService, MunkavallaloDTO} from "../../../build/openapi/efo";
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
  munkavallalok: MunkavallaloDTO[] = [];
  szerkesztettFelhasznalo = {} as MunkavallaloDTO;
  dataSource!: MatTableDataSource<MunkavallaloDTO>;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private munkavallaloControllerService: MunkavallaloControllerService) {
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
  }
}
