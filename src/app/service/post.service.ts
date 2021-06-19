import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createPost(request){
    return this.httpClient.post(environment.apiBaseUrl + '/post/create' ,request);
  }

  updatePost(request){
    return this.httpClient.post(environment.apiBaseUrl + '/post/update' ,request);
  }

  deletePost(request){
    console.log(request)
    return this.httpClient.post(environment.apiBaseUrl + '/post/delete' ,request);
  }

  userPost(request){
    return this.httpClient.post(environment.apiBaseUrl + '/post/list/author' ,request);
  }

  friendPost(request){
    return this.httpClient.post(environment.apiBaseUrl + '/post/list' ,request);
  }
}
