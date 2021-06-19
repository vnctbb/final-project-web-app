import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostComService {

  constructor(
    private httpClient: HttpClient
  ) { }

  create(request){
    return this.httpClient.post(environment.apiBaseUrl + '/postcom/create' ,request);
  }

  update(request){
    return this.httpClient.post(environment.apiBaseUrl + '/postcom/update' ,request);
  }

  listByPost(request){
    return this.httpClient.post(environment.apiBaseUrl + '/postcom/list/post' ,request);
  }

  delete(request){
    return this.httpClient.post(environment.apiBaseUrl + '/postcom/delete' ,request);
  }

  authorDelete(request){
    return this.httpClient.post(environment.apiBaseUrl + '/postcom/author/delete' ,request);
  }

}

