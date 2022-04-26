import {Component, Input, OnInit} from '@angular/core';
import {ICostArchive} from "../../app-interfaces";

@Component({
  selector: 'app-field-cost-item',
  templateUrl: './field-cost-item.component.html',
  styleUrls: ['./field-cost-item.component.css']
})
export class FieldCostItemComponent implements OnInit {
  @Input() totalCostAmount: number = 0;
  @Input() costByCategory: ICostArchive = {
  categoryName: '',
  subCategoryName: '',
  date: new Date(),
  value: 0,
}

  color: string = '';

  constructor() { }

  ngOnInit(): void {

  }

}
