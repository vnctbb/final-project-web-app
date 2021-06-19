import { Component, OnInit, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { LikeService } from 'src/app/service/like.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {

  likeList;

  constructor(
    private likeService : LikeService,
    public dialogRef: MatDialogRef<LikeComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    const request = {
      params : {
        postId : this.data.postId
      }
    }

    this.likeService.list(request).subscribe(
      res => {
        const data: any = res;

        this.likeList = data.likes

      }
    )
  }

}
