import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent{
  isLoading = false;
  constructor(private router: Router, private auth: AuthService) {}

  onAnimationComplete() {
    this.isLoading = true;
  }

}
