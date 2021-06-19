import { Component, OnInit, Inject } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-postcom-update-modal',
  templateUrl: './postcom-update-modal.component.html',
  styleUrls: ['./postcom-update-modal.component.scss']
})
export class PostcomUpdateModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PostcomUpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
