import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {
  transform(items: any, nameSearch: string) {
    if (items && items.length) {
      return items.filter(item => {
        if ((nameSearch && item.name.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1)
          && (nameSearch && item.email.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1)
          && (nameSearch && item.phn.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1)
          && (nameSearch && item.address.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1)) 
        {
          return false;
        }
        return true;
      })
    }
    else {
      return items;
    }
  }
}
