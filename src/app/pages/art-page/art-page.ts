import {Component, computed, inject, OnDestroy} from '@angular/core';
import {ArtPreview} from "@components/art-preview/art-preview";
import {Art} from "@app/services/art/art";
import {Subscription} from "rxjs";
import {ArtListResult, ArtModel} from "@core/interfaces/art";
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

  private artData$ = this.artService.getAll(1);

  artState = toSignal(this.artData$, {
    initialValue: { arts: [], count: 0 } as ArtListResult
  });

  ArtPreviews = computed(() => this.artState()?.arts ?? []);
  Count = computed(() => this.artState()?.count ?? 0);
}
