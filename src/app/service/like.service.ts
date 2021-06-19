import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  exist(request){
    return this.httpClient.post(environment.apiBaseUrl + '/like/exist' ,request);
  }

  list(request){
    return this.httpClient.post(environment.apiBaseUrl + '/like/list' ,request);
  }

  createLike(request){
    return this.httpClient.post(environment.apiBaseUrl + '/like/create' ,request);
  }

  deleteLike(request){
    return this.httpClient.post(environment.apiBaseUrl + '/like/delete' ,request);
  }


}
