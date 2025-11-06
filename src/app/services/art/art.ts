import {Injectable} from '@angular/core';
import {Base} from "@core/services/base";
import {ArtListResult, ArtModel, PublicListResult} from "@interfaces/art.model";
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

  getPublicList(Offset: Number, Lang: string): Observable<PublicListResult> {
    return this.get<PublicListResult>(`/publiclist?lang=${Lang}&offset=${Offset}`);
  }
}
