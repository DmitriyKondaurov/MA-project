import {Component, ElementRef, HostBinding, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  selected: string = '';
  status: boolean = false;

  elements: string[] = [
    'Головна сторінка',
    'Архів транзакцій',
    'Категорії',
    'План бюджет',
    'Моніторінг витрат',
    'Звіт план/факт',
    'Введення нових даних',
    'Цілі накопичення'
  ];
  constructor(private router: Router, private element: ElementRef) { }

  toggle() {
    this.status = !this.status;
  }

  ngOnInit(): void {
  }

  select(item: string) {
    this.selected = item;
    // this.router.navigateByUrl(`portal/${item}`);
  }

  hideMenu(): void {
    // this.element.nativeElement.class.toggle
  }

}
