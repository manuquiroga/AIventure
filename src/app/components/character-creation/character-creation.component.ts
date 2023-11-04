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
import { Routes } from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service';




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
  styleUrls: ['./character-creation.component.css'],
})
export class CharacterCreationComponent {
  personaje: Character | null | undefined;

  dropdown: boolean = true;
  distribution: boolean = false;

  /*rol:string[] = ['Mago', 'Guerrero', 'Cazador', 'Asesino', 'Doctor'];
  sexo:string[]= ['Masculino', 'Femenino'];
  especie:string[]= ['Humano', 'Elfo', 'Enano', 'Elfo Oscuro', 'Hada', 'Semi-Humano'];
  
  A partir de aca es los atributos a para la foto, incluyendo los 3 de arriba 

  cabello:string[]= ['Corto', 'Largo', 'Rapado Militar', 'Alopecia'];
  bello_facial:string[]=['Barba', 'Bigote', 'Sin bello facial'];
  musculatura:string[]=['Trembo', 'Gymbro', 'Flaco Escopeta', 'Gordo'];

  nombre?:string | null;*/

  selectedRol: string = '';
  selectedEspecie: string = '';
  selectedSexo: string = '';
  selectedCabello: string = '';
  selectedMusculatura: string = '';
  nombre: string = '';

  puntos: number = 7;
  randomInt: number = this.getRandomInt();

  fuerza: number = 1;
  inteligencia: number = 1;
  destreza: number = 1;
  valentia: number = 1;
  carisma: number = 1;

  nextButton() {
    this.dropdown = false;
    this.distribution = true;
  }

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

  rols: Rol[] = [
    { value: 'mago', viewValue: 'Mago' },
    { value: 'guerrero', viewValue: 'Guerrero' },
    { value: 'cazador', viewValue: 'Cazador' },
    { value: 'asesino', viewValue: 'Asesino' },
    { value: 'doctor', viewValue: 'Doctor' },
  ];

  sexos: Sexo[] = [
    { value: 'hombre', viewValue: 'Masculino' },
    { value: 'mujer', viewValue: 'Femenino' },
  ];

  especies: Especie[] = [
    { value: 'humano', viewValue: 'Humano' },
    { value: 'elfo', viewValue: 'Elfo' },
    { value: 'orco', viewValue: 'Orco' },
    { value: 'hada', viewValue: 'Hada' },
    { value: 'semi_humano', viewValue: 'Semi Humano'},
  ];

  /*   cabellos:Cabello[]=[
    {value: 'corto', viewValue: 'Corto'},
    {value: 'largo', viewValue: 'Largo'},
    {value: 'rapado_militar-2', viewValue: 'Rapado Militar'},
    {value: 'alopecia-3', viewValue: 'Alopecia'},
  ]

  musculaturas:Musculatura[]=[
    {value: 'trembo-0', viewValue: 'Trembo'},
    {value: 'gymbro-1', viewValue: 'Gymbro'},
    {value: 'flaco_escopeta-2', viewValue: 'Flaco Escopeta'},
    {value: 'gordo-3', viewValue: 'Gordo'},
  ] */

  imprimir() {
    console.log(this.selectedRol);
    console.log(this.selectedSexo);
    console.log(this.selectedEspecie);
    console.log(this.selectedCabello);
    console.log(this.selectedMusculatura);
    console.log(this.nombre);
  }

  addFuerza() {
    if (this.puntos > 0 && this.fuerza < 6) {
      this.fuerza++;
      this.puntos--;
    }
  }

  addInteligencia() {
    if (this.puntos > 0 && this.inteligencia < 6) {
      this.inteligencia++;
      this.puntos--;
    }
  }

  addDestreza() {
    if (this.puntos > 0 && this.destreza < 6) {
      this.destreza++;
      this.puntos--;
    }
  }

  addValentia() {
    if (this.puntos > 0 && this.valentia < 6) {
      this.valentia++;
      this.puntos--;
    }
  }

  addCarisma() {
    if (this.puntos > 0 && this.carisma < 6) {
      this.carisma++;
      this.puntos--;
    }
  }

  removeFuerza() {
    if (this.fuerza > 1) {
      this.fuerza--;
      this.puntos++;
    }
  }

  removeInteligencia() {
    if (this.inteligencia > 1) {
      this.inteligencia--;
      this.puntos++;
    }
  }

  removeDestreza() {
    if (this.destreza > 1) {
      this.destreza--;
      this.puntos++;
    }
  }

  removeValentia() {
    if (this.valentia > 1) {
      this.valentia--;
      this.puntos++;
    }
  }

  removeCarisma() {
    if (this.carisma > 1) {
      this.carisma--;
      this.puntos++;
    }
  }

  getRandomInt() {
    return Math.floor(Math.random() * 8) + 1;
  }

  assignValues(personaje: Character | null | undefined) {
    if (personaje) {
      personaje.rol = this.selectedRol;
      personaje.sexo = this.selectedSexo;
      personaje.nombre = this.nombre;
      personaje.especie = this.selectedEspecie;
      personaje.cabello = this.selectedCabello;
      personaje.musculatura = this.selectedMusculatura;
      personaje.fuerza = this.fuerza;
      personaje.inteligencia = this.inteligencia;
      personaje.coraje = this.valentia;
      personaje.destreza = this.destreza;
      personaje.carisma = this.carisma;
      personaje.photoURL = `https://aiventure-images.up.railway.app/imagen/${personaje.sexo}-${personaje.especie}-${personaje.rol}-${this.randomInt}.jpeg`;
    }
  }

  async logCharacterData() {
    this.assignValues(this.personaje);

    if (this.personaje) {
      this.personaje.id = new Date().getTime().toString();

      await this.authService
        .saveCharacter(this.personaje)
        .then(() => {
          console.log(
            'Datos del personaje guardados en Firebase:',
            this.personaje
          );
        })
        .catch((error) => {
          console.error('Error al guardar los datos del personaje:', error);
        });

      window.location.reload();
    }
  }

  constructor(private authService: AuthService) {
    this.personaje = {} as Character;
  }
}
