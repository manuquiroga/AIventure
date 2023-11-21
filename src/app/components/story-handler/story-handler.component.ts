import { Component, OnInit,OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OpenaiService } from 'src/app/services/openai.service';
import { StoryService } from 'src/app/services/storyService';
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/services/background.service';
import { Router } from '@angular/router';
import { DownloadStoryComponent } from '../download-story/download-story.component';


@Component({
  selector: 'app-story-handler',
  templateUrl: './story-handler.component.html',
  styleUrls: ['./story-handler.component.css'],
})
export class StoryHandlerComponent implements OnInit, OnDestroy {
  userChoice: string = '';
  story: string[] = [];
  aiResponse: string = '';
  storyString: { text: string; class: string }[] = [];
  actions!: number;
  backgroundClass!: string;

  backup!:string;

  private userSubscription: Subscription | undefined;
  private storySubscription: Subscription | undefined;
  private responseSubscription: Subscription | undefined;
  private connectionClosedSubscription: Subscription | undefined;
  private responseBackground: Subscription | undefined;

  constructor(
    private storyService: StoryService,
    private openai: OpenaiService,
    private auth: AuthService,
    private sharedDataService: SharedDataService,
    private router:Router,
    private pdf:DownloadStoryComponent,
  ) {
    this.connectionClosedSubscription = this.openai.connectionClosed$.subscribe(
      (closed) => {
        if (closed) {
          console.log('Conexión cerrada. Realizando acciones adicionales.');
        }
      }
    );
    this.responseBackground =
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

  isInputDisabled = false;
  async continueStory() {
    const input = document.getElementById('prompt-input') as HTMLInputElement;
    if (input) {
      this.storyString.push({
        text: " - " + input.value,
        class: 'user-text',
      });
      input.value = '';
      this.actions--;
      this.auth.saveActionCount(this.actions);
    }
    if (this.actions > 0 && !this.isInputDisabled) {
      this.isInputDisabled = true;
      this.storyString.push({
        text: 'AI is thinking...',
        class: 'thinking-text cursor',
      });
      await this.openai.sendMessage(this.userChoice);

      this.isInputDisabled = false;
      this.userChoice = '';
      
    } else if (this.actions === 0) {
      alert(
        "You've got no more actions left, consider getting more to continue the story"
      );
    } else if (this.isInputDisabled) {
      alert('You cannot send more than one message');
    }
  }

  ngOnInit() {
    console.log(this.storyString);
    this.userChoice = '';
    this.story = [];
    this.aiResponse = '';
    this.storyString = [];

    
      this.storyService.startNewStory();

      this.responseSubscription = this.storyService.aiResponse$.subscribe(
      (response) => {
        this.aiResponse = response;
        this.storyString.pop();
        this.storyString.push({
          text: this.aiResponse,
          class: 'response-text',
        });
      }
    );

      this.storySubscription = this.storyService.story$.subscribe((story) => {
      this.story = story;
    });

      this.userSubscription = this.auth.user$.subscribe((user) => {
      if (user) {
        this.actions = user.historias!;
      }
    });
    this.actions--;
    
    

    
  }

  onEnterKeyPressed(event: any) {
    if (this.actions > 0) {
      this.continueStory();
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
        this.storyString.push({
          text: 'AI is thinking...',
          class: 'thinking-text cursor',
        });
        this.toggleVisibility();
        await this.openai.endStory();
        this.openai.closeConnection();
        this.sharedDataService.firstSection = false;
        break;
      case 2:
        this.cleanStory();
        break;
    }
  }

  isHidden: boolean = false;
  toggleVisibility() {
    setTimeout(() => {
      this.isHidden = true;
    }, 200);
    
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.storySubscription) {
      this.storySubscription.unsubscribe();
    }
    if (this.responseSubscription) {
      this.responseSubscription.unsubscribe();
    }
    if (this.connectionClosedSubscription) {
      this.openai.cleanChat();
      this.connectionClosedSubscription.unsubscribe();
    }
    if (this.responseBackground) {
      this.responseBackground.unsubscribe();
    }
    this.openai.closeConnection();
    this.userChoice = '';
    this.story = [];
    this.aiResponse = '';
    this.storyString = [];
  }

  manageActions() {
    this.actions++;
    this.auth.saveActionCount(this.actions);
  }

removeWhatDoYouDoNow(text: string): string {
  const separator = 'What do you do now?.';

  const parts = text.split(separator);

  const filteredParts = parts.filter(part => part.trim() !== '');
  
  const result = filteredParts.join('. ');
  
  return result;
}

cleanStory()
  {
    this.backup = '';
    this.storyString.forEach(item=>{
      if(item.class==='response-text' && item!=undefined){
        this.backup+=item.text + '\n'; 
      }
    })
    this.backup = this.removeWhatDoYouDoNow(this.backup);
    this.pdf.generatePDF(this.backup);
  }  
}