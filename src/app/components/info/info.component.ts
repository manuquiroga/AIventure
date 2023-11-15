import { Component} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent  {
  
  slogan: string = 'CREA TU AVENTURA...';

  constructor(public auth: AuthService) {}

  
}
