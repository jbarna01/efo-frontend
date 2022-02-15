import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbItem} from "./breadcrumb-item";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() items: BreadcrumbItem[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
