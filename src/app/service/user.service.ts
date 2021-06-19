import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../model/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    emailAddress : "",
    password : "",
    firstName : "",
    lastName : "",
    country: ""
  }

  noAuthHeader = {headers : new HttpHeaders({ 'NoAuth' : 'True' })}

  constructor(
    private httpClient: HttpClient
  ) { }

  createUser(user: User){
    return this.httpClient.post(environment.apiBaseUrl + '/user/create' ,user, this.noAuthHeader);
  }

  logUser(authCredentials){
    return this.httpClient.post(environment.apiBaseUrl + '/user/authenticate' ,authCredentials, this.noAuthHeader);
  }

  updateUser(user: User){
    return this.httpClient.post(environment.apiBaseUrl + '/user/update' ,user);
  }

  getUserProfile(){
    return this.httpClient.get(environment.apiBaseUrl + '/user/profile');
  }

  getUserProfilePicture(request){
    return this.httpClient.post(environment.apiBaseUrl + '/user/profile/picture', request, {
        responseType : 'blob',
    });
  }

  getOneById(request){
    return this.httpClient.post(environment.apiBaseUrl + '/user/find', request)
  }

  search(request){
    return this.httpClient.post(environment.apiBaseUrl + '/user/search', request)
  }

  deleteUser(){
    return this.httpClient.get(environment.apiBaseUrl + '/user/delete');
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getUserPayLoad(){
    var token = this.getToken();
    if(token){
      var userPayLoad = atob(token.split('.')[1]);
      return JSON.parse(userPayLoad)
    } else {
      return null
    }
  }

  isLoggedIn() {
    var userPayload = this.getUserPayLoad();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false
    }
  }
}
