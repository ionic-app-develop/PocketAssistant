import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ellipsisPipe'
})

export class EllipsisPipe implements PipeTransform {

    transform(value, args): any {
        if (!value || args == null)
            return value;
        if(value.length <= args)
            return value;

        let newValue = value.substring(0, args);
        return newValue + "…";
    }
}
