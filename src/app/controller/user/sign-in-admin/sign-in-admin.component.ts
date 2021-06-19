import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../service/user.service'

@Component({
  selector: 'app-sign-in-admin',
  templateUrl: './sign-in-admin.component.html',
  styleUrls: ['./sign-in-admin.component.scss']
})
export class SignInAdminComponent implements OnInit {

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
      this.router.navigateByUrl('/home')
    }
  }

  onSubmit(form: NgForm){
    this.userService.logAdmin(form.value).subscribe(
      res => {
        localStorage.setItem("token", res['token']);
        this.router.navigateByUrl('dashboard/user');
      },
      err => {
        if(err.error == "Access forbidden"){
          console.log("FORBIDDEN")
          this.router.navigateByUrl('login');
        }
        this.serverErrorMessages = err.error.message
      }
    )
  }

}
