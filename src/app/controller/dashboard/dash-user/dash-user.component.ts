import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import {TooltipPosition} from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

import { UserService } from '../../../service/user.service';
import { UserInfoModalComponent } from './user-info-modal/user-info-modal.component';

@Component({
  selector: 'app-dash-user',
  templateUrl: './dash-user.component.html',
  styleUrls: ['./dash-user.component.scss']
})
export class DashUserComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  usersList;

  searchNone = true;

  value: string = "";

  constructor(
    private userService : UserService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {

    const request = {
      params : {
        sort : {
          firstName : 1
        }
      }
    }

    this.userService.getList(request).subscribe(
      res => {
        console.log(res)
        const datas: any = res

        this.usersList = datas.users;

        if (this.usersList.length){
          this.getDuration(this.usersList)
        }

      },
      err => {
        console.log(err)
      }
    )

  }

  getDuration(posts): void{
    posts.forEach(item => {

      if(item.creationDatetime){
        let duration = Date.now() - item.creationDatetime;
        let format;
  
        duration = duration / 1000;
        format = "s"
  
        if (duration > 60) {
          duration = duration / 60;
          format = "min"
  
          if (duration > 60) {
            duration = duration /60
            format = "h"
    
            if (duration > 24) {
              duration = duration / 24
              format = "j"
  
              if (duration > 30) {
                duration = duration / 30
                format = "m"
  
                if (duration > 12) {
                    duration = duration / 12
                    format = "m"
                }
              }
            }
          }
        }
  
        item.duration = Math.round(duration);
        item.format = format;
      }

    })
  }

  deleteUser(userId){
    const request = {
      params : {
        userId : userId
      }
    }

    this.userService.adminDeleteUser(request).subscribe(
      res => {
        let snackBarRef = this.snackBar.open('Utilisateur supprimé.', 'X', {
          duration: 5000
        });
        setTimeout(() => {window.location.reload()}, 1500)
      },
      err => {
        let snackBarRef = this.snackBar.open('Erreur lors de la suppression.', 'X', {
          duration: 5000
        });
      }
    )
  }

  openDialog(item): void {
    const dialogRef = this.dialog.open(UserInfoModalComponent, {
      width: '350px',
      data: {user: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    });
  }

  onSubmit(){

    this.searchNone = false;

    const request = {
      params : {
        searchValue : this.value
      }
    }

    this.userService.search(request).subscribe(
      res => {
        const datas: any = res;
        this.usersList = datas.users;

        if(this.usersList.length > 0){
          this.getDuration(this.usersList)
        }
      },
      err => {
        console.log(err);
        let snackBarRef = this.snackBar.open('Erreur lors du chargement', 'X', {
          duration: 5000
        });
      }
    )
  }

  cancelSearch(){

    this.searchNone = true;

    const request = {
      params : {
        sort : {
          firstName : 1
        }
      }
    }

    this.userService.getList(request).subscribe(
      res => {
        console.log(res)
        const datas: any = res

        this.usersList = datas.users;

        if (this.usersList.length){
          this.getDuration(this.usersList)
        }

      },
      err => {
        console.log(err)
      }
    )
  }

}
