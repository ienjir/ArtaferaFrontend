import {Component, computed, inject, OnDestroy, Signal, signal} from '@angular/core';
import {ArtPreview} from "@components/art-preview/art-preview";
import {Art} from "@app/services/art/art";
import {ArtListResult, ArtModel, PublicListResult} from "@interfaces/art";
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

  artData = toSignal(
    this.artService.getPublicList(0, 'en'),
    {initialValue: {arts: [], count: 0, offset: 0, limit: 0} satisfies PublicListResult}
  );

  arts: Signal<ArtModel[]> = computed(() => this.artData().arts);
  count = computed(() => this.artData().count);
  offset = computed(() => this.artData().offset);
  limit = computed(() => this.artData().limit);
}
