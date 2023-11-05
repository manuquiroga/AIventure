import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private apiUrl = 'http://localhost:8000/post';

  constructor(private http: HttpClient) {}

  postData(question: string) {
    return this.http.post(this.apiUrl, { prompt: question });
  }
}