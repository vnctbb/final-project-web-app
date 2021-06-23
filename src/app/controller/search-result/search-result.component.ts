import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  value;
  users = [];

  loaderActive = true;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private userService : UserService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.value = params['value'];

      const request = {
        params : {
          searchValue : this.value
        }
      }
  
      this.userService.search(request).subscribe(
        res => {
          const datas: any = res;
          this.users = datas.users;
          this.loaderActive = false;
          if(this.users){
            this.setPictureProfileUrl(this.users);
          }
        },
        err => {
          console.log(err);
          let snackBarRef = this.snackBar.open('Erreur lors du chargement', 'X', {
            duration: 5000
          });
          this.loaderActive = false;
        }
      )
    })

  }

  setPictureProfileUrl(friends){
    friends.forEach(item => {
      if (item.profilPicture  && item.profilPicture != "none"){
        item.profilPictureUrl = environment.staticServerUrl + "/picture/" + item.profilPicture;
      }
    })
  }

  returnHome(){

    this.router.navigate(['home']);

  }

  goToProfile(user){
    this.router.navigate(['user'], { queryParams: { id: user._id } });
  }

}
