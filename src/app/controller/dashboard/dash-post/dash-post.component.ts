import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import {TooltipPosition} from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

import { PostService } from 'src/app/service/post.service';
import { PostComModalComponent } from './post-com-modal/post-com-modal.component';

@Component({
  selector: 'app-dash-post',
  templateUrl: './dash-post.component.html',
  styleUrls: ['./dash-post.component.scss']
})
export class DashPostComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  postsList;

  constructor(
    private postService : PostService,
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

    this.postService.adminList(request).subscribe(
      res => {
        console.log(res)
        const datas: any = res

        this.postsList = datas.posts;

        if (this.postsList){
          this.getDuration(this.postsList)
        }

      },
      err => {
        console.log(err)
      }
    )

  }

  getDuration(posts): void{
    posts.forEach(item => {

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

    deletePost(postId){
    const request = {
        postId : postId
    }

    this.postService.adminDeletePost(request).subscribe(
      res => {
        let snackBarRef = this.snackBar.open('Post supprimé.', 'X', {
          duration: 5000
        });
        setTimeout(() => {window.location.reload()}, 1500)
      },
      err => {
        let snackBarRef = this.snackBar.open('Erreur lors de la suppression.', 'X', {
          duration: 5000
        });
      }
    )
  }

  openDialog(item): void {
    const dialogRef = this.dialog.open(PostComModalComponent, {
      width: '350px',
      data: {post: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    });
  }

}
