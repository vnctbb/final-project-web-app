import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createTopic(request){
    return this.httpClient.post(environment.apiBaseUrl + '/topic/create' ,request);
  }

  updateTopic(request){
    return this.httpClient.post(environment.apiBaseUrl + '/topic/update' ,request);
  }

  deleteTopic(request){
    return this.httpClient.post(environment.apiBaseUrl + '/topic/delete' ,request);
  }

  countTopic(){
    return this.httpClient.get(environment.apiBaseUrl + '/topic/count');
  }

  findOne(request){
    return this.httpClient.post(environment.apiBaseUrl + '/topic/find', request);
  }

  findList(request){
    return this.httpClient.post(environment.apiBaseUrl + '/topic/find/list' ,request);
  }

  findListByOwner(request){
    return this.httpClient.post(environment.apiBaseUrl + '/topic/find/list/owner' ,request);
  }

}
