import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';

import { FriendService } from '../../../service/friend.service'
import { UserService } from 'src/app/service/user.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import {TooltipPosition} from '@angular/material/tooltip';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-friend',
  templateUrl: './user-friend.component.html',
  styleUrls: ['./user-friend.component.scss']
})
export class UserFriendComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  @Input() user;

  userDetails;

  loaderActive = true;

  acceptedActive = true;
  receivedActive = false;
  sendedActive = false;

  acceptedFriend = [];
  receivedFriend = [];
  sendedFriend = [];

  constructor(
    private friendService : FriendService,
    private userService : UserService,
    private snackBar : MatSnackBar,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(this.userDetails);
        const params = {
          sort : {
            creationDatetime : 1
          }
        };
    
        this.friendService.findAcceptedFriend(params).subscribe(
          res => {
            console.log(res);
            const datas: any = res;
            this.acceptedFriend = datas.friends;
            if(this.acceptedFriend.length > 0){
              this.getDuration(this.acceptedFriend);
              this.setPictureProfileUrl(this.sendedFriend);
            }
            this.setDisplayName(this.acceptedFriend);
            this.loaderActive = false;
          },
          err => {
            console.log(err)
            let snackBarRef = this.snackBar.open('Erreur lors de la récupération', 'X', {
              duration: 2000
            });
            this.loaderActive = false;
          }
        )
      },
      err => {console.log(err)}
    )

  }

  showAccepted(){
    this.loaderActive = false;

    const params = {
      sort : {
        creationDatetime : 1
      }
    };

    if(this.receivedFriend.length == 0){
      this.friendService.findAcceptedFriend(params).subscribe(
        res => {
          console.log(res);
          const datas: any = res;
          this.acceptedFriend = datas.friends;
          if(this.acceptedFriend.length > 0) {
            this.getDuration(this.acceptedFriend);
            this.setPictureProfileUrl(this.sendedFriend);
          }
          this.setDisplayName(this.acceptedFriend);
          this.loaderActive = false;
        },
        err => {
          console.log(err)
          let snackBarRef = this.snackBar.open('Erreur lors de la récupération', 'X', {
            duration: 2000
          });
          this.loaderActive = false;
        }
      )
    } else {
      this.loaderActive = false;
    }

    this.acceptedActive = true;
    this.receivedActive = false;
    this.sendedActive = false;
  }

  showReceived(){
    this.loaderActive = true;

    const params = {
      sort : {
        creationDatetime : -1
      }
    };

    if(this.receivedFriend.length == 0){
      this.friendService.findReceivedFriend(params).subscribe(
        res => {
          console.log(res);
          const datas: any = res;
          this.receivedFriend = datas.friends;
          if(this.receivedFriend.length > 0){
            this.getDuration(this.receivedFriend);
            this.setPictureProfileUrl(this.sendedFriend);
          }
          this.loaderActive = false;
        },
        err => {
          console.log(err)
          let snackBarRef = this.snackBar.open('Erreur lors de la récupération', 'X', {
            duration: 2000
          });
          this.loaderActive = false;
        }
      )
    } else {
      this.loaderActive = false;
    }

    this.acceptedActive = false;
    this.receivedActive = true;
    this.sendedActive = false;
  }

  showSended(){
    this.loaderActive = true;

    const params = {
      sort : {
        creationDatetime : -1
      }
    };

    if(this.sendedFriend.length == 0){
      this.friendService.findSendedFriend(params).subscribe(
        res => {
          console.log(res);
          const datas: any = res;
          this.sendedFriend = datas.friends;
          if(this.sendedFriend.length > 0){
            this.getDuration(this.sendedFriend);
            this.setPictureProfileUrl(this.sendedFriend);
          }
          this.loaderActive = false;
        },
        err => {
          console.log(err)
          let snackBarRef = this.snackBar.open('Erreur lors de la récupération', 'X', {
            duration: 2000
          });
          this.loaderActive = false;
        }
      )
    } else {
      this.loaderActive = false;
    }

    this.acceptedActive = false;
    this.receivedActive = false;
    this.sendedActive = true;
  }

  getDuration(friends): void{
    friends.forEach(item => {

      let timeValue;

      if(item.modificationDatetime){
        timeValue = item.modificationDatetime
      } else {
        timeValue = item.creationDatetime;
      }

      let duration = Date.now() - timeValue;
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
      if (item.profilPicture){
        item.profilPictureUrl = environment.staticServerUrl + "/picture/" + item.profilPicture;
      }
    })
  }

  setDisplayName(friends){
    friends.forEach(friend => {
      if(friend.receiverId == this.userDetails._id){
        friend.displayName = friend.senderName
      } else if (friend.senderId == this.userDetails._id){
        friend.displayName = friend.receiverName
      }
    })
  }

  acceptFriend(friend){
    console.log("ACCEPT FRIEND")
    const request = {
      friendId : friend._id,
      params : {
        status : "ACCEPTED",
        modificationDatetime : Date.now()
      }
    }

    this.friendService.answerFriend(request).subscribe(
      res => {
        console.log("RES => ", res)
        let snackBarRef = this.snackBar.open('Invitation acceptée', 'X', {
          duration: 2000
        });
        setTimeout(() => {window.location.reload()}, 2000)
      },
      err => {
        console.log(err)
        let snackBarRef = this.snackBar.open('Erreur lors de l\'ajout', 'X', {
          duration: 5000
        });
      }
    )
  }

  declineFriend(friend){
    console.log("DECLINE FRIEND")
    const request = {
      friendId : friend._id,
      params : {
        status : "DECLINED",
        modificationDatetime : Date.now()
      }
    }

    this.friendService.answerFriend(request).subscribe(
      res => {
        console.log("RES => ", res)
        let snackBarRef = this.snackBar.open('Invitation refusée', 'X', {
          duration: 2000
        });
        setTimeout(() => {window.location.reload()}, 2000)
      },
      err => {
        console.log(err)
        let snackBarRef = this.snackBar.open('Erreur lors du refus', 'X', {
          duration: 5000
        });
      }
    )
  }

  deleteFriend(friend){
    console.log("DELETE FRIEND")
    const request = {
      friendId : friend._id,
      params : {
        status : "CANCEL",
        modificationDatetime : Date.now()
      }
    }

    this.friendService.updateFriend(request).subscribe(
      res => {
        console.log("RES => ", res)
        let snackBarRef = this.snackBar.open('Ami supprimé', 'X', {
          duration: 2000
        });
        setTimeout(() => {window.location.reload()}, 2000)
      },
      err => {
        console.log(err)
        let snackBarRef = this.snackBar.open('Erreur lors de la suppression', 'X', {
          duration: 5000
        });
      }
    )
  }

  goTo(friend){
    let idToSend;
    if(friend.receiverId == this.userDetails._id){
      idToSend = friend.senderId
    } else if (friend.senderId == this.userDetails._id){
      idToSend = friend.receiverId
    }
    this.router.navigate(['user'], { queryParams: { id: idToSend } });
  }



}
