import { Component, OnInit } from '@angular/core';
import { IFrontPageItem } from 'src/app/app-interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  income: IFrontPageItem = {
    name:'Надходження',
    value: 9500,
    total: 15000,
  };

  goal: IFrontPageItem = {
    name:'Автомобиль',
    value: 1000,
    total: 3000,
  };

  cost: IFrontPageItem = {
    name:'Витрати',
    value: 8100,
    total: 10000,
  };
}
