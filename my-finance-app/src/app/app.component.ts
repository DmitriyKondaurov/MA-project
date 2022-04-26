import { Component } from '@angular/core';
import {IAppColors, ICategories, ICostArchive, IFrontPageItem} from "./app-interfaces";

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
      subCategoryName: 'Квартплата, Отопление и горячая вода',
      date: new Date(),
      value: 3000,
    },
  ]
}
