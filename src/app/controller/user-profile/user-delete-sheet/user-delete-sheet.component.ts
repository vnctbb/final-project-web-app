import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MatSnackBar} from '@angular/material/snack-bar';

import { UserService } from '../../../service/user.service'

@Component({
  selector: 'app-user-delete-sheet',
  templateUrl: './user-delete-sheet.component.html',
  styleUrls: ['./user-delete-sheet.component.scss']
})
export class UserDeleteSheetComponent{

  constructor(
    public _bottomSheetRef: MatBottomSheetRef<UserDeleteSheetComponent>,
    private userService : UserService,
    private snackBar : MatSnackBar,
    private router : Router
    ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  delete(){
    this.userService.deleteUser().subscribe(
      res => {
        console.log(res);
        this.userService.deleteToken();
        this._bottomSheetRef.dismiss();
        event.preventDefault();
        this.router.navigateByUrl('/login');
      },
      err => {
        console.log(err);
        this._bottomSheetRef.dismiss();
        event.preventDefault();
        let snackBarRef = this.snackBar.open('Erreur lors de la suppression', 'X', {
          duration: 5000
        });
      }
    )
  }

}
