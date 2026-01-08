import {Component, computed, input} from '@angular/core';
import {Label} from '@components/label/label';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from "@angular/router";
import {ArtModel} from "@interfaces/art.model";
import {environment} from "@environments/environment";

@Component({
  selector: 'ArtPreview',
  imports: [
    Label,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './art-preview.html',
  styleUrl: './art-preview.scss'
})
export class ArtPreview {
  artPreview = input.required<ArtModel>();
  protected readonly environment = environment;

  artPicture = computed(() => this.artPreview()?.artPictures?.[0] ?? null);
  picture = computed(() => this.artPicture()?.picture ?? null)

  pictureUrl = computed(() => {
    const pic = this.picture();
    return pic ? `${environment.pictureUrl}/${pic.name}${pic.type}` : '';
  });

  currencyLabel = computed(() => {
    const currency = this.artPreview()?.currency;
    return currency?.currency_code ?? `${this.artPreview()?.currency_id ?? ''}`.trim();
  });
}
