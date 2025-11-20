import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Art} from "@interfaces/art.model";
import {ArtService} from "@services/art/art";
import {PictureCarousel} from "@components/picture-carousel/picture-carousel";
import {NgbAccordionBody, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionDirective, NgbAccordionHeader, NgbAccordionItem} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-art-detail-page',
  imports: [
    PictureCarousel,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionBody
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
  language = "de";
  translation = computed(() => {
    console.log(this.art()?.translations)
    const list = this.art()?.translations ?? []
    if (list.length === 0) {
      return
    }

    const match = list.find(t => t.language?.language_code === this.language)
    console.log("")
    console.log("")
    console.log("")
    console.log(match ?? list[0])
    return match ?? list[0]
  })

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
