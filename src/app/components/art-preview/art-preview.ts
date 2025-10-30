import {Component, computed, effect, input, Input, OnInit} from '@angular/core';
import {Label} from '@components/label/label';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from "@angular/router";
import {ArtModel} from "@core/interfaces/art";
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

  func() {
    console.log(this.picture())
    console.log(this.pictureUrl())
  }

  artPicture = computed(() => this.artPreview()?.artPictures?.[0] ?? null);
  picture = computed(() => this.artPicture()?.picture ?? null)

  pictureUrl = computed(() => {
    const pic = this.picture();
    return pic ? `${environment.pictureUrl}/${pic.name}${pic.type}` : '';
  });
}
