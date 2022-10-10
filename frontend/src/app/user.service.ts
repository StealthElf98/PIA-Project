import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';

  loginService(username:string, password:string){
    let data = {
      username:username,
      password:password
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  registerService(username:string, password:string, firstname:string, lastname:string, country:string,
     email:string, ok:number, type:number){
    let data = {
      username:username,
      password:password,
      firstname:firstname,
      lastname:lastname,
      country:country,
      email:email,
      ok:ok,
      type:type
    }

    return this.http.post(`${this.uri}/users/register`, data);
  }

  checkVodjaService(country, type, ok){
    let data = {
      country:country,
      type:type,
      ok:ok
    }
    return this.http.post(`${this.uri}/users/checkVodja`, data);
  }

  changePasswordService(username, password, npassword){
    let data = {
      username:username,
      password:password,
      npassword:npassword
    }
    return this.http.post(`${this.uri}/users/changePassword`, data);
  }

  getAllRequestsService(){
    return this.http.get(`${this.uri}/users/getAllRequests`);
  }

  deleteRequestService(user:User){
    let data = {
      username:user.username,
      password:user.password
    }
    return this.http.post(`${this.uri}/users/deleteRequest`, data);
  }

  acceptRequestService(user:User){
    let data = {
      username:user.username,
      password:user.password
    }
    return this.http.post(`${this.uri}/users/acceptRequest`, data);
  }

  getAllDelegatesService(){
    return this.http.get(`${this.uri}/users/getAllDelegates`);
  }
}
