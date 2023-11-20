import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.css']
})
export class ActionPlanComponent {
  @Input() actions!: number;
  @Input() price!: number;

}
