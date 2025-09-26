import {Routes} from '@angular/router';
import {HomePage} from '@pages/homepage/homepage';
import {HomeLayout} from '@layouts/home-layout/home-layout';
import {DefaultLayout} from '@layouts/default-layout/default-layout';
import {NotFoundPage} from "@pages/not-found-page/not-found-page";
import {AboutMePage} from "@pages/about-me-page/about-me-page";
import {ContactPage} from "@pages/contact-page/contact-page";


export const routes: Routes = [
  {
    path: '',
    component: HomeLayout,
    children: [
      {path: '', component: HomePage}
    ]
  },
  {
    path: '',
    component: DefaultLayout,
    children: [
      {path: "uebermich", component: AboutMePage},
      {path: "kontakt", component: ContactPage},
      {path: '**', component: NotFoundPage}
    ]
  },
];
