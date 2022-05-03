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
    const curFillAmount = this.appFillAmount ?
      Math.round((Number(this.appFillAmount.value)/Number(this.appFillAmount.total))*100)
      : 0;
    this.highlight(curHighLightColor);
    this.fillAmount(curFillAmount);
  }
  private highlight (color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
  private fillAmount (fillAmountValue: number) {
    this.element.nativeElement.style.width = `${fillAmountValue}%`;
    console.log(`${fillAmountValue}%`)
  }
}
