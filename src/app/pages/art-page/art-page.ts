import { Component } from '@angular/core';
import {ArtPreview, ArtPreviewItem} from "@components/art-preview/art-preview";

@Component({
  selector: 'ArtPage',
  imports: [
    ArtPreview
  ],
  templateUrl: './art-page.html',
  styleUrl: './art-page.scss'
})
export class ArtPage {
  ArtPreviews: ArtPreviewItem[] = [
    {id: 1, Title: "Test1", Alt: "Test1", Link: "/images/schildkröte.jpg", Label: "Test1"},
    {id: 2, Title: "Test1", Alt: "Test1", Link: "/images/ding-dong3.jpg", Label: "Test1"},
    {id: 3, Title: "Test1", Alt: "Test1", Link: "/images/windBlumeWinter.jpg", Label: "Test1"},
    {id: 4, Title: "Test1", Alt: "Test1", Link: "/images/windBlumeWinter.jpg", Label: "Test1"},
  ]
}
