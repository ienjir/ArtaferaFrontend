import {Injectable} from '@angular/core';
import {Art, ArtListResult, ArtModel, PublicListResult} from "@interfaces/art.model";
import {ArtPictureModel} from "@interfaces/art-picture.model";
import {map, Observable} from "rxjs";
import {Base} from "@services/base/base";

export type CreateArtPayload = {
  price: number;
  currency_id: number;
  creation_year: number;
  width?: number;
  height?: number;
  depth?: number;
  available?: boolean;
  featured?: boolean;
};

export type UpdateArtPayload = Partial<CreateArtPayload>;

@Injectable({
  providedIn: 'root'
})
export class ArtService extends Base {
  protected readonly resourcePath = 'art';

  getByID(ID: number): Observable<Art> {
    return this.get<Art>(`/${ID}`, true);
  }

  getAdminByID(ID: number): Observable<Art> {
    return this.get<Art>(`/${ID}/admin`, true);
  }

  getAll(Offset: number): Observable<ArtListResult> {
    return this.post<ArtListResult>("/list", {"Offset": Offset}, true);
  }

  listAdmin(offset: number): Observable<ArtListResult> {
    return this.post<ArtListResult>("/list", {offset}, true);
  }

  getPublicList(Offset: Number, Lang: string): Observable<PublicListResult> {
    return this.get<PublicListResult>(`/publiclist?lang=${Lang}&offset=${Offset}`, true);
  }

  getFeaturedList(Limit: number, Lang: string): Observable<PublicListResult> {
    return this.get<PublicListResult>(`/featured?lang=${Lang}&limit=${Limit}`, true);
  }

  createArt(payload: CreateArtPayload): Observable<ArtModel> {
    return this.post<{art: ArtModel}>("", payload, true).pipe(
      map((response) => response.art)
    );
  }

  updateArt(id: number, payload: UpdateArtPayload): Observable<ArtModel> {
    return this.put<{art: ArtModel}>(`/${id}`, payload, true).pipe(
      map((response) => response.art)
    );
  }

  deleteArt(id: number): Observable<{message: string}> {
    return this.delete<{message: string}>(`/${id}`, true);
  }

  uploadArtPicture(
    artId: number,
    file: File,
    options?: {name?: string; priority?: number; isPublic?: boolean}
  ): Observable<ArtPictureModel> {
    const formData = new FormData();
    formData.append('picture', file);
    if (options?.name) {
      formData.append('name', options.name);
    }
    if (options?.priority !== undefined) {
      formData.append('priority', String(options.priority));
    }
    const isPublic = options?.isPublic ?? true;
    formData.append('isPublic', String(isPublic));

    return this.http
      .post<{data: {artPicture: ArtPictureModel}}>(`${this.baseUrl}/${this.resourcePath}/${artId}/pictures`, formData)
      .pipe(map((response) => response.data.artPicture));
  }

  deleteArtPicture(artId: number, pictureId: number): Observable<{message: string}> {
    return this.delete<{message: string}>(`/${artId}/pictures/${pictureId}`, true);
  }

  updateArtPictureOrder(artId: number, artPictureIds: number[]): Observable<void> {
    return this.put(`/${artId}/pictures/order`, {artPictureIds}, true)
      .pipe(map(() => undefined));
  }
}
