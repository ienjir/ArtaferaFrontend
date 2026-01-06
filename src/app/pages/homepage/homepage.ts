import {Component, computed, inject, Signal} from '@angular/core';
import {Section} from '@components/section/section'
import {TranslocoPipe} from '@jsverse/transloco';
import {ArtPreview} from '@components/art-preview/art-preview';
import {RouterLink} from '@angular/router';
import {toSignal} from "@angular/core/rxjs-interop";
import {ArtListResult, ArtModel, PublicListResult} from "@interfaces/art.model";
import {catchError, map, of} from "rxjs";
import {ArtService} from "@services/art/art";

type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success', data: PublicListResult };
type ErrorState = { status: 'error', error: any };
type ArtState = LoadingState | SuccessState | ErrorState;

@Component({
  selector: 'app-homepage',
  imports: [
    Section,
    TranslocoPipe,
    ArtPreview,
    RouterLink
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class HomePage {
  private artService = inject(ArtService);

  artState = toSignal(
    this.artService.getFeaturedList(6, 'en').pipe(
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
  protected readonly Array = Array;
}
