import { Component } from '@angular/core';
import {SharedService} from "./common/services/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public sharedServices: SharedService) {}

  title = 'efo-frontend';
}
