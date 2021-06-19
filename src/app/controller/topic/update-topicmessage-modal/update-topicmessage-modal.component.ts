import { Component, OnInit, Inject } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  content: string;
}

@Component({
  selector: 'app-update-topicmessage-modal',
  templateUrl: './update-topicmessage-modal.component.html',
  styleUrls: ['./update-topicmessage-modal.component.scss']
})
export class UpdateTopicmessageModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateTopicmessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    console.log(this.data)
  }

}
