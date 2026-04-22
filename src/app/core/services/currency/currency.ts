import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Base} from '@services/base/base';
import {CurrencyModel} from '@interfaces/currency.model';

export type CurrencyListResult = {
  currencies: CurrencyModel[];
  count: number;
};

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends Base {
  protected readonly resourcePath = 'currency';

  list(): Observable<CurrencyListResult> {
    return this.get<CurrencyListResult>('/list', true);
  }
}
