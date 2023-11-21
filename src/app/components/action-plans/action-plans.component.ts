import { Component } from '@angular/core';

@Component({
  selector: 'app-action-plans',
  templateUrl: './action-plans.component.html',
  styleUrls: ['./action-plans.component.css'],
})
export class ActionPlansComponent {
  planPressed: boolean = false;
  actions!:number;
  price!:number;

  goToPayment(actions:number, price:number){
    this.actions=actions;
    this.price=price;
    this.planPressed = true;
  }
}
