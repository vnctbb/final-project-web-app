import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PostcomModalComponent } from '../postcom/postcom-modal/postcom-modal.component';
import { UpdatePostComponent } from '../post/update-post/update-post.component';

import { UserService } from '../../service/user.service';
import { PostService } from 'src/app/service/post.service';
import { LikeService } from 'src/app/service/like.service';
import { PictureService } from 'src/app/service/picture.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { environment } from 'src/environments/environment';


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
  count = 10;

  loaderActive = true;

  constructor(
    private userService : UserService,
    private postService : PostService,
    private likeService : LikeService,
    private pictureService : PictureService,
    private dialog : MatDialog,
    private snackBar : MatSnackBar,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];

        const request = {
          params : {
            limit : this.count,
            sort : {
              modificationDatetime : -1
            }
          }
        };

        this.postService.friendPost(request).subscribe(
          res => {
            console.log(res);

            const datas: any = res;

            this.friendsPosts = datas.response;

            this.dbCount = datas.count;

            if(this.friendsPosts){
              this.getDuration(this.friendsPosts);
              this.setPictureProfileUrl(this.friendsPosts);
            }

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

  openUpdatePostDialog(item): void {
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
  
            for(let i = 0; i < this.friendsPosts.length; i++){
              if(this.friendsPosts[i].post._id == result.id){
                this.friendsPosts[i].post.content = result.content;
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

  setPictureProfileUrl(friends){
    friends.forEach(item => {
      if (item.post.authorPicture  && item.post.authorPicture != "none"){
        item.profilPictureUrl = environment.staticServerUrl + "/picture/" + item.post.authorPicture;
      }
    })
  }

  more(){
    this.count += 1;

    const request = {
      params : {
        limit : this.count,
        sort : {
          modificationDatetime : -1
        }
      }
    };

    this.postService.friendPost(request).subscribe(
      res => {
        console.log(res);

        const datas: any = res;

        this.friendsPosts = datas.response;

        if(this.friendsPosts){
          this.getDuration(this.friendsPosts);
          this.setPictureProfileUrl(this.friendsPosts);
        }
      },
      err => {
        this.loaderActive = false;
        let snackBarRef = this.snackBar.open('Erreur lors du chargement', 'X', {
          duration: 5000
        });
      }
    )
  }

  deletePost(postId){

    this.loaderActive = true;

    const request = {postId : postId}
    
    this.postService.deletePost(request).subscribe(
      res => {
        console.log("RESPONSE =>", res);

        for(let i = 0; i < this.friendsPosts.length; i++){
          if(this.friendsPosts[i].post._id == postId){
            this.friendsPosts.splice(i, 1)
          }
        }
        if(this.friendsPosts.length == 0){
          window.location.reload()
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

  
  goToAuthor(id){
    this.router.navigate(['user'], { queryParams: { id: id } });
  }

}
