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

  constructor(public auth: AuthService) {
    
   }

   ngOnInit(){
    this.auth.searchUser();
   }
}
