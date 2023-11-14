import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import  { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  email: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password)
      .then(res => {
        this.router.navigate(['/dashboard']).then(r => console.log(r));
        console.log('Erfolgreich eingelogt!', res);
      })
      .catch(err => {
        this.router.navigate(['/']).then(r => console.log(r));
        console.log('Etwas ist schief gelaufen:', err.message);
      });

  }

}
