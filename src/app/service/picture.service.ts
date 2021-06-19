import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(
    private httpClient: HttpClient
  ) { }

  uploadPicture(file){
    return this.httpClient.post(environment.apiBaseUrl + '/picture/upload/profile' ,file);
  }
}

