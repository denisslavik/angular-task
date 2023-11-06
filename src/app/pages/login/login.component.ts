import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/User/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from 'src/app/components/custom-snackbar/custom-snackbar.component';
import { FormValidationService } from 'src/app/services/FormValidation/form-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private formValidationService: FormValidationService
  ) {
    const loginValidators = this.formValidationService.getLoginValidators();

    this.loginForm = this.formBuilder.group({
      email: [loginValidators.email[0], loginValidators.email[1]],
      password: [loginValidators.password[0], loginValidators.password[1]],
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.userService.login(user).subscribe(
        (response) => {
          if (response.length > 0) {
            this.userService.setCurrentUser(response[0]);
            this.router.navigate(['/home']);
          } else {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: {
                message: 'Login failed',
                icon: 'error',
              },
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['custom-snackbar-panel'],
            });
            console.warn(response, 'login error');
          }
        },
        (error) => {
          console.warn(error, 'login error');
        }
      );
    } else {
      console.warn('Form is not valid');
    }
  }
}
