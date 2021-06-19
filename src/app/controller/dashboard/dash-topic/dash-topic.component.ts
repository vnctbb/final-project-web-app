import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import {TooltipPosition} from '@angular/material/tooltip';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

import { TopicService } from 'src/app/service/topic.service';
import { TopicMessageModalComponent } from './topic-message-modal/topic-message-modal.component';

@Component({
  selector: 'app-dash-topic',
  templateUrl: './dash-topic.component.html',
  styleUrls: ['./dash-topic.component.scss']
})
export class DashTopicComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  displayedColumns: string[] = ['title', 'description', 'author', 'goto', 'delete'];
  dataSource = [];

  topicsList;

  done = false;

  constructor(
    private topicService : TopicService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
    const request = {
      params : {
        sort : {
          creationDatetime : -1
        }
      }
    }

    this.topicService.findList(request).subscribe(
      res => {
        console.log(res);
        const datas: any = res;
        this.topicsList = datas.topics;

        if(this.topicsList){
          this.topicsList.forEach(item => {
            this.dataSource.push({
              id : item._id,
              title : item.topicName,
              description : item.topicDescription,
              author : item.ownerName
            });
          })
        } else {
          this.dataSource.push({
            title : "-",
            description : "-",
            author : "-"
          });
        }

        this.done = true;

      }
    ),
    err => {
      console.log(err);
      let snackBarRef = this.snackBar.open('Erreur lors de la récupération des topics', 'X', {
        duration: 5000
      });
    }
  }

  deleteTopic(item){
    const request = {topicId : item.id}
    
    this.topicService.adminDeleteTopic(request).subscribe(
      res => {
        console.log("RESPONSE =>", res);
        let snackBarRef = this.snackBar.open('Topic supprimé', 'X', {
          duration: 2000
        });
        setTimeout(() => {window.location.reload()}, 1500)
      },
      err => {
        let snackBarRef = this.snackBar.open('Erreur lors de la suppression du topics', 'X', {
          duration: 5000
        });
      }
    )
  }

  openDialog(item): void {
    const dialogRef = this.dialog.open(TopicMessageModalComponent, {
      width: '350px',
      data: {topic: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    });
  }

}
