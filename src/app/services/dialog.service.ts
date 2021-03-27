import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class DialogService {


  constructor(private dialog: MatDialog) {}

  //Method to open dialog, arguments may be passed by the caller component regarding of the context
  openDialog(title,content,onConfirm,buttonConfirm?,danger?,){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      content: content,
      buttonConfirm,
      danger,
      onConfirm,
    }
    this.dialog.open(DialogComponent,dialogConfig)
  }

}