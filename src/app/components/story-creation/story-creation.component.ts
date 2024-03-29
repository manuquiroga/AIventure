import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Story } from 'src/app/models/story.model';
import { OpenaiService } from 'src/app/services/openai.service';
import { AuthService } from 'src/app/services/auth.service';
import { Character } from 'src/app/models/character.model';
import { SharedDataService } from 'src/app/services/background.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  reactiveForm:FormGroup;

  constructor(
    private openai: OpenaiService,
    private userData: AuthService,
    private sharedDataService: SharedDataService,
    private fb: FormBuilder
  ) {
    this.refillArrayTags();
    this.reactiveForm = this.fb.group({
      selectedTipo: ['', Validators.required],
      selectedLugar: ['', Validators.required],
    });
    this.subscribeToFormChanges();
  }

  story: Story | null | undefined;

  selectedTipo: string = '';
  selectedLugar: string = '';

  firstSection: boolean = true;
  tagsSection: boolean = false;
  errorMessage: boolean = false;

  tipos: Tipo[] = [
    { value: 'adventure', viewValue: 'Adventure' },
    { value: 'fantasy', viewValue: 'Fantasy' },
    { value: 'mystery', viewValue: 'Mystery' },
    { value: 'romance', viewValue: 'Romance' },
  ];

  lugares: Lugar[] = [
    { value: 'magical dark forest', viewValue: 'Magical Dark Forest' },
    { value: 'busy medieval market', viewValue: 'Busy Medieval Market' },
    { value: 'fishing village', viewValue: 'Fishing Village' },
    { value: 'battlefield', viewValue: 'Battlefield' },
    { value: 'capital city', viewValue: 'Capital City' },
    {
      value: 'adventurers guild headquarters',
      viewValue: 'Adventurers Guild HQ',
    },
    { value: 'tabern', viewValue: 'Tabern' },
    { value: 'ancient ruins', viewValue: 'Ancient Ruins' },
    { value: 'dungeon', viewValue: 'Dungeon' },
    { value: 'magical school', viewValue: 'Magical School' },
    {
      value: 'mysterious ancient cemetery',
      viewValue: 'Mysterious Ancient Cemetery',
    },
  ];

  tags: Tags[] = [
    { value: 'Medieval', viewValue: 'Medieval' },
    { value: 'Fear', viewValue: 'Fear' },
    { value: 'Greed', viewValue: 'Greed' },
    { value: 'Crime', viewValue: 'Crime' },
    { value: 'Politics', viewValue: 'Politics' },
    { value: 'Superpowers', viewValue: 'Superpowers' },
    { value: 'Royalty', viewValue: 'Royalty' },
    { value: 'Theft', viewValue: 'Theft' },
    { value: 'Vengeance', viewValue: 'Vengeance' },
    { value: 'Rebellion', viewValue: 'Rebellion' },
    { value: 'Survival', viewValue: 'Survival' },
    { value: 'Magical Artifacts', viewValue: 'Magical Artifacts' },
    { value: 'Friendship', viewValue: 'Friendship' },
    { value: 'Betrayal', viewValue: 'Betrayal' },
    { value: 'War', viewValue: 'War' },
    { value: 'Exploration', viewValue: 'Exploration' },
    { value: 'Monster Hunting', viewValue: 'Monster Hunting' },
    { value: 'Dark Magic', viewValue: 'Dark Magic' },
    { value: 'Religion', viewValue: 'Religion' },
    { value: 'Mythology', viewValue: 'Mythology' },
    { value: 'Apocalypse', viewValue: 'Apocalypse' },
    { value: 'Amnesia', viewValue: 'Amnesia' },
    { value: 'Conspiracy', viewValue: 'Conspiracy' },
    { value: 'Immortality', viewValue: 'Immortality' },
    { value: 'Resistance', viewValue: 'Resistance' },
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
    if (this.reactiveForm.valid) {
      this.firstSection = false;
      this.tagsSection = true;
      this.errorMessage = false; // Oculta el mensaje de error
    } else {
      this.errorMessage = true; // Muestra el mensaje de error
    }
  }
  
  

  subscribeToFormChanges() {
    this.reactiveForm.valueChanges.subscribe(() => {
      if (this.reactiveForm.valid) {
        this.errorMessage = false;
      }
    });
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

  refillArrayTags() {
    this.selectedTags = [];
    this.arrayTags = [];
    this.arrayTags = this.getRandomTags(20, this.tagValues);
  }

  @Input() charSlot!: number;

  character1!: Character | null | undefined;
  character2!: Character | null | undefined;
  character3!: Character | null | undefined;

  charDescription!: string;
  createCharPrompt(charSlot: number): string {
    this.userData.getUserCharacters().subscribe((characters) => {
      this.character1 = characters[0];
      this.character2 = characters[1];
      this.character3 = characters[2];
    });
    switch (charSlot) {
      case 1:
        this.charDescription =
          'The name of my character is ' +
          this.character1!.nombre +
          ', my profession is ' +
          this.character1!.rol +
          " and I'm a " +
          this.character1!.especie  +
          "My attributes are: [" +
          "Strenght: " + this.character1?.fuerza +
          "Dexterity: " + this.character1?.destreza +
          "Intelligence: " + this.character1?.inteligencia +
          "Charisma: " + this.character1?.carisma +
          "Courage: " + this.character1?.coraje + "]";
        break;
      case 2:
        this.charDescription =
          'The name of my character is ' +
          this.character2!.nombre +
          ', my profession is ' +
          this.character2!.rol +
          " and I'm a " +
          this.character2!.especie +
          "My attributes are: [" +
          "Strenght: " + this.character2?.fuerza +
          "Dexterity: " + this.character2?.destreza +
          "Intelligence: " + this.character2?.inteligencia +
          "Charisma: " + this.character2?.carisma +
          "Courage: " + this.character2?.coraje + "]";
        break;
      case 3:
        this.charDescription =
          'The name of my character is ' +
          this.character3!.nombre +
          ', my profession is ' +
          this.character3!.rol +
          " and I'm a " +
          this.character3!.especie +
          "My attributes are: [" +
          "Strenght: " + this.character3?.fuerza +
          "Dexterity: " + this.character3?.destreza +
          "Intelligence: " + this.character3?.inteligencia +
          "Charisma: " + this.character3?.carisma +
          "Courage: " + this.character3?.coraje + "]";
        break;
    }
    return this.charDescription;
  }

  createContextSettingPrompt(): string {
    let contextPrompt: string = '';
    let tagsString: string = '';
    switch (this.selectedTags.length) {
      case 0:
        tagsString = '';
        break;
      case 1:
        tagsString =
          '. Moreover, my story includes this topic ' + this.selectedTags[0];
        break;
      case 2:
        tagsString =
          '. Moreover, my story includes these topics ' +
          this.selectedTags[0] +
          ' and ' +
          this.selectedTags[1];
        break;
    }
    
    return (contextPrompt =
      'My story develops in a ' +
      this.reactiveForm.get('selectedTipo')?.value +
      ' setting, and I decided to start in ' +
      this.reactiveForm.get('selectedLugar')?.value +
      tagsString);
  }

 
  actions!:number;
  userSuscription=this.userData.user$.subscribe((user) => {
    if (user) {
      this.actions = user.historias!;
    }
  });

  backgroundToStory!: string;

  async sendCharacterAndTagsPrompt() {
     this.sharedDataService.firstSection = true;
    this.backgroundToStory = this.reactiveForm.get('selectedLugar')?.value;
    
    const charPrompt = this.createCharPrompt(this.charSlot);
    const contextPrompt = this.createContextSettingPrompt();
    const completePrompt = charPrompt + '. ' + contextPrompt;

    
   if(this.actions>0 )
   {
    this.sharedDataService.updateSharedBackground(this.backgroundToStory);
    await this.openai.sendMessageSystem(completePrompt);
    
   }else if(this.actions<=0){
    alert('You cant start a new story without having actions left')
   }
  }
}
