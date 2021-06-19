import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { TopicService } from '../../../service/topic.service'
import { CreateTopicModalComponent } from '../create-topic-modal/create-topic-modal.component';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss']
})
export class CreateTopicComponent implements OnInit {

  constructor(
    private topicService : TopicService,
    public dialog: MatDialog,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  createTopic(){
    console.log("create topic")
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTopicModalComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
      if(result){
        const request = {
          params : {
            creationDatetime : Date.now(),
            topicName: result.topicName,
            topicDescription: result.topicDescription
        }}
        this.topicService.createTopic(request).subscribe(
          res => {
            console.log("RESPONSE => ", res)
    
            let snackBarRef = this.snackBar.open('Topic créé', 'X', {
              duration: 2000
            });
            setTimeout(() => {window.location.reload()}, 2000)
        },
          err => {
            console.log("ERROR => ", err)
            let snackBarRef = this.snackBar.open('Erreur lors de la création', 'X', {
              duration: 5000
            });
          }
        )
      }
    });
  }

}
