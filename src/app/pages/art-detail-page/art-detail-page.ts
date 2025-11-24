import {Component, computed, inject, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Art} from "@interfaces/art.model";
import {ArtService} from "@services/art/art";
import {PictureCarousel} from "@components/picture-carousel/picture-carousel";
import {NgbAccordionBody, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionDirective, NgbAccordionHeader, NgbAccordionItem} from "@ng-bootstrap/ng-bootstrap";
import {MarkdownRenderer} from "@components/markdown-renderer/markdown-renderer";

@Component({
  selector: 'app-art-detail-page',
  imports: [
    PictureCarousel,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionBody,
    MarkdownRenderer
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
    const list = this.art()?.translations ?? []
    if (list.length === 0) {
      return
    }

    const match = list.find(t => t.language?.language_code === this.language)
    return match ?? list[0]
  })
  text = computed(() => this.translation()?.text??  "")

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
