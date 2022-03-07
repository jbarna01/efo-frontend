import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface Munkaora {
  value: string;
  data: string;
}

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {

  munkaorak: Munkaora[] = [
    {value: '0000', data: '00:00'}, {value: '0030', data: '00:30'}, {value: '0100', data: '01:00'}, {value: '0130', data: '01:30'},
    {value: '0200', data: '02:00'}, {value: '0230', data: '02:30'}, {value: '0300', data: '03:00'}, {value: '0330', data: '03:30'},
    {value: '0400', data: '04:00'}, {value: '0430', data: '04:30'}, {value: '0500', data: '05:00'}, {value: '0530', data: '05:30'},
    {value: '0600', data: '06:00'}, {value: '0630', data: '06:30'}, {value: '0700', data: '07:00'}, {value: '0730', data: '07:30'},
    {value: '0800', data: '08:00'}, {value: '0830', data: '08:30'}, {value: '0900', data: '09:00'}, {value: '0930', data: '09:30'},
    {value: '1000', data: '10:00'}, {value: '1030', data: '10:30'}, {value: '1100', data: '11:00'}, {value: '1130', data: '11:30'},
    {value: '1200', data: '12:00'}, {value: '1230', data: '12:30'}, {value: '1300', data: '13:00'}, {value: '1330', data: '13:30'},
    {value: '1400', data: '14:00'}, {value: '1430', data: '14:30'}, {value: '1500', data: '15:00'}, {value: '1530', data: '15:30'},
    {value: '1600', data: '16:00'}, {value: '1630', data: '16:30'}, {value: '1700', data: '17:00'}, {value: '1730', data: '17:30'},
    {value: '1800', data: '18:00'}, {value: '1830', data: '18:30'}, {value: '1900', data: '19:00'}, {value: '1930', data: '19:30'},
    {value: '2000', data: '20:00'}, {value: '2030', data: '20:30'}, {value: '2100', data: '21:00'}, {value: '2130', data: '21:30'},
    {value: '2200', data: '22:00'}, {value: '2230', data: '22:30'}, {value: '2300', data: '23:00'}, {value: '2330', data: '23:30'}];

  @Input() selected: string;
  @Output() selectedTime = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  private selectedTimeEvent(value): void {
    const time = this.munkaorak.filter(m => m.value == value)
    this.selectedTime.emit(time.pop().data);
  }
}
