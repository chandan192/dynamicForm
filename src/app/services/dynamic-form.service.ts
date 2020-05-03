import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  metadata: any;


  setMetadata(metadataMap: any) {
    this.metadata = metadataMap;
  }

  getMetadata(name): Observable<any[]> {

    const tmpArr = [];
    if (this.metadata[name] !== undefined) {
      return of(this.metadata[name]);
    } else {
      return of(tmpArr);
    }
  }

  constructor() { }

  getColSpan(val): Observable<string> {

    switch (val) {
      case 1: return of('ui-g-12 ui-lg-1');
      case 2: return of('ui-g-12 ui-lg-2');
      case 3: return of('ui-g-12 ui-lg-3');
      case 4: return of('ui-g-12 ui-lg-4');
      case 5: return of('ui-g-12 ui-lg-5');
      case 6: return of('ui-g-12 ui-lg-6');
      case 7: return of('ui-g-12 ui-lg-7');
      case 8: return of('ui-g-12 ui-lg-8');
      case 9: return of('ui-g-12 ui-lg-9');
      case 10: return of('ui-g-12 ui-lg-10');
      case 11: return of('ui-g-12 ui-lg-11');
      case 12: return of('ui-g-12 ui-lg-12');
      default: return of('ui-g-12 ui-lg-12');

    }
  }

  getErrorMessage() {
    const errorMessage = {
      min: 'The value you entered cannot be less than ',
      max: 'The value you entered  cannot be more than ',
      required: 'This field is required',
      email: 'Email is incorrect',
      pattern: 'The value you entered is not valid'
    };

    return of(errorMessage);
  }
}
