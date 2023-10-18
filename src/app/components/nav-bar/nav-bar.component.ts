import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  historias_restantes: number = 0;
  icono_path: string = '../../../assets/images/user.png';

  name:string = '';
  email:string = '';
  historias:number|undefined = 0;
  constructor(public auth: AuthService) {
    this.auth.searchUser().subscribe(user => {
      if (user) {
        this.name = user.displayName;
        this.email = user.email;
        this.historias = user.historias;
      } else {
        console.log('User not found');
      }
    });
  }

}
