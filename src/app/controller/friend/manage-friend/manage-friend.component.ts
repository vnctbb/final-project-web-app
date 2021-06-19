import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';

import { FriendService } from '../../../service/friend.service';

import {TooltipPosition} from '@angular/material/tooltip';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-manage-friend',
  templateUrl: './manage-friend.component.html',
  styleUrls: ['./manage-friend.component.scss']
})
export class ManageFriendComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  @Input() user;
  @Input() friend;

  actionDone = false;

  statusAccepted = "ACCEPTED";
  statusWaiting = "WAITING";

  constructor(
    private friendService : FriendService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {

  }

  addFriend(){
    const request = {
      params : {
        receiverId : this.user._id,
        creationDatetime : Date.now()
      }
    }

    this.friendService.createFriend(request).subscribe(
      res => {
        console.log("RES => ", res)
        this.actionDone = true
        let snackBarRef = this.snackBar.open('Invitation envoyée.', 'X', {
          duration: 1500
        });
        setTimeout(() => {window.location.reload()}, 1500)
      },
      err => {
        console.log(err)
        let snackBarRef = this.snackBar.open('Erreur lors de l\'ajout.', 'X', {
          duration: 5000
        });
      }
    )
  }

  cancelFriend(){
    const request = {
      friendId : this.friend._id,
      params : {
        status : "CANCEL",
        modificationDatetime : Date.now()
      }
    }

    this.friendService.updateFriend(request).subscribe(
      res => {
        console.log("RES => ", res)
        this.actionDone = true
        let snackBarRef = this.snackBar.open('Invitation annulée.', 'X', {
          duration: 1500
        });
        setTimeout(() => {window.location.reload()}, 1500)
      },
      err => {
        console.log(err)
        let snackBarRef = this.snackBar.open('Erreur lors de la modification.', 'X', {
          duration: 5000
        });
      }
    )
  }

  deleteFriend(){
    const request = {
      friendId : this.friend._id,
      params : {
        status : "CANCEL",
        modificationDatetime : Date.now()
      }
    }

    this.friendService.updateFriend(request).subscribe(
      res => {
        console.log("RES => ", res)
          this.actionDone = true
        let snackBarRef = this.snackBar.open('Suppression effectuée.', 'X', {
          duration: 1500
        });
        setTimeout(() => {window.location.reload()}, 1500)
      },
      err => {
        console.log(err)
        let snackBarRef = this.snackBar.open('Erreur lors de la modification.', 'X', {
          duration: 5000
        });
      }
    )
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
        let snackBarRef = this.snackBar.open('Ajout effectuée.', 'X', {
          duration: 1500
        });
        setTimeout(() => {window.location.reload()}, 1500)

      },
      err => {
        console.log(err)
        let snackBarRef = this.snackBar.open('Erreur lors de l\'acceptation.', 'X', {
          duration: 5000
        });}
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
        let snackBarRef = this.snackBar.open('Refus effectuée.', 'X', {
          duration: 1500
        });
        setTimeout(() => {window.location.reload()}, 1500)
      },
      err => {
        console.log(err)
        let snackBarRef = this.snackBar.open('Erreur lors du refus.', 'X', {
          duration: 5000
        });}
    )
  }

}
