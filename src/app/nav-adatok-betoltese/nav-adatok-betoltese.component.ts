import {Component, OnInit} from '@angular/core';
import {NavIdeigelenesAdatokControllerService} from '../../../build/openapi/efo';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-nav-adatok-betoltese',
  templateUrl: './nav-adatok-betoltese.component.html',
  styleUrls: ['./nav-adatok-betoltese.component.css']
})
export class NavAdatokBetolteseComponent implements OnInit {

  fileName = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("file", file);

      const upload$ = this.http.post("http://localhost:8080/nav-ideiglenes-adatok/betoltes", formData);

      upload$.subscribe();
    }
  }

}
