import { Component } from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

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

  toggleSidebar() {
    this.openSidebar = !this.openSidebar;
  }

  navigationItems: {NavigationItem: string, NavigationLink: string}[] = [
    {NavigationItem: "navbar.home", NavigationLink: "/"},
    {NavigationItem: "navbar.aboutMe", NavigationLink: "/uebermich"},
    {NavigationItem: "navbar.projects", NavigationLink: "/projekte"},
    {NavigationItem: "navbar.contact", NavigationLink: "/kontakt"},
  ]
}
