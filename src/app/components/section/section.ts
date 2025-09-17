import {Component, Input} from '@angular/core';
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
  @Input({ required: true }) titleKey!: string;
  @Input() centered: boolean = false;
}
