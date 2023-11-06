import { Component } from '@angular/core';
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
  story: Story | null | undefined;

  selectedTipo: string = '';
  selectedLugar: string = '';

  tipos: Tipo[] = [
    { value: 'aventura', viewValue: 'Aventura' },
    { value: 'fantasia', viewValue: 'Fantasía' },
    { value: 'misterio', viewValue: 'Misterio' },
    { value: 'realismo', viewValue: 'Realismo' },
    { value: 'romance', viewValue: 'Romance' },
  ];

  lugares: Lugar[] = [
    { value: 'bosque oscuro magico', viewValue: 'Bosque oscuro mágico' },
    { value: 'mercado medieval bullicioso',viewValue: 'Mercado medieval bullicioso' },
    { value: 'pueblo pesquero', viewValue: 'Pueblo pesquero' },
    { value: 'campo de batalla', viewValue: 'Campo de batalla' },
    { value: 'cementerio antiguo misterioso', viewValue: 'Cementerio antiguo misterioso' },
  ];
}
