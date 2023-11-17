import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Story } from 'src/app/models/story.model';
import { OpenaiService } from 'src/app/services/openai.service';
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
export class StoryCreationComponent{
  @Output() ocultar = new EventEmitter<boolean>();


  story: Story | null | undefined;

  selectedTipo: string = '';
  selectedLugar: string = '';

  firstSection: boolean = true;
  tagsSection: boolean = false;

  tipos: Tipo[] = [
    { value: 'adventure', viewValue: 'Adventure' },
    { value: 'fantasy', viewValue: 'Fantasy' },
    { value: 'mystery', viewValue: 'Mystery' },
    { value: 'realism', viewValue: 'Realism' },
    { value: 'romance', viewValue: 'Romance' },
  ];
  
  lugares: Lugar[] = [
    { value: 'magical dark forest', viewValue: 'Magical Dark Forest' },
    { value: 'busy medieval market', viewValue: 'Busy Medieval Market' },
    { value: 'fishing village', viewValue: 'Fishing Village' },
    { value: 'battlefield', viewValue: 'Battlefield' },
    { value: 'village', viewValue: 'Village' },
    { value: 'capital city', viewValue: 'Capital City' },
    { value: 'adventurers guild headquarters', viewValue: 'Adventurers Guild HQ' },
    { value: 'tabern', viewValue: 'Tabern' },
    { value: 'ancient ruins', viewValue: 'Ancient Ruins' },
    { value: 'dungeon', viewValue: 'Dungeon' },
    { value: 'magical school', viewValue: 'Magical School' },
    { value: 'mysterious ancient cemetery', viewValue: 'Mysterious Ancient Cemetery' },
  ];
  
  tags: Tags[] = [
    { value: 'Medieval', viewValue: 'Medieval' },
    { value: 'Fear', viewValue: 'Fear' },
    { value: 'Greed', viewValue: 'Greed' },
    { value: 'Crime', viewValue: 'Crime' },
    { value: 'Infidelity', viewValue: 'Infidelity' },
    { value: 'Politics', viewValue: 'Politics' },
    { value: 'Superpowers', viewValue: 'Superpowers' },
    { value: 'Romance', viewValue: 'Romance' },
    { value: 'Adventure', viewValue: 'Adventure' },
    { value: 'Fantasy', viewValue: 'Fantasy' },
    { value: 'Royalty', viewValue: 'Royalty' },
    { value: 'Theft', viewValue: 'Theft' },
    { value: 'Vengeance', viewValue: 'Vengeance' },
    { value: 'Time Travel', viewValue: 'Time Travel' },
    { value: 'Rebellion', viewValue: 'Rebellion' },
    { value: 'Survival', viewValue: 'Survival' },
    { value: 'Magical Artifacts', viewValue: 'Magical Artifacts' },
    { value: 'Friendship', viewValue: 'Friendship' },
    { value: 'Betrayal', viewValue: 'Betrayal' },
    { value: 'Mystery', viewValue: 'Mystery' },
    { value: 'War', viewValue: 'War' },
    { value: 'Exploration', viewValue: 'Exploration' },
    { value: 'Pirates', viewValue: 'Pirates' },
    { value: 'Monster Hunting', viewValue: 'Monster Hunting' },
    { value: 'Dark Magic', viewValue: 'Dark Magic' },
    { value: 'Religion', viewValue: 'Religion' },
    { value: 'Intrigue', viewValue: 'Intrigue' },
    { value: 'Mythology', viewValue: 'Mythology' },
    { value: 'Apocalypse', viewValue: 'Apocalypse' },
    { value: 'Amnesia', viewValue: 'Amnesia' },
    { value: 'Conspiracy', viewValue: 'Conspiracy' },
    { value: 'Immortality', viewValue: 'Immortality' },
    { value: 'Resistance', viewValue: 'Resistance' },
    { value: 'Zombies', viewValue: 'Zombies' },
    { value: 'Family Relationships', viewValue: 'Family Relationships' },
    { value: 'Advanced Technology', viewValue: 'Advanced Technology' },
    { value: 'Dystopian Society', viewValue: 'Dystopian Society' },
    { value: 'Epic Quest', viewValue: 'Epic Quest' },
    { value: 'Heroic Journey', viewValue: 'Heroic Journey' },
    { value: 'Sorcery', viewValue: 'Sorcery' },
    { value: 'Legendary Beasts', viewValue: 'Legendary Beasts' },
    { value: 'Enchanted Forests', viewValue: 'Enchanted Forests' },
    { value: 'Ancient Prophecy', viewValue: 'Ancient Prophecy' },
    { value: 'Chosen One', viewValue: 'Chosen One' },
    { value: 'Mythical Creatures', viewValue: 'Mythical Creatures' },
    { value: 'Hidden Realms', viewValue: 'Hidden Realms' },
    { value: 'Realm Wars', viewValue: 'Realm Wars' },
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
      case 1:  this.charDescription="The name of my character is " + this.character1!.nombre + ", my profession is " + this.character1!.rol + " and I'm a "+ this.character1!.especie;
      break;
      case 2:  this.charDescription="The name of my character is " + this.character2!.nombre + ", my profession is " + this.character2!.rol + " and I'm a "+ this.character2!.especie;
      break;
      case 3:  this.charDescription="The name of my character is " + this.character3!.nombre + ", my profession is " + this.character3!.rol + " and I'm a "+ this.character3!.especie;
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
      case 1: tagsString=". Moreover, my story includes this topic " + this.selectedTags[0]; break;
      case 2: tagsString=". Moreover, my story includes these topics " + this.selectedTags[0] + " and " + this.selectedTags[1]; break;
    }

    return contextPrompt="My story develops in a " + this.selectedTipo + " setting, and I decided to start in " + this.selectedLugar + tagsString;
  }
  
  sendCharacterAndTagsPrompt()
  {
    const charPrompt=this.createCharPrompt(this.charSlot);
    const contextPrompt=this.createContextSettingPrompt();
    const completePrompt = charPrompt + ". " + contextPrompt;

    this.openai.sendMessageSystem(completePrompt);
  }
  
}

