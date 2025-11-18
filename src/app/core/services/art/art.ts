import {Injectable} from '@angular/core';
import {ArtListResult, ArtModel, PublicListResult} from "@interfaces/art.model";
import {Observable} from "rxjs";
import {Base} from "@services/base/base";

@Injectable({
  providedIn: 'root'
})
export class Art extends Base {
  protected readonly resourcePath = 'art';

  getByID(ID: number): Observable<Art> {
    return this.get<Art>(`/${ID}`, true);
  }

  getAll(Offset: number): Observable<ArtListResult> {
    return this.post<ArtListResult>("/list", {"Offset": Offset}, true);
  }

  getPublicList(Offset: Number, Lang: string): Observable<PublicListResult> {
    return this.get<PublicListResult>(`/publiclist?lang=${Lang}&offset=${Offset}`, true);
  }
}
