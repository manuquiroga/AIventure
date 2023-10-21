import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider, user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { switchMap,map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user$: Observable<User | null | undefined>;
  private usersCollection: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
  ) {
    this.usersCollection = this.afs.collection<User>('users');
    this.users$ = this.usersCollection.valueChanges();

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

  private async updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
    const snapshot = await userRef.get().toPromise();
    if (snapshot && snapshot.exists) {
      const data = snapshot?.data();

    const updatedData: Partial<User> = { 
      uid: user.uid ?? '', 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      character1: data && data.character1 !== null ? data.character1 : null,
      character2: data && data.character2 !== null ? data.character2 : null,
      character3: data && data.character3 !== null ? data.character3 : null,
      historias: data && data.historias !== null ? data.historias : 0
    } 
      
      return userRef.set(updatedData as User, { merge: true });
    } else {
      const initialData: Partial<User> = {
        uid: user.uid ?? '', 
        email: user.email, 
        displayName: user.displayName, 
        photoURL: user.photoURL,
        character1: null,
        character2: null,
        character3: null,
        historias: 0
      }
  
      return userRef.set(initialData as User);
    }
  }
  
  getUsers(): void {
    this.users$.subscribe(users => {
      console.log(users);
    });
  }

  getCurrentUser(): Observable<User | null | undefined>{
    return this.user$;
  }

  searchUser(): Observable<User | null | undefined> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          const user2: User = { uid: user.uid, email: user.email, displayName: user.email, photoURL: user.photoURL, historias: user.historias };
          return this.users$.pipe(
            map(users => users.find(u => u.uid === user2.uid))
          );
        } else {
          return of(null);
        }
      })
    );
  }

  async signOut() {
    await this.firebaseAuthenticationService.signOut();
    this.router.navigate(['/']);
  }

}

