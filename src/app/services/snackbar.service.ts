// -- IMPORTS -- //

  // NG Modules
import { Injectable } from '@angular/core';

  // Material Components
import {MatSnackBar} from '@angular/material/snack-bar';

// ----

@Injectable({
    providedIn: 'root'
  })

export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * @desc open a snackbar on the bottom of the screen giving a message and an action. it disappears after 2s
   * @param message - the message to be displayed
   * @param action - the message of the action button - facultative
   * @param important - if set the snackbar will stay for 5s. Might be useful for errors
   */
  openSnackBar(message: string, action?: string, important?: boolean): void {
    this.snackBar.open(message, action, {
      duration: important ? 5000 : 2000,
    });
  }

}
