import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu') menu: ElementRef;

  value: string = " ";

  constructor(
    private userService : UserService,
    private router : Router,
    private elementRef: ElementRef,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  showMenu(){
    this.menu.nativeElement.className = "menu menuShow"
  }

  hideMenu(){
    this.menu.nativeElement.className = "menu menuHide"
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/login');
  }

  goToHome(){
    this.router.navigateByUrl('/home');
  }

}
