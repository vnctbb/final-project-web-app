import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-profile-picture-modal',
  templateUrl: './profile-picture-modal.component.html',
  styleUrls: ['./profile-picture-modal.component.scss']
})
export class ProfilePictureModalComponent{
  @ViewChild('fileInput', {static : false}) fileInput : ElementRef

  constructor(
    public dialogRef: MatDialogRef<ProfilePictureModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.fileInput)
  }

}
