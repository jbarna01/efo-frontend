import { Component, OnInit } from '@angular/core';
import {
  FoglalkoztatasAdatokControllerService,
  FoglalkoztatasAdatokDTO, MunkavallaloDTO,
  MunkavallaloiRogzitettAdatokDTO
} from '../../../build/openapi/efo';
import {MatTableDataSource} from "@angular/material/table";
import {PdfViewerComponent} from "../report/pdf-viewer/pdf-viewer.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-munkaorak-nyomtatasa',
  templateUrl: './munkaorak-nyomtatasa.component.html',
  styleUrls: ['./munkaorak-nyomtatasa.component.css']
})
export class MunkaorakNyomtatasaComponent implements OnInit {

  filterMezoLetiltva = false;
  filterMezoErteke = '';

  dataSource!: MatTableDataSource<FoglalkoztatasAdatokDTO>;
  rogzitettMunkaidokdisplayedColumns = ['nyomtatva', 'szervezet', 'munkanapDatuma', 'munkaidoKezdete', 'munkaidoVege', 'teljesMunkaorakSzama', 'oradij', 'osszesen', 'gombok'];

  constructor(private dialog: MatDialog,
              private foglalkoztatasAdatokControllerService: FoglalkoztatasAdatokControllerService) { }

  ngOnInit(): void {
    this.rogzitettMunkaorakTablazatInit();
  }

  private applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private rogzitettMunkaorakTablazatInit(): void {
      this.foglalkoztatasAdatokControllerService.osszesFoglalkoztatasAdatok('MIND').subscribe(foglalkoztatasAdatok => {
        this.dataSource = new MatTableDataSource<MunkavallaloDTO>(foglalkoztatasAdatok);
      });
  }

  private vegosszegSzamolas(foglalkoztatasAdatokDTO: FoglalkoztatasAdatokDTO): number {

    let szorzo = foglalkoztatasAdatokDTO.munkaszunetinap ? 2 : 1;

    let normalOsszeg = foglalkoztatasAdatokDTO.oradij * foglalkoztatasAdatokDTO.teljesMunkaorakSzama;
    let tuloraOsszeg = foglalkoztatasAdatokDTO.tulorakDija * foglalkoztatasAdatokDTO.tulorakSzama;
    let ejszakaiOsszeg = foglalkoztatasAdatokDTO.ejszakaiOrakDija * foglalkoztatasAdatokDTO.ejszakaiOrakSzama;

    return (normalOsszeg * szorzo) + tuloraOsszeg + ejszakaiOsszeg;
  }

  private printEfoAdatlap(munkavallaloiRogzitettAdatokDTO: MunkavallaloiRogzitettAdatokDTO): void {
    console.log(munkavallaloiRogzitettAdatokDTO.id);
    const dialogRef = this.dialog.open(PdfViewerComponent, {
      data: {
        id: munkavallaloiRogzitettAdatokDTO.id,
      }, disableClose: true
    });
    dialogRef.afterClosed().subscribe(printResult => {
    });
  }
}
