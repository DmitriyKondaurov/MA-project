import { Injectable } from '@angular/core';
import {IAppColors} from "../app-interfaces";

@Injectable({
  providedIn: 'root'
})
export class TakeColorService {
  appColors: IAppColors = {
    lastUsed: 0,
    1: '#D8BAFF',
    2: '#7D91F6',
    3: '#FC9999',
    4: '#DEFF80',
    5: '#A1FFC7',
    6: '#FDFF9F',
    7: '#A8D3FB',
    8: '#FBD5A8',
    9: '#A8F6FB',
    10: '#fd7fe2',
    next(): void {
      this.lastUsed = (this.lastUsed + 1) % 11
    }
  }
  takeNewColor(): string {
    this.appColors.next();
    return this.appColors[this.appColors.lastUsed]
  }
}
