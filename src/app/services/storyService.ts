import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private aiResponseSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public aiResponse$: Observable<string> = this.aiResponseSubject.asObservable();

  private storySubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public story$: Observable<string[]> = this.storySubject.asObservable();

  setAiResponse(response: string) {

    this.aiResponseSubject.next(response);
  }

  startNewStory() {
    // Limpiar cualquier estado anterior al comenzar una nueva historia
    this.storySubject.next([]);
    this.aiResponseSubject.next('');
  }

  addToStory(message: string) {

    const currentStory = this.storySubject.value;
    const updatedStory = [...currentStory, message + '\n'];
    this.storySubject.next(updatedStory);
  }

  userChooseOption(optionText: string) {

    const userChoiceMessage = `User chose: ${optionText}`;
    this.addToStory(userChoiceMessage); 
  
  }

  endStory(): string
  {
    const str="After this message, I want you to give a small ending to the story related to the last thing that happened in the story and create a fitting title for it";
    return str
  }

}
