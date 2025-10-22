import {Component, inject} from '@angular/core';
import {ArtPreview, ArtPreviewItem} from "@components/art-preview/art-preview";
import {Art} from "@app/services/art/art";
import {Subscription} from "rxjs";
import {ArtModel} from "@core/interfaces/art";

@Component({
  selector: 'ArtPage',
  imports: [
    ArtPreview
  ],
  templateUrl: './art-page.html',
  styleUrl: './art-page.scss'
})
export class ArtPage {
  private ArtService = inject(Art);
  private subscriptions = new Subscription();

  fetch() {
    this.subscriptions.add(
      this.ArtService.getByID(1).subscribe({
        next: (data: ArtModel) => {
          console.log(data)
          // console.log(data.arts);
          // console.log(data.count);
        },
        error: (error) => console.error('Error:', error)
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  ArtPreviews: ArtModel[] = [
    {id: 1, Title: "Test1", Alt: "Test1", Link: "/images/schildkröte.jpg", Label: "Test1"},
    {id: 2, Title: "Test1", Alt: "Test1", Link: "/images/ding-dong3.jpg", Label: "Test1"},
    {id: 3, Title: "Test1", Alt: "Test1", Link: "/images/windBlumeWinter.jpg", Label: "Test1"},
    {id: 4, Title: "Test1", Alt: "Test1", Link: "/images/windBlumeWinter.jpg", Label: "Test1"},
  ]
}
