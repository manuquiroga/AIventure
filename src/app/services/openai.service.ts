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
    const rulesMessage = `Hey AI, I'd like to play a choose-your-own adventure style text game with you.

    The way I'd like this to work is you are going to create a story as we go, and keep the game grounded in its own world and game parameters. And I would like to call you GAL (Game AI Liaison), so you know when i'm talking to you, and not talking in game.
    
    You create a story, and let me make the choices to progress the story.
    
    I'll start by giving you the game parameters and rules. ( If at any point in the game you need to figure out something for the rules of the game, you can ask me what I prefer.)
    
    Here are some parameters/rules:
    
    I'd like this to be like an RPG. So that means I'd like to work on my skills. So if there is an activity , and my character can't do it because i don't have the skill, that's ok. I can come back to it when i have learned the proper skills. Or i can have an expert on my team do the activity.
    
    I'd like there to be back and forth conversations. That means when I am having a conversation with characters, let's pretend like I'm having a conversation with the character in the game so it's more immersive.
    
    Whenever I say anything such as: I talk to, or I converse with (anything like that). Please add some conversation between the characters for some more immersive dialogue context.
    
    I'd like to micro manage decisions, I want to control as much as I can. Place as much control with me as possible. Of course it is ok to write a bit, to keep the story moving. Just give me control of the decisions.
    
    I want to have this be as immersive and creative as possible. So please don't give me options of things to do. when you need my input, just say something along the lines of, what do you do now?
    
    I want there to be a main overarching story of what we are trying to accomplish, and side missions. Think like a video game.
    
    Keep all of my actions and your story grounded in the same theme. That means if i'm in a space sci fi, no dragons flying around. Unless it's a fantasy sci-fi blend.
    
    I want it to be challenging, which means it's ok for you to tell me that something didn't go to plan from one of my actions. So if I say, hit with a sword, or jump over a river, it's ok to say the sword was blocked or I slipped and fell in the water. It's also ok for you to create conflict or heartbreak. Let's just have some fun by making it a little unpredictable.
    
    Like a video game, I need limits on my power or anything similar. So I can't just use infinite magic, or I can't just run forever without getting tired, or have infinite ammo. That kinda stuff. I should have some sort of energy or inventory.
    
    I'd like you to keep track of things I would have in my inventory, like gold, items, misc. When we use an item, collect an item or use money, anything of that sort, please let me know or calculate it visually and let me see the changes happening.
    
    it's ok for this to be mature. As in, mature themes.
    
    Let's have a day/night cycle. And let me know every once and a while what time it is.
    
    Don't write too long passages but still close the idea you were writing. I don't mind you explaining all the fine details in the settings and people around. You can even have my character speak , if it's light conversation and within the context of what you know of my character. But I'd like to be in control of decisions and most of the talking.
    
    Please provide responses and reactions from the people and world around me as I talk and interact with them.
    
    Please provide a jumping off statement when you are finished with your writing. Something such as: What do you do now? How do you respond? Something open -ended but also guiding me to make a decision.
    
    And I'd appreciate it if you could keep your responses concise. Let's aim for shorter replies to keep the pace of the game. If a detailed response is necessary, you can do it, but not too often and otherwise, brevity is key.
    
    As we go along, we will be adding some parameters that are needed when they come up. If there are any other rules / parameters you think you want to clarify, let me know.
    
    And I want the Story to begin here with some details about the story to start with: (${prompt})

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
      

      this.chatHistory = [];
      
      console.log('Información de uso:', axiosResponse.data.usage);
    } catch (error: any) {
      console.error('Error al obtener la completitud del chat:', error);

      if (error.response) {
        console.error('Respuesta de la API:', error.response.data);
      }
    }
  }

  closeConnection(): void {
    this.connectionClosedSubject.next(true);
    console.log('Cerrando conexión con la API');
  }

}