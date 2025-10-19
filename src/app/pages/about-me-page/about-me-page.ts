import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Section} from "@components/section/section";
import {TranslocoPipe} from "@jsverse/transloco";
import {Art} from "@app/services/art/art";
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
  private ArtService = inject(Art)
  private subscriptions = new Subscription()

  fetch() {
    const sub = this.ArtService.getAll().subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error('Error:', error)
    });

    this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }}
