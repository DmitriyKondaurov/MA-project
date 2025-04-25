import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  @Input() amount: number = 0;
  @Input() notZeroCategories: any;

  constructor() { }

  ngOnInit(): void {

  }




}
