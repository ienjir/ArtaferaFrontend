import {Component, computed, inject} from '@angular/core';
import {Section} from '@components/section/section'
import {TranslocoPipe} from '@jsverse/transloco';
import {ArtPreview} from '@components/art-preview/art-preview';
import {RouterLink} from '@angular/router';
import {Art} from "@app/services/art/art";
import {toSignal} from "@angular/core/rxjs-interop";
import {ArtListResult} from "@interfaces/art";

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
  private artService = inject(Art);

  private artData$ = this.artService.getAll(1);

  artState = toSignal(this.artData$, {
    initialValue: { arts: [], count: 0 } as ArtListResult
  });

  ArtPreviews = computed(() => this.artState()?.arts ?? []);
  Count = computed(() => this.artState()?.count ?? 0);
}
