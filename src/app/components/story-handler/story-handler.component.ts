// story-handler.component.ts
import { Component, OnInit } from '@angular/core';
import { OpenaiService } from 'src/app/services/openai.service';
import { StoryService } from 'src/app/services/storyService';

@Component({
  selector: 'app-story-handler',
  templateUrl: './story-handler.component.html',
  styleUrls: ['./story-handler.component.css']
})
export class StoryHandlerComponent implements OnInit {
  userChoice: string = '';
  story: string[] = [];
  aiResponse: string = '';

  constructor(private storyService: StoryService,private openai:OpenaiService) {}


  continueStory() {
    this.openai.sendMessage(this.userChoice)
    this.userChoice = '';
  }

  ngOnInit(): void {
    this.storyService.aiResponse$.subscribe((response) => {
      this.aiResponse = response;
      // Aquí puedes realizar cualquier otra lógica que necesites con la respuesta de la IA
    });

    this.storyService.story$.subscribe((story) => {
      this.story = story;
    });
  }
}
