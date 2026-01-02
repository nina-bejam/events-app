import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, type: 'success' | 'error' | 'info' = 'success') {
    this.snackBar.open(message, type.toUpperCase(), { duration: 2500 });
  }
}
