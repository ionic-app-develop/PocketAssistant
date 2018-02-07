/**
 * Created by Alex on 9/9/2017.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayListPipe',
  pure: false
})
export class ArrayPipe implements PipeTransform {

  transform(items: any, term: any, field: string): any {
    if (!term) {
      return items;
    }

    return items.filter(function (item) {
      for (let property in item) {
        if (property.toString() != field) {
          continue;
        }
        if (item[property] === null) {
          continue;
        }
        if (item[property].toString().toLowerCase().includes(term.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }
}
