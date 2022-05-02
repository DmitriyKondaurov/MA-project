import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic-field',
  templateUrl: './statistic-field.component.html',
  styleUrls: ['./statistic-field.component.css']
})
export class StatisticFieldComponent implements OnInit {

  @Input() field: any;

  constructor() { }

  ngOnInit(): void {
  }

}
