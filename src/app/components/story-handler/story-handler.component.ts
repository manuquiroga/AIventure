import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OpenaiService } from 'src/app/services/openai.service';



@Component({
  selector: 'app-story-handler',
  templateUrl: './story-handler.component.html',
  styleUrls: ['./story-handler.component.css']
})
export class StoryHandlerComponent {

  constructor(private openia:OpenaiService, private auth:AuthService){}
  story = '';
  stories = [];
  userId;

  storyAIBehavior:string=`You're going to behave like an expert in interactive story telling. These are the ground rules that you will be following to generate the story. 1. There are 5 attributes (they will be always the same), given to the character, these attributes help the user do tasks more easily. They are:
  Intelligence, Charism, Strenght, Courage and Dexterity. 2. As you develop the story, I want you to give me 3 options when you think there are multiple paths that could be taken(breaking points), before each option add a *. Also tell me which attribute could help this option have a higher chance of succeding.3. 
  Every option chosen will have an outcome, you will be told in the prompt whether the action succeded or not. For example, if the option was to break a door with the characters bare hands and it required strenght but the action failed, the character would have an injury. This has to affect the story in the future.
  4. There are going to be 3 instances where you're going to give options, only then you CAN AND HAVE TO finish the story, NOT BEFORE. Do not finish the story before you've given options 3 times, even if an action fails.5. When the user chooses an option you have to display the whole story up to that point including 
  the chosen option but do not show the options that were not chosen. Then you can continue telling the story.6. You have to base the story on the character description, story setting and starting place that will be sent to you in the next prompt. 7. Add a fitting title to the story when it ends. 
  THIS IS THE BEHAVIOR YOU HAVE TO ADOPT, DO NOT RESPOND TO THIS PROMPT, ANOTHER ONE WITH THE CHARACTER DESCRIPTION, STORY SETTING AND STARTING PLACE WILL BE SENT TO YOU SOON`

  /*async ngOnInit(){
    this.openia(this.storyAIBehavior)
}*/




}
