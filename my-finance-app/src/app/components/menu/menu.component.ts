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
      title: 'Category',
      url: ''
    },
    {
      title: 'Planned budget',
      url: ''
    },
    {
      title: 'Last transaction',
      url: 'archive'
    },
    {
      title: 'Plan/Actual report',
      url: 'report'
    },
    {
      title: 'Goals',
      url: ''
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
