import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DateAdapter} from "@angular/material/core";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {NavAdatokDTO} from "../../../../build/openapi/efo";

@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.css']
})
export class DataPickerComponent implements OnInit {

  @Output() kivalasztottDatum = new EventEmitter<MatDatepickerInputEvent<Date>>();

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('hu-HU');}

  ngOnInit(): void {
  }

  selectEvent(event: MatDatepickerInputEvent<Date>) {
    this.kivalasztottDatum.emit(event);
  }
}
