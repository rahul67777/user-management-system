import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propNames: string[]): any[] {
    if (!value || filterString === '' || !propNames || propNames.length === 0) {
      return value;
    }
    return value.filter((item) => {
      return propNames.some((propName) => {
        const propValue =
          propName === 'company' ? item[propName]?.name : item[propName];
        if (propValue && typeof propValue === 'string') {
          return propValue.toLowerCase().includes(filterString.toLowerCase());
        }
        return false;
      });
    });
  }
}
