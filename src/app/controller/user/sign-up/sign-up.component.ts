import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';


import { UserService } from '../../../service/user.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: []
})
export class SignUpComponent implements OnInit {

  emailAddressRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  loaderActive = false;

  constructor(
    public userService: UserService,
    private router: Router,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    if(this.userService.isLoggedIn()){
      this.router.navigateByUrl('/profile')
    }
  }

  onSubmit(form: NgForm){

    const user = {
      email : form.value.emailAddress,
      password : form.value.password
    }

    this.userService.createUser(form.value).subscribe(
      res => {
        this.loaderActive = true
        this.resetForm(form);
        let snackBarRef = this.snackBar.open('Compte créé, redirection en cours.', 'X', {
          duration: 5000
        });
        this.userService.logUser(user).subscribe(
          res => {
            localStorage.setItem("token", res['token']);
            this.router.navigateByUrl('home');
          },
          err => {
            this.serverErrorMessages = err.error.message
          }
        )
      },
      err => {
        console.log(err);
        if (err.status == 422){
          let snackBarRef = this.snackBar.open('Addresse mail déja utilisée.', 'X', {
            duration: 5000
          });
        } else {
          let snackBarRef = this.snackBar.open('Erreur lors de la création du compte.', 'X', {
            duration: 5000
          });
        }
      }  
    )
  }

  resetForm(form: NgForm){
    this.userService.selectedUser = {
      emailAddress : "",
      password : "",
      firstName : "",
      lastName : "",
      country: ""
    };
    form.resetForm();
    this.serverErrorMessages = "";
  }

}
