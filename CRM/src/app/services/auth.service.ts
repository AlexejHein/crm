import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable, of } from 'rxjs';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login(email: string | undefined, password: string | undefined) {
    return this.afAuth.signInWithEmailAndPassword(<string>email, <string>password);
  }

  createUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  getCurrentUser(): Observable<string> {
    return this.user.pipe(
      map(user => user ? user.email : 'Guest'),
      catchError(() => of('Guest'))
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.user.pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }
}
