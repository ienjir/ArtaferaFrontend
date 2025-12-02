import { Component, computed, input } from '@angular/core';
import { provideImgixLoader } from '@angular/common';
import { environment } from '@/environments/environment';
import { ArtPicture } from '@/app/core/interfaces/art-picture.model';

@Component({
  selector: 'AF-Picture',
  imports: [],
  templateUrl: './picture.html',
  styleUrl: './picture.scss',
  providers: [
    provideImgixLoader(environment.pictureUrl),
  ]
})
export class Picture {
  artPicture = input.required<ArtPicture | undefined>()
  picture = computed(() => this.artPicture()?.picture)
  darkened = input<boolean>(false)
  isLoading = input<boolean>(false)
  relativeURL = computed(() => {
    const p = this.picture()
    if (!p) return undefined
    return '${p.name}${p.type}'
  })
}
