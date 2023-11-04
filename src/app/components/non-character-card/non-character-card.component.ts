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

  showCharacter1Stats: boolean = false;
  showCharacter2Stats: boolean = false;
  showCharacter3Stats: boolean = false;

  fuerza:number = 0;
  inteligencia:number = 0;
  destreza:number = 0;
  coraje:number = 0;
  carisma:number = 0;

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


  showStatsButton(characterNumber: number) {
    
    switch (characterNumber) {
      case 1:
        this.showCharacter1Stats = true;
        if(this.showCharacter1Stats){
          this.fuerza = this.character1?.fuerza || 0;
          this.inteligencia = this.character1?.inteligencia || 0;
          this.carisma = this.character1?.carisma || 0;
          this.destreza = this.character1?.destreza || 0;
          this.coraje = this.character1?.coraje || 0;
        }
        break;
      case 2:
        this.showCharacter2Stats = true;
        if(this.showCharacter2Stats){
          this.fuerza = this.character2?.fuerza || 0;
          this.inteligencia = this.character2?.inteligencia || 0;
          this.carisma = this.character2?.carisma || 0;
          this.destreza = this.character2?.destreza || 0;
          this.coraje = this.character2?.coraje || 0;
        }
        break;
      case 3:
        this.showCharacter3Stats = true;
        if(this.showCharacter3Stats){
          this.fuerza = this.character3?.fuerza || 0;
          this.inteligencia = this.character3?.inteligencia || 0;
          this.carisma = this.character3?.carisma || 0;
          this.destreza = this.character3?.destreza || 0;
          this.coraje = this.character3?.coraje || 0;
        }
        break;
    }
  }
  
  hideStatistics(characterNumber: number) {
    switch (characterNumber) {
      case 1:
        this.showCharacter1Stats = false;
        break;
      case 2:
        this.showCharacter2Stats = false;
        break;
      case 3:
        this.showCharacter3Stats = false;
        break;
    }
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
