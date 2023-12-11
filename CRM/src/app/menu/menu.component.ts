import { Component } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  currentUserName: Observable<string>;
  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) {
    this.currentUserName = this.authService.getCurrentUser();
  }
  logout() {
    this.afAuth.signOut().then(r => this.router.navigate(['']));
  }

}
