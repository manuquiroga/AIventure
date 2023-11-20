import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
export class CharacterCreationComponent implements OnInit {
  reactiveForm: FormGroup;
  formdata: any = {};
  @Output() ocultar = new EventEmitter<boolean>();

  personaje: Character | null | undefined;

  dropdown: boolean = true;
  distribution: boolean = false;

  selectsNotEmpty:any;

  puntos: number = 7;
  randomInt: number = this.getRandomInt();

  fuerza: number = 1;
  inteligencia: number = 1;
  destreza: number = 1;
  coraje: number = 1;
  carisma: number = 1;

  ngOnInit() {
    
  }

  OnFormSubmitted() {
    console.log(this.reactiveForm.value);
    this.formdata = this.reactiveForm.value;
    this.reactiveForm.reset({
      nombre: null,
      selectedRol: null,
      selectedSexo: null,
      selectedEspecie: null,
    });
  }

  rols: Rol[] = [
    {value: 'mage', viewValue: 'Mage'},
    {value: 'warrior', viewValue: 'Warrior'},
    {value: 'hunter', viewValue: 'Hunter'},
    {value: 'assasin', viewValue: 'Assassin'},
    {value: 'doctor', viewValue: 'Doctor' },
  ];

  sexos: Sexo[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
  ];

  especies: Especie[] = [
    {value: 'human', viewValue: 'Human'},
    {value: 'elf', viewValue: 'Elf'},
    {value: 'orc', viewValue: 'Orc'},
    {value: 'fairy', viewValue: 'Fairy'},
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

  addCoraje() {
    if (this.puntos > 0 && this.coraje < 6) {
      this.coraje++;
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

  removeCoraje() {
    if (this.coraje > 1) {
      this.coraje--;
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
      personaje.rol = this.reactiveForm.get('selectedRol')?.value || '';
      personaje.sexo = this.reactiveForm.get('selectedSexo')?.value || '';
      personaje.nombre = this.reactiveForm.get('nombre')?.value || '';
      personaje.especie = this.reactiveForm.get('selectedEspecie')?.value || '';
      personaje.fuerza = this.fuerza;
      personaje.inteligencia = this.inteligencia;
      personaje.coraje = this.coraje;
      personaje.destreza = this.destreza;
      personaje.carisma = this.carisma;
      if (personaje.nombre === 'Toti') {
        personaje.photoURL = `/assets/images/totieasteregg.png`;
      } else {
        personaje.photoURL = `https://aiventure-images.up.railway.app/imagen/${personaje.sexo}-${personaje.especie}-${personaje.rol}-${this.randomInt}.jpeg`;
      }
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
    } else {
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

  nextButton() {
    this.selectsNotEmpty =
    this.reactiveForm.get('selectedRol')?.value &&
    this.reactiveForm.get('selectedSexo')?.value &&
    this.reactiveForm.get('selectedEspecie')?.value;

  if (this.reactiveForm.valid && this.selectsNotEmpty) {
    this.dropdown = false;
    this.distribution = true;
  } else {
    // Marcamos todos los campos como tocados
    this.reactiveForm.markAllAsTouched();
  }
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.personaje = {} as Character;
    this.reactiveForm = new FormGroup({
      nombre: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
        Validators.maxLength(16),
      ]),
      selectedRol: new FormControl(null, [Validators.required]),
      selectedSexo: new FormControl(null, [Validators.required]),
      selectedEspecie: new FormControl(null, [Validators.required]),
    });

    // this.reactiveForm.statusChanges.subscribe((status) => {
    //   console.log(status);
    //   this.formStatus = status;
    // });
  }
}