import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NavIdeigelenesAdatokControllerService, NavIdeiglenesAdatokDTO} from '../../../build/openapi/efo';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-nav-adatok-betoltese',
  templateUrl: './nav-adatok-betoltese.component.html',
  styleUrls: ['./nav-adatok-betoltese.component.css']
})
export class NavAdatokBetolteseComponent implements OnInit, AfterViewInit {

  fileName = '';
  betoltottAdatokSzama = 0;
  showSpinner = false;
  utolsoMunkavallalo: NavIdeiglenesAdatokDTO;

  constructor(private http: HttpClient,
              private navIdeigelenesAdatokControllerService: NavIdeigelenesAdatokControllerService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.utolsoRekord();
  }

  onFileSelected(event) {

    const file: File = event.target.files[0];

    if (file) {

      this.showSpinner = true;

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("file", file);

      const upload$ = this.http.post("http://localhost:8081/nav-ideiglenes-adatok/betoltes", formData);

      upload$.subscribe((darabszam: number) => {
        this.betoltottAdatokSzama = darabszam;
        this.utolsoRekord();
        this.showSpinner = false;
      });
    }
  }

  private utolsoRekord() {
    this.navIdeigelenesAdatokControllerService.legutolsoBetoltottNavAdat().subscribe(munkavallalo => {
      this.utolsoMunkavallalo = munkavallalo;
    });
  }

}
