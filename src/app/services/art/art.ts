import {Injectable} from '@angular/core';
import {Base} from "@core/services/base";
import {ArtListResult, ArtModel} from "@core/interfaces/art";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Art extends Base {
  protected readonly resourcePath = 'art';

  getByID(ID: number): Observable<ArtModel> {
    return this.get<ArtModel>(`/${ID}`);
  }

  getAll(Offset: number): Observable<ArtListResult> {
    return this.post<ArtListResult>("/list", {"Offset": Offset});
  }
}
