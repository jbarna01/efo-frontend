import {Component, OnInit} from '@angular/core';
import {NavIdeigelenesAdatokControllerService} from "../../../build/openapi/efo";


@Component({
  selector: 'app-nav-adatok-betoltese',
  templateUrl: './nav-adatok-betoltese.component.html',
  styleUrls: ['./nav-adatok-betoltese.component.css']
})
export class NavAdatokBetolteseComponent implements OnInit {

  constructor(private navIdeigelenesAdatokControllerService: NavIdeigelenesAdatokControllerService) {
  }

  ngOnInit(): void {
  }

  private navAdatokBetoltese(): void {
    this.navIdeigelenesAdatokControllerService.adatokBetoltese().subscribe(() => {
      console.log("Adatok betöltése megtörtént");
    })
  }

}
