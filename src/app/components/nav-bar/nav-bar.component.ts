import { Component,OnInit,OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OpenaiService } from 'src/app/services/openai.service';
import { Subscription } from 'rxjs';
import { FAQComponent } from '../faq/faq.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  response!: string;

  historias_restantes: number = 0;
  icono_path: string = '../../../assets/images/account.png';

  name: string = '';
  email: string = '';
  historias: number | undefined = 0;

  private userSubscription: Subscription | undefined;

  constructor(
    public auth: AuthService,
    private openai: OpenaiService,
    private FAQ: FAQComponent,
  ) {}

  ngOnInit() {
    this.userSubscription = this.auth.user$.subscribe((user) => {
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
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }


  scrollToFAQ() {

    const vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    window.scrollBy({ top: vh, behavior: 'smooth' });

  }
}
