import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  loginError: string = '';
  signUpError: string = '';
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .then(() => this.router.navigate(['/dashboard']))
        .catch(err => {
          this.loginError = err.code === 'auth/user-not-found' ? 'User does not exist.' : 'An error occurred during login.';
        });
    } else {
      this.loginError = 'Please correct the errors in the form.';
    }
  }

  guestLogin(): void {
    this.loginForm.setValue({
      email: 'guest@login.com',
      password: '34cv42rttcf5tz3t4'
    });
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value.email, this.signUpForm.value.password)
        .then(() => this.router.navigate(['/dashboard']))
        .catch((err: { code: string; }) => {
          this.signUpError = err.code === 'auth/email-already-in-use' ? 'Email already in use.' : 'An error occurred during sign up.';
        });
    } else {
      this.signUpError = 'Please correct the errors in the form.';
    }
  }
}
