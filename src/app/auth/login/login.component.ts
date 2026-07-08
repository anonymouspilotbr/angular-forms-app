import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [ Validators.email, Validators.required ]
    }),
    password: new FormControl('', {
      validators: [ Validators.required, Validators.minLength(6) ]
    })
  });

  get emailIsInvalid() {
    return this.loginForm.controls.email.touched && this.loginForm.controls.email.dirty && this.loginForm.controls.email.invalid;
  }

  get passwordIsInvalid() {
    return this.loginForm.controls.password.touched && this.loginForm.controls.password.dirty && this.loginForm.controls.password.invalid;
  }

  ngOnInit() {
    const savedForm = localStorage.getItem('saved-login-form');

    if(savedForm){
      const loadedForm = JSON.parse(savedForm);
      this.loginForm.patchValue({
        email: loadedForm.email
      })
    }

    const subscription = this.loginForm.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}));
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    const entEmail = this.loginForm.value.email;
    const entPassword = this.loginForm.value.password;
  }
}