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

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  userDetails;
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
          const request = {
            params : {
              profilPicture : this.userDetails.profilPicture
            }
          }

          this.userService.getUserProfilePicture(request).subscribe(
            res => {
              const data : any = res

              let objectURL = URL.createObjectURL(data);       
              this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);

              this.loaderActive = false;
            },
            err => {
              console.log(err)
              this.loaderActive = false;
            }
          )
        } else {
          this.loaderActive = false;
        }
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
            {window.location.reload()}
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
