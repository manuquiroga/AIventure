import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { OpenAI } from "openai"

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  async main()
  {
    
      try {
         const openai = new OpenAI({
           apiKey: environment.openai.apiKey,
           dangerouslyAllowBrowser: true,
         });
         const chatCompletion = await openai.chat.completions.create({
           model: 'gpt-3.5-turbo',
           messages: [
             {
               'role': 'user',
               'content': 'say this is a test',
             },
           ],
         });
         console.log(chatCompletion);
      } catch (err) {
         console.log(err);
      }
     
    
  
}
}