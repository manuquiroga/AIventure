import { Component, Output, EventEmitter } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface Rol {
  value: string;
  viewValue: string;
}
interface Sexo {
  value: string;
  viewValue: string;
}

interface Especie {
  value: string;
  viewValue: string;
}

interface Nombre {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css'],
})
export class CharacterCreationComponent {
  @Output() ocultar = new EventEmitter<boolean>();

  personaje: Character | null | undefined;

  dropdown: boolean = true;
  distribution: boolean = false;
  showErrorMessage: boolean = false;
  shownErrorName:boolean = false;

  selectedRol: string = '';
  selectedEspecie: string = '';
  selectedSexo: string = '';
  nombre: string = '';

  puntos: number = 7;
  randomInt: number = this.getRandomInt();

  fuerza: number = 1;
  inteligencia: number = 1;
  destreza: number = 1;
  valentia: number = 1;
  carisma: number = 1;

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
    { value: 'semi_humano', viewValue: 'Semi Humano' },
  ];

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
      personaje.fuerza = this.fuerza;
      personaje.inteligencia = this.inteligencia;
      personaje.coraje = this.valentia;
      personaje.destreza = this.destreza;
      personaje.carisma = this.carisma;
      personaje.photoURL = `https://aiventure-images.up.railway.app/imagen/${personaje.sexo}-${personaje.especie}-${personaje.rol}-${this.randomInt}.jpeg`;
    }
  }

  errorMessage: string = '';
  notGoThrough: boolean = false;

  async logCharacterData() {
    this.assignValues(this.personaje);

    if (this.personaje) {
      this.personaje.id = new Date().getTime().toString();

      if (!this.isAttributesDistributed() && this.puntos <= 3) {
        await this.authService
          .saveCharacter(this.personaje)
          .then(() => {
            this.router.navigate(['/characters']);
            console.log(
              'Datos del personaje guardados en Firebase:',
              this.personaje
            );
          })
          .catch((error) => {
            console.error('Error al guardar los datos del personaje:', error);
          });
      }
    }
  }

  finishCharButton() {
    if (this.isAttributesDistributed() || this.puntos >= 4) {
      this.notGoThrough = true;
    } 
    else {
      this.logCharacterData();
      this.ocultar.emit(true);
    }
  }

  volver() {
    this.ocultar.emit(true);
  }

  isAttributesDistributed() {
    if (
      this.personaje?.carisma === 1 &&
      this.personaje?.destreza === 1 &&
      this.personaje?.inteligencia === 1 &&
      this.personaje?.fuerza === 1 &&
      this.personaje?.coraje === 1
    ) {
      return true;
    } else {
      return false;
    }
  }


  validateName(nombre: string): boolean {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(nombre);
  }

  nextButton() {
    if (!this.isFormComplete()) {
      this.showErrorMessage = true;
      this.shownErrorName = false;
    }else if(!this.validateName(this.nombre)){
      this.showErrorMessage = false;
      this.shownErrorName = true;
    }
    else {
      this.dropdown = false;
      this.distribution = true;
    }
  }

  isFormComplete(): boolean {
    return (
      !!this.selectedRol &&
      !!this.selectedEspecie &&
      !!this.selectedSexo &&
      !!this.nombre
    );
  }

  constructor(private authService: AuthService, private router: Router) {
    this.personaje = {} as Character;
  }
}
