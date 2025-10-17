import {Component} from '@angular/core';
import {Section} from '@components/section/section'
import {TranslocoPipe} from '@jsverse/transloco';
import {ArtPreview, ArtPreviewItem} from '@components/art-preview/art-preview';
import {RouterLink} from '@angular/router';
import {environment} from "@environments/environment";

@Component({
  selector: 'app-homepage',
  imports: [
    Section,
    TranslocoPipe,
    ArtPreview,
    RouterLink
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class HomePage {
  ArtPreviews: ArtPreviewItem[] = [
    {id: 1, Title: "Test1", Alt: "Test1", Link: "/images/schildkröte.jpg", Label: "Test1"},
    {id: 2, Title: "Test1", Alt: "Test1", Link: "/images/ding-dong3.jpg", Label: "Test1"},
    {id: 3, Title: "Test1", Alt: "Test1", Link: "/images/windBlumeWinter.jpg", Label: "Test1"}
  ]
}
