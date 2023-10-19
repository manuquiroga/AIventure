import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{
  constructor(private router: Router, private auth: AuthService) {}

  showLoadedTemplate: boolean = false;

  ngOnInit() {
    if(this.auth.user$){
      setTimeout(() => {
        this.showLoadedTemplate = true;
      }, 2500);
    }
  }
}
