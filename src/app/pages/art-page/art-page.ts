import {Component, computed, inject, OnDestroy, signal} from '@angular/core';
import {ArtPreview} from "@components/art-preview/art-preview";
import {Art} from "@app/services/art/art";
import {ArtListResult, ArtModel} from "@interfaces/art";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'ArtPage',
  imports: [
    ArtPreview
  ],
  templateUrl: './art-page.html',
  styleUrl: './art-page.scss'
})
export class ArtPage {
  private artService = inject(Art);

  private artData$ = this.artService.getAll(0);

  artState = toSignal(this.artData$, {
    initialValue: {arts: [], count: 0} as ArtListResult
  });

  artPreviews = computed(() => this.artState()?.arts ?? []);
  count = computed(() => this.artState()?.count ?? 0);
}
