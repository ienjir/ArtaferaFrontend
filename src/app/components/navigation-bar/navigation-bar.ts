import {Component, inject, Input} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {Sidebar} from '@components/navigation-bar/sidebar';

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
  private SidebarService = inject(NgbOffcanvas);

  openSidebar() {
    const sideBarRef = this.SidebarService.open(Sidebar, {
      position: 'end'
    });
    sideBarRef.componentInstance.navigationItems = this.navigationItems;
  }

  navigationItems: NavigationItems = [
    {NavigationItem: "navbar.home", NavigationLink: "/"},
    {NavigationItem: "navbar.art", NavigationLink: "/kunst"},
    {NavigationItem: "navbar.aboutMe", NavigationLink: "/uebermich"},
    {NavigationItem: "navbar.contact", NavigationLink: "/kontakt"},
  ]
}
