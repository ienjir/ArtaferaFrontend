import { Component } from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {RouterLink} from '@angular/router';

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

}
