import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MunkavallaloControllerService, MunkavallaloDTO} from "../../../build/openapi/efo";
import {MatRow, MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-munkavallalok',
  templateUrl: './munkavallalok.component.html',
  styleUrls: ['./munkavallalok.component.css']
})
export class MunkavallalokComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['icon', 'neve', 'tajSzama', 'adoszam'];
  munkavallalok: MunkavallaloDTO[] = [];
  szerkesztettFelhasznalo = {} as MunkavallaloDTO;

  dataSource!: MatTableDataSource<MunkavallaloDTO>;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private munkavallaloControllerService: MunkavallaloControllerService) {
    this.munkavalalokLekerdezese();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {}

  private munkavalalokLekerdezese():void {
    this.munkavallaloControllerService.munkavallalokAll().subscribe(munkavallalokList => {
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
    this.szerkesztettFelhasznalo = kivalasztottFelhasznalo
  }

}
