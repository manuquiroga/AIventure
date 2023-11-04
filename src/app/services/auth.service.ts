import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Character } from '../models/character.model';
import { shareReplay } from 'rxjs/operators';

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
        if (user) {
          console.log('Usuario autenticado:', user);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          console.log('Usuario no autenticado');
          return of(null);
        }
      }),
      shareReplay(1) // Compartir la misma suscripción entre observadores
    );
  }

  googleSignin() {
    const provider = new GoogleAuthProvider();
    this.firebaseAuthenticationService.signInWithPopup(provider)
      .then(credential => this.updateUserData(credential.user))
      .catch(error => {
        console.error('Error al iniciar sesión con Google:', error);
      });
  }

  private async updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
    try {
      const snapshot = await userRef.get().toPromise();
      if (snapshot && snapshot.exists) {
        const data = snapshot.data();
  
        const updatedData: Partial<User> = {
          uid: user.uid ?? '',
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          character1: data?.character1 || null,
          character2: data?.character2 || null,
          character3: data?.character3 || null,
          historias: data?.historias || 0
        };
  
        await userRef.set(updatedData as User, { merge: true });
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
        };
  
        await userRef.set(initialData as User);
      }
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  }
  

  getUsers() {
    this.afs.collection<User>('users').valueChanges().subscribe(users => {
      console.log('Usuarios:', users);
    });
  }

  getCurrentUser(): Observable<User | null | undefined> {
    return this.user$;
  }

  searchUser(): Observable<User | null | undefined> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          const user2: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.email,
            photoURL: user.photoURL,
            historias: user.historias
          };
          return this.afs.collection<User>('users').valueChanges().pipe(
            switchMap(users => {
              console.log('Usuarios en búsqueda:', users);
              return of(users.find(u => u.uid === user2.uid));
            })
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

  async saveCharacter(character: Character) {
    const user = await this.firebaseAuthenticationService.currentUser;
    if (user) {
      const userRef = this.afs.doc(`users/${user.uid}`);
      const userDoc = await userRef.get().toPromise();
      const character1 = userDoc?.get('character1');
      const character2 = userDoc?.get('character2');
      const character3 = userDoc?.get('character3');
      if (!character1) {
        await userRef.update({ character1: character });
      } else if (!character2) {
        await userRef.update({ character2: character });
      } else if (!character3) {
        await userRef.update({ character3: character });
      } else {
        console.error('Todos los campos de personajes están ocupados. No se puede guardar un nuevo personaje.');
      }
    } else {
      console.error('Usuario no autenticado. No se puede guardar el personaje.');
    }
  }

  getUserCharacters(): Observable<Character[]> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          const characters: any[] = [];
          
          if (user.character1 && !characters.includes(user.character1)) characters.push(user.character1);
          else characters.push(undefined);

          if (user.character2 && !characters.includes(user.character2)) characters.push(user.character2);
          else characters.push(undefined);
          
          if (user.character3 && !characters.includes(user.character3)) characters.push(user.character3);
          else characters.push(undefined);
          
          return of(characters);
        } else {
          return of([]);
        }
      })
    );
  }


 async deleteUserCharacter(slot:number)
  {
      const user = await this.firebaseAuthenticationService.currentUser;
      if (user) {
        const userRef = this.afs.doc(`users/${user.uid}`);
        const userDoc = await userRef.get().toPromise();
        const character1 = userDoc?.get('character1');
        const character2 = userDoc?.get('character2');
        const character3 = userDoc?.get('character3');
        if (slot===1) {
          await userRef.update({ character1: null });
        } else if (slot===2) {
          await userRef.update({ character2: null });
        } else if (slot===3) {
          await userRef.update({ character3: null });
        }
      } else {
        console.error('Usuario no autenticado. No se puede borrar el personaje.');
      }
  }

  
}
