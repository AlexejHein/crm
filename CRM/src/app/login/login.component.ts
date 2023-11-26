import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import  { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';
  hide = true;
  email: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder,) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .then(res => {
          this.router.navigate(['/dashboard']).then(r => console.log('Login successful'));
        })
        .catch(err => {
          if (err.code === 'auth/user-not-found') {
            this.loginError = 'User does not exist.';
          } else {
            this.loginError = 'An error occurred during login.';
          }
        });
    } else {
      this.loginError = 'Please correct the errors in the form.';
    }
  }
  guestLogin() {
    this.loginForm.setValue({
      email: 'guest@login.com',
      password: '34cv42rttcf5tz3t4'
    });
  }
}
