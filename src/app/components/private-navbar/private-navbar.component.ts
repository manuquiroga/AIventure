import { Component } from '@angular/core';

@Component({
  selector: 'app-private-navbar',
  templateUrl: './private-navbar.component.html',
  styleUrls: ['./private-navbar.component.css']
})
export class PrivateNavbarComponent {
  historias_restantes: number = 0;
  icono_path: string = '../../../assets/images/user2.png';
}
