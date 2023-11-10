import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Story } from 'src/app/models/story.model';
import { OpenaiService } from 'src/app/services/openai.service';
import { NonCharacterCardComponent } from '../non-character-card/non-character-card.component';
import { AuthService } from 'src/app/services/auth.service';
import { Character } from 'src/app/models/character.model';

interface Tipo {
  value: string;
  viewValue: string;
}
interface Lugar {
  value: string;
  viewValue: string;
}

interface Tags {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-story-creation',
  templateUrl: './story-creation.component.html',
  styleUrls: ['./story-creation.component.css'],
})
export class StoryCreationComponent {
  @Output() ocultar = new EventEmitter<boolean>();

  story: Story | null | undefined;

  selectedTipo: string = '';
  selectedLugar: string = '';

  firstSection: boolean = true;
  tagsSection: boolean = false;

  tipos: Tipo[] = [
    { value: 'aventura', viewValue: 'Aventura' },
    { value: 'fantasia', viewValue: 'Fantasía' },
    { value: 'misterio', viewValue: 'Misterio' },
    { value: 'realismo', viewValue: 'Realismo' },
    { value: 'romance', viewValue: 'Romance' },
  ];

  lugares: Lugar[] = [
    { value: 'bosque oscuro magico', viewValue: 'Bosque oscuro mágico' },
    {
      value: 'mercado medieval bullicioso',
      viewValue: 'Mercado medieval bullicioso',
    },
    { value: 'pueblo pesquero', viewValue: 'Pueblo pesquero' },
    { value: 'campo de batalla', viewValue: 'Campo de batalla' },
    {
      value: 'cementerio antiguo misterioso',
      viewValue: 'Cementerio antiguo misterioso',
    },
  ];

  tags: Tags[] = [
    { value: 'Medieval', viewValue: 'Medieval' },
    { value: 'Miedo', viewValue: 'Miedo' },
    { value: 'Autoestima', viewValue: 'Autoestima' },
    { value: 'Codicia', viewValue: 'Codicia' },
    { value: 'Crimen', viewValue: 'Crimen' },
    { value: 'Infidelidad', viewValue: 'Infidelidad' },
    { value: 'Politica', viewValue: 'Política' },
    { value: 'Cyborgs', viewValue: 'Cyborgs' },
    { value: 'Superpoderes', viewValue: 'Superpoderes' },
    { value: 'Romance', viewValue: 'Romance' },
    { value: 'Aventura', viewValue: 'Aventura' },
    { value: 'Fantasia', viewValue: 'Fantasía' },
    { value: 'Realeza', viewValue: 'Realeza' },
    { value: 'Robo', viewValue: 'Robo' },
    { value: 'Venganza', viewValue: 'Venganza' },
    { value: 'Alienígenas', viewValue: 'Alienígenas' },
    { value: 'Viajes en el tiempo', viewValue: 'Viajes en el tiempo' },
    { value: 'Rebelion', viewValue: 'Rebelión' },
    { value: 'Supervivencia', viewValue: 'Supervivencia' },
    { value: 'Artefactos mágicos', viewValue: 'Artefactos mágicos' },
    { value: 'Amistad', viewValue: 'Amistad' },
    { value: 'Traición', viewValue: 'Traición' },
    { value: 'Misterio', viewValue: 'Misterio' },
    { value: 'Guerra', viewValue: 'Guerra' },
    { value: 'Exploracion', viewValue: 'Exploración' },
    { value: 'Piratas', viewValue: 'Piratas' },
    { value: 'Caza de monstruos', viewValue: 'Caza de monstruos' },
    { value: 'Magia oscura', viewValue: 'Magia oscura' },
    { value: 'Religion', viewValue: 'Religión' },
    { value: 'Crisis ambiental', viewValue: 'Crisis ambiental' },
    { value: 'Intriga', viewValue: 'Intriga' },
    { value: 'Ciencia', viewValue: 'Ciencia' },
    { value: 'Robots', viewValue: 'Robots' },
    { value: 'Mitologia', viewValue: 'Mitología' },
    { value: 'Aventura espacial', viewValue: 'Aventura espacial' },
    { value: 'Apocalipsis', viewValue: 'Apocalipsis' },
    { value: 'Amnesia', viewValue: 'Amnesia' },
    { value: 'Conspiracion', viewValue: 'Conspiración' },
    { value: 'Inmortalidad', viewValue: 'Inmortalidad' },
    { value: 'Resistencia', viewValue: 'Resistencia' },
    { value: 'Zombis', viewValue: 'Zombis' },
    { value: 'Relaciones familiares', viewValue: 'Relaciones familiares' },
    { value: 'Exploración espacial', viewValue: 'Exploración espacial' },
    { value: 'Tecnología avanzada', viewValue: 'Tecnología avanzada' },
    { value: 'Sociedad distópica', viewValue: 'Sociedad distópica' },
  ];

