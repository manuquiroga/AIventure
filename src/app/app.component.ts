import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  resultado: any;

  constructor(private auth: AuthService) {}
  title = 'AIVENTURE';

  isDesktop: boolean = window.innerWidth >= 1000;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDesktop = window.innerWidth >= 1000;
  }
}
