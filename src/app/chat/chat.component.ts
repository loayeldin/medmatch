import { Component } from '@angular/core';
import { ChatService } from './chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  userMessage = '';
  chatMessages: { role: string; content: string }[] = [];

  constructor(private chatService: ChatService) {}
  showChatbot = true;
  sendMessage(): void {
    const userMessage = this.userMessage.trim();
    if (!userMessage) {
      return;
    }

    this.chatMessages.push({ role: 'outgoing', content: userMessage });
    this.userMessage = '';

     
    this.chatMessages.push({ role: 'incoming', content: 'Thinking...' });
    this.showChatbot = false;

    
      setTimeout(() => {
        this.chatService.sendMessageToChatGPT(userMessage).subscribe(response => {

        this.chatMessages.pop();

        this.chatMessages.push({ role: 'incoming', content: response });
        
      });
    }, 1000);

  }
}