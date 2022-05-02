import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrakRogziteseComponent} from "../../munkaorak/dialogs/orak-rogzitese/orak-rogzitese.component";

@Component({
  selector: 'app-megerrosites-dialog',
  templateUrl: './megerrosites-dialog.component.html',
  styleUrls: ['./megerrosites-dialog.component.css']
})
export class MegerrositesDialogComponent implements OnInit {

  title: string;
  msg: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<OrakRogziteseComponent>) {
    this.title = data.title;
    this.msg = data.msg;
  }

  ngOnInit(): void {
  }

  public igenGomb() {
    this.dialogRef.close(true);
  }

  public nemGomb() {
    this.dialogRef.close(false);
  }

}
