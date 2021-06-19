import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createFriend(request){
    return this.httpClient.post(environment.apiBaseUrl + '/friend/create' ,request);
  }

  findReceivedFriend(request){
    return this.httpClient.post(environment.apiBaseUrl + '/friend/list/in' ,request);
  }

  findSendedFriend(request){
    return this.httpClient.post(environment.apiBaseUrl + '/friend/list/out' ,request);
  }

  findAcceptedFriend(request){
    return this.httpClient.post(environment.apiBaseUrl + '/friend/list/accepted' ,request);
  }

  answerFriend(request){
    return this.httpClient.post(environment.apiBaseUrl + '/friend/answer' ,request);
  }

  updateFriend(request){
    return this.httpClient.post(environment.apiBaseUrl + '/friend/update' ,request);
  }

}