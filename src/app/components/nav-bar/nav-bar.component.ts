import { Component,OnInit,OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { OpenaiService } from 'src/app/services/openai.service';
import { Inject } from '@angular/core';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy{
  resultado: any;

  historias_restantes: number = 0;
  icono_path: string = '../../../assets/images/account.png';

  name:string = '';
  email:string = '';
  historias:number|undefined = 0;

  private userSubscription: Subscription | undefined;

  constructor(public auth: AuthService, private openai: OpenaiService) {
    
  }

  ngOnInit() {
    this.userSubscription = this.auth.user$.subscribe(user => {
      if (user) {
        this.name = user.displayName;
        this.email = user.email;
        this.historias = user.historias;
      } else {
        console.log('User not found');
      }
    });
  }

  ngOnDestroy() {
    // Asegúrate de cancelar la suscripción al destruir el componente
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  enviarSolicitud() {
    this.openai.main();
  }

}
