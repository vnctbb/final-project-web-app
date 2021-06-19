import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicmessageService {

  constructor(
    private httpClient: HttpClient
  ) { }

  create(request){
    return this.httpClient.post(environment.apiBaseUrl + '/topicmessage/create' ,request);
  }

  update(request){
    return this.httpClient.post(environment.apiBaseUrl + '/topicmessage/update' ,request);
  }

  count(request){
    return this.httpClient.post(environment.apiBaseUrl + '/topicmessage/count', request);
  }

  findList(request){
    return this.httpClient.post(environment.apiBaseUrl + '/topicmessage/list/topic' ,request);
  }

  delete(request){
    return this.httpClient.post(environment.apiBaseUrl + '/topicmessage/delete' ,request);
  }

  adminDelete(request){
    return this.httpClient.post(environment.apiBaseUrl + '/topicmessage/delete/admin' ,request);
  }
}
