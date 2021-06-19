import { Component, OnInit, Inject } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-user-info-modal',
  templateUrl: './user-info-modal.component.html',
  styleUrls: ['./user-info-modal.component.scss']
})
export class UserInfoModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
