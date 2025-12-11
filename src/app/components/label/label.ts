import {Component, input} from '@angular/core';

@Component({
  selector: 'Label',
  imports: [],
  templateUrl: './label.html',
  styleUrl: './label.scss'
})
export class Label {
  label = input.required<string>()
  color = input<string>("var(--Accent1)")
}
