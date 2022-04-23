import { Component } from '@angular/core';
import {ICategories, IFrontPageItem} from "./app-interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-finance-app';
  categories: ICategories | undefined;
  income: IFrontPageItem = {
    name:'income',
    value: 1500,
    total: 5000,
    color: '#D8BAFF'
  };
  goal: IFrontPageItem = {
    name:'Автомобиль',
    value: 1000,
    total: 3000,
    color: '#7D91F6'
  };
  cost: IFrontPageItem = {
    name:'cost',
    value: 1000,
    total: 2000,
    color: '#FC9999'
  };
}
