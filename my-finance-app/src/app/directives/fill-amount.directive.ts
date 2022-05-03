import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appFillAmount]'
})
export class FillAmountDirective implements OnInit {
  @Input() appFillAmount = 0;
  @Input() curItemColor = '';
  @Input() curItemTotal = '';

  constructor( private element: ElementRef) { }

  ngOnInit(): void {
    const curHighLightColor = this.curItemColor;
    console.log(this.curItemTotal);
    console.log(this.appFillAmount);

    const curFillAmount = Math.round((Number(this.appFillAmount)/Number(this.curItemTotal))*100);
    this.highlight(curHighLightColor);
    this.fillAmount(curFillAmount);
  }
  private highlight (color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
  private fillAmount (fillAmountValue: number) {
    this.element.nativeElement.style.width = `${fillAmountValue}%`;
    console.log(fillAmountValue);
  }
}
