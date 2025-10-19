import {Injectable} from '@angular/core';
import {Base} from "@core/services/base";
import {ArtModel} from "@core/interfaces/art";

@Injectable({
  providedIn: 'root'
})
export class Art extends Base {
  protected readonly resourcePath = 'art';

  getAll() {
    return this.post<ArtModel[]>("/list", {"Offset": 0});
  }
}
