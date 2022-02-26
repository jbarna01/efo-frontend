import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ComponentBase} from "../common/utils/component-base";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MunkaltatoReszlegControllerService, MunkaltatoReszlegDTO} from "../../../build/openapi/efo";

@Component({
  selector: 'app-szervezetek',
  templateUrl: './szervezetek.component.html',
  styleUrls: ['./szervezetek.component.css']
})
export class SzervezetekComponent extends ComponentBase implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['kod', 'nev'];
  reszlegek: MunkaltatoReszlegDTO[] = [];
  dataSource!: MatTableDataSource<MunkaltatoReszlegDTO>;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private munkaltatoReszlegControllerService: MunkaltatoReszlegControllerService) {
    super();
    this.reszlegekLekerdezese();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  private reszlegekLekerdezese(): void {
    this.munkaltatoReszlegControllerService.reszlegekAll().subscribe(reszlegekList => {
      this.reszlegek = reszlegekList;
      this.dataSource = new MatTableDataSource<MunkaltatoReszlegDTO>(this.reszlegek);
      this.dataSource.paginator = this.paginator;
    });
  }

  private applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
