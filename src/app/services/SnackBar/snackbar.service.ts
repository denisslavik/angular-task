import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { CustomSnackbarComponent } from 'src/app/components/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccessSnackbar(message: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message: message,
        icon: 'done',
      },
      duration: 30000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['custom-snackbar-panel'],
    });
  }

  showErrorSnackbar(message: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        message: message,
        icon: 'error',
      },
      duration: 30000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error-snackbar'],
    });
  }
}
