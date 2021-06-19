import { Component, OnInit, Inject, Input } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

import { PostService } from '../../../service/post.service';
import { LikeService } from 'src/app/service/like.service';
import { UpdatePostComponent } from '../update-post/update-post.component';
import { PostcomModalComponent } from '../../postcom/postcom-modal/postcom-modal.component';
import { LikeComponent } from '../../like/like.component';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {
  @Input() user

  userPosts;
  dbResponse;

  dbCount;
  count = 1;

  loaderActive = true;

  constructor(
    private postService : PostService,
    private likeService : LikeService,
    private snackBar : MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    const request = {
      params : {
        limit : this.count,
        sort : {
          creationDatetime : -1
        }
      }
    }

    this.postService.userPost(request).subscribe(
      res => {
        this.dbResponse = res;
        this.userPosts = this.dbResponse.response;
        this.dbCount = this.dbResponse.count;

        this.getDuration(this.userPosts);

        this.loaderActive = false;
      },
      err => {
        console.log(err)
        this.loaderActive = false;
      }
    )

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

  openPostComDialog(post): void {
    console.log(post)
    const dialogRef = this.dialog.open(PostcomModalComponent, {
      width: '350px',
      data: {
        postId : post._id,
        userId : this.user._id,
        mainUserId : this.user._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  openLikeDialog(post): void {
    console.log(post)
    const dialogRef = this.dialog.open(LikeComponent, {
      width: '350px',
      data: {
        postId : post._id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  openDialog(item): void {
    const dialogRef = this.dialog.open(UpdatePostComponent, {
      width: '250px',
      data: {content: item.post.content, id: item.post._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loaderActive = true;
      console.log('dialog closed');
      if(result){
        const request = {
          postId : result.id,
          params : {
            modificationDatetime : Date.now(),
            content: result.content
        }}
        this.postService.updatePost(request).subscribe(
          res => {
            console.log("RESPONSE => ", res)
  
            for(let i = 0; i < this.userPosts.length; i++){
              if(this.userPosts[i].post._id == result.id){
                this.userPosts[i].post.content = result.content;
              }
            }
            this.loaderActive = false;
            let snackBarRef = this.snackBar.open('Post modifié', 'X', {
              duration: 2000
            });
        },
          err => {
            console.log("ERROR => ", err)
            this.loaderActive = false;
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

  deletePost(postId){

    this.loaderActive = true;

    const request = {postId : postId}
    
    this.postService.deletePost(request).subscribe(
      res => {
        console.log("RESPONSE =>", res);

        for(let i = 0; i < this.userPosts.length; i++){
          if(this.userPosts[i].post._id == postId){
            this.userPosts.splice(i, 1)
          }
        }
        this.loaderActive = false;
        let snackBarRef = this.snackBar.open('Post supprimé', 'X', {
          duration: 2000
        });
      },
      err => {
        this.loaderActive = false;
        console.error("ERROR => ", err)
        let snackBarRef = this.snackBar.open('Erreur lors de la suppression du post', 'X', {
          duration: 5000
        });
      }
    )
  }

  more(){
    this.count += 1;

    const request = {
      params : {
        limit : this.count,
        sort : {
          creationDatetime : -1
        }
      }
    }

    this.postService.userPost(request).subscribe(
      res => {
        this.dbResponse = res;
        this.userPosts = this.dbResponse.response;

        this.getDuration(this.userPosts);

        this.userPosts.forEach(item => console.log(item.duration))

        console.log(this.userPosts)
      },
      err => {console.log(err)}
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
