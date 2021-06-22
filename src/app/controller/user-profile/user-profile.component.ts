import { Component, OnInit, NgModule } from '@angular/core';
import {FormControl} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../service/user.service';
import { PictureService } from 'src/app/service/picture.service';
import { Router } from '@angular/router'

import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TooltipPosition} from '@angular/material/tooltip';

import { ProfilePictureModalComponent } from './profile-picture-modal/profile-picture-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  userDetails;
  profilePictureFilename;
  thumbnail: any;

  loaderActive: boolean = true;

  constructor(
    private userService : UserService,
    private router : Router,
    private sanitizer : DomSanitizer,
    public dialog: MatDialog,
    private pictureService : PictureService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];

        console.log(this.userDetails)

        if(this.userDetails.profilPicture){
          this.profilePictureFilename = environment.staticServerUrl + "/picture/" + this.userDetails.profilPicture
          console.log(this.profilePictureFilename)
        }

        this.loaderActive = false;
      },
      err => {}
    )
  }

  openPictureDialog(): void {
    const dialogRef = this.dialog.open(ProfilePictureModalComponent, {
      width: '80%',
      data: {
        image : ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
      if(result){
        const image = result.nativeElement.files[0];
        const file = new FormData();
        file.set('file', image);
        console.log(result)

        this.pictureService.uploadPicture(file).subscribe(
          res => {
            console.log(res)
            const datas: any = res;
            const request = {
              filename : datas.filename
            }
            this.userService.setUserProfilePicture(request).subscribe(
              res => {
                if(this.userDetails.profilPicture){
                  this.pictureService.deletePicture(this.userDetails.profilPicture).subscribe(
                    res => {
                      {window.location.reload()}
                    },
                    err => {
                      {window.location.reload()}
                    }
                  )
                } else {
                  {window.location.reload()}
                }
              },
              err => {
                let snackBarRef = this.snackBar.open('Erreur lors de l\'ajout de la photo.', 'X', {
                  duration: 5000
                });
              }
            )
          },
          err => {
            if(err.error.message.code == "LIMIT_FILE_SIZE"){
              let snackBarRef = this.snackBar.open('Le format de l\'image est trop lourd.', 'X', {
                duration: 5000
              });
            }
          }
        )
      }
    });
  }
  

}
