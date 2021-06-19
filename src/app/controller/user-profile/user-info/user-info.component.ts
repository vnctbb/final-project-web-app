import { Component, OnInit, Input } from '@angular/core';

import {MatBottomSheet} from '@angular/material/bottom-sheet';

import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { UserService } from 'src/app/service/user.service';
import { UserDeleteSheetComponent } from '../user-delete-sheet/user-delete-sheet.component';
import { UserInfoUpdateModalComponent } from '../user-info-update-modal/user-info-update-modal.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() user;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private snackBar : MatSnackBar,
    public dialog: MatDialog,
    private userService : UserService
  ) { }

  ngOnInit(): void {

  }

  openBottomSheet(): void {
    this._bottomSheet.open(UserDeleteSheetComponent);
  }

  openDialog(user): void {
    const dataSendToModal = user
    const dialogRef = this.dialog.open(UserInfoUpdateModalComponent, {
      width: '400px',
      data: {...user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');

      if(result.age > 99 || result.age < 0){
        let snackBarRef = this.snackBar.open("Erreur : Age non valide", 'X', {
          duration: 5000
        });
        return
      }

      this.userService.updateUser(result).subscribe(
        res => {
          console.log(res);
          let snackBarRef = this.snackBar.open("Modification enregistré", 'X', {
            duration: 1500
          });
          setTimeout(() => {window.location.reload();}, 1500)
        },
        err => {
          console.log(err)
          let snackBarRef = this.snackBar.open("Erreur lors de la modification", 'X', {
            duration: 5000
          });
        }
      )

    });
  }

}
