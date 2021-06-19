import { Component, OnInit, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TooltipPosition} from '@angular/material/tooltip';


import { PostComService } from 'src/app/service/postcom.service';

@Component({
  selector: 'app-post-com-modal',
  templateUrl: './post-com-modal.component.html',
  styleUrls: ['./post-com-modal.component.scss']
})
export class PostComModalComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  postComs;

  constructor(
    private postComService : PostComService,
    private snackBar : MatSnackBar,
    public dialogRef: MatDialogRef<PostComModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    
    const request = {
      params : {
        postId : this.data.post._id,
        sort : {
          creationDatetime : -1
        }
      }
    }

    this.postComService.adminList(request).subscribe(
      res => {

        const datas: any = res;
        
        this.postComs = datas.postcoms;

        if(this.postComs){
          this.getDuration(this.postComs);
        }

      },
      err => {console.log(err)}
    )

  }

  getDuration(postCom): void{
    postCom.forEach(item => {

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

  onNoClick(): void {
    this.dialogRef.close();
  }

  adminDeletePost(id){
    const request = {
      postcomId : id
    }

    this.postComService.adminDelete(request).subscribe(
      res => {
        console.log("RESPONSE =>", res);

        for(let i = 0; i < this.postComs.length; i++){
          if(this.postComs[i]._id == id){
            this.postComs.splice(i, 1)
          }
        }
        let snackBarRef = this.snackBar.open('Commentaire supprimé', 'X', {
          duration: 2000
        });
      },
      err => {
        let snackBarRef = this.snackBar.open("Erreur lors de la suppresion", 'X', {
          duration: 5000
        });
      }
    )
  }

}
