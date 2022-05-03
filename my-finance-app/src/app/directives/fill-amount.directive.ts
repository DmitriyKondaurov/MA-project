import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appFillAmount]',
})
export class FillAmountDirective implements OnInit {
  @Input() appFillAmount = {
    name: '',
    value: 0,
    total: 0,
  };
  @Input() curItemColor = '';

  constructor( private element: ElementRef) { }

  ngOnInit(): void {
    const curHighLightColor = this.curItemColor;
    this.highlight(curHighLightColor);
  }
  private highlight (color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
}
