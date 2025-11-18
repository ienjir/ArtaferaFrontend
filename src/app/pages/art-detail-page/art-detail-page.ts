import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Art} from "@services/art/art";

@Component({
  selector: 'app-art-detail-page',
  imports: [
  ],
  templateUrl: './art-detail-page.html',
  styleUrl: './art-detail-page.scss',
})
export class ArtDetailPage {
  private artService = inject(Art);

  isLoading = signal<boolean>(false)
  artID = signal<number | undefined>(0);
  art = signal<Art | undefined>(undefined)
  error = signal<any>(null)
  private activatedRoute = inject(ActivatedRoute)

  constructor() {
    this.activatedRoute.params.subscribe((params) => {

      const id = params['id'];

      if (!id) {
        this.error.set('Art not defined');
        return;
      }

      this.artID.set(id);
      this.loadArt();
    });
  }

  loadArt() {
    if (this.isLoading()) return;

    const id = this.artID();
    if (!id) {
      this.error.set('Art not defined');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    this.artService.getByID(id).subscribe({
      next: (art) => {
        this.art.set(art);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Could not load art');
        this.isLoading.set(false);
      }
    });
  }
}
