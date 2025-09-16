import {Component, Input} from '@angular/core';

@Component({
  selector: 'Section',
  imports: [],
  templateUrl: './section.html',
  styleUrl: './section.scss'
})
export class Section {
  @Input({ required: true }) titleKey!: string;
  @Input() centered: boolean = false;
}
