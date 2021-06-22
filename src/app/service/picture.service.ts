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
    return this.httpClient.post(environment.staticServerUrl + '/upload' ,file);
  }

  deletePicture(filename){
    return this.httpClient.get(environment.staticServerUrl + '/delete/' + filename);
  }
}

