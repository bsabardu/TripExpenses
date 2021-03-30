// -- IMPORTS -- //

  // NG Module
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Injectable } from '@angular/core';

  // Local Components
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

// ----

@Injectable({
    providedIn: 'root'
  })

export class DialogService {


  constructor(private dialog: MatDialog) {}

  /**
   * @desc open a dialog in the UI - this service provide serveral arguments to customize it
   * @param title - the title of the dialog, a summary of the action or confirmation asked to the user
   * @param content - the content of the dialog, use it to provide further information
   * @param onConfirm - the fonction to execute when the user confirm the dialog
   * @param buttonConfirm - the text on the confirm button.
   * It should be directly related to the action that user will to do. try to avoid "Confirm"
   * @param danger - danger dialog will have a dedicated style (in red)
   * to help user see that that the action will have an important impact. Usefull for delete actions
   */
  openDialog(title: string, content: string, onConfirm: () => void, buttonConfirm?: string, danger?: boolean): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title,
      content,
      buttonConfirm,
      onConfirm,
      danger,
    };
    this.dialog.open(DialogComponent, dialogConfig);
  }

}
