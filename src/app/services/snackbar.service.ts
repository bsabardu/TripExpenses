import {MatSnackBar} from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  //Important param can be used to increase snack bar duration, ex: for errors
  openSnackBar(message: string, action?: string, important?: boolean) {
    this._snackBar.open(message, action, {
      duration: important ? 5000 : 2000,
    });
  }

}