import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';

import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import { UpdateTopicModalComponent } from '../update-topic-modal/update-topic-modal.component'
import { TopicService } from '../../../service/topic.service'

import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-user-topic',
  templateUrl: './user-topic.component.html',
  styleUrls: ['./user-topic.component.scss']
})
export class UserTopicComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  @Input() user;

  userTopics;

  loaderActive = true;

  constructor(
    private topicService : TopicService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog,
    private router : Router
  ) { }

  ngOnInit(): void {
    const request = {
      params : {
        ownerId : this.user._id
      }
    }

    this.topicService.findListByOwner(request).subscribe(
      res => {
        console.log(res)
        const datas: any = res
        this.userTopics = datas.topics;
        this.loaderActive = false;
      },
      err => {
        console.log(err)
        if(err.error.message != "Error : Topics not found"){
          let snackBarRef = this.snackBar.open('Erreur lors de la récupération des topics', 'X', {
            duration: 5000
          });
        }
      }
    )
  }

  openDialog(topic): void {
    const dialogRef = this.dialog.open(UpdateTopicModalComponent, {
      width: '250px',
      data: {
        topicName : topic.topicName,
        topicDescription : topic.topicDescription
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loaderActive = true;
      console.log('dialog closed');
      if(result){
        const request = {
          _id : topic._id,
          params : {
            modificationDatetime : Date.now(),
            topicName: result.topicName,
            topicDescription: result.topicDescription
        }}
        this.topicService.updateTopic(request).subscribe(
          res => {
            console.log("RESPONSE => ", res)

            for(let i = 0; i < this.userTopics.length; i++){
              if(this.userTopics[i]._id == topic._id){
                this.userTopics[i].topicName = result.topicName;
                this.userTopics[i].topicDescription = result.topicDescription;
              }
            }
            this.loaderActive = false;
            let snackBarRef = this.snackBar.open('Topic modifié', 'X', {
              duration: 2000
            });

        },
          err => {
            this.loaderActive = false;
            console.log("ERROR => ", err)
            let snackBarRef = this.snackBar.open('Erreur lors de la modification', 'X', {
              duration: 5000
            });
          }
        )
      } else {
        this.loaderActive = false;
      }
    });
  }

  deleteTopic(id){

    const request = {topicId : id}

    this.loaderActive = true;
    
    this.topicService.deleteTopic(request).subscribe(
      res => {
        console.log("RESPONSE =>", res);

        for(let i = 0; i < this.userTopics.length; i++){
          if(this.userTopics[i]._id == id){
            this.userTopics.splice(i, 1)
          }
        }
        this.loaderActive = false;
        let snackBarRef = this.snackBar.open('Topic supprimé', 'X', {
          duration: 2000
        });
      },
      err => {
        this.loaderActive = false;
        let snackBarRef = this.snackBar.open('Erreur lors de la suppression du topics', 'X', {
          duration: 5000
        });
      }
    )
  }

  openTopic(topic){
    this.router.navigate(['topic'], { queryParams: { id: topic } });
  }

}
