import {Component, inject, OnDestroy} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Section} from "@components/section/section";
import {TranslocoPipe} from "@jsverse/transloco";
import {Art} from "@app/services/art/art";
import {ArtModel} from "@core/interfaces/art";
import {Subscription} from "rxjs";

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
export class AboutMePage implements OnDestroy {
  private ArtService = inject(Art);
  private subscriptions = new Subscription();

  fetch() {
    this.subscriptions.add(
      this.ArtService.getByID(1).subscribe({
        next: (data: ArtModel) => {
          console.log(data)
          console.log(data.id)
          // console.log(data.arts);
          // console.log(data.count);
        },
        error: (error) => console.error('Error:', error)
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
