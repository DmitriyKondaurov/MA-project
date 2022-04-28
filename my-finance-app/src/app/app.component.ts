import { Component } from '@angular/core';
import {IAppColors, ICategories, ICostArchive, IFrontPageItem} from "./app-interfaces";
import {RestApiService} from "./services/res-api.service";
import {Subscription} from "rxjs";

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
  categories: ICategories | undefined;
  transactions = [];
  private subscriptionGetData: Subscription | undefined;

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

  costArchive: ICostArchive[] = [
    {
      categoryName: 'Дом',
      subCategoryName: 'Дом, Аренда',
      date: new Date(),
      value: 1000,
    },
    {
      categoryName: 'Подарки',
      subCategoryName: 'Подарки, Благотворительность',
      date: new Date(),
      value: 900,
    },
    {
      categoryName: 'Повседневные расходы',
      subCategoryName: 'Повседневные расходы, Продукты',
      date: new Date(),
      value: 800,
    },
    {
      categoryName: 'Дом',
      subCategoryName: 'Дом, Обслуживание',
      date: new Date(),
      value: 700,
    },
    {
      categoryName: 'Здоровье',
      subCategoryName: 'Здоровье, Лекарства, лечебные процедуры',
      date: new Date(),
      value: 500,
    },
    {
      categoryName: 'Транспорт',
      subCategoryName: 'Транспорт, Топливо',
      date: new Date(),
      value: 1200,
    },
    {
      categoryName: 'Квартплата',
      subCategoryName: 'Квартплата, Отопление',
      date: new Date(),
      value: 3000,
    },
  ]
  constructor( public restService: RestApiService) {}

  ngOnInit() {
    return this.subscriptionGetData = this.restService.getTransactions().subscribe((dataList: []) => {
      this.transactions = dataList;
    });
  }

  ngOnDestroy() {
    this.subscriptionGetData ? this.subscriptionGetData.unsubscribe() : false
  }
}
