import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ButtonService } from './button.service';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private router: Router, private firebase: AngularFireAuth) {
    this.user$ = this.firebase.authState;
  }

  login() {
    this.firebase.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(_ => {
        this.router.navigate([`/list`])
      })
      .catch(error => console.log('auth error', error));
  }

  logout() { 
    this.firebase.auth.signOut();
    this.router.navigate([`/list`]);
  }

}