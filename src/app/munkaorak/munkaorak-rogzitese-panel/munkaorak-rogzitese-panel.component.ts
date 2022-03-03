import {Component, Input, OnInit} from '@angular/core';
import {MunkaltatoReszlegControllerService, MunkavallaloControllerService, NavAdatokDTO} from "../../../../build/openapi/efo";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {ComponentBase} from "../../common/utils/component-base";

@Component({
  selector: 'app-munkaorak-rogzitese-panel',
  templateUrl: './munkaorak-rogzitese-panel.component.html',
  styleUrls: ['./munkaorak-rogzitese-panel.component.css']
})
export class MunkaorakRogzitesePanelComponent extends ComponentBase implements OnInit {

  @Input() egyNavAdat: NavAdatokDTO;

  szervezetKod = new FormControl();
  kodok: string[];
  kivalasztottReszlegNev: string = null;
  filteredKodok!: Observable<string[]>;


  constructor(private munkavallaloControllerService: MunkavallaloControllerService,
              private munkaltatoReszlegControllerService: MunkaltatoReszlegControllerService) {
    super();
    this.kodokBetoltese()
  }

  ngOnChanges(): void {

  }

  ngOnInit(): void {
    this.filteredKodok = this.szervezetKod.valueChanges.pipe(
      startWith(''),
      map(kod => this._filter(kod)),
    );
  }

  private szervezetLekereseKodAlapjan(kod: string): void {
    this.munkaltatoReszlegControllerService.reszlegKod(kod).subscribe(reszleg => {
      this.kivalasztottReszlegNev = reszleg.nev;
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

}