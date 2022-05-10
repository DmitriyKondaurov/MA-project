import { Component, OnInit } from '@angular/core';
import months from "./months";

@Component({
  selector: 'app-report-plan-actual',
  templateUrl: './report-plan-actual.component.html',
  styleUrls: ['./report-plan-actual.component.css']
})
export class ReportPlanActualComponent implements OnInit {
  selectedFlowDirection: string = 'costs';
  selectedMonthTill: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  flowDirection = ['costs', 'income'];
  months = months;
  years = [new Date().getFullYear()]; // it must be taken from transactions

  constructor() { }

  ngOnInit(): void {
  }

}
