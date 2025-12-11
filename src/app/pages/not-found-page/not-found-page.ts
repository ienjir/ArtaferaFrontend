import { Component } from '@angular/core';
import {TranslocoPipe} from "@jsverse/transloco";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'NotFoundPage',
  imports: [
    TranslocoPipe,
    RouterLink
  ],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss'
})
export class NotFoundPage {
}
