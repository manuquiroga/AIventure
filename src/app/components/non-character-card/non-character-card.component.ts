import { Component, OnInit, OnDestroy } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-non-character-card',
  templateUrl: './non-character-card.component.html',
  styleUrls: ['./non-character-card.component.css'],
})
export class NonCharacterCardComponent implements OnInit, OnDestroy {
  character1!: Character | null | undefined;
  character2!: Character | null | undefined;
  character3!: Character | null | undefined;

  crear1: boolean = false;
  crear2: boolean = false;
  crear3: boolean = false;

  showCharacter1Stats: boolean = false;
  showCharacter2Stats: boolean = false;
  showCharacter3Stats: boolean = false;

  fuerza: number = 0;
  inteligencia: number = 0;
  destreza: number = 0;
  coraje: number = 0;
  carisma: number = 0;

  private userSubscription: Subscription | undefined;

  constructor(
    public authService: AuthService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService
      .getUserCharacters()
      .subscribe((characters) => {
        this.character1 = characters[0];
        this.character2 = characters[1];
        this.character3 = characters[2];
      });
    this.refreshComponent();
  }

  showCharacterComponent(characterNumber: number) {
    this.ocultarComponente(false);
    switch (characterNumber) {
      case 1:
        this.crear1 = true;
        this.crear2 = false;
        this.crear3 = false;

        break;
      case 2:
        this.crear1 = false;
        this.crear2 = true;
        this.crear3 = false;
        break;
      case 3:
        this.crear1 = false;
        this.crear2 = false;
        this.crear3 = true;
        break;
    }
  }

  showStatsButton(characterNumber: number) {
    this.showCharacter1Stats = false;
    this.showCharacter2Stats = false;
    this.showCharacter3Stats = false;

    switch (characterNumber) {
      case 1:
        this.showCharacter1Stats = true;
        if (this.showCharacter1Stats) {
          this.fuerza = this.character1?.fuerza || 0;
          this.inteligencia = this.character1?.inteligencia || 0;
          this.carisma = this.character1?.carisma || 0;
          this.destreza = this.character1?.destreza || 0;
          this.coraje = this.character1?.coraje || 0;
        }
        break;
      case 2:
        this.showCharacter2Stats = true;
        if (this.showCharacter2Stats) {
          this.fuerza = this.character2?.fuerza || 0;
          this.inteligencia = this.character2?.inteligencia || 0;
          this.carisma = this.character2?.carisma || 0;
          this.destreza = this.character2?.destreza || 0;
          this.coraje = this.character2?.coraje || 0;
        }
        break;
      case 3:
        this.showCharacter3Stats = true;
        if (this.showCharacter3Stats) {
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

  async deleteUserChar(numberChar: number) {
    const confirmed = window.confirm('¿Seguro que deseas eliminar este personaje?');
    if(confirmed){
      await this.authService.deleteUserCharacter(numberChar);
      
    this.refreshComponent();
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  refreshComponent() {
    this.cd.detectChanges();
  }

  //oculta la creacion de un personaje al crearlo
  ocultar = true;
  ocultarComponente(ocultar: boolean) {
    this.ocultar = !ocultar;
    this.crear1 = false;
    this.crear2 = false;
    this.crear3 = false;
  }

  
}
