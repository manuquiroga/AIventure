import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<User | null | undefined>;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
  ) {

    this.user$ = this.firebaseAuthenticationService.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  async googleSignin() {
    const provider = new GoogleAuthProvider();
    const credential = await this.firebaseAuthenticationService.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      character1: user.character1 || null,
      character2: user.character2 || null,
      character3: user.character3 || null,
      historias: user.historias || 0
    } 
    
    return userRef.set(data, { merge: true })
  }

  async signOut() {
    await this.firebaseAuthenticationService.signOut();
    this.router.navigate(['/']);
  }
  
}

