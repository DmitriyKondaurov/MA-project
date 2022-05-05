import { Component, OnInit, Input } from '@angular/core';
import {IFrontPageItem} from "../../app-interfaces";
import {TakeColorService} from "../../services/take-color.service";
import {RestApiService} from "../../services/res-api.service";

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
 };

 color: string = '';

 constructor(private choseHighlightColor: TakeColorService, private readonly restService: RestApiService) { }

  ngOnInit(): void {
    this.color = this.choseHighlightColor.takeNewColor()


    // this.frontPageItem = {
    //   name: 'DFDSFS',
    //   value: 10,
    //   total: 20,
    // };
  }

}
