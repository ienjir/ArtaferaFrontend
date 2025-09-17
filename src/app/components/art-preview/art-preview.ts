import {Component, input, Input} from '@angular/core';

@Component({
  selector: 'app-art-preview',
  imports: [],
  templateUrl: './art-preview.html',
  styleUrl: './art-preview.scss'
})
export class ArtPreview {
  pictureTitle = input.required<string>()
  pictureAlt = input.required<string>()
  pictureLink = input.required<string>()
  pictureLabel = input.required<string>()
}
