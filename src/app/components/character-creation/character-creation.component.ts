import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Character } from 'src/app/models/character.model';
import { MatSelectChange } from '@angular/material/select';
import { Inject } from '@angular/core';


interface Rol{
  value:string;
  viewValue:string;
}
interface Sexo{
  value:string;
  viewValue:string;
}
interface Especie{
  value:string;
  viewValue:string;
}
interface Cabello{
  value:string;
  viewValue:string;
}

interface Cabello{
  value:string;
  viewValue:string;
}
interface Musculatura{
  value:string;
  viewValue:string;
}
interface Bello_Facial{
  value:string;
  viewValue:string;
}

interface Nombre{
  value:string;
  viewValue:string;
}


@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css']
})
export class CharacterCreationComponent {

  /*rol:string[] = ['Mago', 'Guerrero', 'Cazador', 'Asesino', 'Doctor'];
  sexo:string[]= ['Masculino', 'Femenino'];
  especie:string[]= ['Humano', 'Elfo', 'Enano', 'Elfo Oscuro', 'Hada', 'Semi-Humano'];
  
  A partir de aca es los atributos a para la foto, incluyendo los 3 de arriba 

  cabello:string[]= ['Corto', 'Largo', 'Rapado Militar', 'Alopecia'];
  bello_facial:string[]=['Barba', 'Bigote', 'Sin bello facial'];
  musculatura:string[]=['Trembo', 'Gymbro', 'Flaco Escopeta', 'Gordo'];

  nombre?:string | null;*/

  

  selectedRol:string = '';
  selectedEspecie:string = ''
  selectedSexo:string = '';
  selectedCabello:string = '';
  selectedMusculatura:string = '';
  nombre:string = '';

  onRolChange(event: MatSelectChange) {
    this.selectedRol = event.value;
    console.log(this.selectedRol);
  }

  onEspecieChange(event: MatSelectChange) {
    this.selectedEspecie = event.value;
    console.log(this.selectedEspecie);
  }

  onSexoChange(event: MatSelectChange) {
    this.selectedSexo = event.value;
    console.log(this.selectedSexo);
  }

  onCabelloChange(event: MatSelectChange) {
    this.selectedCabello = event.value;
    console.log(this.selectedCabello);
  }

  onMusculaturaChange(event: MatSelectChange) {
    this.selectedMusculatura = event.value;
    console.log(this.selectedMusculatura);
  }

  onNombreChange(event: any) {
    this.nombre = event.target.value;
    console.log(this.nombre);
  }


  rols:Rol[]=[
    {value: 'mago-0', viewValue: 'Mago'},
    {value: 'guerrero-1', viewValue: 'Guerrero'},
    {value: 'Cazador-2', viewValue: 'Cazador'},
    {value: 'Asesino-3', viewValue: 'Asesino'},
    {value: 'Doctor-4', viewValue: 'Doctor'},
  ]

  sexos:Sexo[]=[
    {value: 'masculino-0', viewValue: 'Masculino'},
    {value: 'femenino-1', viewValue: 'Femenino'},
  ]

  especies:Especie[]=[
    {value: 'humano-0', viewValue: 'Humano'},
    {value: 'elfo-1', viewValue: 'Elfo'},
    {value: 'enano-2', viewValue: 'Enano'},
    {value: 'elfo_oscuro-3', viewValue: 'Elfo Oscuro'},
    {value: 'hada-4', viewValue: 'Hada'},
    {value: 'semi_humano-5', viewValue: 'Semi Humano'},
  ]

  cabellos:Cabello[]=[
    {value: 'corto-0', viewValue: 'Corto'},
    {value: 'largo-1', viewValue: 'Largo'},
    {value: 'rapado_militar-2', viewValue: 'Rapado Militar'},
    {value: 'alopecia-3', viewValue: 'Alopecia'},
  ]

  musculaturas:Musculatura[]=[
    {value: 'trembo-0', viewValue: 'Trembo'},
    {value: 'gymbro-1', viewValue: 'Gymbro'},
    {value: 'flaco_escopeta-2', viewValue: 'Flaco Escopeta'},
    {value: 'gordo-3', viewValue: 'Gordo'},
  ]

  sendCharacterToImageAI()
  {
    /* TO DO */
  }

  constructor(@Inject('personaje') personaje:Character)
  {
      personaje.rol=this.selectedRol;
      personaje.sexo=this.selectedSexo;
      personaje.nombre=this.nombre;
  }

}
