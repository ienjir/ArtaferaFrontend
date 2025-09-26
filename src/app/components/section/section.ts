import {Component, input, Input} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'Section',
  imports: [
    TranslocoPipe
  ],
  templateUrl: './section.html',
  styleUrl: './section.scss'
})
export class Section {
  titleKey = input.required<string>()
  centered = input<boolean>(false)
}
