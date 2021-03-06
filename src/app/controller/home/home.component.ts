import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostcomModalComponent } from '../postcom/postcom-modal/postcom-modal.component';

import { UserService } from '../../service/user.service';
import { PostService } from 'src/app/service/post.service';
import { LikeService } from 'src/app/service/like.service';
import { PictureService } from 'src/app/service/picture.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('fileInput', {static : false}) fileInput : ElementRef

  userDetails;
  friendsPosts;
  
  dbCount;
  count = 1;

  loaderActive = true;

  constructor(
    private userService : UserService,
    private postService : PostService,
    private likeService : LikeService,
    private pictureService : PictureService,
    private dialog : MatDialog,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];

        const request = {
          limit : this.count,
          sort : {
            creationDatetime : 1
          }
        };

        this.postService.friendPost(request).subscribe(
          res => {
            console.log(res);

            const datas: any = res;

            this.friendsPosts = datas.response;

            this.getDuration(this.friendsPosts);

            this.loaderActive = false;
          },
          err => {
            this.loaderActive = false;
            let snackBarRef = this.snackBar.open('Erreur lors du chargement', 'X', {
              duration: 5000
            });
          }
        )
      },
      err => {}
    )
  }

  openDialog(post): void {
    const dialogRef = this.dialog.open(PostcomModalComponent, {
      width: '350px',
      data: {
        postId : post._id,
        userId : post.authorId,
        mainUserId : this.userDetails._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  getDuration(posts): void{
    posts.forEach(item => {

      let duration = Date.now() - item.post.creationDatetime;
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

  more(){
    this.count += 1;

    const request = {
      limit : this.count,
      sort : {
        creationDatetime : 1
      }
    };

    this.postService.friendPost(request).subscribe(
      res => {
        console.log(res);

        const datas: any = res;

        this.friendsPosts = datas.response;
      },
      err => {
        this.loaderActive = false;
        let snackBarRef = this.snackBar.open('Erreur lors du chargement', 'X', {
          duration: 5000
        });
      }
    )
  }

  like(item){
    const request = {
      postId : item.post._id
    }

    this.likeService.exist(request).subscribe(
      res => {
        const createRequest = {
          params : {
            postId : item.post._id,
            creationDatetime : Date.now()
          }
        }
        this.likeService.createLike(createRequest).subscribe(
          res => {
            item.like.length += 1;
            item.liked.liked = true;
            console.log(res)
          },
          err => {
            console.log(err)
            if(err.error.message == "Error : Post already liked"){
              let snackBarRef = this.snackBar.open('Post d??ja aim??', 'X', {
                duration: 5000
              });
            
            }
          }
        )
      },
      err => {console.log(err)}
    )
  }

  unlike(item){
    const deleteRequest = {
      postId : item.post._id
    }
    this.likeService.deleteLike(deleteRequest).subscribe(
      res => {
        item.like.length -= 1;
        item.liked.liked = false;
        console.log(res)
      },
      err => {
        console.log(err)
        if(err.error.message == "Error : Post already unliked"){
          
        }
      }
    )
  }

  onFileUpload() {
    const image = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    file.set('file', image);
    console.log(image)
/*
    this.pictureService.uploadPicture(file).subscribe(
      res => {console.log(res)},
      err => {console.log(err)}
    )*/
  }

}
