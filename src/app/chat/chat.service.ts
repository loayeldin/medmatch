import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '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';

  constructor(private http: HttpClient) {}

  sendMessageToChatGPT(message: string): Observable<string> {
    if (message.toLowerCase().includes('what is your name')||
    message.toLowerCase().includes("what's your name")||
    message.toLowerCase().includes("what is your name")||
    message.toLowerCase().includes('tell me your name')||
    message.toLowerCase().includes('tell me about your name')) {
        return of('I am a Med Match Chatbot. How can I help you?'); 
      }

      if (message.toLowerCase().includes('tell me about your self')) {
        const response = `I am Med Match Chat Bot. It was established in 2023 as a graduation project for the Faculty of Computers and Information, Kafrelsheikh University, and the people in charge of my establishment are:
        
        - Ahmed gamal Muhammad Ali
        - Loay El Din Jamal
        - Hossam Ahmed Al-Tayeb
        - Omar Ali Hassan
        - Hadi Muhammed Ali
        - Yahya Mohamed Ibrahim
        - Youssef Abdeen
        - Mahmoud Said Onsi
        - Faris Ahmed Fouad
        - Mostafa Mohamed Mostafa
        
        It was supervised by Professor Haitham Al-Wahsh.`;
    
        return of(response).pipe(delay(2000))
      }
    
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are a chatbot.' }, { role: 'user', content: message }]
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`
    });

    return this.http.post<any>(this.apiEndpoint, requestBody, { headers }).pipe(
      map(response => response.choices[0].message.content)
    );
  }
}