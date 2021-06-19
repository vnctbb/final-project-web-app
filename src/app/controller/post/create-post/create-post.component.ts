import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MatSnackBar} from '@angular/material/snack-bar';

import { PostService} from '../../../service/post.service'

import { Post } from '../../../model/post.model'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  public window: Window;

  content: string;

  constructor(
    private router : Router,
    private postService : PostService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  createPost(){
    if(this.content){
      
      const params: Post = {
        creationDatetime : Date.now(),
        content : this.content
      }
  
      const request = {params}
      
      this.postService.createPost(request).subscribe(
        res => {
          console.log("RESPONSE =>", res);
          this.content = " ";
          let snackBarRef = this.snackBar.open('Post créé', 'X', {
            duration: 2000
          });
          setTimeout(() => {window.location.reload()}, 2000)
        },
        err => {
          console.error("ERROR => ", err)
          let snackBarRef = this.snackBar.open('Erreur lors de la création', 'X', {
            duration: 5000
          });
        }
      )
    }
  }


}
