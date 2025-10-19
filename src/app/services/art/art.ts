import {Injectable} from '@angular/core';
import {Base} from "@core/services/base";

@Injectable({
  providedIn: 'root'
})
export class Art extends Base {
  protected readonly resourcePath = 'art';

  getAll() {
    return this.post<Art[]>("/list", {"Offset": 0});
  }
}
