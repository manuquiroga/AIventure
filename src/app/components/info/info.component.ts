import { Component} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent  {
  
  slogan: string = 'CREATE YOUR ADVENTURE...';

  constructor(public auth: AuthService) {}

  
}
