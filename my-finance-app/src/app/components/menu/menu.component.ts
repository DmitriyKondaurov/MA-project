import {Component, ElementRef} from '@angular/core';
import {Router} from "@angular/router";
import {IMenuItem} from "../../app-interfaces";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  selected: string = '';
  status: boolean = false;

  elements: IMenuItem[] = [
    {
      title: 'Main page',
      url: ''
    },
    {
      title: 'Costs analysis',
      url: 'monitoring'
    },
    {
      title: 'Categories',
      url: '#'
    },
    {
      title: 'Last transaction',
      url: 'archive'
    },
    {
      title: 'Cash flow report',
      url: 'report'
    },
    {
      title: 'Goals',
      url: 'goals'
    },
  ];
  constructor(private router: Router, private element: ElementRef) { }

  toggle() {
    this.status = !this.status;
  }

  ngOnInit(): void {
  }

  select(item: IMenuItem) {
    this.selected = item.title;
    this.router.navigateByUrl(item.url).then();
  }

  hideMenu(): void {
    // this.element.nativeElement.class.toggle
  }

}
