import {Component, OnInit} from "@angular/core";
import {TesztControllerService, TesztRequest, TesztResponse} from "../../../build/openapi/efo";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message: string = '';

  constructor(private tesztSzerviz: TesztControllerService) { }

  ngOnInit(): void {
  }

  kuld(): void {
    this.tesztSzerviz.deliveryStatus(1).subscribe((tesztRequest: TesztRequest) => {
      this.message = tesztRequest.message
    })
  }

}
