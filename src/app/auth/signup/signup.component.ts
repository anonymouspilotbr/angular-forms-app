import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [ Validators.email, Validators.required ]
    }),
    password: new FormControl('', {
      validators: [ Validators.required, Validators.minLength(6) ]
    })
  })

  get emailIsInvalid() {
    return this.signupForm.controls.email.touched && this.signupForm.controls.email.dirty && this.signupForm.controls.email.invalid;
  }

  get passwordIsInvalid() {
    return this.signupForm.controls.password.touched && this.signupForm.controls.password.dirty && this.signupForm.controls.password.invalid;
  }

  onSubmit() {
    const entEmail = this.signupForm.value.email;
    const entPassword = this.signupForm.value.password;
    console.log(entEmail, entPassword);
  }

  onReset() {
    this.signupForm.controls.email.setValue('');
    this.signupForm.controls.password.setValue('');
  }

}
