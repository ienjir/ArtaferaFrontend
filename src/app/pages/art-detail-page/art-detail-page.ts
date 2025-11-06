import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-art-detail-page',
  imports: [],
  templateUrl: './art-detail-page.html',
  styleUrl: './art-detail-page.scss',
})
export class ArtDetailPage {
  artID = signal('');
  private activatedRoute = inject(ActivatedRoute)

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.artID.set(params["id"])
    })
  }
}
