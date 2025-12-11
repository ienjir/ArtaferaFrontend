import { Component } from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {RouterLink} from '@angular/router';
import {NavigationItems} from "@components/navigation-bar/navigation-bar";

@Component({
  selector: 'FooterBar',
  imports: [
    TranslocoPipe,
    RouterLink
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  navigationItems: NavigationItems = [
    {NavigationItem: "privacyPolicy", NavigationLink: "/datenschutz"},
    {NavigationItem: "imprint", NavigationLink: "/impressum"},
    {NavigationItem: "contact", NavigationLink: "/kontakt"}
  ]
}
