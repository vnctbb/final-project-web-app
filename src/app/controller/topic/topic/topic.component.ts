import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormControl} from '@angular/forms';

import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {TooltipPosition} from '@angular/material/tooltip';

import { TopicService } from '../../../service/topic.service';
import { TopicmessageService } from '../../../service/topicmessage.service';
import { UpdateTopicmessageModalComponent } from '../update-topicmessage-modal/update-topicmessage-modal.component'
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  id;

  userDetails;
  topicDetails;
  topicMessages;
  loaderActive = true;

  currentPage;
  pageCount;
  topicMessageCount;
  pageTopicMessageCount = 20;
  paginationA = 0;

  content: string;

  noMessage = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private topicService : TopicService,
    private userService : UserService,
    private topicmessageService : TopicmessageService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog,
  ) { }

  ngOnInit(): void {

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(this.userDetails);

        this.route.queryParams.subscribe(params => {
          this.id = params['id'];
    
          const request = {
            topicId : this.id
          }
      
          this.topicmessageService.count(request).subscribe(
            res => {
              console.log(res)
              const datas: any = res;
              this.topicMessageCount = datas.count;
              this.pageCount = Math.ceil(datas.count / this.pageTopicMessageCount);
              this.currentPage = this.pageCount;
              this.paginationA = this.topicMessageCount - this.pageTopicMessageCount;
      
              const request = {
                topicId : this.id,
                params : {
                  skip : this.paginationA,
                  limit : this.pageTopicMessageCount
                }
              }
              this.topicService.findOne(request).subscribe(
                res => {
                  console.log(res)
                  const datas: any = res;
                  this.topicDetails = datas.topic
                  this.topicmessageService.findList(request).subscribe(
                    res => {
                      const datas: any = res;
                      if (datas.topicmessage.length == 0) {
                        this.noMessage = true;
                      } else {
                        console.log(datas.topicmessage)
                        this.topicMessages = datas.topicmessage
                      }
                      this.loaderActive = false;
                    },
                    err => {
                      this.noMessage = true;
                      console.log(err)
                    }
                  )
                },
                err => {
                  console.log(err)
                  let snackBarRef = this.snackBar.open('Erreur Topic inexistant', 'X', {
                    duration: 2000
                  });
                  setTimeout(() => {
                    this.router.navigate(['profile']);
                  }, 2000)
                }
              )
            },
            err => {
              console.log(err);
              this.loaderActive = false;
              let snackBarRef = this.snackBar.open('Erreur lors de la récupération des messages', 'X', {
                duration: 5000
              });
            }
          )
        });
      },
      err => {
        console.log(err);
        this.router.navigate(['profile']);
      }
    )
  }

  getTopicMessage(){
    const request = {
      topicId : this.id
    }

    this.topicmessageService.count(request).subscribe(
      res => {
        console.log(res)
        const datas: any = res;
        this.topicMessageCount = datas.count;
        this.pageCount = Math.ceil(datas.count / this.pageTopicMessageCount);

        const request = {
          topicId : this.id,
          params : {
            skip : this.paginationA,
            limit : this.pageTopicMessageCount
          }
        }
        this.topicService.findOne(request).subscribe(
          res => {
            console.log(res)
            const datas: any = res;
            this.topicDetails = datas.topic
            this.topicmessageService.findList(request).subscribe(
              res => {
                const datas: any = res;
                if (datas.topicmessage.length == 0) {
                  this.noMessage = true;
                } else {
                  console.log(datas.topicmessage)
                  this.topicMessages = datas.topicmessage
                }
                this.loaderActive = false;
              },
              err => {
                this.noMessage = true;
                console.log(err)
              }
            )
          },
          err => {
            console.log(err)
            let snackBarRef = this.snackBar.open('Erreur Topic inexistant', 'X', {
              duration: 2000
            });
            setTimeout(() => {
              this.router.navigate(['profile']);
            }, 2000)
          }
        )
      },
      err => {
        console.log(err);
        this.loaderActive = false;
        let snackBarRef = this.snackBar.open('Erreur lors de la récupération des messages', 'X', {
          duration: 5000
        });
      }
    )
  }

  openDialog(topicMessage): void {
    const dialogRef = this.dialog.open(UpdateTopicmessageModalComponent, {
      width: '250px',
      data: {
        content : topicMessage.content
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
      if(result){
        const request = {
          _id : topicMessage._id,
          params : {
            modificationDatetime : Date.now(),
            content: result.content,
        }};
        this.topicmessageService.update(request).subscribe(
          res => {
            console.log("RESPONSE => ", res)

            for(let i = 0; i < this.topicMessages.length; i++){
              if(this.topicMessages[i]._id == topicMessage._id){
                this.topicMessages[i].content = result.content;
              }
            }
    
            let snackBarRef = this.snackBar.open('Message modifié', 'X', {
              duration: 2000
            });

        },
          err => {
            console.log("ERROR => ", err)
            let snackBarRef = this.snackBar.open('Erreur lors de la modification', 'X', {
              duration: 5000
            });
          }
        )
      }
    })
  }

  createTopicMessage(){
    if(this.content){
      console.log(this.id)
      const params = {
        topicId : this.id,
        creationDatetime : Date.now(),
        content : this.content
      }

      const request = {params}

      this.topicmessageService.create(request).subscribe(
        res => {
          console.log(res);
          this.content = " ";
          let snackBarRef = this.snackBar.open('Message créé', 'X', {
            duration: 1000
          });
          setTimeout(() => {window.location.reload()}, 1000)
        },
        err => {
          console.log(err);
          let snackBarRef = this.snackBar.open('Erreur lors de la création du message', 'X', {
            duration: 5000
          });
        }
      )
    }
  }

  verifyAuthor(item){
    if(item.authorId === this.userDetails._id){
      return true
    } else {
      return false;
    }
  }

  deleteTopicMessage(item){
    if(item.authorId === this.userDetails._id){
      const request = {
        topicmessageId : item._id
      }

      this.topicmessageService.delete(request).subscribe(
        res => {
          for(let i = 0; i < this.topicMessages.length; i++){
            if(this.topicMessages[i]._id == item._id){
              this.topicMessages.splice(i, 1)
            }
          }

          let snackBarRef = this.snackBar.open('Message supprimé', 'X', {
            duration: 2000
          });
        },
        err => {
          console.log(err);
          let snackBarRef = this.snackBar.open('Erreur lors de la suppression du message', 'X', {
            duration: 5000
          });
        }
      )
    }
  }

  previousPage(){
    this.loaderActive = true;
    
    this.topicMessages = [];
    
    this.currentPage -= 1;
    
    this.paginationA -= this.pageTopicMessageCount;

    console.log(this.paginationA)

    if (this.paginationA >= 0){
      
      this.getTopicMessage();
    } else {
      let snackBarRef = this.snackBar.open('Action impossible', 'X', {
        duration: 5000
      });
    }
  }

  nextPage(){
    this.loaderActive = true;
    
    this.topicMessages = [];
    
    this.currentPage += 1;
    
    this.paginationA += this.pageTopicMessageCount;

    if (this.paginationA < this.topicMessageCount){
      
      this.getTopicMessage();
    } else {
      let snackBarRef = this.snackBar.open('Action impossible', 'X', {
        duration: 5000
      });
    }
  }

  backTopic(){
    this.router.navigate(['topiclist']);
  }

  reload(){
    window.location.reload();
  }

}
