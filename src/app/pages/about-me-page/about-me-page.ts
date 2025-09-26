import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Section} from "@components/section/section";
import {TranslocoPipe} from "@jsverse/transloco";

@Component({
  selector: 'AboutMePage',
  imports: [
    NgOptimizedImage,
    Section,
    TranslocoPipe
  ],
  templateUrl: './about-me-page.html',
  styleUrl: './about-me-page.scss'
})
export class AboutMePage {

}
