import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic-diagram',
  templateUrl: './statistic-diagram.component.html',
  styleUrls: ['./statistic-diagram.component.css']
})
export class StatisticDiagramComponent implements OnInit {

  @Input() notZeroCategories: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
