import {Component, inject, Input} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {NgbdOffcanvasContent} from '@components/navigation-bar/offcanvas';

export type NavigationItems = {NavigationItem: string, NavigationLink: string}[]

@Component({
  selector: 'NavigationBar',
  imports: [
    TranslocoPipe,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.scss'
})
export class NavigationBar {
  openSidebar = false;

  private offcanvasService = inject(NgbOffcanvas);

  open() {
    const offcanvasRef = this.offcanvasService.open(NgbdOffcanvasContent, {
      position: 'end'
    });
    offcanvasRef.componentInstance.navigationItems = this.navigationItems;
  }

  toggleSidebar() {
    this.openSidebar = !this.openSidebar;
  }

  navigationItems: NavigationItems = [
    {NavigationItem: "navbar.home", NavigationLink: "/"},
    {NavigationItem: "navbar.aboutMe", NavigationLink: "/uebermich"},
    {NavigationItem: "navbar.projects", NavigationLink: "/projekte"},
    {NavigationItem: "navbar.contact", NavigationLink: "/kontakt"},
  ]
}
