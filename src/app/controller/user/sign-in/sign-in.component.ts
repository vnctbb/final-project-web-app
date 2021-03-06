import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../service/user.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private userService : UserService,
    private router : Router
  ) { }
  
    model = {
      email: "",
      password: ""
    }
  
  emailAddressRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  serverErrorMessages: string;

  ngOnInit(): void {
    if(this.userService.isLoggedIn()){
      this.router.navigateByUrl('/profile')
    }
  }

  onSubmit(form: NgForm){
    this.userService.logUser(form.value).subscribe(
      res => {
        localStorage.setItem("token", res['token']);
        this.router.navigateByUrl('home');
      },
      err => {
        this.serverErrorMessages = err.error.message
      }
    )
  }

}
