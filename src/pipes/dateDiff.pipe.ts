import { Pipe, PipeTransform } from '@angular/core';
import {Utils} from "../common/utils";

@Pipe({name: 'dateDiffPipe'})
export class DateDiffPipe implements PipeTransform {
  transform(dateTime: string, language: string): string {
    let isen: boolean = language == 'en' ? true : false;
    return Utils.formatDateDiff(dateTime, isen);
  }
}
