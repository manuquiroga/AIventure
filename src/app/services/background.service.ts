import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  firstSection: boolean = false;

  private sharedBackgroundSource = new BehaviorSubject<string>('');
  sharedBackground$ = this.sharedBackgroundSource.asObservable();

  updateSharedBackground(dato: string) {
    this.sharedBackgroundSource.next(dato);
  }
}
