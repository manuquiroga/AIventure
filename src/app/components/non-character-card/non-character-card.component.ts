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

  getCharacterImage(numberChar:number){
    let sexo = "";
    let especie = "";
    let rol = "";

    switch(numberChar){
      case 1: {
        sexo = this.character1?.sexo || "";
        especie = this.character1?.especie || "";
        rol = this.character1?.rol || "";
        break;
      }
        
      case 2: {
        sexo = this.character2?.sexo || "";
        especie = this.character2?.especie || "";
        rol = this.character2?.rol || "";
        break;
      }
        
      case 3: {
        sexo = this.character3?.sexo || "";
        especie = this.character3?.especie || "";
        rol = this.character3?.rol || "";
        break;
      }
    }

    let url = "";

    if(sexo !== "" && especie !== "" && rol !== ""){
      url = `https://aiventure-images.up.railway.app/imagen/${sexo}/${especie}/${rol}/`;
    }
    
    return url;
  }

}
