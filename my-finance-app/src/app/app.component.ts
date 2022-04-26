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
    name:'Надходження',
    value: 1500,
    total: 5000,
  };

  goal: IFrontPageItem = {
    name:'Автомобиль',
    value: 1000,
    total: 3000,
  };

  cost: IFrontPageItem = {
    name:'Витрати',
    value: 1000,
    total: 2000,
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
