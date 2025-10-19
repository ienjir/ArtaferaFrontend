import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Section} from "@components/section/section";
import {TranslocoPipe} from "@jsverse/transloco";
import {Art} from "@app/services/art/art";

@Component({
  selector: 'AboutMePage',
  imports: [
    NgOptimizedImage,
    Section,
    TranslocoPipe
  ],
  templateUrl: './about-me-page.html',
  styleUrl: './about-me-page.scss'
})
export class AboutMePage {
  private ArtService = inject(Art)

  fetch() {
    console.log(this.ArtService.getAll())
  }
}
