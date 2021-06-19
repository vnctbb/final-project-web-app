import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';

import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  value: string = "";

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){

    this.router.navigate(['search'], { queryParams: { value: this.value} });

  }

}
