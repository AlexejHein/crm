import { Injectable } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/compat/auth";
import { Observable, of } from 'rxjs';
import { map, catchError} from "rxjs/operators";

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
  isAuthenticated() {
    return this.user.pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }
}
