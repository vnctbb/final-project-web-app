import { Component, OnInit, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TooltipPosition} from '@angular/material/tooltip';


import { TopicmessageService } from 'src/app/service/topicmessage.service';

@Component({
  selector: 'app-topic-message-modal',
  templateUrl: './topic-message-modal.component.html',
  styleUrls: ['./topic-message-modal.component.scss']
})
export class TopicMessageModalComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  topicMessageList;

  constructor(
    private topicMessageService : TopicmessageService,
    private snackBar : MatSnackBar,
    public dialogRef: MatDialogRef<TopicMessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {

    const request = {
      topicId : this.data.topic.id
    }

    this.topicMessageService.findList(request).subscribe(
      res => {
        const datas: any = res
        console.log(res)
        this.topicMessageList = datas.topicmessage

        if(this.topicMessageList){
          this.getDuration(this.topicMessageList)
        }

        console.log("LIST => ", this.topicMessageList)
      },
      err => {
        console.log(err)
        let snackBarRef = this.snackBar.open("Erreur lors de la récupération des messages", 'X', {
          duration: 5000
        });
      }
    )

  }

  getDuration(postCom): void{
    postCom.forEach(item => {

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
          }
        }
      }

      item.duration = Math.round(duration);
      item.format = format;

    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  adminDeleteMessage(item){
    const request = {
      topicmessageId : item._id
    }

    this.topicMessageService.adminDelete(request).subscribe(
      res => {
        console.log("RESPONSE =>", res);

        for(let i = 0; i < this.topicMessageList.length; i++){
          if(this.topicMessageList[i]._id == item._id){
            this.topicMessageList.splice(i, 1)
          }
        }
        let snackBarRef = this.snackBar.open('Commentaire supprimé', 'X', {
          duration: 2000
        });
      },
      err => {
        let snackBarRef = this.snackBar.open("Erreur lors de la suppresion", 'X', {
          duration: 5000
        });
      }
    )
  }

}
