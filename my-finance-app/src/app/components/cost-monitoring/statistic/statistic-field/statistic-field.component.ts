import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic-field',
  templateUrl: './statistic-field.component.html',
  styleUrls: ['./statistic-field.component.css']
})
export class StatisticFieldComponent implements OnInit {

  @Input() field: any;
  key?: string[];
  value?: string[];

  constructor() { }

  ngOnInit(): void {
    this.key = Object.keys(this.field)
    this.value = Object.values(this.field)
  }

}
