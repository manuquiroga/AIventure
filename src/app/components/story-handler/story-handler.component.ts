import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OpenaiService } from 'src/app/services/openai.service';
import { StoryService } from 'src/app/services/storyService';
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/services/background.service';


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
  actions!: number;
  backgroundClass!: string;

  private userSubscription: Subscription | undefined;

  constructor(
    private storyService: StoryService,
    private openai: OpenaiService,
    private auth: AuthService,
    private sharedDataService: SharedDataService
  ) {
    this.sharedDataService.sharedBackground$.subscribe((dato) => {
      console.log(dato);
      switch (dato) {
        case 'magical dark forest':
          this.backgroundClass = 'magical-dark-forest';
          break;
        case 'busy medieval market':
          this.backgroundClass = 'busy-medieval-market';
          break;
        case 'fishing village':
          this.backgroundClass = 'fishing-village';
          break;
        case 'battlefield':
          this.backgroundClass = 'battlefield';
          break;
        case 'ancient ruins':
          this.backgroundClass = 'ancient-ruins';
          break;
        case 'dungeon':
          this.backgroundClass = 'dungeon';
          break;
        case 'magical school':
          this.backgroundClass = 'magical-school';
          break;
        case 'mysterious ancient cemetery':
          this.backgroundClass = 'ancient-cemetery';
          break;
        default:
          this.backgroundClass = 'default-background';
          break;
      }
    });
  }

  async continueStory() {
    if (this.actions > 0) {
      await this.openai.sendMessage(this.userChoice);
      this.userChoice = '';
      this.actions--;
      this.auth.saveActionCount(this.actions);
    } else {
      alert(
        "You've got no more actions left, consider getting more to continue the story"
      );
    }
  }

  ngOnInit(): void {
    this.storyService.aiResponse$.subscribe((response) => {
      this.aiResponse = response;
      this.storyString.push(this.aiResponse);
    });

    this.storyService.story$.subscribe((story) => {
      this.story = story;
    });

    this.userSubscription = this.auth.user$.subscribe((user) => {
      if (user) {
        this.actions = user.historias!;
      }
    });
  }

  onEnterKeyPressed(event: any) {
    if (this.actions > 0) {
      this.continueStory();
      this.actions--;
      this.auth.saveActionCount(this.actions);
    } else {
      alert(
        "You've got no more actions left, consider getting more to continue the story"
      );
    }
  }

  placeHolder: string = 'A healer appears to support me...';

  async actionHandler(actionSlot: number) {
    switch (actionSlot) {
      case 1:
        this.placeHolder =
          '(Name) then the action... ex: Tony swings at the monster with his mighty sword';
        break;
      case 2:
        this.placeHolder =
          'The event... ex: Tony sees a huge stone door with symbols engraved on it';
        break;
      case 3:
        this.placeHolder = '(Name) says... ex: Tony says ¿Who is there?';
        break;
      case 4:
        this.placeHolder =
          '(Name) talks to... ex: Tony talks to Ronnie and tells him to pick up his sword';
        break;
      case 5:
        await this.openai.endStory();
        break;
    }
  }

  isHidden: boolean = false;
  toggleVisibility() {
    this.isHidden = !this.isHidden;
  }
}
