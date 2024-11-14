import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { marked } from 'marked';

@Component({
    selector: 'chat-component',
    templateUrl: './chat.component.html',
    imports: [FormsModule, CommonModule],
    // providers: [provideHttpClient()],
    standalone: true
})
export class ChatComponent {

    userMessage: string = '';
    response: string | null = null;

    constructor(private http: HttpClient) {}

    sendMessage() {
        this.http.post<{ response: string }>('http://localhost:5000/chat', 
        { message: this.userMessage })
        .subscribe(async res => {
            const parsed = await Promise.resolve(marked.parse(res.response));
            this.response = parsed;
        });
    }

}