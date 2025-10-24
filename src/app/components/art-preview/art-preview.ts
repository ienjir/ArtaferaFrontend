import {Component, input, Input, OnInit} from '@angular/core';
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
  artPreview = input.required<ArtModel>()
  protected readonly environment = environment;
}
