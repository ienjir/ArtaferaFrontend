import {Component, inject, PLATFORM_ID} from '@angular/core';
import {Section} from '@app/layout/section/section'
import {TranslocoPipe} from '@jsverse/transloco';
import {ArtPreview} from '@components/art-preview/art-preview';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [
    Section,
    TranslocoPipe,
    ArtPreview
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class HomePage {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  redirectTo(route: string) {
    this.router.navigate([route]);
  }
}
