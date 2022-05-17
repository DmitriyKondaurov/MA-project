import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'costSort'
})
export class CostSortPipe implements PipeTransform {

  transform(notZeroCategories: object[]): any[] {
    return notZeroCategories.sort((a: object, b: object): number => {
        return Object.values(a)[0] < Object.values(b)[0] ? 1 : -1;
    });
}

}
