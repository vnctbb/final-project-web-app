import { Component, Inject, OnInit} from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  topicName: string;
  topicDescription: string;
}

@Component({
  selector: 'app-update-topic-modal',
  templateUrl: './update-topic-modal.component.html',
  styleUrls: ['./update-topic-modal.component.scss']
})
export class UpdateTopicModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateTopicModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
  }

}
