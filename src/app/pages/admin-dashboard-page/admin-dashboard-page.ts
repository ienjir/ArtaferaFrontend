import {Component} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {Section} from '@components/section/section';

@Component({
  selector: 'app-admin-dashboard-page',
  imports: [
    Section,
    TranslocoPipe
  ],
  templateUrl: './admin-dashboard-page.html',
  styleUrl: './admin-dashboard-page.scss'
})
export class AdminDashboardPage {}
