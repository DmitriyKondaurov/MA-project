import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app-interfaces';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  userUid: string = '';

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user): any => {
        if (user) {
          return this.db.list(`users/${user.uid}`).snapshotChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  async googleSignin() {
    const provider = new GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user: any) {
    this.userUid = user['uid'];
    localStorage.setItem('uid', user['uid'])
    const userRef: AngularFireList<User> = this.db.list(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      transactionList: {},
    }
    let arr: any[] = []
    userRef.valueChanges().subscribe(res => {
      res.forEach(el => {
        arr.push(Object.keys(el))
      })
      return arr.flat().includes('uid') ? null : userRef.push(data);
    })
  }

  async signOut() {
    delete localStorage['uid'];
    await this.afAuth.signOut()
    .then((res) => console.log('success', res))
    .catch((error) => console.log(error));
    this.router.navigate(['']);
  }
}
