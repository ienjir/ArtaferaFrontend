import {Component, input, Input, OnInit} from '@angular/core';
import {Label} from '@components/label/label';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from "@angular/router";

export type ArtPreviewItem = {
  id: number,
  Title: string,
  Alt: string,
  Link: string,
  Label: string
}

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
  artPreview = input.required<ArtPreviewItem>()
}
