import { Component, Inject } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  topicName: string;
  topicDescription: string;
}

@Component({
  selector: 'app-create-topic-modal',
  templateUrl: './create-topic-modal.component.html',
  styleUrls: ['./create-topic-modal.component.scss']
})
export class CreateTopicModalComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateTopicModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
