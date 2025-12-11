import { Component, computed, input, inject, WritableSignal, signal, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgOptimizedImage } from '@angular/common'
import { environment } from '@/environments/environment';
import { ArtPicture } from '@/app/core/interfaces/art-picture.model';

@Component({
  selector: 'AF-Picture',
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './picture.html',
  styleUrl: './picture.scss',
  providers: []
})
export class Picture {
	private modalService = inject(NgbModal);

	closeResult: WritableSignal<string> = signal('');
  customPictureURL = input<string>()
  artPicture = input<ArtPicture | undefined>(undefined)
  picture = computed(() => this.artPicture()?.picture)
  darkened = input<boolean>(false)
  isLoading = input<boolean>(false)
  relativeURL = computed(() => {
    const p = this.picture()
    if (!p) return undefined
      return p.name + p.type
  })

  fullURL = computed(() =>
    (this.customPictureURL() || environment.pictureUrl) + "/" + this.relativeURL()
  )


  open(content: TemplateRef<any>) {
    this.modalService.open(content, {
      centered: true,
      fullscreen: true,
      size: 'xl',
      windowClass: 'af-picture__modal'
    });
  }
}
