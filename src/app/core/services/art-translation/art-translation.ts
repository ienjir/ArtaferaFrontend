import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ArtTranslationModel} from '@interfaces/art-translation.model';
import {Base} from '@services/base/base';

export type CreateArtTranslationPayload = {
  artID: number;
  languageCode: string;
  title: string;
  description: string;
  text: string;
};

export type UpdateArtTranslationPayload = {
  title?: string;
  description?: string;
  text?: string;
};

@Injectable({
  providedIn: 'root'
})
export class ArtTranslationService extends Base {
  protected readonly resourcePath = 'artTranslation';

  createTranslation(payload: CreateArtTranslationPayload): Observable<ArtTranslationModel> {
    return this.post<{language: ArtTranslationModel}>('', payload, true).pipe(
      map((response) => response.language)
    );
  }

  updateTranslation(id: number, payload: UpdateArtTranslationPayload): Observable<ArtTranslationModel> {
    return this.put<{language: ArtTranslationModel}>(`/${id}`, payload, true).pipe(
      map((response) => response.language)
    );
  }
}

