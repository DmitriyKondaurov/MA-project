import { Component, Input, OnInit } from '@angular/core';
import {Transaction} from "../../../app-interfaces";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Transaction = {
    amount: NaN,
    subCategoryName: "",
    currency: {
      value: NaN,
      title: ""
    },
    date: '',
    description: '',
    expense: {
      title: '',
      value: ''
    },
    type: {
      id: NaN,
      value: '',
      title: ''
    },
    userId: NaN,
    categoryName: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
