import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor() {}

  getLoginValidators() {
    return {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    };
  }

  getProfileValidators() {
    return {
      FirstName: ['', [Validators.required, Validators.maxLength(255)]],
      LastName: ['', [Validators.required, Validators.maxLength(255)]],
      PhoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$|^\d{10}$/),
        ],
      ],
      Email: ['', [Validators.required, Validators.email]],
      Website: [
        '',
        Validators.pattern(
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
        ),
      ],
    };
  }
}
