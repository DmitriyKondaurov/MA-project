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

  constructor( ) {}
  ngOnInit() {

  }

}
