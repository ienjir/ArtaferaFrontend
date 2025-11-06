import {Routes} from '@angular/router';
import {HomePage} from '@pages/homepage/homepage';
import {HomeLayout} from '@layouts/home-layout/home-layout';
import {DefaultLayout} from '@layouts/default-layout/default-layout';
import {NotFoundPage} from "@pages/not-found-page/not-found-page";
import {AboutMePage} from "@pages/about-me-page/about-me-page";
import {ContactPage} from "@pages/contact-page/contact-page";
import {ArtPage} from "@pages/art-page/art-page";


export const routes: Routes = [
  {
    path: '',
    component: HomeLayout,
    children: [
      {path: '', component: HomePage}
    ]
  },
  {path: "kunst", component: DefaultLayout, children: [{path: '', component: ArtPage}]},
  {path: "uebermich", component: DefaultLayout, children: [{path: '', component: AboutMePage}]},
  {path: "kontakt", component: DefaultLayout, children: [{path: '', component: ContactPage}]},
  {path: '**', component: NotFoundPage}
];
