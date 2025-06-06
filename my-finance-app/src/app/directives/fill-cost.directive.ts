import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appFillCost]'
})
export class FillCostDirective implements OnInit{
  @Input() appFillCost = 0;
  @Input() curItemColor = '';
  @Input() curItemTotal = '';

  constructor( private element: ElementRef) { }

  ngOnInit(): void {
    const curHighLightColor = this.curItemColor;
    const curFillAmount = this.curItemTotal ? Math.round((Number(this.curItemTotal)/this.appFillCost)*100) : 0;
    this.highlight(curHighLightColor);
    this.fillAmount(curFillAmount);
  }
  private highlight (color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
  private fillAmount (fillAmountValue: number) {
    this.element.nativeElement.style.width = `${fillAmountValue}%`;
  }
}
