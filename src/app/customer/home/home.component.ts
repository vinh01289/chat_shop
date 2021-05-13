import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserProfile } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Conversation } from 'src/app/model/conversation';
import { ChatService } from 'src/app/services/chatservice';
import { ConversationComponent } from '../chat/conversation/conversation.component';
import { AuthService } from 'src/app/services/auth.service';
import { shopService } from 'src/app/services/shopservice.service';
import { Message } from 'src/app/model/message';
import { Token } from 'src/app/model/token';
import { SocketService } from 'src/app/services/socket.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  user: UserProfile;
  isCollapsed = false;
  isConversation = false;
  Conversation: Conversation;
  lstShopConversation : Conversation;
  isShowConversation = false;
  Content: string;
  listConversationCustomer : Conversation;
  @ViewChild(ConversationComponent) conversationComponent: ConversationComponent;
    // @ViewChild(SearchComponent) searchComponent: SearchComponent;

  constructor(private auth: AuthService, public chatService: ChatService, private route: ActivatedRoute, private router: Router, private shopservice: shopService, private readonly socketService: SocketService) {
   
   }

  ngOnInit(): void {
    if(!this.auth.loginIn()){
      this.router.navigate(['customer/login']);
    }
    let token = {} as Token;
    token.accessToken  = localStorage.getItem('accessToken');
    token.refreshToken  = localStorage.getItem('refreshToken');
    // this.auth.loadCurrentUser(token).subscribe((res: UserProfile) => {
    //   if (res) {
    //       this.user = res;
    //       console.log("this.user",this.user);
    //     }
    //   }
    // );
    
    // this.p_getChat();
    //  this.chatService.getConversation();
    this.chatService.getConversationCustomer().subscribe(res=>{
      this.listConversationCustomer = res;
      console.log('listConversation', res);
    });
     //this.onGetMessage(this.Conversation);
    //  this.chatService.getConversationCustomer();
  }

  public onGetMessage(item: any): void {
    this.Content = '';
    this.Conversation = item;
    const newLocal = this;
    newLocal.isShowConversation = true;
    this.chatService.getMessage(item.conversationId).subscribe(res => {
      this.chatService.listMessage = res;
      console.log('list message', this.chatService.listMessage);
    });
  }
  sentMessage(content: string, type: string, conversationId: string, messageType: number, attachmentIds: string[]): Observable<any> {
    const socketId = this.socketService.socket.id;
    return new Observable(obs => {
      this.http.post(`${environment.apiUrl.chatUrl}api/v1/messages`, {
        content,
        type,
        conversationId,
        messageType,
        attachmentIds,
        socketId
      }, { responseType: 'text' }).subscribe(res => {
        obs.next(res);
        obs.complete();
      }, er => {
        obs.error('Loi');
        obs.complete();
      });
    });
  }
  // private p_getChat(): void {
  //   this.socketService.listen('chat').subscribe(data => {
  //     if (this.Conversation != null && data.conversationId === this.Conversation.conversationId) {
  //       // this.chatService.listMessage.filter(res => {
  //       //   if (res.id !== data.messageId) {
  //       //     this.chatService.listMessage = [...this.chatService.listMessage, ...[data]];
  //       //   }
  //       // });
  //       const exist = this.chatService.listMessage.filter(res => res.id === data.id)[0];
  //       if (!exist) {
  //         this.chatService.listMessage = [...this.chatService.listMessage, ...[data]];
  //       }
  //     }
  //     this.chatService.getConversationCustomer();
  //   });
  // }
  
}

