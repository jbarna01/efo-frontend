import {Component, OnInit, ViewChild} from '@angular/core';
import {MunkavallaloControllerService, MunkavallaloDTO} from "../../../build/openapi/efo";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-munkavallalok',
  templateUrl: './munkavallalok.component.html',
  styleUrls: ['./munkavallalok.component.css']
})
export class MunkavallalokComponent implements OnInit {

  munkavallalok: MunkavallaloDTO[] = [];
  displayedColumns: string[] = ['icon', 'neve', 'tajSzama', 'adoszam']
  dataSource = new MatTableDataSource<MunkavallaloDTO>(this.munkavallalok);

  constructor(private munkavallaloControllerService: MunkavallaloControllerService) { }

  ngOnInit(): void {
    this.munkavalalokLekerdezese();
  }

  private munkavalalokLekerdezese() {
    this.munkavallaloControllerService.munkavallalokAll().subscribe(munkavallalokList => {
      this.munkavallalok = munkavallalokList;
    })
  }

}
