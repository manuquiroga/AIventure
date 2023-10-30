import { Component,OnInit,OnDestroy } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-non-character-card',
  templateUrl: './non-character-card.component.html',
  styleUrls: ['./non-character-card.component.css']
})

export class NonCharacterCardComponent implements OnInit, OnDestroy {
  characters: Character[] = []; // Arreglo para almacenar los personajes
  maxCharacterCount: number = 3; // Número máximo de personajes permitidos

  private userSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.getUserCharacters()
      .pipe(take(1)) // Utiliza take(1) para limitar las emisiones a una sola
      .subscribe(characters => {
        this.characters = characters;
        console.log(characters);
      });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
