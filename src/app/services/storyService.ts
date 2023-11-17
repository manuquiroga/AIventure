// story.service.ts
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

  addToStory(message: string) {
    const currentStory = this.storySubject.value;
    const updatedStory = [...currentStory, message];
    this.storySubject.next(updatedStory);
  }

  userChooseOption(optionText: string) {
    // Agregar lógica necesaria para manejar la elección del usuario
    // Puedes llamar a otras funciones del servicio o realizar acciones específicas aquí
    const userChoiceMessage = `User chose: ${optionText}`;
    this.addToStory(userChoiceMessage); // Agregar la elección del usuario a la historia
    // Puedes agregar más lógica según sea necesario
  }
}
