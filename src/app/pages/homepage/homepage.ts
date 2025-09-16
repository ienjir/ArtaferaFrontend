import {Component, inject, PLATFORM_ID} from '@angular/core';
import {Router} from 'express';
import {Section} from '../../layout/section/section'

@Component({
  selector: 'app-homepage',
  imports: [
    Section
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
