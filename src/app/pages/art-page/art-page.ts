import {Component, computed, inject, signal, Signal} from '@angular/core';
import {ArtPreview} from "@components/art-preview/art-preview";
import {Art} from "@app/services/art/art";
import {ArtModel, PublicListResult} from "@interfaces/art.model";
import {NgxSkeletonLoaderComponent} from "ngx-skeleton-loader";
import {TranslocoPipe} from "@jsverse/transloco";

type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success', data: PublicListResult };
type ErrorState = { status: 'error', error: any };
type ArtState = LoadingState | SuccessState | ErrorState;

@Component({
  selector: 'ArtPage',
  imports: [ArtPreview, NgxSkeletonLoaderComponent, TranslocoPipe],
  templateUrl: './art-page.html',
  styleUrl: './art-page.scss'
})
export class ArtPage {
  private artService = inject(Art);
  protected readonly Array = Array;

  offset = signal(0)
  allArts = signal<ArtModel[]>([])
  isLoading = signal<Boolean>(false)
  count = signal<number>(0)
  error = signal<any>(null)
  hasMore = computed(() => this.allArts().length < this.count());

  constructor() {
    this.loadArt()
  }


  loadArt() {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.artService.getPublicList(this.offset(), 'en').subscribe({
      next: (result) => {
        this.allArts.update(current => [...current, ...result.arts]);
        this.count.set(result.count);
        this.offset.update(value => value + 1);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err);
        this.isLoading.set(false);
      }
    });
  }

  loadMore() {
    this.loadArt()
  }
}
