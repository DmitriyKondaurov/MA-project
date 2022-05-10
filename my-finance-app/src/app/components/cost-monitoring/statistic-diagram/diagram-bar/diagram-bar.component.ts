import { Component, Input, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-diagram-bar',
  templateUrl: './diagram-bar.component.html',
  styleUrls: ['./diagram-bar.component.css']
})
export class DiagramBarComponent implements OnInit {

  @Input() pie:any = {}

  constructor(private ElementRef: ElementRef) { }

  ngOnInit(): void {
    this.ElementRef.nativeElement.children[0].style.setProperty('background-color', this.pie.color);
    this.ElementRef.nativeElement.children[0].style.setProperty('height', this.pie.percentPart*3 +'px');
  }

}
