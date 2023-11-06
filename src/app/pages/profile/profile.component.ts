import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/User/user.service';
import { SnackbarService } from 'src/app/services/SnackBar/snackbar.service';
import { HttpService } from 'src/app/services/Http/http.service';
import { FormValidationService } from 'src/app/services/FormValidation/form-validation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  currentUser: any;
  initialFormState: any;
  profileForm: FormGroup = this.formBuilder.group({});

  constructor(
    private userService: UserService,
    private httpService: HttpService,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.buildForm();
    this.initialFormState = this.profileForm.value;
  }

  buildForm(): void {
    const profileValidators = this.formValidationService.getProfileValidators();

    this.profileForm = this.formBuilder.group({
      FirstName: [this.currentUser.FirstName, profileValidators.FirstName[1]],
      LastName: [this.currentUser.LastName, profileValidators.LastName[1]],
      PhoneNumber: [
        this.currentUser.PhoneNumber,
        profileValidators.PhoneNumber[1],
      ],
      Email: [this.currentUser.Email, profileValidators.Email[1]],
      Website: [this.currentUser.Website, profileValidators.Website[1]],
    });
  }

  isFormChanged(): boolean {
    return (
      JSON.stringify(this.initialFormState) !==
      JSON.stringify(this.profileForm.value)
    );
  }

  isFieldInvalid(field: string): boolean {
    const fieldControl = this.profileForm.get(field);
    return !!(fieldControl && fieldControl.invalid && fieldControl.touched);
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const user = this.buildUser();
      this.updateUser(user);
    } else {
      this.snackbarService.showErrorSnackbar(
        'Please correct the validation errors before saving.'
      );
    }
  }

  buildUser(): any {
    return {
      FirstName: this.profileForm.get('FirstName')?.value,
      LastName: this.profileForm.get('LastName')?.value,
      PhoneNumber: this.profileForm.get('PhoneNumber')?.value,
      Email: this.profileForm.get('Email')?.value,
      Website: this.profileForm.get('Website')?.value,
      Password: this.currentUser.Password,
      id: this.currentUser.id,
    };
  }

  updateUser(user: any): void {
    this.httpService.updateUser(this.currentUser.id, user).subscribe(
      (response) => {
        this.handleSuccessfulUpdate(user);
      },
      (error) => {
        console.error('There was an error while updating the user', error);
      }
    );
  }

  handleSuccessfulUpdate(user: any): void {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
    this.snackbarService.showSuccessSnackbar('Profile updated successfully');
    this.profileForm.markAsPristine();
    this.profileForm.reset(this.initialFormState);

    this.userService.setCurrentUser(user);
    this.currentUser = this.userService.getCurrentUser();

    this.profileForm.setValue({
      FirstName: this.currentUser.FirstName,
      LastName: this.currentUser.LastName,
      PhoneNumber: this.currentUser.PhoneNumber,
      Email: this.currentUser.Email,
      Website: this.currentUser.Website,
    });
    this.initialFormState = this.profileForm.value;
  }
}
