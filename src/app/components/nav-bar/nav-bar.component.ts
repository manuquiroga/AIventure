import { Component, Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { OpenaiService } from 'src/app/services/openai.service';
import { Inject } from '@angular/core';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  resultado: any;

  historias_restantes: number = 0;
  icono_path: string = '../../../assets/images/account.png';

  name:string = '';
  email:string = '';
  historias:number|undefined = 0;
  constructor(public auth: AuthService, private openai: OpenaiService) {
    this.auth.getCurrentUser().subscribe(user => {
      if (user) {
        this.name = user.displayName;
        this.email = user.email;
        this.historias = user.historias;
      } else {
        console.log('User not found');
      }
    });
  }

  enviarSolicitud() {
    const texto = 'Devolveme una frase de 10 palabras';
    this.openai.enviarPrompt(texto)
      .subscribe(response => {
        this.resultado = response;
        console.log(this.resultado);
      }, error => {
        console.error('Error:', error);
      });
  }

}
