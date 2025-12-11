import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-dsg-page',
  imports: [
    TranslocoPipe
  ],
  templateUrl: './dsg-page.html',
  styleUrl: './dsg-page.scss',
})
export class DsgPage {

}
