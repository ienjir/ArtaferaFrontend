import {Component, computed, inject, Signal} from '@angular/core';
import {ArtPreview} from "@components/art-preview/art-preview";
import {Art} from "@app/services/art/art";
import {ArtModel, PublicListResult} from "@interfaces/art";
import {toSignal} from "@angular/core/rxjs-interop";
import {catchError, of, map} from 'rxjs';
import {NgxSkeletonLoaderComponent} from "ngx-skeleton-loader";

type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success', data: PublicListResult };
type ErrorState = { status: 'error', error: any };
type ArtState = LoadingState | SuccessState | ErrorState;

@Component({
  selector: 'ArtPage',
  imports: [ArtPreview, NgxSkeletonLoaderComponent],
  templateUrl: './art-page.html',
  styleUrl: './art-page.scss'
})
export class ArtPage {
  private artService = inject(Art);

  artState = toSignal(
    this.artService.getPublicList(0, 'en').pipe(
      map((data): ArtState => ({status: 'success', data})),
      catchError((error) => of({status: 'error', error} as ArtState))
    ),
    {initialValue: {status: 'loading'} as ArtState}
  );

  arts: Signal<ArtModel[]> = computed(() => {
    const state = this.artState();
    return state.status === 'success' ? state.data.arts : [];
  });

  count = computed(() => {
    const state = this.artState();
    return state.status === 'success' ? state.data.count : 0;
  });
}
