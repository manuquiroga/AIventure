import { Component, EventEmitter, Output } from '@angular/core';
import { Story } from 'src/app/models/story.model';

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

  constructor() {
    this.arrayTags = this.getRandomTags(20, this.tagValues);
  }
}
