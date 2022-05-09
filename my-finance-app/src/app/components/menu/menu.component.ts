import {Component, ElementRef, HostBinding, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Expenses} from "../../app-interfaces";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  selected: string = '';
  status: boolean = false;

  elements: Expenses[] = [
    {
      title: 'Main page',
      value: ''
    },
    {
      title: 'Costs analysis',
      value: 'monitoring'
    },
    {
      title: 'Category',
      value: ''
    },
    {
      title: 'Planned budget',
      value: ''
    },
    {
      title: 'Last transaction',
      value: 'archive'
    },
    {
      title: 'Plan/Actual report',
      value: ''
    },
    {
      title: 'Goals',
      value: ''
    },
  ];
  constructor(private router: Router, private element: ElementRef) { }

  toggle() {
    this.status = !this.status;
  }

  ngOnInit(): void {
  }

  select(item: Expenses) {
    this.selected = item.title;
    this.router.navigateByUrl(item.value).then();
  }

  hideMenu(): void {
    // this.element.nativeElement.class.toggle
  }

}
