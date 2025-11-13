import {isPlatformBrowser} from '@angular/common';
import {Component, inject, PLATFORM_ID, signal} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet, Scroll} from '@angular/router';
import {filter} from "rxjs";
import {ToastsContainer} from "@components/global-toast/toasts-continer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastsContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ArtaferaFrontendNew');
}
