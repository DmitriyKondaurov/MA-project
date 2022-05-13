import { Component, Input, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-statistic-field',
  templateUrl: './statistic-field.component.html',
  styleUrls: ['./statistic-field.component.css']
})
export class StatisticFieldComponent implements OnInit {

  @Input() field: any;
  key?: string;
  value?: any;

  constructor(private ElementRef: ElementRef) { }

  ngOnInit(): void {
    this.key = Object.keys(this.field)[0]
    this.value = Object.values(this.field)[0]
    this.ElementRef.nativeElement.children[0].children[0].children[0].style.setProperty('background-color', this.field.color);
  }

}
