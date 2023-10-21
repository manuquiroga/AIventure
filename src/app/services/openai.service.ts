import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiKey = environment.openai.apiKey;
  private apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  public enviarPrompt(texto: string) {
    const data = {
      prompt: texto,
    };

    return this.http.post(this.apiUrl, data, this.httpOptions);
  }
}