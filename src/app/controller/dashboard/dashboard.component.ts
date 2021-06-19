import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit(): void {

    this.userService.isAdmin().subscribe(
      res => {},
      err => {
        console.log('la')
        this.router.navigateByUrl('/login');
        this.userService.deleteToken();
      }
    )

  }

  disconnect(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/login');
  }

}
