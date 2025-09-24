import {Component, inject, Input} from '@angular/core';
import {NgbActiveOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {NavigationItems} from '@components/navigation-bar/navigation-bar';
import {RouterLink} from '@angular/router';
import {TranslocoPipe} from '@jsverse/transloco';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'ngbd-offcanvas-content',
  imports: [
    RouterLink,
    TranslocoPipe,
    NgOptimizedImage
  ],
  templateUrl: './sidebar.html',
  styleUrl: './navigation-bar.scss'
})
export class Sidebar {
  activeOffcanvas = inject(NgbActiveOffcanvas);
  @Input() navigationItems: NavigationItems = [];
}
