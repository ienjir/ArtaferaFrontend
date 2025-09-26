import {Component, input, Input} from '@angular/core';
import {Label} from '@components/label/label';
import {NgOptimizedImage} from '@angular/common';

export type ArtPreviewItem = {
  Title: string,
  Alt: string,
  Link: string,
  Label: string
}

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
  artPreview = input.required<ArtPreviewItem>()
}
