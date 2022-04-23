import { Component, OnInit, Input } from '@angular/core';
import {IFrontPageItem} from "../../app-interfaces";

@Component({
  selector: 'app-front-page-item',
  templateUrl: './front-page-item.component.html',
  styleUrls: ['./front-page-item.component.css']
})
export class FrontPageItemComponent implements OnInit {

 @Input()  frontPageItem: IFrontPageItem = {
   name: '',
   value: 0,
   total: 0,
   color: ''
 };

 constructor() { }

  ngOnInit(): void {
  }

}
