import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from 'environments';
import { StoryService } from './storyService';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class OpenaiService{
  messages: any[] = [];
  userInput: string = '';
  apiKey: string = environment.openAi.apiKey;
  chatHistory: any[] = [];

  private connectionClosedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public connectionClosed$: Observable<boolean> = this.connectionClosedSubject.asObservable();


  constructor(private storyService: StoryService) {}

  handleOption(optionText: string) {
    console.log('User chose option:', optionText);
  }

  async sendMessage(input:string) {
    let userMessage = input;
    try {
      const axiosResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: this.chatHistory.concat({ role: 'user', content: userMessage }),
          model: 'gpt-3.5-turbo',
          temperature: 0.2,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      const aiMessage = axiosResponse.data.choices[0].message.content;
      this.chatHistory.push({ role: 'user', content: userMessage });
      this.chatHistory.push({ role: 'assistant', content: aiMessage });

      this.messages.push(aiMessage);
      
      this.storyService.setAiResponse(aiMessage); 
      this.storyService.addToStory(aiMessage);
      
      console.log('Chat History:', this.chatHistory);

      console.log('Información de uso:', axiosResponse.data.usage);
      this.messages.push({ text: aiMessage, role: 'assistant' });
    } catch (error: any) {
      console.error('Error al obtener la completitud del chat:', error);

      if (error.response) {
        console.error('Respuesta de la API:', error.response.data);
      }
    }
  }


  async sendMessageSystem(prompt:string) {
    const rulesMessage = `Hey AI, let's play a choose-your-own-adventure game. 
    You create a story, and I make choices to progress. RPG style with skill development, immersive conversations, and micro-managing decisions. 
    Keep it immersive, creative, and challenging. it's ok for you to tell me that something didn't go to plan from one of my actions. Grounded theme, with conflicts and surprises. it's ok for this to be mature. As in, mature themes.
    Limit powers and have a day/night cycle. Keep it mature. Track inventory and provide reactions. Keep responses concise, not more than 100 words but still close the idea you were writing. Don't provide options; ask 'What do you do now?' when you need my input. 
    Ensure character decisions from past interactions are considered for story development. Let's start the story with: (${prompt}).
    The character will have 5 attributes, I want you to take them into account for the development of the story, the maximum score is 6 and the minimum score is 1.
    When the system sends you a message asking you to put an end to the story and create a fitting title, do it and don't continue the story.
    `;

    this.chatHistory.push({ role: 'system', content: rulesMessage });

    try {
      const axiosResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: this.chatHistory,
          model: 'gpt-3.5-turbo',
          temperature: 0.2,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      const aiMessage = axiosResponse.data.choices[0].message.content;

      this.chatHistory.push({ role: 'assistant', content: aiMessage });
      this.messages.push(aiMessage);

      this.storyService.setAiResponse(aiMessage);
      this.storyService.addToStory(aiMessage);

      console.log('Chat History:', this.chatHistory);


      console.log('Información de uso:', axiosResponse.data.usage);
    } catch (error: any) {
      console.error('Error al obtener la completitud del chat:', error);

      if (error.response) {
        console.error('Respuesta de la API:', error.response.data);
      }
    }
  }
  
  async endStory()
  {
    const str=this.storyService.endStory();
    this.chatHistory.push({ role: 'system', content: str });
    try {
      const axiosResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: this.chatHistory,
          model: 'gpt-3.5-turbo',
          temperature: 0.2,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );
      const aiMessage = axiosResponse.data.choices[0].message.content;

      this.chatHistory.push({ role: 'assistant', content: aiMessage });
      this.messages.push(aiMessage);

      this.storyService.setAiResponse(aiMessage);
      this.storyService.addToStory(aiMessage);
      

      this.cleanChat();
      
      console.log('Información de uso:', axiosResponse.data.usage);
    } catch (error: any) {
      console.error('Error al obtener la completitud del chat:', error);

      if (error.response) {
        console.error('Respuesta de la API:', error.response.data);
      }
    }
  }

  async cleanChat(){
    this.chatHistory = [];
    console.log('Se limpio el chat history');
  }

  closeConnection(): void {
    this.connectionClosedSubject.next(true);
    console.log('Cerrando conexión con la API');
  }

}