  volver() {
    this.ocultar.emit(true);
  }

  next() {
    this.firstSection = false;
    this.tagsSection = true;
  }

  checkSelection() {
    if (this.selectedTags.length > 2) {
      this.selectedTags.pop();
    }
  }

  tagValues: string[] = this.tags.map((tag) => tag.viewValue);
  arrayTags: string[] = [];
  getRandomTags(count: number, availableTags: string[]): string[] {
    const shuffled = [...availableTags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  selectedTags: string[] = [];
  maxSelectedTags = 2;
  toggleTagSelection(tag: string) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter((t) => t !== tag);
    } else if (this.selectedTags.length < this.maxSelectedTags) {
      this.selectedTags.push(tag);
    }
  }

  constructor(private openai:OpenaiService, private userData:AuthService) {
    this.refillArrayTags();
  }

 

  refillArrayTags() {
    this.selectedTags = [];
    this.arrayTags = [];
    this.arrayTags = this.getRandomTags(20, this.tagValues);
  }

  
  @Input() charSlot!:number;

  character1!: Character | null | undefined;
  character2!: Character | null | undefined;
  character3!: Character | null | undefined;  

  charDescription!:string;
  createCharPrompt(charSlot:number): string
  {
    this.userData.getUserCharacters()
      .subscribe((characters) => {
        this.character1 = characters[0];
        this.character2 = characters[1];
        this.character3 = characters[2];
      });
    switch(charSlot)
    {
      case 1:  this.charDescription="El nombre de mi personaje es " + this.character1!.nombre + " mi profesion es " + this.character1!.rol + " y soy un/a "+ this.character1!.especie;
      break;
      case 2:  this.charDescription="El nombre de mi personaje es " + this.character2!.nombre + " mi profesion es " + this.character2!.rol + " y soy un/a "+ this.character2!.especie;
      break;
      case 3:  this.charDescription="El nombre de mi personaje es " + this.character3!.nombre + " mi profesion es " + this.character3!.rol + " y soy un/a "+ this.character3!.especie;
      break;
    }
    return this.charDescription;
  }
  
  
  createContextSettingPrompt():string
  {
    let contextPrompt:string='';
    let tagsString:string='';
    switch(this.selectedTags.length)
    {
      case 0: tagsString=''; break;
      case 1: tagsString=". Además, mi historia incluye esta temática " + this.selectedTags[0]; break;
      case 2: tagsString=". Además, mi historia incluye estas temáticas " + this.selectedTags[0] + " y " + this.selectedTags[1]; break;
    }

    return contextPrompt="Mi historia se desarrolla en un ambiente de " + this.selectedTipo + ", decidí comenzar en " + this.selectedLugar + tagsString;
  }
  
  response!: string;
  sendCharacterAndTagsPrompt()
  {
    const charPrompt=this.createCharPrompt(this.charSlot);
    const contextPrompt=this.createContextSettingPrompt();
    const completePrompt = charPrompt + ". " + contextPrompt;

    this.openai.postData(completePrompt).subscribe(
      (data: any) => {
        this.response = data.response; 
        console.log(data.response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
