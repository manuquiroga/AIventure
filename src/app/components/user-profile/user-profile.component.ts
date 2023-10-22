import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  userName: string | null | undefined;
  userEmail: string | null | undefined;

  constructor(public auth:AuthService){
   auth.getCurrentUser().subscribe(user => {
      if (user) {
        this.userName = user.displayName; 
        this.userEmail = user.email; 
      } else {
        this.userName = null;
        this.userEmail = null;
      }
    });
  }
}
