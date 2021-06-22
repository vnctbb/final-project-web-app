import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormControl} from '@angular/forms';

import { UserService } from 'src/app/service/user.service';
import { FriendService } from 'src/app/service/friend.service';
import { TopicService } from 'src/app/service/topic.service';

import { PostcomModalComponent } from '../postcom/postcom-modal/postcom-modal.component';

import {MatDialog} from '@angular/material/dialog';
import {TooltipPosition} from '@angular/material/tooltip';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.scss']
})
export class OtherProfileComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  userId;
  mainUserId;

  thumbnail

  friendship;
  otherDetails;
  otherFriends = [];
  otherTopics = [];

  statusAccepted = "ACCEPTED";
  statusWaiting = "WAITING";

  loaderActive = true;
  friendLoaderActive = true;
  topicLoaderActive = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private friendService : FriendService,
    private topicService : TopicService,
    private sanitizer : DomSanitizer
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.userService.getUserProfile().subscribe(
        res => {
          const datas: any = res
          this.mainUserId = datas.user._id

          this.userId = params['id'];

          console.log(params['id'])

          console.log(datas.user)

          const request = {
            userId : this.userId
          }

      this.userService.getOneById(request).subscribe(
        res => {
          console.log(res)

          const datas : any = res

          if(datas.friend){
            this.friendship = datas.friend;
          }

          this.otherDetails = datas.user

          if(this.otherDetails.profilPicture){
            this.otherDetails.profilPictureUrl = environment.staticServerUrl + "/picture/" + this.otherDetails.profilPicture;
          }

          if(this.friendship?.status == "ACCEPTED"){

            const friendRequest = {
              params : {
                userId : this.userId,
                sort : {
                  creationDatetime : 1
                }
              }
            }

            this.friendService.findAcceptedFriend(friendRequest).subscribe(
              res => {

                const datas : any = res;

                console.log(datas.friends)
                this.otherFriends = datas.friends;
                if(this.otherFriends.length > 0){
                  this.getDuration(this.otherFriends);
                  this.setPictureProfileUrl(this.otherFriends);
                  this.setDisplayName(this.otherFriends);
                }

                this.friendLoaderActive = false;

              },
              err => {
                this.friendLoaderActive = false;
                console.log(err)
              }
            )

            const topicRequest = {
              params : {
                ownerId : this.userId,
                sort : {
                  creationDatetime : 1
                }
              }
            }

            this.topicService.findListByOwner(topicRequest).subscribe(
              res => {

                const datas : any = res;

                this.otherTopics = datas.topics;

                this.topicLoaderActive = false;

              },
              err => {
                this.topicLoaderActive = false;
                console.log(err)
              }
            )
          }

          this.loaderActive =false;
        },
        err => {
          console.log(err)
          if(err.error = "DUPLICATE_ID"){
            this.router.navigate(['profile']);
          }
          this.loaderActive =false;
        }
      )
    })
        },
        err => {}
      )

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
      if(friend.receiverId == this.userId){
        friend.displayName = friend.senderName
      } else if (friend.senderId == this.userId){
        friend.displayName = friend.receiverName
      }
    })
  }

  goToFriend(friend){
    let idToSend;
    if(friend.receiverId == this.userId){
      idToSend = friend.senderId
    } else if (friend.senderId == this.userId){
      idToSend = friend.receiverId
    }
    this.router.navigate(['user'], { queryParams: { id: idToSend } });
  }

  openTopic(topic){
    this.router.navigate(['topic'], { queryParams: { id: topic } });
  }

}
