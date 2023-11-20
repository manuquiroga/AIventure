import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SharedDataService } from '../services/background.service'; 

@Injectable({
  providedIn: 'root',
})
export class StoryGuard implements CanActivate {
  constructor(private router: Router, private dataService: SharedDataService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.dataService.firstSection) {
      return true;
    } else {
      return this.router.parseUrl('/');
    }
  }
}
