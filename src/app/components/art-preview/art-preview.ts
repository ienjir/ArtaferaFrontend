import {Component, input, Input} from '@angular/core';
import {Label} from '@components/label/label';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'ArtPreview',
  imports: [
    Label,
    NgOptimizedImage
  ],
  templateUrl: './art-preview.html',
  styleUrl: './art-preview.scss'
})
export class ArtPreview {
  pictureTitle = input.required<string>()
  pictureAlt = input.required<string>()
  pictureLink = input.required<string>()
  pictureLabel = input.required<string>()
}
