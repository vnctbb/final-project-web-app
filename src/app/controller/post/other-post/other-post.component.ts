import { Component, OnInit, Input } from '@angular/core';

import { PostService } from 'src/app/service/post.service';
import { LikeService } from 'src/app/service/like.service';

import { PostcomModalComponent } from '../../postcom/postcom-modal/postcom-modal.component';

import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-other-post',
  templateUrl: './other-post.component.html',
  styleUrls: ['./other-post.component.scss']
})
export class OtherPostComponent implements OnInit {
  @Input() user;
  @Input() friend;
  @Input() mainUserId;

  dbResponse;
  otherPosts;
  dbCount;
  count = 1;


  loaderActive = true;

  constructor(
    private postService : PostService,
    private likeService : LikeService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog,
  ) { }

  ngOnInit(): void {
    if(this.friend?.status == "ACCEPTED"){
      const requestPost = {
        params : {
          authorId : this.user._id,
          friendId : this.friend._id,
        }
      }

      this.postService.userPost(requestPost).subscribe(
        res => {
          this.dbResponse = res;
          this.otherPosts = this.dbResponse.response;
          this.dbCount = this.dbResponse.count;
  
          this.getDuration(this.otherPosts);
  
          this.otherPosts.forEach(item => console.log(item.duration))
  
          console.log(this.otherPosts)
          this.loaderActive = false;

        },
        err => {
          console.log(err)
          this.loaderActive = false;

        }
      )

    }

  }

  openDialog(post): void {
    const dialogRef = this.dialog.open(PostcomModalComponent, {
      width: '350px',
      data: {
        postId : post._id,
        userId : this.user._id,
        mainUserId : this.mainUserId
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
      params : {
        authorId : this.user._id,
        friendId : this.friend._id,
        limit : this.count,
        sort : {
          creationDatetime : -1
        }
      }
    }

    this.postService.userPost(request).subscribe(
      res => {
        this.dbResponse = res;
        this.otherPosts = this.dbResponse.response;

        if(this.otherPosts.length > 0){
          this.getDuration(this.otherPosts);
        }

        this.otherPosts.forEach(item => console.log(item.duration))

        console.log(this.otherPosts)
      },
      err => {
        console.log(err)
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
              let snackBarRef = this.snackBar.open('Post déja aimé', 'X', {
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

}
