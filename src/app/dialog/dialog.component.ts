import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  title: string;
  content: string;
  onConfirm: any;
  buttonConfirm?: string = 'Confirm';
  danger?: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.title = data.title;
      this.content = data.content;
      this.onConfirm = data.onConfirm;
      this.buttonConfirm = data.buttonConfirm;
      this.danger = data.danger;
    }


  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
