// story-handler.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OpenaiService } from 'src/app/services/openai.service';
import { StoryService } from 'src/app/services/storyService';


@Component({
  selector: 'app-story-handler',
  templateUrl: './story-handler.component.html',
  styleUrls: ['./story-handler.component.css'],
})
export class StoryHandlerComponent implements OnInit {
  userChoice: string = '';
  story: string[] = [];
  aiResponse: string = '';
  storyString: string[] = [];


  constructor(private storyService: StoryService,private openai:OpenaiService, private auth:AuthService) {}

  pushUserChoicePullLegs() {
    this.storyString.push(this.userChoice);
  }

  async continueStory() {
    await this.openai.sendMessage(this.userChoice);
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


  onEnterKeyPressed(event: any) {
    this.continueStory();
  }
  


  placeHolder:string="A healer appears to support me...";

  async actionHandler(actionSlot:number)
  {

    switch(actionSlot)
    {
      case 1: this.placeHolder="(Name) then the action... ex: Tony swings at the monster with his mighty sword"
          break;
      case 2: this.placeHolder="The event... ex: Tony sees a huge stone door with symbols engraved on it"
          break;
      case 3: this.placeHolder="(Name) says... ex: Tony says ¿Who is there?"
          break;
      case 4: this.placeHolder="(Name) talks to... ex: Tony talks to Ronnie and tells him to pick up his sword"
          break;
      case 5: await this.openai.endStory();
          break;
    }
  }
}
