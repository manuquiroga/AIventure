import { Component } from '@angular/core';

@Component({
  selector: 'app-action-plans',
  templateUrl: './action-plans.component.html',
  styleUrls: ['./action-plans.component.css'],
})
export class ActionPlansComponent {
  planPressed: boolean = false;

  goToPayment(){
    this.planPressed = true;
  }
}
