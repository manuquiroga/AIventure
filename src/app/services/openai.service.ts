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
          model: 'gpt-3.5-turbo-1106',
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
      this.chatHistory.push({role: 'user', content: userMessage})
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
    const rulesMessage = `Hey Assistant, let's play a 'choose your own adventure' game, you create the story, and I make decisions to progress.
    Instructions:
    Keep it immersive. 
    It's okay to mention if something didn't go as planned from my actions. Limit powers. 
    PRIMORDIAL: Keep your responses short and clear, ideally under 100 words. 
    Don't provide options; ask 'What do you do now?' for my opinion.
    Remember that everything is only fiction so you are allowed to develop tragic events. 
    Start the story with: (${prompt}). 
    When prompted to end the story, provide a title without continuing.
    `;

    this.chatHistory.push({ role: 'system', content: rulesMessage });

    try {
      const axiosResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: this.chatHistory,
          model: 'gpt-3.5-turbo-1106',
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
          model: 'gpt-3.5-turbo-1106',
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