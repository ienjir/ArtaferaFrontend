import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Art} from "@interfaces/art.model";
import {ArtService} from "@services/art/art";
import {ImageCarousel} from "@components/image-carousel/image-carousel";

@Component({
  selector: 'app-art-detail-page',
  imports: [
    ImageCarousel
  ],
  templateUrl: './art-detail-page.html',
  styleUrl: './art-detail-page.scss',
})
export class ArtDetailPage {
  private activatedRoute = inject(ActivatedRoute);
  private artService = inject(ArtService);

  isLoading = signal(false);
  error = signal<string | null>(null);
  artID = signal('')
  art = signal<Art | undefined>(undefined)
  pictures = computed(() => this.art()?.artPictures)

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.artID.set(params['id']);
    });

    this.fetch()
  }

  fetch() {
    this.artService.getByID(Number(this.artID())).subscribe({
      next: (result) => {
        this.art.set(result)
      },
    })
  }
}
