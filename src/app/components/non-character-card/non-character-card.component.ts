import { Component,OnInit,OnDestroy } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-non-character-card',
  templateUrl: './non-character-card.component.html',
  styleUrls: ['./non-character-card.component.css']
})

export class NonCharacterCardComponent implements OnInit, OnDestroy {
  character1!: Character| null | undefined;
  character2!: Character| null | undefined;
  character3!: Character| null | undefined;

  private userSubscription: Subscription | undefined;

  constructor(public authService: AuthService, private router:Router) {}

  ngOnInit() {
    this.userSubscription = this.authService.getUserCharacters()
      .pipe(take(1)) 
      .subscribe(characters => {
        this.character1 = characters[0];
        this.character2 = characters[1];
        this.character3 = characters[2];
      });
  }

 async deleteUserChar(numberChar:number)
  {
    await this.authService.deleteUserCharacter(numberChar);
    window.location.reload();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }


}
