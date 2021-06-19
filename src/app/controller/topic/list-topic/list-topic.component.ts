import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';

import {TooltipPosition} from '@angular/material/tooltip';
import {MatSnackBar} from '@angular/material/snack-bar';

import { TopicService } from '../../../service/topic.service'

export interface Topics {
  title: string;
  description: string;
  author: string;
}

const ELEMENT_DATA: Topics[] = [
  {title: "Salut", description: 'Bonjour', author: 'Joel'},
];

@Component({
  selector: 'app-list-topic',
  templateUrl: './list-topic.component.html',
  styleUrls: ['./list-topic.component.scss']
})
export class ListTopicComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  displayedColumns: string[] = ['title', 'description', 'author', 'goto'];
  dataSource = [];

  loaderActive = true;

  currentPage = 1;
  pageCount;
  topicCount;
  pageTopicCount = 10;
  paginationA = 0;

  topics;

  constructor(
    private router : Router,
    private topicService : TopicService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {

    this.getTopic();

  }

  openTopic(topic){
    this.router.navigate(['topic'], { queryParams: { id: topic.id } });
  }

  getTopic(){
    const request = {
      params : {
        skip : this.paginationA,
        limit : this.pageTopicCount,
        sort : {
          creationDatetime : -1
        }
      }
    }

    this.topicService.countTopic().subscribe(
      res => {
        console.log(res)
        const datas: any = res;
        this.topicCount = datas.count;
        this.pageCount = Math.ceil(datas.count / this.pageTopicCount);

        this.topicService.findList(request).subscribe(
          res => {
            console.log(res);
            const datas: any = res;
            this.topics = datas.topics;

            if(this.topics){
              this.topics.forEach(item => {
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

            console.log(this.dataSource)
            this.loaderActive = false;
          }
        ),
        err => {
          console.log(err);
          this.loaderActive = false;
          let snackBarRef = this.snackBar.open('Erreur lors de la récupération des topics', 'X', {
            duration: 5000
          });
        }
      },
      err => {
        console.log(err);
        this.loaderActive = false;
        let snackBarRef = this.snackBar.open('Erreur lors de la récupération des topics', 'X', {
          duration: 5000
        });
      }
    )
  }

  previousPage(){
    this.loaderActive = true;
    
    this.dataSource = [];
    
    this.currentPage -= 1;
    
    this.paginationA -= this.pageTopicCount;

    if (this.paginationA >= 0){
      
      this.getTopic();
    } else {
      let snackBarRef = this.snackBar.open('Action impossible', 'X', {
        duration: 5000
      });
    }
  }

  nextPage(){
    this.loaderActive = true;
    
    this.dataSource = [];
    
    this.currentPage += 1;
    
    this.paginationA += this.pageTopicCount;

    if (this.paginationA < this.topicCount){
      
      this.getTopic();
    } else {
      let snackBarRef = this.snackBar.open('Action impossible', 'X', {
        duration: 5000
      });
    }
  }

}
