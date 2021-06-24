import { Component, OnInit, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {TooltipPosition} from '@angular/material/tooltip';

import { PostcomUpdateModalComponent } from '../postcom-update-modal/postcom-update-modal.component';

import { PostComService } from 'src/app/service/postcom.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-postcom-modal',
  templateUrl: './postcom-modal.component.html',
  styleUrls: ['./postcom-modal.component.scss']
})

export class PostcomModalComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  postComs = [];
  dbCount;
  count = 3;

  authorId;

  content;

  constructor(
    private postComService : PostComService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog,
    public dialogRef: MatDialogRef<PostcomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

    const request = {
      params : {
        postId : this.data.postId,
        userId : this.data.userId,
        limit : this.count,
        sort : {
          creationDatetime : -1
        }
      }
    }

    this.postComService.listByPost(request).subscribe(
      res => {

        const datas: any = res;
        
        this.postComs = datas.postcoms;

        console.log(this.postComs)
        console.log(this.data.mainUserId)

        this.dbCount = datas.count;

        this.authorId = datas.authorId;

        if(this.authorId){
          this.getDuration(this.postComs);
          this.setPictureProfileUrl(this.postComs)
        }

        if(this.postComs){
          this.postComs.sort((a, b) => {
            return a.creationDatetime - b.creationDatetime;
          });
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

  setPictureProfileUrl(friends){
    friends.forEach(item => {
      if (item.authorPicture && item.authorPicture != "none"){
        item.profilPictureUrl = environment.staticServerUrl + "/picture/" + item.authorPicture;
      }
    })
  }

  createPostCom(form){
    const request = {
      params : {
        postId: this.data.postId,
        creationDatetime: Date.now(),
        content: this.content
      }
    }

    this.content = "";
    form.resetForm();

    this.postComService.create(request).subscribe(
      res => {

        console.log(res)

        const datas: any = res;

        datas.doc.profilPictureUrl = environment.staticServerUrl + "/picture/" + datas.picture;

        console.log(datas.doc.profilPictureUrl)

        this.postComs.push(datas.doc)
      },
      err => {

        console.log(err)
      }
    )
  }

  more(){
    this.count += 1;

    const request = {
      params : {
        postId : this.data.postId,
        userId : this.data.userId,
        limit : this.count,
        sort : {
          creationDatetime : -1
        }
      }
    }

    this.postComService.listByPost(request).subscribe(
      res => {
        const datas: any = res
        this.postComs = datas.postcoms;

        if(this.postComs){
          this.getDuration(this.postComs);
          this.setPictureProfileUrl(this.postComs);
        }

        if(this.postComs){
          this.postComs.sort((a, b) => {
            return a.creationDatetime - b.creationDatetime;
          });
        }

      },
      err => {
        console.log(err)
      }
    )
  }

  openDialog(item): void {
    const dialogRef = this.dialog.open(PostcomUpdateModalComponent, {
      width: '250px',
      data: {content: item.content, id: item._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
      if(result){
        const request = {
          _id : item._id,
          params : {
            modificationDatetime : Date.now(),
            content: result.content
        }}
        this.postComService.update(request).subscribe(
          res => {
            console.log("RESPONSE => ", res)

            for(let i = 0; i < this.postComs.length; i++){
              if(this.postComs[i]._id == item._id){
                this.postComs[i].content = result.content;
              }
            }
            let snackBarRef = this.snackBar.open('Commentaire modifié', 'X', {
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
    });
  }

  deletePostCom(id){
    const request = {
      postcomId : id
    }

    this.postComService.delete(request).subscribe(
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

  authorDeletePostCom(id){
    const request = {
      postcomId : id
    }

    this.postComService.authorDelete(request).subscribe(
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
