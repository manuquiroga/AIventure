import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OpenaiService } from 'src/app/services/openai.service';



@Component({
  selector: 'app-story-handler',
  templateUrl: './story-handler.component.html',
  styleUrls: ['./story-handler.component.css']
})
export class StoryHandlerComponent {

  constructor(private openai:OpenaiService, private auth:AuthService){}
  
}
