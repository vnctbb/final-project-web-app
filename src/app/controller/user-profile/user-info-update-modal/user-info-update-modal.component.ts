import { Component, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';

import { User } from '../../../model/user.model';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-user-info-update-modal',
  templateUrl: './user-info-update-modal.component.html',
  styleUrls: ['./user-info-update-modal.component.scss']
})
export class UserInfoUpdateModalComponent{

  toppings = new FormControl();

  radio = {
    woman : "Femme",
    man : 'Homme'
  }
  constructor(
    public dialogRef: MatDialogRef<UserInfoUpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
