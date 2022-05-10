import { Component, OnInit } from '@angular/core';
import months from "./months";

@Component({
  selector: 'app-report-plan-actual',
  templateUrl: './report-plan-actual.component.html',
  styleUrls: ['./report-plan-actual.component.css']
})
export class ReportPlanActualComponent implements OnInit {
  selectedMonthFrom: number = 1;
  selectedMonthTill: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();
  months = months;
  years = [new Date().getFullYear()];

  constructor() { }

  ngOnInit(): void {
  }

}
