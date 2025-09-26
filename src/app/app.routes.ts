import {Routes} from '@angular/router';
import {HomePage} from '@pages/homepage/homepage';
import {HomeLayout} from '@layouts/home-layout/home-layout';
import {DefaultLayout} from '@layouts/default-layout/default-layout';
import {NotFoundPage} from "@pages/not-found-page/not-found-page";


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
      {path: '**', component: NotFoundPage}
    ]
  },
];
