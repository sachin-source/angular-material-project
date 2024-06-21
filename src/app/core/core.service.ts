import { Injectable, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  _snackBar = inject(MatSnackBar);

  constructor() { }

  openSnackBar(message:string, action:string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top'
    });
  }
}
