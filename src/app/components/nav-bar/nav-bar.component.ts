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
  user: User | null = null;

  constructor( private auth: AuthService, private router: Router) {
    };
  

  onClick(){
    this.auth.loginWithGoogle()
    .then(response => {
      console.log(response);
      this.router.navigate(['/characters']);
    })
    .catch(error => console.log(error))
  }
}
