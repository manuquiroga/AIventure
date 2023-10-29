import { Component } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-non-character-card',
  templateUrl: './non-character-card.component.html',
  styleUrls: ['./non-character-card.component.css']
})
export class NonCharacterCardComponent {
  characters: Character[] = [];
  maxCharacterCount: number = 3; // Establece el límite de personajes

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserCharacters().subscribe(characters => {
      this.characters = characters;
      console.log(characters);
    });
  }
}
