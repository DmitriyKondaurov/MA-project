import { Component } from '@angular/core';
import { IFrontPageItem } from "./app-interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-finance-app';

  isShow = false;

  show() {
    this.isShow = true;
  }

  hide() {
    this.isShow = false;
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



  constructor( ) {}
  ngOnInit() {

  }

}
